---
title: Localization
page_title: jQuery Filter Documentation | Localization
description: "Get started with the jQuery Filter by Kendo UI and learn how to localize the text of its filter operators."
slug: localization_kendoui_filter_widget
position: 2
---

# Localization

The Filter provides options for defining the text of its filter operators (for example, `contains`, `equals`, or `greater than`) and logic messages (for example, `AND` and `OR`).

To localize the messages, set the desired strings in the [`messages`](/api/javascript/ui/filter/configuration/messages) field. To localize the names of the operators, list the available ones and set their text in the [`operators`](/api/javascript/ui/filter/configuration/operators) field.

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

            messages: {
                or: "OR", // The OR main logic text.
                and: "AND", // The AND main logic text.
                apply: "Set Filter" // The APPLY button text.
            },
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
            expression: { // defining an initial filter expression is not required
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
* [JavaScript API Reference of the Filter](/api/javascript/ui/filter)
