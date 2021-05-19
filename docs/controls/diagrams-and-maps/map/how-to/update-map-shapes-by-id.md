---
title: Update Map Shapes by ID
page_title: Update Map Shapes by ID | Kendo UI Map
description: "Learn how to update Kendo UI Map shapes by a specified ID."
slug: howto_updatemapshapesbyid_map
---

# Update Map Shapes by ID

The following example demonstrates how to update the Map shapes by a specified ID.

```dojo
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
                read: "http://output.jsbin.com/zuguhajiye.js"
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

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
