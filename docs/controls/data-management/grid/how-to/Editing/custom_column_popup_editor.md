---
title: Add Custom Column Popup Editor
description: "Get started with the jQuery Grid by Kendo UI and learn how to add a custom popup editor for a column."
type: how-to
page_title: jQuery Grid Documentation | Custom Column Popup Editor | Kendo UI
slug: custom_column_popup_editor
position: 0
tags: kendo ui, mvc, grid, editing, custom editor
teampulseid:
ticketid: 1112542
pitsid:
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
   <td>Progress® Kendo UI® version</td>
   <td>Tested up to version 2017.2 504</td>
  </tr>
</table>

## Description

How to add a button to every cell in a column that invokes the Kendo UI Editor band to that cell.

## Possible Solution

Use a column template to add a button to the cell. Once the user clicks the button, invoke a window that contains an editor to modify the data item of the cell.

#### Example

```dojo
<div id="grid"></div>
<div id="window">
    <textarea id="editor" rows="10" cols="30" style="height:440px" aria-label="editor" data-bind="value: text"></textarea>
</div>
<script>
    var dataItem;

    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "text",
                template: "<div class='contentDivs' style='white-space: nowrap; height: 25px; overflow: hidden; max-width:65%; float: left;'>#= text #</div><button class='editButtons' style='float:right'>Edit</button>",
                width: "300px"
            },
            {
                field: "age"
            }
        ],
        dataSource: {
            data: [{
                    name: "Jane Doe",
                    text: "Lorem ipsum dolor lis in magna. In feugiat non ipsum a laoreet. Nulla facilisi.",
                    age: 30
                },
                {
                    name: "John Doe",
                    text: "Cras vitae nisl quis nulla accumsan porttitor a eget quam. Vestibulum tempor eu felis ac pulvinar. Morbi viverra odio sit ame. Pellentesque felis est, condimentum et pellentesque vel, luctus eget libero. Morbi non placerat diam, quis tincidunt ante.",
                    age: 33
                }
            ]
        },
        dataBound: onDataBound
    });

    function onDataBound(e) {
        $(".contentDivs").children().css("display", "table-cell");
        $(".editButtons").kendoButton({
            click: function(e) {
                var grid = $("#grid").data("kendoGrid");
                var editor = $("#editor").data("kendoEditor");
                var window = $("#window").data("kendoWindow");
                var row = e.sender.element.closest("tr");
                var dataItem = grid.dataItem(row);

                kendo.bind(editor.element, dataItem);
                window.open().center();
            }
        });
    };

    $("#window").kendoWindow({
        width: "600px",
        visible: false,
        modal: true,
        close: function(e) {
            e.sender.element.focus()
        },
        actions: [
            "Maximize",
            "Close"
        ],
    });
    $("#editor").kendoEditor();
</script>
```