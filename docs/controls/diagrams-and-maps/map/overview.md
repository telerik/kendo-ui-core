---
title: Overview
page_title: Overview | Kendo UI Map
description: "Learn how to initialize the Kendo UI Map widget, and create and bind layers to it."
slug: overview_kendoui_mapwidget
position: 1
---

# Map Overview

The [Kendo UI Map widget](http://demos.telerik.com/kendo-ui/map/index) displays geospatial information organized in layers and is supported for both desktop and mobile devices.
The layers that the Map features are:

* Tile layers
* Shape (vector) layers
* Marker layers

For more detailed information on any new features, refer to [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui/roadmap).

## Getting Started

### Create the Map

To create a Kendo UI Map, add an empty `div` in the HTML, provide it with an ID, and, optionally, set its desired width and height inline or via CSS, as demonstrated in the example below.

###### Example

    <div id="map" style="width: 400px; height: 600px"></div>

### Initialize the Map

The map is rendered by selecting the `div` with a jQuery selector and by calling the `kendoMap()` function, as demonstrated below.

###### Example

    $("#map").kendoMap();

## Configuration

### Add Layers

The example below demonstrates how to add a basic tile layer to the Map that is bound to OpenStreetMap.

###### Example

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

**Figure 1. A basic map**

![Basic map](/controls/diagrams-and-maps/map/images/map-basic.png)

## See Also

Other articles and how-to examples on Kendo UI Map:

* [Map Layers]({% slug maplayers_mapwidget %})
* [Map Authoring]({% slug mapauthoring_mapwidget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Map Widget](/aspnet-mvc/helpers/map/overview)
* [How to Add Shape Titles]({% slug howto_addhspaetitles_map %})
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Drag and Drop Markers]({% slug howto_draganddropmarkers_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})
* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
