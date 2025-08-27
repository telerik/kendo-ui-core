---
title: Copilot Extension
page_title: Telerik ASP.NET Core GitHub Copilot Extension
description: Learn how to add and use the Telerik ASP.NET Core GitHub Copilot extension as an ASP.NET Core AI coding assistant and code generator for better developer productivity. The Telerik ASP.NET Core GitHub Copilot extension provides proprietary context about Telerik UI for ASP.NET Core to AI-powered software.
slug: ai_copilot_extension
position: 3
---

# Telerik {{ site.framework }} GitHub Copilot Extension

The Telerik {{ site.framework }} [GitHub Copilot](https://github.com/features/copilot) extension provides proprietary context for the [{{ site.product }} components](https://www.telerik.com/aspnet-core-ui). The extension works as an {{ site.framework }} AI code generator and can help you reach new levels of developer productivity. You can get useful tips and generate tailored code snippets that include {{ site.product }} HtmlHelper and TagHelper components, along with their APIs.

## Prerequisites

To use the Telerik GitHub Copilot extension for {{ site.framework }}, you need:

* An active [GitHub Copilot](https://github.com/features/copilot) subscription. You can enable or configure GitHub Copilot on the [Copilot Settings page in your GitHub account](https://github.com/settings/copilot).
* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or {{ site.product }} license](https://www.telerik.com/purchase/aspnet-core-ui) or a [{{ site.product }} trial](https://www.telerik.com/aspnet-core-ui).
* An [{{ site.framework }} application that includes {{ site.product }}](slug:overview_aspnetmvc6_aspnetmvc).

## Installation

To install the Telerik {{ site.framework }} Copilot extension:

1. Install the GitHub Apps:
    * For HtmlHelper components, go to the [TelerikASPNetCoreHtml GitHub App](https://github.com/apps/telerikaspnetcorehtml) page and click the **Install** button. 
    * For TagHelper components, go to the [TelerikASPNetCoreTag GitHub App](https://github.com/apps/telerikaspnetcoretag) page and click the **Install** button. 

1. You will see a list that includes your GitHub account and all GitHub organizations that you are part of. Normally, select your GitHub account.
1. Click the **Install &amp; Authorize** button. This will authorize the GitHub Copilot extension to integrate with your GitHub account.
1. Enter your GitHub password.
1. You will be redirected to `telerik.com`. Enter your Telerik account credentials if prompted. This will authorize the GitHub Copilot extension to integrate with your Telerik account.
1. Upon successful Telerik authentication, you will be redirected once again to a page that confirms successful Copilot extension installation.
1. Restart your [Copilot-enabled apps](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions#supported-clients-and-ides) (for example, VS Code).
1. Start a new chat session in Copilot.

## Usage

> When switching between tasks and files, start a new session in a new chat window to avoid polluting the context with irrelevant or outdated information.

To use the Telerik {{ site.framework }} Copilot extension:

1. Open the GitHub Copilot chat window in your [Copilot-enabled app](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions#supported-clients-and-ides).
1. Choose your preferred mode and model.<br/>At the time of publishing, **Claude Sonnet 4** and **GPT-5** produce optimal results.
1. Make sure you are in **Ask** mode and not in **Edit** or **Agent** mode. The **Edit** and **Agent** modes do not use the Telerik Copilot extension. However, the **Agent** mode can use the [Telerik {{ site.framework }} MCP server](slug:ai_mcp_server).
1. Start your prompt with `@telerikaspnetcorehtml` for the HtmlHelper components and `@telerikaspnetcoretag` for TagHelper components, and type your request. Make sure that `@telerikaspnetcorehtml` or `@telerikaspnetcoretag` are recognized and highlighted. Otherwise the extensions may not have been installed.
1. Inspect the output and verify that [**TelerikASPNetCoreHtml**](https://github.com/apps/telerikaspnetcorehtml) or [**TelerikASPNetCoreTag**](https://github.com/apps/telerikaspnetcoretag) is used.

    ![GitHub Copilot Extension uses Telerik {{ site.framework }} AI Coding Assistant](images/extension-confirmation.png)

1. If requested, grant permission to the Telerik {{ site.framework }} extension to read your workspace files.
1. If you want to prompt for information or code that are not related to your previous prompts, it is a good practice to start a new session in a new chat window, so that the context is not polluted by irrelevant old information.

## Sample Prompts

The following list describes how your prompts may look like:

* When generating HtmlHelper components:

  * &quot;`@telerikaspnetcorehtml` Generate a {{ site.product }} Grid with sorting and paging enabled. Bind the Grid to dummy data.&quot;
  * &quot;`@telerikaspnetcorehtml`  Generate a ComboBox that shows a list of products. Create a Product class and generate sample data.&quot;
  * &quot;`@telerikaspnetcorehtml` Show me sample code for a {{ site.product }} Grid with virtual scrolling for the rows and columns.&quot;

* When generating TagHelper components:

  * &quot;`@telerikaspnetcoretag` Generate a {{ site.product }} Grid with sorting and paging enabled. Bind the Grid to dummy data.&quot;
  * &quot;`@telerikaspnetcoretag`  Generate a ComboBox that shows a list of products. Create a Product class and generate sample data.&quot;
  * &quot;`@telerikaspnetcoretag` Show me sample code for a {{ site.product }} Grid with virtual scrolling for the rows and columns.&quot;

>tip Visit the [Telerik {{ site.framework }} Prompt Library](slug:ai_prompt_library) for more sample prompts.

## Usage Limits

@[template](/_contentTemplates/core/ai-coding-assistant.md#number-of-requests)

## See Also 

* [Telerik {{ site.framework }} AI Coding Assistant Intended Use](slug:overview_ai#intended-use)
* [Telerik {{ site.framework }} AI Coding Assistant Recommendations](slug:overview_ai#recommendations)
* [GitHub Copilot Tutorials](https://github.com/features/copilot/tutorials)
* [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server)
* [Telerik {{ site.framework }} Prompt Library](slug:ai_prompt_library)