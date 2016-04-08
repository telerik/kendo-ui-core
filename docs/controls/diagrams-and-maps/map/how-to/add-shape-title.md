---
title: Add Shape Titles
page_title: Add Shape Titles | Kendo UI Map
description: "Learn how to add titles for shapes loaded from GeoJSON in a Kendo UI Map widget."
slug: howto_addhspaetitles_map
---

# Add Shape Titles

The example below demonstrates how to add a title text for shapes loaded from GeoJSON in a Kendo UI Map widget&mdash;in particular, how to add a [`Text`](/api/javascript/drawing/text) element positioned over the shape center.

Shape layers are rendered using the [Drawing API](/framework/drawing/overview). The [`shapeCreated`](/api/javascript/dataviz/ui/map#events-shapeCreated) event can be used to render additional elements.

###### Example

```html
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
        // Calculate shape bounding box
        var bbox = e.shape.bbox();
        var center = bbox.center();

        // Create the label
        var labelText = e.shape.dataItem.properties.abbrev;
        var label = new kendo.drawing.Text(labelText);
        var labelCenter = label.bbox().center();

        // Position the label
        label.position([
          center.x - labelCenter.x,
          center.y - labelCenter.y
        ]);

        // Render the label on the layer surface
        e.layer.surface.draw(label);
      }
    });
  </script>
```

## See Also

Other articles on Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Drag and Drop Markers]({% slug howto_draganddropmarkers_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})
* [How to Zoom on Double Click]({% slug howto_zoomondblclick_map %})
