import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const siteTools: ToolDefinition[] = [
  {
    name: "vsax_create_site",
    description: "Create a new site",
    inputSchema: {
      type: "object",
      properties: {
        Name: { type: "string", description: "Site name" },
        OrganizationId: { type: "string", description: "Organization ID the site belongs to" },
        Description: { type: "string", description: "Site description" },
      },
      required: ["Name", "OrganizationId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: "/api/v3/sites", body: args });
    },
  },
  {
    name: "vsax_update_site",
    description: "Update a site",
    inputSchema: {
      type: "object",
      properties: {
        siteId: { type: "string", description: "Site ID" },
        Name: { type: "string", description: "Site name" },
        OrganizationId: { type: "string", description: "Organization ID" },
        Description: { type: "string", description: "Site description" },
      },
      required: ["siteId"],
    },
    handler: async (client, args) => {
      const { siteId, ...body } = args;
      return client.request({ method: "PUT", path: `/api/v3/sites/${siteId}`, body });
    },
  },
  {
    name: "vsax_get_sites",
    description: "Retrieve all sites",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/sites", query });
    },
  },
  {
    name: "vsax_get_site",
    description: "Retrieve a specific site",
    inputSchema: {
      type: "object",
      properties: {
        siteId: { type: "string", description: "Site ID" },
      },
      required: ["siteId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/sites/${args.siteId}` });
    },
  },
  {
    name: "vsax_get_site_custom_fields",
    description: "Retrieve custom fields for a site",
    inputSchema: {
      type: "object",
      properties: {
        siteId: { type: "string", description: "Site ID" },
        ...odataProperties,
      },
      required: ["siteId"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/sites/${args.siteId}/customfields`, query });
    },
  },
];
