---
title: Excel Export
page_title: jQuery TreeList Documentation - Excel Export
description: "Learn how to export hierarchical TreeList data to an Excel workbook, configure export options, and start an export from JavaScript."
components: ["treelist"]
slug: exporting_excel_kendoui_treelist_widget
position: 1
---

# Excel Export

The TreeList provides built-in Excel export for hierarchical data. Add the Excel command to the toolbar to let users download the current TreeList data as an Excel workbook.

For a runnable example, refer to the [TreeList Excel export demo](https://demos.telerik.com/kendo-ui/treelist/excel-export).

## Enable Excel Export

To enable Excel export:

1. Include the JSZip library on the page.
1. Add the `excel` command to the TreeList `toolbar` configuration.
1. Configure the [`excel`](/api/ui/treelist/configuration/excel) options.

>note Starting with v2023.3.1115, the JSZip library is no longer distributed with the Kendo UI for jQuery scripts. Load it from an official distribution channel such as `unpkg`.

The following example adds an **Export to Excel** button to the TreeList toolbar and names the exported workbook.

```dojo
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

<div id="treelist"></div>

<script>
    $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
            { field: "Name", title: "Name" },
            { field: "Position", title: "Position" }
        ],
        dataSource: [
            { id: 1, parentId: null, Name: "Jane Doe", Position: "Chief Executive Officer" },
            { id: 2, parentId: 1, Name: "John Doe", Position: "Chief Technology Officer" }
        ],
        excel: {
            fileName: "Employees.xlsx"
        }
    });
</script>
```

## Export All Pages

By default, the TreeList exports the current page. Set [`excel.allPages`](/api/ui/treelist#configuration-excel.allPages) to `true` to export all pages of data.

```javascript
excel: {
    allPages: true,
    fileName: "Employees.xlsx"
}
```

## Export Programmatically

You can call the [`saveAsExcel`](/api/ui/treelist/methods/saveasexcel) method when a user interacts with an external element to export the TreeList data to an Excel file.

```javascript
$("#export").on("click", function() {
    var treeList = $("#treelist").data("kendoTreeList");
    treeList.saveAsExcel();
});
```

The [`excelExport`](/api/ui/treelist/events/excelexport) event fires before the TreeList saves the generated workbook. Use its `e.workbook` argument to customize the workbook.

## See Also

* [TreeList Excel Export API](/api/ui/treelist/configuration/excel)
* [TreeList Excel Export Demo](https://demos.telerik.com/kendo-ui/treelist/excel-export)
* [TreeList PDF Export]({% slug exporting_pdf_kendoui_treelist_widget %})
