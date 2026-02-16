// import path from "path";
// import fs from "fs";
import { TheCodegenConfiguration } from "@the-codegen-project/cli";
// import lodash from "lodash";

const config: TheCodegenConfiguration = {
  inputType: "asyncapi",
  inputPath: "./src/asyncapi.json",
  language: "typescript",
  generators: [
    {
      id: "models",
      preset: "models",
      options: {
        modelType: "interface",
      },
      outputPath: "./src/__generated__/models",
    },
    {
      id: "types",
      preset: "types",
      outputPath: "./src/__generated__/types",
    },
    // {
    //   preset: "custom",
    //   dependencies: ["models", "types"],
    //   language: "typescript",
    //   renderFunction: () => {
    //     const data = fs.readFileSync(
    //       path.join(process.cwd(), "./src/asyncapi.json"),
    //       "utf-8",
    //     );

    //     const json = JSON.parse(data);

    //     const outputFile = path.join(
    //       process.cwd(),
    //       "./src/__generated__/env.d.ts",
    //     );

    //     console.log(JSON.stringify(json.channels, null, 2));

    //     const topics = Object.values(json.channels).reduce<unknown[]>(
    //       (res, schema) => {
    //         return [
    //           ...res,
    //           ...Object.values(schema as Record<string, unknown>),
    //         ];
    //       },
    //       [],
    //     );

    //     console.log(JSON.stringify(topics, null, 2));

    //     const models = topics.map((topic) => {
    //       return lodash
    //         .get(topic, ["message", "payload", "$ref"], "")
    //         .split("/")
    //         .pop();
    //     });

    //     const imports = models
    //       .map((model) => {
    //         return `import { ${model} } from "./models/${model}";`;
    //       })
    //       .join("\n");

    //     const output = [imports].join("\n");

    //     fs.writeFileSync(outputFile, output);

    //     return output;
    //   },
    // },
  ],
};

export default config;
