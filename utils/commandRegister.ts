// add commands to the bot
import { load } from "https://deno.land/std@0.185.0/dotenv/mod.ts";
import { Command } from "./types/index.ts";
import { DiscordRequest } from "./utils/discordApi.ts";
const env = await load();

// commands to add to the bot, should contain a name and a description
// Can add types as we get more complicated
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
