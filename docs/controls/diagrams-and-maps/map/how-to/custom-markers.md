---
title: Customize Markers on Map
page_title: Customize Markers on Map | Kendo UI Map
description: "Learn how to custyomize markers on a Kendo UI Map widget."
slug: howto_customizemarkersonmap_map
---

# Customize Markers on Map

The following example demonstrates how to use custom markers on a Kendo UI Map.

###### Example

```dojo
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
      .k-map .k-i-marker-custom-marker {
        background-image: url('https://demos.telerik.com/kendo-ui/content/dataviz/chart/images/sunny.png');
        background-size: 30px;
        width: 30px;
        height: 30px;
      }
    </style>
```

## See Also

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Double Click]({% slug howto_zoomondblclick_map %})

For more runnable examples on the Kendo UI Map, browse the [**How To** documentation folder]({% slug howto_addhspaetitles_map %}).
