---
title: Disable mousewheel zoom
page_title: Disable mousewheel zoom
description: Disable mousewheel zoom.
---

# Disable mousewheel zoom

The example below demonstrates how to disable mousewheel zoom in Kendo UI Map.

#### Example:

```html
    <div id="map"></div>
    <div style="height: 1000px; color: #fff; background: purple; font-size: 24px; text-align: center;">Very high div</div>
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
            shape: "pinTarget",
            tooltip: {
              content: "Austin, TX"
            }
          }]
        });          

        $("#map").unbind("mousewheel");
		$("#map").unbind("DOMMouseScroll");
      }

      $(document).ready(createMap);
    </script>
```
