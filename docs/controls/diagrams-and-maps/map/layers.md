---
title: Layers
page_title: jQuery Map Documentation | Layers
description: "Get started with the jQuery Map by Kendo UI and configure its tile layers."
slug: maplayers_mapwidget
position: 2
---

# Layers

The information that the Map renders is organized into layers.

These layers are stacked from bottom to top in the order of definition and are oblivious of each other. To keep their content in sync, use the [events of the Map](/api/javascript/dataviz/ui/map#events).

## Getting Started

The tile layers in the Map are suitable for:

* Displaying raster maps from popular online providers such as [OpenStreetMap](http://www.openstreetmap.org/), [OpenWeatherMap](http://openweathermap.org/), [ArcGIS](https://developers.arcgis.com/en/), and so on.
* Any other Map tile service that supports the [WGS 84 projection standards](https://en.wikipedia.org/wiki/World_Geodetic_System). [Microsoft Bing](https://msdn.microsoft.com/en-us/library/ff701713.aspx) provides dedicated support for Map layers. However, it requires you to [obtain an API key](https://msdn.microsoft.com/en-us/library/ff428642.aspx).

The following example demonstrates how to display an OpenStreetMap tile layer.

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
          type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
        }]
    });
    </script>

## Zoom Levels

Raster maps are divided into images (tiles) for serving over the web. Tiles are typically 256px squares. The top level (zoom level 0) displays the whole world as a single tile. Each progressive zoom level doubles the size of the Map in the following way:

- Zoom level 0&mdash;1x1 tiles (256px).
- Zoom level 1&mdash;2x2 tiles (512px).
- Zoom level 2&mdash;4x4 tiles (1024px) and so on.

## See Also

* [Bing Tile Layer in the Map (Demo)](https://demos.telerik.com/kendo-ui/map/bing)
* [Bubble Tile Layer in the Map (Demo)](https://demos.telerik.com/kendo-ui/map/bubble-layer)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
