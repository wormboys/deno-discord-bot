// add commands to the bot
import { load } from "https://deno.land/std@0.185.0/dotenv/mod.ts";
import { DiscordRequest } from "./discordApi.ts";
const env = await load();

// commands to add to the bot, should contain a name and a description
// Can add types as we get more complicated
const commands = [
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
		description:
			"List all of my commands or info about a specific command.",
		type: 1,
		options: [
			{
				type: 3,
				name: "option",
				description: "pick your option",
				required: true,
                choices: [
					{
						name: "option 1",
						value: "option1",
					},
					{
						name: "option 2",
						value: "option2",
					},
				],
			},
		],
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
