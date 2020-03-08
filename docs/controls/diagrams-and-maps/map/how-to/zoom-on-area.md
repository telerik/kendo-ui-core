---
title: Zoom on Area
page_title: Zoom on Area | Kendo UI Map
description: "Learn how to center the Kendo UI Map view on a specified area."
slug: howto_zoomonarea_map
---

# Zoom on Area

The following example demonstrates how to center the map view on a specified area in the Map widget.

To define the area, use a set of markers. You can use any list of locations. Then, you need to build an [`extent`](/api/javascript/dataviz/map/extent) that encompasses all locations and [set it on the map as a visible area](/api/javascript/dataviz/ui/map/methods/extent).

```dojo
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

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
