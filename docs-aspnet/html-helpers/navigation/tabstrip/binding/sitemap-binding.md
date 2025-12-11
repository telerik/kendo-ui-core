---
title: Sitemap Binding
page_title: Sitemap Binding
description: "Set a sitemap to create the items of the Telerik UI TabStrip HtmlHelper for ASP.NET MVC."
components: ["tabstrip"]
previous_url: /helpers/navigation/tabstrip/binding/sitemap-binding
slug: sitemapbinding_tabstrip_aspnetmvc
position: 4
---

# Sitemap Binding

The TabStrip enables you to create its items by binding to an ASP.NET sitemap, which automatically generates the hierarchical structure based on the XML sitemap configuration.

To bind the TabStrip to a sitemap, follow the next steps:

1. Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

    ```xml
    <?xml version="1.0" encoding="utf-8" ?>
    <siteMap>
        <siteMapNode title="Home" controller="Home" action="Overview">
        <siteMapNode controller="grid" action="index" title="Grid" />
        <siteMapNode controller="tabstrip" action="index" title="TabStrip" />
        </siteMapNode>
    </siteMap>
    ```

1. Load the sitemap using the `SiteMapManager`.

    ```C#
    public ActionResult Index()
    {
        if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
        {
            SiteMapManager.SiteMaps.Register<xmlsitemap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
        }
        return View();
    }
    ```

1. Define the TabStrip and bind it to the sitemap.

    ```Razor
    @(Html.Kendo().TabStrip()
        .Name("tabstrip") // The name of the TabStrip is mandatory. It specifies the "id" attribute of the TabStrip HTML element.
        .BindTo("sample") // Bind to the sitemap with the name "sample".
    )
    ```

## See Also

* [Basic Usage of the TabStrip for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [Server-Side API of the TabStrip](/api/tabstrip)