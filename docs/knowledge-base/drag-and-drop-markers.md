---
title: Drag and Drop Map Markers
page_title: Drag and Drop Map Markers
description: "Learn how to integrate the Kendo UI Draggable widget with the Kendo UI Map component."
slug: howto_draganddropmarkers_map
previous_url: /controls/diagrams-and-maps/map/how-to/drag-and-drop-markers
tags: kendo, jquery, map, drag, and, drop, markers
component: map
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Map for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I integrate the Kendo UI Draggable with the Kendo UI for jQuery Map?

## Solution

The following example demonstrates how to integrate the Kendo UI Draggable widget with the Map.

You can drag and drop the markers within the visible area of the Map. The location of the marker is updated on dropping.

```dojo
<div id="map"></div>
<script>
    var markers = [
    {"latlng":[30.2675,-97.7409], "name": "Zevo Toys"},
    {"latlng": [30.2707,-97.7490],"name": "Foo Bars"},
    {"latlng": [30.2705,-97.7409],"name": "Mainway Toys"},
    {"latlng": [30.2686,-97.7494], "name": "Acme Toys"}];

    $("#map").kendoMap({
        center: [30.268107, -97.744821],
        zoom: 15,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>."
            }, {
            type: "marker",
            dataSource: {
                transport: {
                    read: function(e) {
                        // Load mock data.
                        e.success(markers);
                    }

                    // The update method is omitted for simplicity.
                }
            },
            locationField: "latlng",
            titleField: "name"
        }],
        markerActivate: function(e) {
            var marker = e.marker;
            var element = marker.element;
            var width = element.width();
            var height = element.height();
            var map = e.sender;

            element.kendoDraggable({
                // Move the "hot point" of the marker under the cursor.
                cursorOffset: { top: -height, left: -width / 2 },

                // Create and style the drag hint.
                hint: function() {
                    var hint = element.clone().css({
                        width: width,
                        height: height,
                        backgroundImage: element.css("backgroundImage")
                    });

                    element.hide();
                    return hint;
                },

                // Constrain the drag area.
                container: e.layer.map.element,

                // Update the marker location.
                dragend: function(e) {
                    e.sender.hint.hide();

                    var loc = map.viewToLocation([e.x.client, e.y.client]);
                    marker.dataItem.set("latlng", [loc.lat, loc.lng]);
                }
            });
        }
    });
</script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
