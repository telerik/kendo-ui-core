---
title: Templates
page_title: Templates
description: "Configure the Telerik UI ListView for {{ site.framework }} to build its templates."
slug: htmlhelpers_listview_aspnetcore_templates
position: 5
---

# Templates

The Telerik UI ListView for {{ site.framework }} uses templates to visualize its data items in a consistent manner.

In order for the ListView to function seamlessly, defining its templates is mandatory.

## Getting Started

To set the template, refer it when you initialize the ListView. The template displays the result that is set by the service.

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

## Styling Alternate Items

Your project might require you to visually differentiate each alternating item in a ListView. For example, you might need to render each second item from the previous example in a slightly darker background, that is, banded rows. To achieve this behavior through the use of a template that you set, define the `altTemplate` property.

```Razor
    @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
        .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
        .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") // This template will be used for rendering the ListView items.
        .ClientAltTemplateId("altTemplate") // This template will be used for the alternating items in the ListView.
        .Scrollable()
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
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="altTemplate">
        <div class="product alt">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>
```

## See Also

* [Templates in the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/index)
* [Server-Side API](/api/listview)
* [Editor Template for the ListView HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_listview_aspnetcore_editing %}#defining-the-editor-template)
