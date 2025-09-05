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

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    console.log(loc.lat); // 40.7128
    </script>

### lng `Number`
The location longitude in decimal degrees.

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(40.7128, -74.0060);
    console.log(loc.lng); // -74.0060
    </script>


## Class Methods

### create
Creates a Location instance from various input types.

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

#### Example

    <script>
    var loc = new kendo.dataviz.map.Location(270, 400);
    console.log("Before wrap:", loc.toString()); // "270,400"
    
    loc.wrap();
    console.log("After wrap:", loc.toString()); // Wrapped coordinates
    </script>

#### Returns
`kendo.dataviz.map.Location` The current Location instance.
