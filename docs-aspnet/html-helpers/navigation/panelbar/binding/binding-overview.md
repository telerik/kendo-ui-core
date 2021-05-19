---
title:  Overview
page_title: Data Binding
description: "Learn the basics approaches for binding the Telerik UI PanelBar HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/panelbar/binding/overview
slug: htmlhelpers_panelbar_databinding_aspnetcore
position: 1
---

# Data Binding

The PanelBar HTML helper provides support for declaratively defining its items and for local (on the server) and remote (using a `DataSource` configuration object) binding.

## Declaring PanelBar Items

The PanelBar allows you to declare all its items within the HTML helper declaration.

The following example demonstrates how to configure a PanelBar with three levels of hierarchy.

    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .Items(panelbar =>
        {
            panelbar.Add().Text("My Web Site")
                .Items(root =>
                {
                    root.Add().Text("images")
                        .Items(images =>
                        {
                            images.Add().Text("logo.png");
                            images.Add().Text("body-back.png");
                        });
                    root.Add().Text("about.html");
                    root.Add().Text("contacts.html");
                });
        })
    )

## PanelBar Binding

The PanelBar supports the following data-binding approaches:

* [Items binding]({% slug itemsbinding_panelbarhelper_aspnetmvc %})
{% if site.mvc %}* [Sitemap binding]({% slug sitemapbinding_panelbarhelper_aspnetmvc %}){% endif %}
* [Server binding]({% slug htmlhelpers_panelbar_serverbinding_aspnetcore %})
* [Ajax binding]({% slug htmlhelpers_panelbar_ajaxbinding_aspnetcore %})

## See Also

* [Local Data Binding by the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/local-data-binding)
* [Ajax Data Binding by the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/remote-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [Server-Side API](/api/panelbar)
