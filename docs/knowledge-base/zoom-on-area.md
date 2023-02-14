---
title: Zoom on a Map Area
page_title: Zoom on a Map Area
description: "Learn how to center the Kendo UI Map view on a specified area."
slug: howto_zoomonarea_map
previous_url: /controls/diagrams-and-maps/map/how-to/zoom-on-area
tags: kendo, jquery, map, zoom, on, area
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

How can I center the map view on a specified area in the Kendo UI for jQuery Map?

## Solution

To define the area, use a set of markers. You can use any list of locations. Then, you need to build an [`extent`](/api/javascript/dataviz/map/extent) that encompasses all locations and [set it on the map as a visible area](/api/javascript/dataviz/ui/map/methods/extent).

```dojo
<button id="center">Center on markers</button>
<div id="map"></div>
<script>
    var markers = [
    {"latlng":[30.2675,-97.7409], "name": "Zevo Toys"},
    {"latlng": [30.2707,-97.7490],"name": "Foo Bars"},
    {"latlng": [30.2705,-97.7409],"name": "Mainway Toys"},
    {"latlng": [30.2686,-97.7494], "name": "Acme Toys"}];

    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "© <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>."
        }, {
            type: "marker",
            dataSource: {
                data: markers
            },
            locationField: "latlng",
            titleField: "name"
        }]
    });

    function centerMap() {
        var map = $("#map").getKendoMap();
        var layer = map.layers[1];
        var markers = layer.items;
        var extent;

        for (var i = 0; i < markers.length; i++) {
            var loc = markers[i].location();

            if (!extent) {
                extent = new kendo.dataviz.map.Extent(loc, loc);
            } else {
                extent.include(loc);
            }
        }

        map.extent(extent);
    }

    $("#center").click(centerMap);
</script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
