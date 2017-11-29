---
title: Keep tab order on edited row with frozen columns
description: An example on how to keep focus on edited inputs when frozen columns are enabled.
type: how-to
page_title: Tab through editors when columns are frozen | Kendo UI Grid
slug: grid-tab-order-edit-frozen-columns
tags: grid, frozen, columns, tab, order, focus, input, buttons, tabbing, tabindex
ticketid: 1142004 
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
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

I have a Grid with frozen columns and editing is enabled. When I tab through the edited cells the focus moves to the edit buttons on previous rows.


## Solution

The observed behavior is caused by the default order in which the browser will focus elements on the page. When frozen columns are enabled the locked columns will be rendered in a separate table element. When tab is clicked the browser moves the focus to the first focusable element in the next table. That is why the buttons are focused first. 

The following approach can be used to change the default behavior. 

* handle the Grid [dataBound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound)
* get reference of all edit and delete buttons
* increase the [tabindex attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) for the buttons


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
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            sortable: true,
            reorderable: true,
            groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            dataBound: function (e) {
                $(".k-grid-edit, .k-grid-delete").attr("tabindex", "1");
            },
            cancel: function (e) {
                setTimeout(function () {
                    $(".k-grid-edit, .k-grid-delete").attr("tabindex", "1");
                });
            },
            columns: [
                { width: "200px", field: "ProductName", title: "Product Name", locked: true, lockable: false },
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px", editor: customBoolEditor },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
        });


    });

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
</script>
</div>
```

