---
title: Customize the Markers on a Map
page_title: Customize the Markers on a Map
description: "Learn how to custyomize markers on a Kendo UI Map widget."
slug: howto_customizemarkersonmap_map
previous_url: /controls/diagrams-and-maps/map/how-to/custom-markers
tags: kendo, jquery, map, customize, markers
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

How can I customize the markers of the Kendo UI for jQuery Map?

## Solution

The following example demonstrates how to use custom markers on a Kendo UI Map.

```dojo
    <div id="map"></div>
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
            shape: "customMarker",
            tooltip: {
              content: "Austin, TX"
            }
          }]
        });          

        $("#map").unbind("mousewheel");
      }

      $(document).ready(createMap);
    </script>
    <style>
      .k-map .k-i-marker-custom-marker {
        background-image: url('https://demos.telerik.com/kendo-ui/content/dataviz/chart/images/sunny.png');
        background-size: 30px;
        width: 30px;
        height: 30px;
      }
    </style>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
