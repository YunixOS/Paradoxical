import { Container } from "../node";
import { Serializer } from "./serializer";
import { keyword } from "../Value/Keyword";

describe("Serializer", () => {
    it("serializes a clause with string value", () => {
        const container = new Container("country");

        const clause = container.addClause("capital", "Yuitopia");

        expect(Serializer.serialize(clause)).toBe("capital = \"Yuitopia\"");
    });

    it("serializes a clause with keyword value", () => {
        const container = new Container("country");

        const clause = container.addClause("capital", keyword("Yuitopia"));

        expect(Serializer.serialize(clause)).toBe("capital = Yuitopia");
    });

    it("serializes a clause with number value", () => {
        const container = new Container("country");

        const clause = container.addClause("capital", 123);

        expect(Serializer.serialize(clause)).toBe("capital = 123");
    });

    it("serializes a clause with boolean value", () => {
        const container = new Container("country");

        const clause = container.addClause("capital", true);

        expect(Serializer.serialize(clause)).toBe("capital = true");
    });

    it("serializes a container", () => {
        const container = new Container("country");

        container.addClause("capital", keyword("Yuitopia"));

        expect(Serializer.serialize(container)).toBe([
            "country = {",
            "\tcapital = Yuitopia",
            "}"
        ].join("\n"));
    });

    it("Serializes an anonymous container", () => {
        const anonymousContainer = new Container();
        anonymousContainer.addClause("population", 123);

        expect(Serializer.serialize(anonymousContainer)).toBe([
            "{",
            "\tpopulation = 123",
            "}"
        ].join("\n"));
    });

    it("Serializes a multi-line list", () => {
        const list = new Container("box_contents");
        const listItem1 = list.addContainer();
        const listItem2 = list.addContainer();
        listItem1.addClause("amount", 20);
        listItem2.addClause("amount", 67);

        expect(Serializer.serialize(list)).toBe([
            "box_contents = {",
            "\t{",
            "\t\tamount = 20",
            "\t}",
            "\t{",
            "\t\tamount = 67",
            "\t}",
            "}"
        ].join("\n"));
    });

    it("serializes deeply nested containers", () => {
        const country = new Container("country");
        country.addClause("capital", keyword("Yuitopia"));
        const laws = country.addContainer("laws");
        const economy = laws.addContainer("economy");
        economy.addClause("type", keyword("civilian_economy"));
        laws.addClause("conscription", keyword("limited_conscription"));

        expect(Serializer.serialize(country)).toBe([
            "country = {",
            "\tcapital = Yuitopia",
            "\tlaws = {",
            "\t\teconomy = {",
            "\t\t\ttype = civilian_economy",
            "\t\t}",
            "\t\tconscription = limited_conscription",
            "\t}",
            "}"
        ].join("\n"));
    });
});
