import { Container } from "../Node";
import { Serializer } from "./Serializer";

describe("Serializer", () => {
    it("serializes a clause", () => {
        const container = new Container("country");

        const clause = container.addClause("capital", "Yuitopia");

        expect(Serializer.serialize(clause)).toBe("capital = Yuitopia");
    });

    it("serializes a container", () => {
        const container = new Container("country");

        container.addClause("capital", "Yuitopia");

        expect(Serializer.serialize(container)).toBe([
            "country = {",
            "\tcapital = Yuitopia",
            "}"
        ].join("\n"));
    });

    it("serializes deeply nested containers", () => {
        const country = new Container("country");
        country.addClause("capital", "Yuitopia");
        const laws = country.addContainer("laws");
        const economy = laws.addContainer("economy");
        economy.addClause("type", "civilian_economy");
        laws.addClause("conscription", "limited_conscription")

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
