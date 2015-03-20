---
title: Overview
page_title: Support for TabStip HtmlHelper extension for Kendo UI TabStrip for ASP.NET MVC widget
description: How to define items of the Kendo UI TabStrip widget for ASP.NET MVC, reference an existing TabStrip instance and handle TabStrip events.
---

# TabStrip

The TabStrip HtmlHelper extension is a server-side wrapper for the [Kendo UI TabStrip](/api/web/tabstrip) widget.

## Getting Started

There are several ways to define items of the Kendo TabStrip for ASP.NET MVC

*   use items builder - manually define the properties of each TabStrip item.
*   sitemap binding - uses a sitemap to create the items of the TabStrip.
*   model binding - uses a collection of objects to create the items of the TabStrip.

### Define items of the Kendo TabStrip

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a simple tabstrip:
    - WebForms

            <%: Html.Kendo().TabStrip()
                    .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                    .Items(items =>
                    {
                        items.Add().Text("Item 1"); //Add item with text "Item1")
                        items.Add().Text("Item 2"); //Add item with text "Item2")
                    })
            %>
    - Razor

            @(Html.Kendo().TabStrip()
                .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                .Items(items =>
                {
                    items.Add().Text("Item 1"); //Add item with text "Item1")
                    items.Add().Text("Item 2"); //Add item with text "Item2")
                })
            )

### Bind Kendo TabStrip to a sitemap

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a simple sitemap with **sample.sitemap** file name at the root of the project:

        <?xml version="1.0" encoding="utf-8" ?>
        <siteMap>
          <siteMapNode title="Home" controller="Home" action="Overview">
          <siteMapNode controller="grid" action="index" title="Grid" />
          <siteMapNode controller="tabstrip" action="index" title="TabStrip" />
          </siteMapNode>
        </siteMap>
3.  Load the sitemap using SiteMapManager:

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<xmlsitemap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }
4.  Add a tabstrip:
    - WebForms

            <%: Html.Kendo().TabStrip()
                    .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                    .BindTo("sample") //bind to sitemap with name "sample"
            %>
    - Razor

            @(Html.Kendo().TabStrip()
                .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                .BindTo("sample") //bind to sitemap with name "sample"
            )

### Bind Kendo TabStrip to a model

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method and pass the Categories table as the model:

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Categories);
        }
3.  Make your view strongly typed:
    - WebForms

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
                Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Category>>" %>
    - Razor

            @model IEnumerable<MvcApplication1.Models.Category>
4.  Add a tabstrip:
    - WebForms

            <%: Html.Kendo().TabStrip()
                .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                .BindTo(Model,(item,category)  =>
                {
                    item.Text = category.CategoryName;
                })
            %>
    - Razor

            @(Html.Kendo().TabStrip()
                .Name("tabstrip") //The name of the tabstrip is mandatory. It specifies the "id" attribute of the widget.
                .BindTo(Model,(item,category)  =>
                {
                    item.Text = category.CategoryName;
                })
            )

## Security trimming

The Menu widget has built-in security trimming functionality, which is enabled by default. If the URL, which Menu item points to is not authorized then it is hidden.
Security trimming depends on the [ASP.NET MVC Authorization authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7).
Every Action method decorated with [AuthorizeAttribute](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) will check whether the user is authorized and will allow/forbid the request.
Check this [link](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx)
for more information about ASP.NET MVC Authorization. The Menu will hide the menu item if the [OnAuthorization](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[HttpUnauthorizedResult](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx). If you need to use custom AuthorizeAttribute check this
[link](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute), which shows how to achieve your goal.

## Accessing an Existing TabStrip

You can reference an existing TabStrip instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/tabstrip#methods) to control its behavior.

### Accessing an existing TabStrip instance

    //Put this after your Kendo TabStrip for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the tabstrip is used to get its client-side instance
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
    });
    </script>

## Handling Kendo UI TabStrip events

You can subscribe to all [events](/api/web/tabstrip#events) exposed by Kendo UI TabStrip:

### WebForms - subscribe by handler name

    <%: Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Events(e => e
                .Select("tabstrip_select")
            )
    %>
    <script>
    function tabstrip_select() {
        //Handle the Select event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Events(e => e
                .Select("tabstrip_select")
          )
    )
    <script>
    function tabstrip_select() {
        //Handle the Select event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Events(e => e
              .Select(@<text>
                function() {
                    //Handle the Select event inline
                }
              </text>)
          )
    )

