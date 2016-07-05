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

Other articles on the Kendo UI Map:

* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
* [How to Customize Markers on Map]({% slug howto_customizemarkersonmap_map %})
* [How to Disable Mousewheel Zoom]({% slug howto_disablemousezoom_map %})
* [How to Display Shape Tooltips]({% slug howto_displayshapetooltip_map %})
* [How to Drag and Drop Markers]({% slug howto_draganddropmarkers_map %})

For more runnable examples on the Kendo UI Map, browse the [**How To** documentation folder]({% slug howto_addhspaetitles_map %}).
