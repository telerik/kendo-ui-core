---
title: Chain of Thought
page_title: jQuery ChainOfThought Documentation - LLM Kit Chain of Thought
description: "Learn how to use the Kendo UI for jQuery ChainOfThought component to display ordered reasoning steps in an AI workflow."
slug: chain_of_thought_kendoui_llmkit
position: 2
components: ["chainofthought"]
---

# {{ site.product }} Chain of Thought

When an agent takes several steps to answer a question, such as searching the web, analyzing documents, or querying a database, a single reasoning block hides the structure of the work.

The [ChainOfThought component](/api/javascript/ui/chainofthought) presents each step as a named row beneath one collapsible header, turning an unclear wait into an understandable progress narrative. Each step is a `Thought` object, and you can provide a custom row template to control its rendering.


## Configuration

Bind [`thoughts`](/api/javascript/ui/chainofthought/configuration/thoughts) to an array of `Thought` objects and add items as each step completes. This makes the chain grow in front of the user instead of appearing all at once. Each item requires an `id` and a `label`.

```dojo
<div id="chain"></div>

<script>
    $("#chain").kendoChainOfThought({
        label: "Thought",
        secondaryLabel: "for 6.0s",
        expandable: true,
        expanded: true,
        thoughts: [
            { label: "Searching for analytics tools", svgIcon: "search", completed: true },
            { label: "Checking the revenue table", svgIcon: "table", completed: true },
            { label: "Preparing the query result", svgIcon: "gear", completed: true }
        ]
    });
</script>
```

Use [`label`](/api/javascript/ui/chainofthought/configuration/label) and [`secondaryLabel`](/api/javascript/ui/chainofthought/configuration/secondarylabel) on the component for the overall header. A step count or total elapsed time gives users a quick summary without requiring them to expand every row.

For coding agents, [`linesAdded`](/api/javascript/ui/chainofthought/configuration/linesadded) and [`linesRemoved`](/api/javascript/ui/chainofthought/configuration/linesremoved) show diff counters directly in the header, helping reviewers gauge the scope of a change at a glance.

Set [`completed`](/api/javascript/ui/chainofthought/configuration/completed) to `true` after all steps finish so the header changes from its in-progress state to its finished state, confirming that the chain is complete.

## Custom Thought Template

If the default row layout does not meet your needs, provide a custom template for each `Thought` item. The [`thoughtTemplate`](/api/javascript/ui/chainofthought/configuration/thoughttemplate) option lets you define how every step is rendered and gives you full control over the reasoning presentation.

The following example shows a custom template with an icon, tool name, and duration for each step in the chain of thought.

```dojo
<div id="chain"></div>

<script>
    $("#chain").kendoChainOfThought({
        thoughts: [{ label: "Searching", secondaryLabel: "web" }],
        thoughtTemplate: function(data) {
            return "<div><strong>" + kendo.htmlEncode(data.label) + "</strong> <span>" +
                kendo.htmlEncode(data.secondaryLabel || "") + "</span></div>";
        }
    });
</script>
```


## See Also

* [Chain of Thought Demo](https://demos.telerik.com/kendo-ui/llm-kit/chain-of-thought)
* [LLM Kit Overview]({% slug overview_kendoui_llmkit %})
* [Reasoning]({% slug reasoning_kendoui_llmkit %})
* [JavaScript API Reference of the ChainOfThought](/api/javascript/ui/chainofthought)
