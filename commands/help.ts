export const HELP_COMMAND = 

        {
	name: "help",
	description: "List all of my commands or info about a specific command.",
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
};
