---
title: Zoom on Area
page_title: Zoom on Map Area
description: This article demonstrates how to center the map view on a specified area
---

# Zoom on Map Area

This example demonstrates how to center the map view on a specified area.

In this demo, the area will be defined by a set of markers, but any list of locations will do.

We'll built an [extent](/api/dataviz/map/extent.md) that encompasses all locations
and [set it as a visible area](/api/javascript/dataviz/ui/map#methods-extent) on the map.

#### Example: Zoom on Area
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
