---
title: Columns
page_title: jQuery MultiColumnComboBox Documentation | Columns
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and configure its column width and other options."
slug: columns_kendoui_multicolumncombobox
position: 3
---

# Columns

The MultiColumnComboBox allows you to predefine the columns that will be rendered in its drop-down.

You can also set which field from the `dataItem` will be populated, set a title, template, `headerTemplate`, and width. For more information, refer to the [API for the columns configuration of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox/configuration/columns#related-properties).

The MultiColumnComboBox allows you to set the width of the drop-down through the [`dropDownWidth`](/api/javascript/ui/multicolumncombobox/configuration/dropdownwidth) option. In addition, the columns also allow you to [set their width](/api/javascript/ui/multicolumncombobox/configuration/columns.width).

> * If the widths of all columns are defined in pixels through their `width` option, the `dropDownWidth` value (if set) is overridden.
> * In all other cases when the widths of all columns are not set, the `dropDownWidth` value is applied to the element.

The following example demonstrates how to combine the column width values, set the drop-down width value, and ender a drop-down with a width of 300px in the MultiColumnComboBox.

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1", width: 150  },
                { text: "Oranges", value: "2", width: 150 }
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
            ]
        });
    </script>

The following example demonstrated how to set a specific width for the first column and calculate the rest of the space (the set `dropDownWidth` column width) so that the space is evenly split between the rest of the columns.

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dropDownWidth: 350,
            dataSource: [
                { text: "Apples", value: "1", subtitle: "subtitle 1", width: 150 },
                { text: "Oranges", value: "2", subtitle: "subtitle 2"},
                { text: "Kiwis", value: "3", subtitle: "subtitle 3"}
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" },
                { field: "subtitle", title: "SubTitle" }
            ]
        });
    </script>

## See Also

* [Basic Usage of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)
* [Using the API of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/api)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
