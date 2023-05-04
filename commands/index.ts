import { type APIApplicationCommand } from "https://deno.land/x/discord_api_types@0.37.41/payloads/v10/mod.ts";
import { ApplicationCommandType } from "https://deno.land/x/discord_api_types@0.37.41/v10.ts";

export const commands: APIApplicationCommand[] = [
    {
        id: "id",
        name: "test",
        type: ApplicationCommandType.ChatInput,
        description: "test command for testing"
    }
];
