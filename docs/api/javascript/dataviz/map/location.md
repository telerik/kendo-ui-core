---
title: Location
page_title: API reference for Kendo UI Map Location
res_type: api
---

# kendo.dataviz.map.Location : kendo.Class

Represents a geographic location.

## Constructor Parameters

### lat `Number`
The location latitude in decimal degrees.


<div class="meta-api-description">
Specify or configure the geographic north–south coordinate using decimal degrees to position map elements such as markers, centers, or pins during initialization or setup. Enable setting the latitude value for locations to control map centering, adjust placement of map features based on geographic coordinates, and define spatial positioning in terms of latitude when creating or configuring maps. Use this parameter to control the y-axis coordinate on the globe for accurate placement and geographic reference in various mapping, navigation, and geolocation scenarios.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    console.log(loc.lat); // 40.7128
    </script>

### lng `Number`
The location longitude in decimal degrees.


<div class="meta-api-description">
Set or specify geographic longitude in decimal degrees when creating a location object or configuring map positioning, centering map views by longitude coordinates, defining marker placements with precise longitude values, initializing longitude as a parameter during location or map component setup, controlling east-west geographic positioning using decimal longitude for spatial context, inputting longitude degrees to locate points on maps, or establishing exact longitude settings in mapping applications and geographic data structures.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    console.log(loc.lng); // -74.0060
    </script>


## Class Methods

### create
Creates a Location instance from various input types.


<div class="meta-api-description">
Transform diverse geographical coordinates, including raw numbers, arrays, or structured objects, into standardized location objects compatible with mapping components. Enable parsing, normalization, and conversion of various input formats from user inputs, APIs, or existing data into a unified coordinate representation for location-based rendering or processing. Configure and generate location instances from mixed data types, ensuring compatibility and consistency across mapping tools, geolocation features, and coordinate transformations within applications.
</div>

#### Example

    <script>
    // Create from lat/lng coordinates
    var location1 = kendo.dataviz.map.Location.create(40.7128, -74.0060);
    
    // Create from array
    var location2 = kendo.dataviz.map.Location.create([40.7128, -74.0060]);
    
    // Create from existing Location
    var location3 = kendo.dataviz.map.Location.create(location1);
    
    console.log(location1.toString()); // "40.7128,-74.0060"
    </script>

#### Parameters

##### lat `Number|Array|kendo.dataviz.map.Location`
The location latitude in decimal degrees,
a [latitude, longitude] array or
an existing Location instance.

##### lng `Number` *optional*
The location longitude in decimal degrees.

#### Returns
`kendo.dataviz.map.Location` The Location instance, if valid.


### fromLngLat
Creates a Location instance from an [longitude, latitude] array.


<div class="meta-api-description">
Convert a longitude and latitude pair or coordinates array into a geographical location object that can be used for map interactions such as centering the map view, panning, adding markers, geocoding, reverse geocoding, or other spatial computations. This transformation from raw longitude-latitude data into a usable location entity supports precise positioning, navigation tasks, coordinate conversions, map annotations, and integration with mapping services requiring standardized location formats, enabling developers to handle geographic points effectively within various map APIs and location-based applications.
</div>

#### Example

    <script>
    var loc = kendo.dataviz.map.Location.fromLngLat([-74.0060, 40.7128]);
    console.log(loc.lat); // 40.7128
    console.log(loc.lng); // -74.0060
    </script>

#### Parameters

##### lnglat `Array`
The [longitude, latitude] array.

#### Returns
`kendo.dataviz.map.Location` The Location instance.


### fromLatLng
Creates a Location instance from an [latitude, longitude] array.


<div class="meta-api-description">
Create or generate a location object, point, or coordinate from numeric latitude and longitude values provided as an array or pair, enabling setting map center points, placing markers, converting geographic coordinates into usable location instances, transforming GPS or degree coordinates into location objects for mapping, geospatial positioning, or coordinate-based calculations, and supporting input formats where latitude comes before longitude for mapping components, navigation, or spatial data handling.
</div>

#### Example

    <script>
    var loc = kendo.dataviz.map.Location.fromLatLng([40.7128, -74.0060]);
    console.log(loc.lat); // 40.7128
    console.log(loc.lng); // -74.0060
    </script>

#### Parameters

##### lnglat `Array`
The [latitude, longitude] array.

#### Returns
`kendo.dataviz.map.Location` The location instance.


## Fields

### lat `Number`
The location latitude in decimal degrees.


<div class="meta-api-description">
Retrieve or bind the geographic latitude coordinate in decimal degrees for a map location, GPS point, or spatial data set, enabling access to the north-south position for mapping, geolocation, coordinate systems, navigation, or location-based services; control, read, or configure the latitude value from fields representing geographic positions within mapping, GPS tracking, or geospatial applications.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    console.log(loc.lat); // 40.7128
    
    // Modify latitude
    loc.lat = 41.8781;
    console.log(loc.lat); // 41.8781
    </script>

### lng `Number`
The location longitude in decimal degrees.


<div class="meta-api-description">
Specify, obtain, configure, or update the longitude value in decimal degrees for a geographic point to position markers accurately, center maps on a specific horizontal coordinate, calculate distances between points, or manage geospatial data. This longitude setting is essential for placing locations east or west, adjusting map views based on horizontal coordinates, performing navigation calculations, and integrating location-based services that require precise east-west positioning. Accessing or modifying this longitude coordinate enables control over map centering, marker placement, route planning, geofencing, and spatial analysis in mapping applications.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    console.log(loc.lng); // -74.0060
    
    // Modify longitude
    loc.lng = -87.6298;
    console.log(loc.lng); // -87.6298
    </script>


## Methods

### clone
Creates a new instance with the same coordinates.


<div class="meta-api-description">
Duplicate or copy a geographical coordinate point or position without altering the original data, enabling the creation of an independent Location object with identical latitude and longitude values. This operation supports scenarios where you need to replicate coordinates for calculations, transformations, or modifications without impacting the source location, useful for cloning position data, copying geospatial points, or creating backup instances of coordinate information while ensuring the original remains intact and unchanged.
</div>

#### Example

    <script>
    var original = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var cloned = original.clone();
    
    console.log(cloned.lat); // 40.7128
    console.log(cloned.lng); // -74.0060
    console.log(original === cloned); // false (different instances)
    </script>

#### Returns
`kendo.dataviz.map.Location` The new Location instance.


### destination

Calculates the [great-circle distance](https://en.wikipedia.org/wiki/Great-circle_distance)
to the given destination in meters.


<div class="meta-api-description">
Calculate or determine the shortest distance over the Earth's surface between two geographic points, compute the direct geodesic or great-circle distance from one location to another, measure the precise distance in meters between coordinates, find the minimal spherical distance for navigation or mapping purposes, convert geographic points into the shortest travel path estimation, enable distance calculation between latitude and longitude positions, set or retrieve the straight-line surface distance avoiding route paths, control or query for accurate earth curvature distance in meters, obtain spatial separation metrics between origin and target locations, and perform geographic spatial distance measurement using spherical geometry calculations.
</div>

#### Example

    <script>
    var newYork = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var destination = newYork.destination(1000, 45); // 1km at 45 degree bearing
    
    console.log("Destination:", destination.lat, destination.lng);
    console.log("Distance check:", newYork.distanceTo(destination));
    </script>

#### Parameters

##### destination `kendo.dataviz.map.Location`
The destination location.

##### bearing `Number`
The bearing to the destination in decimal degrees.

#### Returns
`Number` The distance to the specified location in meters.


### distanceTo
Finds a destination at the given distance and bearing from this location.


<div class="meta-api-description">
Calculate or determine the geographic endpoint given a starting coordinate by specifying how far and in what direction to travel; this functionality enables finding destination points based on distance and bearing inputs, useful for mapping routes, navigation waypoints, geospatial positioning, coordinate projection, distance-based location lookup, computing target points along a path, or determining endpoint coordinates from an origin location by setting travel distance and heading or angle parameters.
</div>

#### Example

    <script>
    var newYork = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var chicago = new kendo.dataviz.map.Location(41.8781, -87.6298);
    
    var distance = newYork.distanceTo(chicago);
    console.log("Distance from NYC to Chicago:", Math.round(distance), "meters");
    console.log("Distance in miles:", Math.round(distance * 0.000621371), "miles");
    </script>

#### Parameters

##### distance `Number`
The distance to the destination in meters.

##### bearing `Number`
The initial bearing to the destination in decimal degrees.

#### Returns
`kendo.dataviz.map.Location` The destination at the given distance and bearing.


### equals
Compares this location with another instance.


<div class="meta-api-description">
Compare two geographic coordinate points for equality, check if one location matches another, determine whether positions share identical latitude and longitude values, perform coordinate equality tests for map markers or GPS points, verify if two geographic locations are the same, enable position comparison for deduplication or updates in mapping contexts, control spatial equivalence of coordinates, test if locations correspond exactly, and confirm whether pairs of Location objects represent identical places.
</div>

#### Example

    <script>
    var location1 = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var location2 = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var location3 = new kendo.dataviz.map.Location(41.8781, -87.6298);
    
    console.log(location1.equals(location2)); // true
    console.log(location1.equals(location3)); // false
    </script>

#### Parameters

##### location `kendo.dataviz.map.Location`
The location to compare with.

#### Returns
`Boolean` true if the location coordinates match; false otherwise.


### round
Rounds the location coordinates to the specified number of fractional digits.


<div class="meta-api-description">
Adjust coordinate precision by rounding latitude and longitude or x and y values to a set number of decimal places, enabling control over decimal digits for consistent comparison, normalization, storage efficiency, and cleaner UI display of spatial data. This method helps round geographic or Cartesian coordinates to specified fractional digits, supporting use cases like minimizing floating-point variance, standardizing location data formats, optimizing data size, and improving visual readability in mapping applications. It’s useful when you need to configure or set precision for location data rounding, coordinate truncation, or digit control in any mapping or geospatial context.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.712812345, -74.006012345);
    console.log("Original:", loc.toString()); // "40.712812345,-74.006012345"
    
    loc.round(2);
    console.log("Rounded:", loc.toString()); // "40.71,-74.01"
    </script>

#### Parameters

##### digits `Number`
Number of fractional digits.

#### Returns
`kendo.dataviz.map.Location` The current Location instance.


### toArray
Returns the location coordinates as an [lat, lng] array.


<div class="meta-api-description">
Convert geographic coordinates or location points to a numeric array with latitude and longitude values in order, enabling retrieval of location data as a simple [lat, lng] array format for serialization, exporting to mapping services, binding to data structures, calculating distances, or integrating with geospatial APIs. This method supports transforming coordinate objects into standardized arrays useful for location handling in maps, geolocation processing, coordinate conversions, and spatial computations.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var coordinates = loc.toArray();
    
    console.log(coordinates); // [40.7128, -74.0060]
    console.log("Latitude:", coordinates[0]);
    console.log("Longitude:", coordinates[1]);
    </script>

#### Returns
`Array` An array representation of the location, e.g. [39, -179]


### toString
Returns the location coordinates formatted as '{lat},{lng}'.


<div class="meta-api-description">
Convert geographic coordinates from a location or map object into a concise, comma-separated string format that includes latitude and longitude in decimal degrees, preserving exact values and signs for use in URLs, display labels, data serialization, coordinate formatting, geocoding input, location sharing, and extracting compact positional information in string form. This functionality supports generating standardized coordinate strings for mapping, location APIs, and any scenario requiring a simple textual representation of geographic points with precise decimal notation and coordinate ordering from latitude to longitude.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    var formatted = loc.toString();
    
    console.log(formatted); // "40.7128,-74.0060"
    console.log("Location: " + loc); // "Location: 40.7128,-74.0060"
    </script>

#### Returns
`String` A string representation of the location, e.g. "39,-179"


### wrap
Wraps the latitude and longitude to fit into the [0, 90] and [0, 180] range.


<div class="meta-api-description">
Control and adjust geographic coordinates by normalizing or wrapping latitude and longitude values to fit within valid ranges, handle coordinate overflow across poles or the International Date Line, ensure locations remain numerically correct and consistent during binding or conversion processes, manage wrapping of geographic positions that exceed normal bounds, and configure location data to stay within standard geographic limits for mapping, geospatial calculations, coordinate transformation, and location-based services.
</div>

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(270, 400);
    console.log("Before wrap:", loc.toString()); // "270,400"
    
    loc.wrap();
    console.log("After wrap:", loc.toString()); // Wrapped coordinates
    </script>

#### Returns
`kendo.dataviz.map.Location` The current Location instance.
