// add commands to the bot
import { load } from "../deps.ts";
import { DiscordRequest } from "./utils.ts";
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
	},
	{
		name: "attack",
		description: "attack a country",
	},
	{
		name: "queue_action",
		description: "Add an action to the game queue",
		type: 1,
		options: [
			{
				name: "action_type",
				description: "Select the type of action to queue",
				type: 3,
				required: true,
				choices: [
					{
						name: "launch missile",
						value: "launch_missile",
					},
					{
						name: "prepare defence",
						value: "prepare_defence",
					},
					{
						name: "espionage",
						value: "espionage",
					},
				],
			},
            {
                name: "target",
                description: "Select the target of the action",
                type: 6,
                required: false,
            },
		],
	},
];

async function InstallGlobalCommands(appId: string, commands) {
	const endpoint = `applications/${appId}/commands`;
	const options = {
		method: "PUT",
		body: commands,
	};
	try {
		const response = await DiscordRequest(endpoint, options);
		const body = await response.text();
		console.info(body);
	} catch (error) {
		console.log(error);
	}
}
//fire off the function
InstallGlobalCommands(env["APP_ID"], commands);
