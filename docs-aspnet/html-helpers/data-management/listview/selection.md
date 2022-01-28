---
title: Selection
page_title: Selection
description: "Configure the Telerik UI ListView for {{ site.framework }} to enable selection functionality."
slug: htmlhelpers_listview_aspnetcore_selection
position: 7
---

# Selection

By default, the selection functionality of the Telerik UI ListView for {{ site.framework }} is disabled.

## Single Selection

The single selection functionality allows the user to select only one item at a time.

```Razor
    @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
        .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
        .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") // This template will be used for rendering the ListView items.
        .Scrollable()
        .Selectable(ListViewSelectionMode.Single) // Set the selection mode to single.
        .HtmlAttributes(new { style="height:350px;" })
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) // The DataSource configuration. It will be used for paging.
        .Pageable() // Enable paging.
    )
```
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

## Multiple Selection

The multiple selection functionality allows the user to select one or more items at a time.

```Razor
    @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
        .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
        .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") // This template will be used for rendering the ListView items.
        .Scrollable()
        .Selectable(ListViewSelectionMode.Multiple) // Set selection mode to multiple
        .HtmlAttributes(new { style="height:350px;" })
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) // The DataSource configuration. It will be used for paging.
        .Pageable() // Enable paging.
    )
```
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

## See Also

* [Selection by the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/selection)
* [Server-Side API](/api/listview)
