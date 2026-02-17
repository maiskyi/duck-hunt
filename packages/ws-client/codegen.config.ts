import { TheCodegenConfiguration } from "@the-codegen-project/cli";
import { eventsGenerator } from "./generators/events.generator";

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
    eventsGenerator,
  ],
};

export default config;
