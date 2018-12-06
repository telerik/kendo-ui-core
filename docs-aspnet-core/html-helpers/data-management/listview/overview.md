---
title: Overview
page_title: ListView | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ListView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/listview
slug: htmlhelpers_listview_aspnetcore
position: 1
---

# ListView HtmlHelper Overview

The ListView HtmlHelper extension is a server-side wrapper for the [Kendo UI ListView](http://demos.telerik.com/aspnet-mvc/listview/index) widget.

It enables you to display a custom layout of data-bound items. It does not provide a default rendering of data-bound items. Instead, it relies on templates to define the way a list of items is displayed, including alternating items and items that are in the process of editing.

For more information on the HtmlHelper, refer to the article on the [ListView HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/listview/overview).

## Basic Usage

The following example demonstrates how to define the ListView by using the ListView HtmlHelper.

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
        .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
        }) //DataSource configuration. It will be used on paging.
        .Pageable() //Enable paging.
    )
```

## Configuration

The following example demonstrates the basic configuration for the ListView with editing.

###### Example

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

## See Also

* [JavaScript API Reference of the ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
* [ListView HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/listview/overview)
* [ListView Official Demos](https://demos.telerik.com/aspnet-core/listview/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
