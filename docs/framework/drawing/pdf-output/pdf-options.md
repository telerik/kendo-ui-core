---
title: PDF Options
page_title: PDF Options | Kendo UI Drawing Library
description: "Specify the basic parameters of the output file when you generate content with the Kendo UI Drawing library."
previous_url: /framework/drawing/pdf-output#pdf-options
slug: configuration_drawing
position: 2
---

# PDF Options

The Drawing library provides options for specifying the basic parameters of the generated PDF file.  

- `paperSize`&mdash;This option can be either a paper name, such as A4, an array of two numbers, such as paper width and height, or `"auto"`. By default, it is `"auto"`, which means the paper size will be just enough to fit the drawing. If numbers are specified, they are assumed to be in a typographic points unit. A point is 1/72 of an inch. Strings of the form `297mm`" can also be used. The supported units are `mm`, `cm`, `in` and `pt`. The available paper sizes are: `A0-A10`, `B0-B10`, `C0-C10`, `Executive`, `Folio`, `Legal`, `Letter`, `Tabloid`.
- `margin`&mdash;This option indicates the paper margins. It must be an object containing `top`, `left`, `right`, and `bottom` numbers which specify the paper margins. Again, if numbers are passed, they are assumed to be in points. By using strings you can specify units. When `paperSize` is `"auto"`, the dimensions are adjusted to include the margin.
- `landscape` (Boolean, default `false`)&mdash;If `true` is specified, the paper dimensions will be rotated if needed, so that the width is the larger edge.
- `title`, `author`, `subject`, `keywords`, `creator`&mdash;These are the optional strings to be included in the PDF information dictionary.
- `date`&mdash;This `Date` object is optional and specifies the creation date of the document. The default value is the current date/time (`new Date()`).
- `multiPage` (Boolean, default `false`)&mdash;Pass `true` to enable support for multiple page output, which is explained in the next section.

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
