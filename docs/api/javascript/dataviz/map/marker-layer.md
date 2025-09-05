---
title: MarkerLayer
page_title: API reference for Kendo UI Map Layer
res_type: api
---

# kendo.dataviz.map.MarkerLayer : kendo.dataviz.map.Layer

Represents a data-bound marker layer.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example

    <div id="map"></div>
    <script>
        // Create a Map widget
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        // The map parameter is passed to the MarkerLayer constructor
        console.log("Map widget passed to marker layer:", map);
    </script>

### options `Object`
The layer options.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                // These options are passed to the MarkerLayer constructor
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston", population: 685094 },
                    { latlng: [40.7128, -74.0060], name: "New York", population: 8175133 }
                ],
                locationField: "latlng",
                titleField: "name",
                tooltip: {
                    content: "City: #= name # (Population: #= population #)"
                }
            }]
        });

        console.log("MarkerLayer created with specified options");
    </script>

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        // Access the owner Map widget through the map field
        console.log("Owner map widget:", markerLayer.map);
        console.log("Same as original map:", markerLayer.map === map);
    </script>

### items `Array`
An array of the markers currently loaded in this layer.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" },
                    { latlng: [34.0522, -118.2437], name: "Los Angeles" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        // Access the markers currently loaded in the layer
        console.log("Number of markers:", markerLayer.items.length);
        console.log("First marker:", markerLayer.items[0]);
        
        // Log all marker locations
        markerLayer.items.forEach((marker, index) => {
            console.log(`Marker ${index + 1}:`, marker.location());
        });
    </script>

## Methods

### add
Adds a Marker to the layer.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        // Create a new marker
        var newMarker = new kendo.dataviz.map.Marker([40.7128, -74.0060], {
            title: "New York"
        });
        
        // Add the marker to the layer
        markerLayer.add(newMarker);
        
        console.log("Marker added. Total markers:", markerLayer.items.length);
    </script>

#### Parameters

##### marker `kendo.dataviz.map.Marker`
The Marker instance to add.

### clear
Clears all Markers from the layer.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" },
                    { latlng: [34.0522, -118.2437], name: "Los Angeles" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        console.log("Markers before clear:", markerLayer.items.length);
        
        // Clear all markers from the layer
        markerLayer.clear();
        
        console.log("Markers after clear:", markerLayer.items.length);
    </script>

### hide
Hides the layer, if visible.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        // Hide the marker layer
        markerLayer.hide();
        console.log("Marker layer is now hidden");
        
        // Show it again after 2 seconds
        setTimeout(() => {
            markerLayer.show();
            console.log("Marker layer is now visible again");
        }, 2000);
    </script>

### remove
Removes a Marker from the layer.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        console.log("Markers before remove:", markerLayer.items.length);
        
        // Get the first marker and remove it
        var firstMarker = markerLayer.items[0];
        markerLayer.remove(firstMarker);
        
        console.log("Markers after remove:", markerLayer.items.length);
    </script>

#### Parameters

##### marker `kendo.dataviz.map.Marker`
The Marker instance to remove.

### setDataSource
Sets the data source of this layer.

#### Example - Set shape layer data source
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: ds,
                locationField: "latlng"
            }]
        });

        var ds = new kendo.data.DataSource({
            data: [{
                latlng: [0, 0]
            }]
        });

        var map = $("#map").data("kendoMap");
        var layer = map.layers[0];
        layer.setDataSource(ds);
    </script>

#### Parameters

##### dataSource `Object`
A live [DataSource](/api/javascript/data/datasource) instance
or its [configuration](/api/javascript/data/datasource#configuration) object.

### show
Shows the layer, if not visible.

#### Example

    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: [
                    { latlng: [42.3601, -71.0589], name: "Boston" },
                    { latlng: [40.7128, -74.0060], name: "New York" }
                ],
                locationField: "latlng"
            }]
        });

        var map = $("#map").data("kendoMap");
        var markerLayer = map.layers[0];
        
        // Hide the layer first
        markerLayer.hide();
        console.log("Marker layer hidden");
        
        // Show the marker layer
        setTimeout(() => {
            markerLayer.show();
            console.log("Marker layer is now visible");
        }, 1000);
    </script>

