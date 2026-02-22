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


<div class="meta-api-description">
How do I set the initial viewport of a Kendo UI map with jQuery? Define or initialize the map’s visible area, region, or bounds by specifying the upper-left or northwest corner coordinates during map setup or initialization, enabling control over the map’s initial viewport, geographic extent, boundary limits, or spatial coverage using location coordinates or geographic points.
</div>

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


<div class="meta-api-description">
What is the purpose of the se parameter in Kendo UI for jQuery's map configuration? Specify or configure the geographic bounding box’s south-east corner coordinates or location for map boundary definition, enabling control over the map’s lower-right or south-eastern extremes when setting spatial limits, defining the extent area, or initializing the map view with a precise south-east boundary point, including setting or adjusting map coverage, coordinate ranges, or spatial extents focused on the south-east edge during map or extent construction tasks.
</div>

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


<div class="meta-api-description">
How do I create a new location object for Kendo UI mapping? Generate or instantiate a coordinate or geographic point object for mapping or spatial calculations by creating a new location or position instance, enabling precise definition of points, centers, vertices, or coordinates to use with map interfaces, geometry operations, geospatial APIs, or spatial data manipulation. This method helps set, build, or configure coordinate objects for use in mapping functions, spatial analysis, or location-based computations, supporting tasks like defining map points, geometry vertices, or central positions within spatial datasets.
</div>

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


<div class="meta-api-description">
How do I set the northwest corner of my Kendo UI map's visible boundary? Configure or retrieve the top-left coordinate representing the northwest corner of a map’s visible boundary, enabling precise control over geographic bounding boxes, map viewport extents, or spatial area limits defined by latitude and longitude or point objects. Access or update the map’s northwest edge position to set or read the bounding rectangle, control map panning limits, adjust visible regions, or dynamically modify the upper-left geographic point within the current map extent for geospatial calculations, viewport adjustments, or boundary checks.
</div>

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


<div class="meta-api-description">
How to get the south-east corner coordinate of a map extent using Kendo UI for jQuery? Accessing or retrieving the south-east corner coordinate, lower-right point, or bottom-right location of a geographical extent or bounding box for maps, areas, or spatial data; configuring or querying the extreme south-east boundary, corner, or coordinate for map extents, viewport limits, spatial ranges, or geographic regions; extracting longitude and latitude values defining the bottom-right edge or south-east bounds for mapping components, geographic information systems, or spatial extent calculations; obtaining the farthest south-east position or lower-right coordinate for display, zoom, pan, clipping, or geographic region definitions.
</div>

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


<div class="meta-api-description">
How do I check if a point is inside a specific map extent using the Kendo UI for jQuery Extent.contains method? Check if a geographic coordinate or location falls within the boundaries of a defined rectangular area or bounding box on a map, enabling point-in-rectangle testing, spatial containment verification, and geographic hit detection by returning true or false outcomes. This functionality supports tasks like validating if coordinates lie inside specified map extents, filtering points based on spatial inclusion, bounding area checks, and spatial queries to confirm if positions are inside or outside a given extent region in mapping and GIS applications.
</div>

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


<div class="meta-api-description">
How do I check if any points in my collection intersect with a defined spatial boundary using Kendo UI for jQuery? Check if at least one coordinate, location, or point from a collection intersects, lies inside, or overlaps a defined spatial boundary or bounding box, enabling geospatial validation, filtering of coordinate arrays, quick containment testing, boundary inclusion checks, or spatial short-circuit operations to confirm presence within an area; useful for validating if any points fall within, inside, or are contained by geographic extents, rectangles, or map regions.
</div>

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


<div class="meta-api-description">
How do I calculate the center point of a map view in Kendo UI for jQuery? Retrieve or calculate the central coordinate, midpoint, or geographic center of a bounding box, extent, or map area for positioning, centering, aligning, or focusing map views; use this method to get the exact center point for panning, zooming, setting map center, adjusting viewports, or feeding location data into geospatial operations and map control functions.
</div>

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


<div class="meta-api-description">
How to dynamically expand a Kendo UI map extent to include new points while avoiding unnecessary changes? Expand or enlarge a geographical bounding box, area, or map extent by incorporating a specific point or coordinate, automatically adjusting the boundaries only if the location lies outside the current limits, while avoiding unnecessary changes when the point is already within the existing range. Enable dynamic resizing, update spatial boundaries, include additional locations, control map view extents to cover new coordinates, and ensure the visible or tracked area encompasses desired positions without altering internal points or shrinking the range. This functionality supports adding points to geographic extents, modifying bounding boxes on the fly, and managing the spatial scope of map components or geospatial queries.
</div>

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


<div class="meta-api-description">
How do I use Kendo UI map's includeAll method to adjust the viewport size dynamically? Expand or extend the current map view to encompass all specified coordinates or locations by adjusting the bounding box or viewport so every target point is included within the visible area; merge multiple extents, automatically grow the map boundaries, fit all markers or places into the displayed region, control viewport size dynamically to include a set of geographic points, aggregate locations into a single visible extent, and update map coverage to ensure no location lies outside the current view.
</div>

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


<div class="meta-api-description">
How do I get the corner points of a geographic area using Kendo UI map extent.edges method? Retrieve the four corner points or extreme locations of a geographic area or bounding box to calculate boundaries, fit map views, place markers precisely at edges, perform spatial comparisons, or determine minimum and maximum coordinates for mapping and geospatial computations. Access, extract, or get the extent corners for tasks involving rectangle bounds, coordinate limits, area edges, or boundary calculations in map rendering, view fitting, and spatial analysis workflows.
</div>

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


<div class="meta-api-description">
How do I convert a map extent into an array for spatial calculations in Kendo UI? Convert or extract the four corner coordinates, boundary points, or extreme locations of a geographic or map extent into an array format for use in exporting data, performing geometric calculations, bounding box comparisons, serialization, or supplying precise corner coordinates to mapping tools, spatial transformations, or coordinate-based operations within mapping libraries or GIS applications.
</div>

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


<div class="meta-api-description">
How to check if two map regions overlap in Kendo UI using JavaScript? Check if one geographic area or bounding box intersects, overlaps, or spatially collides with another extent by verifying whether two ranges, coordinates, or viewports share common space. Useful for detecting overlapping map regions, controlling layer visibility based on spatial intersection, managing bounding box collisions, filtering spatial data within intersecting areas, or confirming if two spatial extents overlap using boolean responses for conditional logic and viewport adjustments.
</div>

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

