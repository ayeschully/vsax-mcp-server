import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const customFieldTools: ToolDefinition[] = [
  {
    name: "vsax_get_custom_fields",
    description: "Retrieve all defined custom fields",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/customfields", query });
    },
  },
  {
    name: "vsax_get_custom_field",
    description: "Retrieve a specific custom field definition",
    inputSchema: {
      type: "object",
      properties: {
        fieldId: { type: "string", description: "Custom field ID" },
      },
      required: ["fieldId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/customfields/${args.fieldId}` });
    },
  },
  {
    name: "vsax_get_custom_field_usage",
    description: "Retrieve where a custom field is assigned",
    inputSchema: {
      type: "object",
      properties: {
        fieldId: { type: "string", description: "Custom field ID" },
      },
      required: ["fieldId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/customfields/${args.fieldId}/usage` });
    },
  },
  {
    name: "vsax_assign_custom_field",
    description: "Assign a custom field to a resource",
    inputSchema: {
      type: "object",
      properties: {
        fieldId: { type: "string", description: "Custom field ID" },
        ResourceType: { type: "string", description: "Type of resource to assign to" },
        ResourceId: { type: "string", description: "Resource ID to assign to" },
        Value: { type: "string", description: "Value for the custom field" },
      },
      required: ["fieldId", "ResourceType", "ResourceId", "Value"],
    },
    handler: async (client, args) => {
      const { fieldId, ...body } = args;
      return client.request({ method: "POST", path: `/api/v3/customfields/${fieldId}/assign`, body });
    },
  },
  {
    name: "vsax_update_custom_field_assignment",
    description: "Update a custom field assignment value",
    inputSchema: {
      type: "object",
      properties: {
        fieldId: { type: "string", description: "Custom field ID" },
        assignmentId: { type: "string", description: "Assignment ID" },
        Value: { type: "string", description: "New value for the custom field" },
      },
      required: ["fieldId", "assignmentId", "Value"],
    },
    handler: async (client, args) => {
      const { fieldId, assignmentId, ...body } = args;
      return client.request({ method: "PUT", path: `/api/v3/customfields/${fieldId}/assign/${assignmentId}`, body });
    },
  },
  {
    name: "vsax_unassign_custom_field",
    description: "Remove a custom field assignment",
    inputSchema: {
      type: "object",
      properties: {
        fieldId: { type: "string", description: "Custom field ID" },
        assignmentId: { type: "string", description: "Assignment ID to remove" },
      },
      required: ["fieldId", "assignmentId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "DELETE", path: `/api/v3/customfields/${args.fieldId}/assign/${args.assignmentId}` });
    },
  },
];
