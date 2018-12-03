---
title: Overview
page_title: Map | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Map HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/map
slug: htmlhelpers_map_aspnetcore
position: 1
---

# Map HtmlHelper Overview

The Map HtmlHelper extension is a server-side wrapper for the [Kendo UI Map](http://demos.telerik.com/aspnet-mvc/map/index) widget.

The [Kendo UI Map widget](http://demos.telerik.com/aspnet-core/map/index) displays geospatial information organized in layers and is supported for both desktop and mobile devices.

The layers that the Map provides are:
* Tile layers
* Shape (vector) layers
* Marker layers

For more information on any new features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui/roadmap).

For more information on the HtmlHelper, refer to the article on the [Map HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/map/overview).

## Basic Usage

The following example demonstrates how to define the Map by using the Map HtmlHelper.

###### Example

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

## Configuration

The following example demonstrates how to use the basic `zoom` method of the Map HtmlHelper and retrieve the instance of the widget.

###### Example

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

## See Also

* [JavaScript API Reference of the Map](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map)
* [Map HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/map/overview)
* [Map Official Demos](http://demos.telerik.com/aspnet-core/map/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
