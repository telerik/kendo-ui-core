---
title: Zoom on Double Click
page_title: Zoom on Double Click | Kendo UI Map
description: "Learn how to zoom the Kendo UI Map on double click."
slug: howto_zoomondblclick_map
---

# Zoom on Double Click

The following example demonstrates how to zoom the Map upon a double click.

The event coordinates are mapped to the location by using the [`eventToLocation`](/api/javascript/dataviz/ui/map/methods/eventtolocation) method.

```dojo
<div id="map"></div>
<script>
  function createMap() {
    $("#map").kendoMap({
      center: [51.505, -0.09],
      zoom: 3,
      layers: [{
          type: "tile",
          urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          subdomains: ["a", "b", "c"],
          attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
      }]
    });

    $("#map").bind("dblclick", function(e) {
      var map = $(this).data("kendoMap");
      var center = map.eventToLocation(e);
      map.center(center);
      map.zoom(map.zoom() + 1);
    });
  }

  $(document).ready(createMap);
</script>
```

## See Also

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
