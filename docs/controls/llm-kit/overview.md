---
title: Overview
page_title: jQuery LLM Kit Documentation - Overview
description: "Learn about the Kendo UI for jQuery LLM Kit and its components for reasoning traces, tool execution, citations, and checkpoints."
components: ["llm-kit"]
slug: overview_kendoui_llmkit
position: 0
---

# {{ site.product }} LLM Kit Overview

The Kendo UI for jQuery LLM Kit is a set of purpose-built components for bringing AI agent activity into your application.

The kit provides ready-made building blocks for showing reasoning traces, multi-step thought chains, tool invocations, inline citations, and conversation checkpoints alongside any chat or agentic interface.

## Key Features

* [Reasoning]({% slug reasoning_kendoui_llmkit %})&mdash;Shows a model's thinking trace in one collapsible block, with support for streaming content token by token.
* [Chain of Thought]({% slug chain_of_thought_kendoui_llmkit %})&mdash;Collects an ordered series of thought steps beneath one collapsible header, with support for custom row templates.
* [Tool Call]({% slug tool_call_kendoui_llmkit %})&mdash;Shows an individual tool or function invocation, including parameters, approval flow, results, and error states.
* [Checkpoint]({% slug checkpoint_kendoui_llmkit %})&mdash;Places a decorative separator between conversation turns with a **Start Over** or **Redo** action.
* [Citation]({% slug citation_kendoui_llmkit %})&mdash;Adds an inline reference chip that opens a paginated popover containing complete source details.

## Getting Started

The following example demonstrates how to initialize several LLM Kit components in a single conversational flow.

```html
<div id="reasoning"></div>
<div id="toolCall"></div>
<div id="checkpoint"></div>
<span id="citation"></span>

<script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        expandable: true,
        expanded: true,
        content: "Identifying the best source for the answer."
    });

    $("#toolCall").kendoToolCall({
        label: "query_database",
        state: "completed",
        expandable: true,
        expanded: true,
        parameters: { quarter: "Q1 2025" },
        result: { topCustomer: "Acme Corp" }
    });

    $("#checkpoint").kendoCheckpoint({
        state: "restore"
    });

    $("#citation").kendoCitation({
        sources: [{
            title: "Quarterly Revenue Report",
            url: "https://example.com/reports/q1-2025"
        }]
    });
</script>
```

## Next Steps

* [LLM Kit Overview Demo](https://demos.telerik.com/kendo-ui/llm-kit/index)
* [Reasoning Demo](https://demos.telerik.com/kendo-ui/llm-kit/reasoning)
* [Chain of Thought Demo](https://demos.telerik.com/kendo-ui/llm-kit/chain-of-thought)
* [Tool Call Demo](https://demos.telerik.com/kendo-ui/llm-kit/tool-call)
* [Checkpoint Demo](https://demos.telerik.com/kendo-ui/llm-kit/checkpoint)
* [Citation Demo](https://demos.telerik.com/kendo-ui/llm-kit/citation)

## See Also

* [JavaScript API Reference of the Reasoning](/api/javascript/ui/reasoning)
* [JavaScript API Reference of the ChainOfThought](/api/javascript/ui/chainofthought)
* [JavaScript API Reference of the ToolCall](/api/javascript/ui/toolcall)
* [JavaScript API Reference of the Checkpoint](/api/javascript/ui/checkpoint)
* [JavaScript API Reference of the Citation](/api/javascript/ui/citation)
