---
title: Templates
page_title: Hybrid ScrollView Documentation | Templates
description: "Get started with the Hybrid ScrollView by Kendo UI and use its templates."
slug: templates_hybridscrollview
position: 4
---

# Templates

The Hybrid ScrollView enables provides single- and multiple-item templates.

The following example demonstrates how to use a single-item template.

    <script id="scrollview-template" type="text/x-kendo-template">
        <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
        <p>#= ProductName #</p>
    </script>

The following example demonstrates how to use a multiple-item template.

    <!-- Note! data is accessed via data[index].fieldName -->
    <script id="scrollview-template" type="text/x-kendo-template">
        <div>
            <div style="width: 110px; height: 110px; background-image: #=setBackground(data[0].ProductID)#;"></div>
            <p>#= data[0].ProductName #</p>
        </div>
        <div>
            <div style="width: 110px; height: 110px; background-image: #=setBackground(data[1].ProductID)#;"></div>
            <p>#= data[1].ProductName #</p>
        </div>
    </script>

    <div data-role="view" data-stretch="true" data-init="onInit">
        <div id="scrollview"></div>
    </div>

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
                itemsPerPage: 2,
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
