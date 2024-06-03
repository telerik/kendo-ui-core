---
title: Getting Started
page_title: jQuery Map Documentation - Getting Started with the Map
description: "Get started with the jQuery Map by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_map_component
position: 1
---

# Getting Started with the Map

This guide demonstrates how to get up and running with the Kendo UI for jQuery Map.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="map"></div>
    <script> 
        $("#map").kendoMap({
          center: [51.509865, -0.118092],
          zoom: 5,
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
          }],
          markers: [{
            location: [51.509865, -0.118092],
            shape: "pinTarget",
            tooltip: {
              content: "London, UK"
            }
          }]
        }); 
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page from which the Map component will be initialized. 

```html
<div id="map"></div>
```

## 2. Initialize the Map 

Next, initialize the Map from the `<div>` element. When you initialize the component, all settings of the Map will be provided in the script statement. You have to describe its layout, configuration and event handlers in JavaScript.


```html
    <div id="map"></div>
    <script>
      $("#map").kendoMap();
    </script>
```

When the basic initialization is completed, you can start adding additional configurations to the Map. 

## 3. Set the Map Layers

In this step, you need to configure the Map [`layers`](/api/javascript/dataviz/ui/map/configuration/layers). Layers serve to organize the information rendered in the component. For more details, check [the layers documentation page]({% slug maplayers_mapwidget %}).

```html
    <div id="map"></div>
    <script> 
        $("#map").kendoMap({
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
          }]
        }); 
    </script>
```

## 4. (Optional) Set the Map Center

Next, you can set the coordinates to center the Map to a specific location. You can pass latitude and longitude as parameters for the [`center`](/api/javascript/dataviz/ui/map/configuration/center) option. 

```html
    <div id="map"></div>
    <script> 
        $("#map").kendoMap({
          center: [51.509865, -0.118092],
          zoom: 5,
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
          }]
        }); 
    </script>
```

## 5. (Optional) Set the Markers

You can display a marker over a specific Point of Interest. Similar to the `layers` configuration, you can pass latitude and longitude as parameters to the [`markers`](/api/javascript/dataviz/ui/map/configuration/markers) configuration. You can also set a tooltip for the marker.

```html
    <div id="map"></div>
    <script> 
        $("#map").kendoMap({
          center: [51.509865, -0.118092],
          zoom: 5,
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
          }],
          markers: [{
            location: [51.509865, -0.118092],
            shape: "pinTarget",
            tooltip: {
              content: "London, UK"
            }
          }]
        }); 
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Map](https://demos.telerik.com/kendo-ui/map/index)

## See Also 

* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map/configuration/)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>