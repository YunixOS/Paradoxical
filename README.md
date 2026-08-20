# Paradoxical
Create Clausewitz Engine mods using TypeScript.

Paradoxical provides a TypeScript API for constructing and serialising
Clausewitz mod files, allowing mods to be generated programmatically.

## Features
- Generate mod files within JS/TS.
- Generate localisation files using JS/TS (W.I.P (soon™)). 
## Installation
Coming soon
## Quick Start - Create your first mod file
``` typescript
import { ModFile } from "paradoxical";

const file = new ModFile("./", "hello.txt"); // Path and filename (including extension) 

const container = file.addContainer("message"); // Add a new container object to the file

container.addClause("text", "hello world"); // Add a clause "text = "hello world"" to the container

file.write(); // Writes the file to specified location
```
This should output a file in the root directory called hello.txt that contains the following:
```
message = {
	text = "hello world"
}
```
## Core Concepts
### ModFile
A ModFile is... well, a mod file. You can add nodes to it, and write the data to the location specified once you're finished.
``` typescript
const file = new ModFile("./", "hello.txt");
```
### Values
Any clause value can be either a string, number, boolean, or Keyword (string without quotes).
#### string vs Keyword
There is an important note regarding strings in Paradoxical. A raw string used as a value will always be serialised with surrounding quotation marks. There are many occasions however where one needs to instead have the value be a "Keyword" (a string value absent quotation marks). To account for this, one can use the `keyword()` helper function to create a keyword value that will not have surrounding quotes.

Raw string:
``` typescript
file.addClause("value", "string")
```
```
value = "string"
```

Keyword:
``` typescript
file.addClause("value", keyword("keyword"))
```
```
value = keyword
```

### Nodes
Nodes are the building blocks of Paradoxical. A node can be a container, a clause, or a unit.
#### Unit
A unit is the most basic node, consisting merely of a lonesome value.
``` typescript
const unit = file.addUnit(keyword("value"));
```
```
value
```
#### Clause
A clause is an expression involving both a key and a value.
``` typescript
const clause = file.addClause("name", "value");
```
```
name = "value"
```
#### Container
A container is a type of node the contains other nodes. They often will have a name, but can also be anonymous.
``` typescript
const container = file.addContainer("container");
const subcontainer = container.addContainer();
subcontainer.addClause("name", "value");
```
```
container = {
  {
    name = "value"
  }
}
```
## Development
1. Clone the repo.
2. npm install
3. profit?

Test: npm run test
Build: npm run build
