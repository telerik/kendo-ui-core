---
title: Disable Mousewheel Zoom
page_title: Disable Mousewheel Zoom | Kendo UI Map
description: "Learn how to disable the nousewheel zoom in a Kendo UI Map widget."
slug: howto_disablemousezoom_map
---

# Disable Mousewheel Zoom

The following example demonstrates how to disable the mousewheel zoom in the Map widget.

```dojo
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

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
