---
title: Zoom on Area
page_title: Zoom on Area | Kendo UI Map
description: "Learn how to center the Kendo UI Map view on a specified area."
slug: howto_zoomonarea_map
---

# Zoom on Area

The example below demonstrates how to center the map view on a specified area in a Kendo UI Map widget. The area is defined by a set of markers&mdash;any list of locations can do. Then build an [extent](/api/javascript/dataviz/map/extent) that encompasses all locations and [set it as a visible area](/api/javascript/dataviz/ui/map#methods-extent) on the map.

###### Example

```html
<button id="center">Center on markers</button>
<div id="map"></div>
<script>
    var markers = [
    {"latlng":[30.2675,-97.7409], "name": "Zevo Toys"},
    {"latlng": [30.2707,-97.7490],"name": "Foo Bars"},
    {"latlng": [30.2705,-97.7409],"name": "Mainway Toys"},
    {"latlng": [30.2686,-97.7494], "name": "Acme Toys"}];

    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "© <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>."
        }, {
            type: "marker",
            dataSource: {
                data: markers
            },
            locationField: "latlng",
            titleField: "name"
        }]
    });

    function centerMap() {
        var map = $("#map").getKendoMap();
        var layer = map.layers[1];
        var markers = layer.items;
        var extent;

        for (var i = 0; i < markers.length; i++) {
            var loc = markers[i].location();

            if (!extent) {
                extent = new kendo.dataviz.map.Extent(loc, loc);
            } else {
                extent.include(loc);
            }
        }

        map.extent(extent);
    }

    $("#center").click(centerMap);
</script>
```

## See Also

Other articles on Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Add Shape Titles]({% slug howto_addhspaetitles_map %})
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Drag and Drop Markers]({% slug howto_draganddropmarkers_map %})
* [How to Highlight Map Shapes by ID]({% slug howto_highlightmapshapesbyid_map %})
* [How to Link Marker to Location]({% slug howto_linkmarkertolocation_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Double Click]({% slug howto_zoomondblclick_map %})
