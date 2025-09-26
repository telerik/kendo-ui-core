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


<div class="meta-api-description">
Connect MarkerLayer to a specific Map instance by assigning the map owner during initialization, enabling seamless integration, association, or binding of marker layers to map components for accurate rendering, event handling, and interaction. Configure, set, attach, or link the map context to marker overlays to ensure proper synchronization, display, and responsiveness between markers and their parent map, supporting scenarios where markers must be tied to a particular map container or instance for visual placement, event propagation, or data consistency.
</div>

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


<div class="meta-api-description">
Configure initial settings, customization, and behavior during the creation of a marker layer by providing parameters that define appearance, data bindings, interactivity, and other foundational properties. Enable setting default styles, controls, and options upon instantiation to tailor how markers are rendered and managed from the start. Set up the layer’s initial configuration, including visual styling, event handling, and data source connections, ensuring the marker layer behaves and appears as required immediately after creation.
</div>

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


<div class="meta-api-description">
Accessing or retrieving the parent map instance associated with a marker layer enables interaction with the main map component for calling its methods, modifying or reading its properties, registering event listeners, or linking marker layers to their containing map object. This includes accessing the map reference linked to the marker layer to control map behavior, bind events, programmatically update map state, or integrate marker functionality within the overall map context after initialization or during runtime. Developers often look to get the map object related to a marker layer for manipulating zoom, pan, event handling, state synchronization, or dynamic updates tied to the map’s lifecycle and controls.
</div>

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


<div class="meta-api-description">
Access and manipulate the collection of markers displayed on a map by retrieving, iterating, adding, removing, or updating individual map markers dynamically within the marker layer. This array-like structure lets you control marker data, modify marker properties, manage markers displayed on maps, handle marker collections programmatically, and perform runtime updates or edits to markers for interactive map applications. Users searching for ways to adjust markers, work with map pins, control marker visibility, or update map annotations will find queries about marker collections, marker arrays, marker management, and dynamic marker handling relevant.
</div>

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


<div class="meta-api-description">
Add or insert markers dynamically into a map layer during runtime by programmatically placing marker instances or marker configuration objects, enabling control over marker collections, updating existing markers, managing marker placement and display on the map, configuring markers on the fly, and supporting interactive or automated marker additions without reloading the layer or map interface.
</div>

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


<div class="meta-api-description">
Remove all map markers at once, clear every marker icon or annotation from the map layer, reset the markers to an empty state, delete all current markers rendered on the map dynamically, erase or wipe out all displayed markers to refresh or update the layer, bulk remove visible marker objects for layer reinitialization, clear markers after data changes or viewport updates, flush all annotations from the map layer in one operation, disable or delete all point markers collectively to start fresh, and purge marker elements to manage map layer content quickly.
</div>

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


<div class="meta-api-description">
Control the visibility of marker collections on a map by disabling or hiding all markers in a specific marker group or layer, temporarily removing them from the map view without deleting them. Enable toggling marker display off for clutter reduction, focus on other map elements, or improve performance by hiding markers programmatically. Use commands to conceal all markers within a layer or group, suppress marker rendering, or switch off marker visibility dynamically during user interaction or UI updates, ensuring markers remain intact but invisible until shown again.
</div>

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


<div class="meta-api-description">
Delete or remove specific map markers programmatically from a collection or layer, control marker lifecycle by clearing, hiding, or replacing markers on a map, dynamically update displayed markers in response to user actions or events, enable removing individual points or pins from map overlays, manage markers within layers by calling removal functions or methods, handle marker cleanup to update visual map representations, configure marker visibility by deleting markers from the active set, and adjust marker data dynamically for interactive map experiences.
</div>

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


<div class="meta-api-description">
Assign, configure, or update the data source for map markers by connecting the marker layer to different datasets, collections, or remote APIs to load, bind, refresh, or replace marker information dynamically; this enables controlling the source of marker data, syncing changes, switching between data feeds, and triggering re-rendering of map elements to reflect updated location points, geographical overlays, or visual markers based on new or modified underlying data inputs.
</div>

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


<div class="meta-api-description">
Reveal or enable the visibility of a hidden marker layer on a map, making all its markers display dynamically during runtime; toggle or set a marker layer’s visibility to true to ensure markers appear after map initialization, activate or show previously hidden map layers, manage layer display status, and control the rendering of marker clusters or individual points on demand to update or refresh what’s visible without reloading the map.
</div>

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

