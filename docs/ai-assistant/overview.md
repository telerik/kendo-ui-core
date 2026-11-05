---
title: Overview
page_title: Get Started with the Kendo UI for jQuery Agentic UI Generator
description: "Learn about the Kendo UI for jQuery Agentic UI Generator that extends your existing AI coding tool with Kendo UI for jQuery knowledge for greater productivity."
slug: ai_coding_assistant_overview
components: ["aicodingassistant"]
position: 1
---

# Kendo UI for jQuery Agentic UI Generator Overview

The Kendo UI for jQuery Agentic UI Generator boosts your productivity when building applications with Kendo UI for jQuery. It acts as a code generator, delivering a seamless experience for creating high-quality examples using [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui).

<CtaPanelOverview message="@ProductLink is a professional grade UI library with 110+ components for building modern and feature-rich applications. To try it out sign up for a free 30-day trial."></CtaPanelOverview>

The Agentic UI Generator is not a standalone AI coding assistant. It is a Kendo UI for jQuery-specific layer that plugs into the AI tool you already use, such as GitHub Copilot, Cursor, or Claude Code, and adds proprietary Kendo UI for jQuery product knowledge to it.

The Agentic UI Generator is delivered through the [Kendo UI for jQuery MCP Server]({% slug kendo_jquery_mcp_server %})&mdash;a powerful tool for running complex or multi-step prompts that integrates with any MCP-enabled client.

> We recommend the [Kendo UI for jQuery MCP Server]({% slug kendo_jquery_mcp_server %}) for both **Ask** and **Agent** mode when using Visual Studio Code.

## Available Capabilities

The capabilities and MCP tools of the Agentic UI Generator vary across the Telerik and Kendo UI products. The Kendo UI for jQuery MCP server exposes the `kendo_jquery_assistant` tool, which provides context about Kendo UI for jQuery components, their configuration, and API. Your AI client uses this context to generate and explain code that includes Kendo UI for jQuery components.

## Getting Started

To use the Kendo UI for jQuery Agentic UI Generator, you need to have:

* A [Telerik Account](https://www.telerik.com/account/).
* An active [DevCraft or Kendo UI for jQuery license] or a [Kendo UI for jQuery trial license](https://www.telerik.com/kendo-jquery-ui).
* An application that has [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui/documentation/intro/first-steps) installed.

## Intended Use

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

You can use the Agentic UI Generator for:

* Initial code generation&mdash;Quickly add components to your app to speed up the initial development.
* Component configuration&mdash;Enable or disable specific component features, or fine tune the configuration through prompting. More complex configurations are possible but may require additional manual work to be production-ready.
* Dummy data generation and data binding&mdash;Quickly add data to your app for testing and prototyping purposes. Avoid exposing or providing access to your proprietary or production data to AI-enabled tools.
* Step-by-step explanations&mdash;Understand the solutions provided by the Agentic UI Generator through the detailed explanations (depends on the tool, mode, and model used). To further develop your knowledge, check the respective documentation.
* Preliminary troubleshooting&mdash;Resolve obvious and easy-to-solve issues affecting your code. For more complex issues, look for assistance from the community or contact the support team.

> The Agentic UI Generator is not intended for styling and theme customization. If you are looking for AI-powered styling and theming, check out [ThemeBuilder](https://www.telerik.com/themebuilder).

## Recommendations

Consider the following recommendations when working with the Agentic UI Generator:

* When switching between tasks and files, start a new session in a new chat window to avoid polluting the context with irrelevant or outdated information.
* At the time of publishing, **Claude Sonnet 4** and **GPT-5** produce optimal results.
* Sometimes, the Agentic UI Generator might generate custom styles. To avoid any custom styling, include a similar statement in your prompts: `Don't add custom CSS styles.`

## Usage Limits

Your access to the Kendo UI for jQuery Agentic UI Generator depends on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

* Subscription License:
  * A Subscription is the primary license that grants full access to the Agentic UI Generator.
  * Best for ongoing and high-volume usage.
* Perpetual License:
  * Perpetual licenses do not include access to the Agentic UI Generator.
  * To use the Agentic UI Generator, start a 30-day trial.
* Trial License:
  * Trial licenses include a 30-day trial for the Agentic UI Generator.
  * New users automatically receive the trial when they start a trial for the product.
  * Designed for evaluating the feature before purchasing.

> When using the Kendo jQuery MCP server, one prompt may trigger several requests, depending on the prompt complexity.

> All Telerik AI tools share the same fair usage quota for your Telerik account. For example, requests made through the Kendo UI for jQuery MCP server are counted toward the same overall usage quota.

## Privacy

The Kendo UI for jQuery Agentic UI Generator operates under the following conditions:

* The Agentic UI Generator does not have access to your workspace and application code. Note that when using the Kendo jQuery MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The Agentic UI Generator does not use your prompts to train Telerik AI models.
* The Agentic UI Generator does not generate the actual responses and has no access to these responses. It only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) provide better responses.
* The Agentic UI Generator does not associate your prompts to your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The Agentic UI Generator stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#usage-limits).

Make sure to also get familiar with the terms and privacy policy of your selected AI model and AI client.

## Next Steps

* Getting Started with the [Kendo UI for jQuery Agentic UI Generator]({% slug kendo_jquery_mcp_server %}).
* Check out the latest [updates for the Kendo UI for jQuery Agentic UI Generator]({% slug ai_coding_assistant_changelog %}).
* Learn how to set up [On-Premises Deployment]({% slug ai_coding_assistant_on_premises %}) for the Agentic UI Generator.
