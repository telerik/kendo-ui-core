---
title: Overview
page_title: Map Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Map HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/map
slug: htmlhelpers_map_aspnetcore
position: 1
---

# Map HtmlHelper Overview

The [Kendo UI Map widget](http://demos.telerik.com/aspnet-core/map/index) displays geospatial information organized in layers and is supported for both desktop and mobile devices.

The layers that the Map provides are:
* Tile layers
* Shape (vector) layers
* Marker layers

The Map HtmlHelper extension is a server-side wrapper for the [Kendo UI Map](http://demos.telerik.com/aspnet-mvc/map/index) widget. For more information on any new features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui/roadmap). For more information on the Map HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](http://docs.telerik.com/aspnet-mvc/helpers/map/overview).

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

For a complete example on basic Map events, refer to the [demo on using the events of the Map](https://demos.telerik.com/aspnet-core/map/events).

## See Also

* [Basic Usage of the Map HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/map/index)
* [JavaScript API Reference of the Map](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map)
