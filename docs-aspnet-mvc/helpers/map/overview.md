---
title: Overview
page_title: Overview | Kendo UI Map HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Map widget for ASP.NET MVC."
slug: overview_maphelper_aspnetmvc
position: 1
---

# Map HtmlHelper Overview

The Map HtmlHelper extension is a server-side wrapper for the [Kendo UI Map](https://demos.telerik.com/kendo-ui/map/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Map.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add a Map.

    ###### Example

    ```tab-ASPX

        <%: Html.Kendo().Map()
            .Name("map")
            .Layers(layers =>
            {
                layers.Add()
                    .Type(MapLayerType.Tile)
                    .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                    .Subdomains("a", "b", "c");
            })
        %>
    ```
    ```tab-Razor

        @(Html.Kendo().Map()
            .Name("map")
            .Layers(layers =>
            {
                layers.Add()
                    .Type(MapLayerType.Tile)
                    .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                    .Subdomains("a", "b", "c");
            })
        )
    ```

## Event Handling

You can subscribe to all Map [events](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

    <%: Html.Kendo().Map()
        .Name("map")
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c");
        })
        .Events(e => e
            .Reset("mapReset")
        )
    %>
    <script>
        function mapReset(e) {
            //Handle the reset event.
        }
    </script>
```
```tab-Razor

    @(Html.Kendo().Map()
        .Name("map")
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c");
        })
        .Events(e => e
            .Reset("mapReset")
        )
    )
    <script>
        function mapReset(e) {
            //Handle the reset event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().Map()
        .Name("map")
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c");
        })
        .Events(e => e
          .Reset(@<text>
            function() {
                //Handle the reset event inline.
            }
            </text>)
        )
    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI Map instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Map API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI Map for ASP.NET MVC declaration.
    <script>
    $(function() {
        //Notice that the Name() of the Map is used to get its client-side instance.
        var map = $("#map").data("kendoMap");
    });
    </script>

## See Also

* [ASP.NET MVC API Reference: MapBuilder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc.UI.Fluent/MapBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Map Widget](http://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/map/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
