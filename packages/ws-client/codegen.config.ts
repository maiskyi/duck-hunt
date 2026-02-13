export default {
  inputType: "asyncapi",
  inputPath: "./src/asyncapi.json",
  language: "typescript",
  generators: [
    {
      preset: "models",
      options: {
        modelType: 'interface',
      },
      outputPath: "./src/__generated__/models",
    },
    {
      preset: "types",
      outputPath: "./src/__generated__/types",
    },
  ],
};
