---
title: Getting Started
page_title: jQuery Filter Documentation - Getting Started with the Filter
description: "Get started with the jQuery Filter by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_filter_widget
position: 1
---

# Getting Started with the Filter

This guide demonstrates how to get up and running with the Kendo UI for jQuery Filter.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="filter"></div>
    <ul id="listView"></ul>

    <script type="text/x-kendo-template" id="item">
        <li>
            <strong>#= name #</strong>, aged #= age #, is on vacation: #= isOnLeave #
        </li>
    </script>

    <script>
        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
                data: [
                    { name: "Jane Doe", age: "25", isOnLeave: false },
                    { name: "John Doe", age: "33", isOnLeave: true },
                    { name: "John Smith", age: "37", isOnLeave: true },
                    { name: "Nathan Doe", age: 42, isOnLeave: false }
                ],
                schema: {
                    model: {
                        fields: {
                            name: { type: "string" },
                            age: { type: "number" },
                            isOnLeave: { type: "boolean" }
                        }
                    }
                }
            });

            $("#filter").kendoFilter({
                dataSource: dataSource,
                fields: [ // Defining the fields is not mandatory. If not defined, they will be taken from the data source schema.
                        // If you define the fields, their names and types must match the data source definition.
                    { name: "name", type: "string", label: "Name" },
                    { name: "age", type: "number", label: "Age" },
                    { name: "isOnLeave", type: "boolean", label: "On Vacation" }
                ],
                expression: { // Defining an initial filter expression is not required.
                    logic: "and",
                    filters: [
                        { field: "age", value: 30, operator: "gte" },
                        { field: "name", value: "Doe", operator: "contains" }
                    ]
                }
            }).data("kendoFilter").applyFilter();
            // Chain the method call to immediately apply filtering after the component initialization because an initial filter is set.

            $("#listView").kendoListView({
                dataSource: dataSource,
                template: kendo.template($("#item").html())
            });
        });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Filter component.

```html
<div id="filter"></div>
```

## 2. Initialize the Filter

In this step, you will initialize the Filter from the empty `<div>` element. All settings of the Filter will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="filter"></div>

<script>
    // Target the div element by using jQuery and then call the kendoFilter() method.
    $("#filter").kendoFilter();
</script>
```

## 3. Bind the Filter to Data

Once the basic initialization is completed, you can start adding additional configurations to the Filter. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}). Without a `dataSource`, you will probably receive an error in the browser console. 

You can use a remote data source instead of an array of local data. The local array is used for brevity in this example.

```html
<div id="filter"></div>

<script>

  var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Jane Doe", age: "25", isOnLeave: false },
            { name: "John Doe", age: "33", isOnLeave: true },
            { name: "John Smith", age: "37", isOnLeave: true },
            { name: "Nathan Doe", age: 42, isOnLeave: false }
        ],
        schema: {
            model: {
                fields: {
                    name: { type: "string" },
                    age: { type: "number" },
                    isOnLeave: { type: "boolean" }
                }
            }
        }
    });

    $("#filter").kendoFilter({
        dataSource: dataSource
    })
</script>
```

## 4. Add an Initial Expression

The Filter allows you to configure an initial filter expression through the [expression](/api/javascript/ui/filter/configuration/expression) configuration. Since an initial filter is applied, you will need to immediately call the `applyFilter()` method.

```html
<div id="filter"></div>

<script>

  var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Jane Doe", age: "25", isOnLeave: false },
            { name: "John Doe", age: "33", isOnLeave: true },
            { name: "John Smith", age: "37", isOnLeave: true },
            { name: "Nathan Doe", age: 42, isOnLeave: false }
        ],
        schema: {
            model: {
                fields: {
                    name: { type: "string" },
                    age: { type: "number" },
                    isOnLeave: { type: "boolean" }
                }
            }
        }
    });

    $("#filter").kendoFilter({
        dataSource: dataSource,
        expression: { // Defining an initial filter expression is not required.
            logic: "and",
            filters: [
                { field: "age", value: 30, operator: "gte" },
                { field: "name", value: "Doe", operator: "contains" }
            ]
        }
    }).data("kendoFilter").applyFilter();
    // Chain the method call to immediately apply filtering after the component initialization because an initial filter is set.
</script>
```

## 5. Integration with a ListView

You can use the Filter together with a number of Kendo UI for jQuery components. For this guide, you will use a ListView component.

```html
    <div id="filter"></div>
    <ul id="listView"></ul>

    <script type="text/x-kendo-template" id="item">
        <li>
            <strong>#= name #</strong>, aged #= age #, is on vacation: #= isOnLeave #
        </li>
    </script>

    <script>
        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
                data: [
                    { name: "Jane Doe", age: "25", isOnLeave: false },
                    { name: "John Doe", age: "33", isOnLeave: true },
                    { name: "John Smith", age: "37", isOnLeave: true },
                    { name: "Nathan Doe", age: 42, isOnLeave: false }
                ],
                schema: {
                    model: {
                        fields: {
                            name: { type: "string" },
                            age: { type: "number" },
                            isOnLeave: { type: "boolean" }
                        }
                    }
                }
            });

            $("#filter").kendoFilter({
                dataSource: dataSource,
                applyButton: true,
                fields: [ // Defining the fields is not mandatory. If not defined, they will be taken from the data source schema.
                        // If you define the fields, their names and types must match the data source definition.
                    { name: "name", type: "string", label: "Name" },
                    { name: "age", type: "number", label: "Age" },
                    { name: "isOnLeave", type: "boolean", label: "On Vacation" }
                ],
                expression: { // Defining an initial filter expression is not required.
                    logic: "and",
                    filters: [
                        { field: "age", value: 30, operator: "gte" },
                        { field: "name", value: "Doe", operator: "contains" }
                    ]
                }
            }).data("kendoFilter").applyFilter();
            // Chain the method call to immediately apply filtering after the component initialization because an initial filter is set.

            $("#listView").kendoListView({
                dataSource: dataSource,
                template: kendo.template($("#item").html())
            });
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Filter](https://demos.telerik.com/kendo-ui/filter/index)

## See Also

* [JavaScript API Reference of the jQuery Filter](/api/javascript/ui/filter)
* [Knowledge Base Section](/knowledge-base)


