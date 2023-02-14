---
title: Zoom the Map on Double Click
page_title: Zoom the Map on Double Click
description: "Learn how to zoom the Kendo UI Map on double click."
slug: howto_zoomondblclick_map
previous_url: /controls/diagrams-and-maps/map/how-to/zoom-on-dblclick
tags: kendo, jquery, map, zoom, on, double, click
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

How can I zoom the Kendo UI for jQuery Map upon a double click?

## Solution

In the following example, which demonstrates how to achieve the desired scenario, the event coordinates are mapped to the location by using the [`eventToLocation`](/api/javascript/dataviz/ui/map/methods/eventtolocation) method.

```dojo
<div id="map"></div>
<script>
  function createMap() {
    $("#map").kendoMap({
      center: [51.505, -0.09],
      zoom: 3,
      layers: [{
          type: "tile",
          urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          subdomains: ["a", "b", "c"],
          attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
      }]
    });

    $("#map").bind("dblclick", function(e) {
      var map = $(this).data("kendoMap");
      var center = map.eventToLocation(e);
      map.center(center);
      map.zoom(map.zoom() + 1);
    });
  }

  $(document).ready(createMap);
</script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
