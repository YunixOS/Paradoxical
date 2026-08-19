import type { Value } from "../types";
import { Container, Unit } from "../node";
import type { Node } from "../node";
import { Keyword } from "../Value/Keyword";

export class Serializer {
    static serialize(node: Node, depth:number = 0) {
        const indent = "\t".repeat(depth);

        if (node instanceof Container) {
            const children: string = node.children
            .map(child => this.serialize(child, depth + 1))
            .join("\n");

            if (node.name === undefined) {
                return `${indent}{\n${children}\n${indent}}`;
            }

            return `${indent}${node.name} = {\n${children}\n${indent}}`;
        }

        if (node instanceof Unit) {
            return `${indent}${node.value}`
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
