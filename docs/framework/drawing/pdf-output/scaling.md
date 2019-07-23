---
title: Scaling the Drawings
page_title: Scaling the Drawings | Kendo UI Drawing Library
description: "Scale the content that is exported to PDF with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#scaling-of-content
slug: scalingofcontent_drawing
position: 7
---

# Scaling the Drawings

The Drawing library enables you to export a PDF document that is bigger or smaller than its original elements.

The scaling feature is convenient when you generate a multi-page PDF output by using the automatic page-breaking feature. Because the original dimensions usually look too big in PDF, you can specify a suitable scale factor to get a better output for print. To scale the content when you export files to PDF, use the `scale` option from the Drawing library. While the `scale` setting affects the content, the output paper size and page margins remain the same. However, scaling affects the position of the headers and footers of page templates.

    kendo.drawing.drawDOM("#content", {
      paperSize: "A4",
      margin: "2cm",
      scale: 0.8
    }).then(function(group){
      kendo.drawing.pdf.saveAs(group, "filename.pdf");
    });

If you need different horizontal or vertical scale factors, pass either an array&mdash;`[ xScale, yScale ]`&mdash;or an object&mdash;`{ x: xScale, y: yScale }`.

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
