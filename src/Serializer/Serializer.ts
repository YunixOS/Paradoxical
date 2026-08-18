import { Value } from "../Types";
import { Node, Container } from "../Node"

export class Serializer {
    static serialize(node: Node, depth:number = 0) {
        const indent = "\t".repeat(depth);

        if (node instanceof Container) {
            const children: string = node.children
            .map(child => this.serialize(child, depth + 1))
            .join("\n");

            return `${indent}${node.name} = {\n${children}\n${indent}}`;
        }

        return `${indent}${node.name} ${node.operator} ${this.serializeValue(node.value)}`;
    }

    private static serializeValue(value: Value): string {
        if (typeof value === "string") {
            return value;
        }

        return String(value);
    }
}
