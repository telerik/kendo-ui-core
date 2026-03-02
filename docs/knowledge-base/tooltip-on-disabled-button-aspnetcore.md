---
title: Displaying Tooltip on Disabled Button in UI for ASP.NET Core
description: Learn how to display a Tooltip on a disabled button in UI for ASP.NET Core.
type: how-to
page_title: Show Tooltip on Disabled Button in UI for ASP.NET Core
meta_title: Tooltip on Disabled Button in UI for ASP.NET Core
slug: tooltip-on-disabled-button-aspnetcore
tags: tooltip,button,ui-for-aspnet-core,kendo-ui
res_type: kb
ticketid: 1710537
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Tooltip for UI for ASP.NET Core</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

I want to display a Tooltip over a disabled button in UI for ASP.NET Core. The button is disabled on click, and the Tooltip should still be visible when the button is hovered.

This knowledge base article also answers the following questions:
- How to show Tooltip on disabled buttons in UI for ASP.NET Core?
- Can Tooltip be displayed on disabled buttons?
- How to ensure Tooltip is visible on hover over disabled buttons?

## Solution

To display a Tooltip on a disabled button, set the `pointer-events` CSS property of the `k-disabled` class to `auto` using the following CSS:

```html
<style>
  .k-button.k-disabled {
    pointer-events: auto !important;
  }
</style>
```

If you want the Tooltip to show only when the button is disabled and not when it is enabled, handle the Tooltip [`show`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/tooltip/events/show) event. Hide the Tooltip when the button is enabled by using the following JavaScript:

```javascript
function onShow(e) {
    var buttonObject = $("#iconTextButton").data("kendoButton");
    if (buttonObject.options.enable) {
        e.sender.hide();
    }
}
```

### Example

Here is an example demonstrating how to display a Tooltip only when the KendoButton is disabled. The button is enabled or disabled using external clicks:

[Live Example on Telerik Repl](https://netcorerepl.telerik.com/cKYccqbp17fdRQQS11)

## See Also

- [Tooltip Overview](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/layout/tooltip/overview)
- [Tooltip API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/tooltip)
