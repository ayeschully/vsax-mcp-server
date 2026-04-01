import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const scopeTools: ToolDefinition[] = [
  {
    name: "vsax_get_scopes",
    description: "Retrieve all scopes",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/scopes", query });
    },
  },
  {
    name: "vsax_get_scope",
    description: "Retrieve a specific scope",
    inputSchema: {
      type: "object",
      properties: {
        scopeId: { type: "string", description: "Scope ID" },
      },
      required: ["scopeId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/scopes/${args.scopeId}` });
    },
  },
  {
    name: "vsax_get_scope_usage",
    description: "Retrieve scope assignment details",
    inputSchema: {
      type: "object",
      properties: {
        scopeId: { type: "string", description: "Scope ID" },
      },
      required: ["scopeId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/scopes/${args.scopeId}/usage` });
    },
  },
];
