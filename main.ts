//import simple routing functionality from the Sift library
import {
	json,
	serve,
	validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";

import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";

// import our functions from other files
import { verifySignature } from "./utils/discordApi.ts";



serve({
	"/": home,
});

/** handler for our requests from discord */
async function home(request: Request) {
    if (request.method === "GET") {
        return json({ hello: "world" });
    }

	// validate the request
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

	const { type = 0, data = { options: [] } } = JSON.parse(body);
	if (type === 1) {
		// ping interaction from discord
		return json({ type: 1 });
	}

	if (type === 2) {
        // command interaction from discord
		const { value } = data.options.find(
			(option: { name: string }) => option.name === "name",
		);
		return json({
			type: 4,
			data: {
				content: `hello ${value}!`,
			},
		});
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
