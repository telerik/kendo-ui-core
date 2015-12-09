---
title: Custom symbols for Bubble layers
page_title: Custom symbols for Bubble layers
description: Render custom symbols on Map Bubble layers
---

# Render custom symbols on Map Bubble layers

The Bubble Layer allows you to define how symbols are rendered.

This works by defining a [symbol function](http://docs.telerik.com/KENDO-UI/api/javascript/dataviz/ui/map#configuration-layers.symbol)
that uses the [Drawing API](/framework/drawing/overview) to define the shape.

The symbol is typically a [Group](http://docs.telerik.com/kendo-ui/api/javascript/drawing/group) of shapes.

In the demo below we'll render 200km lines in West-East direction as a symbol.
Notice how the lines are longer the farther you go North as we're using [Mercator Projection](https://en.wikipedia.org/wiki/Mercator_projection).

#### Example: Draw custom bubble layer symbols

```html
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
          urlTemplate: "http://otile3.mqcdn.com/tiles/1.0.0/sat/#= zoom #/#= x #/#= y #.png",
          attribution: "Tiles © <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a>"
        }, {
          type: "bubble",
          attribution: "Population data from Nordpil and UN Population Division.",
          dataSource: {
            transport: {
              read: {
                url: "https://cdn.rawgit.com/tsvetomir/59095cfd1592c2f2cd2f/raw/1083f917d84644641eb727705b37408f2d8e700a/urban-areas.json",
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

            // Find locations 100km west and east of center
            //
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/map/location#methods-destination
            //
            // Actual distance can be bound to e.dataItem fields
            var l1 = location.destination(100000, 270);
            var l2 = location.destination(100000, 90);

            // View (screen) coordinates for the locations
            //
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#methods-locationToView
            var p1 = map.locationToView(l1);
            var p2 = map.locationToView(l2);

            // Draw the lines
            //
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/circle
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
