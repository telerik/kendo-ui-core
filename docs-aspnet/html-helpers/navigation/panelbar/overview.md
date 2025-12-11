---
title: Overview
page_title: Overview
description: "Discover the Telerik UI PanelBar component for {{ site.framework }} and its built-in features like data binding, accssibility, and support for various expand modes."
components: ["panelbar"]
previous_url: /helpers/html-helpers/panelbar, /helpers/navigation/panelbar/overview
slug: htmlhelpers_panelbar_aspnetcore
position: 0
---

# {{ site.framework }} PanelBar Overview

{% if site.core %}
The Telerik UI PanelBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PanelBar widget.
{% else %}
The Telerik UI PanelBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PanelBar widget.
{% endif %}

The PanelBar displays hierarchical data as a multi-level, expandable widget.

* [Demo page for the PanelBar TagHelper](https://demos.telerik.com/{{ site.platform }}/panelbar)
{% if site.core %}
* [Demo page for the PanelBar HtmlHelper](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the PanelBar.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().PanelBar()
      .Name("panelbar")
      .ExpandMode(PanelBarExpandMode.Single)
      .Items(panelbar =>
      {
          panelbar.Add().Text("Projects")
              .Items(projects =>
              {
                  projects.Add().Text("New Business Plan");

                  projects.Add().Text("Sales Forecasts")
                      .Items(forecasts =>
                      {
                          forecasts.Add().Text("Q1 Forecast");
                          forecasts.Add().Text("Q2 Forecast");
                          forecasts.Add().Text("Q3 Forecast");
                          forecasts.Add().Text("Q4 Forecast");
                      });

                  projects.Add().Text("Sales Reports");
              });

          panelbar.Add().Text("Programs")
              .Items(programs =>
              {
                  programs.Add().Text("Monday");
                  programs.Add().Text("Tuesday");
                  programs.Add().Text("Wednesday");
                  programs.Add().Text("Thursday");
                  programs.Add().Text("Friday");
              });

          panelbar.Add().Text("Communication").Enabled(false);
      })
    )
```
```TagHelper
    <kendo-panelbar name="panelbar" expand-mode="single">
        <items>
            <panelbar-item text="Projects">
                <items>
                    <panelbar-item text="New Business Plan"></panelbar-item>
                    <panelbar-item text="Sales Forecasts">
                        <items>
                            <panelbar-item text="Q1 Forecast"></panelbar-item>
                            <panelbar-item text="Q2 Forecast"></panelbar-item>
                            <panelbar-item text="Q3 Forecast"></panelbar-item>
                            <panelbar-item text="Q4 Forecast"></panelbar-item>
                        </items>
                    </panelbar-item>
                    <panelbar-item text="Sales Reports"></panelbar-item>
                </items>
            </panelbar-item>
            <panelbar-item text="Programs">
                <items>
                    <panelbar-item text="Monday"></panelbar-item>
                    <panelbar-item text="Tuesday"></panelbar-item>
                    <panelbar-item text="Wednesday"></panelbar-item>
                    <panelbar-item text="Thursday"></panelbar-item>
                    <panelbar-item text="Friday"></panelbar-item>
                </items>
            </panelbar-item>
            <panelbar-item text="Communication" enabled="false"></panelbar-item>
        </items>
    </kendo-panelbar>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .ExpandMode(PanelBarExpandMode.Single)
        .Items(items =>
        {
            items.Add().Text("Root1")
                .Items(subitems =>
                {
                    subitems.Add().Text("Level2 1");
                    subitems.Add().Text("Level2 2");
                });
            items.Add().Text("Root2")
                .Items(subitems =>
                {
                    subitems.Add().Text("Level2 1");
                    subitems.Add().Text("Level2 2");
                });
        })
    )
```
{% endif %}

## Functionality and Features

* [Data Binding]({% slug htmlhelpers_panelbar_databinding_aspnetcore %})—The PanelBar supports binding to data. 
* [Expand modes]({% slug htmlhelpers_panelbar_expandmodes_aspnetcore %})—The component offers `Single` and `Multiple` expand modes. 
* [Events]({% slug events_panelbar_aspnetcore %})—To control the behavior of the component upon user interaction, you can use the events that the component emits.
* [Accessibility]({% slug htmlhelpers_panelbar_accessibility %})—The PanelBar is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.1, and keyboard support.


## Next Steps

* [Getting Started with the PanelBar]({% slug  aspnetcore_panelbar_getting_started %})
* [Basic Usage of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
{% if site.core %}
* [Basic Usage of the PanelBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)
* [PanelBar in Razor Pages]({% slug htmlhelpers_panelbar_razorpage_aspnetcore%})
{% endif %}

## See Also

* [Using the API of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/api)
* [PanelBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [PanelBarBuilder Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/panelbarbuilder)
* [PanelBar Server-Side API](/api/panelbar)
* [Knowledge Base Section](/knowledge-base)

