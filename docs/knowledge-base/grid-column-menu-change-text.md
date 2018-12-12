---
title: Change the Column Names inside the Column Menu of the Grid
description: An example on how to change the names of the columns inside the column menu of the Kendo UI Grid.
type: how-to
page_title: Alternate Column Names in Column Menu | Kendo UI Grid
slug: grid-column-menu-change-text
tags: grid, columnmenu, columns
ticketid: 1135439
res_type: kb
component: grid
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

How can I change the names of the columns inside the column menu in the Grid?

## Solution

1. In the [`columnMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) event handler, get the list of the column names.
1. For each element, [`find`](https://api.jquery.com/find/) the inner `span`.
1. Assign the new text value to the [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue) of the [`lastChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild) element of the `span`.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "age"
            }
        ],
        columnMenu: true,
        columnMenuInit: function(e) {
            var mylist = e.container.find(".k-columns-item>ul");

            mylist.children().each(function(e) {
                var span = $(this).find("span");
                var text = span[0].lastChild.nodeValue;

                span[0].lastChild.nodeValue = changeLabelText(text);
            });
        },
        dataSource: [{
                name: "Jane Doe",
                age: 30
            },
            {
                name: "John Doe",
                age: 33
            }
        ]
    });

    function changeLabelText(text) {
        if (text === "Select All") return text;

        return text + " + myText";
    }
</script>
```
