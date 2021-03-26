---
title: Setting the Operators
page_title: jQuery Filter Documentation | Setting the Operators
description: "Get started with the jQuery Filter by Kendo UI and learn how to select its available filter operators."
slug: choose_operators_kendoui_filter_widget
position: 2
---

# Setting the Operators

The Filter provides options for defining which filter operators will be displayed in the filtering drop-down.

## Set operator per type

The [`operators`](/api/javascript/ui/filter/configuration/operators) field takes a literal with the available operators for each field type and you can list the desired operators together with their text.

The following example demonstrates how to set the `equals` and `contains` filter operators to the string fields and the `greater than` and `less than` filter operators to the numerical fields.

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

            operators: {
                string: {
                    eq: kendo.ui.Filter.fn.options.operators.string.eq, // Take the default Kendo UI text.
                    contains: "Partially Matches" // Define a custom text.
                },
                number: {
                    gte: "Larger Than", // Define a custom text.
                    lt: kendo.ui.Filter.fn.options.operators.number.lt // Take the default Kendo UI text.
                }
            },

            expressionPreview: true, // Shows a text preview of the filter expression.
            applyButton: true, // Shows the built-in Apply button.
            fields: [ // Defining the fields is not mandatory. Otherwise, they will be taken from the data source schema.
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
        // Chain the method call to immediately apply filtering after the widget initialization because an initial filter is set.

        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#item").html())
        });
    });
</script>
```

## Set operator per field

The [`fields.operators`](/api/javascript/ui/filter/configuration/fields.operators) configuration allows you to specify the available operators for the current field of the model.

The following example demonstrates how to set the `equals` and `contains` filter operators of the name field.

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
            expressionPreview: true, // Shows a text preview of the filter expression.
            applyButton: true, // Shows the built-in Apply button.
            fields: [ // Defining the fields is not mandatory. Otherwise, they will be taken from the data source schema.
                // If you define the fields, their names and types must match the data source definition.
                { name: "name", type: "string", label: "Name", operators: {
                    string: {
                        eq: kendo.ui.Filter.fn.options.operators.string.eq, // Take the default Kendo UI text.
                        contains: "Partially Matches" // Define a custom text.
                    }
                } },
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
        // Chain the method call to immediately apply filtering after the widget initialization because an initial filter is set.

        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#item").html())
        });
    });
</script>
```

## Use custom operators

The [`operators.{type}.custom`](/api/javascript/ui/filter/configuration/operators.string.custom) settings allows you to create a custom operator.

The following example demonstrates how to create a custom operator for string fields.

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

            operators: {
                string: {
                    eq: kendo.ui.Filter.fn.options.operators.string.eq, // Take the default Kendo UI text.
                    contains: "Partially Matches", // Define a custom text.
                    myOperator: {
                        text: "Custom Operator",
                        handler: function(itemValue, filterValue){
                            return itemValue.indexOf(filterValue) > 2;
                        }
                    }
                },
                number: {
                    gte: "Larger Than", // Define a custom text.
                    lt: kendo.ui.Filter.fn.options.operators.number.lt // Take the default Kendo UI text.
                }
            },

            expressionPreview: true, // Shows a text preview of the filter expression.
            applyButton: true, // Shows the built-in Apply button.
            fields: [ // Defining the fields is not mandatory. Otherwise, they will be taken from the data source schema.
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
        // Chain the method call to immediately apply filtering after the widget initialization because an initial filter is set.

        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#item").html())
        });
    });
</script>
```

## See Also

* [Basic Usage of the Filter (Demo)](https://demos.telerik.com/kendo-ui/filter/index)
* [Localization of Messages in the Filter]({% slug localization_kendoui_filter_widget %})
* [JavaScript API Reference of the  Filter](/api/javascript/ui/filter)
