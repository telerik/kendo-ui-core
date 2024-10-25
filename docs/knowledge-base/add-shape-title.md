---
title: Add Titles to Map Shapes
page_title: Show Titles for the Shapes - jQuery Map
description: "Learn how to add titles for shapes loaded from GeoJSON in a Kendo UI for jQuery Map component."
slug: howto_addhspaetitles_map
previous_url: /controls/diagrams-and-maps/map/how-to/add-shape-title
tags: kendo, jquery, map, add, titles, to, shapes
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I add some title text for the shapes in the Kendo UI for jQuery Map?

## Solution

The following example demonstrates how to add title text for Map shapes that are loaded from GeoJSON. In particular, the example adds a [`Text`](/api/javascript/drawing/text) element positioned over the shape center. Shape layers are rendered by using the [Drawing API]({% slug overview_kendoui_drawingapi %}). To render additional elements, use the [`shapeCreated`](/api/javascript/dataviz/ui/map/events/shapecreated) event.

```dojo
  <div id="map"></div>
  <script>
    $("#map").kendoMap({
      center: [47.4599, -100.5908],
      zoom: 6,
      layers: [{
        type: "tile",
        urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
        subdomains: ["a", "b", "c"],
        attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>."
      }, {
        type: "shape",
        style: {
          fill: {
            opacity: 0.9
          }
        },
        dataSource: {
          type: "geojson",
          data: [{
            "type": "Feature",
            "id": "USA-ND",
            "properties": {
              "name": "North Dakota",
              "abbrev": "ND"
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-97.228743, 49.000239], [-97.097296, 48.682577],
                  [-97.16302, 48.545653], [-97.130158, 48.140359],
                  [-97.053481, 47.948667], [-96.856311, 47.609096],
                  [-96.823449, 46.968294], [-96.785111, 46.924479],
                  [-96.801542, 46.656109], [-96.719387, 46.437031],
                  [-96.598895, 46.332969], [-96.560556, 45.933153],
                  [-104.047534, 45.944106], [-104.042057, 47.861036],
                  [-104.047534, 49.000239], [-97.228743, 49.000239]
                ]
              ]
            }
          }]
        }
      }],
      shapeCreated: function(e) {
        // Calculate the shape bounding box.
        var bbox = e.shape.bbox();
        var center = bbox.center();

        // Create the label.
        var labelText = e.shape.dataItem.properties.abbrev;
        var label = new kendo.drawing.Text(labelText);
        var labelCenter = label.bbox().center();

        // Position the label.
        label.position([
          center.x - labelCenter.x,
          center.y - labelCenter.y
        ]);

        // Render the label on the layer surface.
        e.layer.surface.draw(label);
      }
    });
  </script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
* [Product Page of the jQuery Map](https://www.telerik.com/kendo-jquery-ui/map)
