import { ToolDefinition } from "./types.js";

export const endpointProtectionTools: ToolDefinition[] = [
  {
    name: "vsax_get_endpoint_protection_policy",
    description: "Retrieve endpoint protection policy details",
    inputSchema: {
      type: "object",
      properties: {
        policyId: { type: "string", description: "Endpoint protection policy ID" },
      },
      required: ["policyId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/endpointprotection/policies/${args.policyId}` });
    },
  },
];
