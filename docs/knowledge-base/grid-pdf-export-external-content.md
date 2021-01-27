---
title: Export Grid PDF with Custom Template and External Variables
description: Learn how to include external variables in the PDF template of the Grid
type: how-to
page_title: Include External Variables and Content in PDF Template | Kendo UI Grid
slug: grid-pdf-export-external-content
position: 
tags: grid, pdf, export, external, customize, header, footer, variable, content, template
ticketid: 1407533
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.1.220</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

I am working on a multiple grid export to PDF which needs a custom template. 
- I want to add custom content only on the first page and only for the first grid. 
- How do I get the value of a dropdown to be displayed in the export pdf using the kendo template?

## Solution

- The Kendo UI PDF template has the [`pageNum`](/api/javascript/ui/grid/configuration/pdf.template) property that can be used as a condition as part of the template. This will allow you to add or remove parts of the template dependent on it. 
- It is possible to check runtime if the `kendo-pdf-document` contains a child with a certain id. It is important to remember that the "#" literal needs to be escaped:

```
  #if(pageNum == 1 && $(data.element).children("\\#grid").length) {#
    <div class="header">
    <div style="float: right">Page #: pageNum # of #: totalPages #</div>
    Multi-page grid with automatic page breaking
    </div>     
  #}#
```
- To ensure that the arbitrary content fits on the page and the content does not overlap, you will need to increase the page top/bottom margins as well. Currently, this means that the pages without the arbitrary content, will produce a gap that is blank because the margin is set globally for all pages. Vote for [this Feature request](https://feedback.telerik.com/kendo-jquery-ui/1365058-set-a-different-margin-for-every-page-pdf-export) if you also like to see individual margin for each page.
- The value of the DropDownList can be included either by creating a global variable or by calling a function from inside the template:

```javascript
  function getDllValueForPrint(){
    return $("#customer").data("kendoDropDownList").value().Name;
  }

  #if(pageNum == 1 && $(data.element).children("\\#grid").length) {#
  <div class="custom-content"><div>
    <em style="color:red;">#=getDllValueForPrint()#</em>
  #}#
```
#### Example

```dojo
  <div id="example">


      <a id='export' class='k-button'>Export both grids </a>
      <input id="client" />
      <div id="grid"></div>
      <div id="grid2"></div>

      <script src="https://kendo.cdn.telerik.com/2017.3.913/js/pako_deflate.min.js"></script>

      <script type="x/kendo-template" id="page-template">
            <div class="page-template">

                <div class="header">
                <div style="float: right">Page #: pageNum # of #: totalPages #</div>
                Multi-page grid with automatic page breaking
        </div>
            #if(pageNum == 1 && $(data.element).children("\\#grid").length) {#
            <div class="custom-content">
           		<div>
              	<strong>Arbitrary Content placed on the first page</strong>
                <em style="color:red;">#=getDllValueForPrint()#</em>
        </div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quisquam eaque veritatis nostrum quo consequuntur nihil
        </div>
              #}#
                <div class="watermark">KENDO UI</div>
                <div class="footer">
                Page #: pageNum # of #: totalPages #
        </div>
        </div>
      </script>

      <script>
        var clientddl = $("#client").kendoDropDownList({
            dataSource: ["Client 1", "Client 2", "Client 3"]
          }).data("kendoDropDownList");
          
          $("#grid").kendoGrid({
            pdf: {
              allPages: true,
              avoidLinks: true,
              paperSize: "A4",
              margin: { top: "4cm", left: "1cm", right: "1cm", bottom: "1cm" },
              landscape: true,
              repeatHeaders: true,
              template: $("#page-template").html(),
              scale: 0.8
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              pageSize: 20
            },
            height: 550,
            sortable: true,
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{
              field: "ContactName",
              title: "Contact Name",
              width: 240
            }, {
              field: "ContactTitle",
              title: "Contact Title"
            }, {
              field: "CompanyName",
              title: "Company Name"
            }, {
              field: "Country",
              width: 150
            }]
          });

          $("#grid2").kendoGrid({
            pdf: {
              allPages: true,
              avoidLinks: true,
              paperSize: "A4",
              margin: { top: "4cm", left: "1cm", right: "1cm", bottom: "1cm" },
              landscape: true,
              repeatHeaders: true,
              template: $("#page-template").html(),
              scale: 0.7
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
              },
              schema:{
                model: {
                  fields: {
                    UnitsInStock: { type: "number" },
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsOnOrder: { type: "number" },
                    UnitsInStock: { type: "number" }
                  }
                }
              },
              pageSize: 7
            },
            pageable: true,
            groupable: true,
            filterable: true,
            columnMenu: true,
            reorderable: true,
            resizable: true,
            columns: [
              { width: 300, field: "ProductName", title: "Product Name" },
              { width: 300, field: "UnitPrice", title: "Unit Price"},
              { width: 300, field: "UnitsOnOrder", title: "Units On Order"},
              { width: 300, field: "UnitsInStock", title: "Units In Stock" }
            ]
          });

          $('#export').on('click', function(){
            var grid1 = $('#grid').data('kendoGrid');
            var grid2 = $('#grid2').data('kendoGrid');

            var progress = $.Deferred();

            grid1._drawPDF(progress)
              .then(function(firstGrid) {
              grid2._drawPDF(progress)
                .then(function(secondGrid){
                secondGrid.children.forEach(function(x){
                  firstGrid.children.push(x);
                })
                return kendo.drawing.exportPDF(firstGrid, { multiPage: true });

              }).done(function(dataURI) {
                kendo.saveAs({
                  dataURI: dataURI,
                  fileName: "test.pdf"
                });
                progress.resolve();
              })           

            })

          });
        
        function getDllValueForPrint(){
          return clientddl.value();
        }
      </script>

      <style>
        /* Page Template for the exported PDF */
        .page-template {
          font-family: "DejaVu Sans", "Arial", sans-serif;
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
          color: #888;
        }

        .custom-content {
          position: absolute;
          top: 60px;
          left: 30px;
          right: 30px;
          border: 1px solid red;
          color: green;
        }
        .page-template .footer {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          border-top: 1px solid #888;
          text-align: center;
          color: #888;
        }
        .page-template .watermark {
          font-weight: bold;
          font-size: 400%;
          text-align: center;
          margin-top: 30%;
          color: #aaaaaa;
          opacity: 0.1;
          transform: rotate(-35deg) scale(1.7, 1.5);
        }

        /* Content styling */
        .customer-photo {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-size: 32px 35px;
          background-position: center center;
          vertical-align: middle;
          line-height: 32px;
          box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
          margin-left: 5px;
        }
        kendo-pdf-document .customer-photo {
          border: 1px solid #dedede;
        }
        .customer-name {
          display: inline-block;
          vertical-align: middle;
          line-height: 32px;
          padding-left: 3px;
        }
      </style>
    </div>
```
