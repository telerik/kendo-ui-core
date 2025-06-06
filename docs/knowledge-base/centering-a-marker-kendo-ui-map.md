---
title: Centering a Marker in Kendo UI Map on Zoom or Pan
description: Learn how to keep a marker centered in the Kendo UI Map component as you pan or zoom.
type: how-to
page_title: How to Keep a Marker Centered in Kendo UI Map on Zoom and Pan
slug: centering-a-marker-kendo-ui-map
tags: kendo, ui, map, center, marker, zoom, pan
res_type: kb
ticketid: 1671377
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Map</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

Centering a marker in the visible view of the map, including when zooming or panning, is a common requirement for applications using maps to ensure that a specific location remains in focus. This knowledge base article also answers the following questions:
- How do I ensure a marker stays centered in Kendo UI Map?
- What is the method to keep a marker centered during map navigation?
- Can I auto-center a marker on map zoom or pan events?

## Solution

To center a marker in the Kendo UI Map and keep it centered during zoom and pan operations, use the [center()](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/methods/center) method of the map. This method allows you to set or get the center of the map. To maintain the centered marker when the map is zoomed or panned, apply logic inside the [`zoomEnd`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/zoomend) and [`panEnd`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/panend) event handlers of the map.

Below is the JavaScript code that demonstrates how to implement this functionality:

```dojo
 <div id="map"></div>
      <script>
        function createMap() {
          $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
              type: "tile",
              urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
              subdomains: ["a", "b", "c"],
              attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
            }],
            markers: [{
              location: [30.268107, -97.744821],
              shape: "pinTarget",
              tooltip: {
                content: "Austin, TX"
              }
            }],
            zoomEnd: onZoomEnd,
            panEnd: onPanEnd
          });

          let map = $("#map").data("kendoMap");
          map.markers.clear();
          map.markers.add({location: map.center()});

          function onZoomEnd(e) {
            let mapCenter = e.sender.center();
            setCenterMarker(mapCenter);
          }

          function onPanEnd(e) {
            let mapCenter = e.sender.center();
            setCenterMarker(mapCenter);
          }

          function setCenterMarker(mapCenter) {
            let map = $("#map").data("kendoMap");
            map.markers.clear();
            map.markers.add({location: mapCenter});
          }
        }
        $(document).ready(createMap);
      </script>
```

This script first clears any existing markers and places a new marker at the center of the map. It then defines functions to handle the `zoomEnd` and `panEnd` events, ensuring the marker remains centered by setting it to the new center after each event. The `setCenterMarker` function updates the marker's position to the map's center.

## See Also

- [Kendo UI Map Center Method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/methods/center)
- [Kendo UI Map zoomEnd Event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/zoomend)
- [Kendo UI Map panEnd Event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/panend)
- [Kendo UI Map Documentation](https://docs.telerik.com/kendo-ui/controls/map/overview)
