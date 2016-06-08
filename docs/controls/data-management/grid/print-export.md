---
title: Printing
page_title: Printing | Kendo UI Grid
description: "Learn how to print the Kendo UI Grid widget."
slug: printing_kendoui_grid
position: 10
---

# Printing

In most cases the Grid is not the only content on a page and, yet, you might want to print the Grid only.

## Options

There are two ways to print the content of the Grid only, though the Grid itself may not be the only content displayed on a page.

### Print Existing Web Pages

Print the existing web page, but use a print stylesheet to hide the parts of the page that are not needed.

### Print New Web Pages

The example below demonstrates how to retrieve the Grid HTML, inject it in a new browser window, and trigger the printing of the new page. It also addresses some other important things you must keep in mind as follows:

* If the Grid is scrollable, some rows or columns may not be visible on the printed paper. Make sure that during printing the Grid has no set height, and the scrollability of the data area is disabled.
* Depending on the column width, some of the cell content may not be fully visible. This problem is resolved by forcing an automatic `table-layout` to the Grid table, which disables the ellipsis (`...`).
* Browsers repeat table headers on each printed page automatically. However, when the Grid is scrollable, it renders a separate table for the header area. Since the browser cannot understand the relationship between the two Grid tables, it will not repeat the header row. This problem is resolved by cloning the header row inside the data table.

Printing a Grid with locked (frozen) columns is likely to produce misaligned columns, or rows, or a broken overall layout. In such cases it is advisable to use a separate print-friendly page with no frozen columns.

###### Example

   //HTML
    <div id="grid"></div>

    <script type="text/x-kendo-template" id="toolbar-template">
        <button type="button" class="k-button" id="printGrid">Print Grid</button>
    </script>

   //JavaScript

	 function printGrid() {
		var gridElement = $('#grid'),
			printableContent = '',
			win = window.open('', '', 'width=800, height=500'),
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
				'.k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
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
					read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
