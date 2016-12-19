---
title: Map Layers
page_title: Map Layers | Kendo UI Map
description: "Learn how to create and configure tile layers for the Kendo UI Map widget."
slug: maplayers_mapwidget
position: 2
---

# Map Layers

The information rendered by the [Kendo UI Map widget](http://demos.telerik.com/kendo-ui/map/index) is organized into layers.

They are stacked from bottom to top in the order of definition and are oblivious of each other. To keep their content in sync, the Map layers respond to [the Map events](/api/javascript/dataviz/ui/map#events).

## Tile Layers

### Basic Usage

Tile layers are suitable for:

* Displaying raster maps from popular online providers such as [OpenStreetMap](http://www.openstreetmap.org/), [OpenWeatherMap](http://openweathermap.org/), [ArcGIS](https://developers.arcgis.com/en/), [Here (Nokia) Maps](https://developer.here.com/rest-apis/documentation/enterprise-map-tile), and many more.
* Ay other Map Tile service supporting the [WGS 84 projection standards](https://en.wikipedia.org/wiki/World_Geodetic_System).

Dedicated support is available for [Microsoft Bing](http://msdn.microsoft.com/en-us/library/ff701713.aspx). Note that it requires you to [obtain an API key](http://msdn.microsoft.com/en-us/library/ff428642.aspx).

The example below demonstrates how to display an OpenStreetMap tile layer.

###### Example

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

### Zoom Levels

Raster maps are divided into images (tiles) for serving over the web. Tiles are typically 256px squares. The top level (zoom level 0) displays the whole world as a single tile. Each progressive zoom level doubles the size of the map in the following way:

- Zoom level 0: 1x1 tiles (256px).
- Zoom level 1: 2x2 tiles (512px).
- Zoom level 2: 4x4 tiles (1024px) and so on.

## See Also

Other articles on the Kendo UI Map:

* [Overview of the Map Widget]({% slug overview_kendoui_mapwidget %})
* [Map Authoring]({% slug mapauthoring_mapwidget %})
* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
