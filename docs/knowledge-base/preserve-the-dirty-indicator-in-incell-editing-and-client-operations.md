---
title: Preserve Dirty Indicator in Incell Editing and Client Operations
page_title: Preserve Dirty Indicator | Kendo UI Grid for jQuery
description: "An example on how to preserve the dirty indicator in the incell editing mode of the Kendo UI Grid for jQueryss and during client operations."
previous_url: /controls/data-management/grid/how-to/Editing/preserve-the-dirty-indicator-in-incell-editing-and-client-operations
slug: howto_preserve_dirty_indicator_incell_editing_client_operations_grid
tags: preserve, dirty, indicator, grid, incell, edit, mode, client, operations
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I preserve the dirty indicator in the incell editing mode of the Kendo UI Grid for jQueryss and during client operations?

## Solution

Your project might require you to preserve the dirty indicator in incell editing and client operations.

The following example demonstrates how to achieve this behavior also in case new rows are added to the Grid.

> The Kendo UI R3 2017 release provides the preservation of the dirty indicator as a built-in functionality.

```dojo
    <div id="grid"></div>
    <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
            transport: {
                read:  {
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
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            change: function(e){
                if(e.action == "itemchange"){
                    e.items[0].dirtyFields = e.items[0].dirtyFields || {};
                    e.items[0].dirtyFields[e.field] = true;
                }
            },
            batch: true,
            pageSize: 30,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: "number", validation: { required: true, min: 1, max: 10} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            pageable: true,
            navigatable: true,
            height: 400,
            toolbar: ["create", "save", "cancel"],
            columns: [
                {field: "ProductName", template: "#=dirtyField(data,'ProductName')# #:ProductName#"},
                { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "150px",
                template: "#=dirtyField(data,'UnitPrice')# #:kendo.toString(UnitPrice,'c')#"},
                { field: "UnitsInStock", title: "Units In Stock", width: 150, template: "#=dirtyField(data,'UnitsInStock')# #:UnitsInStock#" },
                { field: "Discontinued", width: 100, template: "#=dirtyField(data,'Discontinued')# #:Discontinued#" },
                { command: "destroy", title: "&nbsp;", width: 110 }],
            editable: true
        });

        function dirtyField(data, fieldName){
            if(data.dirty && data.dirtyFields[fieldName]){
                return "<span class='k-dirty'></span>"
            }
            else{
                return "";
            }
        }
    </script>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
