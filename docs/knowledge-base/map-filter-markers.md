---
title: Filter Kendo UI Map Markers Dynamically
description: Dynamic filter for Map widget markers
type: how-to
page_title: Filtering Markers Layer in Kendo UI Map
slug: map-filter-markers
position: 
tags: Map, Filter, Markers
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Kendo UI Map</td>
	</tr>
</table>


## Description
I want to filter the Kendo UI Map markers layer dynamically.

## Solution
Since the markers layer will be added to the Map widget with the initialization, in order to filter the markers we will have to re-initialize the Map with the filtered data:

#### Example
````html
    <div id="example">
 
    <div id="map"></div>

    <script>
        function createMap() {
            $("#map").kendoMap({
                center: [30.268107, -97.744821],
                zoom: 15,
                layers: [{
                    type: "tile",
                    urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                    subdomains: ["a", "b", "c"],
                    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                                 "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>"
                }, {
                    type: "marker",
                    dataSource: {
                        transport: {
                            read: {
                                url: "../content/dataviz/map/store-locations.json",
                                dataType: "json"
                            }
                        },
                      filter: [{field: "name", operator: "startswith", value: "A"}]
                    },
                    locationField: "latlng",
                    titleField: "name"
                }],
              
            });
          
          setTimeout(function(){ //to simulate dynamic filtering 
            var map =$("#map").data("kendoMap");
            var options = map.options;
            
            options.layers[1].dataSource.filter = [{field: "name", operator: "startswith", value: "F"}]; // 1 points to the markers layer that we want to filter
            map.destroy();
            map.setOptions(options);
            $("#map").kendoMap(options);
          }, 1000)
        }

        $(document).ready(createMap);
    </script>
	</div>
````
