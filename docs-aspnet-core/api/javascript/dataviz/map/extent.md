---
title: Extent
page_title: API reference for Kendo UI Map Location
---

# kendo.dataviz.map.Extent : kendo.Class
Represents a geographic region defined by two extreme locations (North West and South East).

## Constructor Parameters

### nw `kendo.dataviz.map.Location|Array`
The North West extreme location.

### se `kendo.dataviz.map.Location|Array`
The South East extreme location.


## Class methods

### create
Creates a Location instance.

#### Parameters

##### a `kendo.dataviz.map.Location|Array`
The extent North West extreme location or a [latitude, longitude] array.

Alternatively, specify the full extent as an array of four elements
([NW lat, NW long, SE lat, SE long]) and omit the second parameter:

##### b `kendo.dataviz.map.Location|Array` *optional*
The extent South East extreme location,
or an [latitude, longitude] array.

#### Returns
`kendo.dataviz.map.Extent` The Extent instance, if valid.


## Fields

### nw `kendo.dataviz.map.Location`
The North West extreme location.

### se `kendo.dataviz.map.Location`
The South East extreme location.


## Methods

### contains
Tests if a location is contained within the extent.

#### Parameters

##### location `kendo.dataviz.map.Location`
The location to test for.

#### Returns
`Boolean` true if the extent contains the location, false otherwise.


### containsAny
Tests if any of the locations is contained within the extent.

#### Parameters

##### locations `Array`
An array of [locations](location) to test for.

#### Returns
`Boolean` true if the extent contains any of the locations, false otherwise.


### center
Returns the center of the extent.

#### Returns
`kendo.dataviz.map.Location` The extent center location.


### include
Grows the extent, if required, to contain the specified location.

#### Parameters

##### location `kendo.dataviz.map.Location`
The location to include in the extent.


### includeAll
Grows the extent, if required, to contain all specified locations.

#### Parameters

##### locations `Array`
The locations to include in the extent.


### edges
Returns the four extreme locations of the extent.

#### Returns
`Object` An object with `nw`, `ne`, `se` and `sw` [locations](location).


### toArray
Returns the four extreme locations of the extent as an array.

#### Returns
`Array` An array with [NW, NE, SE, SW] [locations](location).


### overlaps
Tests if the given extent overlaps with this instance.

#### Parameters

##### extent `kendo.dataviz.map.Extent`
The extent to test with.

#### Returns
`Boolean` true if the extents overlap, false otherwise.

