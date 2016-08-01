---
title: Load Markers For Visible Area
page_title: Load Markers For Visible Area | Kendo UI Map
description: "Learn how to load markers only for the visible area of a Kendo UI Map widget."
slug: howto_loadmarkers_map
---

# Load Markers For Visible Area

The example below demonstrates how to filter the data for a marker layer depending on the visible area of a Kendo UI Map.

###### Example

```html
<div id="map"></div>
<script>
function createMap() {
  var markerData = new kendo.data.DataSource({
    transport: {
      read: {
        url: "<my service URL>",
        dataType: "json"
      }
    }
  });

  function updateMarkers(e) {
    var extent = e.sender.extent();
    markerData.read({
      nw: extent.nw.toString(),
      se: extent.se.toString()
    });
  }

  $("#map").kendoMap({
    center: [30.268107, -97.744821],
    zoom: 15,
    layers: [{
      type: "tile",
      urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
      subdomains: ["a", "b", "c"],
      attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
      "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>"
    }, {
      type: "marker",
      dataSource: markerData,
      locationField: "latlng",
      titleField: "name"
    }],
    // Request new markers when the viewport is reset
    reset: updateMarkers,
    // And after a pan operation
    panEnd: updateMarkers
  });
}

$(document).ready(createMap);
</script>
```

## See Also

Other articles on the Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Render Custom Symbols for Bubble Layers]({% slug howto_rendercustomsymbols_forbubblelayers_map %})
* [How to Set 100% Height in Mobile Applications]({% slug howto_set100percentheight_inmobileapps_map %})
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})

For more runnable examples on the Kendo UI Map, browse the [**How To** documentation folder]({% slug howto_addhspaetitles_map %}).
