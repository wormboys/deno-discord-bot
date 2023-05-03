//import simple routing functionality from the Sift library
import {
	json,
	serve,
	validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";

// import our functions from other files
import { verifySignature } from "./utils/discordApi.ts";
import { InteractionResponseType, InteractionType } from "./types/index.ts";

serve({
	"/": home,
});

/** handler for our requests from discord */
async function home(request: Request) {
	// if the request is a GET request, return a simple hello world
	if (request.method === "GET") {
		return json({ hello: "world" });
	}

	// validate the request
	// Can be extracted to middleware later
	const { error } = await validateRequest(request, {
		POST: {
			headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
		},
	});
	if (error) {
		return json({ error: error.message }, { status: error.status });
	}

	const { valid, body } = await verifySignature(request);
	if (!valid) {
		return json({ error: "Invalid Request" }, { status: 401 });
	}

	// extract the body of the request (and provide default values)
	const { type = 0, data = { options: [] } } = JSON.parse(body);
	if (type == InteractionType.PING) {
		return json({ type: 1 });
	}

	if (type == InteractionType.APPLICATION_COMMAND) {
		// extract name and options from data
		const { name } = data;
		if (name === "help") {
			return json({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
                    content: "you did the thing",
				},
			});
		}
	}

	return json(
		{
			error: "bad request",
		},
		{
			status: 400,
		},
	);
}
