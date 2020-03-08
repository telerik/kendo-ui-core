---
title: Scroll Modes
page_title: Scrolling
description: "Configure the Telerik UI ListView for {{ site.framework }} to enable its scrolling functionality."
slug: htmlhelpers_listview_aspnetcore_scrolling
position: 6
---

# Scroll Modes

By default, the scrolling functionality of the Telerik UI ListView for {{ site.framework }} is disabled.

## Getting Started

To control scrolling in the ListView, use its `Scrollable` property.

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

## Endless Scrolling

The endless scrolling functionality enables the ListView to display large amounts of data by appending additional pages of data on demand. The loading of new items happens when the scrollbar of the ListView reaches its end. When the data is returned, only the new items are rendered and appended to the old ones. The endless scrolling of the ListView works with both local and remote data. For a runnable example, refer to the [demo on endless scrolling by the ListView](https://demos.telerik.com/{{ site.platform }}/listview/endless-scrolling).

The following example demonstrates how to enable the endless scroll mode of the ListView by setting the `Scrollable` property to the `Endless` value of the `ListViewScrollableMode` enum.

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
        .Scrollable(ListViewScrollableMode.Endless)
        .HtmlAttributes(new { style="height:350px;" })
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) // The DataSource configuration. It will be used for paging.
        .Pageable() // Enable paging.
    )
```

## See Also

* [Endless Scrolling by the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/endless-scrolling)
* [Server-Side API](/api/listview)
