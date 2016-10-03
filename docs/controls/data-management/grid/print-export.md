---
title: Printing
page_title: Printing | Kendo UI Grid
description: "Learn how to print the Kendo UI Grid widget."
slug: printing_kendoui_grid
position: 10
---

# Printing

In most cases, the Grid is not the only content on a page. Yet, you might want to print only the Grid.

To achieve that, use either of these options:

* Print the existing page and hide the irrelevant content with print CSS.
* Print a separate web page with only the Grid on it.

### Print Existing Web Pages

To print only the Grid as part of an existing web page, use a print stylesheet to hide the parts of the page that you do not need. The exact print CSS code will depend on the existing page content.

### Print New Web Pages

The following example demonstrates how to retrieve the HTML of the Grid, inject it in a new browser window, and print the new page. This approach also addresses some other important things you need to consider:

* If the Grid is scrollable, some rows or columns may not be visible on the printed paper. So, the Grid height and scrollability are disabled on the print-friendly page.
* Depending on the column width, some of the cell content may be clipped and not fully visible. This issue is resolved by forcing an automatic `table-layout` to the Grid table, which disables the ellipsis (`...`).
* If scrolling is enabled (which is set by default except for the MVC wrapper of the Grid), the Grid renders a [separate table for the header area]({% slug appearance_kendoui_grid_widget %}#scrolling). Because the browser is not able to understand the relationship between the two Grid tables, it will not repeat the header row on top of every printed page. The example below shows how to address this issue by cloning the header table row into the data table.
* On a side note, when printing a Grid with locked (frozen) columns, it is possible for the resulting columns or rows to get misaligned, or for the overall layout to get broken. In such cases, it is advisable to use a separate print-friendly Grid instance with no frozen columns.

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
```

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Remote Data Binding of the Grid]({% slug remote_data_binding_grid %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
