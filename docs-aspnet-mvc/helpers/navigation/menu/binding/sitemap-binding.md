---
title: Sitemap Binding
page_title: Sitemap Binding | Telerik UI Menu HtmlHelper for ASP.NET MVC
description: "Set a sitemap to create the items of the Telerik UI Menu HtmlHelper for ASP.NET MVC."
slug: sitemapbinding_menu_aspnetmvc
position: 3
---

# Sitemap Binding

The Menu enables you to create its items by setting a sitemap.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a simple sitemap with the `sample.sitemap` file name at the root of the project.

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

1. Load the sitemap using `SiteMapManager`.

      public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }

1. Add a Menu.

    ```ASPX
        <%: Html.Kendo().Menu()
            .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the Menu.
            .BindTo("sample") // Bind to the sitemap with the name "sample".
        %>
    ```
    ```Razor
        @(Html.Kendo().Menu()
            .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the Menu.
            .BindTo("sample") // Bind to the sitemap with the name "sample".
        )
    ```

## See Also

* [Sitemap Binding by the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu/sitemapbinding)
* [MenuItemBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](/api/menu)
