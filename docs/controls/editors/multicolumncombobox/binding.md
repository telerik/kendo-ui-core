---
title: Data Binding
page_title: jQuery MultiColumnComboBox Documentation | Data Binding
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and bind the widget to local data arrays or remote data services."
slug: databinding_kendoui_multicolumncombobox
position: 2
---

# Data Binding

The MultiColumnComboBox enables you to bind it to local data arrays and remote data services.

> When you configure the local or remote data source of the MultiColumnComboBox, enabling the paging functionality and setting [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) is efficient only when you use paging together with [virtualization]({% slug virtualization_kendoui_multicolumncombobox_widget %}). In all other cases, do not enable the paging functionality or set the `pageSize`.

## Binding to Local Data

Locally defined values are useful for limited value options.

To initialize the MultiColumnComboBox by binding the widget to a local data array and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}) which is an abstraction for local and remote data.

The following example demonstrates how to initialize the MultiColumnComboBox through the `<input>` element.

    <input id="comboBox" />

    <script>
      $(document).ready(function(){
        $("#comboBox").kendoMultiColumnComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ],
          columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
          ]
        });
      });
    </script>

## Binding to Remote Data

Remote data binding is useful for larger datasets so that the items are loaded on demand upon display. To initialize the ComboBox by binding the widget to remote data arrays and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). You can use the DataSource for serving data from various data services such as [XML](https://en.wikipedia.org/wiki/XML), [JSON](https://en.wikipedia.org/wiki/JSON), and [JSONP](https://en.wikipedia.org/wiki/JSONP).

    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox({
            index: 0,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
            ],
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "https://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>

## See Also

* [Basic Usage of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)
* [Using the API of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/api)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
