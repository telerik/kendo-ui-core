---
title: Button with Kendo UI Tooltips
description: An example demonstrating how to set a tooltip to a button
type: how-to
page_title: Adding a Kendo UI Tooltip | Kendo UI Button
slug: button-add-tooltip-hover-text
tags: button, add, tooltip, hover, text
ticketid: 1413806
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Button for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I add a Kendo UI Tooltip on a Button?

## Solution

By following the same approach in the [Kendo UI ToolTip Live Demo](https://demos.telerik.com/aspnet-core/tooltip/index), a button can have a tooltip associated to it.  

```javascript
    @(Html.Kendo().Button()
        .Name("myButton")
        .Tag("a")
        .Content("My Button")
    )

    @(Html.Kendo().Tooltip()
        .For("#myButton")
        .Position(TooltipPosition.Top)
        .Animation(e => e.Open(o => o.Zoom(ZoomDirection.In).Duration(150)))
        .Width(120)
        .Content("My Tooltip")
    )
```

## See Also

* [Tooltip - Live Demo](https://demos.telerik.com/aspnet-core/tooltip/index)
