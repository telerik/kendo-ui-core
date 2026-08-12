---
title: Tool Call
page_title: Tool Call
description: "Learn how to use the Telerik UI ToolCall component for {{ site.framework }} to display AI tool invocations and their outcomes."
slug: htmlhelpers_tool_call_llmkit_aspnetcore
position: 3
components: ["toolcall"]
---

# {{ site.framework }} Tool Call

When agents make decisions that trigger real-world actions, such as querying databases, calling APIs, or browsing the web, users need to know what is being done on their behalf.

The [ToolCall component](/api/toolcall) makes these side effects visible by displaying the tool name, input parameters, and output result in a collapsible block. It also supports approval and error states so users remain in control.

## Configuration

The [`State`](/api/toolcall/state) option controls the visual appearance and the interactive elements that are rendered, so keep it synchronized with your backend. Set it to `Active` when an invocation begins, then change it to `Completed` or `Error` once the result is known.

Use [`Label`](/api/toolcall/label) for the tool name and [`SecondaryLabel`](/api/toolcall/secondarylabel) for scannable context, such as a database name, file path, or execution time. This lets users assess the call without expanding the details panel. Pair `Icon` or [`StatusSVGIcon`](/api/toolcall/statussvgicon) with the state to reinforce the outcome visually.

Bind [`Parameters`](/api/toolcall/parameters) to the raw input object and [`Result`](/api/toolcall/result) to the output; both render as formatted JSON by default. Use [`ResultTemplate`](/api/toolcall/resulttemplate) when a plain JSON dump does not provide enough detail.

```HtmlHelper
    @(Html.Kendo().ToolCall()
        .Name("toolCall")
        .Label("query_database")
        .SecondaryLabel("analytics db")
        .State(ToolCallState.Completed)
        .Expandable(true)
        .Expanded(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolcall name="toolCall"
        label="query_database"
        secondary-label="analytics db"
        state="ToolCallState.Completed"
        expandable="true"
        expanded="true">
    </kendo-toolcall>
```
{% endif %}

## Approval Flow

When [`State`](/api/toolcall/state) is `AwaitingApproval`, the component renders approval and denial buttons inside the expanded panel. Set [`ApprovalText`](/api/toolcall/approvaltext) to explain the action before the user makes a decision.

```HtmlHelper
    @(Html.Kendo().ToolCall()
        .Name("toolCall")
        .Label("send_email")
        .State(ToolCallState.AwaitingApproval)
        .Expandable(true)
        .Expanded(true)
        .ApprovalText("This will send an email to the selected recipients.")
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolcall name="toolCall"
        label="send_email"
        state="ToolCallState.AwaitingApproval"
        expandable="true"
        expanded="true"
        approval-text="This will send an email to the selected recipients.">
    </kendo-toolcall>
```
{% endif %}

Handle the user's decision through the [`Action`](/api/toolcall/action) event, which emits a `ToolCallActionEvent`.

## Error State

When [`State`](/api/toolcall/state) is `Error`, set [`ErrorText`](/api/toolcall/errortext) to show a human-readable description of what went wrong. Use [`ErrorTemplate`](/api/toolcall/errortemplate) to replace the default error message with a custom layout.

```HtmlHelper
    @(Html.Kendo().ToolCall()
        .Name("toolCall")
        .Label("send_email")
        .State(ToolCallState.Error)
        .Expandable(true)
        .Expanded(true)
        .ErrorText("Connection timeout: Unable to reach database server.")
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolcall name="toolCall"
        label="send_email"
        state="ToolCallState.Error"
        expandable="true"
        expanded="true"
        error-text="Connection timeout: Unable to reach database server.">
    </kendo-toolcall>
```
{% endif %}

## See Also

* [Tool Call Demo for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/llm_kit/tool_call)
* [LLM Kit Overview]({% slug htmlhelpers_llmkit_aspnetcore %})
* [Server-Side API of the ToolCall HtmlHelper](/api/toolcall)
{% if site.core %}
* [Server-Side API of the ToolCall TagHelper](/api/taghelpers/toolcall)
{% endif %}
* [JavaScript API Reference of the ToolCall](/api/javascript/ui/toolcall)