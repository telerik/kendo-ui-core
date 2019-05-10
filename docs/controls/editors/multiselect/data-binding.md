---
title: Data Binding
page_title: jQuery MultiSelect Documentation | Data Binding | Kendo UI
description: "Get started with the jQuery MultiSelect by Kendo UI and learn how to bind the MultiSelect to local data arrays and to remote data sources."
slug: databinding_multiselect
position: 2
---

# Data Binding

The MultiSelect enables you to initialize it by using the `<input>` or the `<select>` element after you bind it to local data arrays or remote data services.

For more information on initializing the MultiSelect through the `<option>` tag of an existing `<select>` element, refer to the [MultiSelect **Overview** article]({% slug overview_kendoui_multiselect_widget %}#initializing-the-multiselect).

> When you configure the local or remote data source of the MultiSelect, enabling the paging functionality and setting [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) is efficient only when you use paging together with [virtualization]({% slug virtualization_kendoui_ddl_widget %}). In all other cases, enabling paging and setting `pageSize` is considered as incorrect configuration.

## Binding to Local Data

To initialize the MultiSelect by binding the widget to a local data array and utilizing the `<select>` element, use the [Kendo UI Data Source]({% slug overview_kendoui_datasourcecomponent %}). The Data Source component is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

    <select id="multiselect"></select>

    <script>
      $(document).ready(function(){
        $("#multiselect").kendoMultiSelect({
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

To initialize the DropDownList by binding the widget to remote data arrays and then utilizing the `<input>` or the `<select>` element, use the [Kendo UI Data Source]({% slug overview_kendoui_datasourcecomponent %}). The Data Source component is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets so that items can be loaded on demand when they are displayed. You can use the Data Source for serving data from a variety of data services such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

    <select id="multiselect" multiple></select>

    <script>
    $(document).ready(function() {
        $("#multiselect").kendoMultiSelect({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
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

## Preselecting Values

As of the Kendo UI 2013 Q1 SP1 release, when the `autoBind` option is set to `false`, you need to specify a list of data items instead of list of strings.

The following example demonstrates how to preselect values on initial loading.

    <select id="multiselect"></select>
    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
                autoBind: false,
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                        }
                    }
                },
                value: [
                    { ProductName: "Chang", ProductID: 2 },
                    { ProductName: "Uncle Bob's Organic Dried Pears", ProductID: 7 }
                ]
            });
        });
    </script>


## Removing Input Values

The MultiSelect enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **x** button appears in the input area on hover and when clicked by the user, the button resets the value of the widget and triggers the `change` event. By default, the `clearButton` option is enabled.

## See Also

* [Basic Usage of the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/index)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/muultiselect)
