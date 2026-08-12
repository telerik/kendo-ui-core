---
title: Reasoning
page_title: Reasoning
description: "Learn how to use the Telerik UI Reasoning component for {{ site.framework }} to display a model's thinking trace."
slug: htmlhelpers_reasoning_llmkit_aspnetcore
position: 1
components: ["reasoning"]
---

# {{ site.framework }} Reasoning

When users interact with AI agents, much of the process remains hidden: the model works through a problem, but nothing appears until the response arrives.

The [Reasoning](/api/reasoning) component reveals the model's internal thinking trace in real time through a collapsible disclosure block, confirming that work is underway and giving power users the transparency needed to trust the output.

## Configuration

Bind [`Content`](/api/reasoning/content) to the model's thinking trace and send incremental token updates as the stream arrives. This lets users watch the model reason in real time.

Use [`Label`](/api/reasoning/label) to describe the current activity and [`SecondaryLabel`](/api/reasoning/secondarylabel) to display elapsed time after the model finishes. Changing between "Thinking" and "Thought" with elapsed time immediately shows whether work is still underway. Pair `Icon` or [`SvgIcon`](/api/reasoning/svgicon) with your application's design language to make the header easy to recognize.

```HtmlHelper
    @(Html.Kendo().Reasoning()
        .Name("reasoning")
        .Label("Thinking")
        .Expandable(true)
        .Expanded(true)
        .Content("Identifying the correct data source and validating filters.")
    )
```
{% if site.core %}
```TagHelper
    <kendo-reasoning name="reasoning"
        label="Thinking"
        expandable="true"
        expanded="true"
        content="Identifying the correct data source and validating filters.">
    </kendo-reasoning>
```
{% endif %}

Set [`Completed`](/api/reasoning/completed) to `true` when the stream ends so the header changes from its in-progress spinner to a completed state, indicating that the trace is finished and the answer is ready.

## Expanded State

The expanded state shows the complete reasoning trace, helping users follow the model's thought process step by step. After reviewing the reasoning, users can collapse the block to hide its details.

Leave [`Expandable`](/api/reasoning/expandable) enabled so users who do not need the trace can collapse it without losing context. Use [`Expanded`](/api/reasoning/expanded) to control whether the block opens while the model works, and respond to user-driven changes with the `Expand`, `Collapse`, or `Toggle` methods.

```HtmlHelper
    @(Html.Kendo().Reasoning()
        .Name("reasoning")
        .Label("Thought")
        .SecondaryLabel("for 1.5s")
        .Completed(true)
        .Expandable(true)
        .Expanded(false)
        .Content("Identifying the correct data source and validating filters.")
    )
```
{% if site.core %}
```TagHelper
    <kendo-reasoning name="reasoning"
        label="Thought"
        secondary-label="for 1.5s"
        completed="true"
        expandable="true"
        expanded="false"
        content="Identifying the correct data source and validating filters.">
    </kendo-reasoning>
```
{% endif %}

## See Also


* [Reasoning Demo for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/llm_kit/reasoning)
* [LLM Kit Overview]({% slug htmlhelpers_llmkit_aspnetcore %})
* [Server-Side API of the Reasoning HtmlHelper](/api/reasoning)
{% if site.core %}
* [Server-Side API of the Reasoning TagHelper](/api/taghelpers/reasoning)
{% endif %}
* [JavaScript API Reference of the Reasoning](/api/javascript/ui/reasoning)