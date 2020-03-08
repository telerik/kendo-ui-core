---
title: Dimensions and CSS Units
page_title: Dimensions and CSS Units | Kendo UI Drawing Library
description: "Render dimensions and CSS units when you export content in PDF with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#dimensions-and-css-units
slug: dimensionscssunits_drawing
position: 9
---

# Dimensions and CSS Units

To ensure the proper rendering of dimensions and CSS units in PDF, use the `px` unit.

The usage of `cm`, `in`, `mm`, `pt`, or any other than `px` leads to unpredictable results. This section explains this counter-intuitive fact.

To draw the DOM, you inspect the computed styles of the elements and at that stage all dimensions are converted to pixels. For example, look at a `<div style='width: 1cm'>`. Assuming a correct display of the dots-per-inch (DPI) setting, this element has to be rendered by the browser on screen as being `1cm` wide. When you query the width in its computed style, however, you get back `37.78125px`. Note that this may vary depending on the display.

For simplicity, and since the computed style yields back pixels, the PDF generator keeps a 1:1 mapping between the screen pixels and the default PDF unit, which is the [typographic point](https://en.wikipedia.org/wiki/Point_%28typography%29) (`pt`). This means that the same element will be rendered to PDF with a length of `37.78125pt`. Here are the conversion rules for these units:

- `1 pt = 1/72 in` (points to inches)
- `1 in = 2.54 cm` (inches to centimeters)

If you put them together, you get:

```
37.78125 pt = 37.78125/72 in
            = 2.54 * 37.78125/72 cm
            = 1.33 cm
```

So, you specified you want 1cm but the actual size on PDF is 1.33cm which is quite a difference.

In conclusion, to get a predictable layout in PDF, apply pixels to set all your dimensions. Use the following rules to calculate the values:

- `N cm = N * 72/2.54 px`
- `N in = N * 72 px`

An exception to this are the `paperSize` and `margin` options that you pass to `drawDOM`. It is safe to use any units there since they have nothing to do with CSS or the display resolution.

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
