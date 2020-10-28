---
title: Overview
page_title: jQuery Map Documentation | Map Overview
description: "Get started with the jQuery Map by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_mapwidget
position: 1
---

# Map Overview

The Map displays geospatial information organized in layers and is supported for both desktop and mobile devices.

It also provides tile layers, shape (vector) layers, and marker layers.

* [Demo page for the Map](https://demos.telerik.com/kendo-ui/map/index)

## Basic Configuration

To create a Map, add an empty `div` element to the HTML, provide it with an ID, and, optionally, set its desired width and height inline or by using CSS.

    <div id="map" style="width: 400px; height: 600px"></div>

To render the Map, select the `div` with a jQuery selector and call the `kendoMap()` function.

    $("#map").kendoMap();

The following example demonstrates how to add a basic tile layer to the Map that is bound to OpenStreetMap.

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

![A Map with basic configuration](/controls/diagrams-and-maps/map/images/map-basic.png)

## Functionality and Features

* [Layers]({% slug maplayers_mapwidget %})
* [Creating maps]({% slug mapauthoring_mapwidget %})

## Events

For a complete example, refer to the [demo on using the events of the Map](https://demos.telerik.com/kendo-ui/map/events).

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
