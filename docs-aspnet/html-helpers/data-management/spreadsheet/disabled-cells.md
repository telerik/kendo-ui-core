---
title: Disabled Cells
page_title: Spreadsheet Disabled Cells
description: "Learn how to enable and disable cells for the Telerik UI Spreadsheet component for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_disabled_cells_aspnetcore
position: 7
---

# Disabled Cells

The Telerik UI Spreadsheet for {{ site.framework }} allows you to control the enabled and disabled state of the cells.

## Set Cell State at Initialization

You can set the state of a cell during the initialization of the Spreadsheet for {{ site.framework }} by using the [`.Enable()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetRowCellBuilder#enablesystemboolean) configuration option:

```HtmlHelper
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets => {
            sheets.Add()
                .Name("Sheet1")
                .Rows(rows => {
                    rows.Add().Cells(cells => {
                        cells.Add()
                            .Value("Enabled Cell");

                        cells.Add()
                            .Value("Disabled Cell")
                            .Enable(false);
                    });
                });
            })
    )
```
{% if site.core %}
```TagHelper
	<kendo-spreadsheet name="spreadsheet">
		<sheets>
	 		<sheet name="Sheet1">
	 	 		<columns>
	 	 	 		<sheet-column>
	 	 	 		</sheet-column>
	 	 		</columns>
	 	 		<rows>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="Enabled Cell">
	 	 	 	 	 		</cell>
							<cell value="Disabled Cell" enable="false">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 		</rows>
	 		</sheet>
		</sheets>
	</kendo-spreadsheet>
```
{% endif %}

## Set Cell State after Initialization

You can set the state of a cell or range of cells after the initialization by using the [kendo.spreadsheet.Range client-side API](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range) and the [enable](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/enable) method.

The following example demosntrates how to toggle the state of cell `A1` on button click:

```
$("#myButton").click(function () {
    var range = $("#spreadsheet").data("kendoSpreadsheet").activeSheet().range("A1");
    var enabled = range.enable();

    if (enabled === null) {
        enabled = true;
    }

    //Enable / disable specified range
    range.enable(!enabled);
});
```

## See Also
* [Disabled Cells of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/disabled-cells)
* [Server-Side API](/api/spreadsheet)
* [Spreadsheet Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [kendo.spreadsheet.Sheet Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet)
* [kendo.spreadsheet.Range Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range)
