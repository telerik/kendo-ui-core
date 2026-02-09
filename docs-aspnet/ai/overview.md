---
title: Overview
page_title: Telerik {{ site.framework }} AI Tooling Overview
description: "Learn about the AI-powered developer tools that integrate with your IDE or code editor for greater productivity and enhanced developer experience."
components: ["aicodingassistant"]
slug: overview_ai
position: 1
---

{% if site.core %}
    {% assign telerik_product_url = "aspnet-core-ui" %}
{% else %}
    {% assign telerik_product_url = "aspnet-mvc" %}
{% endif %}

# Telerik {{ site.framework }} AI Coding Assistant Overview

The Telerik {{ site.framework }} AI Coding Assistant improves your developer experience and increases your productivity when implementing {{ site.framework }} apps that include {{ site.product }}. The coding assistant is an AI code generator that provides proprietary context to AI models in order to produce higher quality code samples with the [{{ site.product }} components](https://www.telerik.com/{{ telerik_product_url }}) and API.

The AI Coding Assistant is integrated in [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server)&mdash;A powerful tool for running complex or multi-step prompts that integrates with any MCP-enabled client.

> We recommend the [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server) for:
> * **Agent** mode when using Visual Studio
> * Both **Ask** and **Agent** modes when using Visual Studio Code

## Getting Started

>warning**Кnown Issue: Hanging tool calls in Visual Studio (see [Troubleshooting](slug:ai_coding_assistant_troubleshooting_aspnet)).**


To use the Telerik {{ site.framework }} AI Coding Assistant, you need:

* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or {{ site.product }} license](https://www.telerik.com/purchase/{{ telerik_product_url }}) or a [{{ site.product }} trial](https://www.telerik.com/{{ telerik_product_url }}).
* An [{{ site.framework }} application that includes {{ site.product }}](slug:overview_aspnetmvc6_aspnetmvc).

## Intended Use

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

You can use the AI Coding Assistant for:

* **Initial code generation:** Quickly add components to your app to speed up the initial development.
* **Component configuration:** Enable or disable specific component features, or fine tune the configuration through prompting. More complex configurations are possible but may require additional manual work to be production-ready.
* **Dummy data generation and data binding:** Quickly add data to your app for testing and prototyping purposes. Avoid exposing or providing access to your proprietary or production data to AI-enabled tools.
* **Step-by-step explanations:** Understand the solutions provided by the AI Coding Assistant through the detailed explanations (depends on the tool, mode, and model used). To further develop your knowledge, check the respective documentation.
* **Preliminary troubleshooting:** Resolve obvious and easy-to-solve issues affecting your code. For more complex issues, look for assistance from the community or contact the support team.

> The AI Coding Assistant is not intended for styling and theme customization. If you are looking for AI-powered styling and theming, check out [ThemeBuilder](https://www.telerik.com/themebuilder).

## Recommendations

Consider the following recommendations when working with the AI Coding Assistant:

* When switching between tasks and files, start a new session in a new chat window to avoid polluting the context with irrelevant or outdated information.
* At the time of publishing, **Claude Sonnet 4** and **GPT-5** produce optimal results.
* Sometimes, the AI Coding Assistant might generate custom styles. To avoid any custom styling, include a similar statement in your prompts: `Don't add custom CSS styles.`

## Usage Limits

Access to the Telerik {{ site.framework }} AI Coding Assistant depends on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

* Subscription License

    * A Subscription is the primary license that grants full access to the AI Coding Assistant.
    * Includes a virtually unlimited number of requests, with a fair use threshold.
    * Best for ongoing and high-volume usage.

* Perpetual License (Limited Access)

    * Perpetual license holders have no access to the AI Coding Assistant by default.
    * You can start a 30-day AI Tools trial to access the AI Coding Assistant.
    * After the trial expires, access is no longer available unless the [Perpetual license is converted to a Subscription license](https://www.telerik.com/account/support-center/contact-us/account-support).

* Trial License

    * Reactivating the same trial for a new release does not grant additional requests.
    * Designed for evaluating the feature before purchasing.
    * New users will start a trial automatically.

> All Telerik AI tools share a single request limit for your Telerik account. For example, requests made through the Telerik {{ site.framework }} MCP server are counted toward the same overall usage quota.

> When using the Telerik {{ site.framework }} MCP server, one prompt may trigger several requests, depending on the prompt complexity.

## Privacy

The Telerik {{ site.framework }} AI Coding Assistant operates under the following conditions:

* The Assistant does not have access to your workspace and application code. Note that when using the Telerik MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The Assistant does not use your prompts to train Telerik AI models.
* The Assistant does not generate the actual responses and has no access to these responses. The Assistant only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) provide better responses.
* The Assistant does not associate your prompts to your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The Assistant stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#usage-limits).

Make sure to also get familiar with the terms and privacy policy of your selected AI model and AI client.

## Telerik Document Processing AI Coding Assistant

You can also use the AI Coding Assistant for Telerik Document Processing to generate high-quality code samples and speed up your development.
Read the full guide in the dedicated [DPL AI Coding Assistant article](https://docs.telerik.com/devtools/document-processing/ai-coding-assistant/overview).

## Next Steps

* Add the [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server) to an MCP-enabled client.
* Explore the [Telerik {{ site.framework }} Prompt Library](slug:ai_prompt_library).
