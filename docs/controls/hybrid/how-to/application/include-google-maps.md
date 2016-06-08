---
title: Include Google Maps in the Application
page_title: Include Google Maps in the Application | Kendo UI Hybrid Application
description: "Learn how to include Google maps when working with the Hybrid UI Application of Kendo UI."
slug: include_google_maps_mobile_application
---

# Include Google Maps in the Application

The example below demonstrates how to include Google maps when working with the Hybrid UI Application of Kendo UI.

###### Example

```html
       <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCG4jUolof0jhqQu0j1aNqSWfW_ms-wRKg&sensor=true"></script>
    <div data-role="view" data-title="Info" id="info">
      <div style="width:100%; text-align: center">
        <h1>Using Google Maps<br />in KendoUI application</h1>
      </div>
    </div>

    <!-- hook up to the init event of the view and initialize the google map -->
    <div data-role="view" data-init="buildMap" id="map" data-title="Map">
      <div id="map_canvas" style="width:100%;"></div>
    </div>

    <div data-role="layout" data-id="default">
      <div data-role="header">
        <div data-role="navbar">
          <span data-role="view-title"></span>
        </div>
      </div>

      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="#info" data-icon="info">Info</a>
          <a href="#map" data-icon="globe">Map</a>
        </div>
      </div>
    </div>

    <script>
      new kendo.mobile.Application(document.body, {layout: "default"});

      //initialize the google map
      function buildMap(e) {
        var myOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var mapElement = $("#map_canvas");
        var container = e.view.content;

        var map = new google.maps.Map(mapElement[0], myOptions);
      }

    </script>
    <style>
      #map .km-content,
      #map .km-scroll-container,
      #map #map_canvas {
        display: -webkit-box;
        width: 100%;
      }
    </style>
```

## See Also

Articles on the Application and other Hybrid UI components in Kendo UI:

* [Hybrid UI Application API Reference](/api/javascript/mobile/application)
* [Overview of the Hybrid UI Application in Kendo UI]({% slug overview_hybridapplication %})
* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [Performance Tips and Tricks]({% slug performance_hybridkendoui %})
* [Native Scrolling]({% slug nativescrolling_hybrid_kendoui %})

For more runnable examples on the Hybrid UI Application of Kendo UI, browse its [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).
