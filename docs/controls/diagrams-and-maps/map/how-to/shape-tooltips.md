---
title: Display Shape Tooltips
page_title: Display Shape Tooltips | Kendo UI Map
description: "Learn how to  configure per-shape tooltips in the Kendo UI Map shape layer."
slug: howto_displayshapetooltip_map
---

# Display Shape Tooltips

The example below demonstrates how to display a tooltip for individual shapes in a Kendo UI Map widget.

###### Example

```html
    <div id="map"></div>
    <script>
      var geojson = [{
          "type": "Feature",
          "id": "GBR",
          "properties": {
              "name": "United Kingdom"
          },
          "geometry": {
              "type": "MultiPolygon",
              "coordinates": [
                  [[
                      [ -5.661949, 54.554603 ],
                      [ -6.197885, 53.867565 ],
                      [ -6.95373, 54.073702 ],
                      [ -7.572168, 54.059956 ],
                      [ -7.366031, 54.595841 ],
                      [ -7.572168, 55.131622 ],
                      [ -6.733847, 55.17286 ],
                      [ -5.661949, 54.554603 ]
                  ]],
                  [[
                      [ -3.005005, 58.635 ],
                      [ -4.073828, 57.553025 ],
                      [ -3.055002, 57.690019 ],
                      [ -1.959281, 57.6848 ],
                      [ -2.219988, 56.870017 ],
                      [ -3.119003, 55.973793 ],
                      [ -2.085009, 55.909998 ],
                      [ -2.005676, 55.804903 ],
                      [ -1.114991, 54.624986 ],
                      [ -0.430485, 54.464376 ],
                      [ 0.184981, 53.325014 ],
                      [ 0.469977, 52.929999 ],
                      [ 1.681531, 52.73952 ],
                      [ 1.559988, 52.099998 ],
                      [ 1.050562, 51.806761 ],
                      [ 1.449865, 51.289428 ],
                      [ 0.550334, 50.765739 ],
                      [ -0.787517, 50.774989 ],
                      [ -2.489998, 50.500019 ],
                      [ -2.956274, 50.69688 ],
                      [ -3.617448, 50.228356 ],
                      [ -4.542508, 50.341837 ],
                      [ -5.245023, 49.96 ],
                      [ -5.776567, 50.159678 ],
                      [ -4.30999, 51.210001 ],
                      [ -3.414851, 51.426009 ],
                      [ -3.422719, 51.426848 ],
                      [ -4.984367, 51.593466 ],
                      [ -5.267296, 51.9914 ],
                      [ -4.222347, 52.301356 ],
                      [ -4.770013, 52.840005 ],
                      [ -4.579999, 53.495004 ],
                      [ -3.093831, 53.404547 ],
                      [ -3.09208, 53.404441 ],
                      [ -2.945009, 53.985 ],
                      [ -3.614701, 54.600937 ],
                      [ -3.630005, 54.615013 ],
                      [ -4.844169, 54.790971 ],
                      [ -5.082527, 55.061601 ],
                      [ -4.719112, 55.508473 ],
                      [ -5.047981, 55.783986 ],
                      [ -5.586398, 55.311146 ],
                      [ -5.644999, 56.275015 ],
                      [ -6.149981, 56.78501 ],
                      [ -5.786825, 57.818848 ],
                      [ -5.009999, 58.630013 ],
                      [ -4.211495, 58.550845 ],
                      [ -3.005005, 58.635 ]
                  ]]
              ]
          }
      }, {
          "type": "Feature",
          "properties": {
              "name": "Ireland"
          },
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [ -6.197885, 53.867565 ],
                      [ -6.032985, 53.153164 ],
                      [ -6.788857, 52.260118 ],
                      [ -8.561617, 51.669301 ],
                      [ -9.977086, 51.820455 ],
                      [ -9.166283, 52.864629 ],
                      [ -9.688525, 53.881363 ],
                      [ -8.327987, 54.664519 ],
                      [ -7.572168, 55.131622 ],
                      [ -7.366031, 54.595841 ],
                      [ -7.572168, 54.059956 ],
                      [ -6.95373, 54.073702 ],
                      [ -6.197885, 53.867565 ]
                  ]
              ]
          }
      }];

      function createMap() {
        $("#map").kendoMap({
          center: [55, 0],
          zoom: 5,
          layers: [{
            dataSource: {
              type: "geojson",
              data: geojson
            },
            style: {
              fill: {
                color: "#cf0",
                opacity: 0.5
              }
            }
          }],
          shapeMouseEnter: function(e) {
            var oe = e.originalEvent;
            var x = oe.pageX || oe.clientX;
            var y = oe.pageY || oe.clientY;

            var name = e.shape.dataItem.properties.name;
            popup.element.html(name);
            popup.open(x, y);
          },
          shapeMouseLeave: function(e) {
            if (!$(e.originalEvent.relatedTarget).is(".k-popup, .k-animation-container")) {
              popup.close();

              // Necessary to stop the animations,
              // will be fixed in future versions
              popup.element.kendoStop(true, true);
            }
          }
        });

        var map = $("#map").data("kendoMap");

        var popup = $("<div>Foo</div>")
          .appendTo(document.body)
          .kendoPopup()
          .data("kendoPopup");
      }

      createMap();
    </script>
```

## See Also

Other articles on Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Add Shape Titles]({% slug howto_addhspaetitles_map %})
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Drag and Drop Markers]({% slug howto_draganddropmarkers_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})
* [How to Zoom on Double Click]({% slug howto_zoomondblclick_map %})
