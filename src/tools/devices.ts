import { ToolDefinition, odataProperties, buildOdataQuery } from "./types.js";

export const deviceTools: ToolDefinition[] = [
  {
    name: "vsax_publish_device",
    description: "Register or update a VSAX device instance",
    inputSchema: {
      type: "object",
      properties: {
        InstanceId: { type: "string", description: "Device instance identifier" },
        GroupId: { type: "string", description: "Group to assign device to" },
        Name: { type: "string", description: "Device name" },
        Description: { type: "string", description: "Device description" },
        Contents: { type: "object", description: "Device contents/metadata" },
        NextRefreshIntervalMinutes: { type: "number", description: "Refresh interval in minutes" },
        NotifyWhenOffline: { type: "boolean", description: "Enable offline notifications" },
      },
      required: ["InstanceId", "GroupId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "POST", path: "/api/v3/devices", body: args });
    },
  },
  {
    name: "vsax_move_device",
    description: "Move a device to a different group",
    inputSchema: {
      type: "object",
      properties: {
        deviceId: { type: "string", description: "Device ID to move" },
        GroupId: { type: "string", description: "Target group ID" },
      },
      required: ["deviceId", "GroupId"],
    },
    handler: async (client, args) => {
      const { deviceId, GroupId } = args;
      return client.request({
        method: "PUT",
        path: `/api/v3/devices/${deviceId}/move`,
        body: { GroupId },
      });
    },
  },
  {
    name: "vsax_get_devices",
    description: "Retrieve list of devices with optional filtering, sorting, and pagination. Filterable fields: Identifier, Name, GroupId, GroupName, IsAgentInstalled, IsMdmEnrolled, SiteId, SiteName, OrganizationId, OrganizationName",
    inputSchema: {
      type: "object",
      properties: {
        scopeId: { type: "string", description: "Scope ID to filter devices" },
        ...odataProperties,
      },
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      if (args.scopeId) query.scopeId = args.scopeId as string;
      return client.request({ method: "GET", path: "/api/v3/devices", query });
    },
  },
  {
    name: "vsax_get_device",
    description: "Retrieve detailed information for a specific device",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Device ID" },
      },
      required: ["id"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/devices/${args.id}` });
    },
  },
  {
    name: "vsax_get_device_notifications",
    description: "Retrieve notifications for a specific device. Filterable fields: Id, Message, DateTime, Priority",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Device ID" },
        ...odataProperties,
      },
      required: ["id"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/devices/${args.id}/notifications`, query });
    },
  },
  {
    name: "vsax_get_device_antivirus",
    description: "Retrieve antivirus protection status for a device",
    inputSchema: {
      type: "object",
      properties: {
        deviceId: { type: "string", description: "Device ID" },
      },
      required: ["deviceId"],
    },
    handler: async (client, args) => {
      return client.request({ method: "GET", path: `/api/v3/devices/${args.deviceId}/antivirus` });
    },
  },
  {
    name: "vsax_get_device_custom_fields",
    description: "Retrieve custom fields assigned to a device",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Device ID" },
        ...odataProperties,
      },
      required: ["id"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/devices/${args.id}/customfields`, query });
    },
  },
  {
    name: "vsax_get_device_applied_policies",
    description: "List policies and profiles applied to a device",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Device ID" },
        ...odataProperties,
      },
      required: ["id"],
    },
    handler: async (client, args) => {
      const query = buildOdataQuery(args);
      return client.request({ method: "GET", path: `/api/v3/devices/${args.id}/appliedpolicies`, query });
    },
  },
];
