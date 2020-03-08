---
title: Customizing the Appearance
page_title: Customizing the Appearance | Kendo UI Drawing Library
description: "Customize the PDF document with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#customizing-the-appearance, /framework/drawing/drawing-dom#using-the, /framework/drawing/drawing-dom#rendering-off-screen-content
slug: customizingappearance_drawing
position: 4
---

# Customizing the Appearance

You can change the appearance of the PDF output as it appears in the browser while you draw the DOM elements by using CSS rules that apply only to the PDF output.

* [Using the `.k-pdf-export` class](#the-k-pdf-export-class)
* [Using the `<kendo-pdf-document>` element](#the-kendo-pdf-document-element)
* [Positioning content off the screen](#off-screen-content)

## Using the `.k-pdf-export` Class

This CSS class is applied to each individual page just before the drawing starts, and is removed shortly afterwards. For multipage exports, it is better to use the [`kendo-pdf-document`](#the-kendo-pdf-document-element) element because styles are applied to the whole export at once.

The following example demonstrates how to define a style that places a border around all paragraphs in the PDF output.

    <style>
      .k-pdf-export p {
        border: 2px solid black;
      }
    </style>

Since drawing is essentially synchronous and there is no timeout between the moment the class is added and the moment when it is removed, there will be no flash in the browser when the generation happens. One drawback of this approach is that you cannot add background images. The code in the following example will not work because images are cached upfront. If you want to add any background images, use the next option.

    <style>
      .k-pdf-export p {
        background: url("image.jpg");
      }
    </style>

## The `kendo-pdf-document` Element

The `<kendo-pdf-document>` approach only works when multi-page documents are requested, that is, only when either of `forcePageBreak` or `paperSize` is given. To make it work in the cases when you need only a single page, pass some dummy value to the `forcePageBreak` such as `forcePageBreak: "-"`.

When you use the `<kendo-pdf-document>` element, the DOM renderer clones the element and that clone handles the page-breaking without destroying the original content. The DOM renderer places the cloned element inside a custom `<kendo-pdf-document>` element which is hidden from the view. As a result, you can apply custom styles under `kendo-pdf-document` by restricting the rules to the elements. You can also use the `kendo-pdf-document` element to add images. Images are safe to add here.

    <style>
      kendo-pdf-document p {
        border: 2px solid black;
        background: url("image.jpg");
      }
    </style>

## Off-Screen Content

You can produce different content for export or hide some content from the user by positioning the container outside the screen. To use this functionality, the container has to be fully rendered.

The following example uses an absolute positioning to move the container off the screen.

    <style>
      #export-container {
        position: absolute;
        width: 800px;
        left: -10000px;
        top: 0;
      }
    </style>
    <div id="export-container">
        <div id="content">
            Lorem ipsum dolor sit amet, ad dolores conceptam eos, et his quodsi blandit. Quas sanctus omittam eos no, alia laoreet oportere eos no. Ex eum munere tritani atomorum, id natum assentior vis. Ad vitae prompta omnesque nam, nonumy sapientem principes cu est. Usu molestie vivendum ut, reque tation primis in sit, cum apeirian iudicabit te. Ad atqui luptatum pertinacia est.
        </div>
    </div>
    <script>
        kendo.drawing.drawDOM("#content", {
          paperSize: "A4",
          margin: "2cm"
        }).then(function(group){
          kendo.drawing.pdf.saveAs(group, "filename.pdf");
        });
    </script>

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
