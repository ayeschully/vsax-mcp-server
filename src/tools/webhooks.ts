import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const webhookTools: ToolDefinition[] = [
  {
    name: "vsax_create_webhook",
    description: "Register a new notification webhook",
    inputSchema: {
      type: "object",
      properties: {
        Url: { type: "string", description: "Webhook URL endpoint" },
        Events: { type: "array", items: { type: "string" }, description: "Event types to subscribe to" },
        Secret: { type: "string", description: "Optional secret key for webhook verification" },
      },
      required: ["Url", "Events"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: "/api/v3/webhooks", body: args });
    },
  },
  {
    name: "vsax_update_webhook",
    description: "Update a notification webhook configuration",
    inputSchema: {
      type: "object",
      properties: {
        webhookId: { type: "string", description: "Webhook ID" },
        Url: { type: "string", description: "Webhook URL endpoint" },
        Events: { type: "array", items: { type: "string" }, description: "Event types to subscribe to" },
      },
      required: ["webhookId"],
    },
    handler: async (client, args) => {
      const { webhookId, ...body } = args;
      return client.request({ method: "PUT", path: `/api/v3/webhooks/${webhookId}`, body });
    },
  },
  {
    name: "vsax_regenerate_webhook_secret",
    description: "Generate a new secret key for a webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhookId: { type: "string", description: "Webhook ID" },
      },
      required: ["webhookId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: `/api/v3/webhooks/${args.webhookId}/regenerate-secret` });
    },
  },
  {
    name: "vsax_get_webhooks",
    description: "Retrieve all configured notification webhooks",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/webhooks", query });
    },
  },
  {
    name: "vsax_get_webhook",
    description: "Retrieve a specific webhook configuration",
    inputSchema: {
      type: "object",
      properties: {
        webhookId: { type: "string", description: "Webhook ID" },
      },
      required: ["webhookId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/webhooks/${args.webhookId}` });
    },
  },
  {
    name: "vsax_delete_webhook",
    description: "Delete a notification webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhookId: { type: "string", description: "Webhook ID" },
      },
      required: ["webhookId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "DELETE", path: `/api/v3/webhooks/${args.webhookId}` });
    },
  },
];
