---
title: Set Different Colors Dynamically for Markers Based on Field in Map
description: An example on how to dynamically change the colors of the markers based on the field value of the Kendo UI Map.
type: how-to
page_title: Set Different Colors for Markers Based on Field Value | Kendo UI Map
slug: map-marker-color-from-field
tags: map, markers, marker color
ticketid: 1115002
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
  <td>version 2017.2.621</td>
 </tr>
</table>

## Description

I have a Kendo UI Map in which the data is retrieved from the database and the markers are added dynamically. The locations are grouped by category and for each category I have added a color to the dataSource.

How can I use this color to the marker on the Map based on the field value?

## Suggested Workarounds

The Kendo UI Map does not provide a built-in solution for achieving this behavior. However, you can still work around this issue.

After the marker is created, the [`markerActivate`](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/markeractivate) event is fired. Although the styles of the markers come from the selected themes styles, handle the `markerActivate` event, get reference to the rendered element, and manually change its color by using jQuery.

```
markerActivate: function(e) {
   $(e.marker.element.context).css("color", "THE NEW COLOR")
}
```

The following example demonstrates the full implementation of the approach.

```dojo
<div id="map"></div>
<script>
    $("#map").kendoMap({
        markers: [{
            shape: "pinTarget",
            location: [42, 27],
            colorField: "green"
        },{
            shape: "pinTarget",
            location: [42, 32],
            colorField: "red"
        },{
            shape: "pinTarget",
            location: [42, 38],
            colorField: "#333999"
        }],
        markerActivate: function(e) {
          $(e.marker.element.context).css("color", e.marker.options.colorField)
        }
    });
</script>
```
