---
title: Link Marker to Location
page_title: Link Marker to Location | Kendo UI Map
description: "Learn how to link markers to locations in a Kendo UI Map widget."
slug: howto_linkmarkertolocation_map
---

# Link Marker to Location

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
              read: "http://output.jsbin.com/zuguhajiye.js"
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
