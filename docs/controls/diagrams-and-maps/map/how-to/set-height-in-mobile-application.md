---
title: Set 100% Height in Mobile Applications
page_title: Set 100% Height in Mobile Applications | Kendo UI Map
description: "Learn how to set a 100% height of a Kendo UI Map widget in mobile applications."
slug: howto_set100percentheight_inmobileapps_map
---

# Set 100% Height in Mobile Applications

The example below demonstrates how to use the Kendo UI Map widget in Kendo UI Mobile View and set the height for the Map to 100%.

###### Example

```html
    <div data-role="view" data-init="createMap" data-stretch="true">
      <div id="map"></div>
    </div>
    <style>
      .k-map{
        height:auto;
      }
    </style>
    <script>
      new kendo.mobile.Application();
      function createMap() {
        $("#map").kendoMap({
          center: [51.505, -0.09],
          zoom: 3,
          layers: [{
            type: "bing",
            imagerySet: "aerialWithLabels",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
          }]
        });
      }
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
* [How to Update Map Shapes by ID]({% slug howto_updatemapshapesbyid_map %})
* [How to Zoom on Area]({% slug howto_zoomonarea_map %})
* [How to Zoom on Double Click]({% slug howto_zoomondblclick_map %})
