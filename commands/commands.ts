import { ApplicationCommandType } from "https://deno.land/x/discord_api_types@0.37.41/v10.ts";
import { APIApplicationCommand, InteractionType } from "../deps.ts";
import { ApplicationCommandOptionType } from "https://deno.land/x/discord_api_types@0.37.41/payloads/v10/mod.ts";


class Command {
    name: string;
    description: string;
    type: ApplicationCommandType;
    options?: ApplicationCommandOptionType[];
    execute (this.type: ApplicationCommandType): void {
        execute(self.type);
    }
}

