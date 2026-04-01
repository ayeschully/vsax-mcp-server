#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { VsaxClient } from "./vsax-client.js";
import { allTools } from "./tools/index.js";

const SERVER_NAME = "vsax-mcp-server";
const SERVER_VERSION = "1.0.0";

function getConfig() {
  const serverName = process.env.VSAX_SERVER_NAME;
  const tokenId = process.env.VSAX_TOKEN_ID;
  const tokenSecret = process.env.VSAX_TOKEN_SECRET;

  if (!serverName || !tokenId || !tokenSecret) {
    console.error(
      "Missing required environment variables: VSAX_SERVER_NAME, VSAX_TOKEN_ID, VSAX_TOKEN_SECRET"
    );
    process.exit(1);
  }

  return { serverName, tokenId, tokenSecret };
}

async function main() {
  const config = getConfig();
  const client = new VsaxClient(config);

  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Register all tools
  for (const tool of allTools) {
    // Build zod schema from JSON Schema properties
    const zodShape: Record<string, z.ZodTypeAny> = {};
    const required = new Set(tool.inputSchema.required ?? []);

    for (const [key, prop] of Object.entries(tool.inputSchema.properties)) {
      const p = prop as { type: string; description?: string; items?: { type: string } };
      let zodType: z.ZodTypeAny;

      switch (p.type) {
        case "number":
          zodType = z.number().describe(p.description ?? key);
          break;
        case "boolean":
          zodType = z.boolean().describe(p.description ?? key);
          break;
        case "array":
          zodType = z.array(z.string()).describe(p.description ?? key);
          break;
        case "object":
          zodType = z.record(z.string(), z.unknown()).describe(p.description ?? key);
          break;
        default:
          zodType = z.string().describe(p.description ?? key);
      }

      zodShape[key] = required.has(key) ? zodType : zodType.optional();
    }

    const handler = tool.handler;
    server.tool(
      tool.name,
      tool.description,
      zodShape,
      async (args) => {
        try {
          const result = await handler(client, args as Record<string, unknown>);
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return {
            content: [
              {
                type: "text" as const,
                text: `Error: ${message}`,
              },
            ],
            isError: true,
          };
        }
      }
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
