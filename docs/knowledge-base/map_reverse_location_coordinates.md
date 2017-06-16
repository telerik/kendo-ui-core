---
title: Reversed Coordinates for Bubble Type Layer with GeoJson in Map
description: A solution for displaying a bubble-type layer with reversed coordinates in a Kendo UI Map
type: troubleshooting
page_title: Show data for a bubble-type layer that is received as [Longitude, Latitude]
slug: map_reverse_location_coordinates
position: 0
tags: kendo ui map, location, coordinates, longitude, latitude
teampulseid:
ticketid: 1111871
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
  <td>Progress® Kendo UI® version</td>
  <td>Tested up to version 2017.2 504</td>
 </tr>
</table>

## Description

I need to draw a bubble from a GeoJSON response on a Kendo UI Map.

I am receiving the data in a _\[Longitude, Latitude\]_ format, but when the data is bound to the Kendo UI Map, it is handled as _\[latitude, longitude\]_.

## Solution

There is no built-in solution. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds

The Map excludes the location field in the _[Latitude, Longitude]_ format. If you are receiving the data in a reversed order, you should modify the array prior to the binding. You can use `schema.parse` to modify the array:

```html
<!DOCTYPE html>
<html>
<head>
    <base href="http://demos.telerik.com/kendo-ui/map/bubble-layer">
    <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <title></title>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.common-material.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.material.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.material.mobile.min.css" />

    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/kendo.all.min.js"></script>
</head>
<body>
<div id="example">
    <div id="map"></div>

    <script>
    function createMap() {

        $("#map").kendoMap({
            center: [45, 45],
            minZoom: 3,
            zoom: 4,
            wraparound: false,
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
            }, {
                type: "bubble",
                attribution: "Population data from Nordpil and UN Population Division.",
                style: {
                    fill: {
                        color: "#00f",
                        opacity: 0.4
                    },
                    stroke: {
                        width: 0
                    }
                },
                dataSource: {
                    transport: {
                        read: {
                            url: "../content/dataviz/map/urban-areas.json",
                            dataType: "json"
                        }
                    },
                  schema: {
                    parse: function(response) {
                      for (var i = 0; i < response.length; i++) {
                        var loc =  response[i].Location; //Location is the locationField with the coordinates
                        response[i].Location = [loc[1], loc[0]];
                      }
                      return response;
                    }
                  }
                },
                locationField: "Location",
                valueField: "Pop2010"
            }]
        });
    }

    $(document).ready(createMap);
    </script>
</div>
</body>
</html>

```
