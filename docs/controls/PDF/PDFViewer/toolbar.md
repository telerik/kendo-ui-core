---
title: Toolbar and Tools
page_title: Toolbar and Tools | Kendo UI PDFViewer
description: "Get started with the jQuery PDF Viewer by Kendo UI and learn how to use and define the tools in its toolbar."
slug: toolbar_pdfviewer_widget
position: 4
---

# Toolbar and Tools

Internally, the PDFViewer uses the [Kendo UI for jQuery Toolbar]({% slug overview_kendoui_toolbar_widget %}) and provides a set of default tools and corresponding commands in its toolbar.

This approach enables you to use the [ToolBar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar) and perform all available customizations.

You can control the number and type of the rendered tools by initializing the items collection only with the tools that you require. For the full list of configuration options, refer to the [client-side API of the ToolBar items](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/configuration/toolbar.items).

The toolbar collection includes the following built-in tools:

* `pager` with a corresponding command `PageChangeCommand`.
* `zoom` with a corresponding command `ZoomCommand`.
* `toggleSelection` with a corresponding commands `EnableSelectionCommand`.
* `togglePan` with a corresponding commands `EnablePanCommand`.
* `search` with a corresponding command `OpenSearchCommand`.
* `open` with a corresponding command `OpenCommand`.
* `download` with a corresponding command `DownloadCommand`.
* `print` with a corresponding command `PrintCommand`.

The following example demonstrates basic configuration options for the PDFViewer toolbar tools.

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
                      { type: "pager", overflow: "never", command: "PageChangeCommand" },
                      { type: "spacer" },
                      { type: "zoom", command: "ZoomCommand", zoomInOut: true, combobox: { zoomLevels: [50, 100, 150, 200, 300, 400] } },
                      {
                          type: "buttonGroup",
                          buttons: [
                              { togglable: true, text: "Enable Selection", command: "EnableSelectionCommand", icon: "k-i-cursor", showText: "overflow", name: "toggleSelection", group: "toggle-pan" },
                              { togglable: true, text: "Enable Panning", command: "EnablePanCommand", icon: "k-i-hand", showText: "overflow", name: "togglePan", group: "toggle-pan", selected: true }
                          ]
                      },
                      { type: "spacer" },
                      { type: "button", text: "Search", command: "OpenSearchCommand", icon: "search", name: "search", showText: "overflow" },
                      { type: "button", text: "Open", showText: "overflow", name: "open", icon: "folder-open", command: "OpenCommand" },
                      { type: "button", text: "Download", showText: "overflow", name: "download", icon: "download", command: "DownloadCommand" },
                      { type: "button", text: "Print", showText: "overflow", name: "print", icon: "print", command: "PrintCommand" }                  
                ]
            },
            })
        });
    </script>

You can also add and remove client-side API methods to programmatically render the desired toolbar tools in the PDFViewer.

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

## See Also

* [Basic Usage of the Kendo UI for jQuery PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [Client-Side API](/api/javascript/ui/pdfviewer)
