---
title: Export All Pages and Full Page Content
page_title: Export All Pages and Full Page Content | Kendo UI Grid
description: "Learn how to export all Kendo UI Grid pages and their full data and visual content."
slug: howto_export_allpagesand_full_page_content_pdf_grid
---

# Export All Pages and Full Page Content

This example demonstrates how to export all Kendo UI Grid pages and their full page content in a PDF file.

###### Example

```html
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

Other articles on the Kendo UI Grid and how-to examples related to its export in PDF:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Customize Page Layout]({% slug howto_customize_page_layout_pdf_grid %})
* [How to Export All Pages]({% slug howto_export_all_pagesto_pdf_grid %})
* [How to Export Multiple Pages with Variable Row Height]({% slug howto_export_multiple_pageswith_variable_rowheight_pdf_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
