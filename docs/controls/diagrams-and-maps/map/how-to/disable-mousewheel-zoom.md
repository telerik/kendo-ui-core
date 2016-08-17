---
title: Disable Mousewheel Zoom
page_title: Disable Mousewheel Zoom | Kendo UI Map
description: "Learn how to disable the nousewheel zoom in a Kendo UI Map widget."
slug: howto_disablemousezoom_map
---

# Disable Mousewheel Zoom

The example below demonstrates how to disable mousewheel zoom in a Kendo UI Map.

###### Example

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

## See Also

Other articles on the Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})

For more runnable examples on the Kendo UI Map, browse the [**How To** documentation folder]({% slug howto_addhspaetitles_map %}).
