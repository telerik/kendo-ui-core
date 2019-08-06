---
title: Export All Pages and Full Page Content
page_title: Export All Pages with Full Content | Kendo UI Grid for jQuery
description: "An example on how to export the whole content of the Kendo UI Grid for jQuery in a PDF file."
previous_url: /controls/data-management/grid/how-to/pdf-export/all-page-content-with-all-pages
slug: howto_export_allpagesand_full_page_content_pdf_grid
tags: grid, export, pages, full, content
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I export all Kendo UI Grid pages and their full page content in a PDF file?

## Solution

The following example demonstrates how to export all Grid pages and their full page content in a PDF file.

```dojo
    <button class="k-button">Export Grid</button>
    <div id="header">
		<h1>Export Grid</h1>
    </div>
    <div id="grid"></div>
    <div id="footer"></div>
    <script>
		$("button").on("click", function() {
			var grid = $("#grid").data("kendoGrid");
			var progress = $.Deferred();

			kendo.drawing.drawDOM($("#header"))
			.done(function(header) {
			  kendo.drawing.drawDOM($("#footer"))
			  .done(function(footer) {
				grid._drawPDF(progress)
				.then(function(root) {
				  root.children.unshift(header);
				  root.children.push(footer);
				  return kendo.drawing.exportPDF(root, { multiPage: true });
				})
				.done(function(dataURI) {
				  kendo.saveAs({
					dataURI: dataURI,
					fileName: "test.pdf"
				  });
				  progress.resolve();
				})
			  });
			})
		});
      $("#header").kendoChart({
        legend: {
          position: "bottom"
        },
        dataSource: {
          data: [{
            "source": "Approved",
            "percentage": 237
          }, {
            "source": "Rejected",
            "percentage": 112
          }],
        },
        series: [{
          type: "donut",
          field: "percentage",
          categoryField: "source"
        }],
        chartArea: {
          background: "none"
        },
        tooltip: {
          visible: true,
          template: "${ category } - ${ value } applications"
        }
      });

      $("#footer").kendoChart({
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          name: "Users Reached",
          data: [340, 894, 1345, 1012, 3043, 2013, 2561, 2018, 2435, 3012]
        }, {
          name: "Applications",
          data: [50, 80, 120, 203, 324, 297, 176, 354, 401, 349]
        }],
        valueAxis: {
          labels: {
            visible: false
          },
          line: {
            visible: false
          },
          majorGridLines: {
            visible: false
          }
        },
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
          line: {
            visible: false
          },
          majorGridLines: {
            visible: false
          }
        },
        chartArea: {
          background: "none"
        },
        tooltip: {
          visible: true,
          format: "{0}",
          template: "#= series.name #: #= value #"
        }
      });

      $("#grid").kendoGrid({
        pdf: {
          allPages: true
        },
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
          { field: "FirstName" },
          { field: "LastName"},
          { field: "Title" },
          { field: "Country "}
        ],
        height: 300,
        scrollable: true,
        pageable: true
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
