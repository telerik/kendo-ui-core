---
title: Image
page_title: API reference for Kendo UI Drawing API Image
---

# kendo.drawing.Image : kendo.drawing.Element
Draws a bitmap image with a given source URL into the specified [rectangle](../geometry/rect).

#### Example - draw an image
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect(
            [10, 10],  // Position of the top left corner
            [249, 240] // Size of the rectangle
        );
        var image = new draw.Image("http://goo.gl/6ov8Gw", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

## Constructor Parameters

### src `String`
The source URL of the image.

### rect `kendo.geometry.Rect`
A rectange defining the position and size of the image.

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](element#configuration-clip)

### cursor `String`
The element cursor.
Inherited from [Element.cursor](element#configuration-cursor)

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](element#configuration-opacity)

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](element#configuration-transform)

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](element#configuration-visible)

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](element#methods-bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](element#methods-clip)

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](element#methods-clippedBBox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](element#methods-opacity)

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### src
Gets or sets the image source URL.

#### Example - changing the image source
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect(
            [10, 10],  // Position of the top left corner
            [240, 240] // Size of the rectangle
        );
        var image = new draw.Image("http://goo.gl/6ov8Gw", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);

        setTimeout(function() {
            image.src("http://goo.gl/10IzfV");
        }, 1000);
    </script>

#### Parameters

##### value `String`
The new source URL.

#### Returns
`String` The current image source URL.


### rect
Gets or sets the rectangle defines the image position and size.

#### Example - resizing the image
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect(
            [10, 10],  // Position of the top left corner
            [240, 240] // Size of the rectangle
        );
        var image = new draw.Image("http://goo.gl/6ov8Gw", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);

        setTimeout(function() {
            image.rect().setSize([120, 120]);
        }, 1000);
    </script>

#### Parameters

##### value `kendo.geometry.Rect`
The new image rectangle.

#### Returns
`kendo.geometry.Rect` The current image rectangle.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](element#methods-transform)

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](element#methods-visible)

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
