---
title: Configure the built-in zoom control plus/minus buttons
description: Modify the zoom buttons of the Kendo UI Map to allow more than one level of zoom.
type: how-to
page_title: Set Zoom of the Plus/Minus Buttons to a Certain Level
slug: map-configure-the-built-in-zoom-control-buttons
position: 
tags: map, zoom
ticketid: 1453772
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Map for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
Is it possible to customize how large the zoom step is when pressing the zoom buttons for a Kendo UI Map? 

## Solution
One way the amount of zoom can be modified when pressing the plus or minus buttons is to take advantage of the [zoomStart event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/zoomstart).  When the user presses the zoom button, make a reference to the [Map's current zoom](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/methods/zoom).  If the originalEvent's delta is 1 and it exists, use the Kendo UI Map's zoom method to increment to the preferred number.  Otherwise, if the delta is -1, reduce the zoom.

```javascript
  zoomStart: function(e) {
    var zoom = e.sender.zoom();

    //if the plus is clicked
    if(e.originalEvent.delta && e.originalEvent.delta == 1){

      e.sender.zoom(zoom + 2);
      
    //if the minus is clicked  
    } else if(e.originalEvent.delta && e.originalEvent.delta == -1){

      e.sender.zoom(zoom - 2);
    } 
  }
```

#### Example

```dojo
    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        zoom: 3,
        center: [0, 0],
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        zoomStart: function(e) {
          var zoom = e.sender.zoom();

          //if the plus is clicked
          if(e.originalEvent.delta && e.originalEvent.delta == 1){

            e.sender.zoom(zoom + 2);

            //if the minus is clicked  
          } else if(e.originalEvent.delta && e.originalEvent.delta == -1){

            e.sender.zoom(zoom - 2);
          } 
        }
      });
    </script>
```

## See Also
* [zoomStart Event - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/events/zoomstart)
* [zoom Method - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/methods/zoom)
