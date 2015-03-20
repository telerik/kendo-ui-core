---
title: Setting 100% height in mobile application
page_title: Setting 100% height in mobile application
description: Setting 100% height in mobile application
---

# Setting 100% height in mobile application

The example below demonstrates how to use Kendo UI Map in Kendo UI Mobile View and set 100% height for the map.

#### Example:

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
            key: "AjQF548guEF8MWgEspVokNny7l_GULKsZ81tR-LvPK96Bm3REkCjNHs2aC_b7nvF"
          }]
        });
      }
    </script>
```
