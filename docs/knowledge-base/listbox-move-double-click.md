---
title: Transfer ListBox Items on Double Click
description: An example on how to transfer items from one Kendo UI ListBox to another by double-clicking them.
type: how-to
page_title: Move Elements on Double Click | Kendo UI ListBox
slug: listbox-move-double-click
tags: listbox, doubleclick, transfer
ticketid: 1147380
res_type: kb
component: listbox
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI ListBox</td>
	</tr>
</table>


## Description

How can I transfer items between ListBoxes by double-clicking the Kendo UI ListBox?

## Solution

1. Handle the [`dblclick`](https://api.jquery.com/dblclick/) event on the items in both ListBoxes.
1. In the event handler, based on the ListBox, manually execute the `transferTo` or `transferFrom` command.

```dojo
<select id="listBoxA">
      <option>ItemA1</option>
      <option>ItemA2</option>
    </select>
<select id="listBoxB">
      <option>ItemB1</option>
      <option>ItemB2</option>
    </select>

<script>
    var listBoxA = $("#listBoxA").kendoListBox({
        connectWith: "listBoxB",
        toolbar: {
            tools: [
                "transferTo",
                "transferFrom",
                "transferAllTo",
                "transferAllFrom"
            ]
        }
    }).data("kendoListBox");

    var listBoxB = $("#listBoxB").kendoListBox().data("kendoListBox");

    listBoxA.wrapper.find(".k-list").on("dblclick", ".k-item", function(e) {
        listBoxA._executeCommand("transferTo");
    });

    listBoxB.wrapper.find(".k-list").on("dblclick", ".k-item", function(e) {
        listBoxA._executeCommand("transferFrom");
    });
</script>
```
