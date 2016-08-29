---
title: Render Custom Symbols for Bubble Layers
page_title: Render Custom Symbols for Bubble Layers | Kendo UI Map
description: "Learn how to render custom symbols on Kendo UI Map Bubble layers."
slug: howto_rendercustomsymbols_forbubblelayers_map
---

# Render Custom Symbols for Bubble Layers

The Bubble Layer allows you to define the way symbols are rendered. This works by defining a [`symbol` function](http://docs.telerik.com/KENDO-UI/api/javascript/dataviz/ui/map#configuration-layers.symbol) that uses the [Drawing API](/framework/drawing/overview) to define the shape. The symbol is typically a [Group](http://docs.telerik.com/kendo-ui/api/javascript/drawing/group) of shapes.

The example below demonstrates how to render 200-kilometer lines in West-East direction as a symbol. Notice that the lines get longer the farther you go North, which is due to that fact that the [Mercator Projection](https://en.wikipedia.org/wiki/Mercator_projection) is used.

###### Example

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
          urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          subdomains: ["a", "b", "c"],
          attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
        }, {
          type: "bubble",
          attribution: "Population data from Nordpil and UN Population Division.",
          dataSource: {
            transport: {
              read: {
                url: "http://runner.telerik.io/fullscreen/EsuDU.json",
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

## See Also

Other articles on the Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Add Shape Titles]({% slug howto_addhspaetitles_map %})
* [How to Drag and Drop Markers]({% slug howto_draganddropmarkers_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})

For more runnable examples on the Kendo UI Map, browse the [**How To** documentation folder]({% slug howto_customizemarkersonmap_map %}).
