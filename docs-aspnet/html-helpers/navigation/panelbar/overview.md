---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PanelBar component for {{ site.framework }}."
previous_url: /helpers/html-helpers/panelbar, /helpers/navigation/panelbar/overview
slug: htmlhelpers_panelbar_aspnetcore
position: 1
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
    <kendo-panelbar name="employees" datatextfield="FullName">
        <hierarchical-datasource>
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Employees" datatype="jsonp" />
            </transport>
            <schema type="json">
                <hierarchical-model id="EmployeeId" has-children="HasEmployees">
                </hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-panelbar>
```
```TagHelper-items
    <kendo-panelbar name="project">
        <items>
            <panelbar-item text="Storage" expanded="true">
                <items>
                    <panelbar-item text="Wall Shelving"></panelbar-item>
                    <panelbar-item text="Floor Shelving"></panelbar-item>
                    <panelbar-item text="Kids Storag"></panelbar-item>
                </items>
            </panelbar-item>
            <panelbar-item text="Lights">
                <items>
                    <panelbar-item text="Ceiling"></panelbar-item>
                    <panelbar-item text="Table"></panelbar-item>
                    <panelbar-item text="Floor"></panelbar-item>
                </items>
            </panelbar-item>
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

* [Data Binding]({% slug htmlhelpers_panelbar_databinding_aspnetcore %})
* [Expand modes]({% slug htmlhelpers_panelbar_expandmodes_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_panelbar %})

## Events

You can subscribe to all PanelBar [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar#events). For a complete example on basic PanelBar events, refer to the [demo on using the events of the PanelBar](https://demos.telerik.com/{{ site.platform }}/panelbar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().PanelBar()
            .Name("panelbar")
            .Events(e => e
                .Expand("panelbar_expand")
                .Collapse("panelbar_collapse")
            )
    )
    <script>
        function panelbar_collapse() {
            // Handle the collapse event.
        }

        function panelbar_expand() {
            // Handle the expand event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .Events(e => e
            .Expand(@<text>
                function() {
                    // Handle the expand event inline.
                }
            </text>)
            .Collapse(@<text>
                function() {
                    // Handle the collapse event inline.
                }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing PanelBar instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [client-side PanelBar API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar#methods) to control its behavior.

    // Place this after the PanelBar for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the panelbar is used to get its client-side instance.
            var panelbar = $("#panelbar").data("kendoPanelBar");
        });
    </script>

## See Also

* [Basic Usage of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
{% if site.core %}
* [Basic Usage of the PanelBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/panelbar/tag-helper)
{% endif %}
* [Using the API of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/api)
* [PanelBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [PanelBarBuilder Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)
