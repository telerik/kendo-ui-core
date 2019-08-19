---
title: Overview
page_title: ListView Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI ListView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/listview
slug: htmlhelpers_listview_aspnetcore
position: 1
---

# ListView HtmlHelper Overview

The Telerik UI ListView HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ListView widget.

The ListView enables you to display a custom layout of data-bound items. It does not provide a default rendering of data-bound items. Instead, it relies on templates to define the way a list of items is displayed, including alternating items and items that are in the process of editing.

* [Demo page for the ListView](https://demos.telerik.com/aspnet-core/listview/index)

## Initializing the ListView

The following example demonstrates how to define the ListView by using the ListView HtmlHelper.

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

* [Basic Usage of the ListView HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listview/index)
* [API Reference of the ListView HtmlHelper for ASP.NET Core](/api/listview)
