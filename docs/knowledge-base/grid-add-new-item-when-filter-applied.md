---
title: Add new item when filter is applied
description: An example on how to show the inserted item when the Grid data is filtered.
type: how-to
page_title: Show inserted item when filter is applied in Grid | Kendo UI Grid
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

When filter is applied to the Grid component the new items that are inserted are not visible.


## Solution

The behavior is observed because the filter condition is applied to the DataSource. When a new item is inserted the values in it are empty and usually this will not match the specified filter. Thus the new item will not be visible.

There are couple of approaches for changing the behavior.

* [When the filter is set initially](#when-the-filter-is-set-initially)
* [Filter is initially unknown and applied by the user](#filter-is-initially-unknown-and-applied-by-the-user)

### When the filter is set initially  

In that case the empty value can be added to the initial filter condition:

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

This approach is illustrated in the following example:

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



### Filter is initially unknown and applied by the user

In most scenarios the Grid will not have any filters initially. The users may apply filters at some point and try to insert new records after this. 

With such scenario the applied filters can be retrieved in the DataSource change event. Then an additional filter can be added that will match an empty value for the Model.

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

The following example outlines the approach:

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