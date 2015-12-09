---
title: Location
page_title: API reference for Kendo UI Map Location
---

# kendo.dataviz.map.Location : kendo.Class
Represents a geographic location.

## Constructor Parameters

### lat `Number`
The location latitude in decimal degrees.

### lng `Number`
The location longitude in decimal degrees.


## Class methods

### create
Creates a Location instance from various input types.

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

#### Parameters

##### lnglat `Array`
The [longitude, latitude] array.

#### Returns
`kendo.dataviz.map.Location` The Location instance.


### fromLatLng
Creates a Location instance from an [latitude, longitude] array.

#### Parameters

##### lnglat `Array`
The [latitude, longitude] array.

#### Returns
`kendo.dataviz.map.Location` The location instance.


## Fields

### lat `Number`
The location latitude in decimal degrees.

### lng `Number`
The location longitude in decimal degrees.


## Methods

### clone
Creates a new instance with the same coordinates.

#### Returns
`kendo.dataviz.map.Location` The new Location instance.


### destination

Calculates the [great-circle distance](http://en.wikipedia.org/wiki/Great-circle_distance)
to the given destination in meters.

#### Parameters

##### destination `kendo.dataviz.map.Location`
The destination location.

##### bearing `Number`
The bearing to the destination in decimal degrees.

#### Returns
`Number` The distance to the specified location in meters.


### distanceTo
Finds a destination at the given distance and bearing from this location.

#### Parameters

##### distance `Number`
The distance to the destination in meters.

##### bearing `Number`
The initial bearing to the destination in decimal degrees.

#### Returns
`kendo.dataviz.map.Location` The destination at the given distance and bearing.


### equals
Compares this location with another instance.

#### Parameters

##### location `kendo.dataviz.map.Location`
The location to compare with.

#### Returns
`Boolean` true if the location coordinates match; false otherwise.


### round
Rounds the location coordinates to the specified number of fractional digits.

#### Parameters

##### digits `Number`
Number of fractional digits.

#### Returns
`kendo.dataviz.map.Location` The current Location instance.


### toArray
Returns the location coordinates as an [lat, lng] array.

#### Returns
`Array` An array representation of the location, e.g. [39, -179]


### toString
Returns the location coordinates formatted as '{lat},{lng}'.

#### Returns
`String` A string representation of the location, e.g. "39,-179"


### wrap
Wraps the latitude and longitude to fit into the [0, 90] and [0, 180] range.

#### Returns
`kendo.dataviz.map.Location` The current Location instance.
