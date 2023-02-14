---
title: PDFjs Processing
page_title: PDFjs Processing
description: "Learn how to use PDF.js processing in the Telerik UI PDFViewer component for {{ site.framework }}."
previous_url: /helpers/pdf/pdfviewer/pdfjs-processing
slug: htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore
position: 2
---

# PDFjs Processing

By default, if no processing configuration is defined, the PDFViewer uses the PDF.js library.

[PDF.js](https://mozilla.github.io/pdf.js/) is an open-source project that is developed by Mozilla.

## Requirements

Add the PDF.js library scripts to the page.

## Basic Configuration

The following example demonstrates how to configure the PDFViewer to use PDF.js processing.

```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf
            .File(Url.Content("~/Content/web/pdfViewer/sample.pdf"))
        )
        .Height(1200)
    )
```
{% if site.core %}
```TagHelper
    <kendo-pdfviewer name="pdfviewer"
                     height="1200">
        <pdfjs-processing file="@Url.Content("~/shared/web/pdfViewer/sample.pdf")" />
    </kendo-pdfviewer>
```
{% endif %}
```scripts
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>
```

For a complete example, refer to the following demo:

* [PDFViewer PDFjs Processing Demo](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)

## Browser Support

PDF.js processing is not supported in Internet Explorer 9. To work properly in that browser version, PDF.js requires additional configuration.

    <script>
        // Specify the workerSrc property for Internet Explorer support.
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

## See Also

* [Server-Side API](/api/pdfviewer)
