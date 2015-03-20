---
title: Overview
page_title: PanelBar HtmlHelper extension, server-side wrapper for Kendo UI PanelBar widget | Kendo UI Documentation
description: How to define items of the Kendo UI PanelBar for ASP.NET MVC in PanelBar HtmlHelper extension, handle Kendo UI PanelBar events.
---

# PanelBar

The PanelBar HtmlHelper extension is a server-side wrapper for the [Kendo UI PanelBar](/api/web/panelbar) widget.

## Getting Started

There are several ways to define items of the Kendo PanelBar for ASP.NET MVC

*   use items builder - manually define the properties of each PanelBar item.
*   sitemap binding - uses a sitemap to create the items of the PanelBar.
*   model binding - uses a collection of objects to create the items of the PanelBar.

### Define items of the Kendo PanelBar

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a simple panelbar:
    - WebForms

            <%: Html.Kendo().PanelBar()
                    .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                    .Items(items =>
                    {
                        items.Add().Text("Item 1"); //Add item with text "Item1")
                        items.Add().Text("Item 2"); //Add item with text "Item2")
                    })
            %>
    - Razor

            @(Html.Kendo().PanelBar()
                  .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                  .Items(items =>
                  {
                      items.Add().Text("Item 1"); //Add item with text "Item1")
                      items.Add().Text("Item 2"); //Add item with text "Item2")
                  })
            )

### Bind Kendo PanelBar to a sitemap

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a simple sitemap with **sample.sitemap** file name at the root of the project:

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
3.  Load the sitemap using SiteMapManager:

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }
4.  Add a panelbar:
    - WebForms

            <%: Html.Kendo().PanelBar()
                    .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                    .BindTo("sample") //bind to sitemap with name "sample"
            %>
    - Razor

            @(Html.Kendo().PanelBar()
                  .Name("panelbar") //The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
                  .BindTo("sample") //bind to sitemap with name "sample"
            )

### Bind Kendo PanelBar to a hierarchical model

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method and pass the Categories table as the model. Note that the Categories should have association to the Products table:

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
4.  Add a panelbar:
    - WebForms

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
    - Razor

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

## Security trimming

The Menu widget has built-in security trimming functionality, which is enabled by default. If the URL, which Menu item points to is not authorized then it is hidden.
Security trimming depends on the [ASP.NET MVC Authorization authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7).
Every Action method decorated with [AuthorizeAttribute](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) will check whether the user is authorized and will allow/forbid the request.
Check this [link](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx)
for more information about ASP.NET MVC Authorization. The Menu will hide the menu item if the [OnAuthorization](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[HttpUnauthorizedResult](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx). If you need to use custom AuthorizeAttribute check this
[link](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute), which shows how to achieve your goal.

## Accessing an Existing PanelBar

You can reference an existing PanelBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/panelbar#methods) to control its behavior.

### Accessing an existing PanelBar instance

    //Put this after your Kendo PanelBar for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the panelbar is used to get its client-side instance
        var panelbar = $("#panelbar").data("kendoPanelBar");
    });
    </script>


## Handling Kendo UI PanelBar events

You can subscribe to all [events](/api/web/panelbar#events) exposed by Kendo UI PanelBar:

### WebForms - subscribe by handler name

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


### Razor - subscribe by handler name

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


### Razor - subscribe by template delegate

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
