---
title: Subscribe to the Edit Event of a Spreadsheet Cell
description: An example on how to subscribe to the edit event of the cell in the Kendo UI Spreadsheet.
type: how-to
page_title: Subscribe to the Edit Event of the Cell | Kendo UI Spreadsheet
slug: spreadsheet-subscribe-to-cell-edit-event
tags: kendo, kendo-ui, spreadsheet, subscribe, cell, edit, event
ticketid: 1154659
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1.117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Spreadsheet for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I get informed if an event is due for handling when the user starts editing a cell in the spreadsheet?

## Solution

Utilize the `select` event of the Spreadsheet to subscribe to the `activate` event of the `_view.editor`.

```dojo
<div id="spreadsheet" style="width: 100%"></div>

<script>
    function onSelect(arg) {
        arg.sender._view.editor.one("activate", function() {
        console.log("edit mode");
        });
    }

    $(function () {
        var sp = $("#spreadsheet").kendoSpreadsheet({
            select: onSelect,
            sheets: [{
                name: "Invoices",
            }]
        }).getKendoSpreadsheet();
    });
</script>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
