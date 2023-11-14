---
title: Overview
page_title: Drawing Overview - Kendo UI Drawing Library
description: "Learn about the Kendo UI Drawing API, the cross-browser vector graphics library of the framework."
slug: overview_kendoui_drawingapi
position: 0
---

# {{ site.product }} Drawing Overview

The [Kendo UI Drawing library (Drawing API)](https://demos.telerik.com/kendo-ui/drawing/index) is a cross-browser vector graphics library and provides a simple object model for building and manipulating visual scenes.

{% if site.has_cta_panels == true %}
{% include cta-panel-overview.html %}
{% endif %}

The Kendo UI Drawing library:
- Serves as a foundation of and as an extension point for the Kendo UI widgets which render data visualization such as Charts and Diagrams.
- Is also a standalone component that is suitable for building custom visualizations.
- Offers a [low-level API](/api/javascript/drawing)&mdash;a simple object model for building and manipulating visual scenes which can be rendered as SVG and PDF documents, Canvas elements, and PNG images.

To build a scene, you can create drawing elements such as curves, images, and text. Scene elements are live and respond to changes of their appearance and geometry. To render scenes on and off screen, use the drawing surface. Surfaces encapsulate specific browser technologies such as SVG or Canvas.

**Figure 1: Drawing library components**

![Kendo UI for jQuery Drawing API Components](images/components.png)

## Functionality and Features

* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})&mdash;The Drawing library enables you turn HTML elements into a drawing.
* [Exporting Drawings to Images]({% slug exportpng_kendoui_drawingapi %})&mdash;The Drawing library supports the export of drawings to bitmap images in a PNG file format.
* [Exporting Drawings to SVG]({% slug exportingtosvg_drawing %})&mdash;The Drawing library supports the export of drawings to a Scalable Vector Graphics (SVG) document.
* [PDF Output]({% slug pdfderawingexport_drawingapi %})&mdash;The Drawing library provides configuration options for handling and exporting content in PDF.
* [Limitations and Browser Support]({% slug supportedbrowsers_drawingapi %})&mdash;Learn about the limitations of the Drawing library.

## Next Steps

* [Getting Started with the Drawing Library]({% slug getting_started_kendoui_drawing %})

## See Also

* [jQuery Forums](https://www.telerik.com/forums/kendo-ui)
* [jQuery Blog](https://www.telerik.com/blogs/tag/jquery)
* [jQuery Videos](https://www.telerik.com/videos/kendo-jquery-ui)
* [jQuery Roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap)
* [jQuery Pricing](https://www.telerik.com/purchase/kendo-ui)
* [jQuery Training](https://learn.telerik.com/learn/course/external/view/elearning/30/kendo-ui-for-jquery-with-javascript)
