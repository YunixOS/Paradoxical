export class Keyword {
    constructor(
        public readonly value: string
    ) {}

    serialize(): string {
        return this.value;
    }
}

export function keyword(str: string): Keyword {
    return new Keyword(str);
}
