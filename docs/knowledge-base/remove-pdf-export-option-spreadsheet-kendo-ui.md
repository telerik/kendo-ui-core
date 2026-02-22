---
title: Removing PDF Export Option from Spreadsheet
description: Learn how to remove the PDF export option from the Spreadsheet in Kendo UI.
type: how-to
page_title: How to Remove PDF Export Option from Spreadsheet in Kendo UI
slug: remove-pdf-export-option-spreadsheet-kendo-ui
tags: how-to, spreadsheet, export, PDF, Kendo UI
res_type: kb
components: ["spreadsheet"]
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Spreadsheet</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1217</td>
</tr>
</tbody>
</table>

## Description
I want to remove the PDF export option from the export popup in Spreadsheet in Kendo UI. How can I achieve this?

## Solution
To remove the PDF export option from the Spreadsheet in Kendo UI, follow these steps:

1. Get a reference to the Spreadsheet Menu and bind to its [`select`](/api/javascript/ui/menu/events/select) event.

2. When the File menu is selected, attach a click handler to the Export button.

3. In the Export button click handler, locate the file format DropDownList in the visible export window and remove the last item (PDF) from its dataSource.

4. Use `unbind` before binding to prevent multiple event handlers if the File menu is opened repeatedly.

Below is a runnable example that demonstrates the approach:

```dojo
    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          name: "Food Order",
          mergedCells: [
            "A1:G1"
          ],
          rows: [{
            height: 70,
            cells: [{
              value: "My Company", fontSize: 32, textAlign: "center"
            }]
          }],
        }],
        excel: {
          fileName: "Order.xlsx"
        }
      });

  const spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
	const menu = spreadsheet.element.find("div.k-menu").data("kendoMenu");

	menu.bind("select", (e) => {
    	const isFileMenu = $(e.item).find(".k-menu-link-text").text() === "File";
		if (!isFileMenu) {
    		return;
  		}
      
    	const exportButton = $("button[title='Export...']").data("kendoButton");
    	// prevent multiple bindings if File is opened more than once
    	exportButton.unbind("click.exportCleanup");

    	exportButton.bind("click", () => {
    		const ddl = $(".k-window:visible").find("select.k-file-format").map(function () {
    			return $(this).data("kendoDropDownList");
  			}).get(0);
          
    	  	const dataSource = ddl.dataSource;
    		const data = dataSource.data();

    		if (data.length) {
      		dataSource.remove(data[data.length - 1]);
    		}
    	});
	});
</script>
```

## See Also

- [Kendo UI Spreadsheet Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
- [Kendo UI Spreadsheet API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet)

