---
title: How to load a pdf document dynamically
description: how to load a PDF into Kendo PDF Viewer dynamically from a controller or database
type: how-to
page_title: Load PDF dynamically from the server or database
slug: pdfViewer-load-pdf-dynamically-action-database
position: 
tags: 
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
I need to load a PDF dynamically, based on conditions (like a choice from a dropdown or a grid selection). That PDF may also not be a physical file, but may be stored in a database or other storage that cannot be accessed directly through a URL.

The example below shows how you can change the loaded PDF dynamically by calling an action that will return the document.

## Solution
You need to use the `.fromFile()` method of the Kendo PDF Viewer and pass to it a URL to an action method (e.g., MVC controller, or WebAPI, or any other suitable endpoint) that will return the PDF document with the correct MIME type (`application/pdf`).

In the example below, the selection in a grid is used to trigger the change.

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
      //obtain the identifier for the document
      var selectedRows = this.select();
      var dataItem = this.dataItem(selectedRows[0]);
      var id = dataItem.id;
      
      //create a viewer if you don't have one already
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
      
      //build the desired URL to point to your handler that will return the PDF
      var pdfHandlerUrl = "/myController/myPdfAction/" + dataItem.id;
      
      //make the PDF viewer load the designated file
      pdfViewer.fromFile(pdfHandlerUrl);
    }
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
<script>
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
</script>

This example shows how you can click grid rows, extract data from them and use that data
to change dynamically the file loaded in a Kendo PDF Viewer through its .fromFile() method.
In a sample dojo, it will not work because the handler does not actually exist. 
You need to implement that according to your application's logic and it must return the PDF file
with the correct MIME type (application/pdf).
```

Here is a sample MVC controller that shows how to return the needed file (of course, the implementation details will vary between technologies and implementations):

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
        // one way is to get a stream, in a similar fashion you can use
        // bytep[] and the File() type of result for the action
        // https://docs.microsoft.com/en-us/dotnet/api/system.web.mvc.controller.file
        Stream stream = new MemoryStream(file.Data);
        
        return new FileStreamResult(stream, "application/pdf");
    }
}
```

