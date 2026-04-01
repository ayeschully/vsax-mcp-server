# vsax-mcp-server

MCP (Model Context Protocol) server for **VSAX (VSA 10)** by Kaseya. Gives Claude (or any MCP client) full access to the VSAX REST API v3.

## Quick Start

No installation needed — use `npx` directly in your MCP client config:

```json
{
  "mcpServers": {
    "vsax": {
      "command": "npx",
      "args": ["-y", "vsax-mcp-server"],
      "env": {
        "VSAX_SERVER_NAME": "your-server.vsax.net",
        "VSAX_TOKEN_ID": "your-token-id",
        "VSAX_TOKEN_SECRET": "your-token-secret"
      }
    }
  }
}
```

Or install globally:

```bash
npm install -g vsax-mcp-server
```

## Getting Your API Token

1. Log into your VSAX instance
2. Navigate to **Settings > API Tokens**
3. Create a new token — you'll receive a **Token ID** and **Token Secret**
4. Note your server hostname (e.g., `mycompany.vsax.net`)

For full details, see the [VSAX API documentation](https://api.vsax.net/#introduction).

## Configuration

The server requires three environment variables:

| Variable | Description | Example |
|---|---|---|
| `VSAX_SERVER_NAME` | Your VSAX server hostname | `mycompany.vsax.net` |
| `VSAX_TOKEN_ID` | API token ID | `abc123` |
| `VSAX_TOKEN_SECRET` | API token secret | `secret456` |

### Claude Desktop

Add to your config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vsax": {
      "command": "npx",
      "args": ["-y", "vsax-mcp-server"],
      "env": {
        "VSAX_SERVER_NAME": "your-server.vsax.net",
        "VSAX_TOKEN_ID": "your-token-id",
        "VSAX_TOKEN_SECRET": "your-token-secret"
      }
    }
  }
}
```

### Claude Code

Run:

```bash
claude mcp add vsax -e VSAX_SERVER_NAME=your-server.vsax.net -e VSAX_TOKEN_ID=your-token-id -e VSAX_TOKEN_SECRET=your-token-secret -- npx -y vsax-mcp-server
```

### Install from Source

```bash
git clone https://github.com/your-org/vsax-mcp-server.git
cd vsax-mcp-server
npm install
npm run build
```

Then reference the local build in your MCP config:

```json
{
  "mcpServers": {
    "vsax": {
      "command": "node",
      "args": ["/path/to/vsax-mcp-server/dist/index.js"],
      "env": {
        "VSAX_SERVER_NAME": "your-server.vsax.net",
        "VSAX_TOKEN_ID": "your-token-id",
        "VSAX_TOKEN_SECRET": "your-token-secret"
      }
    }
  }
}
```

## Features

67 tools covering every VSAX API v3 endpoint:

| Category | Tools | Operations |
|---|---|---|
| Devices | 8 | publish, move, list, get, notifications, antivirus, custom fields, policies |
| Assets | 2 | list all, get by device |
| Workflows | 5 | run, executions, list, get |
| Tasks | 7 | run, execution status, devices, scripts, script output, list, get |
| Scripts | 5 | run, executions, list, get |
| Notifications | 4 | create, list, get, delete |
| Webhooks | 6 | create, update, regenerate secret, list, get, delete |
| Organizations | 5 | create, update, list, get, custom fields |
| Sites | 5 | create, update, list, get, custom fields |
| Groups | 6 | create, update, list, get, custom fields, package |
| Custom Fields | 6 | list, get, usage, assign, update, unassign |
| Scopes | 3 | list, get, usage |
| Patch Management | 2 | get policy, global rules |
| Endpoint Protection | 1 | get policy |
| Environment | 1 | get info |
| Audit Logs | 1 | get logs |

## Usage Examples

Once configured, you can ask Claude things like:

- *"List all devices in my VSAX instance"*
- *"Show me the antivirus status for device X"*
- *"Run workflow ABC on these 3 devices"*
- *"What scripts have been executed recently?"*
- *"Create a new organization called Acme Corp"*
- *"Show me the audit logs filtered by user admin@company.com"*

## OData Query Support

All list endpoints support OData query parameters:

| Parameter | Description | Example |
|---|---|---|
| `$top` | Number of records to return | `10` |
| `$skip` | Number of records to skip | `20` |
| `$filter` | OData filter expression | `Name eq 'Server01'` |
| `$orderby` | Sort expression | `Name asc` |
| `$count` | Include total count | `true` |

## Troubleshooting

### Server won't start
- Verify all three environment variables are set (`VSAX_SERVER_NAME`, `VSAX_TOKEN_ID`, `VSAX_TOKEN_SECRET`)
- Check that Node.js 18+ is installed: `node --version`

### Authentication errors (401)
- Confirm your Token ID and Token Secret are correct
- Ensure the API token has not expired in VSAX settings
- Verify the server name matches your VSAX instance exactly (no `https://` prefix, no trailing `/`)

### Connection errors
- Check that your VSAX instance is reachable from your machine
- Ensure HTTPS (port 443) is not blocked by a firewall
- Verify the server hostname resolves correctly: `nslookup your-server.vsax.net`

### Empty or unexpected results
- Try using `$top=5` to limit results and verify the endpoint works
- Check filter syntax matches [OData conventions](https://www.odata.org/documentation/)
- Use `vsax_get_environment` to confirm API connectivity

## API Reference

Full VSAX API documentation: https://api.vsax.net/#introduction

## License

MIT
