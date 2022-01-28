---
title: Expression preview
page_title: jQuery Filter Documentation | Expression Preview
description: "Get started with the jQuery Filter by Kendo UI and learn how to use the expression preview."
slug: expression_preview_kendoui_filter_widget
position: 4
---

# Expression preview

The Filter enables you to visualize the filter expression that will be applied to the datasource by setting the [`expressionpreview`](/api/javascript/ui/filter/configuration/expressionpreview) field to true. Additionaly you can format the value of the filter in the expression preview using the `fields.previewFormat` setting.

The following example demonstrates how to enable the expression preview and format the values of the filter

```dojo
    <div id="filter"></div>
    <br /><br />
    <script>
    var data = [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
        ];

    var dataSource = new kendo.data.DataSource({
        data: data,
        schema: {
        model: {
            fields: {
            name: { type: "string" },
            age: { type: "number" }
            }
        }
        }
    });

    $("#filter").kendoFilter({
        dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        },
        fields: [
            { name: "age", type:"number", label: "Age", previewFormat: "n3" },
            { name: "name", type:"string", label: "Name" }
        ]
    });

    </script>
```

## See Also

* [Basic Usage of the Filter (Demo)](https://demos.telerik.com/kendo-ui/filter/index)
* [Persisting the State of the Filter (Demo)](https://demos.telerik.com/kendo-ui/filter/persist-state)
* [JavaScript API Reference of the Filter](/api/javascript/ui/filter)
