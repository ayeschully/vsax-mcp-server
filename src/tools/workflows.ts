import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const workflowTools: ToolDefinition[] = [
  {
    name: "vsax_run_workflow",
    description: "Execute an automation workflow on specified devices",
    inputSchema: {
      type: "object",
      properties: {
        workflowId: { type: "string", description: "Workflow ID to run" },
        DeviceIds: { type: "array", items: { type: "string" }, description: "Array of device IDs to run workflow on" },
        Parameters: { type: "object", description: "Optional workflow parameters" },
      },
      required: ["workflowId", "DeviceIds"],
    },
    handler: async (client, args) => {
      const { workflowId, ...body } = args;
      return client.request({ method: "POST", path: `/api/v3/workflows/${workflowId}/run`, body });
    },
  },
  {
    name: "vsax_get_workflow_executions",
    description: "Retrieve execution history for a workflow",
    inputSchema: {
      type: "object",
      properties: {
        workflowId: { type: "string", description: "Workflow ID" },
        ...odataProperties,
      },
      required: ["workflowId"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/workflows/${args.workflowId}/executions`, query });
    },
  },
  {
    name: "vsax_get_workflow_execution",
    description: "Retrieve details of a specific workflow execution",
    inputSchema: {
      type: "object",
      properties: {
        workflowId: { type: "string", description: "Workflow ID" },
        executionId: { type: "string", description: "Execution ID" },
      },
      required: ["workflowId", "executionId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/workflows/${args.workflowId}/executions/${args.executionId}` });
    },
  },
  {
    name: "vsax_get_workflows",
    description: "Retrieve all available automation workflows",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/workflows", query });
    },
  },
  {
    name: "vsax_get_workflow",
    description: "Retrieve a specific workflow definition",
    inputSchema: {
      type: "object",
      properties: {
        workflowId: { type: "string", description: "Workflow ID" },
      },
      required: ["workflowId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/workflows/${args.workflowId}` });
    },
  },
];
