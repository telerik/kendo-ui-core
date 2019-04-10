---
title: Basic Shapes
page_title: Drawing of Basic Shapes | Kendo UI Drawing Library
description: "Learn how to draw basic forms by using the Kendo UI Drawing API."
slug: basicshapes_drawingapi
position: 2
---

# Basic Shapes

Scenes are constructed from a set of built-in basic shapes.

## Getting Started

The following **Figure 1** demonstrates a simple static scene.

**Figure 1: Basic scene**

![Basic Scene](images/basic-scene.png)

In terms of the Drawing API, the **Figure 1** scene consists of a path (the violet border), text, and an image. The following example demonstrates the full code required to render the scene. Notice a number of structures that define the position, size, and appearance of each element.

    <div id="surface" style="width: 250px; height: 165px;"></div>
    <script>
        // Import the Drawing API namespaces.
        var geom = kendo.geometry;
        var draw = kendo.drawing;

        // Create the square border by drawing a straight path.
        var path = new draw.Path({
            stroke: {
                color: "#9999b6",
                width: 2
            }
        });

        // The path is constructed using a chain of commands.
        path.moveTo(0, 0)
            .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
            .close();

        // This rectangle defines the image position and size.
        var imageRect = new geom.Rect(
            new geom.Point(5, 5),
            new geom.Size(50, 50)
        );

        // Create the image.
        var imageUrl = "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/diego.jpg";
        var image = new draw.Image(imageUrl, imageRect);

        // Create the text.
        var text = new draw.Text(
            "Diego Roel",
            new geom.Point(60, 25),
            { font: "bold 15px Arial" }
        );

        // Place all the shapes in a group.
        var group = new draw.Group();
        group.append(path, image, text);

        // Translate the group.
        group.transform(
            geom.transform().translate(50, 50)
        );

        // Create a drawing surface and render the scene.
        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Building Scenes

This section demonstrates how to replicate the static scene from above and add an enclosing group for positioning.

### Importing Namespaces

The following example demonstrates how to import the two namespaces.

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

### Drawing the Path

A [`Path`](/api/javascript/drawing/path) element is used for drawing straight lines, curves, or a combination of both.

1. Set the stroke (line) color and width to match the picture. The [`configuration`](/api/javascript/drawing/path#configuration) object can contain other appearance options as well.

        var path = new draw.Path({
            stroke: {
                color: "#9999b6",
                width: 2
            }
        });

1. Construct the path by issuing the commands shown below.

        path.moveTo(0, 0)
            .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
            .close();

1. Set the line initial position with a [`moveTo`](/api/javascript/drawing/path/methods/moveto) command. The three sides are drawn by using the [`lineTo`](/api/javascript/drawing/path/methods/lineto) commands. The last command [`closes`](/api/javascript/drawing/path/methods/close) the path, drawing a straight line to the initial position. Since this is a rectangle, use the alternative [`fromRect`](/api/javascript/drawing/path#fromrect) static method.

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

### Drawing the Image

The [`Image`](/api/javascript/drawing/image) element draws a bitmap image from a given URL.

1. Define the image position and size as a [`Rect`](/api/javascript/geometry/rect). Any method that expects `Point` and `Size` also accepts `[x, y]` and `[width, height]` arrays.

        var imageRect = new geom.Rect(
            new geom.Point(5, 5),
            new geom.Size(50, 50)
        );

        You can shorten the previous statement to the following code.

        var imageRect = new geom.Rect([5, 5], [50, 50]);

1. Create the image.

        var imageUrl = "https://demos.telerik.com/content/dataviz/diagram/people/diego.jpg";
        var image = new draw.Image(imageUrl, imageRect);

### Drawing the Text

The [`Text`](/api/javascript/drawing/text) element draws a single line of text.

Set the appearance options, such as the font, by using [`configuration`](/api/javascript/drawing/text#configuration). The `Point` defines the position of the top left corner.

        var text = new draw.Text(
            "Diego Roel",
            new geom.Point(60, 25),
            { font: "bold 15px Arial" }
        );

### Grouping the Shapes

It is convenient to treat a group of shapes as a single entity so that you can set the position of all elements at once.

1. Create a [`Group`](/api/javascript/drawing/group) element and append the rest of the elements as children. The transformation will apply to all group children.

        var group = new draw.Group();
        group.append(path, image, text);

1. Translate the parent group to effectively make the element coordinates relative.

        group.transform(
            geom.transform().translate(50, 50)
        );

### Rendering the Scene

To render the scene, use the [`Surface.create`](/api/javascript/drawing/surface#create) method. It selects an implementation that matches the capabilities of the browser. The default output is an SVG with a fallback to Canvas.

        <div id="surface" style="width: 250px; height: 165px;"></div>
        <script>
            var surface = draw.Surface.create($("#surface"));
            surface.draw(group);
        </script>

## See Also

* [Overview of the Drawing Library]({% slug overview_kendoui_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Supported Browsers for Kendo UI Drawing API]({% slug drawingofhtmlelements_drawingapi %})
