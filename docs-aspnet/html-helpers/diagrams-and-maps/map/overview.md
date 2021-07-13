---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Map HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/map, /helpers/diagrams-and-maps/map/overview
slug: htmlhelpers_map_aspnetcore
position: 1
---

# Map HtmlHelper Overview

The Telerik UI Map HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Map widget.

The Map displays geospatial information organized in layers and is supported for both desktop and mobile devices. It also provides tile layers, shape (vector) layers, and marker layers.

* [Demo page for the Map](https://demos.telerik.com/{{ site.platform }}/map/index)

## Initializing the Map

The following example demonstrates how to define the Map by using the Map HtmlHelper.

```Razor
    @(Html.Kendo().Map()
        .Name("map")
        .Center(35.268107, -95.744821)
        .Zoom(2)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c")
                .Attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>");
        })
        .Markers(markers =>
        {
            markers.Add()
                .Location(30.268107, -97.744821)
                .Shape(MapMarkersShape.PinTarget)
                .Tooltip(tooltip => tooltip.Content("Austin, TX"));
        })
    )
```
```Controller
    public partial class MapController : BaseController
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
```

## Basic Configuration

The following example demonstrates the basic configuration for the Map HtmlHelper.

```
    <input id="zoomLevel"/>
    <button id="zoom" class="k-button">zoom()</button>

    @(Html.Kendo().Map()
        .Name("map")
        .Center(30.268107, -97.744821)
        .Zoom(3)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c")
                .Attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                            "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>");
        })
    )

    <script>
        $("#zoom").click(function (e) {
                var map = $("#map").data("kendoMap")
                map.zoom(
                    parseInt($("#zoomLevel").val(), 10)
                );
            });
    </script>
```

## Events

For a complete example on basic Map events, refer to the [demo on using the events of the Map](https://demos.telerik.com/{{ site.platform }}/map/events).

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

## See Also

* [Basic Usage of the Map HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/map/index)
* [Server-Side API](/api/map)
