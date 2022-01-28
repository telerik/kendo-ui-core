---
title: Set 100% Height in Mobile Applications
page_title: Set 100% Height in Mobile Applications | Kendo UI Map
description: "Learn how to set a 100% height of a Kendo UI Map widget in mobile applications."
slug: howto_set100percentheight_inmobileapps_map
---

# Set 100% Height in Mobile Applications

The following example demonstrates how to use the Map widget in a Kendo UI Mobile View and set the height for the Map to 100%.

```dojo
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

* [Basic Usage of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/index)
* [Using the API of the Map (Demo)](https://demos.telerik.com/kendo-ui/map/api)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
