---
title: Printing
page_title: jQuery Grid Documentation | Printing | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI allowing you to select only the Grid content on a page for printing."
previous_url: /print-export
slug: printing_kendoui_grid
position: 3
---

# Printing

Even though the content of the Grid might not be the only content on a page, the Grid provides options to ignore the rest of the page and print only its contents.

To print only the Grid from a page, use either of the following approaches:
* Print the existing page and hide the irrelevant content with print CSS.
* Print a separate web page with only the Grid on it.

### Printing Existing Web Pages

To print only the Grid as part of an existing web page, use a print stylesheet to hide the parts of the page that you do not need. The exact CSS for printing will depend on the existing page content.

### Printing New Web Pages

The following example demonstrates how to retrieve the HTML of the Grid, inject it in a new browser window, and print the new page. This approach also addresses the following important issues:
* If the Grid is scrollable, some rows or columns may not be visible on the printed paper. Therefore, the Grid height and scrollability are disabled on the print-friendly page.
* Depending on the column width, some of the cell content may be clipped and not fully visible. This issue is resolved by forcing an automatic `table-layout` to the Grid table which disables the ellipsis (`...`).
* If scrolling is enabled (which is set by default except for the MVC wrapper of the Grid), the Grid renders a [separate table for the header area]({% slug scrolling_kendoui_grid_widget %}). Because the browser does not relate the two Grid tables, it will not repeat the header row on top of every printed page. The following example demonstrates how to address this issue by cloning the header table row into the data table.
* When you print a Grid with locked (frozen) columns, it is possible that the resulting columns or rows get misaligned or that the overall layout gets broken. In such cases, use a separate print-friendly Grid instance with no frozen columns.

###### Example

```tab-HTML

    <div id="grid"></div>

    <script type="text/x-kendo-template" id="toolbar-template">
        <button type="button" class="k-button" id="printGrid">Print Grid</button>
    </script>
```
```tab-JavaScript

	 function printGrid() {
		var gridElement = $('#grid'),
			printableContent = '',
			win = window.open('', '', 'width=800, height=500, resizable=1, scrollbars=1'),
			doc = win.document.open();

		var htmlStart =
				'<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				'<meta charset="utf-8" />' +
				'<title>Kendo UI Grid</title>' +
				'<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
				'<style>' +
				'html { font: 11pt sans-serif; }' +
				'.k-grid { border-top-width: 0; }' +
				'.k-grid, .k-grid-content { height: auto !important; }' +
				'.k-grid-content { overflow: visible !important; }' +
				'div.k-grid table { table-layout: auto; width: 100% !important; }' +
				'.k-grid .k-grid-header th { border-top: 1px solid; }' +
				'.k-grouping-header, .k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
                // '.k-grid-pager { display: none; }' + // optional: hide the whole pager
				'</style>' +
				'</head>' +
				'<body>';

		var htmlEnd =
				'</body>' +
				'</html>';

		var gridHeader = gridElement.children('.k-grid-header');
		if (gridHeader[0]) {
			var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
			printableContent = gridElement
				.clone()
					.children('.k-grid-header').remove()
				.end()
					.children('.k-grid-content')
						.find('table')
							.first()
								.children('tbody').before(thead)
							.end()
						.end()
					.end()
				.end()[0].outerHTML;
		} else {
			printableContent = gridElement.clone()[0].outerHTML;
		}

		doc.write(htmlStart + printableContent + htmlEnd);
		doc.close();
		win.print();
	}

	$(function () {
		var grid = $('#grid').kendoGrid({
			dataSource: {
				type: 'odata',
				transport: {
					read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
				},
				pageSize: 20,
				serverPaging: true,
				serverSorting: true,
				serverFiltering: true
			},
			toolbar: kendo.template($('#toolbar-template').html()),
			height: 400,
			pageable: true,
			columns: [
				{ field: 'ProductID', title: 'Product ID', width: 100 },
				{ field: 'ProductName', title: 'Product Name' },
				{ field: 'UnitPrice', title: 'Unit Price', width: 100 },
				{ field: 'QuantityPerUnit', title: 'Quantity Per Unit' }
			]
		});

		$('#printGrid').click(function () {
			printGrid();
		});

	});
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Remote Data Binding of the Grid]({% slug remote_data_binding_grid %})
* [Rendering and Dimensions of the Grid]({% slug width_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Knowledge Base Section](/knowledge-base)
