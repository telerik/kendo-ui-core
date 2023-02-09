---
title: Load Markers for Visible Map Areas
page_title: Load Markers for Visible Map Areas
description: "Learn how to load markers only for the visible area of a Kendo UI Map widget."
slug: howto_loadmarkers_map
previous_url: /controls/diagrams-and-maps/map/how-to/load-markers-for-area
tags: kendo, jquery, map, load, markers, for, visible, areas
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

How can I add markers for a visible area in the Kendo UI for jQuery Map?

## Solution

The following example demonstrates how to filter the data for a marker layer depending on the visible area of the Kendo UI Map.

```dojo
<div id="map"></div>
<script>
function createMap() {
  var markerData = new kendo.data.DataSource({
    data: [{"latlng":[30.2675,-97.7409], "name": "Zevo Toys"},
           {"latlng": [30.2707,-97.7490],"name": "Foo Bars"},
           {"latlng": [30.2705,-97.7409],"name": "Mainway Toys"},
           {"latlng": [30.2686,-97.7494], "name": "Acme Toys"}]
  });

  function updateMarkers(e) {
    var extent = e.sender.extent();
    /* Send the North West and South West locations of the currently visible map to the server in order to filter the markers which should be retrieved. */
    markerData.read({
      nw: extent.nw.toString(),
      se: extent.se.toString()
    });
  }

  $("#map").kendoMap({
    center: [30.268107, -97.744821],
    zoom: 15,
    layers: [{
      type: "tile",
      urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
      subdomains: ["a", "b", "c"],
      attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>." +
      "Tiles courtesy of <a href='https://www.opencyclemap.org/'>Andy Allan</a>"
    }, {
      type: "marker",
      dataSource: markerData,
      locationField: "latlng",
      titleField: "name"
    }],
    // Request the new markers when the viewport is reset...
    reset: updateMarkers,
    // ...and after a pan operation.
    panEnd: updateMarkers
  });
}

$(document).ready(createMap);
</script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
