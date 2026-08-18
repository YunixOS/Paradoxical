import { Container } from "./Node";

export class ModFile {
    constructor(
        public path: string,
        public name: string
    ) {}

    content: Container[] = [];

    addContainer(name: string): Container {
        const container = new Container(name);
        this.content.push(container);
        return container;
    }
}
