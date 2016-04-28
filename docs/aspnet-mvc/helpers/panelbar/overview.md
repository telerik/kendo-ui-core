---
title: Overview
page_title: Overview | Kendo UI PanelBar HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI PanelBar widget for ASP.NET MVC."
slug: overview_panelbarhelper_aspnetmvc
position: 1
---

# PanelBar HtmlHelper Overview

The PanelBar HtmlHelper extension is a server-side wrapper for the [Kendo UI PanelBar](/api/web/panelbar) widget.

## Getting Started

### The Basics

There are a few ways to bind a Kendo UI PanelBar for ASP.NET MVC:

* Use items builder&mdash;Manually define the properties of each PanelBar item.
* Sitemap binding&mdash;Uses a sitemap to create the items of the PanelBar.
* Model binding&mdash;Uses a collection of objects to create the items of the Menu.

### Items Builder

Below are listed the steps for you to follow when defining the items of a Kendo UI PanelBar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a PanelBar.

###### Example

```tab-ASPX

        <%: Html.Kendo().PanelBar()
                .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                .Items(items =>
                {
                    items.Add().Text("Item 1"); //Add item with text "Item1")
                    items.Add().Text("Item 2"); //Add item with text "Item2")
                })
        %>
```
```tab-Razor

        @(Html.Kendo().PanelBar()
              .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
              .Items(items =>
              {
                  items.Add().Text("Item 1"); //Add item with text "Item1")
                  items.Add().Text("Item 2"); //Add item with text "Item2")
              })
        )
```

### Sitemap Binding

Below are listed the steps for you to follow when binding a Kendo UI PanelBar to a sitemap.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a simple sitemap with a `sample.sitemap` file name at the root of the project.

###### Example

        <?xml version="1.0" encoding="utf-8" ?>
        <siteMap>
          <siteMapNode title="Home" controller="Home" action="Overview">
            <siteMapNode title="Grid">
              <siteMapNode controller="grid" action="index" title="First Look (Razor)" area="razor"/>
              <siteMapNode controller="grid" action="index" title="First Look (ASPX)" area="aspx"/>
            </siteMapNode>
            <siteMapNode title="PanelBar">
              <siteMapNode controller="panelbar" action="index" title="First Look (Razor)" area="razor"/>
              <siteMapNode controller="panelbar" action="index" title="First Look (ASPX)" area="aspx"/>
            </siteMapNode>
          </siteMapNode>
        </siteMap>

**Step 3** Load the sitemap using the `SiteMapManager`.

###### Example

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }

**Step 4** Add a PanelBar.

###### Example

```tab-ASPX

        <%: Html.Kendo().PanelBar()
                .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                .BindTo("sample") //bind to sitemap with name "sample"
        %>
```
```tab-Razor

        @(Html.Kendo().PanelBar()
              .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
              .BindTo("sample") //bind to sitemap with name "sample"
        )
```

### Model Binding

Below are listed the steps for you to follow when binding a kendo UI PanelBar to a hierarchical model.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method and pass the **Categories** table as the model. Note that the **Categories** should be associated to the **Products** table.

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

**Step 4** Add a PanelBar.

###### Example

```tab-ASPX

        <%: Html.Kendo().PanelBar()
                .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                .BindTo(Model, mappings =>
                {
                    mappings.For<category>(binding => binding //define first level of panelbar
                        .ItemDataBound((item, category) => //define mapping between panelbar item properties and the model properties
                        {
                            item.Text = category.CategoryName;
                        })
                        .Children(category => category.Products)); //define which property of the model contains the children
                    mappings.For<product>(binding => binding
                        .ItemDataBound((item, product) =>
                        {
                            item.Text = product.ProductName;
                        }));
                })
            %>
```
```tab-Razor

        @(Html.Kendo().PanelBar()
              .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
              .BindTo(Model, mappings =>
               {
                   mappings.For<category>(binding => binding //define first level of panelbar
                       .ItemDataBound((item, category) => //define mapping between panelbar item properties and the model properties
                           {
                           item.Text = category.CategoryName;
                           })
                       .Children(category => category.Products)); //define which property of the model contains the children
                   mappings.For<product>(binding => binding
                       .ItemDataBound((item, product) =>
                           {
                           item.Text = product.ProductName;
                           }));
               })
        )
```

### Security Trimming

The Kendo UI PanelBar widget has a built-in security trimming functionality, which is enabled by default. If the URL, which the PanelBar item points to, is not authorized, then it is hidden. Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method decorated with [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request.

For more information on the ASP.NET MVC Authorization, refer to [this link](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The PanelBar hides the Menu item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

To use a custom `AuthorizeAttribute`, refer to [this link](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

## Event Handling

You can subscribe to all PanelBar [events](/api/javascript/ui/menu#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().PanelBar()
                .Name("panelbar")
                .Events(e => e
                    .Expand("panelbar_expand")
                    .Collapse("panelbar_collapse")
                )
        %>
        <script>
        function panelbar_collapse() {
            //Handle the collapse event
        }

        function panelbar_expand() {
            //Handle the expand event
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().PanelBar()
              .Name("panelbar")
              .Events(e => e
                    .Expand("panelbar_expand")
                    .Collapse("panelbar_collapse")
              )
        )
        <script>
        function panelbar_collapse() {
            //Handle the collapse event
        }

        function panelbar_expand() {
            //Handle the expand event
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().PanelBar()
              .Name("panelbar")
              .Events(e => e
                  .Expand(@<text>
                    function() {
                        //Handle the expand event inline
                    }
                  </text>)
                  .Collapse(@<text>
                    function() {
                        //Handle the collapse event inline
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI PanelBar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [PanelBar API](/api/javascript/ui/panelbar#methods) to control its behavior.

###### Example

      //Put this after your Kendo PanelBar for ASP.NET MVC declaration
      <script>
      $(function() {
          // Notice that the Name() of the panelbar is used to get its client-side instance
          var panelbar = $("#panelbar").data("kendoPanelBar");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the PanelBar:

* [ASP.NET MVC API Reference: PanelBarBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI PanelBar Widget]({% slug overview_kendoui_panelbar_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
