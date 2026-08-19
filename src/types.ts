import { Keyword } from "./Value/Keyword";

export type Value = string | number | boolean | Keyword;
export type Operator =
    | "="
    | ">"
    | "<"
    | ">="
    | "<="
    | "!=";
