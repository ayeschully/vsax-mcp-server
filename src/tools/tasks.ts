import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const taskTools: ToolDefinition[] = [
  {
    name: "vsax_run_task",
    description: "Execute an automation task on specified devices",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "Task ID to run" },
        DeviceIds: { type: "array", items: { type: "string" }, description: "Array of device IDs" },
        Parameters: { type: "object", description: "Optional task parameters" },
      },
      required: ["taskId", "DeviceIds"],
    },
    handler: async (client, args) => {
      const { taskId, ...body } = args;
      return client.request({ method: "POST", path: `/api/v3/tasks/${taskId}/run`, body });
    },
  },
  {
    name: "vsax_get_task_execution",
    description: "Retrieve task execution status",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "Task ID" },
        executionId: { type: "string", description: "Execution ID" },
      },
      required: ["taskId", "executionId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/tasks/${args.taskId}/executions/${args.executionId}` });
    },
  },
  {
    name: "vsax_get_task_execution_devices",
    description: "List devices involved in a task execution",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "Task ID" },
        executionId: { type: "string", description: "Execution ID" },
        $top: { type: "number", description: "Number of records to return" },
        $skip: { type: "number", description: "Number of records to skip" },
      },
      required: ["taskId", "executionId"],
    },
    handler: async (client, args) => {
      const query: Record<string, string | number | boolean | undefined> = {};
      if (args["$top"] !== undefined) query["$top"] = args["$top"] as number;
      if (args["$skip"] !== undefined) query["$skip"] = args["$skip"] as number;
      return client.request({ method: "GET", path: `/api/v3/tasks/${args.taskId}/executions/${args.executionId}/devices`, query });
    },
  },
  {
    name: "vsax_get_task_execution_scripts",
    description: "Retrieve scripts executed in a task execution",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "Task ID" },
        executionId: { type: "string", description: "Execution ID" },
      },
      required: ["taskId", "executionId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/tasks/${args.taskId}/executions/${args.executionId}/scripts` });
    },
  },
  {
    name: "vsax_get_task_execution_script_output",
    description: "Retrieve output from a script executed in a task",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "Task ID" },
        executionId: { type: "string", description: "Execution ID" },
        scriptId: { type: "string", description: "Script ID" },
      },
      required: ["taskId", "executionId", "scriptId"],
    },
    handler: async (client, args) => {
      return client.request({
        method: "GET",
        path: `/api/v3/tasks/${args.taskId}/executions/${args.executionId}/scripts/${args.scriptId}/output`,
      });
    },
  },
  {
    name: "vsax_get_tasks",
    description: "Retrieve all available automation tasks",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/tasks", query });
    },
  },
  {
    name: "vsax_get_task",
    description: "Retrieve a specific task definition",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string", description: "Task ID" },
      },
      required: ["taskId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/tasks/${args.taskId}` });
    },
  },
];
