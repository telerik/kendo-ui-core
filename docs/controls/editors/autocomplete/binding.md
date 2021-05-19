---
title: Data Binding
page_title: jQuery AutoComplete Documentation | Data Binding
description: "Get started with the jQuery AutoComplete by Kendo UI and bind the widget to local or remote data and provide its suggestions."
slug: databinding_kendoui_autocomplete
position: 2
---

# Data Binding

The AutoComplete enables you to provide its suggestions by binding the widget to [local data arrays](#binding-to-local-data) or to [remote data services](#binding-to-remote-data).

When you use the AutoComplete with the DataSource component, you can perform the filtering of large remote data to the server and maximize the client-side performance.

> When you configure the local or remote data source of the AutoComplete, enabling paging functionality and setting [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) is efficient only when you use paging together with [virtualization]({% slug virtualization_kendoui_autocomplete_widget %}). In all other cases, do not enable the paging functionality or set the `pageSize`.

## Binding to Local Data

Locally defined values are useful for small and fixed sets of suggestions.

To provide the AutoComplete suggestions locally, use either of the following approaches:
* Pass an array directly to the constructor.
* Set the `dataSource` property to a local array.

The following example demonstrates how to directly initialize a local data array in the `constructor`.

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete(["Item1", "Item2", "Item3"]);
    </script>

The following example demonstrates how to bind the AutoComplete to a local data array by using the `dataSource` property.

    <input id="autoComplete" />
    <script>
        var data = ["Item1", "Item2", "Item3"];
        $("#autoComplete").kendoAutoComplete({
            dataSource: data
        });
    </script>

## Binding to Remote Data

Remote data binding is useful when you bind suggestions for larger datasets so that the items are loaded on demand upon display. To perform remote data binding, use the [Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}) which is an abstraction for local and remote data. You can use the DataSource for serving data from various data services such as [XML](https://en.wikipedia.org/wiki/XML), [JSON](https://en.wikipedia.org/wiki/JSON), and [JSONP](https://en.wikipedia.org/wiki/JSONP).

The following example demonstrates how to bind the AutoComplete to a remote data service by using oData and the DataSource component.

    $(document).ready(function(){
        $("#autoComplete").kendoAutoComplete({
            minLength: 3,
            dataTextField: "ContactName", // JSON property name to use
            dataSource: new kendo.data.DataSource({
                type: "odata", // specifies data protocol
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                }
            })
        });
    });

The following example demonstrates how to bind the AutoComplete to a JSONP service by using the DataSource component.

    $(document).ready(function(){
     $("#autoComplete").kendoAutoComplete({
      minLength:6,
      dataTextField:"title",
      filter: "contains",
      dataSource: new kendo.data.DataSource({
       transport: {
        read: {
         url: "http://api.geonames.org/wikipediaSearchJSON",
         data: {
          q: function(){
           return $("#autoComplete").data("kendoAutoComplete").value();
          },
          maxRows: 10,
          username: "demo"
         }
        }
       },
       schema: {
        data:"geonames"
       }
      }),
      change: function(){
       this.dataSource.read();
      }
     })
    });

## See Also

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
