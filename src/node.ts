import { Value, Operator } from "./types";

export type Node = Unit | Clause | Container;

export class Unit {
    constructor(
        public readonly value: Value,
    ) {}
}

export class Clause {
    constructor(
        public readonly name: string,
        public readonly value: Value,
        public readonly operator: Operator = "="
    ) {}
}

export class Container {
    public readonly children: Node[] = [];

    constructor(public readonly name?: string) {}

    addClause(name: string, value: Value): Clause {
        const clause = new Clause(name, value);
        this.children.push(clause);
        return clause;
    }

    addContainer(name: string): Container {
        const container = new Container(name);
        this.children.push(container);
        return container;
    }
}
