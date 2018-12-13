---
title: Cannot Display GeoJSON Coordinates in Proper Order for Bubble Type Layer in Map
description: The received GeoJSON data is handled in a reversed longitude-latitude order when displaying a bubble-type layer in a Kendo UI Map.
type: troubleshooting
page_title: Problem with GeoJSON Coordinates for Bubble-Type Map Layer Received in Reversed Order | Kendo UI Map
slug: map-reverse-location-coordinates
tags: kendo ui map, location, coordinates, longitude, latitude
ticketid: 1111871
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
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.2 504</td>
 </tr>
</table>

## Description

I want to draw a bubble layer on a Kendo UI Map from the GeoJSON response. Although I receive the data in `\[Longitude, Latitude\]` format, when the data is bound to the Map, the Map handles it in a reversed `\[latitude, longitude\]` order.

## Suggested Workarounds

The Kendo UI Map does not provide a built-in solution for achieving this behavior. However, you can still work around this issue by applying custom logic.

The Map accepts a `[Latitude, Longitude]` format for its locations field. When you receive the data in a reversed order, modify the array prior to the binding and use `schema.parse` to update the array.

```dojo
<!DOCTYPE html>
<html>
<head>
    <base href="https://demos.telerik.com/kendo-ui/map/bubble-layer">
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
                        var loc =  response[i].Location; // Location is the locationField with the coordinates
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
