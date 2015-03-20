---
title: ScrollView
page_title: Technical documentation for Kendo UI Mobile ScrollView widget
description: Learn how to initialize Mobile ScrollView widget and define content pages in order to display one item per page.
---

# ScrollView Overview

The Kendo Mobile ScrollView widget is used to scroll content wider than the device screen.

  - [Initialization](#initialization)
    - [Initialize mobile ScrollView using data-role attribute.](#initialize-mobile-scrollview-using-data-role-attribute)
    - [Initialize mobile ScrollView using jQuery plugin syntax.](#initialize-mobile-scrollview-using-jquery-plugin-syntax)
    - [Initialize mobile ScrollView bound to remote data using data attributes.](#initialize-mobile-scrollview-bound-to-remote-data-using-data-attributes)
    - [Initialize mobile ScrollView bound to remote data using jQuery plug-in syntax.](#initialize-mobile-scrollview-bound-to-remote-data-using-jquery-plug-in-syntax)
  - [Local pages](#local-pages)
    - [ScrollView with local pages](#scrollview-with-local-pages)
    - [Clearing the whitespaces](#clearing-the-whitespaces)
  - [Binding to data](#binding-to-data)
    - [Pages in data bound mode](#pages-in-data-bound-mode)
      - [Single item template](#single-item-template)
      - [Multiple items template](#multiple-items-template)
    - [Displaying incomplete pages](#displaying-incomplete-pages)
      - [Template with JavaScript for loop](#template-with-javascript-for-loop)
  - [Troubleshooting](#troubleshooting)

## Initialization

The Kendo Mobile Application automatically initializes the Mobile ScrollView for every element with `role` data attribute set to `scrollview` present in the views' markup.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.

The widget supports two operation modes - *standard* and *data bound*. The first one is suitable for displaying static content, while the second one provides remote data virtualization. If the ScrollView has a DataSource set during the initialization it will operate in data bound mode.

### Initialize mobile ScrollView using data-role attribute.

    <div data-role="scrollview">
        Foo
    </div>

### Initialize mobile ScrollView using jQuery plugin syntax.

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

### Initialize mobile ScrollView bound to remote data using data attributes.

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

### Initialize mobile ScrollView bound to remote data using jQuery plug-in syntax.

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

## Local pages

To define a local page, wrap the content in a `div` tag with `data-role="page"` attribute set.

### ScrollView with local pages

    <div data-role="scrollView">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
    </div>

### Clearing the whitespaces

Whitespaces between page elements in the mark-up causes the ScrollView pager to display an extra page. In order to fix this any whitespace between page elements should be removed.

    <div data-role="page">
        <!--page content-->
    </div><div data-role="page">
        <!--page content-->
    </div><div data-role="page">
        <!--page content-->
    </div>

If a Kendo template is used to generate the pages the whitespace gaps can be avoided in the following way.

    <script type="text/x-kendo-template" id="tmp"><div data-role="page" >
        <!-- page content -->
    </div></script>

## Binding to data

The Mobile ScrollView can be bound to both local JavaScript arrays and remote data via the Kendo DataSource component.
Local JavaScript arrays are appropriate for small data sets, while remote data binding with `serverPaging` is better for larger data sets.

> **Important:** In case the total amount of displayed data is large, it is recommended to turn off the pager by setting `enablePager: false` in the configuration options or via `data-enable-pager="false"` data attribute.

If `dataSource` configuration option of the Mobile ScrollView is set, the widget will operate in data bound mode.
In this mode, fixed amount of DOM elements are rendered, and then dynamically repositioned and updated while the user scrolls the widget.

Once the ScrollView reaches the total amount of DataSource items forward scrolling will be prevented automatically.

### Pages in data bound mode

When the Kendo Mobile ScrollView is in data bound mode, it will generate its page elements automatically.
When DataSource is populated with data the widget will use its `template` to render the pages' content.
**Specifying the template is mandatory**, if it is missing the widget will not be able to render the content.

By default the widget displays one data record per page. There is an opportunity for displaying multiple data records on a single page by setting the `itemsPerPage` configuration option. 
*In such case, the specified amount of data records will be passed to the template and it is responsibily of the developer to handle the way they will be displayed.*

> **Important:** In order ensure smooth scrolling the **`pageSize` of the DataSource should be 6 times `itemsPerPage` amount** or higher. For example, if `itemsPerPage` is set to 4, then the `pageSize` must be 24 (4*6) or higher.

#### Single item template

    <script id="scrollview-template" type="text/x-kendo-template">
        <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
        <p>#= ProductName #</p>
    </script>

#### Multiple items template

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

### Displaying incomplete pages

When the ScrollView is configured to **display multiple items per page**, in some cases the last data view may not be complete. For example, if `itemsPerPage: 3` and there are total 7 records in the DataSource, the widget should render 3 pages in total. First two will contain 3 items, while the last one will have only 1 remaining item to display. **In such case, the developer is responsible to configure the widget's template so it will be able to handle the missing records, else a JavaScript error will occur.**

One possible approach is to use JavaScript logic (for loop) inside the template.

#### Template with JavaScript for loop

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

## Troubleshooting

If a dataBound ScrollView does not display any data the reason might be:

- the [pageSize](/api/framework/datasource#configuration-pageSize) of the DataSource is undefined. Setting `pageSize` is mandatory.
- the [total](/api/framework/datasource#configuration-schema.total) amount of records in the DataSource is undefined. Setting the `total` is mandatory.
- the widget's [template](/api/mobile/scrollview#configuration-template) is undefined. Setting `template` is mandatory.
- the widget content height is zero - if `contentHeight` is set to 100% the ScrollView element should be immediate child of the View and the View's stretch option should be set to true. Code sample could be found [here](/api/mobile/scrollview#configuration-contentHeight)

If the widget loads data but the application hangs or crashes:

- most probably the total amount of records that you are loading is large and you have to set [enablePager](/api/mobile/scrollview#configuration-enablePager) to false.
