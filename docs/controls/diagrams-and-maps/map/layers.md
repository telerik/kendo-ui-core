---
title: Layers
page_title: Map Layers
description: How to create and configure tile layers for the Kendo UI Map widgets.
position: 2
---

# Map layers

The information shown on the map is organized into layers.
They are stacked from bottom to top in the order of definition.

Layers are oblivious of each other.
They respond to [/kendo-ui/api/dataviz/map#events](map events) to keep their content in sync.

## Tile layers

This layer is suitable for displaying raster maps from popular online providers such as
[OpenStreetMap](http://www.openstreetmap.org/),
[OpenWeatherMap](http://openweathermap.org/),
[MapQuestOpen](http://open.mapquest.com/),
[ArcGIS](https://developers.arcgis.com/en/),
[Here (Nokia) Maps](https://developer.here.com/rest-apis/documentation/enterprise-map-tile) and others.

Dedicated support is available for [Microsoft Bing](http://msdn.microsoft.com/en-us/library/ff701713.aspx).
Note that it requires you to [obtain an API key](http://msdn.microsoft.com/en-us/library/ff428642.aspx).

### Example - Displaying a MapQuest Open tile layer

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "http://otile#= subdomain #.mqcdn.com/tiles/1.0.0/osm/#= zoom #/#= x #/#= y #.png",
            subdomains: ["1", "2", "3", "4"],
            attribution: "Tiles courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a>"
        }]
    });
    </script>

### Zoom levels

Raster maps are divided into images (tiles) for serving over the web.
Tiles are typically 256px squares.

The top level (zoom level 0) displays the whole world as a single tile.
Each progressive zoom level doubles the size of the map:

- Zoom level 0: 1x1 tiles (256px)
- Zoom level 1: 2x2 tiles (512px)
- Zoom level 2: 4x4 tiles (1024px)
- ...
