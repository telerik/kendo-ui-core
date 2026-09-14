---
title: PDF Export
page_title: jQuery TreeList Documentation - PDF Export
description: "Learn how to export hierarchical TreeList data to PDF, configure page settings, and start a PDF export from JavaScript."
components: ["treelist"]
slug: exporting_pdf_kendoui_treelist_widget
position: 2
---

# PDF Export

The TreeList provides built-in PDF export for hierarchical data. Add the PDF command to the toolbar to let users download TreeList data as a PDF document.

For a runnable example, refer to the [TreeList PDF export demo](https://demos.telerik.com/kendo-ui/treelist/pdf-export).

## Enable PDF Export

To enable PDF export:

1. Add the `pdf` command to the TreeList `toolbar` configuration.
1. Configure the [`pdf`](/api/ui/treelist/configuration/pdf) options.
1. For large PDF documents, include the Pako library to enable compression.

The following example adds an **Export to PDF** button to the TreeList toolbar and configures the exported document.

```dojo
<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

<div id="treelist"></div>

<script>
    $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
            { field: "Name", title: "Name" },
            { field: "Position", title: "Position" }
        ],
        dataSource: [
            { id: 1, parentId: null, Name: "Jane Doe", Position: "Chief Executive Officer" },
            { id: 2, parentId: 1, Name: "John Doe", Position: "Chief Technology Officer" }
        ],
        pdf: {
            fileName: "Employees.pdf",
            paperSize: "A4",
            landscape: true
        }
    });
</script>
```

## Export All Pages and Configure Layout

By default, the TreeList exports the current page. Set [`pdf.allPages`](/api/ui/treelist/configuration/pdf#pdfallpages) to `true` to export all pages, and use PDF options such as `paperSize`, `landscape`, and `margin` to configure the document layout.

```javascript
pdf: {
    allPages: true,
    paperSize: "A4",
    landscape: true,
    margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
}
```

## Export Programmatically

You can call the [`saveAsPDF`](/api/ui/treelist/methods/saveaspdf) method when a user interacts with an external element to export the TreeList data to a PDF file.

```javascript
$("#export").on("click", function() {
    var treeList = $("#treelist").data("kendoTreeList");
    treeList.saveAsPDF();
});
```

The [`pdfExport`](/api/ui/treelist/events/pdfexport) event fires before the TreeList saves the generated PDF. Use its `e.promise` argument to determine when the export completes.

## See Also

* [TreeList PDF Export API](/api/ui/treelist/configuration/pdf)
* [TreeList PDF Export Demo](https://demos.telerik.com/kendo-ui/treelist/pdf-export)
* [TreeList Excel Export]({% slug exporting_excel_kendoui_treelist_widget %})
