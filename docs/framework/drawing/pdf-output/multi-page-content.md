---
title: Multi-Page Content
page_title: Multi-Page Content | Kendo UI Drawing Library
description: "Render multi-page content and apply manual or automatic page-breaking when you export files to PDF with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#multi-page-content, /framework/drawing/drawing-dom#automatic-page-breaking, /framework/drawing/drawing-dom#splitting-page-content
slug: multipagecontent_drawing
position: 6
---

# Multi-Page Content

The `drawing.drawDOM` allows you to create multi-page PDF content, specify manual page breaks and prevent page splitting.

* [Rendering multi-page content](#rendering-multi-page-content)
* [Automatic page breaking](#automatic-page-breaking)
* [Manual page breaking](#manual-page-breaking)
* [Preventing page breaking in elements](#preventing-page-breaking-in-elements)

## Rendering Multi-Page Content

To render a multiple-page PDF file, pass `multiPage: true` to the `Group` object, which you pass to `exportPDF` (master group). This group is then expected to contain in turn only `Group` shapes, one for each page (page groups). The PDF options that you pass to the master group apply to each page group, unless the page group overrides them.

You can override the following options:
- [`paperSize`](/api/javascript/drawing/pdfoptions/fields/papersize)
- [`margin`](/api/javascript/drawing/pdfoptions/fields/margin)
- [`landscape`](/api/javascript/drawing/pdfoptions/fields/landscape)

> If the `paperSize` option for the master group is set to `"auto"` and the page groups do not override it, the paper size for each individual page is determined by its corresponding group. This means that the pages of the final document might be of different sizes.

## Automatic Page Breaking

The `drawDOM` method supports automatic page breaking. To automatically implement the page breaks, set the [`paperSize`](/api/javascript/drawing/pdfoptions/fields/papersize) and [`margin`](/api/javascript/drawing/pdfoptions/fields/margin) options. You will still be able to apply the `forcePageBreak` configuration to manually specify the break points.

    <div id="grid"></div>
    <script>
      var data = [];
      for (var i = 1; i < 200; ++i) {
        data.push({ title: "Item " + i, id: i });
      }

      $("#grid").kendoGrid({ dataSource: data });

      drawing.drawDOM("#grid", {
        paperSize: "A4",
        margin: "2cm"
      }).then(function(group){
        drawing.pdf.saveAs(group, "grid.pdf");
      });
    </script>

## Manual Page Breaking

A page break occurs before each element that matches the `forcePageBreak` CSS selector of your choice. The option accepts CSS selectors that are passable to [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector). The following example demonstrates how to draw a multi-page Kendo UI Grid which matches elements with class `.page-break`.

```dojo
    <div id="grid" style="width: 900px;"></div>

    <script>
      $(document).ready(function() {
        var data = [];
        for (var i = 1; i < 50; ++i) {
          data.push({ title: "Item " + i, id: i });
        }

        $("#grid").kendoGrid({
          dataSource: data,
          rowTemplate: $("#rowTemplate").html()
        });

        kendo.drawing
        .drawDOM("#grid", { forcePageBreak: ".page-break" })
        .then(function(group){
          kendo.drawing.pdf.saveAs(group, "multipage.pdf")
        });
      });
    </script>

    <script id="rowTemplate" type="x/kendo-template">
      <!-- to every tenth row, add the "page-break" class -->
      <tr data-uid="#= uid #" class="#= (id%10 == 0 ? 'page-break' : '') #">
        <td>#: title #</td>
        <td>#: id #</td>
      </tr>
    </script>
```

## Preventing Page Breaking in Elements

To prevent specific elements from being split across pages, use the `keepTogether` option. `keepTogether` accepts CSS selectors that are passable to [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

All elements from the following example which have the `"prevent-split"` CSS class are kept within the boundaries of the pages and their content is not split. If they fall on a margin, they will be moved to the next page.

    drawing.drawDOM("#content", {
      paperSize: "A4",
      margin: "2cm",
      keepTogether: ".prevent-split"
    }).then(function(group){
      drawing.pdf.saveAs(group, "filename.pdf");
    });

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
