import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const auditLogTools: ToolDefinition[] = [
  {
    name: "vsax_get_audit_logs",
    description: "Retrieve audit log entries. Filterable fields: User, Action, ResourceType, DateTime, Status",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/auditlogs", query });
    },
  },
];
