---
title: Rotating a Specific Page in Kendo UI PDFViewer
description: Learn how to rotate a specific page in the Kendo UI PDFViewer.
type: how-to
page_title: How to Rotate the Current Page in Kendo UI PDFViewer
slug: rotating-a-specific-page-kendo-ui-pdfviewer
tags: pdfviewer, kendo, ui, rotate, page, current
res_type: kb
ticketid: 1661858
---

## Environment

| Product | Kendo UI for jQuery PDFViewer |
| --- | --- |
| Version | 2024.2.514 |

## Description

I need to rotate a specific page in the PDFViewer. How can I rotate the current page displayed in the viewer?

This KB article also answers the following questions:
- How can I apply rotation to a page in Kendo UI PDFViewer?
- Is it possible to rotate only the currently viewed page in PDFViewer?

## Solution

To rotate a specific page in the [PDFViewer](https://docs.telerik.com/kendo-ui/controls/data-management/pdfviewer/overview) for Kendo UI, follow these steps:

1. Obtain the current page number using the internal `_pageNum` variable:
   ```javascript
   let currentPage = $("#pdfViewer").data('kendoPDFViewer')._pageNum;
   ```

2. Determine the current rotation degree of the page and add 90 degrees to rotate it:
   ```javascript
   function rotatePDF(){
       let currentPage = $("#pdfViewer").data('kendoPDFViewer')._pageNum;      
       let currentTransform = $('.k-page:nth-child(' + currentPage + ')')[0].style.transform;
       let degree = Number(currentTransform.match(/\d+/g));
       degree += 90;        
       
       $(`.k-page:nth-child(${currentPage})`).css("transform", `rotate(${degree}deg)`);
   }
   ```

3. Execute the `rotatePDF` function to rotate the currently displayed page. This can be triggered by a button click or any other event suitable for your application.

In the example below the currently displayed page will be rotated on a button click: 

```dojo
<div id="example">
      <div id="pdfViewer">
      </div>
    </div>
    <script>
      var rotate = 0;

      $.when(
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"),
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js")
      )
        .done(function () {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';           
      }).then(function(){

        $("#pdfViewer").kendoPDFViewer({
          toolbar: {
            items: [
              "pager",
              {
                name: "Rotate",
                title:"rotate",
                template: "<div class='rotateTool'><button title='rotate' class='k-button' onclick='rotatePDF()'>Rotate</button><select style='width:auto' id='selectPage'></select></div>"
              }
            ]
          },
          pdfjsProcessing: {
            file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
          },
          width: "100%",
          height: 1200
        });
        $("#selectPage").kendoDropDownList({
          dataSource:["1","2","3"],
          width:50
        })
      })


      function rotatePDF(){

        let currentPage = $("#pdfViewer").data('kendoPDFViewer')._pageNum;      
        let current = $('.k-page:nth-child(' + currentPage + ')')[0].style.transform
        let degree = Number(current.match(/\d+/g))        
        degree +=90        

        $(`.k-page:nth-child(${currentPage})`).css("transform", `rotate(${degree}deg)`)

      }
    </script>

```

## Notes

- The PDFViewer component does not provide a direct method to identify the currently displayed page. The solution uses the internal `_pageNum` variable as a workaround.
- The rotation is applied by manipulating the CSS `transform` property of the page element. This approach may need adjustments if the PDFViewer's markup changes in future versions.

## See Also

- [Official PDFViewer Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/pdfviewer/overview)
- [Kendo UI Dojo - Interactive Examples](https://dojo.telerik.com/)
