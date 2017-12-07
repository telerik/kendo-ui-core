---
title: Prevent Grid PopUp editor from closing on update/create
description: An example on how to keep the Grid popup editor open after update is finished
type: how-to
page_title: Keep Grid popup open | Kendo UI Grid
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
  <td>2017.3.1026</td>
 </tr>
</table>

## Description

I want to keep popup editor open after I update or insert a record in the Grid.

## Solution

To implement the feature you can handle the Grid [edit event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-edit) and attach handler for the PopUp window [close event](https://docs.telerik.com/kendo-ui/api/javascript/ui/window#events-close). 

In the close handler e.preventDefault() will be called to prevent the popup from closing. In order to allow the users to close the editor the flag can also be set when the cancel and close buttons are clicked.

The example below illustrates the approach.

```html
<div id="grid"></div>

<script>
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
                { field: "Discontinued", width: "120px", editor: customBoolEditor },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "popup",
            edit: function (e) {
                var editWindow = this.editable.element.data("kendoWindow");
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

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
</script>
```

