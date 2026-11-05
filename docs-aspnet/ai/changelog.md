---
title: Changelog
page_title: Telerik {{ site.framework }} Agentic UI Generator Changelog
description: "Find out about the latest changes and improvements in the {{ site.framework }} Agentic UI Generator."
components: ["aicodingassistant"]
previous_url: /ai/release-notes, /ai/copilot-extension
slug: ai_coding_assistant_release_notes_aspnet
position: 5
---

# Telerik {{ site.framework }} Agentic UI Generator Changelog

Learn about the latest changes, improvements and bug fixes in the Telerik UI for {{ site.framework }} Agentic UI Generator (formerly AI Coding Assistant). The updates are structured in a chronological order with the newest ones appearing first.

## November, 2026 Changelog

### Highlights

- Renamed the Telerik {{ site.framework }} AI Coding Assistant to Telerik {{ site.framework }} Agentic UI Generator to unify the naming of the AI tooling across the Telerik and Kendo UI component products. The MCP server package, server name, and configuration remain unchanged.

## March, 2026 Changelog

### Highlights

- Updated the component snippets to align with the latest version.

## January, 2026 Changelog

### Highlights

- The MCP server automatically recognizes your Telerik license and grants access to the appropriate tools based on your license type.
- **NuGet distribution**&mdash;The MCP server is now distributed via NuGet instead of npm.
- **Simplified installation**&mdash;Unified installation process for all Telerik MCP servers through a single MCP server configuration. See the [Installation Guide]({% slug ai_mcp_server %}#installation) for details.

{% if site.core %}

## November, 2025 Changelog

> [Microsoft has deprecated GitHub Copilot extensions](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps) on November 10th, 2025, in favor of the Model Context Protocol (MCP) standard.
>
> From that date, the Telerik and Kendo UI AI Coding Assistants will be available exclusively through our [MCP server](slug:ai_mcp_server), ensuring you continue to enjoy the same powerful capabilities that are delivered by a modern, open, and officially recommended standard.
> {% endif %}

## October, 2025 Changelog

### Highlights

- Improved APIs for public members for better discovery by the LLM.
- Refined output formatting of the MCP tool to improve the ability of the LLM to follow the exact provided instructions more closely.
- Enhanced the MCP tool's instructions to provide more accurate output.

{% if site.core %}

## August, 2025 Changelog

{% endif %}
{% if site.mvc %}

## September, 2025 Changelog

{% endif %}

### Highlights

- Initial launch of the AI Coding Assistant for {{ site.framework }}.
- Provides intelligent code suggestions, context-aware documentation, and quick access to component APIs.
- Streamlines development workflow with automated code generation and error detection.

## See Also

- [Telerik {{ site.framework }} Agentic UI Generator Overview]({% slug overview_ai %})
