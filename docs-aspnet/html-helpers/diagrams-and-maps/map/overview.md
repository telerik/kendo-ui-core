---
title: Overview
page_title: Map Overview
description: "Learn the basics when working with the Telerik UI Map component for {{ site.framework }}."
previous_url: /helpers/html-helpers/map, /helpers/diagrams-and-maps/map/overview
slug: htmlhelpers_map_aspnetcore
position: 1
---

# {{ site.framework }} Map Overview

{% if site.core %}
The Telerik UI Map TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Map widget.
{% else %}
The Telerik UI Map HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Map widget.
{% endif %}

The Map displays geospatial information organized in layers and is supported for both desktop and mobile devices. It also provides tile layers, shape (vector) layers, and marker layers.

* [Demo page for the Map HtmlHelper](https://demos.telerik.com/{{ site.platform }}/map/index)
{% if site.core %}
* [Demo page for the Map TagHelper](https://demos.telerik.com/aspnet-core/map/tag-helper)
{% endif %}

## Initializing the Map

The following example demonstrates how to define the Map.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @{
        var centerCoordinates = new double[] { 35.268107, -95.744821 };
        var locationCoordinates = new double[] { 30.268107, -97.744821 };
        var subdomains = new string[] { "a", "b", "c" };
    }

    <kendo-map name="map" center="centerCoordinates" zoom="2">
        <layers>
            <layer type="MapLayerType.Tile"
                   url-template="https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
                   subdomains="subdomains"
                   attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>">
            </layer>
        </layers>
        <markers>
            <map-marker location="locationCoordinates" shape="MapMarkersShape.PinTarget">
                <tooltip content="Austin, TX"></tooltip>
            </map-marker>
        </markers>
    </kendo-map>
```
{% endif %}
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

The following example demonstrates the basic configuration for the Map component.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Map()
        .Name("map")
        .Center(30.268107, -97.744821)
        .Zoom(3)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Bing)
                .ImagerySet(MapLayersImagerySet.AerialWithLabels)
                .Key("AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK");
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
```TagHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <kendo-map name="map" center="coordinates" zoom="3">
        <layer-defaults>
            <map-marker>
                <tooltip>
                    <popup-animation>
                        <open duration="1200" effects="zoom:in" />
                    </popup-animation>
                </tooltip>
            </map-marker>
        </layer-defaults>
        <markers>
            <map-marker location="coordinates"  shape="MapMarkersShape.PinTarget">
                <tooltip content="Austin, TX"></tooltip>
            </map-marker>
        </markers>
        <layers>
            <layer type="MapLayerType.Bing"
                imagery-set="MapLayersImagerySet.AerialWithLabels"
                key="AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK">
            </layer>
        </layers>
    </kendo-map>
```
{% else %}
```HtmlHelper
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
{% endif %}

## Events

For a complete example on basic Map events, refer to the [demo on using the events of the Map](https://demos.telerik.com/{{ site.platform }}/map/events).

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @{
        var subdomains = new string[] { "a", "b", "c" };
    }

    <kendo-map name="map" on-reset="mapReset">
        <layers>
            <layer type="MapLayerType.Tile"
                   url-template="https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
                   subdomains="subdomains"
                   attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>">
            </layer>
        </layers>
    </kendo-map>
    
    <script>
        function mapReset(e) {
            // Handle the reset event.
        }
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the Map HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/map/index)
{% if site.core %}
* [Basic Usage of the Map TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/map/tag-helper)
{% endif %}
* [Server-Side API of the Map for {{ site.framework }}](/api/map)
