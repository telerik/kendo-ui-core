---
title: Update map shapes by specified ID
page_title: Update map shapes by specified ID
description: Update map shapes by specified ID.
---

# Update map shapes by ID.

The example below demonstrates how to update Kendo UI Map Shapes by specified id

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

      setInterval(function() {
        var shapes = shapesById.USA;
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
      }, 500);
      
      $(document).ready(createMap);
    </script>
```
