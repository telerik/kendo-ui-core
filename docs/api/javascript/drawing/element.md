---
title: Element
page_title: API reference for Kendo UI Drawing API Element
res_type: api
---

# kendo.drawing.Element : kendo.Class

An abstract base class representing common members of all drawing elements.

## Constructor Parameters

### options `Object`
The configuration of this element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var options = {
            opacity: 0.7,
            visible: true,
            transform: geom.transform().scale(1.5, 1.5)
        };

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), options);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The clipping path for this element.

The path instance will be monitored for changes.
It can be replaced by calling the [clip](/api/javascript/drawing/element/methods/clip) method.

#### Example - setting clipping path on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            clip: clipPath,
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### cursor `String`
The element [CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

Applicable to an SVG output.

#### Example - set hand cursor on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            cursor: "pointer",
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### opacity `Number`
The element opacity.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            opacity: 0.3,
            fill: { color: "blue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 50]), {
            transform: geom.transform().rotate(45, [100, 75]),
            fill: { color: "green" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var visibleCircle = new draw.Circle(new geom.Circle([75, 75], 40), {
            visible: true,
            fill: { color: "red" }
        });

        var hiddenCircle = new draw.Circle(new geom.Circle([125, 75], 40), {
            visible: false,
            fill: { color: "blue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(visibleCircle);
        surface.draw(hiddenCircle);
    </script>

## Fields

### options `kendo.drawing.OptionsStore`
The configuration options of the drawing element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "purple" },
            opacity: 0.8
        });

        console.log("Element options:", circle.options);
        console.log("Fill color:", circle.options.fill.color);
        console.log("Opacity:", circle.options.opacity);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### parent `kendo.drawing.Group`
The parent group element, if any.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var group = new draw.Group();
        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "orange" }
        });

        group.append(circle);

        console.log("Circle parent:", circle.parent);
        console.log("Is parent a Group?", circle.parent instanceof draw.Group);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 60]), {
            fill: { color: "cyan" },
            transform: geom.transform().scale(1.5, 1.5)
        });

        var bbox = rect.bbox();
        console.log("Bounding box:", bbox);
        console.log("Origin:", bbox.origin);
        console.log("Size:", bbox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.

#### Example - setting clipping path on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            stroke: { color: "red", width: 1 }
        });

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        circle.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Example - clear clipping path
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        var circle = new draw.Circle(new geom.Circle([80, 80], 60), {
          clip: clipPath,
          stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        setTimeout(function() {
                circle.clip(null);
        }, 2000);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.

This is the rectangle that will fit around the actual rendered element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(50, 50).lineTo(150, 50).lineTo(150, 100).lineTo(50, 100).close();

        var circle = new draw.Circle(new geom.Circle([100, 100], 60), {
            clip: clipPath,
            fill: { color: "red" }
        });

        var clippedBBox = circle.clippedBBox();
        var bbox = circle.bbox();

        console.log("Regular bounding box:", bbox);
        console.log("Clipped bounding box:", clippedBBox);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping and transformations applied.

### containsPoint
Returns true if the shape contains the specified point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "lightblue" }
        });

        var pointInside = new geom.Point(100, 100);
        var pointOutside = new geom.Point(200, 200);

        console.log("Point (100,100) inside circle:", circle.containsPoint(pointInside));
        console.log("Point (200,200) inside circle:", circle.containsPoint(pointOutside));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### opacity
Gets or sets the element opacity.

#### Example - setting opacity on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path();
        path.moveTo(0, 0).lineTo(100, 100);
        path.opacity(0.5);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### transform
Gets or sets the transformation of the element.

#### Example - setting transformation on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path();
        path.moveTo(0, 0).lineTo(100, 100);

        path.transform(geom.transform().scale(2, 1));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "yellow" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        console.log("Initial visibility:", circle.visible());

        // Hide the element after 2 seconds
        setTimeout(function() {
            circle.visible(false);
            console.log("Visibility after hiding:", circle.visible());
        }, 2000);

        // Show it again after 4 seconds
        setTimeout(function() {
            circle.visible(true);
            console.log("Visibility after showing:", circle.visible());
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

