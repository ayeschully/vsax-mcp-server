import { VsaxClient } from "../vsax-client.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
  handler: (client: VsaxClient, args: Record<string, unknown>) => Promise<unknown>;
}

/** Common OData query parameters used across list endpoints */
export const odataProperties = {
  $top: { type: "number", description: "Number of records to return" },
  $skip: { type: "number", description: "Number of records to skip" },
  $filter: { type: "string", description: "OData filter expression" },
  $orderby: { type: "string", description: "OData ordering expression" },
  $count: { type: "boolean", description: "Include total count in response" },
} as const;

export function buildOdataQuery(args: Record<string, unknown>): Record<string, string | number | boolean | undefined> {
  const query: Record<string, string | number | boolean | undefined> = {};
  if (args["$top"] !== undefined) query["$top"] = args["$top"] as number;
  if (args["$skip"] !== undefined) query["$skip"] = args["$skip"] as number;
  if (args["$filter"] !== undefined) query["$filter"] = args["$filter"] as string;
  if (args["$orderby"] !== undefined) query["$orderby"] = args["$orderby"] as string;
  if (args["$count"] !== undefined) query["$count"] = args["$count"] as boolean;
  return query;
}
