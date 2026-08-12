---
title: Chain of Thought
page_title: Chain of Thought
description: "Learn how to use the Telerik UI ChainOfThought component for {{ site.framework }} to display ordered AI reasoning steps."
slug: htmlhelpers_chain_of_thought_llmkit_aspnetcore
position: 2
components: ["chainofthought"]
---

# {{ site.framework }} Chain of Thought

When an agent takes several steps to answer a question, such as searching the web, analyzing documents, or querying a database, a single reasoning block hides the structure of the work.

The [ChainOfThought component](/api/chainofthought) presents each step as a named row beneath one collapsible header, turning an unclear wait into an understandable progress narrative. Each step is a `Thought` object, and you can provide a custom row template to control its rendering.

## Configuration

Bind [`Thoughts`](/api/chainofthought/thoughts) to an array of `Thought` objects and add items as each step completes. This makes the chain grow in front of the user instead of appearing all at once. Each item requires an `id` and a `label`.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
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
```
{% endif %}

Use [`Label`](/api/chainofthought/label) and [`SecondaryLabel`](/api/chainofthought/secondarylabel) on the component for the overall header. A step count or total elapsed time gives users a quick summary without requiring them to expand every row.

For coding agents, [`LinesAdded`](/api/chainofthought/linesadded) and [`LinesRemoved`](/api/chainofthought/linesremoved) show diff counters directly in the header, helping reviewers gauge the scope of a change at a glance.

Set [`Completed`](/api/chainofthought/completed) to `true` after all steps finish so the header changes from its in-progress state to its finished state, confirming that the chain is complete.

## Custom Thought Template

If the default row layout does not meet your needs, provide a custom template for each `Thought` item. The [`ThoughtTemplate`](/api/chainofthought/thoughttemplate) option lets you define how every step is rendered and gives you full control over the reasoning presentation.


## See Also


* [Chain Of Thought Demo for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/llm_kit/chain_of_thought)
* [LLM Kit Overview]({% slug htmlhelpers_llmkit_aspnetcore %})
* [Reasoning]({% slug htmlhelpers_reasoning_llmkit_aspnetcore %})
* [Server-Side API of the ChainOfThought HtmlHelper](/api/chainofthought)
{% if site.core %}
* [Server-Side API of the ChainOfThought TagHelper](/api/taghelpers/chainofthought)
{% endif %}
* [JavaScript API Reference of the ChainOfThought](/api/javascript/ui/chainofthought)