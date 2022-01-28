---
title: Add Tooltips to Buttons
description: An example on how to set a tooltip to a Button in {{ site.product }}.
type: how-to
page_title: Add Kendo UI Tooltips to Buttons
slug: button-add-tooltip-hover-text
tags: button, add, tooltip, hover, text
ticketid: 1413806
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Button for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I add a Kendo UI Tooltip to a Button?

## Solution

To associate a tooltip with a Button in {{ site.product }}, follow the approach demonstrated in the [demo on the Kendo UI Tooltip](https://demos.telerik.com/{{ site.platform }}/tooltip/index).  

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

* [Basic Usage of the Tooltip (Demo)](https://demos.telerik.com/{{ site.platform }}/tooltip/index)
