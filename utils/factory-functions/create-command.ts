import { ApplicationCommandType } from "https://deno.land/x/discord_api_types@0.37.41/v10.ts";

export function CreateCommand(
	name: string,
	description: string,
	type: ApplicationCommandType,
) {
	return {
		name,
		description,
		type,
		application_id: Deno.env.get("APP_ID")!,
		version: "1",
		default_member_permissions: null,
	};
}
