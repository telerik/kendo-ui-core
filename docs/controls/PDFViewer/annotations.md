---
title: Annotations
page_title: jQuery PDFViewer Documentation - Annotations
description: "Get familiar with the Annotations feature provided by the Kendo UI for jQuery PDFViewer."
slug: annotations_pdfviewer
position: 6
---

# PDFViewer Annotations

Starting with Kendo UI R1 2025, the PDFViewer provides a set of annotation types to enhance PDF documents. Users can highlight important text with colors of their choice as well as add notes as free text in the document. The component creates a dedicated layer for the annotations and includes them when downloading or printing the file. 

## Working with Annotations

In order to use the annotations, you need to have clicked on the `Enable selection` tool. You can then click on the `Annotations` button on the toolbar, which will show a section containing the annotations tools. From here, depending on which tool you have chosen, you can either double-click on a text to highlight it, or click to insert a free text as a note. For both annotations, you are provided with a ColorPicker tool to change the highlight color or the color of the inserted free text, and a delete button if you wish to remove your annotation.

## Disabling the Annotations

The annotations tool is enabled by default. If you wish to exclude it, you can configure the [Toolbar]({% slug toolbar_pdfviewer_widget %}) to show only the tools you would like.

## See Also

* [Overview of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)