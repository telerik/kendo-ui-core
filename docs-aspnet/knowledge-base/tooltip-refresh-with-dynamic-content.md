---
title: Refreshing Generic Textbox Tooltip and Suppressing Empty Tooltip Content
description: Learn how to refresh a generic textbox tooltip and suppress the tooltip when its content is empty using Kendo UI for ASP.NET Core ToolTip.
type: how-to
page_title: How to Refresh and Suppress Tooltip Content in Kendo UI for ASP.NET Core ToolTip
meta_title: How to Refresh and Suppress Tooltip Content in Kendo UI for ASP.NET Core ToolTip
slug: tooltip-refresh-with-dynamic-content
tags: tooltip, ui-for-asp.net-core, refresh, suppress, textbox
res_type: kb
ticketid: 1695432
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for ASP.NET Core ToolTip</td>
</tr>
<tr>
<td> Version </td>
<td>2025.4.1217</td>
</tr>
</tbody>
</table>

## Description

I want to create a generic tooltip for textboxes in a view and refresh the tooltip content dynamically to reflect changes to the textbox value. Additionally, I need a generic way to suppress the tooltip when the textbox content is empty.

This knowledge base article also answers the following questions:
- How to dynamically update Kendo UI ToolTip content for a textbox?
- How to suppress Kendo UI ToolTip when textbox content is empty?
- How to manage tooltip visibility for textboxes in Kendo UI for ASP.NET Core?

## Solution

To achieve a dynamic refresh of the tooltip content and suppress it when the textbox content is empty, follow these steps:

1. Use the `Show` and `Hide` events for the [Kendo UI for ASP.NET Core ToolTip](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/layout/tooltip/overview).
2. Dynamically update the tooltip content based on the textbox value.
3. Apply CSS to hide the tooltip when the textbox value is empty.

Here is an example implementation:

```csharp
@(Html.Kendo().Tooltip()
    .For("input[type='text']")
    .Position(TooltipPosition.Top)
    .Width(350)
    .Height(30)
    .Events(e => e.Show("ttOnShow").Hide("ttOnHide"))
)
```

```javascript
function ttOnShow(e) {
    var targetInput = $(e.sender.target());
    var contentElement = e.sender.popup.element.find(".k-tooltip-content");

    $("input[type='text']").off("input.ttsync");

    var text = targetInput.val() || "";
    if (!text) {
        $(".k-tooltip").css("display", "none");
    }

    contentElement.text(text);

    targetInput.on("input.ttsync", function () {
        contentElement.text($(this).val() || "");
    });
}

function ttOnHide(e) {
    $("input[type='text']").off("input.ttsync");
}
```

### Additional Notes:

- Ensure that the tooltip's `Position` setting does not cause focus issues for the textbox. For example, setting `TooltipPosition.Bottom` can resolve such conflicts.
- If using a `DropDownList`, apply a similar approach to dynamically refresh its tooltip content.

## See Also

- [Kendo UI for ASP.NET Core ToolTip Documentation](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/layout/tooltip/overview)
- [Adding ToolTips to DropDownList](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/show-tooltip-for-items)
- [Kendo UI Tooltip API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)