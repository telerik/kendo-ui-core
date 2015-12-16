---
title: Overview
page_title: Overview of the Map widget in Kendo UI DataViz
description: How to create a map, create and bind layers, explore the quick overview of Map widget major features.
position: 1
---

# Map Overview

## Getting started

The Map widget displays geospatial information organized in layers.
The following layer types are supported:

* Tile layers
* Shape (vector) layers
* Marker layers

Support is provided for both desktop and mobile devices.

Please visit the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-dataviz/roadmap)
for additional information about new features.

### Creating a Map

To create a map, add an empty div in the HTML and give it an ID.

#### Example

    <div id="map"></div>

Optionally, set the width and height of the desired map inline or with CSS.

#### Example

    <div id="map" style="width: 400px; height: 600px"></div>

The map is rendered by selecting the div with a jQuery selector and calling the kendoMap() function.

#### Example

    $("#map").kendoMap();

Lets add a basic tile layer bound to OpenStreetMap:

#### Example

    <div id="map" style="width: 600px; height: 400px;"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>."
        }]
    });
    </script>

![Basic map](/dataviz/map/images/map-basic.png)
