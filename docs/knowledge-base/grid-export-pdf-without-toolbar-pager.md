---
title: Exclude Toolbar and Pager from Grid PDF Export
description: An example on how to export the Kendo UI Grid to PDF without the toolbar and pager.
type: how-to
page_title: Exclude Toolbar and Pager from PDF Export | Kendo UI Grid
slug: grid-export-pdf-without-toolbar-pager
tags: grid, export, pdf, toolbar, pager, ignore, exclude
ticketid: 1143253
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

When I export a Kendo UI Grid to PDF, the custom toolbar and pager are included.

How can I prevent the custom toolbar and pager from appearing in the exported PDF file?

## Solution

Use the following CSS rules.

````css
.k-pdf-export .k-grid-toolbar,
.k-pdf-export .k-pager-wrap
{
  display: none;
}
````

The following example demonstrates the outcome of the suggested approach.

```dojo
<div id="example">

  <div id="grid"></div>

  <script type="text/x-kendo-template" id="template">
    <div class="toolbar">
      <label class="category-label" for="category">Test input:</label>
      <input type="search" id="category" style="width: 150px"/>
      <a class="k-button k-button-icontext k-grid-pdf" href="\\#">Export to Pdf</a>
    </div>
  </script>
  <script id="rowTemplate" type="text/x-kendo-tmpl">
    <tr data-uid="#: uid #">
      <td class="photo">
        <img src="../content/web/Employees/#: EmployeeID #.jpg" alt="#: EmployeeID #" />
      </td>
      <td class="details">
        <span class="name">#: FirstName# #: LastName# </span>
        <span class="title">Title: #: Title #</span>
      </td>
      <td class="country">
        #: Country #
      </td>
      <td class="employeeID">
        #: EmployeeID #
      </td>
    </tr>
  </script>
  <script id="altRowTemplate" type="text/x-kendo-tmpl">
    <tr class="k-alt" data-uid="#: uid #">
      <td class="photo">
        <img src="../content/web/Employees/#: data.EmployeeID #.jpg" alt="#: EmployeeID #" />
      </td>
      <td class="details">
        <span class="name">#: FirstName# #: LastName# </span>
        <span class="title">Title: #: Title #</span>
      </td>
      <td class="country">
        #: Country #
      </td>
      <td class="employeeID">
        #: EmployeeID #
      </td>
    </tr>
  </script>

  <style>
    /*
    Use the DejaVu Sans font for display and embedding in the PDF file.
    The standard PDF fonts have no support for Unicode characters.
    */
    .k-grid {
      font-family: "DejaVu Sans", "Arial", sans-serif;
    }

    /* Hide the Grid header and pager during export */
    .k-pdf-export .k-grid-toolbar,
    .k-pdf-export .k-pager-wrap
    {
      display: none;
    }
  </style>

  <script>
    // Import DejaVu Sans font for embedding

    // NOTE: Only required if the Kendo UI stylesheets are loaded
    // from a different origin, e.g. cdn.kendostatic.com
    kendo.pdf.defineFont({
      "DejaVu Sans"             : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf",
      "DejaVu Sans|Bold"        : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
      "DejaVu Sans|Bold|Italic" : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
      "DejaVu Sans|Italic"      : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
    });
  </script>

  <!-- Load Pako ZLIB library to enable PDF compression -->
  <script src="//kendo.cdn.telerik.com/2016.1.112/js/pako_deflate.min.js"></script>

  <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      pdf: {
        allPages: true,
        fileName: "Kendo UI Grid Export.pdf",
        proxyURL: "//demos.telerik.com/kendo-ui/service/export"
      },
      toolbar: kendo.template($("#template").html()),
      dataSource: {
        type: "odata",
        transport: {
          read: {
            url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
          }
        },
        pageSize: 5
      },
      columns: [
        { title: "Photo", width: 140 },
        { title: "Details", width: 350 },
        { title: "Country" },
        { title: "EmployeeID" }
      ],
      rowTemplate: kendo.template($("#rowTemplate").html()),
      altRowTemplate: kendo.template($("#altRowTemplate").html()),
      height: 500,
      scrollable: true,
      pageable: true
    });
  </script>
  <style>
    .employeeID,
    .country {
      font-size: 50px;
      font-weight: bold;
      color: #898989;
    }
    .name {
      display: block;
      font-size: 1.6em;
    }
    .title {
      display: block;
      padding-top: 1.6em;
    }
    td.photo, .employeeID {
      text-align: center;
    }
    .k-grid-header .k-header {
      padding: 10px 20px;
    }
    .k-grid tr {
      background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
      background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
      background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
      background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
      background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
      padding: 20px;
    }
    .k-grid tr.k-alt {
      background: -moz-linear-gradient(top,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
      background: -webkit-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
      background: -o-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
      background: -ms-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
      background: linear-gradient(to bottom,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
    }
  </style>
</div>
```

## See Also

* [Exporting the Kendo UI Grid to PDF](https://docs.telerik.com/kendo-ui/controls/data-management/grid/pdf-export)
