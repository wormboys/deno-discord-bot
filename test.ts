import { json } from "https://deno.land/x/sift@0.6.0/mod.ts";

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
		description: "help",
	},
];

commands.forEach((command) => {
	console.log(command);
});
