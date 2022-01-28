---
title: Data Binding
page_title: jQuery ComboBox Documentation | Data Binding
description: "Get started with the jQuery ComboBox by Kendo UI and bind the widget to local or remote data."
slug: databinding_kendoui_combobox
position: 2
---

# Data Binding

The ComboBox enables you to bind it to [local data arrays](#binding-to-local-data) or to [remote data services](#binding-to-remote-data).

> When you configure the local or remote data source of the ComboBox, enabling the paging functionality and setting [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) is efficient only when you use paging together with [virtualization]({% slug virtualization_kendoui_combobox_widget %}). In all other cases, do not enable the paging functionality or set the `pageSize`.

## Binding to Local Data

Locally defined values are useful for limited value options.

To initialize the ComboBox by binding the widget to a local data array and utilizing the `<select>` or the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}) which is an abstraction for local and remote data.

The following example demonstrates how to initialize the ComboBox through the `<select>` element.

    <select id="comboBox">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#comboBox").kendoComboBox();
        });
    </script>

The following example demonstrates how to initialize the ComboBox through the `<input>` element.

    <input id="comboBox" />

    <script>
      $(document).ready(function(){
        $("#comboBox").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      });
    </script>

## Binding to Remote Data

Remote data binding is useful for larger datasets so that the items are loaded on demand upon display. To initialize the ComboBox by binding the widget to remote data arrays and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). You can use the DataSource for serving data from various data services such as [XML](https://en.wikipedia.org/wiki/XML), [JSON](https://en.wikipedia.org/wiki/JSON), and [JSONP](https://en.wikipedia.org/wiki/JSONP).

    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoComboBox({
            index: 0,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            filter: "contains",
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

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
