---
title: Implementation with Azure
description: An example on how to include Azure maps' geospatial capabilities in Kendo UI Map.
type: how-to
page_title: Use Azure maps in Kendo UI Map
slug: map-using-azure
tags: map, kendo, azure, ui, geospatial, zoom
res_type: kb
component: map
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Map</td>
 </tr>
 <tr>
  <td>Progress Kendo UI</td>  
  <td>version 2021.1.330</td>
 </tr>
</table>

## Description

I have a Kendo UI Map.

How can I implement Azure maps' geospatial capabilities?

## Solution

The Kendo UI Map is fully compatible with Azure's png tile API. Use the Url of the Asure service in the [urlTemplate](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/configuration/layers.urltemplate) property of the Map and observe the result.


The following example demonstrates the full implementation of the approach.

```dojo
 <div id="example">

      <div id="map"></div>

      <script>
        function createMap() {
          $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
              type: "tile",
              urlTemplate:"https://atlas.microsoft.com/map/tile/png?subscription-key=jXumf_aF2qoph5K7hjXH6UFq2vd2exT0XkgyO2iQYlM&api-version=1.0&layer=basic&style=main&x=#=x#&y=#=y#&zoom=#=zoom#"
            }],
            markers: [{
              location: [30.268107, -97.744821],
              shape: "pinTarget",
              tooltip: {
                content: "Austin, TX"
              }
            }]
          });
        }

        $(document).ready(createMap);
      </script>
    </div>
```
