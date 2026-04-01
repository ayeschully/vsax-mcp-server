import https from "node:https";
import http from "node:http";

export interface VsaxClientConfig {
  serverName: string;
  tokenId: string;
  tokenSecret: string;
}

export interface VsaxRequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export class VsaxClient {
  private baseUrl: string;
  private authHeader: string;

  constructor(config: VsaxClientConfig) {
    this.baseUrl = `https://${config.serverName}`;
    const credentials = Buffer.from(`${config.tokenId}:${config.tokenSecret}`).toString("base64");
    this.authHeader = `Basic ${credentials}`;
  }

  async request(options: VsaxRequestOptions): Promise<unknown> {
    const url = new URL(`${this.baseUrl}${options.path}`);

    if (options.query) {
      for (const [key, value] of Object.entries(options.query)) {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      Authorization: this.authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const bodyStr = options.body ? JSON.stringify(options.body) : undefined;
    if (bodyStr) {
      headers["Content-Length"] = Buffer.byteLength(bodyStr).toString();
    }

    return new Promise((resolve, reject) => {
      const transport = url.protocol === "https:" ? https : http;
      const req = transport.request(
        url,
        {
          method: options.method,
          headers,
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk: Buffer) => chunks.push(chunk));
          res.on("end", () => {
            const raw = Buffer.concat(chunks).toString("utf-8");
            const statusCode = res.statusCode ?? 0;

            if (statusCode >= 200 && statusCode < 300) {
              if (!raw || raw.trim() === "") {
                resolve({ success: true, statusCode });
              } else {
                try {
                  resolve(JSON.parse(raw));
                } catch {
                  resolve({ data: raw, statusCode });
                }
              }
            } else {
              let errorBody: unknown;
              try {
                errorBody = JSON.parse(raw);
              } catch {
                errorBody = raw;
              }
              reject(
                new Error(
                  `VSAX API error ${statusCode}: ${JSON.stringify(errorBody)}`
                )
              );
            }
          });
        }
      );

      req.on("error", reject);
      if (bodyStr) {
        req.write(bodyStr);
      }
      req.end();
    });
  }
}
