---
title: Sitemap Binding
page_title: Sitemap Binding
description: "Set a sitemap to create the items of the Telerik UI Menu component for {{ site.framework }}."
slug: sitemapbinding_menu_aspnetmvc
position: 7
---

# Sitemap Binding

The Menu enables you to create its items by binding to an ASP.NET sitemap, which automatically generates the hierarchical structure based on the XML sitemap configuration.

To bind the Menu to a sitemap, follow the next steps:

1. Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

    ```xml
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
    ```

1. Load the sitemap using the `SiteMapManager`.

    ```C#
    public ActionResult Index()
    {
        if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
        {
            SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
        }
        return View();
    }
    ```

1. Define the Menu and bind it to the sitemap.

    ```Razor
    @(Html.Kendo().Menu()
        .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the Menu's HTML element.
        .BindTo("sample") // Bind to the sitemap with the name "sample".
    )
    ```

## See Also

* [SiteMap Binding by the Menu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/sitemapbinding)
* [Server-Side API of the Menu](/api/menu)
