import { Container } from "./node";
import { Serializer } from "./Serialization/serializer";
import fs from "node:fs";
import path from "node:path";

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
        fs.writeFileSync(path.join(this.path, this.name), this.serialize());
    }
}
