/**
 * A keyword is a {@link Value} that is serialized without surrounding quotation marks.
*/

export class Keyword {
    /**
    * @param value - The string that should be a Keyword
    */
    constructor(
        public readonly value: string
    ) {}

    serialize(): string {
        return this.value;
    }
}

/**
 * A helper function that returns a new {@link Keyword}.
 *
 * @param str - The string to make into a {@link Keyword}.
*/
export function keyword(str: string): Keyword {
    return new Keyword(str);
}
