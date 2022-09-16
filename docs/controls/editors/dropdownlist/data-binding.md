---
title: Data Binding
page_title: jQuery DropDownList Documentation | Data Binding
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to bind the DropDownList to local data arrays and to remote data sources."
slug: databinding_dropdownlist_widget
position: 2
---

# Data Binding

The DropDownList enables you to initialize it by using the `<input>` or the `<select>` element after you bind it to local data arrays or remote data services.

For more information on initializing the DropDownList through the `<option>` tag of an existing `<select>` element, refer to the [DropDownList **Overview** article]({% slug overview_kendoui_dropdownlist_widget %}#initializing-the-dropdownlist).

> When you configure the local or remote data source of the DropDownList, enabling the paging functionality and setting [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) is efficient only when you use paging together with [virtualization]({% slug virtualization_kendoui_ddl_widget %}). In all other cases, enabling paging and setting `pageSize` is considered as incorrect configuration.

## Binding to Local Data

To initialize the DropDownList by binding the widget to a local data array and then utilizing the `<input>` or the `<select>` element, use the [Kendo UI Data Source]({% slug overview_kendoui_datasourcecomponent %}). The Data Source component is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

```dojo
   <input id="dropdownlist">

    <script>
      $(document).ready(function() {
        $("#dropdownlist").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      });
    </script>
```

## Binding to Remote Data

To initialize the DropDownList by binding the widget to remote data arrays and then utilizing the `<input>` or the `<select>` element, use the [Kendo UI Data Source]({% slug overview_kendoui_datasourcecomponent %}). The Data Source component is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets so that items can be loaded on demand when they are displayed. You can use the Data Source for serving data from a variety of data services such as [XML](https://en.wikipedia.org/wiki/XML), [JSON](https://en.wikipedia.org/wiki/JSON), and [JSONP](https://en.wikipedia.org/wiki/JSONP). For a complete example, refer to the [demo on binding the DropDownList to remote data](https://demos.telerik.com/kendo-ui/dropdownlist/remotedatasource).

```dojo
    <input id="dropdownlist">

    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
                index: 0,
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                dataSource: {
                    type: "odata", // specifies data protocol
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    }
                }
            });
        });
    </script>
```

## See Also

* [Binding the DropDownList to Remote Data (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/remotedatasource)
* [Binding the DropDownList over MVVM (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/mvvm)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
