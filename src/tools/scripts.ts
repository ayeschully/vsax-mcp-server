import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const scriptTools: ToolDefinition[] = [
  {
    name: "vsax_run_script",
    description: "Execute an automation script on specified devices",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string", description: "Script ID to run" },
        DeviceIds: { type: "array", items: { type: "string" }, description: "Array of device IDs" },
        Parameters: { type: "object", description: "Optional script parameters" },
      },
      required: ["scriptId", "DeviceIds"],
    },
    handler: async (client, args) => {
      const { scriptId, ...body } = args;
      return client.request({ method: "POST", path: `/api/v3/scripts/${scriptId}/run`, body });
    },
  },
  {
    name: "vsax_get_script_executions",
    description: "Retrieve execution history for a script",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string", description: "Script ID" },
        ...odataProperties,
      },
      required: ["scriptId"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/scripts/${args.scriptId}/executions`, query });
    },
  },
  {
    name: "vsax_get_script_execution",
    description: "Retrieve details of a specific script execution",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string", description: "Script ID" },
        executionId: { type: "string", description: "Execution ID" },
      },
      required: ["scriptId", "executionId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/scripts/${args.scriptId}/executions/${args.executionId}` });
    },
  },
  {
    name: "vsax_get_scripts",
    description: "Retrieve all available automation scripts",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/scripts", query });
    },
  },
  {
    name: "vsax_get_script",
    description: "Retrieve a specific script definition",
    inputSchema: {
      type: "object",
      properties: {
        scriptId: { type: "string", description: "Script ID" },
      },
      required: ["scriptId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/scripts/${args.scriptId}` });
    },
  },
];
