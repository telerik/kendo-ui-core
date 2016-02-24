---
title: Overview
page_title: Overview | Hybrid UI ScrollView
description: "Initialize the hybrid Kendo UI ScrollView widget and define content pages to display one item per page."
slug: overview_hybridscrollview
position: 1
---

# ScrollView Overview

The [Hybrid UI ScrollView widget](http://demos.telerik.com/kendo-ui/m/index#scrollview/mobile) is used to scroll content that is wider than the device screen.

## Getting Started

The Kendo UI mobile Application automatically initializes the mobile ScrollView for every element with `role` data attribute set to `scrollview` and present in the markup of the views. Alternatively, it can be initialized by using jQuery plugin syntax in the containing mobile View `init` event handler.

The ScrollView widget supports two operation modes&mdash;standard and data-bound. The first one is suitable for displaying static content, while the second one provides remote data virtualization. If the ScrollView has a DataSource set during the initialization, it operates in a data-bound mode.

### Initialize from Markup

The example below demonstrates how to initialize the Hybrid UI ScrollView by using the data-role attribute.

###### Example

    <div data-role="scrollview">
        Foo
    </div>

### Initialize Using jQuery

The example below demonstrates how to initialize the Hybrid UI ScrollView by using jQuery plugin syntax.

###### Example

    <div data-role="view" data-init="initScrollView">
        <div id="scrollView">
            <div data-role="page">Foo</div>
            <div data-role="page">Bar</div>
        </div>
    </div>

    <script>
        function initScrollView(e) {
            e.view.element.find("#scrollView").kendoMobileScrollView();
        }
    </script>

## Data Binding

### Grasp the Basics

The Hybrid UI ScrollView widget can be bound to both local JavaScript arrays and remote data via the Kendo UI DataSource component. Local JavaScript arrays are appropriate for small data sets, while remote data binding with `serverPaging` applies better to larger data sets.

> **Important**
>
> If the total amount of displayed data is large, it is recommended to turn off the pager by setting `enablePager: false` in the configuration options or via `data-enable-pager="false"` data attribute.

If the `dataSource` configuration option of the ScrollView is set, the widget operates in a data-bound mode. In it, a fixed amount of DOM elements are rendered and then dynamically repositioned and updated while the user scrolls the widget.

Once the ScrollView reaches the total amount of DataSource items, forward scrolling is automatically prevented.

### Initialize Data-Bound ScrollViews

#### Use Data Attributes

The example below demonstrates how to initialize a Hybrid UI ScrollView bound to remote data by using the data attributes.

###### Example

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

        //Important! The dataSource variable should be accessible from the global scope
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
            },
            serverPaging: true,
            pageSize: 30
        });

        function setBackground(id) {
            return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
        }
    </script>

#### Use jQuery Plugin Syntax

The example below demonstrates how to initialize a Hybrid UI ScrollView bound to remote data by using jQuery plugin syntax.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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
            return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
        }
    </script>

### Render Content of Pages

When the ScrollView is in a data-bound mode, it generates its page elements automatically. When the DataSource is populated with data, the widget uses its `template` to render the content of the pages.

> **Important**
>
> It is mandatory that you specify the template. If it is missing, the widget is not able to render the content.

By default, the widget displays one data-record per page. There is an opportunity for displaying multiple data records on a single page by setting the `itemsPerPage` configuration option. In such cases, the specified amount of data records is passed to the template and it is your responsibility to handle the way they are going to be displayed.

> **Important**
>
> To ensure smooth scrolling, the `pageSize` of the DataSource should be 6 times `itemsPerPage` amount or higher. For example, if the `itemsPerPage` is set to 4, the `pageSize` must be 24 (4*6) or higher.

#### Single-Item Templates

The example below demonstrates a single-item template.

###### Example

    <script id="scrollview-template" type="text/x-kendo-template">
        <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
        <p>#= ProductName #</p>
    </script>

#### Multiple-Item Templates

The example below demonstrates a multiple-item template.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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
            return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
        }
    </script>

### Display of Incomplete Pages

When the ScrollView is configured to display multiple items per page, sometimes the last data view may not be complete. For example, if `itemsPerPage: 3` and there are a total of seven records in the DataSource, the widget should render 3 pages in total. The first two contain 3 items, while the last one has only 1 remaining item to display. In such cases, it is your responsibility to configure the template of the widget so it is able to handle the missing records. Otherwise, a JavaScript error occurs.

A possible approach to handle this issue is to use JavaScript logic (the `for` loop) inside the template.

The example below demonstrates a template with a JavaScript `for` loop.

###### Example

    <div id="home" data-role="view" data-model="viewModel">
        <div id="scrollview" data-role="scrollview"
            data-source="ds"
            data-template="tmpl"
            data-items-per-page="3">
        </div>
    </div>

    <script type="text/x-kendo-template" id="tmpl">
        <div>
            # for (var i = 0; i < data.length; i++) { #
                # var item = data[i]; #
                <div>#= item.title #</div>
            # } #
        </div>
    </script>

    <script>
        var ds = new kendo.data.DataSource({
            data: [
                {title:"Item 1", desc:"Description 1"},
                {title:"Item 2", desc:"Description 2"},
                {title:"Item 3", desc:"Description 3"},
                {title:"Item 4", desc:"Description 4"},
                {title:"Item 5", desc:"Description 5"},
                {title:"Item 6", desc:"Description 6"},
                {title:"Item 7", desc:"Description 7"}
            ]
        });

        var app = new kendo.mobile.Application();
    </script>

## Local Pages

### Define Local Pages

To define a local page, wrap the content in a `div` tag with `data-role="page"` attribute set.

###### Example

    <div data-role="scrollView">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
    </div>

### Clear Whitespaces

Whitespaces between page elements in markup causes the ScrollView pager to display an extra page. To fix this, remove any whitespace between the page elements.

###### Example

    <div data-role="page">
        <!--page content-->
    </div><div data-role="page">
        <!--page content-->
    </div><div data-role="page">
        <!--page content-->
    </div>

If a Kendo UI template is used to generate the pages, the whitespace gaps can be avoided in the way shown in the example below.

###### Example

    <script type="text/x-kendo-template" id="tmp"><div data-role="page" >
        <!-- page content -->
    </div></script>

## Nova Theme Features

### Pager Overlay

**Figure 1. ScrollView pager overlay**

![ScrollView pager overlay](/controls/hybrid/scrollview/pager-overlay.png)

To activate the feature, add the `km-scrollview-overlay` class to the ScrollView element.

###### Example

    <div data-role="scrollView" class="km-scrollview-overlay">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
    </div>

## Troubleshooting

### Display Issues

A data-bound ScrollView does not display any data. Below are listed some of the possible reasons and solutions for that.

The [`pageSize`](/api/javascript/data/datasource#configuration-pageSize) of the DataSource is undefined.

* **Solution** Set the `pageSize`. Setting the `pageSize` is mandatory.

The [`total`](/api/javascript/data/datasource#configuration-schema.total) amount of records in the DataSource is undefined.

* **Solution** Set the `total`. Setting the `total` is mandatory.

The widget's [`template`](/api/javascript/mobile/ui/scrollview#configuration-template) is undefined.

* **Solution** Set the `template`. Setting the `template` is mandatory.

The widget's content height is zero.

* **Solution** If the `contentHeight` is set to 100%, the ScrollView element should be the immediate child of the View and the View's `stretch` option should be set to `true`. For a code sample, refer to [this demo](/api/javascript/mobile/ui/scrollview#configuration-contentHeight).

### Performance Issues

The widget loads data, but the application hangs or crashes. The possible reason is that the total amount of records that you are loading is large.

**Solution** Set the [`enablePager`](/api/mobile/scrollview#configuration-enablePager) to `false`.

## See Also

Other articles and how-to examples on the Hybrid UI components and on the ScrollView:

* [Hybrid UI ScrollView JavaScript API Reference](/api/javascript/mobile/ui/scrollview)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
