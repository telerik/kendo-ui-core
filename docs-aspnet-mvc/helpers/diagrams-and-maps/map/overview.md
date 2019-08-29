---
title: Overview
page_title: Map Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Get started with the server-side wrapper for the Kendo UI Map widget for ASP.NET MVC."
slug: overview_maphelper_aspnetmvc
position: 1
---

# Map HtmlHelper Overview

The Telerik UI Map HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Map widget.

The Map displays geospatial information organized in layers and is supported for both desktop and mobile devices. It also provides tile layers, shape (vector) layers, and marker layers.

* [Demo page for the Map](https://demos.telerik.com/aspnet-mvc/map/index)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Map.

    ```ASPX
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
    ```Razor
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

## Events

You can subscribe to all Map [events](/api/map). For a complete example on basic Map events, refer to the [demo on using the events of the Map](https://demos.telerik.com/aspnet-mvc/map/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
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
            // Handle the reset event.
        }
    </script>
```
```Razor
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
            // Handle the reset event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

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
                // Handle the reset event inline.
            }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI Map instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Map API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#methods) to control its behavior.

    // Place the following after the Map for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Map is used to get its client-side instance.
            var map = $("#map").data("kendoMap");
        });
    </script>

## See Also

* [Basic Usage of the Map HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/map)
* [Server-Side API](/api/map)
