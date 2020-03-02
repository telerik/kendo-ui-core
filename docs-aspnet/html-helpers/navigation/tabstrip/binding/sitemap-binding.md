---
title: Sitemap Binding
page_title: Sitemap Binding
description: "Set a sitemap to create the items of the Telerik UI TabStrip HtmlHelper for ASP.NET MVC."
previous_url: /helpers/navigation/tabstrip/binding/sitemap-binding
slug: sitemapbinding_tabstrip_aspnetmvc
position: 3
---

# Sitemap Binding

The TabStrip enables you to create its items by setting a sitemap.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

        <?xml version="1.0" encoding="utf-8" ?>
        <siteMap>
            <siteMapNode title="Home" controller="Home" action="Overview">
            <siteMapNode controller="grid" action="index" title="Grid" />
            <siteMapNode controller="tabstrip" action="index" title="TabStrip" />
            </siteMapNode>
        </siteMap>

1. Load the sitemap using `SiteMapManager`.

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<xmlsitemap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }

1. Add a TabStrip.

    ```Razor
        @(Html.Kendo().TabStrip()
            .Name("tabstrip") // The name of the tabstrip is mandatory. It specifies the "id" attribute of the TabStrip.
            .BindTo("sample") // Bind to the sitemap with the name "sample".
        )
    ```

## See Also

* [Basic Usage of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TabStripBuilder)
* [TabStrip Server-Side API](/api/tabstrip)
