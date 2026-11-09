---
title: AI-Assisted Migration
page_title: AI-Assisted Migration with the Kendo UI for jQuery Upgrade Assistant
description: "Learn how to upgrade Kendo UI for jQuery projects with the Upgrade Assistant, Kendo CLI codemods, and AI-assisted code review."
slug: ai_assisted_migration_kendoui
components: ["aicodingassistant"]
position: 6
---

# AI-Assisted Migration

The Kendo UI for jQuery Upgrade Assistant is a tool in the [Kendo UI for jQuery MCP server]({% slug kendo_jquery_mcp_server %}) that helps you move an existing project to a newer version of `@progress/kendo-ui`. It combines [Kendo CLI codemods]({% slug kendoui_kendo_cli %}#kendo-migrate) with AI-assisted review of changes that require project-specific fixes.

## How It Works

The upgrade has two stages:

1. **Update the package and run codemods.** Your AI client updates `@progress/kendo-ui` in `package.json` and installs the target version. The Upgrade Assistant then invokes `kendo migrate` for `@progress/kendo-ui` with the source and target versions, applying available codemods without reinstalling packages.
2. **Review and complete the migration.** The assistant returns the codemod output and guidance for remaining changes. Your AI client can search the project for outdated APIs and CSS classes, fix code that codemods could not transform, and identify decisions that need your input.

The Upgrade Assistant runs codemods for `@progress/kendo-ui`; it does not install the new package version itself. Review both the package update and the resulting source changes before accepting them.

## Prerequisites

Before upgrading, ensure you have:

* An existing project that uses `@progress/kendo-ui` and a known source and target version. Your AI client can read the installed version from `package.json` and look up the latest available target version if you do not specify them.
* A [compatible MCP client](https://modelcontextprotocol.io/clients), such as VS Code or Cursor, with the [Kendo UI for jQuery MCP server configured]({% slug kendo_jquery_mcp_server %}).
* An active [Kendo UI for jQuery subscription or trial license]({% slug ai_coding_assistant_overview %}#usage-limits).
* Node.js 22 or 24 and npm for installing the target package and running the [Kendo CLI]({% slug kendoui_kendo_cli %}).

Commit or back up your project before starting so you can review or revert the migration changes.

## Upgrade Your Project

1. Open the project in your IDE and start a new AI chat session. Make sure the Kendo UI for jQuery MCP server is available.
2. Request an upgrade, specifying the versions when you know them. For example, in VS Code, use the tool name to select the Upgrade Assistant:

   ```prompt
   #kendo_jquery_upgrade_assistant Upgrade my Kendo UI for jQuery project from 2025.4.1217 to 2026.2.520.
   ```

   You can also ask to upgrade to the latest version. The AI client must resolve the source and target versions before calling the tool.
3. Allow the AI client to update `@progress/kendo-ui` in `package.json` and run `npm install` in the project directory. The Upgrade Assistant then runs the applicable codemods for the specified version range.
4. Review the codemod results and any follow-up edits suggested or applied by the AI client. Check for remaining outdated APIs, CSS classes, custom implementations, and dynamic expressions that the codemods could not update automatically.
5. Inspect the changes in your project, resolve any outstanding decisions, and run your build and tests. Test the affected UI workflows before shipping the upgrade.

>warning AI-assisted changes may require manual verification. The tool can report incomplete codemod changes, but it cannot guarantee that every project-specific behavior has been migrated.

## When to Use the Upgrade Assistant

Use the Upgrade Assistant when you want to update an existing Kendo UI for jQuery project and resolve breaking changes with AI guidance after running codemods. If you only need the automated package migration and codemods, run [`kendo migrate`]({% slug kendoui_kendo_cli %}#kendo-migrate) directly.

## See Also

* [Kendo UI for jQuery MCP Server Getting Started]({% slug kendo_jquery_mcp_server %})
* [Using the Kendo CLI]({% slug kendoui_kendo_cli %})
* [Kendo UI for jQuery Agentic UI Generator Overview]({% slug ai_coding_assistant_overview %})
