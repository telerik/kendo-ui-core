---
title: Overview
page_title: Get Started with the Kendo UI for jQuery AI Coding Assistant
description: "Learn about the AI-powered coding assistant that integrates with your code editor for greated productivity." 
slug: ai_coding_assistant_overview
position: 1
---

# Kendo UI for jQuery AI Coding Assistant Overview

The Kendo UI for jQuery AI Coding Assistant boosts your productivity when building applications with Kendo UI for jQuery. This AI-powered tool acts as a code generator, delivering a seamless experience for creating high-quality examples using [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui).

<CtaPanelOverview message="@ProductLink is a professional grade UI library with 110+ components for building modern and feature-rich applications. To try it out sign up for a free 30-day trial."></CtaPanelOverview>

The AI Coding Assistant is integrated in the [Kendo UI for jQuery MCP Server]({% slug kendo_jquery_mcp_server %})&mdash;a powerful tool for running complex or multi-step prompts that integrates with any MCP-enabled client.

> We recommend the [Kendo UI for jQuery MCP Server]({% slug kendo_jquery_mcp_server %}) for both **Ask** and **Agent** mode when using Visual Studio Code.

## Getting Started

To use the Kendo UI for jQuery AI Coding assistant, you need to have: 

* A [Telerik Account](https://www.telerik.com/account/).
* An active [DevCraft or Kendo UI for jQuery license] or a [Kendo UI for jQuery trial license](https://www.telerik.com/kendo-jquery-ui).
* An application that has [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui/documentation/intro/first-steps) installed.

## Intended Use

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

You can use the AI Coding Assistant for:

* Initial code generation&mdash;Quickly add components to your app to speed up the initial development.
* Component configuration&mdash;Enable or disable specific component features, or fine tune the configuration through prompting. More complex configurations are possible but may require additional manual work to be production-ready.
* Dummy data generation and data binding&mdash;Quickly add data to your app for testing and prototyping purposes. Avoid exposing or providing access to your proprietary or production data to AI-enabled tools.
* Step-by-step explanations&mdash;Understand the solutions provided by the AI Coding Assistant through the detailed explanations (depends on the tool, mode, and model used). To further develop your knowledge, check the respective documentation.
* Preliminary troubleshooting&mdash;Resolve obvious and easy-to-solve issues affecting your code. For more complex issues, look for assistance from the community or contact the support team.

> The AI Coding Assistant is not intended for styling and theme customization. If you are looking for AI-powered styling and theming, check out [ThemeBuilder](https://www.telerik.com/themebuilder).

## Recommendations

Consider the following recommendations when working with the AI Coding Assistant:

* When switching between tasks and files, start a new session in a new chat window to avoid polluting the context with irrelevant or outdated information.
* At the time of publishing, **Claude Sonnet 4** and **GPT-5** produce optimal results.
* Sometimes, the AI Coding Assistant might generate custom styles. To avoid any custom styling, include a similar statement in your prompts: `Don't add custom CSS styles.`

## Usage Limits

Your access to the Kendo UI for jQuery AI Coding Assistant depends on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

* Subscription License:
  * A Subscription is the primary license that grants full access to the AI Coding Assistant.
  * Includes a virtually unlimited number of requests, with a fair use threshold of 300 requests per day.
  * Best for ongoing and high-volume usage.
* Perpetual License (Limited Access):
  * Perpetual licenses include limited access of 50 requests per year.
  * Intended for exploring and trying out the AI Coding Assistant.
  * For continued or higher-volume access, upgrade to a Subscription license.
* Trial License:
  * Trial licenses include 300 requests per trial per year.
  * Reactivating the same trial for a new release does not grant additional requests.
  * Designed for evaluating the feature before purchasing.

> When using the Kendo jQuery MCP server, one prompt may trigger several requests, depending on the prompt complexity.

## Privacy

The Kendo UI for jQuery AI Coding Assistant operates under the following conditions:

* The Assistant does not have access to your workspace and application code. Note that when using the Kendo jQuery MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The Assistant does not use your prompts to train Telerik AI models.
* The Assistant does not generate the actual responses and has no access to these responses. The Assistant only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) provide better responses.
* The Assistant does not associate your prompts to your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The Assistant stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#usage-limits).

Make sure to also get familiar with the terms and privacy policy of your selected AI model and AI client.

## Next Steps

* Add the [Kendo UI for jQuery MCP Server]({% slug kendo_jquery_mcp_server %}) to an MCP-enabled client.
* Check out the latest [updates for the Kendo UI for jQuery Coding Assistant]({% slug ai_coding_assistant_changelog %}).
