import { ModFile } from './mod-file';
import { Clause, Container, Unit } from './node';
import { keyword } from "./Value/Keyword";

describe("ModFile", () => {
    it("Serializes contents", () => {
        const drinkFile = new ModFile("~/Documents", "drink_file.txt")

        const drPepper = drinkFile.addContainer("dr_pepper");
        drPepper.addClause("flavour", keyword("delicious"));

        const coffee = drinkFile.addContainer("coffee");
        coffee.addClause("flavour", keyword("bitter"));

        expect(drinkFile.serialize()).toBe([
            "dr_pepper = {",
            "\tflavour = delicious",
            "}",
            "",
            "coffee = {",
            "\tflavour = bitter",
            "}"
        ].join("\n"));
    });
});
