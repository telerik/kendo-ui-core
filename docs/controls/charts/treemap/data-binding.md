---
title: Data Binding
page_title: jQuery TreeMap Documentation | Data Binding
description: "Get started with the jQuery TreeMap by Kendo UI and learn how to bind it to data."
slug: databinding_treemap_widget
position: 2
---

# Data Binding

The Kendo UI TreeMap provides options for binding it to a [local data source](#binding-to-local-data) and to a [remote data source](#binding-to-remote-data).

## Binding to Local Data

The following example demonstrates how to create the TreeMap container.

    <div id="treeMap"></div>

Initialize the TreeMap and bind it in the following way.

    $(document).ready(function() {
        $("#treeMap").kendoTreeMap({
            dataSource: {
                data: [{
                    name: "foo",
                    value: 1
                }]
            },
            valueField: "value",
            textField: "name"
        })
    });

## Binding to Remote Data

For more information, refer to the article on [hierarchical Data Source](/api/framework/hierarchicaldatasource).

## See Also

* [Basic Usage of the TreeMap (Demo)](https://demos.telerik.com/kendo-ui/treemap/index)
* [JavaScript API Reference of the TreeMap](/api/javascript/dataviz/ui/treemap)
