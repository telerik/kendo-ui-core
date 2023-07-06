---
title: Sitemap Binding
page_title: Sitemap Binding
description: "Set a sitemap to create the items of the Telerik UI PanelBar component for {{ site.framework }}."
slug: sitemapbinding_panelbarhelper_aspnetmvc
position: 3
---

# Sitemap Binding

The PanelBar enables you to create its items by setting a sitemap.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for {{ site.framework }}]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a simple sitemap with a `sample.sitemap` file name at the root of the project.

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

1. Load the sitemap using the `SiteMapManager`.

        public ActionResult Index()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap => sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }

1. Add a PanelBar.

    ```HtmlHelper
        @(Html.Kendo().PanelBar()
            .Name("panelbar") // The name of the panelbar is mandatory. It specifies the "id" attribute of the widget.
            .BindTo("sample") //bind to sitemap with name "sample"
        )
    ```

## See Also

* [Basic Usage of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
* [PanelBarBuilder Server-Side API](/api/kendo.mvc.ui.fluent/panelbarbuilder)
* [PanelBar Server-Side API](/api/panelbar)
