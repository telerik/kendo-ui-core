---
title: Prevent Grid Popup Editor from Closing on Update and Create
description: An example on how to keep the Kendo UI Grid popup editor open after an update is finished.
type: how-to
page_title: Keep Popup Open | Kendo UI Grid for jQuery
slug: grid-prevent-popup-close-on-edit
tags: grid, edit, popup, prevent, cancel, stop, close, edit, insert, create, modal, reopen, keep, open
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
  <td>2020.3.1021</td>
 </tr>
</table>

## Description

How can I keep the popup editor of the Grid open after I update or insert a record?

## Solution

1. Handle the [`edit`](/api/javascript/ui/grid/events/edit) event of the Grid and attach an event handler for the [`close`](/api/javascript/ui/window/events/close) event of the Popup window.
1. In the `close` handler, the `e.preventDefault()` method will be called to prevent the popup from closing.
1. To allow the user to close the editor, set the flag when the **Cancel** and **Close** buttons are clicked.

```dojo
<div id="grid"></div>

<script>
    var preventCloseOnSave = false;

    $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { validation: { required: true } },
                            UnitPrice: { type: "number", validation: { required: true, min: 1 } },
                            Discontinued: { type: "boolean" },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                },
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
                { field: "ProductName", title: "Product Name" },
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "popup",
            edit: function (e) {
                var editWindow = e.container.data("kendoWindow");
               // editWindow.unbind("close");
                editWindow.bind("close", onWindowEditClose);
            },
            save: function (e) {
                preventCloseOnSave = true;
            }
        });
    });

    var onWindowEditClose = function (e) {
        if (preventCloseOnSave) {
            e.preventDefault();
            preventCloseOnSave = false;
        }
    };

    $(".k-grid-cancel").on("mousedown", function (e) {
        preventCloseOnSave = false;
    });
</script>
```

## See Also

* [Prevent Grid Popup Editor from Closing on Validation Errors]({% slug grid-prevent-popup-close-on-validation-errors-from-server %})
