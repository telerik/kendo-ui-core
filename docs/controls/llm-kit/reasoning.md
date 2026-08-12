---
title: Reasoning
page_title: jQuery Reasoning Documentation - LLM Kit Reasoning
description: "Learn how to use the Kendo UI for jQuery Reasoning component to display a model's thinking trace in an AI workflow."
slug: reasoning_kendoui_llmkit
position: 1
components: ["reasoning"]
---

# {{ site.product }} Reasoning

When users interact with AI agents, much of the process remains hidden: the model works through a problem, but nothing appears until the response arrives.

The [Reasoning component](/api/javascript/ui/reasoning) reveals the model's internal thinking trace in real time through a collapsible disclosure block, confirming that work is underway and giving power users the transparency needed to trust the output.


## Configuration

Bind [`content`](/api/javascript/ui/reasoning/configuration/content) to the model's thinking trace and push incremental token updates as the stream arrives. This lets users watch the model reason in real time.

Use [`label`](/api/javascript/ui/reasoning/configuration/label) to describe the current activity and [`secondaryLabel`](/api/javascript/ui/reasoning/configuration/secondarylabel) to display elapsed time after the model finishes. Changing between "Thinking" and "Thought" with elapsed time immediately shows whether work is still underway. Pair `icon` or [`svgIcon`](/api/javascript/ui/reasoning/configuration/svgicon) with your application's design language to make the header easy to recognize.

```dojo
<div id="reasoning"></div>

<script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        secondaryLabel: "in progress",
        svgIcon: "sparkles",
        expandable: true,
        expanded: true,
        content: "Selecting the relevant data source and validating the request.",
        completed: false
    });
</script>
```

Set [`completed`](/api/javascript/ui/reasoning/configuration/completed) to `true` when the stream ends so the header changes from its in-progress spinner to a completed state, indicating that the trace is finished and the answer is ready.


## Expanded State

The expanded state shows the complete reasoning trace, helping users follow the model's thought process step by step. After reviewing the reasoning, users can collapse the block to hide its details.

Leave [`expandable`](/api/javascript/ui/reasoning/configuration/expandable) enabled so users who do not need the trace can collapse it without losing context. Use [`expanded`](/api/javascript/ui/reasoning/configuration/expanded) to control whether the block opens while the model works, and respond to user-driven changes with the [`expand`](/api/javascript/ui/reasoning/methods/expand), [`collapse`](/api/javascript/ui/reasoning/methods/collapse), or [`toggle`](/api/javascript/ui/reasoning/methods/toggle) methods.

```javascript
$("#reasoning").kendoReasoning({
    expandable: true,
    expanded: true
});
```

## Templates

Use [`contentTemplate`](/api/javascript/ui/reasoning/configuration/contenttemplate) when the trace needs structured markup instead of plain text. Return only trusted or properly encoded HTML from the template.

```dojo
<div id="reasoning"></div>

<script>
    $("#reasoning").kendoReasoning({
        expandable: true,
        expanded: true,
        contentTemplate: function() {
            return "<p>Checked the request and compared the available data sources.</p>";
        }
    });
</script>
```


## See Also

* [Reasoning Demo](https://demos.telerik.com/kendo-ui/llm-kit/reasoning)
* [LLM Kit Overview]({% slug overview_kendoui_llmkit %})
* [Chain of Thought]({% slug chain_of_thought_kendoui_llmkit %})
* [JavaScript API Reference of the Reasoning](/api/javascript/ui/reasoning)
