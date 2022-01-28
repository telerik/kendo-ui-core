---
title: Make Toolbar Commands Respond on mousedown Event
description: An example on how to create custom commands that look like the original create, save, and cancel commands but respond to the jQuery Mousedown event in the Kendo UI Grid.
type: how-to
page_title: Fire Events on mousedown by Creating Custom Toolbar Commands | Kendo UI Grid for jQuery
slug: grid-custom-command-mousedown-toolbar
tags: grid, command, toolbar, mousedown, create, save, cancel
ticketid: 1134663
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
  <td>Created with the 2017.3.1018 version</td>
 </tr>
</table>

## Description

In the Grid, my toolbar is positioned at the bottom. When I edit a cell, I have to click on the **Create**, **Save**, or **Cancel** buttons twice because the editable cell loses focus on mouse-down and changes the height of the Grid.

How can I create custom buttons which respond to the jQuery `mousedown` event?

## Solution

1. Remove the built-in commands from the toolbar.
1. Add custom commands that look like the original `create`, `save`, and `cancel` commands.
1. In the `dataBound` event of the Grid, attach the relevant methods on the `mousedown` event of these commands.

```dojo
<div id="gridId"></div>

<style>
    .k-grid td {
        white-space: pre-line;
    }

    .k-grid-toolbar {
        display: none;
    }
</style>

<script>
    var grid = $("#gridId").kendoGrid({
        //     toolbar: ["create", "save", "cancel"],
        toolbar: [{
                name: "my-create",
                iconClass: "k-icon k-i-plus",
                text: "Add new record"
            },
            {
                name: "my-save",
                iconClass: "k-icon k-i-check",
                text: "Save changes"
            },
            {
                name: "my-cancel",
                iconClass: "k-icon k-i-cancel",
                text: "Cancel changes"
            }
        ],
        dataBound: function(e) {
            $(".k-grid-my-create").unbind("mousedown");
            $(".k-grid-my-create").mousedown(function(e) {
                console.log("create");
                var grid = $("#gridId").data("kendoGrid");
                $(kendo._activeElement()).blur()
                grid.addRow();
            });

            $(".k-grid-my-save").unbind("mousedown");
            $(".k-grid-my-save").mousedown(function(e) {
                console.log("save");
                var grid = $("#gridId").data("kendoGrid");
                $(kendo._activeElement()).blur()
                grid.saveChanges();
            });

            $(".k-grid-my-cancel").unbind("mousedown");
            $(".k-grid-my-cancel").mousedown(function(e) {
                console.log("cancel");
                var grid = $("#gridId").data("kendoGrid");
                grid.cancelChanges();
            });

        },
        dataSource: {
            data: [{
                    ProductID: 0,
                    f1: "Tea",
                    category: "Beverages"
                },
                {
                    ProductID: 1,
                    f1: "Coffee",
                    category: "Beverages"
                }
            ],
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: {
                            editable: false,
                            nullable: true
                        },
                        f1: {
                            type: "string"
                        },
                        category: {
                            type: "string"
                        }
                    }
                }
            }
        },
        editable: {
            confirmation: false
        },
        columns: [{
                field: "category"
            },
            {
                field: "f1",
                template: "#=dirtyField(data,'f1')# #:f1#",
                title: "Field1",
                width: "60%",
                editor: function(container, options) {
                    $('<textarea name="' + options.field + '" rows="3" data-bind="value:' + options.field + '"style="text-overflow:ellipsis; display:block;" />').appendTo(container).addClass("k-textbox");
                }
            }
        ],
        saveChanges: beforeSavingGridCallback,
    });

    function dirtyField(data, field) {
        return field + data.category + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a nisl nec risus maximus vulputate id at nulla. Duis eu diam ultrices, congue erat vitae, blandit quam. Proin vestibulum, neque vitae suscipit elementum, velit felis dictum lorem, ut pharetra erat arcu id enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus vitae odio diam. Proin ultricies odio nec nulla euismod facilisis.";
    }

    function beforeSavingGridCallback(e, customSave) {
        e.preventDefault();
        var con = confirm("Are you sure you want to save?");
        if (con == true) {
            e.sender.dataSource.sync();
        }
    }

    function moveHeaderButtonsToBottom(grid) {
        var headerButtons = $(".k-grid-toolbar:hidden", grid.element);
        var gridFooter = $(".k-grid-footer", grid.element);
        if (gridFooter.length > 0) {
            headerButtons.insertAfter($(".k-grid-footer", grid.element));
        } else {
            headerButtons.insertAfter($(".k-grid-content", grid.element));
        }
        headerButtons.show();
    }
    moveHeaderButtonsToBottom(grid);
</script>
```

## Notes

For more information on how to implement the approach, refer to the following resources:

<ul>
    <li><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar">https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar</a></li>
    <li><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar.iconclass">https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar.iconClass</a></li>
    <li><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar.text">https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar.text</a></li>
    <li><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow">https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addRow</a></li>
    <li><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/savechanges">https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saveChanges</a></li>
    <li><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/savechanges"></a><a href="https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/cancelchanges">https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/cancelChanges</a></li>
    <li><a href="https://api.jquery.com/mousedown/">https://api.jquery.com/mousedown/</a></li>
    <li><a href="https://api.jquery.com/unbind/">https://api.jquery.com/unbind/</a></li>
    <li><a href="https://api.jquery.com/blur/">https://api.jquery.com/blur/</a></li>
</ul>
