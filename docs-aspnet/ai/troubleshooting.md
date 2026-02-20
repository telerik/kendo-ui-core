---
title: Troubleshooting
page_title: Telerik {{ site.framework }} AI Coding Assistant Troubleshooting
description: "Find out more about troubleshooting in the {{ site.framework }} AI Coding Assistant."
components: ["aicodingassistant"]
slug: ai_coding_assistant_troubleshooting_aspnet
position: 5
---

# Troubleshooting

This article provides solutions to common issues you may encounter when working with the Telerik {{ site.framework }} AI Tools.

## Hanging Tool Calls in Visual Studio

When using Telerik AI tools in Visual Studio, GitHub Copilot may:
* **hang** during tool invocation;
* show UI for a successful tool response, but actually **fail silently**;
* continue generation without waiting for **parallel tool calls**.

This is a [known issue](https://developercommunity.visualstudio.com/t/Copilot-stopped-working-after-latest-upd/10936456) in older Visual Studio versions that has been fixed in Visual Studio 18.3.0 Insiders (11426.168).


## See Also

* [Telerik {{ site.framework }} AI Coding Assistant Overview]({% slug overview_ai %})
* [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server)
