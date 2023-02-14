---
title: Highlight Map Shapes by ID
page_title: Highlight Map Shapes by ID
description: "Learn how to highlight Kendo UI Map shapes by a specified ID."
slug: howto_highlightmapshapesbyid_map
previous_url: /controls/diagrams-and-maps/map/how-to/highlight-map-shapes-by-id
tags: kendo, jquery, map, highlight, shapes, by, id
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

How can I highlight the shapes of the Kendo UI for jQuery Map by their specified IDs?

## Solution

The following example demonstrates how to highlight the Map shapes by a specified ID.

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
                read: "https://output.jsbin.com/zuguhajiye.js"
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

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
