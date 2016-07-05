---
title: Overview
page_title: Overview | Kendo UI TabStrip HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI TabStip widget for ASP.NET MVC."
slug: overview_tabstrip_aspnetmvc
position: 1
---

# TabStrip HtmlHelper Overview

The TabStrip HtmlHelper extension is a server-side wrapper for the [Kendo UI TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/index) widget.

## Getting Started

### The Basics

There are a few ways to bind a Kendo UI TabStrip for ASP.NET MVC:

* Use items builder&mdash;Manually define the properties of each TabStrip item.
* Sitemap binding&mdash;Use a sitemap to create the items of the TabStrip.
* Model binding&mdash;Use a collection of objects to create the items of the TabStrip.

### Items Builder

Below are listed the steps for you to follow when defining the items of a Kendo UI TabStrip.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a TabStrip.

###### Example

```tab-ASPX

        <%: Html.Kendo().TabStrip()
                .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                .Items(items =>
                {
                    items.Add().Text("Item 1"); //Add an item with the text "Item1".
                    items.Add().Text("Item 2"); //Add an item with the text "Item2".
                })
        %>
```
```tab-Razor

        @(Html.Kendo().TabStrip()
            .Name("tabstrip") //The name of the TabStrip is mandatory. It specifies the "id" attribute of the widget.
            .Items(items =>
            {
                items.Add().Text("Item 1"); //Add item with text "Item1")
                items.Add().Text("Item 2"); //Add item with text "Item2")
            })
        )
```

### Sitemap Binding

Below are listed the steps for you to follow when binding a Kendo UI TabStrip to a sitemap.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

###### Example

        <?xml version="1.0" encoding="utf-8" ?>
        <siteMap>
          <siteMapNode title="Home" controller="Home" action="Overview">
          <siteMapNode controller="grid" action="index" title="Grid" />
          <siteMapNode controller="tabstrip" action="index" title="TabStrip" />
          </siteMapNode>
        </siteMap>

**Step 3** Load the sitemap using `SiteMapManager`.

###### Example

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<xmlsitemap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }

**Step 4** Add a TabStrip.

###### Example

```tab-ASPX

        <%: Html.Kendo().TabStrip()
                .Name("tabstrip") //The name of the TabStrip is mandatory. It specifies the "id" attribute of the widget.
                .BindTo("sample") //Bind to the sitemap with the name "sample".
        %>
```
```tab-Razor

        @(Html.Kendo().TabStrip()
            .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
            .BindTo("sample") //Bind to the sitemap with the name "sample".
        )
```

### Model Binding

Below are listed the steps for you to follow when binding a Kendo UI TabStrip to a model.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method and pass the **Categories** table as the model.

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

**Step 4** Add a TabStrip.

###### Example

```tab-ASPX

        <%: Html.Kendo().TabStrip()
            .Name("tabstrip") //The name of the TabStrip is mandatory. It specifies the "id" attribute of the widget.
            .BindTo(Model,(item,category)  =>
            {
                item.Text = category.CategoryName;
            })
        %>
```
```tab-Razor

        @(Html.Kendo().TabStrip()
            .Name("tabstrip") //The name of the TabStrip is mandatory. It specifies the "id" attribute of the widget.
            .BindTo(Model,(item,category)  =>
            {
                item.Text = category.CategoryName;
            })
        )
```

### Security Trimming

The Kendo UI TabStrip widget has a built-in security trimming functionality, which is enabled by default. If the URL, which the TabStrip item points to, is not authorized, then it is hidden. Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method decorated with [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request.

For more information on the ASP.NET MVC Authorization, refer to [this link](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The TabStrip hides the Menu item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

To use a custom `AuthorizeAttribute`, refer to [this link](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

### Use Forms inside TabStrips

If `Html.BeginForm()` or `Ajax.BeginForm()` should be included inside a TabStrip `.Content()`, use the `.Render()` method of the TabStrip, as shown in the example below. Otherwise, the form will be rendered outside the TabStrip and the data will not be submitted correctly.

###### Example

        @{Html.Kendo().TabStrip()
            .Name("TabStrip1")
            .Items(tabstrip =>
            {
                tabstrip.Add().Text("Tab 1")
                    .Content(@<text>
                        @using (Ajax.BeginForm("...", "..."))
                        {
                            ...
                        }
                    </text>);
            }).Render();
        }

The above implementation is not required if the form is placed inside a partial view, which is loaded with Ajax via `.LoadContentFrom()`, or if a plain HTML `<form>` tag is used.

## Event Handling

You can subscribe to all TabStrip [events](/api/javascript/ui/tabstrip#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

      <%: Html.Kendo().TabStrip()
              .Name("tabstrip")
              .Events(e => e
                  .Select("tabstrip_select")
              )
      %>
      <script>
      function tabstrip_select() {
          //Handle the Select event.
      }
      </script>
``
```tab-Razor

      @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Events(e => e
                  .Select("tabstrip_select")
            )
      )
      <script>
      function tabstrip_select() {
          //Handle the Select event.
      }
      </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

      @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Events(e => e
                .Select(@<text>
                  function() {
                      //Handle the Select event inline.
                  }
                </text>)
            )
      )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI TabStrip instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TabStrip API](/api/javascript/ui/tabstrip#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI TabStrip for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the TabStrip is used to get its client-side instance.
          var tabstrip = $("#tabstrip").data("kendoTabStrip");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the TabStrip:

* [ASP.NET MVC API Reference: TabStripBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TabStripBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI TabStrip Widget]({% slug overview_kendoui_tabstrip_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
