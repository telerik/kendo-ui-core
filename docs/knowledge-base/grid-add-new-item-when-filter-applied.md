---
title: Add New Item When Filter Is Applied
description: An example on how to show the inserted item when the Grid data is filtered.
type: how-to
page_title: Show Inserted Items When Filter Is Applied | Kendo UI Grid
slug: grid-add-new-item-when-filter-applied
tags: grid, insert, add, new, item, filter, visible, record
ticketid: 1141908
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

How can I display the newly inserted items in the Grid when filtering is applied?

## Solution

The filter condition is applied to the DataSource and as a result, when a new item is inserted, the values in it are empty, which, usually, does not match the specified filter and the new item is not visible.

To successfully add new items, apply the respective approach depending on the following scenarios:

* [The filter is initially set](#when-the-filter-is-initially-set)
* [The filter is initially unknown and is applied by the user](#filter-is-initially-unknown-and-is-applied-by-user)

### When the Filter Is Initially Set   

In this scenario, add the empty value to the initial filter condition.

````JavaScript
filter: {
    logic: "or",
        filters: [{ //filter all products that contain "ch"
            field: "ProductName",
            operator: "contains",
            value: "Ch"
        },
        { //or products with empty string name (new records)
            field: "ProductName",
            operator: "eq",
            value: ""
        }]
}
````

The following example demonstrates how to implement the suggested approach.

```dojo
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
                filter: {
                    logic: "or",
                    filters: [{ //filter all products that contain "ch"
                        field: "ProductName",
                        operator: "contains",
                        value: "Ch"
                    },
                    { //or products with empty string name (new records)
                        field: "ProductName",
                        operator: "eq",
                        value: ""
                    }]
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                { field: "Discontinued", width: 120, editor: customBoolEditor },
                { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
        });
    });

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
</script>
```

### Filter Is Initially Unknown and Is Applied by User

In most scenarios, the Grid does not have any filters that are initially set. The user can apply filters at some point and try to insert new records after this.

1. Retrieve the applied filters in the `change` event of the DataSource.
1. Add an additional filter that will match an empty value for the Model.

````JavaScript
change: function (e) {
    if (e.action == "add") {
        var newItem = e.items[0];
        var filter = this.filter();
        var filters = filter.filters;

        var noValueFilter = { field: "ProductName", operator: "eq", value: "" };

        //add empty value to the filter conditions

        var newFilter = {
            logic: "or",
            filters: [noValueFilter, filter]
        };

        this.filter(newFilter);

    }
}
````

The following example demonstrates how to implement the suggested approach.

```dojo
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
                change: function (e) {
                    if (e.action == "add") {
                        var newItem = e.items[0];
                        var filter = this.filter();
                        if (filter) {
                            var filters = filter.filters;
                            var noValueFilter = { field: "ProductName", operator: "eq", value: "" };

                            //add empty value to the filter conditions

                            var newFilter = {
                                logic: "or",
                                filters: [noValueFilter, filter]
                            };

                            this.filter(newFilter);
                        }
                    }
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                { field: "Discontinued", width: 120, editor: customBoolEditor },
                { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
        });
    });

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
</script>
```
