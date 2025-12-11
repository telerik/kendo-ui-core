---
title: Hiding Checkboxes in PDF Export for Kendo UI for jQuery Grid
description: Learn how to hide selectable column checkboxes when exporting the Kendo UI for jQuery Grid to PDF.
type: how-to
page_title: How to Hide Selectable Column Checkboxes in Grid PDF Export
slug: hide-checkboxes-grid-pdf-export
tags: kendo, ui, grid, jquery, pdf, export, checkbox, hide
res_type: kb
components: ["grid"]
ticketid: 1675794
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Grid for jQuery </td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.806</td>
</tr>
</tbody>
</table>

## Description

I am utilizing the Grid component and need the functionality to hide the checkboxes when exporting it to a PDF. This knowledge base article also answers the following questions:
- How to exclude the selectable column from Grid PDF export?
- How to hide elements in the Grid when exporting to PDF?
- How to customize Grid PDF export appearance?

## Solution

To hide the checkboxes from the exported PDF, leverage the `.k-pdf-export` CSS class. Apply the following CSS rule to target and hide the checkboxes within the Grid during the PDF export process:

```css
.k-pdf-export #grid .k-checkbox {
    display: none;
}
```
```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            data: products,
            pageSize: 20
          },
          toolbar: ["pdf"],
          height: 550,
          scrollable: true,
          pageable: true,
          columns: [
            { selectable: true, width: "50px" },
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            { field: "Discontinued", width: "130px" }
          ]
        });
      });
    </script>
    <style>
      .k-pdf-export #grid .k-checkbox {
        display: none;
      }
    </style>

```

This CSS rule ensures that checkboxes in the selectable column are not visible in the exported PDF document. It targets the checkboxes within the Grid identified by `#grid` when the `.k-pdf-export` class is applied, which is the case during the PDF export operation.

## See Also

- [Grud PDF Export Documentation](https://docs.telerik.com/kendo-ui/controls/grid/export/pdf-export)
- [Customizing the PDF Export](https://docs.telerik.com/kendo-ui/knowledge-base/grid-exclude-columns-from-exported-pdf)
