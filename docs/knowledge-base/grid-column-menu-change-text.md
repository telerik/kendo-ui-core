---
title: Change Column Menu Columns Text
description: An example on how to change the names of the columns inside the column menu in the Kendo UI Grid. 
type: how-to
page_title: Alternate Columns Names in Column Menu | Kendo UI Grid
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
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I change the names of the columns inside the columnMenu in the Kendo UI Grid?

## Solution

To change the text of the columns in the column menu:

1. In the [`columnMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-columnMenuInit) event handler get the list of the columns names.
1. For each element, [`find`](https://api.jquery.com/find/) the inner `span`.
1. Assign the new text value to the [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue) of the [`lastChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild) element of the `span`.

```html
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