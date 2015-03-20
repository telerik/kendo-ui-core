---
title: Highlight map shapes by ID
page_title: Highlight map shapes by ID
description: Highlight map shapes by ID.
---

# Highlight map shapes by ID.

The example below demonstrates how to highlight Kendo UI Map Shapes by specified id

#### Example:

```html
    <div id="map"></div>
    <script>
      function createMap() {
        $("#map").kendoMap({
          center: [30.2681, -97.7448],
          zoom: 3,
          layers: [{
            type: "shape",
            dataSource: {
              type: "geojson",
              transport: {
                read: "../content/dataviz/map/countries-users.geo.json"
              }
            },
            style: {
              fill: {
                color: "white",
                opacity: 0.7
              }
            }
          }],
          shapeCreated: onShapeCreated,
          shapeMouseEnter: toggleShape,
          shapeMouseLeave: toggleShape,
          reset: onReset
        });
      }

      var shapesById = {};

      function onReset() {
        shapesById = {};
      }

      function onShapeCreated(e) {
        var id = e.shape.dataItem.id;
        shapesById[id] = shapesById[id] || [];        
        shapesById[id].push(e.shape);
      }

      function toggleShape(e) {
        var id = e.shape.dataItem.id;
        var shapes = shapesById[id];
        if (shapes) {
          for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            if (shape.options.fill.color === "white") {
              shape.fill("blue");
            } else {
              shape.fill("white");
            }
          }
        }
      };

      $(document).ready(createMap);
    </script>
```
