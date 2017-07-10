---
title: Drag and Drop Markers
page_title: Drag and Drop Markers | Kendo UI Map
description: "Learn how to integrate the Kendo UI Draggable widget with the Kendo UI Map widget."
slug: howto_draganddropmarkers_map
---

# Drag and Drop Markers

The following example demonstrates how to integrate the Kendo UI Draggable widget with the Map.

You can drag and drop the markers within the visible area of the Map. The location of the marker is updated on dropping.

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

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})

For more runnable examples on the Kendo UI Map, browse the [**How To** documentation folder]({% slug howto_addhspaetitles_map %}).
