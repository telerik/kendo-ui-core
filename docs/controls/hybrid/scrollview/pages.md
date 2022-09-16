---
title: Pages
page_title: Hybrid ScrollView Documentation | Pages
description: "Get started with the Hybrid ScrollView by Kendo UI and use its page and page size options."
slug: pages_hybridscrollview
position: 3
---

# Pages

The Hybrid ScrollView enables you to [set its `pageSize` property](#setting-the-pagesize-property), [configure the rendering of its `page` elements](#rendering-page-elements), [display incomplete pages](#displaying-incomplete-pages), [define local pages](#defining-local-pages), and [clear whitespaces](#clearing-whitespaces).

## Setting the pageSize Property

When the `pageSize` of the ScrollView is more than one, the data that is passed to the template is a JavaScript array. When the `pageSize` of the ScrollView is one, the data refers to the JSON object itself. Therefore, you have to modify the template for `pageSize` properties that equal one.

    <script id="scrollview-template" type="text/x-kendo-template">
    # if (data != null) { #
        <div data-role="page" style="width:100%;">
        <img class="carousal-image"
            src="#= getPreviewImageUrl(data.Type,data.PreviewImageUrl) #"/>
        </div>
    # } #
    </script>

## Rendering Page Elements

When the ScrollView is in a data-bound mode, it generates its page elements automatically. When the DataSource is populated with data, the widget uses its `template` to render the content of the pages.

By default, the widget displays one data record per page. You can display multiple data records on a single page by setting the `itemsPerPage` configuration option. In such cases, the specified amount of data records is passed to the template and it is your responsibility to handle the way they are going to be displayed.

> * You have to specify `template`. Otherwise, the widget will not be able to render the content.
> * To ensure smooth scrolling, the `pageSize` of the DataSource has to be six or more times the `itemsPerPage` amount. For example, if the `itemsPerPage` is set to `4`, the `pageSize` must be `24` (4*6) or more.

## Displaying Incomplete Pages

When the ScrollView is configured to display multiple items per page, sometimes the last data view may not be complete. For example, if `itemsPerPage: 3` and you have a total of seven records in the DataSource, the widget will render three pages in total. The first two contain three items while the last one has only one remaining item to display. In such cases, it is your responsibility to configure the template of the widget so it is able to handle the missing records. Otherwise, a JavaScript error occurs. A possible approach to handle this issue is to use JavaScript logic (the `for` loop) inside the template.

The following example demonstrates a template with a JavaScript `for` loop.

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

## Defining Local Pages

To define a local page, wrap the content in a `div` tag with `data-role="page"` attribute set.

    <div data-role="scrollView">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
    </div>

## Clearing Whitespaces

Whitespaces between page elements in markup causes the ScrollView pager to display an extra page. To fix this, remove any whitespace between the `page` elements.

    <div data-role="page">
        <!--page content-->
    </div><div data-role="page">
        <!--page content-->
    </div><div data-role="page">
        <!--page content-->
    </div>

If a Kendo UI template is used to generate the pages, the whitespace gaps can be avoided in the way shown in the example below.

    <script type="text/x-kendo-template" id="tmp"><div data-role="page" >
        <!-- page content -->
    </div></script>

## See Also

* [Basic Usage of the Hybrid ScrollView (Demo)](https://demos.telerik.com/kendo-ui/m/index#mobile-scrollview/mobile)
* [JavaScript API Reference of the Hybrid ScrollView](/api/javascript/mobile/ui/scrollview)
