---
title: Submitting Filled PDF Forms with Kendo UI for jQuery PDFViewer
description: Learn how to submit filled PDF forms or their byte data directly to the server using Kendo UI for jQuery PDFViewer.
type: how-to
page_title: How to Submit Filled PDF Forms to Server Using Kendo UI for jQuery PDFViewer
meta_title: How to Submit Filled PDF Forms to Server Using Kendo UI for jQuery PDFViewer
slug: submitting-filled-pdf-forms-kendo-ui-jquery-pdfviewer
tags: pdfviewer,kendo-ui-for-jquery,pdf-form,form-filling,submit-form,ajax,server-integration
res_type: kb
ticketid: 1709500
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery PDFViewer </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.1.212 </td>
</tr>
</tbody>
</table>

## Description

I need to display a fillable PDF form using [Kendo UI for jQuery PDFViewer](https://www.telerik.com/kendo-jquery-ui/documentation/controls/pdfviewer/overview), allow users to fill the form, and submit either the filled form data or the PDF file as byte data directly to the server.

This knowledge base article also answers the following questions:
- How can I retrieve form field values from a fillable PDF using Kendo UI for jQuery PDFViewer?
- How can I submit a filled PDF form as byte data to the server?
- How can I create an example of form submission in Kendo UI for jQuery PDFViewer?

## Solution

To achieve this, follow these steps:

### Retrieving Form Field Values

Use the `annotationStorage` of the Kendo UI for jQuery PDFViewer to obtain the values of the fields in the PDF form:

```javascript
let annotationStorage = $("#pdfViewer").getKendoPDFViewer().pdfViewerCommon.annotationStorage.getAll();

Object.keys(annotationStorage).forEach((key) => {
    console.log(`${key} - ${JSON.stringify(annotationStorage[key]["value"])}`);
});
```

### Submitting Filled PDF Form as Byte Data

To submit the filled PDF directly as byte data to the server:

1. Use the `saveDocument` method to retrieve the filled PDF file data.
2. Convert the data to a `Blob` and create a `FormData` object.
3. Use an AJAX request to send the file to the server.

Example:

```javascript
$("#pdfViewer").data().kendoPDFViewer.document.saveDocument().then((uint8Array) => {
    // Convert Uint8Array to Blob
    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Create FormData
    const formData = new FormData();
    formData.append('file', blob, 'filledForm.pdf');

    $.ajax({
        url: '@Url.Action("Save_Document", "Home")',
        type: 'POST',
        data: formData,
        processData: false,  // Don't process the data
        contentType: false,  // Don't set content type
        success: function(response) {
            console.log('File saved successfully:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error saving file:', error);
        }
    });
});
```

### ASP.NET Core Server Implementation

The server must be configured to receive the filled PDF file and save it. Below is an example implementation:

```csharp
[HttpPost]
public async Task<IActionResult> Save_Document(IFormFile file)
{
    if (file == null || file.Length == 0)
    {
        return BadRequest("No file uploaded");
    }

    var saveDirectory = Path.Combine(_environment.WebRootPath, "SavedDocuments");

    if (!Directory.Exists(saveDirectory))
    {
        Directory.CreateDirectory(saveDirectory);
    }

    var uniqueFileName = $"{DateTime.Now:yyyyMMdd_HHmmss}_{file.FileName}";
    var filePath = Path.Combine(saveDirectory, uniqueFileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    var relativeUrl = $"/SavedDocuments/{uniqueFileName}";

    return Json(new
    {
        success = true,
        message = "File saved successfully",
        fileName = uniqueFileName,
        filePath = relativeUrl,
        size = file.Length
    });
}
```

### Example Project

You can find a runnable project that demonstrates this functionality in the following GitHub repository:  
[Form Filling Server Processing Example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Kendo.FormFilling.ServerProcessing).

## See Also

- [Kendo UI for jQuery PDFViewer Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/pdfviewer/overview)
- [Form Filling in Kendo UI for jQuery PDFViewer](https://demos.telerik.com/kendo-ui/pdfviewer/form-filling)
- [GitHub Repository for Form Filling Examples](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Kendo.FormFilling.ServerProcessing)
