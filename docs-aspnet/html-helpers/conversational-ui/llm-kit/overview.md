---
title: Overview
page_title: LLM Kit Overview
description: "Learn the basics of the Telerik UI LLM Kit components for {{ site.framework }} and how to use them in AI-powered experiences."
components: ["llm-kit"]
slug: htmlhelpers_llmkit_aspnetcore
position: 0
---

# {{ site.framework }} LLM Kit Overview

The Telerik UI for {{ site.framework }} LLM Kit is a set of purpose-built components for bringing AI agent activity into your application.

The kit provides ready-made building blocks for showing reasoning traces, multi-step thought chains, tool invocations, inline citations, and conversation checkpoints alongside any chat or agentic interface.

## Key Features

* [Reasoning]({% slug htmlhelpers_reasoning_llmkit_aspnetcore %})&mdash;Shows a model's thinking trace in one collapsible block, with support for streaming content token by token.
* [Chain of Thought]({% slug htmlhelpers_chain_of_thought_llmkit_aspnetcore %})&mdash;Collects an ordered series of thought steps beneath one collapsible header, with support for custom row templates.
* [Tool Call]({% slug htmlhelpers_tool_call_llmkit_aspnetcore %})&mdash;Shows an individual tool or function invocation, including parameters, approval flow, results, and error states.
* [Checkpoint]({% slug htmlhelpers_checkpoint_llmkit_aspnetcore %})&mdash;Places a decorative separator between conversation turns with a **Start Over** or **Redo** action.
* [Citation]({% slug htmlhelpers_citation_llmkit_aspnetcore %})&mdash;Adds an inline reference chip that opens a paginated popover containing complete source details.

## Initializing the LLM Kit Components

The following example demonstrates how to configure a simple reasoning block and a tool call.

```HtmlHelper
    @(Html.Kendo().Reasoning()
        .Name("reasoning")
        .Label("Thinking")
        .Expandable(true)
        .Expanded(true)
        .Content("Checking the available revenue data.")
    )

    @(Html.Kendo().ToolCall()
        .Name("toolCall")
        .Label("query_database")
        .State(ToolCallState.Completed)
        .Expandable(true)
        .Expanded(true)
    )

     @(Html.Kendo().ChainOfThought()
        .Name("chainOfThought")
        .Label("Thought")
        .Expandable(true)
        .Expanded(true)
        .Thoughts(thoughts =>
        {
            thoughts.Add().Label("Searching for analytics tools").SvgIcon("search").Completed(true);
            thoughts.Add().Label("Checking the revenue table").SvgIcon("table").Completed(true);
            thoughts.Add().Label("Preparing the query result").SvgIcon("gear").Completed(true);
        })
    )

     @(Html.Kendo().Citation()
        .Name("citation")
        .Sources(sources =>
        {
            sources.Add().Title("Quarterly Revenue Report").Url("https://example.com/reports/q1-2025").Description("Summary of enterprise revenue by quarter.");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-reasoning name="reasoning"
        label="Thinking"
        expandable="true"
        expanded="true"
        content="Checking the available revenue data.">
    </kendo-reasoning>

    <kendo-toolcall name="toolCall"
        label="query_database"
        state="ToolCallState.Completed"
        expandable="true"
        expanded="true">
    </kendo-toolcall>

    <kendo-chainofthought name="chainOfThought"
        label="Thought"
        expandable="true"
        expanded="true">
        <thoughts>
            <thought label="Searching for analytics tools" svg-icon="search" completed="true" />
            <thought label="Checking the revenue table" svg-icon="table" completed="true" />
            <thought label="Preparing the query result" svg-icon="gear" completed="true" />
        </thoughts>
    </kendo-chainofthought>

    <kendo-citation name="citation">
        <sources>
            <source title="Quarterly Revenue Report"
                url="https://example.com/reports/q1-2025"
                description="Summary of enterprise revenue by quarter.">
            </source>
        </sources>
    </kendo-citation>
```
{% endif %}

## See Also

* [LLM Kit Overview Demo for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/llm_kit)
* [Server-Side API of the Reasoning HtmlHelper](/api/reasoning)
* [Server-Side API of the ChainOfThought HtmlHelper](/api/chainofthought)
* [Server-Side API of the ToolCall HtmlHelper](/api/toolcall)
* [Server-Side API of the Checkpoint HtmlHelper](/api/checkpoint)
* [Server-Side API of the Citation HtmlHelper](/api/citation)
{% if site.core %}
* [Server-Side API of the Reasoning TagHelper](/api/taghelpers/reasoning)
* [Server-Side API of the ChainOfThought TagHelper](/api/taghelpers/chainofthought)
* [Server-Side API of the ToolCall TagHelper](/api/taghelpers/toolcall)
* [Server-Side API of the Checkpoint TagHelper](/api/taghelpers/checkpoint)
* [Server-Side API of the Citation TagHelper](/api/taghelpers/citation)
{% endif %}