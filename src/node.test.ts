import { Clause, Container, Unit } from './node';

describe("Container", () => {
    it("is empty on creation", () => {
        const country = new Container("country");

        expect(country.children).toEqual([]);
    });

    it("adds a unit", () => {
        const container = new Container();
        const unit = container.addUnit(true);

        expect(unit).toBeInstanceOf(Unit)
        expect(container.children).toContain(unit);
        expect(unit.value).toBe(true);
    });

    it("adds a clause", () => {
        const country = new Container("country");

        const clause = country.addClause("capital", "Yuitopia");

        expect(clause).toBeInstanceOf(Clause);
        expect(country.children).toContain(clause);
        expect(clause.name).toBe("capital");
        expect(clause.value).toBe("Yuitopia");
    });

    it("adds a nested container", () => {
        const country = new Container("country");

        const laws = country.addContainer("laws");

        expect(laws).toBeInstanceOf(Container);
        expect(country.children).toContain(laws);
        expect(laws.name).toBe("laws");
    });

    it("allows containers to be nested", () => {
        const country = new Container("country");

        const laws = country.addContainer("laws");
        const economy = laws.addContainer("economy");

        economy.addClause("type", "civilian_economy");

        expect(country.children).toHaveLength(1);
        expect(laws.children).toHaveLength(1);
        expect(economy.children).toHaveLength(1);

        expect(economy.children[0]).toBeInstanceOf(Clause);
    });
});

describe("Clause", () => {
    it("has = operator by default", () => {
        const clause = new Clause("dr_pepper", "delicious");
        expect(clause.operator).toEqual("=");
    });

    it("can have different assigned operators", () => {
        const clause = new Clause("population", 200, ">");
        expect(clause.operator).toEqual(">");
    });
});
