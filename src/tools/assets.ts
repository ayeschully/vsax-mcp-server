import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const assetTools: ToolDefinition[] = [
  {
    name: "vsax_get_assets",
    description: "Retrieve device asset inventory with hardware/software details including CPU/memory usage, installed software, updates, network adapters, and disks",
    inputSchema: {
      type: "object",
      properties: {
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: "/api/v3/assets", query });
    },
  },
  {
    name: "vsax_get_device_assets",
    description: "Retrieve asset information for a specific device",
    inputSchema: {
      type: "object",
      properties: {
        deviceId: { type: "string", description: "Device ID" },
      },
      required: ["deviceId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/assets/${args.deviceId}` });
    },
  },
];
