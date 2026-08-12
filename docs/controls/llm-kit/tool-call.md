---
title: Tool Call
page_title: jQuery ToolCall Documentation - LLM Kit Tool Call
description: "Learn how to use the Kendo UI for jQuery ToolCall component to display AI tool invocations, approval flows, and results."
slug: tool_call_kendoui_llmkit
position: 3
components: ["toolcall"]
---

# {{ site.product }} Tool Call

When agents make decisions that trigger real-world actions, such as querying databases, calling APIs, or browsing the web, users need to know what is being done on their behalf.

The [ToolCall](/api/javascript/ui/toolcall) component makes these side effects visible by displaying the tool name, input parameters, and output result in a collapsible block. It also supports approval and error states so users remain in control.


## Configuration

The [`state`](/api/javascript/ui/toolcall/configuration/state) option controls the visual appearance and the interactive elements that are rendered, so keep it synchronized with your backend. Set it to `active` when an invocation begins, then change it to `completed` or `error` once the result is known.

Use [`label`](/api/javascript/ui/toolcall/configuration/label) for the tool name and [`secondaryLabel`](/api/javascript/ui/toolcall/configuration/secondarylabel) for scannable context, such as a database name, file path, or execution time. This lets users assess the call without expanding the details panel. Pair `icon` or [`statusSVGIcon`](/api/javascript/ui/toolcall/configuration/statussvgicon) with the state to reinforce the outcome visually.

```dojo
<div id="toolCall"></div>

<script>
    $("#toolCall").kendoToolCall({
        label: "query_database",
        secondaryLabel: "analytics db",
        state: "completed",
        expandable: true,
        expanded: true,
        parameters: {
            quarter: "Q1 2025",
            limit: 5
        },
        result: {
            topCustomer: "Acme Corp",
            revenue: 142000
        }
    });
</script>
```

Bind [`parameters`](/api/javascript/ui/toolcall/configuration/parameters) to the raw input object and [`result`](/api/javascript/ui/toolcall/configuration/result) to the output; both render as formatted JSON by default. Use [`resultTemplate`](/api/javascript/ui/toolcall/configuration/resulttemplate) when a plain JSON dump does not provide enough detail.

## Approval Flow

When [`state`](/api/javascript/ui/toolcall/configuration/state) is `awaitingApproval`, the component renders approval and denial buttons inside the expanded panel. Set [`approvalText`](/api/javascript/ui/toolcall/configuration/approvaltext) to explain the action before the user makes a decision, and [`errorText`](/api/javascript/ui/toolcall/configuration/errortext) to explain the fallback after denial.

Handle the user's decision through the [`action`](/api/javascript/ui/toolcall/events/action) event, which emits a `ToolCallActionEvent`.

```dojo
<div id="toolCall"></div>

<script>
    $("#toolCall").kendoToolCall({
        label: "query_database",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        errorText: 'Connection timeout: Unable to reach database server',
        approvalText: 'This will send an email to the selected recipients',
        result: {
            topCustomer: "Acme Corp",
            revenue: 142000
        }
    });
</script>
```

## Error State

When [`state`](/api/javascript/ui/toolcall/configuration/state) is `error`, set [`errorText`](/api/javascript/ui/toolcall/configuration/errortext) to show a human-readable description of what went wrong. Use [`errorTemplate`](/api/javascript/ui/toolcall/configuration/errortemplate) to replace the default error message with a custom layout.

```dojo
<div id="toolCall"></div>

<script>
    $("#toolCall").kendoToolCall({
        label: "query_database",
        state: "error",
        expandable: true,
        expanded: true,
        errorText: 'Connection timeout: Unable to reach database server'
    });
</script>
```

## See Also


* [Tool Call Demo](https://demos.telerik.com/kendo-ui/llm-kit/tool-call)
* [LLM Kit Overview]({% slug overview_kendoui_llmkit %})
* [Checkpoint]({% slug checkpoint_kendoui_llmkit %})
* [JavaScript API Reference of the ToolCall](/api/javascript/ui/toolcall)
