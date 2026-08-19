import { Value } from "../types";
import { Node, Container } from "../node";
import { Keyword } from "../Value/Keyword";

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
            return `\"${value}\"`;
        }

        if (value instanceof Keyword) {
            return String(value.value)
        }

        return String(value);
    }
}
