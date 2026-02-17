import path from "path";
import fs from "fs";
import lodash from "lodash";
import { TheCodegenConfiguration } from "@the-codegen-project/cli";

type CodegenGenerator = TheCodegenConfiguration["generators"][number];

export const eventsGenerator: CodegenGenerator = {
  id: "events",
  preset: "custom",
  dependencies: ["models", "types"],
  language: "typescript",
  renderFunction: () => {
    const asyncApiFile = path.join(process.cwd(), "./src/asyncapi.json");
    const outputFile = path.join(process.cwd(), "./src/env.d.ts");

    const raw = fs.readFileSync(asyncApiFile, "utf-8");
    const asyncApi = JSON.parse(raw) as {
      channels?: Record<string, unknown>;
    };

    const channels = asyncApi.channels ?? {};

    const events = Object.entries(channels).reduce(
      (
        acc,
        [eventName, channel],
      ): {
        serverToClient: { eventName: string; model: string }[];
        clientToServer: { eventName: string; model: string }[];
      } => {
        const subscribeRef = lodash
          .get(channel, ["subscribe", "message", "payload", "$ref"], "")
          .toString();

        const publishRef = lodash
          .get(channel, ["publish", "message", "payload", "$ref"], "")
          .toString();

        if (subscribeRef) {
          const model = subscribeRef.split("/").pop() ?? "";
          if (model) {
            acc.serverToClient.push({ eventName, model });
          }
        }

        if (publishRef) {
          const model = publishRef.split("/").pop() ?? "";
          if (model) {
            acc.clientToServer.push({ eventName, model });
          }
        }

        return acc;
      },
      {
        serverToClient: [] as { eventName: string; model: string }[],
        clientToServer: [] as { eventName: string; model: string }[],
      },
    );

    const allModels = Array.from(
      new Set(
        [...events.serverToClient, ...events.clientToServer].map(
          (e) => e.model,
        ),
      ),
    );

    const imports =
      allModels.length > 0
        ? allModels
            .map(
              (model) =>
                `import { ${model} } from "./__generated__/models/${model}";`,
            )
            .join("\n")
        : "";

    const serverToClientLines =
      events.serverToClient.length > 0
        ? events.serverToClient
            .map((e) => `    "${e.eventName}": (message: ${e.model}) => void;`)
            .join("\n")
        : "";

    const clientToServerLines =
      events.clientToServer.length > 0
        ? events.clientToServer
            .map((e) => `    "${e.eventName}": (payload: ${e.model}) => void;`)
            .join("\n")
        : "";

    const lines = [
      `import "use-socket-io-react";`,
      imports,
      "",
      `declare module "use-socket-io-react" {`,
      "  interface ServerToClientEvents {",
      serverToClientLines,
      "  }",
      "",
      "  interface ClientToServerEvents {",
      clientToServerLines,
      "  }",
      "}",
      "",
    ].filter((line, index, arr) => !(line === "" && arr[index - 1] === ""));

    const output = lines.join("\n");

    fs.writeFileSync(outputFile, output);

    return output;
  },
  options: {},
};
