---
title: Getting Started
page_title: Getting Started with the Telerik UI for ASP.NET Core Agentic UI Generator
description: Learn how to set up the Telerik UI for ASP.NET Core Agentic UI Generator using the Telerik CLI, which automates project creation and configuration through a single guided command.
slug: agentic-ui-generator-getting-started-core
position: 2
tags: telerik,aspnet-core,ai,agentic,cli,generator,installation
previous_url: /ai/ai-coding-assistant/mcp-server, /ai/installation
published: True
tag: updated
---

# Getting Started with the Agentic UI Generator

The Agentic UI Generator is an intelligent development tool delivered through the [Telerik ASP.NET Core MCP Server](https://www.nuget.org/packages/Telerik.AspNetCore.MCP) that enables UI generation from natural language prompts. Once configured and authenticated, you can use the Agentic UI Generator tool (`#telerik_ui_generator`) together with the available specialized MCP assistants.

You can set up locally and get started in minutes&mdash;follow the [Quick Start](#quick-start) guide to configure your local environment through the Telerik CLI.

## Prerequisites

To use the Telerik ASP.NET Core MCP server, you need:

* [.NET 8 or newer](https://dotnet.microsoft.com/en-us/download).
* A [compatible MCP client](https://modelcontextprotocol.io/docs/getting-started/intro), such as VS Code or Cursor, with support for MCP server integrations.
* An [active Telerik license](slug:ai-overview-core#license-requirements) - trial or subscription.

## Quick Start

Use the Telerik CLI to handle the entire setup automatically - whether you are starting a new project or adding Telerik UI for ASP.NET Core to an existing one.

Follow these steps to set up the Agentic UI Generator and use it in your IDE:

<TabStrip>
<TabStripTab title="CLI">

1. Install the Telerik CLI globally by executing the following command in any standard command-line interface (CLI) or terminal on your operating system:
   ````SH.skip-repl
   dotnet tool install -g Telerik.CLI
   ````

1. Configure the Telerik NuGet feed, activate or update your Telerik license, and set up the Telerik MCP server with the Telerik CLI:

   <TabStrip>
   <TabStripTab title=".NET 10">

   ````SH.skip-repl
   telerik setup aspnetcore
   ````

   </TabStripTab>
   <TabStripTab title=".NET 8 or 9">

   ````SH.skip-repl
   dotnet tool install Telerik.AspNetCore.MCP

   telerik setup aspnetcore
   ````

   </TabStripTab>
   </TabStrip>

1. (Optional) If you want to use the Agentic UI Generator in a new Telerik ASP.NET Core app, then create it with the [Telerik CLI]({% slug installation_cli %}) or the [Telerik UI for ASP.NET Core project templates]({% slug newprojectwizards_visualstudio_aspnetcore %}).

</TabStripTab>
<TabStripTab title="Manual Setup">

The manual setup is an alternative to configuring the Telerik MCP Server through the Telerik CLI.

1. Ensure you have a [supported license](slug:ai-overview-core#license-requirements) and set up your Telerik license key globally on your machine or in the `.mcp.json` configuration. The server automatically recognizes your license and activates the available MCP tools.

1. Create or update the `.mcp.json` file in the root folder of your solution (if you are using Visual Studio), or the `mcp.json` file in your workspace (if you are using Visual Studio Code or Cursor):

   <TabStrip>
   <TabStripTab title="Visual Studio">

   For more information about using MCP servers in Visual Studio, refer to [Use MCP servers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=visualstudio).

   ````JSON.skip-repl
   {
     "servers": {
       "telerik-aspnetcore-mcp": {
         "type": "stdio",
         "command": "dnx",
         "args": ["Telerik.AspNetCore.MCP", "--yes"],
         // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally
         //"env": {
         //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
         //  // or
         //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
         //}
       }
     },
     "inputs": []
   }
   ````

   To add the Telerik MCP server globally for Visual Studio, manually create an `.mcp.json` file with the content posted above in your user folder.

   </TabStripTab>
   <TabStripTab title="Visual Studio Code">

   For more information about using MCP servers in Visual Studio Code, refer to [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

   To enable the Telerik MCP Server in a [specific workspace](https://code.visualstudio.com/docs/copilot/customization/mcp-servers#_add-an-mcp-server) or ASP.NET Core app, add a `.vscode` folder with an `mcp.json` file at the root of the workspace with the following content:

   ````JSON.skip-repl
   {
     "servers": {
       "telerik-aspnetcore-mcp": {
         "type": "stdio",
         "command": "dnx",
         "args": ["Telerik.AspNetCore.MCP", "--yes"],
         // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally
         //"env": {
         //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
         //  // or
         //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
         //}
       }
     }
   }
   ````

   To add the Telerik MCP server globally for Visual Studio Code, manually create an `mcp.json` file with the content posted above in your user folder.

   </TabStripTab>
   <TabStripTab title="Cursor">

   For more information about using MCP servers in Cursor, refer to [Model Context Protocol](https://docs.cursor.com/context/mcp).

   To enable the Telerik MCP server in [a specific workspace](https://cursor.com/docs/mcp#using-mcpjson) or ASP.NET Core app, add a `.cursor` folder with an `mcp.json` file at the root of the workspace with the following content:

   ````JSON.skip-repl
   {
     "mcpServers": {
       "telerik-aspnetcore-mcp": {
         "type": "stdio",
         "command": "dnx",
         "args": ["Telerik.AspNetCore.MCP", "--yes"],
         // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally
         //"env": {
         //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
         //  // or
         //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
         //}
       }
     }
   }
   ````

   </TabStripTab>
   <TabStripTab title=".NET 8 and 9 Manual Setup">

   For .NET 8 and 9 projects, you can install the MCP server as a local tool without installing it globally. To enable the Telerik MCP Server in a specific ASP.NET Core app, add a `.mcp.json` file to the solution folder (if you are using Visual Studio), or an `mcp.json` file in your workspace (if you are using Visual Studio Code or Cursor).

   1. Install the Telerik MCP server by executing the following command in any standard command-line interface (CLI) or terminal on your operating system:

   ````bash.skip-repl
   dotnet tool install Telerik.AspNetCore.MCP
   ````

   2. Configure MCP in VS Code with local tools by using `.vscode/mcp.json`:

   ````JSON.skip-repl
   {
      "servers": {
         "telerik-aspnetcore-mcp": {
            "type": "stdio",
            "command": "dotnet",
            "args": ["tool", "run", "telerik-aspnetcore-mcp"],
            // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally
            //"env": {
            //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
            //  // or
            //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
            //}
         }
      },
      "inputs": []
   }
   ````

   </TabStripTab>
   </TabStrip>

   You can customize the server name `telerik-aspnetcore-mcp` as desired. The name helps distinguish the MCP server in your configuration and does not affect how you invoke the Agentic UI Generator in your prompt.

   Once the Telerik MCP server is added, make sure that all of its tools are enabled (checked) in the Copilot Chat window's tool selection dropdown.

1. Open your IDE's AI chat interface and begin your prompt with `Telerik` to increase the likelihood that the Agentic UI Generator orchestrator is called. In VS Code, you can start your prompt with the `#telerik_ui_generator` handle to invoke the orchestrator:
    ````TEXT.skip-repl
    #telerik_ui_generator Create a dashboard page with a grid showing sales data and a chart visualizing monthly trends.
    ````

</TabStripTab>
</TabStrip>

## Use Cases

The Agentic UI Generator is designed to help with various development scenarios:

* Generate specific Telerik UI for ASP.NET Core components with particular configurations and features like filtering, validation, and data binding.
* Create full responsive pages
   * Build complete dashboards, landing pages, and listing pages in existing applications.
   * Generate pages similar to the [Progress Design System page templates](https://www.telerik.com/design-system/docs/ui-templates/overview/).
* Modify existing pages
   * Enhance existing dashboards by adding new sections.
   * Insert new sections that match existing layout style and responsiveness.
* Create and modify themes
* Implement Responsive Layout
   * Create new responsive pages and sections.
   * Convert existing pages to be responsive for mobile and tablet views.

For a comprehensive collection of sample prompts covering general UI tasks, layout organization, component implementation, styling, accessibility, and icon selection, see the [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library-core).

>  While the Agentic UI Generator performs great with powerful models like **Claude Sonnet 4.6**, **GPT-5.2**, or **Gemini 3 Pro**, it also excels with smaller models as well (such as **Claude Haiku 4.5** and **GPT 5.1 mini**).

## See Also

* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library-core)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}

/* Border only on the outermost TabStrip — excludes any TabStrip nested inside another */
[class^="tab-strip-module--container"]:not([class^="tab-strip-module--container"] [class^="tab-strip-module--container"]) {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    padding: 15px;
}

/* Breathing room after the nested TabStrip before following content */
[class^="tab-strip-module--container"] [class^="tab-strip-module--container"] {
    margin-bottom: 1.5rem;
    background: #f8f8f8;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 10px;
}

/* "Recommended" badge only on the CLI tab — excludes tablists inside a nested TabStrip */
[class^="tab-strip-module--tabList"]:not([class^="tab-strip-module--container"] [class^="tab-strip-module--container"] [class^="tab-strip-module--tabList"]) [class^="tab-strip-module--tabElement"]:first-child::after {
    content: "Recommended";
    display: inline-block;
    margin-left: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    background: #e7f6ec;
    color: #1f7a3d;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;
    vertical-align: middle;
}

/* Dark mode overrides */
body.t-dark [class^="tab-strip-module--container"]:not([class^="tab-strip-module--container"] [class^="tab-strip-module--container"]) {
    border-color: rgba(113, 166, 255, 0.32);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

body.t-dark [class^="tab-strip-module--container"] [class^="tab-strip-module--container"] {
    background: #11184b;
    border-color: rgba(113, 166, 255, 0.32);
}

body.t-dark [class^="tab-strip-module--tabList"]:not([class^="tab-strip-module--container"] [class^="tab-strip-module--container"] [class^="tab-strip-module--tabList"]) [class^="tab-strip-module--tabElement"]:first-child::after {
    background: #0E2F1F;
    color: #4BBC19;
}
</style>

