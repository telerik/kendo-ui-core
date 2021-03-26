---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ListView HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/listview, /helpers/data-management/listview/overview, /helpers/data-management/listview/configuration
slug: htmlhelpers_listview_aspnetcore
position: 1
---

# ListView HtmlHelper Overview

The Telerik UI ListView HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ListView widget.

The ListView enables you to display a custom layout of data-bound items. The ListView is ideally suited for displaying a list of items in a consistent manner. You can see commonplace examples of its use in the design structures of the Internet, search engine results, tweets from Twitter, Facebook updates, inbox items in Gmail, card lists in Trello, and so on.

The ListView enables you to control the display of data. It does not provide a default rendering of data-bound items. Instead, it relies on templates to define the way a list of items is displayed, including alternating items and items that are in the process of editing.

* [Demo page for the ListView](https://demos.telerik.com/{{ site.platform }}/listview/index)

## Initializing the ListView

The following example demonstrates how to define the ListView by using the ListView HtmlHelper.

* The `TagName` of the ListView for {{ site.framework }} is used to create an element to contain all ListView items once the ListView is bound.
* The `ClientTemplateId` is mandatory for the ListView. It contains the `id` of the `script` element which accommodates the item template.

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
        .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
        .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
        .ClientTemplateId("template") // This template will be used for rendering the ListView items.
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) // The DataSource configuration. It will be used on paging.
        .Pageable() // Enable paging.
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the ListView HtmlHelper.

```Template
    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
                <dt>Unit Price</dt>
                <dd>#:kendo.toString(UnitPrice, "c")#</dd>
                <dt>Units In Stock</dt>
                <dd>#:UnitsInStock#</dd>
                <dt>Discontinued</dt>
                <dd>#:Discontinued#</dd>
            </dl>
            <div class="edit-buttons">
                <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
                <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
            </div>
        </div>
    </script>
```
```Razor
    @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => dataSource
            .Model(model => model.Id("ProductID"))
            .PageSize(4)
            .Read(read => read.Action("Editing_Read", "ListView"))
            .Update(update => update.Action("Editing_Update", "ListView"))
            .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
        )
        .Pageable()
        .Editable()
    )
```

## Functionality and Features

* [Ajax binding]({% slug htmlhelpers_listview_aspnetcore_ajaxbinding %})
* [Editing]({% slug htmlhelpers_listview_aspnetcore_editing %})
* [Paging]({% slug htmlhelpers_listview_aspnetcore_paging %})
* [Templates]({% slug htmlhelpers_listview_aspnetcore_templates%})
* [Scroll modes]({% slug htmlhelpers_listview_aspnetcore_scrolling %})
* [Selection]({% slug htmlhelpers_listview_aspnetcore_selection %})
* [Globalization]({% slug globalization_htmlhelpers_listview %})
* [Accessibility]({% slug accessibility_htmlhelpers_listview %})

## See Also

* [Basic Usage of the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/index)
* [Server-Side API](/api/listview)
