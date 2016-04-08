---
title: Drag and Drop Markers
page_title: Drag and Drop Markers | Kendo UI Map
description: "Learn how to integrate the Kendo UI Draggable widget with the Kendo UI Map widget."
slug: howto_draganddropmarkers_map
---

# Drag and Drop Markers

The example below demonstrates how to integrate the Kendo UI Draggable widget with the Kendo UI Map. Markers are allowed to be dragged and dropped within the visible extent of the Map. The location of the marker is updated on drop.

###### Example

```html
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
                        // Load mock data
                        e.success(markers);
                    }

                    // Update method omitted for simplicity
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
                // Move marker "hot point" under the cursor
                cursorOffset: { top: -height, left: -width / 2 },

                // Create and style drag hint
                hint: function() {
                    var hint = element.clone().css({
                        width: width,
                        height: height,
                        backgroundImage: element.css("backgroundImage")
                    });

                    element.hide();
                    return hint;
                },

                // Constrain drag area
                container: e.layer.map.element,

                // Update marker location
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

Other articles on Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Add Shape Titles]({% slug howto_addhspaetitles_map %})
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})
* [How to Zoom on Double Click]({% slug howto_zoomondblclick_map %})
