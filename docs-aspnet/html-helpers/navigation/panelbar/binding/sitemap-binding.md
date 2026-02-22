---
title: Sitemap Binding
page_title: Sitemap Binding
description: "Set a sitemap to create the items of the Telerik UI PanelBar component for {{ site.framework }}."
components: ["panelbar"]
slug: sitemapbinding_panelbarhelper_aspnetmvc
position: 5
---

# Sitemap Binding

The PanelBar enables you to create its items by binding to an ASP.NET sitemap, which automatically generates the hierarchical structure based on the XML sitemap configuration.

To bind the PanelBar to a sitemap, follow the next steps:

1. Create a simple sitemap with a `sample.sitemap` file name at the root of the project.

    ```xml
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

1. Define the PanelBar and bind it to the sitemap.

    ```Razor
    @(Html.Kendo().PanelBar()
        .Name("panelbar") The name of the PanelBar is mandatory. It specifies the "id" attribute of the PanelBar HTML element.
        .BindTo("sample") // Bind to sitemap with name "sample".
    )
    ```

## See Also

* [Basic Usage of the PanelBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
* [Server-Side API of the PanelBar](/api/panelbar)
