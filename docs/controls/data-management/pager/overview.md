---
title: Overview
page_title: jQuery Pager Documentation | Pager Overview
description: "Get started with the jQuery Pager by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_pager_widget
position: 1
---

# Pager Overview

The [Kendo UI Pager widget](https://demos.telerik.com/kendo-ui/pager/index) enables splitting a set of data into pages with flexible and intuitive UI.

The user interface of the Pager is useful for paging data-bound components that have a [data source](/api/javascript/data/datasource) and do not have a built-in UI for paging such as the ListView or scenarios that require  paging options&mdash;for example, Kendo Templates with a data source.

 You can customize the page number templates or use an input for navigation to a specific page, toggle the visibility of previous and next buttons, include a pagesize dropdown and alter the information messages. The pager API also offers the ability to [localize its messages]({% slug localization_kendoui_pager_widget %}).

* [Demo page for the Pager](https://demos.telerik.com/kendo-ui/pager/index)

## Initializing the Pager

To use the Pager, use an empty `<div>` element and supply its settings in the initialization script.

The following example demonstrates how to tie a pager to a data source and enable the `pageSizes` option.

> * You can use a remote data source instead of an array of local data. The local array is used for brevity in this example.

```dojo
        <div id="pager"></div>

        <script>
            var dataSource = new kendo.data.DataSource({
              data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
              ],
              pageSize: 2
            });

            $("#pager").kendoPager({
              dataSource: dataSource,
              pageSizes: [2, 3, 4, "all"]
            });

            dataSource.read();
        </script>
        <style>
          #pager {
           margin-top: 100px;
          }
        </style>
```

## Functionality and Features

* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Responsive Pager]({% slug responsive_kendoui_pager_widget  %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
* [Globalization and Messages]({% slug globalization_kendoui_pager_widget %})

## Events

You can subscribe to the Pager [events](/api/javascript/ui/pager#events).

## Referencing Existing Instances

To refer to an existing Pager instance use the `jQuery.data()` method. Once a reference is established, use the [Pager API](/api/javascript/ui/pager) to control its behavior.

```
var pager = $("#pager").data("kendoPager");
```

## See Also

* [Basic Usage of the Pager (Demo)](https://demos.telerik.com/kendo-ui/pager/index)
* [Pager Integration (Demo)](https://demos.telerik.com/kendo-ui/pager/integration)
* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
