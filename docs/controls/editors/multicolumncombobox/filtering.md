---
title: Filtering
page_title: jQuery MultiColumnComboBox Documentation | Filtering
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and apply its filter options."
slug: filtering_kendoui_multicolumncombobox
position: 4
---

# Filtering

Besides the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered.

The option accepts an array of strings.

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            filterFields: ["text", "value"],
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
