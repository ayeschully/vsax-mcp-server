import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const groupTools: ToolDefinition[] = [
  {
    name: "vsax_create_group",
    description: "Create a new group",
    inputSchema: {
      type: "object",
      properties: {
        Name: { type: "string", description: "Group name" },
        SiteId: { type: "string", description: "Site ID the group belongs to" },
        Description: { type: "string", description: "Group description" },
      },
      required: ["Name", "SiteId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: "/api/v3/groups", body: args });
    },
  },
  {
    name: "vsax_update_group",
    description: "Update a group",
    inputSchema: {
      type: "object",
      properties: {
        groupId: { type: "string", description: "Group ID" },
        Name: { type: "string", description: "Group name" },
        SiteId: { type: "string", description: "Site ID" },
        Description: { type: "string", description: "Group description" },
      },
      required: ["groupId"],
    },
    handler: async (client, args) => {
      const { groupId, ...body } = args;
      return client.request({ method: "PUT", path: `/api/v3/groups/${groupId}`, body });
    },
  },
  {
    name: "vsax_get_groups",
    description: "Retrieve all groups",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/groups", query });
    },
  },
  {
    name: "vsax_get_group",
    description: "Retrieve a specific group",
    inputSchema: {
      type: "object",
      properties: {
        groupId: { type: "string", description: "Group ID" },
      },
      required: ["groupId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/groups/${args.groupId}` });
    },
  },
  {
    name: "vsax_get_group_custom_fields",
    description: "Retrieve custom fields for a group",
    inputSchema: {
      type: "object",
      properties: {
        groupId: { type: "string", description: "Group ID" },
        ...odataProperties,
      },
      required: ["groupId"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/groups/${args.groupId}/customfields`, query });
    },
  },
  {
    name: "vsax_get_group_package",
    description: "Retrieve deployment package for a group",
    inputSchema: {
      type: "object",
      properties: {
        groupId: { type: "string", description: "Group ID" },
      },
      required: ["groupId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/groups/${args.groupId}/package` });
    },
  },
];
