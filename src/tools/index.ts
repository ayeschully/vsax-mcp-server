import { ToolDefinition } from "./types.js";
import { deviceTools } from "./devices.js";
import { assetTools } from "./assets.js";
import { workflowTools } from "./workflows.js";
import { taskTools } from "./tasks.js";
import { scriptTools } from "./scripts.js";
import { notificationTools } from "./notifications.js";
import { webhookTools } from "./webhooks.js";
import { organizationTools } from "./organizations.js";
import { siteTools } from "./sites.js";
import { groupTools } from "./groups.js";
import { customFieldTools } from "./custom-fields.js";
import { scopeTools } from "./scopes.js";
import { patchManagementTools } from "./patch-management.js";
import { endpointProtectionTools } from "./endpoint-protection.js";
import { environmentTools } from "./environment.js";
import { auditLogTools } from "./audit-logs.js";

export const allTools: ToolDefinition[] = [
  ...deviceTools,
  ...assetTools,
  ...workflowTools,
  ...taskTools,
  ...scriptTools,
  ...notificationTools,
  ...webhookTools,
  ...organizationTools,
  ...siteTools,
  ...groupTools,
  ...customFieldTools,
  ...scopeTools,
  ...patchManagementTools,
  ...endpointProtectionTools,
  ...environmentTools,
  ...auditLogTools,
];

export { ToolDefinition } from "./types.js";
