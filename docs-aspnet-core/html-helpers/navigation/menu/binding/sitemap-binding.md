---
title:  Sitemap Binding
page_title: Sitemap Binding | Kendo UI Menu HtmlHelper for ASP.NET Core
description: "Learn how to implement Sitemap Binding with Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_sitemapbinding_aspnetcore
position: 3
---

# Sitemap Binding

The Kendo UI Menu enables you to bind it to a sitemap.

To perform sitemap binding:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET Core]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}).
1. Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

    ```Razor
    <?xml version="1.0" encoding="utf-8" ?>
    <siteMap>
        <siteMapNode title="Home" controller="Home" action="Overview">
        <siteMapNode title="Grid">
            <siteMapNode controller="grid" action="index" title="First Look (Razor)" area="razor"/>
        </siteMapNode>
        <siteMapNode title="Menu">
            <siteMapNode controller="menu" action="index" title="First Look (Razor)" area="razor"/>
        </siteMapNode>
        </siteMapNode>
    </siteMap>
    ```

1. Load the sitemap by using `SiteMapManager`.

    ```Razor
    public ActionResult Index()
    {
        if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
        {
            SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
        }
        return View();
    }
    ```

1. Add a Menu.

    ```Razor
    @(Html.Kendo().Menu()
        .Name("menu") //The name of the Menu is mandatory. It specifies the "id" attribute of the widget.
        .BindTo("sample") //Bind to the sitemap with name "sample".
    )
    ```

## See Also

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)
