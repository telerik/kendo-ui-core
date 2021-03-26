---
title: Add and Remove Markers on Click
description: An example that shows how to add and remove a marker at the location where the user clicked on the Kendo UI Map.
type: how-to
page_title: Add and remove a marker on click
slug: map-add-marker-on-click
position: 
tags: map, add, markers, on, click, location, marker
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Created with Product Version</td>
			<td>2019.2.619</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Map for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

I have a map that a user will utilize in order to mark their position. I want them to be able to click on the map and create a new marker where the map is clicked.

## Solution

1. Add the [`click`](/api/javascript/dataviz/ui/map/events/click) event handler
1. Use the `e.location` event data to add the new marker
1. Add a tooltip with a remove button and include the current location. You can do that by adding your own `data-` attribute

```javascript
   click: function(e){
        e.sender.markers.add({
            location: e.location,
            tooltip:{
              hideAfter: 1000,
              content:function(e){
                var content = "Remove marker <button";
                content += " data-location='" + e.sender.marker.location();
                return content += "' style=' margin-bottom: 0;' onclick='remove(this)'>x</button>"
              }
            }
        });
   }

   function remove(btn){
        var markerLocation = $(btn).data("location");
        var markers = map.markers.items;
        for(var i=0; i< markers.length; i++){
          var currentMarker = markers[i].location()
          if(currentMarker.toString() == markerLocation){
            map.markers.remove(markers[i])
          }
        }
    }
```

#### Example

```dojo
    <div id="example">
      <button class="k-button k-primary" onclick="show()">Show markers</button>
      <div id="map"></div>

      <script>
        var map = $("#map").kendoMap({
          center: [30.268107, -97.744821],
          zoom: 13,
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
          }],
          markers: [{
            location: [30.268107, -97.744821],
            shape: "pinTarget",
            tooltip: {
              content: "Austin, TX"
            }
          }],
          click: onClick
        }).data("kendoMap");

        function onClick(e) {
          e.sender.markers.add({
            location: e.location,
            tooltip:{
              hideAfter: 1000,
              content:function(e){
                var content = "Remove marker <button";
                content += " data-location='" + e.sender.marker.location();
                return content += "' style=' margin-bottom: 0;' onclick='remove(this)'>x</button>"
              }
            }
          });
        }
        
        function remove(btn){
          var markerLocation = $(btn).data("location");
          var markers = map.markers.items;
          for(var i=0; i< markers.length; i++){
            var currentMarker = markers[i].location()
            if(currentMarker.toString() == markerLocation){
              map.markers.remove(markers[i])
            }
          }
        }

        function show(){
          var markers = map.markers.items; 
          var message = "";
         	for(var i=0; i< markers.length; i++){
            message += kendo.format("Marker {0} Location - {1}</br>", i+1, markers[i].location());
          }
          kendo.alert(message);
        }
      </script>

    </div>
    <style>
      #map .k-icon:before {
        margin-top: auto;
        margin-bottom: 0;
      }

      .k-animation-container{
        margin-top:5px !important;
      }
    </style>
```

## See Also

* [Map API Reference](/api/javascript/dataviz/ui/map)
* [Marker API](/api/javascript/dataviz/map/marker)
* [MarkerLayer API](/api/javascript/dataviz/map/marker-layer)
