---
title: Scrolling
page_title: Scrolling | Kendo UI ListView HtmlHelper for ASP.NET Core
description: "Configure the Kendo UI ListView for ASP.NET Core to enable scrolling functionality."
slug: htmlhelpers_listview_aspnetcore_scrolling
position: 4
---

# Scrolling

By default, the scrolling functionality of the Kendo UI ListView for ASP.NET Core is disabled.

To control scrolling in the ListView, use the `Scrollable` property.

###### Example

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
    @(Html.Kendo().ListView(Model) //The ListView will be initially bound to the Model which is the Products table.
        .Name("productListView") //The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
        .TagName("div") //The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") //This template will be used for rendering the ListView items.
        .Scrollable()
        .HtmlAttributes(new { style="height:350px;" })
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) //DataSource configuration. It will be used on paging.
        .Pageable() //Enable paging.
    )
```

## Endless Scrolling

The endless scrolling functionality enables the Kendo UI ListView for ASP.NET Core to display large amounts of data by appending additional pages of data on demand. The loading of new items happens when the scrollbar of the ListView reaches its end. When the data is returned, only the new items are rendered and appended to the old ones. The endless scrolling of the ListView works with both local and remote data.

To enable this feature set the `Scrollable` property to "Endless" value of the ListViewScrollableMode enum as shown in the example.

###### Example

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
    @(Html.Kendo().ListView(Model) //The ListView will be initially bound to the Model which is the Products table.
        .Name("productListView") //The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
        .TagName("div") //The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") //This template will be used for rendering the ListView items.
        .Scrollable(ListViewScrollableMode.Endless)
        .HtmlAttributes(new { style="height:350px;" })
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) //DataSource configuration. It will be used on paging.
        .Pageable() //Enable paging.
    )
```

## See Also

* [Overview of the ListView HtmlHelper]({% slug htmlhelpers_listview_aspnetcore %})
* [Ajax Binding of the ListView HtmlHelper]({% slug htmlhelpers_listview_aspnetcore_ajaxbinding %})
* [Official Demo of the Kendo UI ListView for ASP.NET Core Editing](https://demos.telerik.com/aspnet-core/listview/editing)
* [Overview of the jQuery Kendo UI ListView Widget](https://docs.telerik.com/kendo-ui/controls/data-management/listview/overview)
* [JavaScript API Reference of the ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
