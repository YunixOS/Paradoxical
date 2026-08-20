import { Container, Clause, Unit } from "./node";
import type { Node } from "./node";
import { Serializer } from "./Serialization/serializer";
import type { Value, Operator } from "./types";
import fs from "node:fs";
import path from "node:path";

/**
 * Represents a Clausewitz Engine mod file.
 *
 * A ModFile can contain a tree of Clausewitz nodes and can serialize
 * that tree into a file.
 *
 * @example
 * ```ts
 * const file = new ModFile("./Mod/common/drinks", "drinks.txt");
 *
 * const drPepper = file.addContainer("dr_pepper");
 * drPepper.addClause("type", "drink");
 *
 * file.write();
 * ```
 * ./Mod/common/drinks/drinks.txt:
 * ```text
 * dr_pepper = {
 *     type = "drink"
 * }
 * ```
 */
export class ModFile {
    /**
     * @param path The path to create the mod file at.
     * @param name The name for the mod file (including the .txt extension).
    */
    constructor(
        public path: string,
        public name: string
    ) {}

    private content: Node[] = [];

    /**
     * Adds a {@link Unit} to the file.
     *
     * @param value The value of the {@link Unit}.
     * @example
     * ```ts
     * file.addUnit("hello");
     * ```
    */
    addUnit(value: Value): Unit {
        const unit = new Unit(value);
        this.content.push(unit);
        return unit;
    }

    /**
     * Adds a {@link Clause} to the file.
     *
     * @param name - The name/key/subject of the {@link Clause}.
     * @param value - The value/predicate of the {@link Clause}.
     * @param operator - The operator to be used. Defaults to `"="`.
     * @example
     * ```ts
     * file.addClause("Power Level", 9000, ">");
     * ```
    */
    addClause(name: string, value: Value, operator?: Operator): Clause {
        const clause = new Clause(name, value, operator);
        this.content.push(clause);
        return clause;
    }

    /**
     * Adds a {@link Container} to the file.
     *
     * @param {string} name The name/key of the {@link Container}.
     * @example
     * ```ts
     * file.addContainer("country");
     * ```
    */
    addContainer(name?: string): Container {
        if(name === undefined) {
            const container = new Container();
            this.content.push(container);
            return container;
        }

        const container = new Container(name);
        this.content.push(container);
        return container;
    }

    /**
     * Serializes the data and returns it as a string.
    */
    serialize(): string {
        return this.content
            .map(clause => Serializer.serialize(clause))
            .join("\n\n");
    }

    /**
     * Serializes the data and outputs to the file at the path.
    */
    write(): void {
        fs.writeFileSync(path.join(this.path, this.name), this.serialize());
    }
}
