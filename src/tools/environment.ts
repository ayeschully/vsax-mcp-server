import { ToolDefinition } from "./types.js";

export const environmentTools: ToolDefinition[] = [
  {
    name: "vsax_get_environment",
    description: "Retrieve VSAX system environment information including API version, server info, and capabilities",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: async (client) => {
      return client.request({ method: "GET", path: "/api/v3/environment" });
    },
  },
];
