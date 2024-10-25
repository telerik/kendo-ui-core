---
title: Selection
page_title: Selection
description: "Configure the Telerik UI ListView for {{ site.framework }} to enable selection functionality."
slug: htmlhelpers_listview_aspnetcore_selection
position: 8
---

# Selection

By default, the selection functionality of the Telerik UI ListView for {{ site.framework }} is disabled.

> As of the 2022 R3 release, the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/listvieweventbuilder#changesystemstring) event will now be fired only when Selection/Deselection is performed.

## Single Selection

The single selection functionality allows the user to select only one item at a time.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-listview name="productListView"
                    tag-name="div"
                    template-id="template"
                    style="height:350px;">
        <scrollable enabled="true" />
        <selectable mode="ListViewSelectionMode.Single" />
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Products_Read", "ListView")" />
            </transport>
        </datasource>
        <pageable enabled="true" />
    </kendo-listview>
```
{% endif %}
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

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-listview name="productListView"
                    tag-name="div"
                    template-id="template"
                    style="height:350px;">
        <scrollable enabled="true" />
        <selectable mode="ListViewSelectionMode.Multiple" />
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Products_Read", "ListView")" />
            </transport>
        </datasource>
        <pageable enabled="true" />
    </kendo-listview>
```
{% endif %}
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
