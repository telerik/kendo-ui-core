---
title: Overview
page_title: PanelBar Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI PanelBar HtmlHelper for ASP.NET MVC."
slug: overview_panelbarhelper_aspnetmvc
position: 1
---

# PanelBar HtmlHelper Overview

The Telerik UI PanelBar HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI PanelBar widget.

The PanelBar displays hierarchical data as a multi-level, expandable widget.

* [Demo page for the PanelBar](https://demos.telerik.com/aspnet-mvc/panelbar)

## Basic Configuration

[This runnable example](https://demos.telerik.com/aspnet-mvc/panelbar) demonstrates the basic configuration of the PanelBar HtmlHelper for ASP.NET MVC.

## Functionality and Features

* [Binding]({% slug panelbar_databinding_aspnetmvc %})
* [Expand modes]({% slug expandmodes_panelbarhelper_aspnetmvc %})
* [Security trimming]({% slug securitytrimming_panelbarhelper_aspnetmvc %})

## Events

You can subscribe to all PanelBar [events](/api/panelbar). For a complete example on basic PanelBar events, refer to the [demo on using the events of the PanelBar](https://demos.telerik.com/aspnet-mvc/panelbar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().PanelBar()
            .Name("panelbar")
            .Events(e => e
                .Expand("panelbar_expand")
                .Collapse("panelbar_collapse")
            )
    %>
    <script>
        function panelbar_collapse() {
            // Handle the collapse event.
        }

        function panelbar_expand() {
            // Handle the expand event.
        }
    </script>
```
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

To reference an existing Kendo UI PanelBar instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [client-side PanelBar API](http://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar#methods) to control its behavior.

    // Place this after the PanelBar for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the panelbar is used to get its client-side instance.
            var panelbar = $("#panelbar").data("kendoPanelBar");
        });
    </script>

## See Also

* [Basic Usage of the PanelBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/panelbar)
* [Using the API of the PanelBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/panelbar/api)
* [PanelBarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)
