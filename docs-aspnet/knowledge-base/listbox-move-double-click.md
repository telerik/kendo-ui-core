---
title: Transfer ListBox Items on Double Click
description: How can I transfer items between ListBoxes by double-clicking the Kendo UI ListBox?
type: how-to
page_title: ListBox Move elements on double click
slug: listbox-move-double-click
tags: listbox, list, box, double, click, transfer, items
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI ListBox for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I transfer items between ListBoxes by double-clicking the Kendo UI ListBox?

## Solution

1. Handle the [dblclick](https://api.jquery.com/dblclick/) event on the items in both ListBoxes.
2. In the event handler, based on the ListBox, manually execute the `transferTo` or `transferFrom` command.

```Index.cshtml
@(Html.Kendo().ListBox()
            .Name("listBoxA")
            .ConnectWith("listBoxB")
            .BindTo(new List<string>() { "Value 1", "Value 2", "Value 3"}))

@(Html.Kendo().ListBox()
            .Name("listBoxB")
            .BindTo(new List<string>())
            .Selectable(ListBoxSelectable.Multiple))
```
```script.js
    $(document).ready(function () {
        var listBoxB = $("#listBoxB").data("kendoListBox");
        var listBoxA = $("#listBoxA").data("kendoListBox");
        listBoxA.wrapper.find(".k-list").on("dblclick", ".k-item", function (e) {
            listBoxA._executeCommand("transferTo");
        });

        listBoxB.wrapper.find(".k-list").on("dblclick", ".k-item", function (e) {
            listBoxA._executeCommand("transferFrom");
        });
    })
```