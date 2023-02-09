---
title: Link Map Markers to Locations
page_title: Link Map Markers to Locations
description: "Learn how to link markers to locations in a Kendo UI Map widget."
slug: howto_linkmarkertolocation_map
previous_url: /controls/diagrams-and-maps/map/how-to/link-marker-to-location
tags: kendo, jquery, map, link, markers, to, locations
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

How can I draw a straight line between a marker and a location on a Kendo UI for jQuery Map?

## Solution

1. Add shape and marker [`layers`](/api/javascript/dataviz/ui/map/configuration/layers) to the Map configuration.
1. Attach a handler to the [`reset`](/api/javascript/dataviz/ui/map/events/reset) event of the map.
1. Create a method that will draw a line between a marker and a specified position.
1. Inside the method, retrieve the **from** and **to** coordinates for the line by using the [`locationToView`](/api/javascript/dataviz/ui/map/methods/locationtoview) method.
1. Get a reference to the shape layer so you can draw on its surface.
1. Draw the line by using the [`kendo.drawing.Path`](/api/javascript/drawing/path) element.

The following example demonstrates how to draw a straight line between a marker and a location on a Kendo UI Map.

```dojo
    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        center: [18.89, -72.19],
        zoom: 5,
        layers: [{
          type: "shape",
          dataSource: {
            type: "geojson",
            transport: {
              read: "https://output.jsbin.com/zuguhajiye.js"
            }
          }
        }, {
          type: "marker",
          dataSource: {
            data: [{
              location: [20.69, -70.96],
              title: "Foo",
              pointTo: [18.89, -72.19]
            }],
            locationField: "location",
            titleField: "title"
          }
        }],
        reset: function(e) {
          var map = e.sender;
          var markers = map.layers[1].items;

          for (var i = 0; i < markers.length; i++) {
            linkMarker(map, markers[i]);
          }
        }
      });

      function linkMarker(map, marker) {
        var data = marker.dataItem;
        if (data.pointTo) {
          // Convert the latitude and longitude locations to coordinates on the screen.
          // See: https://docs.telerik.com/kendo-ui/api/dataviz/map#methods-eventToView
          var from = map.locationToView(marker.location());
          var to = map.locationToView(data.pointTo);

          // Draw a path on the shape layer.
          // See: https://docs.telerik.com/kendo-ui/api/dataviz/drawing/path
          //      https://docs.telerik.com/kendo-ui/getting-started/dataviz/drawing/basic-shapes
          var shapeLayer = map.layers[0];
          var line = new kendo.dataviz.drawing.Path({
            stroke: {
              color: "#aaa",
              width: 4,
              lineCap: "round"
            }
          });
          line.moveTo(from).lineTo(to);

          shapeLayer.surface.draw(line);
        }
      }
    </script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
