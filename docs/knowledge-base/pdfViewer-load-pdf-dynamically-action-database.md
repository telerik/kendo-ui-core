---
title: Load a PDF Document Dynamically
description: An example on how to load a PDF document into a Kendo UI PDFViewer dynamically from a controller or a database.
type: how-to
page_title: Load PDF Dynamically from the Server or Database | Kendo UI PDFViewer for jQuery
slug: pdfViewer-load-pdf-dynamically-action-database
tags: pdfviewer, load, pdf, server, dynamically
ticketid: 1418499, 1418533
res_type: kb
---

## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product Version</td>
	    	<td>2019.2.619 and later</td>
	    </tr>
	    <tr>
	    	<td>Product</td>
	    	<td>Kendo PDFViewer for jQuery, ASP.NET MVC, ASP.NET Core</td>
	    </tr>
    </tbody>
</table>


## Description

How can I load PDF dynamically based on conditions, for example, like a choice from a drop-down or a Grid selection? That PDF may not be a physical file but stored in a database or another storage that cannot be accessed directly through a URL.

## Solution

Use the `.fromFile()` method of the Kendo UI PDFViewer and pass to it a URL to an action method&mdashh;for example, an MVC controller, WebAPI, or another suitable endpoint that will return the PDF document with the correct MIME type (`application/pdf`).

The following example demonstrates how to change the loaded PDF dynamically by calling an action that will return the document and uses the selection in the Grid to trigger the change. The user can click Grid rows, extract data from them, and use that data to dynamically change the file that is loaded in a Kendo UI PDFViewer through its `.fromFile()` method. The example will not work in a sample Dojo because the handler does not actually exist. You need to implement that according to the logic of your application and it must return the PDF file with the correct MIME type (`application/pdf`).

```dojo
<div id="grid"></div>

<div id="pdfViewer">
</div>

<script>
  $("#grid").kendoGrid({
    columns: [
      { field: "name" },
      { field: "age" }
    ],
    dataSource: [
      { id: 1, name: "Jane Doe", age: 30 },
      { id: 2, name: "John Doe", age: 33 }
    ],
    selectable: "single, row",
    change: function(e) {
      // Obtain the identifier for the document.
      var selectedRows = this.select();
      var dataItem = this.dataItem(selectedRows[0]);
      var id = dataItem.id;

      // Create a viewer if you do not have one already.
      var pdfViewer = $("#pdfViewer").data("kendoPDFViewer");
      if(!pdfViewer){
         pdfViewer = $("#pdfViewer").kendoPDFViewer({
             pdfjsProcessing: {
                file: ""
            },
            width: "100%",
            height: 500
          }).data("kendoPDFViewer");
      }

      // Build the desired URL to point to your handler that will return the PDF.
      var pdfHandlerUrl = "/myController/myPdfAction/" + dataItem.id;

      // Make the PDFViewer load the designated file.
      pdfViewer.fromFile(pdfHandlerUrl);
    }
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
<script>
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
</script>
```

The following example demonstrates a sample MVC controller that shows how to return the needed file&mdash;the implementation details will vary between technologies and implementations.

```
public class myControllerController : Controller
{
    [HttpGet]
    public FileStreamResult myPdfAction(int id)
    {
        //just some pseudocode for extracting the file from the database
        var file = _myDbContext.PdfFiles.FirstOrDefault(f => f.Id == id);
        if(file == null)
        {
            throw new HttpException(404, "File not found for this record");
            //will show a "file not found" in the PDF viewer
        }
        // One way is to get a stream, in a similar fashion you can use
        // the bytep[] and the File() type of result for the action
        // https://docs.microsoft.com/en-us/dotnet/api/system.web.mvc.controller.file.
        Stream stream = new MemoryStream(file.Data);

        return new FileStreamResult(stream, "application/pdf");
    }
}
```
