---
title: Dynamic Markers Color from Field in Kendo UI Map
description: Example for changing the marker color dynamically based on a field value
type: how-to
page_title: Setting different color for the markers based on a field value
slug: map-marker-color-from-field
position: 0
tags: map, markers, marker color
teampulseid:
ticketid: 1115002
pitsid:
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Map for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI®</td>  
  <td>version 2017.2.621</td>
 </tr>
</table>


## Description

I have a Kendo UI Map where markers are added dynamically, the data is retrieved from database. The locations are grouped by category for which we added a color to the datasource.

What we need is to use this color to the marker on the Map, based on the field value.


## Solution  
  
There is no built-in solution. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds

Although that the markers styles are coming from the selected themes styles, you could try to handle the [markerActivate ](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#events-markerActivate)event (_which will fire after the marker is created_) get reference to the rendered element and manually change its color with jQuery:  

````
markerActivate: function(e) {
   $(e.marker.element.context).css("color", "THE NEW COLOR")
}
````

Following is an example with this approach:

#### Example

```html
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
````

