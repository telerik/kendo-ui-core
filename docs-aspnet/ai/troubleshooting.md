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


>warning**Known Issue: Hanging tool calls in Visual Studio**
>
>When using Telerik AI tools in Visual Studio, GitHub Copilot may:
>
>- **hang** during tool invocation;
>- show UI for a successful tool response, but actually **fail silently**;
>- continue generation without waiting for **parallel tool calls**.
>
>In these cases, the response may be generated but not provided to the >Copilot Agent UI.
>
>This is a known issue in Visual Studio Copilot, not related to Telerik MCP >servers or AI tools, and does not reproduce in VS Code.
>
>For more details, see the related Visual Studio Developer Community >issue:
>https://developercommunity.visualstudio.com/t/>Copilot-stopped-working-after-latest-upd/10936456
>
>Microsoft has acknowledged the issue and marked it as **Fixed - Pending >Release**. A future Visual Studio update is expected to resolve it.


## See Also

* [Telerik {{ site.framework }} AI Coding Assistant Overview]({% slug overview_ai %})
* [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server)
