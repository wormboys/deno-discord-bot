// add commands to the bot
import { load } from "https://deno.land/std/dotenv/mod.ts";
const env = await load();

interface Command {
	name: string;
	description: string;
}

const commands: Command[] = [
	{
		name: "ping",
		description: "ping pong",
	},
	{
		name: "missile",
		description: "launch a missile",
	},
	{
		name: "defend",
		description: "defend against a missile",
	},
	{
		name: "help",
		description: "help",
	},
	{
		name: "attack",
		description: "attack a country",
	},
];

async function DiscordRequest(endpoint: string, options: any) {
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

async function InstallGlobalCommands(appId: string, commands: Command[]) {
	const endpoint = `applications/${appId}/commands`;
	const options = {
		method: "PUT",
		body: commands,
	};
	try {
		const response = await DiscordRequest(endpoint, options);
		const body = await response.text();
		console.log(body);
	} catch (error) {
		console.log(error);
	}
}
//fire off the function
InstallGlobalCommands(env["APP_ID"], commands);
