---
title: Disable the Mouse-wheel Zoom in the Map
page_title: Disable the Mousewheel Zoom in the Map
description: "Learn how to disable the mouse-wheel zoom in a Kendo UI Map widget."
slug: howto_disablemousezoom_map
previous_url: /controls/diagrams-and-maps/map/how-to/disable-mousewheel-zoom
tags: kendo, jquery, map, disable, mousewheel, zoom
component: map
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Map for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I disable the mouse-wheel zoom in the Kendo UI for jQuery Map?

## Solution

The following example demonstrates how to disable the mouse-wheel zoom in the Map widget.

```dojo
    <div id="map"></div>
    <div style="height: 1000px; color: #fff; background: purple; font-size: 24px; text-align: center;">Very high div</div>
    <script>
      function createMap() {
        $("#map").kendoMap({
          center: [30.268107, -97.744821],
          zoom: 3,
          layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
          }],
          markers: [{
            location: [30.268107, -97.744821],
            shape: "pinTarget",
            tooltip: {
              content: "Austin, TX"
            }
          }]
        });          

        $("#map").unbind("mousewheel");
		$("#map").unbind("DOMMouseScroll");
      }

      $(document).ready(createMap);
    </script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
