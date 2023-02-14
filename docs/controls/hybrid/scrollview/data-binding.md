---
title: Data Binding
page_title: Hybrid ScrollView Documentation | Data Binding
description: "Get started with the Hybrid ScrollView by Kendo UI and bind the widget to data."
slug: databinding_hybridscrollview
position: 2
---

# Data Binding

The Hybrid ScrollView provides options for binding it to local JavaScript arrays and remote data over the Kendo UI DataSource component.

Local JavaScript arrays are useful for small data sets. Remote data binding with `serverPaging` applies better to larger datasets.

> If the total amount of displayed data is large, it is recommended to turn off the pager by setting `enablePager: false` in the configuration options or via `data-enable-pager="false"` data attribute.

If the `dataSource` configuration option of the ScrollView is set, the widget operates in a data-bound mode. In it, a fixed amount of DOM elements are rendered and then dynamically repositioned and updated while the user scrolls the widget. Once the ScrollView reaches the total amount of DataSource items, forward scrolling is automatically prevented.

## Binding with data Attributes

The following example demonstrates how to initialize a Hybrid UI ScrollView bound to remote data by using the `data` attributes.

    <div data-role="view" data-stretch="true">
        <div data-role="scrollview"
            data-source="dataSource"
            data-template="scrollview-template"
            data-content-height="120px">
        </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
        <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
        <p>#= ProductName #</p>
    </script>

    <script>
        var app = new kendo.mobile.Application();

        // Important! The dataSource variable has to be accessible from the global scope.
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
            },
            serverPaging: true,
            pageSize: 30
        });

        function setBackground(id) {
            return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
        }
    </script>

## Binding with jQuery

The following example demonstrates how to initialize a Hybrid ScrollView bound to remote data by using jQuery plugin syntax.

    <div data-role="view" data-stretch="true" data-init="onInit">
        <div id="scrollview"></div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
        <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
        <p>#= ProductName #</p>
    </script>

    <script>
        var app = new kendo.mobile.Application();

        function onInit() {
            $("#scrollview").kendoMobileScrollView({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: {
                            url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                        }
                    },
                    serverPaging: true,
                    pageSize: 30
                },
                template: $("#scrollview-template").html(),
                contentHeight: 120,
                enablePager: false
            });
        }

        function setBackground(id) {
            return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
        }
    </script>

## See Also

* [Basic Usage of the Hybrid ScrollView (Demo)](https://demos.telerik.com/kendo-ui/m/index#mobile-scrollview/mobile)
* [JavaScript API Reference of the Hybrid ScrollView](/api/javascript/mobile/ui/scrollview)
