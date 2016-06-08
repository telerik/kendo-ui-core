---
title: Include Esri(ArcGIS) Map in the Application
page_title: Include Esri(ArcGIS) Map in the Application | Kendo UI Hybrid Application
description: "Learn how to include an Esri(ArcGIS) map when working with the Hybrid UI Application of Kendo UI."
slug: include_esri_map_mobile_application
---

# Include Esri(ArcGIS) Map in the Application

The example below demonstrates how to include an Esri(ArcGIS) map when working with the Hybrid UI Application of Kendo UI.

###### Example

```html
      <style id="jsbin-css"></style>
    <link rel="stylesheet" href="http://js.arcgis.com/3.6/js/esri/css/esri.css" />
    <script src="http://js.arcgis.com/3.6/"></script>
    <div data-role="view" data-stretch="true" data-init="onInit">
      <header data-role="header">
        <div data-role="navbar">
          <span data-role="view-title">Esri Map Example</span>
        </div>
      </header>

      <div id="map">
      </div>

      <footer data-role="footer">
        <div data-role="tabstrip">
          <a data-icon="home">Home</a>
          <a data-icon="info">Info</a>
        </div>        
      </footer>
    </div>
    <script>
      var app = new kendo.mobile.Application(document.body);

      //initialize the map
      function onInit(){
        var map;

        require(["esri/map", "dojo/domReady!"], function(Map) {
          map = new Map("map", {
            basemap: "topo",
            center: [-122.45,37.75], // long, lat
            zoom: 7,
            sliderStyle: "small"
          });
        });   
      }
    </script>
```

## See Also

Articles on the Application and other Hybrid UI components in Kendo UI:

* [Hybrid UI Application API Reference](/api/javascript/mobile/application)
* [Overview of the Hybrid UI Application in Kendo UI]({% slug overview_hybridapplication %})
* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [Performance Tips and Tricks]({% slug performance_hybridkendoui %})
* [Native Scrolling]({% slug nativescrolling_hybrid_kendoui %})

For more runnable examples on the Hybrid UI Application of Kendo UI, browse its [**How To** documentation folder]({% slug displa_validation_summary_hybridapplication %}).
