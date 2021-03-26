---
title: Toolbar and Tools
page_title: jQuery PDFViewer Documentation | Toolbar and Tools
description: "Get started with the jQuery PDFViewer by Kendo UI and use and define the tools in its toolbar."
slug: toolbar_pdfviewer_widget
position: 4
---

# Toolbar and Tools

Internally, the PDFViewer uses the [Kendo UI for jQuery Toolbar]({% slug overview_kendoui_toolbar_widget %}) and provides a set of default tools and corresponding commands in its toolbar.

This approach enables you to use the [ToolBar API](/api/javascript/ui/toolbar) and perform all available customizations.

You can control the number and type of the rendered tools by initializing the items collection only with the tools that you require. For the full list of configuration options, refer to the [client-side API of the ToolBar items](/api/javascript/ui/pdfviewer/configuration/toolbar.items).

The toolbar collection includes the following built-in tools:

* `pager`
* `zoom`
* `toggleSelection`
* `search`
* `open`
* `download`
* `print`

 > Running an Adblock extension in Chrome might treat the new browser tab for the print dialog as a potential ad and block it.

The following example demonstrates basic configuration options for the PDFViewer toolbar tools. You can also add `spacer` elements, in order to group a preferable set of tools.

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <div id="pdfviewer"></div>
    <script>
        $(document).ready(function () {
            $("#pdfViewer").kendoPDFViewer({            
              toolbar: {
              items: [
                "pager","spacer","zoom","toggleSelection","spacer","search","open","download","print"               
              ]
            },
            })
        });
    </script>

You can also use the `add` and `remove` client-side API methods to programmatically manage the rendered tools in the PDFViewer.

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <div id="pdfviewer"></div>
    <script>
      $("#pdfViewer").kendoPDFViewer();           
      var pdfviewer = $("#pdfViewer").getKendoPDFViewer();
      var printToolElement = $(".k-toolbar").find('a[title="Print"]');
      pdfviewer.toolbar.remove(printToolElement);
    </script>

You can add custom tools to the item collections of the toolbar.

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <div id="pdfviewer"></div>
    <script>
        $(document).ready(function () {
            $("#pdfViewer").kendoPDFViewer({            
            toolbar: {
                items: [
                    "pager",
                    "spacer",
                    "open",
                    "download",
                    {
                    name: "myCustomTool",
                    template: "<select id='myDropdown'></select>"
                    }
                ]
                },
            })
            $("#myDropdown").kendoDropDownList({
        	    dataSource: ["Option 1", "Option 2", "Option 3"]
            });
        });
    </script>

## See Also

* [Basic Usage of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
