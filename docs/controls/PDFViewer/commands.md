---
title: Commands
page_title: jQuery PDFViewer Documentation - PDFViewer Commands
description: "Get familiar with the Commands in the PDFViewer and how you can use them."
slug: commands_kendoui_pdfviewer_widget
position: 5
---

# Commands

The PDFViewer component provides the following commands that can be executed using the [execute](/api/javascript/ui/pdfviewer/methods/execute) method: 

* OpenCommand;
* PageChangeCommand;
* DownloadCommand;
* ExportCommand;
* EnableSelectionCommand;
* EnablePanCommand;
* PrintCommand;
* OpenSearchCommand;
* ZoomCommand;

The example below demonstrates the usage of the commands:

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <div id="example">

      <input type="button" value="Open" onclick="onOpen()"/>
      <input type="button" value="Change page" onclick="onPageChange()"/>
      <input type="button" value="Download" onclick="onDownloadClick()"/>
      <input type="button" value="Export" onclick="onExportClick()"/>
      <input type="button" value="Enable Selection" onclick="onEnableSelection()"/>
      <input type="button" value="Enable Pan" onclick="onEnablePan()"/>
      <input type="button" value="Print" onclick="onPrint()"/>
      <input type="button" value="Open Search" onclick="onOpenSearch()"/>
      <input type="button" value="Zoom" onclick="onZoom()"/>

      <div id="pdfViewer"></div>
    </div>

    <script>
      $(document).ready(function () {
        $("#pdfViewer").kendoPDFViewer({
          execute: function(e){
            console.log(e)
          },
          pdfjsProcessing: {
            file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
          },
          width: "100%",
          height: 1000
        }); 
      });

      function onPageChange(){  
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"PageChangeCommand", options: {value: 3}});
      }

      function onOpen(){   
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"OpenCommand"});
      }

      function onDownloadClick(){  
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"DownloadCommand"});
      }

      function onExportClick(){
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"ExportCommand"});
      }

      function onEnableSelection(){
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"EnableSelectionCommand"});
      }      
      
      function onEnablePan(){
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"EnablePanCommand"});
      }

      function onPrint(){
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"PrintCommand"});
      }

      function onOpenSearch(){
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"OpenSearchCommand"});
      }

      function onZoom(){
        $("#pdfViewer").data("kendoPDFViewer").execute({command:"ZoomCommand", options: { scale: "fitToWidth"}});
        var combo = $("input[data-role='combobox']").data("kendoComboBox");      
        combo.value("fitToWidth");
      }
    </script>
```


## See Also

* [Basic Usage of the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/index)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
