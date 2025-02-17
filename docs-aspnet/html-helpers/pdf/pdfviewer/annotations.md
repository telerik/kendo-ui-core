---
title: Annotations
page_title: Telerik UI PDFViewer Documentation - Annotations
description: "Learn more about the annotations supported by the Telerik UI for {{ site.framework }} PDFViewer component."
slug: annotations_pdfviewer_aspnetcore
position: 5
---

# Annotations

Starting with version 2025.1.211, the PDFViewer provides a set of annotation types that allow you to enhance PDF documents. 

You can highlight important text with the colors of your choice and add notes as free text in the document. The component creates a dedicated layer for the annotations and includes them when downloading or printing the file.

## Working with Annotations

To use the built-in PDFViewer annotations:

1. Select the `Enable selection` tool.
1. Click on the `Annotations` button on the top-right of the toolbar, which opens an additional section below the toolbar containing the annotation tools. 
1. Choose any of the available tools.

Depending on which tool you choose, you can either double-click on a text to highlight it or click to insert a free text as a note. For both annotations, you can use a [ColorPicker]({% slug overview_colorpickerhelper_aspnetcore%}) editor to change the highlight color or the color of the inserted free text and a delete button if you wish to remove your annotation.

## Disabling the Annotations

The annotations tool is enabled by default. To remove them, configure the [toolbar]({% slug htmlhelpers_pdfviewer_toolbar_aspnetcore %}) settings to show the preferred tools.

## See Also

* [Basic Usage of the PDFViewer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer)
* [Server-Side API Reference of the PDFViewer for {{ site.framework }}](/api/pdfviewer)
{% if site.core %}
* [Server-Side TagHelper API Reference of the PDFViewer for {{ site.framework }}](/api/taghelpers/pdfviewer)
{% endif %}