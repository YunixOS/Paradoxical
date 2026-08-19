import { Container } from "./node";
import { Serializer } from "./Serialization/serializer";
import * as fs from 'node:fs';

export class ModFile {
    constructor(
        public path: string,
        public name: string
    ) {}

    private content: Container[] = [];

    addContainer(name: string): Container {
        const container = new Container(name);
        this.content.push(container);
        return container;
    }

    serialize(): string {
        return this.content
            .map(clause => Serializer.serialize(clause))
            .join("\n\n");
    }

    write(): void {
        fs.writeFileSync(this.path, this.serialize());
    }
}
