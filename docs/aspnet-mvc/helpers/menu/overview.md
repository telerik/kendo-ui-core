---
title: Overview
page_title: Overview | Kendo UI Menu HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Menu widget for ASP.NET MVC."
slug: overview_menu_aspnetmvc
position: 1
---

# Menu HtmlHelper Overview

The Menu HtmlHelper extension is a server-side wrapper for the [Kendo UI Menu](https://demos.telerik.com/kendo-ui/menu/index) widget.

## Getting Started

### The Basics

There are a few ways to bind a Kendo UI Menu for ASP.NET MVC:

* Use items builder&mdash;Manually define the properties of each Menu item.
* Sitemap binding&mdash;Uses a sitemap to create the items of the Menu.
* Model binding&mdash;Use a collection of objects to create the items of the Menu.

### Items Builder

Below are listed the steps for you to follow when defining the items of a Kendo UI Menu.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a simple Menu.

###### Example

```tab-ASPX

        <%: Html.Kendo().Menu()
                .Name("menu") //The name of the menu is mandatory. It specifies the "id" attribute of the widget.
                .Items(items =>
                {
                    items.Add().Text("Item 1"); //Add an item with the text "Item1".)
                    items.Add().Text("Item 2"); //Add an item with the text "Item2".)
                })
        %>
```
```tab-Razor

        @(Html.Kendo().Menu()
            .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
            .Items(items =>
            {
                items.Add().Text("Item 1"); //Add an item with the text "Item1".)
                items.Add().Text("Item 2"); //Add an item with the text "Item2".)
            })
        )
```

### Sitemap Binding

Below are listed the steps for you to follow when binding a Kendo UI Menu to a sitemap.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

###### Example

        <?xml version="1.0" encoding="utf-8" ?>
        <siteMap>
          <siteMapNode title="Home" controller="Home" action="Overview">
            <siteMapNode title="Grid">
              <siteMapNode controller="grid" action="index" title="First Look (Razor)" area="razor"/>
              <siteMapNode controller="grid" action="index" title="First Look (ASPX)" area="aspx"/>
            </siteMapNode>
            <siteMapNode title="Menu">
              <siteMapNode controller="menu" action="index" title="First Look (Razor)" area="razor"/>
              <siteMapNode controller="menu" action="index" title="First Look (ASPX)" area="aspx"/>
            </siteMapNode>
          </siteMapNode>
        </siteMap>

**Step 3** Load the sitemap using `SiteMapManager`.

###### Example

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }

**Step 4** Add a Menu.

###### Example

```tab-ASPX

        <%: Html.Kendo().Menu()
                .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
                .BindTo("sample") //Bind to sitemap with name "sample".
        %>
```
```tab-Razor

        @(Html.Kendo().Menu()
              .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
              .BindTo("sample") //Bind to the sitemap with name "sample".
        )
```

### Model Binding

Below are listed the steps for you to follow when binding a Kendo UI Menu to a hierarchical model.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method and pass the **Categories** table as the model. Note that the **Categories** must be associated to the **Products** table.

###### Example

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Categories);
        }

**Step 3** Make your view strongly typed.

###### Example

```tab-ASPX

        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Category>>" %>
```
```tab-Razor

        @model IEnumerable<MvcApplication1.Models.Category>
```

**Step 4** Add a Menu.

###### Example

```tab-ASPX

        <%: Html.Kendo().Menu()
                .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
                .BindTo(Model, mappings =>
                {
                    mappings.For<category>(binding => binding //Define the first level of the Menu.
                        .ItemDataBound((item, category) => //Define the mapping between the Menu item properties and the model properties.
                        {
                            item.Text = category.CategoryName;
                        })
                        .Children(category => category.Products)); //Define which property of the model contains the children.
                    mappings.For<product>(binding => binding
                        .ItemDataBound((item, product) =>
                        {
                            item.Text = product.ProductName;
                        }));
                })
        %>
```
```tab-Razor

        @(Html.Kendo().Menu()
              .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
              .BindTo(Model, mappings =>
              {
                  mappings.For<category>(binding => binding //Define the first level of the Menu.
                      .ItemDataBound((item, category) => //Define the mapping between the Menu item properties and the model properties.
                          {
                          item.Text = category.CategoryName;
                          })
                      .Children(category => category.Products)); //Define which property of the model contains the children.
                  mappings.For<product>(binding => binding
                      .ItemDataBound((item, product) =>
                      {
                          item.Text = product.ProductName;
                      }));
            })
        )
```

### Security Trimming

The Kendo UI Menu widget has a built-in security trimming functionality, which is enabled by default. If the URL, which the Menu item points to, is not authorized, then it is hidden. Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method decorated with [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request.

For more information on the ASP.NET MVC Authorization, refer to [this link](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The Menu hides the Menu item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

To use a custom `AuthorizeAttribute`, refer to [this link](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

When the Menu items are removed because of lacking permissions, a parent item may be left without any children. For such cases, the Menu provides an option to remove the "orphaned" parent items.

###### Example

        Html.Kendo().Menu()
            .Name("MainMenu")
            .SecurityTrimming(s => s.HideParent(true))

## Event Handling

You can subscribe to all Menu [events](/api/javascript/ui/menu#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Menu()
                .Name("menu")
                .Events(e => e
                    .Open("menu_open")
                    .Close("menu_close")
                )
        %>
        <script>
        function menu_close() {
            //Handle the close event.
        }

        function menu_open() {
            //Handle the open event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().Menu()
              .Name("menu")
              .Events(e => e
                    .Open("menu_open")
                    .Close("menu_close")
              )
        )
        <script>
        function menu_close() {
            //Handle the close event.
        }

        function menu_open() {
            //Handle the open event.
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Menu()
              .Name("menu")
              .Events(e => e
                  .Open(@<text>
                    function() {
                        //Handle the open event inline.
                    }
                  </text>)
                  .Close(@<text>
                    function() {
                        //Handle the close event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Menu instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Menu API](/api/javascript/ui/menu#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Menu for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Menu is used to get its client-side instance.
            var menu = $("#menu").data("kendoMenu");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Menu:

* [ASP.NET MVC API Reference: MenuBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [ASP.NET MVC API Reference: MenuItemBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Menu Widget]({% slug overview_kendoui_menu_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
