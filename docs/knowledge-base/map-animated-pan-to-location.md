---
title: Animate Panning to Location on the Map
description: "An example demonstrating how to make a panning animation when particular coordinates are selected."
type: how-to
page_title: Animate Panning to Location on the Map - Kendo UI Map for jQuery
slug: map-animated-pan-to-location
tags: map, pan, panning, animate, animation, automatic
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Map for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2021.3.1109 version</td>
 </tr>
</table>

## Description

How can I animate the [`Kendo UI Map`](/controls/diagrams-and-maps/map/overview) to pan to a certain location smoothly?

## Solution

1. Create the map and retrieve the current longitude and latitude coordinates using the [`viewToLocation`](/api/javascript/dataviz/ui/map/methods/viewtolocation) method.
1. Use the current coordinates to determine if the map must be panned to the West or to the East to reach the destination.
1. Use the current coordinates to determine if the map must be panned to the North or to the South to reach the destination.
1. Change the default `pan step` of the map navigator to reduce the speed at which the map is panned.
1. Use the JavaScript [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) function alongside the internal `_pan` method to smoothly pan the map in the desired location.

The following example demonstrates the full implementation of the suggested approach.

```dojo
<input id="country" />
<div id="map" style="width: 950px; height: 750px;"></div>
<script>

    let coordinates = [{
        country: "United States",
        lat: 39.7837304,
        long: -100.445882
    }, {
        country: "China",
        lat: 35.000074,
        long: 104.999927
    }, {
        country: "United Kingdom",
        lat: 54.7023545,
        long: -3.2765753
    }];

    $("#country").kendoDropDownList({
        dataSource: coordinates,
        dataTextField: "country",
        change: function (e) {
            let lat = this.dataItem().lat;
            let long = this.dataItem().long;

            animateMap(lat, long);
        }
    });

    $("#map").kendoMap({
        zoom: 4,
        center: [0, 0],
        layers: [{
            type: "tile",
            urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }]
    });

    function animateMap(countryLat, countryLong) {
        var map = $("#map").data("kendoMap");

        // Get the current long and lat.
        let lng = map.viewToLocation([475, 325]).round().lng;
        let lat = map.viewToLocation([475, 325]).round().lat;

        // Find out if the map will be panned to the West or to the East.
        let lngStep = lng > countryLong ? -10 : 10;
        // Find out if the map will be panned to the North or to the South.
        let latStep = lat > countryLat ? -10 : 10;

        // The default pan step is 100. Increasing this value will increase the speed at which the map is panned.
        map.navigator.options.panStep = 0.5;
        var lngPanning = window.setInterval(function () {
            map.navigator._pan(lngStep, 0);
            if (lngStep > 0) {
                if (lng >= countryLong) {
                    clearInterval(lngPanning);
                }
            } else {
                if (lng <= countryLong) {
                    clearInterval(lngPanning);
                }
            }

            lng = map.viewToLocation([475, 325]).round().lng;
        }, 0);

        var latPanning = window.setInterval(function () {
            map.navigator._pan(0, latStep);
            if (latStep > 0) {
                if (lat >= countryLat) {
                    clearInterval(latPanning);
                }
            } else {
                if (lat <= countryLat) {
                    clearInterval(latPanning);
                }
            }

            lat = map.viewToLocation([475, 325]).round().lat;
        }, 0);
    };

</script>
```
