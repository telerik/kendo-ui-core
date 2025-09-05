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

