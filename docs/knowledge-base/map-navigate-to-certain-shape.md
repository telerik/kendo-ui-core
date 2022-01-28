---
title: Navigate to certain shape
description: An example on how to programmatically navigate to certain shape of the Kendo UI Map.
type: how-to
page_title: Set Different Colors for Markers Based on Field Value | Kendo UI Map for jQuery
slug: map-navigate-to-certain-shape
tags: map, kendo, shape, ui, navigate, zoom, programmatically
ticketid: 1140119
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
  <td>version 2017.3.1026</td>
 </tr>
</table>

## Description

I have a Kendo UI Map with shapes from GeoJSON.

How can I navigate and zoom to shape object with an shape object reference?

## Suggested Workarounds

The Kendo UI Map does not provide a built-in solution for achieving this behavior. However, you can still achieve it with some code.

Find the shape object from the data source of the map, then calculate the center of the shape using its coordinates and navigate to the center of the shape using the [center method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map/methods/center).


The following example demonstrates the full implementation of the approach.
[Run the sample in dojo](https://dojo.telerik.com/IVituK)
```
    <div id="example">

      <div id="map"></div>
      <a id='nav' class='k-button'>Navigate to Bulgaria</a>
      <script src="https://demos.telerik.com/kendo-ui/content/dataviz/map/js/chroma.min.js"></script>
      <script>
        function createMap() {
          return $("#map").kendoMap({
            center: [30.2681, -97.7448],
            zoom: 2,
            layers: [{
              type: "shape",
              dataSource: {
                type: "geojson",
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/content/dataviz/map/countries-users.geo.json"
                }
              },
              style: {
                fill: {
                  opacity: 0.7
                }
              }
            }],
            shapeCreated: onShapeCreated,
            shapeFeatureCreated: onShapeFeatureCreated,
            shapeMouseEnter: onShapeMouseEnter,
            shapeMouseLeave: onShapeMouseLeave
          }).data('kendoMap');
        }

        var scale = chroma
        .scale(["white", "green"])
        .domain([1, 1000]);

        function onShapeCreated(e) {
          var shape = e.shape;
          var users = shape.dataItem.properties.users;
          if (users) {
            var color = scale(users).hex();
            shape.options.fill.set("color", color);
          }
        }

        function onShapeFeatureCreated(e) {
          e.group.options.tooltip = {
            content: e.properties.name,
            position: "cursor",
            offset: 10,
            width: 80
          };
        }

        function findCenter(coordinates){
          var minX = coordinates[0][0][0];
          var maxX = coordinates[0][0][0];
          var minY = coordinates[0][0][1];
          var maxY = coordinates[0][0][1];
          coordinates.forEach(function(shapeCoordinates){

            shapeCoordinates.forEach(function(pointCoordinates){
              if(minX > pointCoordinates[0]){
                minX = pointCoordinates[0];
              }

              if(maxX < pointCoordinates[0]){
                maxX = pointCoordinates[0];
              }              

              if(minY > pointCoordinates[1]){
                minY = pointCoordinates[1];
              }

              if(maxY < pointCoordinates[1]){
                minY = pointCoordinates[1];
              }              


            })
          })

          return [(minY+maxY)/2, (minX+maxX)/2];
        }

        function onShapeMouseEnter(e) {
          e.shape.options.set("fill.opacity", 1);
        }

        function onShapeMouseLeave(e) {
          e.shape.options.set("fill.opacity", 0.7);
        }

        $(function(){
          var map = createMap();

          $('#nav').on('click',function(){
            var bulgariaInfo = map.layers[0].dataSource.data().find(function(x){
              return x.properties.name == 'Bulgaria'
            });

            var center = findCenter(bulgariaInfo.geometry.coordinates);
            console.log(center)
             map.center(center).zoom(7);

          })
        })
      </script>
    </div>
</script>
```
