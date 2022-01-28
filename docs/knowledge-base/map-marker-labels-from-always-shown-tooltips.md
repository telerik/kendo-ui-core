---
title: Always Show Marker Tooltip
description: An example on how to show labels on the map markers by utilizing their tooltips in the Kendo UI Map.
type: how-to
page_title: Always Show Marker Tooltips Like Labels | Kendo UI Map
slug: map-marker-labels-from-always-shown-tooltips
tags: map,show,always,marker,tooltip,label
ticketid: 1412666
res_type: kb
---

## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Map for Progress® Kendo UI®</td>
	    </tr>
    </tbody>
</table>


## Description

The map markers in the Kendo UI Map have tooltips which the user can display by hovering with the mouse. In some cases, you may want them to show up automatically when the Map loads.

## Solution

1. Loop the markers.
1. After the Map initializes, in its [events](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map#events), call the `.show()` method of their tooltips.

```dojo
<div id="map"></div>

<script>
	function createMap() {
		var map = $("#map").kendoMap({
			center: [30.268107, -97.744821],
			zoom: 3,
			layers: [{
				type: "tile",
				urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
				subdomains: ["a", "b", "c"],
				attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
			}],
			markerDefaults: { //make tooltips "sticky" by default
				tooltip: {
					autoHide: false
				}
			},
			markers: [{
				location: [30.268107, -97.744821],
				shape: "pinTarget",
				tooltip: {
					content: "Austin, TX"
				}
			}, {
				location: [40.7128, -74.0060],
				shape: "pinTarget",
				tooltip: {
					content: "New York, NY"
				}
			}],
			zoomEnd: function (e) { //when the user zooms or pans, re-show the tooltips
				showTooltips(e.sender);
			},
			panEnd: function (e) {
				showTooltips(e.sender);
			}
		}).data("kendoMap");
		return map;
	}

	$(document).ready(function () {
		var map = createMap();
		showTooltips(map); //show the tooltips initially
	});

	function showTooltips(map) {
		setTimeout(function () {
			var extent = map.extent(); //we use this to only show tooltips for markers that are visible
			for (var i = 0; i < map.markers.items.length; i++) {
				if (extent.contains(map.markers.items[i].options.location)) {
					map.markers.items[i].tooltip.show();//show the tooltips
				}
			}
		}, 500); //kinetic scrolling and loading new content can cause concurrency issues if no timeout is present. You can test smaller values if you like, though
	}
</script>

<style>
	/* Remove the manual Close button from the tooltips so the user cannot dismiss them as they are more like labels. */

	div.k-tooltip-button {
		display: none;
	}

	div.k-tooltip div.k-tooltip-content {
		padding-right: 0;
	}
</style>
```
