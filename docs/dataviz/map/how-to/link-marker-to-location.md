---
title: Link marker to location
page_title: Link marker to location
description: Link marker to location.
---

# Link a Kendo UI Map Marker to a location on the map.

The example below demonstrates how to draw a straight line between a marker and a location on a Kendo UI Map.

#### Example:

```html
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
              read: "../content/dataviz/map/countries-users.geo.json"
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
          // Convert lat/long locations to coordinates on the screen
          // See: http://docs.telerik.com/kendo-ui/api/dataviz/map#methods-eventToView
          var from = map.locationToView(marker.location());
          var to = map.locationToView(data.pointTo);

          // Draw a path on the shape layer
          // See: http://docs.telerik.com/kendo-ui/api/dataviz/drawing/path
          //      http://docs.telerik.com/kendo-ui/getting-started/dataviz/drawing/basic-shapes
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
