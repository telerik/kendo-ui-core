---
title: Paging
page_title: Paging
description: "Configure the Telerik UI ListView for {{ site.framework }} to enable its paging functionality."
slug: htmlhelpers_listview_aspnetcore_paging
position: 4
---

# Paging

By default, paging in the ListView is disabled.

When the number of items that are bound to a ListView is larger than expected, a pager will control the items that are displayed. By default, the ListView displays a pager even when the total amount of its data source items is less than the `PageSize` value.

## Getting Started

To enable the paging functionality of the ListView:

1. Set the `Pageable` option.

        ```Template
            <script type="text/x-kendo-tmpl" id="template">
                <div class="product">
                    <h3>#=ProductName#</h3>
                    <dl>
                        <dt>Price:</dt>
                        <dd>#=kendo.toString(UnitPrice, "c")#</dd>
                    </dl>
                </div>
            </script>
        ```
        ```Razor
            @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
                .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
                .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
                .ClientTemplateId("template") // This template will be used for rendering the ListView items.
                .Scrollable()
                .HtmlAttributes(new { style="height:350px;" })
                .DataSource(dataSource => {
                        dataSource.Read(read => read.Action("Products_Read", "ListView"));
                }) // The DataSource configuration. It will be used for paging.
                .Pageable() // Enable paging.
            )
        ```

1. Define the page size.

        ```Template
            <script type="text/x-kendo-tmpl" id="template">
                <div class="product">
                    <h3>#=ProductName#</h3>
                    <dl>
                        <dt>Price:</dt>
                        <dd>#=kendo.toString(UnitPrice, "c")#</dd>
                    </dl>
                </div>
            </script>
        ```
        ```Razor
            @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
                .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
                .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
                .ClientTemplateId("template") // This template will be used for rendering the ListView items.
                .Scrollable()
                .HtmlAttributes(new { style="height:350px;" })
                .DataSource(dataSource => {
                        dataSource.Read(read => read.Action("Products_Read", "ListView"));
                        dataSource.PageSize(4); // Set the page size for the ListView.
                }) // The DataSource configuration. It will be used for paging.
                .Pageable() // Enable paging.
            )
        ```

## See Also

* [Paging by the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/index)
* [Server-Side API](/api/listview)
