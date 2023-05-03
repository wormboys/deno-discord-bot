
/** Verify whether the request is coming from Discord. */
export async function verifySignature(request: Request) {
	const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
	const signature = request.headers.get("X-Signature-Ed25519")!;
	const timestamp = request.headers.get("X-Signature-Timestamp")!;
	const body = await request.text();
	const valid = nacl.sign.detached.verify(
		new TextEncoder().encode(timestamp + body),
		hexToUint8Array(signature),
		hexToUint8Array(PUBLIC_KEY),
	);

	return { valid, body };
}

/** Fetch request to discord api.
 * Takes an endpoint and an options oject as arguements
 * and returns the response
 */
export async function DiscordRequest(endpoint: string, options: Options) {
	const baseUrl = "https://discord.com/api/v10";
	const url = `${baseUrl}/${endpoint}`;
	if (options.body) {
		options.body = JSON.stringify(options.body);
	}
	const response: Response = await fetch(url, {
		headers: {
			Authorization: `Bot ${env["DISCORD_TOKEN"]}`,
			"content-type": "application/json; charset=UTF-8",
			"User-Agent": "DiscordBot (https://github.com/wormboys, 0.0.1)",
		},
		...options,
	});
	if (!response.ok) {
		console.log(response);
		console.log("error"); // make better error handling
	}
	return response;
}
