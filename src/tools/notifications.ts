import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const notificationTools: ToolDefinition[] = [
  {
    name: "vsax_create_notification",
    description: "Create a new notification in VSAX",
    inputSchema: {
      type: "object",
      properties: {
        Title: { type: "string", description: "Notification title" },
        Message: { type: "string", description: "Notification message" },
        Priority: { type: "string", description: "Notification priority" },
        Recipients: { type: "array", items: { type: "string" }, description: "Array of recipient identifiers" },
      },
      required: ["Title", "Message"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: "/api/v3/notifications", body: args });
    },
  },
  {
    name: "vsax_get_notifications",
    description: "Retrieve all notifications",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/notifications", query });
    },
  },
  {
    name: "vsax_get_notification",
    description: "Retrieve a specific notification",
    inputSchema: {
      type: "object",
      properties: {
        notificationId: { type: "string", description: "Notification ID" },
      },
      required: ["notificationId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/notifications/${args.notificationId}` });
    },
  },
  {
    name: "vsax_delete_notification",
    description: "Delete a specific notification",
    inputSchema: {
      type: "object",
      properties: {
        notificationId: { type: "string", description: "Notification ID" },
      },
      required: ["notificationId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "DELETE", path: `/api/v3/notifications/${args.notificationId}` });
    },
  },
];
