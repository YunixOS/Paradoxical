import type { Value, Operator } from "./types";

export type Node = Unit | Clause | Container;


/**
 * A Unit is a {@link Value|value} on its own.
 *
 * @example
 * The following TypeScript:
 * ```ts
 * file.addUnit(123);
 * ```
 *
 * produces:
 * ```text
 * "123"
 * ```
 */
export class Unit {
    /**
    * @param value - The units {@link Value|value}.
    */
    constructor(
        public readonly value: Value,
    ) {}
}

/**
 * A clause is an expression featuring a name, an {@link Operator|operator}, and a {@link Value|value}.
 *
 * @example
 * The following TypeScript:
 * ```ts
 * file.addClause("pizza", "delicious");
 * ```
 *
 * produces:
 * ```text
 * pizza = "delicious"
 * ```
 */
export class Clause {
    /**
    * @param name - The subject/name of the clause.
    * @param value - The {@link Value|value} of the clause.
    * @param operator - The {@link Operator} to use for the clause. Defaults to `"="`.
    */
    constructor(
        public readonly name: string,
        public readonly value: Value,
        public readonly operator: Operator = "="
    ) {}
}

/**
 * A container groups {@link Node|nodes} using the `{ ... }` syntax.
 *
 * @example
 * The following TypeScript:
 * ```ts
 * const species = file.addContainer("species");
 *
 * species.addClause("name", "Yuian");
 * ```
 *
 * produces:
 * ```text
 * species = {
 *     name = "Yuian"
 * }
 * ```
 */
export class Container {
    public readonly children: Node[] = [];

    /**
    * @param name - The name of the container. Leaving empty will leave the container anonymous.
    */
    constructor(
        public readonly name?: string
    ) {}

    /**
     * Adds a {@link Unit} to the container.
     *
     * @param value The value of the {@link Unit}.
     * @example
     * ```ts
     * container.addUnit("hello");
     * ```
    */
    addUnit(value: Value): Unit {
        const unit = new Unit(value);
        this.children.push(unit);
        return unit;
    }

    /**
     * Adds a {@link Clause} to the container.
     *
     * @param name - The name/key/subject of the {@link Clause}.
     * @param value - The value/predicate of the {@link Clause}.
     * @param operator - The operator to be used. Defaults to `"="`.
     * @example
     * ```ts
     * container.addClause("Power Level", 9000, ">");
     * ```
    */
    addClause(name: string, value: Value, operator?: Operator): Clause {
        const clause = new Clause(name, value, operator);
        this.children.push(clause);
        return clause;
    }

    /**
     * Adds a {@link Container} to the container.
     *
     * @param {string} name The name/key of the {@link Container}.
     * @example
     * ```ts
     * container.addContainer("country");
     * ```
    */
    addContainer(name?: string): Container {
        if(name === undefined) {
            const container = new Container();
            this.children.push(container);
            return container;
        }

        const container = new Container(name);
        this.children.push(container);
        return container;
    }
}
