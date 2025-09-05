---
title: Extent
page_title: API reference for Kendo UI Map Location
res_type: api
---

# kendo.dataviz.map.Extent : kendo.Class

Represents a geographic region defined by two extreme locations (North West and South East).

## Constructor Parameters

### nw `kendo.dataviz.map.Location|Array`
The North West extreme location.

#### Example

    <div id="map"></div>
    <script>
    var nwLocation = new kendo.dataviz.map.Location(42.3601, -71.0589); // Boston
    var seLocation = new kendo.dataviz.map.Location(40.7128, -74.0060); // New York
    var extent = new kendo.dataviz.map.Extent(nwLocation, seLocation);
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 8
    });
    </script>

### se `kendo.dataviz.map.Location|Array`
The South East extreme location.

#### Example

    <div id="map"></div>
    <script>
    var nwLocation = new kendo.dataviz.map.Location(42.3601, -71.0589); // Boston  
    var seLocation = new kendo.dataviz.map.Location(40.7128, -74.0060); // New York
    var extent = new kendo.dataviz.map.Extent(nwLocation, seLocation);
    
    console.log("SE Location:", extent.se);
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 8
    });
    </script>


## Class Methods

### create
Creates a Location instance.

#### Example

    <div id="map"></div>
    <script>
    // Create extent using two locations
    var extent1 = kendo.dataviz.map.Extent.create(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    // Create extent using arrays
    var extent2 = kendo.dataviz.map.Extent.create([42.3601, -71.0589], [40.7128, -74.0060]);
    
    // Create extent using full array format [NW lat, NW lng, SE lat, SE lng]
    var extent3 = kendo.dataviz.map.Extent.create([42.3601, -71.0589, 40.7128, -74.0060]);
    
    $("#map").kendoMap({
        center: extent1.center(),
        zoom: 8
    });
    </script>

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

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    console.log("North West location:", extent.nw);
    console.log("Latitude:", extent.nw.lat);
    console.log("Longitude:", extent.nw.lng);
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 8
    });
    </script>

### se `kendo.dataviz.map.Location`
The South East extreme location.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    console.log("South East location:", extent.se);
    console.log("Latitude:", extent.se.lat);
    console.log("Longitude:", extent.se.lng);
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 8
    });
    </script>


## Methods

### contains
Tests if a location is contained within the extent.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    var testLocation1 = new kendo.dataviz.map.Location(41.4993, -81.6944); // Cleveland (inside)
    var testLocation2 = new kendo.dataviz.map.Location(25.7617, -80.1918); // Miami (outside)
    
    console.log("Cleveland is in extent:", extent.contains(testLocation1)); // true
    console.log("Miami is in extent:", extent.contains(testLocation2));    // false
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 6
    });
    </script>

#### Parameters

##### location `kendo.dataviz.map.Location`
The location to test for.

#### Returns

`Boolean` true if the extent contains the location, false otherwise.


### containsAny
Tests if any of the locations is contained within the extent.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    var testLocations = [
        new kendo.dataviz.map.Location(25.7617, -80.1918), // Miami (outside)
        new kendo.dataviz.map.Location(32.7767, -96.7970), // Dallas (outside)
        new kendo.dataviz.map.Location(41.4993, -81.6944)  // Cleveland (inside)
    ];
    
    console.log("Any location in extent:", extent.containsAny(testLocations)); // true
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 6
    });
    </script>

#### Parameters

##### locations `Array`
An array of [locations](/api/javascript/dataviz/map/location) to test for.

#### Returns

`Boolean` true if the extent contains any of the locations, false otherwise.


### center
Returns the center of the extent.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    var centerLocation = extent.center();
    console.log("Center latitude:", centerLocation.lat);
    console.log("Center longitude:", centerLocation.lng);
    
    $("#map").kendoMap({
        center: centerLocation,
        zoom: 8
    });
    </script>

#### Returns

`kendo.dataviz.map.Location` The extent center location.


### include
Grows the extent, if required, to contain the specified location.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    console.log("Original extent center:", extent.center());
    
    // Include a location outside the current extent
    var washingtonDC = new kendo.dataviz.map.Location(38.9072, -77.0369);
    extent.include(washingtonDC);
    
    console.log("Extended extent center:", extent.center());
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 6
    });
    </script>

#### Parameters

##### location `kendo.dataviz.map.Location`
The location to include in the extent.


### includeAll
Grows the extent, if required, to contain all specified locations.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    console.log("Original extent center:", extent.center());
    
    // Include multiple locations outside the current extent
    var newLocations = [
        new kendo.dataviz.map.Location(38.9072, -77.0369), // Washington DC
        new kendo.dataviz.map.Location(25.7617, -80.1918), // Miami
        new kendo.dataviz.map.Location(41.8781, -87.6298)  // Chicago
    ];
    
    extent.includeAll(newLocations);
    
    console.log("Extended extent center:", extent.center());
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 4
    });
    </script>

#### Parameters

##### locations `Array`
The locations to include in the extent.


### edges
Returns the four extreme locations of the extent.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    var edges = extent.edges();
    console.log("North West:", edges.nw);
    console.log("North East:", edges.ne);
    console.log("South East:", edges.se);
    console.log("South West:", edges.sw);
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 8
    });
    </script>

#### Returns

`Object` An object with `nw`, `ne`, `se` and `sw` [locations](/api/javascript/dataviz/map/location).


### toArray
Returns the four extreme locations of the extent as an array.

#### Example

    <div id="map"></div>
    <script>
    var extent = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    var extentArray = extent.toArray();
    console.log("Extent as array:", extentArray);
    console.log("North West:", extentArray[0]);
    console.log("North East:", extentArray[1]);
    console.log("South East:", extentArray[2]);
    console.log("South West:", extentArray[3]);
    
    $("#map").kendoMap({
        center: extent.center(),
        zoom: 8
    });
    </script>

#### Returns

`Array` An array with [NW, NE, SE, SW] [locations](/api/javascript/dataviz/map/location).


### overlaps
Tests if the given extent overlaps with this instance.

#### Example

    <div id="map"></div>
    <script>
    var extent1 = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(42.3601, -71.0589), // Boston
        new kendo.dataviz.map.Location(40.7128, -74.0060)  // New York
    );
    
    var extent2 = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(41.4993, -81.6944), // Cleveland
        new kendo.dataviz.map.Location(39.9612, -82.9988)  // Columbus
    );
    
    var extent3 = new kendo.dataviz.map.Extent(
        new kendo.dataviz.map.Location(25.7617, -80.1918), // Miami
        new kendo.dataviz.map.Location(30.3322, -81.6557)  // Jacksonville
    );
    
    console.log("Extent1 overlaps with Extent2:", extent1.overlaps(extent2)); // true
    console.log("Extent1 overlaps with Extent3:", extent1.overlaps(extent3)); // false
    
    $("#map").kendoMap({
        center: extent1.center(),
        zoom: 6
    });
    </script>

#### Parameters

##### extent `kendo.dataviz.map.Extent`
The extent to test with.

#### Returns

`Boolean` true if the extents overlap, false otherwise.

