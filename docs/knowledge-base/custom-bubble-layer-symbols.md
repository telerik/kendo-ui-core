---
title: Render Custom Symbols for Map Bubble Layers
page_title: Render Custom Symbols for Map Bubble Layers
description: "Learn how to render custom symbols on Kendo UI Map Bubble layers."
slug: howto_rendercustomsymbols_forbubblelayers_map
previous_url: /controls/diagrams-and-maps/map/how-to/custom-bubble-layer-symbols
tags: kendo, jquery, map, add, custom, symbols, for, bubble, layers
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

How can I add some custom symbols to the Bubble layer of the Kendo UI for jQuery Map?

## Solution

The Bubble Layer allows you to define the way symbols are rendered.

This approach works by defining a [`symbol`](/api/javascript/dataviz/ui/map/configuration/layers.symbol) function that uses the [Drawing API]({% slug overview_kendoui_drawingapi %}) to define the shape. The symbol is typically a [Group](/api/javascript/drawing/group) of shapes.

The following example demonstrates how to render 200-kilometer lines in West-East direction as a symbol. Note that the lines get longer the farther you go North, which is due to that fact that the example uses the [Mercator Projection](https://en.wikipedia.org/wiki/Mercator_projection).

```dojo
    <div id="map"></div>
    <script>
      var draw = kendo.dataviz.drawing;
      var geom = kendo.dataviz.geometry;

      $("#map").kendoMap({
        center: [45, 45],
        minZoom: 3,
        zoom: 4,
        wraparound: false,
        layers: [{
          type: "tile",
          urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          subdomains: ["a", "b", "c"],
          attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
        }, {
          type: "bubble",
          attribution: "Population data from Nordpil and UN Population Division.",
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/content/dataviz/map/urban-areas.json",
                dataType: "json"
              }
            }
          },
          locationField: "Location",
          valueField: "Pop2010",
          symbol: function(e) {
            var map = $("#map").data("kendoMap");

            // Bubble location
            var location = e.location;

            // Find locations 100km west and east of center.
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/map/location/methods/destination
            // Actual distance can be bound to e.dataItem fields
            var l1 = location.destination(100000, 270);
            var l2 = location.destination(100000, 90);

            // View the (screen) coordinates for the locations.
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/methods/locationToView
            var p1 = map.locationToView(l1);
            var p2 = map.locationToView(l2);

            // Draw the lines.
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/circle
            var path = new draw.Path({
              stroke: {
                width: 2,
                color: "red"
              }
            });

            path.moveTo(p1).lineTo(p2);

            path.dataItem = e.dataItem;
            return path;
          }
        }],
        shapeClick: function(e) {
          console.log(e);
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
