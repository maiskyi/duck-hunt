import { TheCodegenConfiguration } from "@the-codegen-project/cli";

type CodegenGenerator = TheCodegenConfiguration["generators"][number];

export const eventsGenerator: CodegenGenerator = {
  id: "events",
  preset: "custom",
  dependencies: ["models", "types"],
  language: "typescript",
  renderFunction: () => {},
  options: {},
};
