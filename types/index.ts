
export interface Command {
	name: string;
	description: string;
}

export interface Options {
    method: string;
    body: any; // should be Json, will need to find a type
}
