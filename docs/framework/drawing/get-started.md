---
title: Getting Started
page_title: Getting Started - Kendo UI for jQuery Drawing
description: "Get started with the jQuery Drawing by Kendo UI and learn how to create visual elements."
previous_url: /framework/drawing/dom-elements/basic-shapes, /framework/drawing/basic-shapes
slug: getting_started_kendoui_drawing
position: 1
---

# Getting Started with the Drawing Library

This guide demonstrates how to use the Kendo UI for jQuery Drawing library to draw shapes on the screen. The following scene consists of a [`Path`](/api/javascript/drawing/path) (the violet border), [`Text`](/api/javascript/drawing/text), and an [`Image`](/api/javascript/drawing/image).

After the completion of this guide, you will achieve the following result:

```dojo
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

      // Create the image. Uses a URL to create a bitmap image.
      var imageUrl = "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/diego.jpg";
      var image = new draw.Image(imageUrl, imageRect);

      // Create the text. The point defines the top left corner from where the text will be drawn.
      var text = new draw.Text(
        "Diego Roel",
        new geom.Point(60, 25),
        { font: "bold 15px Arial" }
      );

      // Place all the shapes in a group so they can be treated as a single entity.
      var group = new draw.Group();
      group.append(path, image, text);

      // Translate the group to make the coordinates of the element relative.
      group.transform(
        geom.transform().translate(50, 50)
      );

      // Create a drawing surface and render the scene.
      var surface = draw.Surface.create($("#surface"));
      surface.draw(group);
    </script>
```

## 1. Importing Namespaces

The following example demonstrates how to import the two namespaces.

    var geom = kendo.geometry;
    var draw = kendo.drawing;

The `kendo.geometry` namespace contains primitives, such as:
* [`Point`](/api/javascript/geometry/point)
* [`Rect`](/api/javascript/geometry/rect)
* [`Size`](/api/javascript/geometry/size)

The `kendo.drawing` namespace contains elements, such as:
* [`Path`](/api/javascript/drawing/path)
* [`Image`](/api/javascript/drawing/image)
* [`Group`](/api/javascript/drawing/group)

## 2. Drawing the Path

A [`Path`](/api/javascript/drawing/path) element is used for drawing straight lines, curves, or a combination of both.

1. Set the stroke width and color control of the line appearance. The [`configuration`](/api/javascript/drawing/path#configuration) object can contain other appearance options as well.

        var path = new draw.Path({
            stroke: {
                color: "#9999b6",
                width: 2
            }
        });

1. Construct the path by issuing the following commands.

  Set the line initial position with the [`moveTo()`](/api/javascript/drawing/path/methods/moveto) method. To draw the three sides, use the [`lineTo()`](/api/javascript/drawing/path/methods/lineto) method. The last [`close()`](/api/javascript/drawing/path/methods/close) method closes the path and draws a straight line to the initial position. Since this is a rectangle, use the alternative [`fromRect`](/api/javascript/drawing/path#fromrect) static method.

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

## 3. Drawing the Image

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

## 4. Drawing the Text

The [`Text`](/api/javascript/drawing/text) element draws a single line of text.

Set the appearance options, such as the font, by using [`configuration`](/api/javascript/drawing/text#configuration). The `Point` defines the position of the top left corner.

        var text = new draw.Text(
            "Diego Roel",
            new geom.Point(60, 25),
            { font: "bold 15px Arial" }
        );

## 5. Grouping the Shapes

It is convenient to treat a group of shapes as a single entity so that you can set the position of all elements at once.

1. Create a [`Group`](/api/javascript/drawing/group) element and append the rest of the elements as children. The transformation will apply to all group children.

        var group = new draw.Group();
        group.append(path, image, text);

1. Translate the parent group to make the element coordinates relative.

        group.transform(
            geom.transform().translate(50, 50)
        );

## 6. Rendering the Scene

To render the scene, use the [`Surface.create`](/api/javascript/drawing/surface#create) method. It selects an implementation that matches the capabilities of the browser. The default output is an SVG with a fallback to Canvas.

        <div id="surface" style="width: 250px; height: 165px;"></div>
        <script>
            var surface = draw.Surface.create($("#surface"));
            surface.draw(group);
        </script>

## Next Steps 

* [Drawing HTML Elements Overview]({% slug drawingofhtmlelements_drawingapi %})
* [API Reference for the Drawing Surface](/api/javascript/drawing/surface)
* [Demo Page for the Drawing Library](https://demos.telerik.com/kendo-ui/drawing/index)

## See Also 

* [Knowledge Base Section](/knowledge-base)


