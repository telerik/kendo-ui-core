---
title: Customize markers on the map
page_title: Customize markers on the map
description: Customize markers on the map.
---

# Customize markers on the map.

The example below demonstrates how to use custom markers on Kendo UI Map.

#### Example:

```html
    <div id="map"></div>
    <script>
        function createMap() {
        $("#map").kendoMap({
          center: [30.268107, -97.744821],
          zoom: 3,
          layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
          }],
          markers: [{
            location: [30.268107, -97.744821],
            shape: "customMarker",
            tooltip: {
              content: "Austin, TX"
            }
          }]
        });          

        $("#map").unbind("mousewheel");
      }

      $(document).ready(createMap);
    </script>
 	<style>
      .k-map .k-marker-custom-marker {
        background-image: url('http://demos.telerik.com/kendo-ui/content/shared/images/we-are-here.png');
        background-size: 50px;
        width: 50px;
        height: 50px;
      }
    </style>
```
