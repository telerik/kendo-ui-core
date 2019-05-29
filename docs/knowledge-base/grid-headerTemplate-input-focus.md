---
title: Focus Column Header Input When navigatable Is true
description: An example on how to allow the focusing of an input in the column header when the navigatable configuration of the Kendo UI Grid is true.
type: how-to
page_title: Focus Input in the Column headerTemplate | Kendo UI Grid for jQuery
slug: grid-headerTemplate-input-focus
tags: grid, headerTemplate, input, focus
ticketid: 1138938
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I allow the user to click on an input in the `headerTemplate` of a column when the `navigatable` property of the Kendo UI Grid is `true`?

## Solution

To focus the input, prevent the `mousedown` event handler from bubbling to the header.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [{
            field: "name",
            headerTemplate: '<input id="myID" type="text" value="text" />'
        }],
        navigatable: true,
        dataBound: function(e) {
            e.sender.thead.on("mousedown", "input", function(e) {
                e.stopPropagation();
            });
        },
        dataSource: [{
            name: "Jane Doe"
        }, {
            name: "John Doe"
        }]
    });
</script>
```
