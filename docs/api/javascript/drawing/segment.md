---
title: Segment
page_title: API reference for Kendo UI Drawing API Segment
res_type: api
---

# kendo.drawing.Segment : kendo.Class

Defines a path segment with an anchor point and optional curve control points.

Segments are created implicitly by the [Path](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/drawing/path) lineTo and curveTo commands.

#### Example - accessing path segments
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 100)  // Creates segment #0
            .lineTo(200, 100)  // Creates segment #1
            .stroke("red", 1);

        // Moves the line starting point 50px to the left
        path.segments[0].anchor().translate(50, 0);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

## Constructor Parameters

### anchor `kendo.geometry.Point`
The anchor point of this segment.

If no control points are defined the path will pass through this point.


<div class="meta-api-description">
Set or configure the anchor point for a path segment to control where the segment passes through or ends within a drawing or vector graphic component, enabling alignment, connection, or positioning of segment endpoints by specifying the key coordinate used as the reference point; this can be used to define segment placement precisely, move endpoints to desired locations, link segments smoothly, or adjust path shapes by setting or adjusting the anchor parameter or coordinate value that the segment path follows or terminates at.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a segment with an anchor point
        var anchorPoint = new geom.Point(150, 100);
        var segment = new draw.Segment(anchorPoint);

        // Create a path and add the segment
        var path = new draw.Path()
            .moveTo(100, 100);
        path.segments.push(segment);

        console.log("Anchor point:", segment.anchor().x, segment.anchor().y);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### controlIn `kendo.geometry.Point` *optional*
The first curve control point of this segment, if any.


<div class="meta-api-description">
Configure or retrieve the initial control point for the incoming Bezier curve of a segment during creation, enabling setting or accessing the first handle that shapes the segment's starting curve. This includes defining, specifying, or reading the incoming curve control handle, adjusting the segment’s entry point tangents, or initializing the start control point of a segment’s bezier path. Common tasks involve controlling the smoothness, direction, or position of the segment’s incoming curve by setting constructor parameters for initial control handles or handles that influence the segment’s start curvature and flow.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a segment with anchor and first control point
        var anchorPoint = new geom.Point(200, 150);
        var controlOutPoint = new geom.Point(250, 50);
        var controlInPoint = new geom.Point(150, 50);
        var segment = new draw.Segment(anchorPoint, controlInPoint);

        // Create a curved path
        var path = new draw.Path()
            .moveTo(100, 150)
            .curveTo(controlOutPoint, controlInPoint, anchorPoint)
            .stroke("blue", 2);

        console.log("Control In point:", segment.controlIn().x, segment.controlIn().y);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### controlOut `kendo.geometry.Point` *optional*
The second curve control point of this segment, if any.


<div class="meta-api-description">
Specify or configure the outgoing control handle point for a path segment’s Bézier curve to shape or control the curve’s exit direction and smoothness, set or adjust the second control point used when drawing or customizing the outgoing curve segment, enable precise manipulation of curve handles to influence the path’s flow and curvature, define or control the outgoing tangent or handle for vector graphics or diagram segments to achieve smooth transitions and exact path shaping, customize how a segment’s curve departs by setting control points as part of segment construction for detailed curve editing and bezier path smoothing.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a segment with anchor and second control point
        var anchorPoint = new geom.Point(250, 150);
        var controlOutPoint = new geom.Point(300, 50);
        var segment = new draw.Segment(anchorPoint, undefined, controlOutPoint);

        // Create a curved path
        var path = new draw.Path()
            .moveTo(100, 150)
            .curveTo(anchorPoint, controlOutPoint)
            .stroke("green", 2);

        console.log("Control Out point:", segment.controlOut().x, segment.controlOut().y);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

## Methods

### anchor
Gets or sets the segment anchor point.

The setter returns the current Segment to allow chaining.


<div class="meta-api-description">
Control or retrieve the attachment point, pivot, or connection location of a line or segment within a diagram or graphical component, enabling precise positioning, alignment, or modification of where segments join or rotate. Configure the anchor position to set or update how segments connect or pivot on nodes or shapes, adjust the origin point for segment transformations, or query the current anchor to determine the exact point of attachment. Methods to get or set the anchor coordinate support chaining and allow dynamic control over segment linking behavior, connection hotspots, or pivot references in graphical flowchart, diagramming, or vector drawing contexts.
</div>

#### Parameters

##### value `kendo.geometry.Point`
The new anchor point.

#### Returns
`kendo.geometry.Point` The current anchor point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a path with segments
        var path = new draw.Path()
            .moveTo(100, 100)
            .lineTo(200, 100)
            .lineTo(200, 200)
            .stroke("red", 2);

        // Get the anchor point of the second segment
        var currentAnchor = path.segments[1].anchor();
        console.log("Current anchor:", currentAnchor.x, currentAnchor.y);

        // Set a new anchor point for the second segment
        path.segments[1].anchor(new geom.Point(250, 150));
        console.log("New anchor:", path.segments[1].anchor().x, path.segments[1].anchor().y);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>


### controlIn
Gets or sets the first curve control point of this segment.

The setter returns the current Segment to allow chaining.


<div class="meta-api-description">
Access, retrieve, modify, or update the incoming control point of a segment's curve in vector drawing or path manipulation tasks, enabling fine-tuned adjustment or dynamic setting of the segment's entry control handle for bezier curves, smoothing, or shape editing workflows. This function facilitates reading the first control handle of a path segment or setting it programmatically, supporting method chaining for streamlined updates when customizing or animating vector paths, curves, anchors, or graphic components. Use cases include configuring curve control points, controlling tangent vectors, or precisely shaping bezier segments by getting and setting the initial incoming handle.
</div>

#### Parameters

##### value `kendo.geometry.Point`
The new control point.

#### Returns
`kendo.geometry.Point` The current control point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a curved path
        var path = new draw.Path()
            .moveTo(100, 100)
            .curveTo([150, 50], [200, 50], [250, 100])
            .stroke("purple", 2);

        // Get the first control point of the curve segment
        var currentControlIn = path.segments[1].controlIn();
        console.log("Current controlIn:", currentControlIn.x, currentControlIn.y);

        // Set a new first control point
        path.segments[1].controlIn(new geom.Point(120, 30));
        console.log("New controlIn:", path.segments[1].controlIn().x, path.segments[1].controlIn().y);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>


### controlOut
Gets or sets the second curve control point of this segment.

The setter returns the current Segment to allow chaining.


<div class="meta-api-description">
Accessing or modifying the second control point of a curve segment's outgoing handle for precise curve shaping, configuring or retrieving the handle position that defines the segment's tangent and curvature, setting or getting the coordinate of the segment's second control handle to adjust Bezier curve geometry, manipulating the curve control point for smooth transitions and editing path contours, enabling updates to the curve's control vector for refined path drawing, obtaining or assigning the segment's outbound control point to control curve shape and flow, adjusting or querying the handle that influences the segment's outgoing curve direction, managing the second control handle parameters to customize curve tension or curvature, controlling or reading the second anchor handle position to fine-tune segment curve behavior, and chaining calls after setting the curve control point for streamlined segment geometry editing.
</div>

#### Parameters

##### value `kendo.geometry.Point`
The new control point.

#### Returns
`kendo.geometry.Point` The current control point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a curved path
        var path = new draw.Path()
            .moveTo(100, 150)
            .curveTo([150, 100], [200, 200], [250, 150])
            .stroke("orange", 2);

        // Get the second control point of the curve segment
        var currentControlOut = path.segments[0].controlOut();
        console.log("Current controlOut:", currentControlOut.x, currentControlOut.y);

        // Set a new second control point
        path.segments[0].controlOut(new geom.Point(180, 250));
        console.log("New controlOut:", path.segments[0].controlOut().x, path.segments[0].controlOut().y);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

