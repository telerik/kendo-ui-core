---
title: Drawing of Basic Shapes
page_title: Drawing of Basic Shapes | Kendo UI Drawing API
description: "Learn how to draw basic forms by using the Kendo UI Drawing API."
slug: basicshapes_drawingapi
position: 2
---

# Drawing of Basic Shapes

## Sample Case

Scenes are constructed from a set of built-in basic shapes. **Figure 1** below demonstrates a simple, static scene.

**Figure 1. Basic scene**

![Basic Scene](images/basic-scene.png)

In terms of the Drawing API this scene consists of a path (the violet border), text, and an image. The example below demonstrates the full code required to render the scene. Notice a number of structures that define the position, size, and appearance of each element.

###### Example

    <div id="surface" style="width: 250px; height: 165px;"></div>
    <script>
        // Import the Drawing API namespaces
        var geom = kendo.geometry;
        var draw = kendo.drawing;

        // Create the square border by drawing a straight path
        var path = new draw.Path({
            stroke: {
                color: "#9999b6",
                width: 2
            }
        });

        // The path is constructed using a chain of commands
        path.moveTo(0, 0)
            .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
            .close();

        // This rectangle defines the image position and size
        var imageRect = new geom.Rect(
            new geom.Point(5, 5),
            new geom.Size(50, 50)
        );

        // Create the image
        var imageUrl = "http://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/diego.jpg";
        var image = new draw.Image(imageUrl, imageRect);

        // Create the text
        var text = new draw.Text(
            "Diego Roel",
            new geom.Point(60, 25),
            { font: "bold 15px Arial" }
        );

        // Place all the shapes in a group
        var group = new draw.Group();
        group.append(path, image, text);

        // Translate the group
        group.transform(
            geom.transform().translate(50, 50)
        );

        // Create a drawing surface and render the scene
        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Walkthrough

This section demonstrates how to replicate the static scene from above and add an enclosing group for positioning.

### Import Namespaces

The example below demonstrates how to import the two namespaces.

###### Example

    var geom = kendo.geometry;
    var draw = kendo.drawing;

The `kendo.geometry` namespace contains primitives, such as:
* [`Point`](/api/javascript/geometry/point)
* [`Rect`](/api/javascript/geometry/rect)
* [`Size`](/api/javascript/geometry/size)

The `kendo.drawing` namespace contains elements, such as:
* [`Path`](/api/javascript/dataviz/drawing/path)
* [`Image`](/api/javascript/dataviz/drawing/image)
* [`Group`](/api/javascript/dataviz/drawing/group)

### Draw the Path

A [`Path`](/api/javascript/drawing/path) element is used to draw straight lines, curves, or a combination of both.

Set the stroke (line) color and width to match the picture, as demonstrated in the example below.

###### Example

    var path = new draw.Path({
        stroke: {
            color: "#9999b6",
            width: 2
        }
    });

The [`configuration`](/api/javascript/drawing/path#configuration) object can contain other appearance options as well.

Now construct the path by issuing the commands shown below.

###### Example

    path.moveTo(0, 0)
        .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
        .close();

Set the line initial position with a [`moveTo`](/api/javascript/drawing/path#methods-moveTo) command. The three sides are drawn by using the [`lineTo`](/api/javascript/drawing/path#methods-lineTo) commands. The last command [`closes`](/api/javascript/drawing/path#methods-close) the path, drawing a straight line to the initial position.

Since this is a rectangle, use the alternative [`fromRect`](/api/javascript/drawing/path#fromrect) static method, as demonstrated below.

###### Example

    var borderRect = new geom.Rect(
        new geom.Point(0, 0),
        new geom.Size(150, 65)
    );
    var path = draw.Path.fromRect(borderRect, {
        stroke: {
            color: "#9999b6",
            width: 2
        }
    });

### Draw the Image

The [`Image`](/api/javascript/drawing/image) element draws a bitmap image from a given URL. The image position and size is defined as a [`Rect`](/api/javascript/geometry/rect).

###### Example

    var imageRect = new geom.Rect(
        new geom.Point(5, 5),
        new geom.Size(50, 50)
    );

This statement can be shortened to the code shown below.

###### Example

    var imageRect = new geom.Rect([5, 5], [50, 50]);

> **Important**
>
> Any method that expects `Point` and `Size` also accepts `[x, y]` and `[width, height]` arrays.

Now create the image in the way demonstrated in the example below.

###### Example

    var imageUrl = "http://demos.telerik.com/content/dataviz/diagram/people/diego.jpg";
    var image = new draw.Image(imageUrl, imageRect);

### Draw the Text

The [`Text`](/api/javascript/drawing/text) element draws a single line of text. Appearance options, such as the font, are set through [`configuration`](/api/javascript/drawing/text#configuration).

###### Example
        var text = new draw.Text(
            "Diego Roel",
            new geom.Point(60, 25),
            { font: "bold 15px Arial" }
        );

The point defines the position of the top left corner.

### Group the Shapes

It is convenient to treat a group of shapes as a single entity. In this case, use a group to set the position of all elements at once. Create a [`Group`](/api/javascript/drawing/group) element and append the rest of the elements as children, as demonstrated in the example below.

###### Example

        var group = new draw.Group();
        group.append(path, image, text);

A transformation applies to all group children. In this case, it is a fairly simple translate. You effectively make the element coordinates relative by translating their parent group.

###### Example

        group.transform(
            geom.transform().translate(50, 50)
        );

### Render the Scene

The [`Surface.create`](/api/javascript/drawing/surface#create) method, as demonstrated in the example below, chooses an implementation that matches the capabilities of the browser.

###### Example

        <div id="surface" style="width: 250px; height: 165px;"></div>
        <script>
            var surface = draw.Surface.create($("#surface"));
            surface.draw(group);
        </script>

The default output is an SVG with fallback to Canvas or VML.

## See Also

Other articles on Kendo UI Drawing API:

* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [Export a Drawing in PDF]({% slug pdfderawingexport_drawingapi %})
* [Drawing of HTML Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Supported Browsers for Kendo UI Drawing API]({% slug drawingofhtmlelements_drawingapi %})
