---
title: Overview
page_title: ListView Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Get started with the server-side wrapper for the Telerik UI ListView HtmlHelper for ASP.NET MVC."
slug: overview_listviewhelper_aspnetmvc
position: 1
---

# ListView HtmlHelper Overview

The Telerik UI ListView HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ListView widget.

The ListView enables you to display a custom layout of data-bound items. It does not provide a default rendering of data-bound items. Instead, it relies on templates to define the way a list of items is displayed, including alternating items and items that are in the process of editing.

* [Demo page for the ListView](https://demos.telerik.com/aspnet-mvc/listview)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **Products** table as the model.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

            public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
                    NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    ```
    ```Razor
        @model IEnumerable<MvcApplication1.Models.Product>
    ```

1. Add the ListView wrapper.

    ```Template
        <script type="text/x-kendo-tmpl" id="template">
            <div class="product">
                <img src="@Url.Content("~/content/web/foods/")#=ProductID#.jpg" alt="#=ProductName# image" />
                <h3>#=ProductName#</h3>
                <dl>
                    <dt>Price:</dt>
                    <dd>#=kendo.toString(UnitPrice, "c")#</dd>
                </dl>
            </div>
        </script>
    ```
    ```ASPX
        <%: Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
            .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
            .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
            .ClientTemplateId("template") // This template will be used for rendering the ListView items.
            .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
            }) // The DataSource configuration. It will be used on paging.
            .Pageable() // Enable paging.
        %>
    ```
    ```Razor
            @(Html.Kendo().ListView(Model) // The ListView will be initially bound to the Model which is the Products table.
                .Name("productListView") // The name of the ListView is mandatory. It specifies the "id" attribute of the ListView.
                .TagName("div") // The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
                .ClientTemplateId("template") // This template will be used for rendering the ListView items.
                .DataSource(dataSource => {
                    dataSource.Read(read => read.Action("Products_Read", "ListView"));
                }) // The DataSource configuration. It will be used on paging.
                .Pageable() // Enable paging.
            )
    ```

## Functionality and Features

* [Advanced Configuration]({% slug configuration_listviewhelper_aspnetmvc %})
* [Ajax binding]({% slug ajaxbinding_listviewhelper_aspnetmvc %})
* [Editing]({% slug eiditing_listviewhelper_aspnetmvc %})

## Events

You can subscribe to all ListView [events](/api/listview).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().ListView<ProductViewModel>()
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => {
            dataSource.Read(read => read.Action("Products_Read", "ListView"));
        })
        .Events(e => e
            .DataBound("productListView_dataBound")
            .Change("productListView_change")
        )
    %>
    <script>
        function productListView_dataBound() {
            // Handle the dataBound event.
        }

        function productListView_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().ListView<ProductViewModel>()
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => {
            dataSource.Read(read => read.Action("Products_Read", "ListView"));
        })
        .Events(e => e
            .DataBound("productListView_dataBound")
            .Change("productListView_change")
        )
    )
    <script>
        function productListView_dataBound() {
            // Handle the dataBound event.
        }

        function productListView_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().ListView<ProductViewModel>()
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => {
            dataSource.Read(read => read.Action("Products_Read", "ListView"));
        })
        .Events(e => e
            .DataBound(@<text>
                function() {
                    // Handle the dataBound event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing ListView instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ListView client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/listview#methods) to control its behavior.

    // Place the following after the ListView for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ListView is used to get its client-side instance.
            var listView = $("#productGrid").data("kendoListView");
        });
    </script>

## See Also

* [Basic Usage of the ListView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listview/index)
* [Server-Side API](/api/listview)
