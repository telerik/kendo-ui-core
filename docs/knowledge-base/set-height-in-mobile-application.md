---
title: Set 100% Height to the Map in Mobile Applications
page_title: Set 100% Height to the Map in Mobile Applications
description: "Learn how to set a 100% height of a Kendo UI Map widget in mobile applications."
slug: howto_set100percentheight_inmobileapps_map
previous_url: /controls/diagrams-and-maps/map/how-to/set-height-in-mobile-application
tags: kendo, jquery, map, set, hundred, percent, 100%, height, on, mobile, apps
component: map
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Map for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I set the height of the Kendo UI for jQuery Map to 100% on mobile?

## Solution

The following example demonstrates how to use the Map widget in a Kendo UI Mobile View and set the height for the Map to 100%.

```dojo
    <div data-role="view" data-init="createMap" data-stretch="true">
      <div id="map"></div>
    </div>
    <style>
      .k-map{
        height:100vh;
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
