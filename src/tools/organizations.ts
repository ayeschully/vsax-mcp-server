import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const organizationTools: ToolDefinition[] = [
  {
    name: "vsax_create_organization",
    description: "Create a new organization",
    inputSchema: {
      type: "object",
      properties: {
        Name: { type: "string", description: "Organization name" },
        Description: { type: "string", description: "Organization description" },
      },
      required: ["Name"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: "/api/v3/organizations", body: args });
    },
  },
  {
    name: "vsax_update_organization",
    description: "Update an organization",
    inputSchema: {
      type: "object",
      properties: {
        organizationId: { type: "string", description: "Organization ID" },
        Name: { type: "string", description: "Organization name" },
        Description: { type: "string", description: "Organization description" },
      },
      required: ["organizationId"],
    },
    handler: async (client, args) => {
      const { organizationId, ...body } = args;
      return client.request({ method: "PUT", path: `/api/v3/organizations/${organizationId}`, body });
    },
  },
  {
    name: "vsax_get_organizations",
    description: "Retrieve all organizations",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/organizations", query });
    },
  },
  {
    name: "vsax_get_organization",
    description: "Retrieve a specific organization",
    inputSchema: {
      type: "object",
      properties: {
        organizationId: { type: "string", description: "Organization ID" },
      },
      required: ["organizationId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/organizations/${args.organizationId}` });
    },
  },
  {
    name: "vsax_get_organization_custom_fields",
    description: "Retrieve custom fields for an organization",
    inputSchema: {
      type: "object",
      properties: {
        organizationId: { type: "string", description: "Organization ID" },
        ...odataProperties,
      },
      required: ["organizationId"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/organizations/${args.organizationId}/customfields`, query });
    },
  },
];
