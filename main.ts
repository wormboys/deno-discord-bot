//import simple routing functionality from the Sift library
import {
	json,
	serve,
	validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";

// import our functions from other files
import { verifySignature } from "./utils/discordApi.ts";

// import the types we need from the discord api
import {
	InteractionResponseType,
	InteractionType,
} from "https://deno.land/x/discord_api_types@0.37.41/v10.ts";

// start server with home function as handler
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
	try {
		if (type == InteractionType.ApplicationCommand) {
			// extract name and options from data
			const { name } = data;
			if (name === "help") {
				console.log("help command triggered");
				return json({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: "you did the thing",
						components: [
							{
								type: 1,
								components: [
									{
										type: 2,
                                        custom_id: "test",
										label: "Button",
										style: 1,
									},
									{
										type: 2,
                                        custom_id: "test2",
										label: "Button2",
										style: 1,
									},
								],
							},
						],
					},
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
	if (type == InteractionType.Ping) {
		return json({ type: 1 });
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
