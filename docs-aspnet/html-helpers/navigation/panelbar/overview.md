---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PanelBar HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/panelbar, /helpers/navigation/panelbar/overview
slug: htmlhelpers_panelbar_aspnetcore
position: 1
---

# PanelBar HtmlHelper Overview

The Telerik UI PanelBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PanelBar widget.

The PanelBar displays hierarchical data as a multi-level, expandable widget.

* [Demo page for the PanelBar](https://demos.telerik.com/{{ site.platform }}/panelbar)

## Basic Configuration

The following example demonstrates the basic configuration of the PanelBar HtmlHelper.

```Razor
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

## Functionality and Features

* [Data Binding]({% slug htmlhelpers_panelbar_databinding_aspnetcore %})
* [Expand modes]({% slug htmlhelpers_panelbar_expandmodes_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_panelbar %})

## Events

You can subscribe to all PanelBar [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar#events). For a complete example on basic PanelBar events, refer to the [demo on using the events of the PanelBar](https://demos.telerik.com/{{ site.platform }}/panelbar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```Razor
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
* [Using the API of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/api)
* [PanelBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [PanelBarBuilder Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)
