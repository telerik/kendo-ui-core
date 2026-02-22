---
title: Setting Default Search Text in PDFViewer's Search Box
description: Learn how to set a default search text in the Kendo UI PDFViewer's search box.
type: how-to
page_title: How to Set Default Search Text in Kendo UI PDFViewer Search Box
slug: set-default-search-text-pdfviewer-kendo-ui
tags: pdfviewer, search, inputlabel, default text, kendo ui, jquery
res_type: kb
components: ["pdfviewer"]
category: knowledge-base
ticketid: 1652783
---

## Environment

| Product | Version |
| --- | --- |
| PDFViewer for Progress® Kendo UI® | 2024.2.514 |

## Description

When using the PDFViewer, I want to set a default search text that appears in the search textbox upon opening a PDF. The goal is to have the search box open automatically, display a predefined keyword, and highlight all matches within the PDF.

This KB article also answers the following questions:
- How can I programmatically set search text in the PDFViewer's search box?
- How to highlight all instances of a word in PDFViewer on load?
- How to automatically open the search dialog with a predefined search text in PDFViewer?

## Solution

To set a default search text in the PDFViewer's search box, handle the [`click`](/api/javascript/ui/toolbar/events/click) event of the PDFViewer Toolbar. In the event handler, set the value of the search input. Then, use the same text to execute a search operation by accessing the private`_searchDOM` property of the PDFViewer. Below is an example of how to implement this:

1. Bind to the [`click`](/api/javascript/ui/toolbar/events/click) event of the PDFViewer Toolbar.
2. Set the default search text value in the search input.
3. Use a `setTimeout` function to ensure the search operation is triggered after setting the value.

```dojo

<div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.min.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.mjs" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2025.1.227/js/kendo.all.min.js" type="module"></script>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {      
          dialogs: {
            search: {
              inputLabel: 'My input label'
            }
          }
        }
      });

      $("#pdfviewer").data('kendoPDFViewer').toolbar.bind('click',function(e){
        if($(e.target).find('.k-svg-i-search').length > 0){          
          $('.k-search-dialog-input').val('Telerik DevCraft');
          setTimeout(() => {
            $("#pdfviewer").data('kendoPDFViewer')._searchDOM.search("Telerik DevCraft")
          });
        }        
      })
    </script>
```

## Notes

- This approach relies on internal properties (_searchDOM) which may change in future versions of Kendo UI. Use it with caution and test after updates.

## See Also

- [PDFViewer Toolbar Click Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/events/click)
- [PDFViewer Official Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/pdfviewer/overview)
