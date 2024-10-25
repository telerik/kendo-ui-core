---
title: Full Screen Button in PDFViewer
description: Learn how to create a full screen button that opens the PDF file in full screen when using the Telerik UI for {{ site.framework }} PDFViewer.
type: how-to
page_title: Full Screen Button in PDFViewer
slug: pdfviewer-full-screen-button
tags: pdfviewer, full screen, button, open, file
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>

## Description
How can I add a button that opens the PDF file in full screen when using the PDFViewer component?

## Solution
1. Create a custom button in the `Toolbar()` configuration and specify a toggle event handler.
2. Use the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen) and [`exitFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen) methods to toggle the fullscreen mode.

```HtmlHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    @(Html.Kendo().PDFViewer().Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf
            .File(c => c.Url(Url.Content("~/Document.pdf")))
        )
        .Toolbar(tb => tb.Items(item => item
            .Add()
            .Name("myCustomTool")
            .Icon("fullscreen")
            .Togglable(true)
            .Type("button")
            .Toggle("toggleBtn")
        ))
        .Height(1200)
    )
```
{% if site.core %}
```TagHelper
     @addTagHelper *, Kendo.Mvc

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <kendo-pdfviewer name="pdfviewer" height="1200">
        <pdfjs-processing file="@Url.Content("~/Dpocumet.pdf")" />
        <toolbar>
            <pdfviewer-toolbar-items>
                <pdfviewer-toolbar-item name="myCustomTool" icon="fullscreen" togglable="true" type="button" toggle="toggleBtn">
                </pdfviewer-toolbar-item>
            </pdfviewer-toolbar-items>
        </toolbar>
    </kendo-pdfviewer>
```
{% endif %}
```Script
<script>
    function toggleBtn(ev) {
        var viewerElement = kendo.widgetInstance($("#pdfviewer")).element[0];
        if (getFullscreenElement()) {
            document.exitFullscreen();
        } else {
            viewerElement.requestFullscreen();
        }
    }

    function getFullscreenElement() {
        return document.fullscreenElement
            || document.webkitfullscreenElement
            || document.mozfullscreenElement
            || document.msfullscreenElement
    }
</script>
```

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/pdfviewer)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
