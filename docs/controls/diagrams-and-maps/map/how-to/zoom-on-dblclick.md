---
title: Zoom on Double Click
page_title: Zoom on Double Click | Kendo UI Map
description: "Learn how to zoom the Kendo UI Map on double click."
slug: howto_zoomondblclick_map
---

# Zoom on Double Click

The example below demonstrates how to zoom the map upon a double click.

Event coordinates are mapped to the location through using the [`eventToLocation`](/api/javascript/dataviz/ui/map#methods-eventToLocation) method.

###### Example

```html
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
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})
