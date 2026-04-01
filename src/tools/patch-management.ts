import { ToolDefinition } from "./types.js";

export const patchManagementTools: ToolDefinition[] = [
  {
    name: "vsax_get_patch_policy",
    description: "Retrieve patch management policy settings",
    inputSchema: {
      type: "object",
      properties: {
        policyId: { type: "string", description: "Patch management policy ID" },
      },
      required: ["policyId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/patchmanagement/policies/${args.policyId}` });
    },
  },
  {
    name: "vsax_get_patch_global_rules",
    description: "Retrieve global patch management rules",
    inputSchema: {
      type: "object",
      properties: {
        $top: { type: "number", description: "Number of records to return" },
        $skip: { type: "number", description: "Number of records to skip" },
      },
    },
    handler: async (client, args) => {
      const query: Record<string, string | number | boolean | undefined> = {};
      if (args["$top"] !== undefined) query["$top"] = args["$top"] as number;
      if (args["$skip"] !== undefined) query["$skip"] = args["$skip"] as number;
      return client.request({ method: "GET", path: "/api/v3/patchmanagement/globalrules", query });
    },
  },
];
