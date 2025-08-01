---
title: Change Column Widths during PDF Export
description: Learn how to override the column widths of the Kendo UI Grid for PDF Export.
type: how-to
page_title: Change Grid Columns Width - Kendo UI for jQuery Data Grid
slug: grid-pdf-export-change-column-widths
tags: grid, column, width, pdf, export
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I change the width of the Grid columns when I export them to PDF?

## Solution

The PDF Export appends a `k-pdf-export` class to all the elements and then removes it. That is why, you can target the `colgroup > col` setting and use CSS rules.  

```
.k-pdf-export colgroup > col {
  width: 50px !important;        
}

.k-pdf-export td {
  white-space: nowrap;
}
```

You can also target specific columns by using the `:nth-child()` selector.

```
.k-pdf-export colgroup > col:nth-child(1),
.k-pdf-export colgroup > col:nth-child(4),
.k-pdf-export colgroup > col:nth-child(7)
{
    width: 150px !important;        
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

      .k-pdf-export colgroup > col {
        width: 50px !important;        
      }
      .k-pdf-export colgroup > col:nth-child(1),
      .k-pdf-export colgroup > col:nth-child(4),
      .k-pdf-export colgroup > col:nth-child(7)
      {
        width: 150px !important;        
      }
      .k-pdf-export td {
        white-space: nowrap;
      }
      .k-pdf-export .k-grid-column-menu{
        display: none;
      }
    </style>
  </head>
  <body>

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

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
          paperSize: "A2",
          allPages: true,
          avoidLinks: true,
          margin: { top: "1.5cm", right: "0.5cm", bottom: "1cm", left: "0.5cm" },
          landscape: true,
          repeatHeaders: true,
          template: $("#page-template").html(),
          scale: 0.6
        },
        dataSource: {
          transport: {
            read: "https://demos.telerik.com/service/v2/core/Products"
          },
          pageSize: 10
        },
        sortable: true,
        scrollable: true,
        pageable: true,
        filterable: true,
        columnMenu: true,
        columns: [
          { field: "ProductName", title: "Product Name1", width: 300 },
          { field: "UnitsOnOrder", title: "Units On Order1", width: 300 },
          { field: "UnitsInStock", title: "Units In Stock1", width: 300 },
          { field: "ProductName", title: "Product Name2", width: 300 },
          { field: "UnitsOnOrder", title: "Units On Order2", width: 300 },
          { field: "UnitsInStock", title: "Units In Stock2", width: 300 },
          { field: "ProductName", title: "Product Name3", width: 300 },
          { field: "UnitsOnOrder", title: "Units On Order3", width: 300 },
          { field: "UnitsInStock", title: "Units In Stock3", width: 300 }
        ]
      });
    </script>
```

## See Also

* [Show hidden columns during PDF Export]({% slug grid-pdf-show-hidden-columns %})
* [Exclude Certain Columns from the Exported PDF File]({% slug grid-exclude-columns-from-exported-pdf %})
* [Exclude Toolbar and Pager from Grid PDF Export]({% slug grid-export-pdf-without-toolbar-pager %})
