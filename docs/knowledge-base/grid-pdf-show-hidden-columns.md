---
title: Show hidden columns during PDF Export
description: An example on how to show hidden columns in the Kendo UI Grid during PDF Export using only CSS rules.
type: how-to
page_title: Show hidden columns in PDF | Kendo UI Grid for jQuery
slug: grid-pdf-show-hidden-columns
tags: grid, column, hidden, pdf, export, showColumn, hideColumn, white, space
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2019.1.115 version</td>
 </tr>
</table>

## Description

After showing and hiding of the hidden column it leaves a empty space in the grid when I use the `showColumn()` and `hideColumn()` methods. How can I avoid this?

## Solution

The usage of the `showColumn()` and `hideColumn()` methods [is known for causing this behaviour](/controls/data-management/grid/columns/widths#using-column-widths-and-scrolling). Another option to show the desired columns is to only using [CSS rules just for the PDF Export](/framework/drawing/pdf-output/custom-appearance#using-the) and remove the JavaScript handler:


```
    .k-pdf-export td:nth-child(1),.k-pdf-export thead th:nth-child(1)
    {
      display: table-cell !important;       
    }
```

```dojo
 <style>
      .page-template {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      .page-template .header {
        position: absolute;
        top: 30px;
        left: 30px;
        right: 30px;
        border-bottom: 1px solid #888;
        text-align: center;
        font-size: 18px;
      }

      .page-template .footer {
        position: absolute;
        bottom: 30px;
        left: 30px;
        right: 30px;
      }


      .k-pdf-export td:nth-child(1),.k-pdf-export thead th:nth-child(1)
      {
        display: table-cell !important;        
      }

      .k-pdf-export .k-header-column-menu{
        display: none;
      }
    </style>
    </head>
  <body>

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/2017.2.621/js/pako_deflate.min.js"></script>

    <div id="grid"></div>
    <script type="x/kendo-template" id="page-template">
        <div class="page-template">
            <div class="header">
                Kendo UI Grid Export
      </div>
          <div class="footer">
              <div style="float: right">Page #: pageNum # of #: totalPages #</div>
      </div>
      </div>
    </script>

    <script>
      $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
          fileName: "Kendo UI Grid Export.pdf",
          paperSize: "A4",
          allPages: true,
          avoidLinks: true,
          margin: { top: "1.5cm", right: "0.5cm", bottom: "1cm", left: "0.5cm" },
          landscape: true,
          repeatHeaders: true,
          template: $("#page-template").html(),
          scale: 0.6
        },
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
          },
          pageSize: 10
        },
        sortable: true,
        scrollable: true,
        pageable: true,
        filterable: true,
        columnMenu: true,
        columns: [
          { field: "Discontinued", hidden:true, width:200 },
          { field: "UnitsOnOrder", title: "Units On Order1", width: 300 },
          { field: "UnitsInStock", title: "Units In Stock1", width: 300 },
          { field: "ProductName", title: "Product Name2", width: 300 },
        ]
      });
    </script>
```

## See Also

* [Change Column Widths during PDF Export]({% slug grid-pdf-export-change-column-widths %})
* [Exclude Certain Columns from the Exported PDF File]({% slug grid-exclude-columns-from-exported-pdf %})
* [Exclude Toolbar and Pager from Grid PDF Export]({% slug grid-export-pdf-without-toolbar-pager %})