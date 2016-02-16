---
title: Map Layers
page_title: Map Layers | Kendo UI Map
description: "Learn how to create and configure tile layers for the Kendo UI Map widget."
slug: maplayers_mapwidget
position: 2
---

# Map Layers

The information presented by the [Kendo UI Map widget](http://demos.telerik.com/kendo-ui/map/index) is organized into layers. They are stacked from bottom to top in the order of definition and are oblivious of each other. The Map layers respond to [the Map events](/kendo-ui/api/dataviz/map#events) to keep their content in sync.

## Tile Layers

### Basic Usage

Tile layers are suitable for displaying raster maps from popular online providers such as:
* [OpenStreetMap](http://www.openstreetmap.org/)
* [OpenWeatherMap](http://openweathermap.org/)
* [MapQuestOpen](http://open.mapquest.com/)
* [ArcGIS](https://developers.arcgis.com/en/)
* [Here (Nokia) Maps](https://developer.here.com/rest-apis/documentation/enterprise-map-tile) and many more

Dedicated support is available for [Microsoft Bing](http://msdn.microsoft.com/en-us/library/ff701713.aspx). Note that it requires you to [obtain an API key](http://msdn.microsoft.com/en-us/library/ff428642.aspx).

The example below demonstrates how to display a MapQuest open tile layer.

###### Example

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
<!--_-->

### Zoom Levels

Raster maps are divided into images (tiles) for serving over the web. Tiles are typically 256px squares. The top level (zoom level 0) displays the whole world as a single tile. Each progressive zoom level doubles the size of the map in the following way:

- Zoom level 0: 1x1 tiles (256px)
- Zoom level 1: 2x2 tiles (512px)
- Zoom level 2: 4x4 tiles (1024px)
- ...

## See Also

Other articles on Kendo UI Map:

* [Overview of the Map Widget]({% slug overview_kendoui_mapwidget %})
* [Map Authoring]({% slug mapauthoring_mapwidget %})
* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
