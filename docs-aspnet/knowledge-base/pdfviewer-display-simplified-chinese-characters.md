---
title: Displaying Glyph Characters when Using PDFViewer
description: An example on how to render a PDF file that contains glyph characters through the Telerik UI for {{ site.framework }} PDFViewer.
type: how-to
page_title: Displaying Glyph Characters when Using PDFViewer
slug: pdfviewer-display-simplified-chinese-characters
tags: pdfviewer, pdf, font, glyph, simplified, chinese, characters, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} PDFViewer</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>

## Description

How can I load and display a PDF file that contains glyph characters in the Telerik UI for {{ site.framework }} PDFViewer?

## Solution

The PDF standard fonts cover only the basic ASCII character set. By design, if no alternate fonts are specified, [Kendo UI will bundle the DejaVu font family](https://docs.telerik.com/kendo-ui/framework/pdf/embedded-fonts#font-substitution). For this reason, if the PDF file contains glyph characters, they will not be rendered correctly when loading the file into the PDFViewer. 

The following example showcases how to proceed when the PDF file contains Simplified Chinese characters.

1. Include the ['SimSun' font family](https://learn.microsoft.com/en-us/typography/font-list/simsun) by using the CSS `font-face` declaration.

    ```
        <style>
            @@font-face {
                font-family: 'SimSun';
                    src: url('/SimSun-01.ttf') format('truetype');
                }

            #example {
                font-family: 'SimSun'; // Use the SimSun font for displaying and embedding in the PDF file.
            }
        </style>
    ```

1. Specify the `Character Mapping files (CMap)` in the PDFViewer declaration, which are used in the PDF.js library to map the 'SimSun' characters to their corresponding Unicode code points. Use the [`CMapUrl()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/pdfviewerpdfjsprocessingfilesettingsbuilder#cmapurlsystemstring) and [`CMapPacked()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/pdfviewerpdfjsprocessingfilesettingsbuilder#cmappackedsystemboolean) opions.

    ```HtmlHelper
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">
            @(Html.Kendo().PDFViewer()
                .Name("pdfviewer")
                .PdfjsProcessing(pdf => pdf
                    .File(c => c
                        .CMapUrl("https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/")
                        .CMapPacked(true)
                        .Url(Url.Content("~/Example.pdf"))
                    )
                )
                .Height(1200)
            )
        </div>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">
            <kendo-pdfviewer name="pdfviewer" height="1200">
                <pdfjs-processing 
                    c-map-url="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/" 
                    c-map-packed="true" 
                    file="@Url.Content("~/Example.pdf")" />
            </kendo-pdfviewer>
        </div>
    ```
    {% endif %}

## More {{ site.framework }} PDFViewer Resources

* [{{ site.framework }} PDFViewer Documentation]({%slug htmlhelpers_pdfviewer_aspnetcore%})

* [{{ site.framework }} PDFViewer Demos](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)

{% if site.core %}
* [{{ site.framework }} PDFViewer Product Page](https://www.telerik.com/aspnet-core-ui/pdf-viewer)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} PDFViewer Product Page](https://www.telerik.com/aspnet-mvc/pdf-viewer)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
* [Server-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/pdfviewer)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

