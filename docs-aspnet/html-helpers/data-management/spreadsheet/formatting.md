---
title: Cell Formatting
page_title: Spreadsheet
description: "Learn how to format cells in the Telerik UI Spreadsheet component for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_formatting_aspnetcore
position: 4
---

# Cell Formatting

The Spreadsheet supports cell-formatting options such as formatting of strings, text, numbers, dates, and time.

## Strings

While the format strings are compatible with the [Excel number formats](https://support.office.com/en-au/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4), some [notable exceptions](#differences-to-excel) still exist. A format string consists of one or more sections that are separated by semicolons. Optionally, a section specifies a color and a condition.

The following example demonstrates how to display a number with up to three decimals.

    #.###

The following example demonstrates how to display positive numbers, or zero, in green, and negative numbers in red.

    [Green]#.###;[Red]#.###

The following example demonstrates how to display positive numbers in green, negative numbers in red, and the `"Zero"` text in blue if the number is zero.

    [Green]#.###;[Red]#.###;[Blue]"Zero"

This following example is the same as the previous one, with the difference to display any possible text in the cell in magenta.

    [Green]#.###;[Red]#.###;[Blue]"Zero";[Magenta]@

The following example demonstrates how to format the Spreadsheet conditionally.

```HtmlHelper
    <div id="example">
        @(Html.Kendo().Spreadsheet()
                        .Name("spreadsheet")
                        .HtmlAttributes(new { style = "width:100%" })
                        .Sheets(sheets =>
                        {
                            sheets.Add()
                                .Name("Food Order")
                                .MergedCells("A1:G1", "C15:E15")
                                .Columns(columns =>
                                {
                                    columns.Add().Width(100);
                                    columns.Add().Width(215);
                                    columns.Add().Width(115);
                                    columns.Add().Width(115);
                                    columns.Add().Width(115);
                                    columns.Add().Width(155);
                                })
                                .Rows(rows =>
                                {
                                    rows.Add().Height(70).Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value("Invoice #52 - 06/23/2015")
                                            .FontSize(32)
                                            .Background("rgb(96,181,255)")
                                            .TextAlign(SpreadsheetTextAlign.Center)
                                            .Color("white");
                                    });

                                    rows.Add().Height(25).Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value("ID")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Product")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Quantity")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Price")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Tax")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Amount")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                        .Background("rgb(167,214,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(216321)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Calzone")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(1)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(12.39)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Formula("C3*D3*0.2")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Formula("C3*D3+E3")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                        .Background("rgb(255,255,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(546897)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Margarita")
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(2)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(8.79)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C4*D4*0.2")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C4*D4+E4")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                        .Background("rgb(229,243,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(456231)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Pollo Formaggio")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(1)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(13.99)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Formula("C5*D5*0.2")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Formula("C5*D5+E5")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                        .Background("rgb(255,255,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(455873)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Greek Salad")
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(1)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(9.49)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C6*D6*0.2")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C6*D6+E6")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                        .Background("rgb(229,243,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(456892)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Spinach and Blue Cheese")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(3)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(11.49)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Formula("C7*D7*0.2")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Formula("C7*D7+E7")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                        .Background("rgb(255,255,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(546564)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Rigoletto")
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(1)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(10.99)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C8*D8*0.2")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C8*D8+E8")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                        .Background("rgb(229,243,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(789455)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Creme Brulee")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(5)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(6.99)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Formula("C9*D9*0.2")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Formula("C9*D9+E9")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                        .Background("rgb(255,255,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(123002)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Radeberger Beer")
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(4)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(4.99)
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C10*D10*0.2")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("C10*D10+E10")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                        .Background("rgb(229,243,255)");
                                    });

                                    rows.Add().Cells(cells =>
                                    {
                                        cells.Add()
                                            .Value(564896)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value("Budweiser Beer")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Value(3)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Center);

                                        cells.Add()
                                            .Value(4.49)
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)")
                                            .Format("$#,##0.00");

                                        cells.Add()
                                            .Formula("C11*D11*0.2")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Formula("C11*D11+E11")
                                            .Format("$#,##0.00")
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                        .Background("rgb(255,255,255)");
                                    });

                                    rows.Add().Index(11).Cells(cells =>
                                    {
                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(229,243,255)")
                                            .Color("rgb(0,62,117)");

                                    });

                                    rows.Add().Index(12).Cells(cells =>
                                    {
                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                        cells.Add()
                                            .Background("rgb(255,255,255)")
                                            .Color("rgb(0,62,117)");

                                    });

                                    rows.Add().Index(13).Cells(cells =>
                                    {
                                        cells.Add()
                                            .Background("rgb(167,214,255)");

                                        cells.Add()
                                            .Background("rgb(167,214,255)");

                                        cells.Add()
                                            .Background("rgb(167,214,255)");

                                        cells.Add()
                                            .Background("rgb(167,214,255)");

                                        cells.Add()
                                            .Value("Tip")
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .TextAlign(SpreadsheetTextAlign.Right);

                                        cells.Add()
                                            .Background("rgb(167,214,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("SUM(F3:F11)*0.1")
                                            .Format("$#,##0.00")
                                            .Bold(true);

                                        cells.Add()
                                            .Background("rgb(167,214,255)");
                                    });

                                    rows.Add().Index(14).Height(50).Cells(cells =>
                                    {
                                        cells.Add()
                                            .Index(0)
                                            .Background("rgb(193,226,255)");

                                        cells.Add()
                                            .Index(1)
                                            .Background("rgb(193,226,255)");

                                        cells.Add()
                                            .Value("Total Amount")
                                            .Index(2)
                                            .TextAlign(SpreadsheetTextAlign.Right)
                                            .Color("rgb(0,62,117)")
                                            .FontSize(20)
                                            .Background("rgb(193,226,255)");

                                        cells.Add()
                                            .Index(5)
                                            .Background("rgb(193,226,255)")
                                            .Color("rgb(0,62,117)")
                                            .Formula("SUM(F3:F14)")
                                            .Format("$#,##0.00")
                                            .FontSize(20)
                                            .Bold(true);

                                        cells.Add()
                                        .Index(6)
                                        .Background("rgb(193,226,255)");
                                    });
                                });
                        })
        )
    </div>
    <script>
        $(document).ready(function () {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            spreadsheet.sheets()[0].range("C3:C11").format('[=1][GREEN]#,##0;[=2][YELLOW]#,##0;[=3][CYAN]#,##0;[RED]#,###');
        })
    </script>   
```
{% if site.core %}
```TagHelper
    @{
        string[] mergedCells = new string[] { "A1:G1", "C14:E14" };
    }

    <kendo-spreadsheet name="spreadsheet" style="width:100%">
		<sheets>
	 		<sheet name="Food Order" merged-cells="@mergedCells">
				<columns>
					<sheet-column width="100">
					</sheet-column>
					<sheet-column width="215">
					</sheet-column>
					<sheet-column width="115">
					</sheet-column>
					<sheet-column width="115">
					</sheet-column>
					<sheet-column width="115">
					</sheet-column>
					<sheet-column width="155">
					</sheet-column>
				</columns>
	 	 		<rows>
	 	 	 		<sheet-row height="70">
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="Invoice #52 - 06/23/2015" background="rgb(96,181,255)" color="white" font-size="32" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row height="25">
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="ID" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Product" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Quantity"  background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Price" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Tax"  background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Amount"  background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(167,214,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="216321"  background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Calzone" background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="1" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="12.39" background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C3*D3*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C3*D3+E3">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="546897" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Margarita" background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="2" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="8.79" background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C4*D4*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell  background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C4*D4+E4">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="456231" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Pollo"Formaggio" background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="1" background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="13.99" background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C5*D5*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C5*D5+E5">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="455873" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Greek"Salad" background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="1" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="9.49" background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C6*D6*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C6*D6+E6">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="456892" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Spinach"and"Blue"Cheese" background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="3" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="11.49" background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C7*D7*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C7*D7+E7">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="546564" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Rigoletto" background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="1" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="10.99" background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C8*D8*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C8*D8+E8">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="789455" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Creme"Brulee" background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="5" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="6.99" background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C9*D9*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C9*D9+E9">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell  value="123002" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Radeberger Beer"  background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="4" background="rgb(229,243,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="4.99" background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C10*D10*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C10*D10+E10">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="564896" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Budweiser"Beer" background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="3" background="rgb(255,255,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="4.49" background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C11*D11*0.2">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)" format="$#,##0.00" formula="C11*D11+E11">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row index="11">
	 	 	 	 		<cells>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(229,243,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row index="12">
	 	 	 	 		<cells>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(255,255,255)" color="rgb(0,62,117)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row index="13">
	 	 	 	 		<cells>
	 	 	 	 	 		<cell background="rgb(167,214,255)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(167,214,255)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(167,214,255)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(167,214,255)">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Right">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Tip" background="rgb(167,214,255)" color="rgb(0,62,117)" bold="true" format="$#,##0.00" formula="SUM(F3:F11)*0.1">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(167,214,255)">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 	 		<sheet-row height="50" index="14">
	 	 	 	 		<cells>
	 	 	 	 	 		<cell background="rgb(193,226,255)" index="0">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(193,226,255)" index="1">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell value="Total Amount" background="rgb(193,226,255)" color="rgb(0,62,117)" font-size="20" index="2" text-align="SpreadsheetTextAlign.Right">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(193,226,255)" color="rgb(0,62,117)" font-size="20" bold="true" format="$#,##0.00" formula="SUM(F3:F14)" index="5">
	 	 	 	 	 		</cell>
	 	 	 	 	 		<cell background="rgb(193,226,255)" index="6">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 		</rows>
	 		</sheet>
		</sheets>
		<excel proxy-url="@Url.Action("Index_Save", "Spreadsheet")"/>
		<pdf proxy-url="@Url.Action("Index_Save", "Spreadsheet")">
		</pdf>
	</kendo-spreadsheet>
```
{% endif %}
```Controller
    public class SpreadsheetController : Controller
    {
        public ActionResult Index()
        {                            
            return View();
        }
    }
```

According to the Excel documentation, Excel supports a maximum of four sections. If all of them are present, Excel interprets them in the following order:

- Positive numbers format
- Negative numbers format
- Format for zero
- Format for text

Excel also supports a more flexible conditional formatting.

The following example demonstrates how to display numbers greater than 100 in green, numbers less than minus 100 in yellow, and other numbers in cyan.

    [>100][GREEN]#,##0;[<=-100][YELLOW]#,##0;[CYAN]#,##0

In this case, it is not clear whether only up to four sections are allowed, of which the last one must be text, while the Spreadsheet formatter allows for any number of conditional sections.

## Default Format Strings

The default format strings that are shown in the formatting drop-down are stored in the `kendo.spreadsheet.formats` object.

| FORMAT IDENTIFIER | VALUE                                                                         |
|-------------------|-------------------------------------------------------------------------------|
| automatic         | Infer formatting by parsing the cell value.                                   |
| number            | Format numbers with the precision of 2 decimals.                              |
| percent           | Format percentage points with the precision of 2 decimals.                    |
| financial         | Format financial values that account for positive, negative, or zero values.  |
| currency          | Format currency values that account for positive or negative values.          |
| date              | Format values as dates.                                                       |
| time              | Format values as time.                                                        |
| dateTime          | Format values as date-time.                                                   |
| duration          | Format as an elapsed duration in hours, minutes, or seconds.                  |

You can use these formats with the [`range` format method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/format) in the following way: `sheet.range("A1").format(kendo.spreadsheet.formats.currency)`.

## Text and Numbers

| CHARACTER | MEANING       |
|-----------|---------------|
| `0`       | Digit placeholder. Displays insignificant zeroes. For example, `8.9` with the `00.000` format renders `08.900`.    |
| `#`       | Digit placeholder. Does not display insignificant zeroes. For example, `12.34` in the `###.###` format renders `12.34`.                  |
| `?`       | Digit placeholder. Functionally similar to `0`, but displays a space character instead of a zero. To align numbers by decimal points, use this character. Note that you have to use a fixed-width font for this setting to be effective. |
| `.`       | Displays a decimal point. |
| `,`       | Displays a thousands separator or scale (see below).   |
| `\`       | Escapes the next character (display literally).        |
| `_`       | Skips the width of the next character.                 |
| `"text"`  | Includes a piece of text in the format. Characters inside are not interpreted in any way, but are literally output.    |
| `@`       | Text placeholder. Is replaced with the text in the cell. |

The thousands separator (`,`) has a double role:
* When situated between any digit placeholders, it outputs a number in thousands that are separated by the separator in the current culture. For example, `#,#` formats `1234567` as `1,234,567`.
* When a comma follows a digit placeholder but is not followed by one, it scales the number by one thousand. For example, `#.##,` formats `12345` as `12.35`. This is a more complicated format displaying in which cases such behavior is useful: `[>1000000]#.##,,"M";[>1000]#.##,"K";[>0]#"B";[=0]"Empty";[<0]"Replace HDD!"`.

| VALUE    | DISPLAY      |
|----------|--------------|
| 12345678 | 12.35M       |
|    34567 | 34.57K       |
|      123 | 123B         |
|        0 | Empty        |
|      -10 | Replace HDD! |

## Dates and Time

| FORMAT STRING | MEANING                                                                           |
|---------------|-----------------------------------------------------------------------------------|
| m             | Displays the month number without a leading zero.                                 |
| mm            | Displays the month number with a leading zero.                                    |
| mmm           | Displays the short month name in the current culture.                             |
| mmmm          | Displays the full month name in the current culture.                              |
| d             | Displays the date number without a leading zero.                                  |
| dd            | Displays the date number with a leading zero.                                     |
| ddd           | Displays the abbreviated weekday name.                                            |
| dddd          | Displays the full weekday name.                                                   |
| yy            | Displays the year as a two-digit number.                                          |
| yyyy          | Displays the full year number.                                                    |
|---------------|-----------------------------------------------------------------------------------|
| h             | Displays the hour without a leading zero.                                         |
| hh            | Displays the hour including a leading zero.                                       |
| m             | Displays the minute without a leading zero.                                       |
| mm            | Displays the minute including a leading zero.                                     |
| s             | Displays the second without a leading zero.                                       |
| ss            | Displays the second including a leading zero.                                     |
| [h]           | Displays the elapsed time in hours.                                               |
| [m]           | Displays the elapsed time in minutes.                                             |
| [s]           | Displays the elapsed time in seconds.                                             |
| AM/PM         | Displays hours in a 12-hour clock accompanied by an `AM` or `PM` indication.      |
| am/pm         | Displays hours in a 12-hour clock accompanied by an `am` or `pm` indication.      |
| A/P           | Displays hours in a 12-hour clock accompanied by an `A` or `P` indication.        |
| a/p           | Displays hours in a 12-hour clock accompanied by an `a` or `p` indication.        |

Note that the month and minute specifiers are ambiguous (`m` or `mm`). These strings are interpreted as a month number, unless preceded by an hour part (`h` or `hh`). In such cases, it displays minutes, as demonstrated in the following table.

| FORMAT STRING             | EXAMPEL DISPLAY         |
|---------------------------|-------------------------|
| d m yyyy                  | 22 9 2015               |
| h "hours and" m "minutes" | 12 hours and 25 minutes |

## Spreadsheet vs. Excel

The Spreadsheet does not support the following options that are otherwise available in Excel:

- Exponent (scientific) notation&mdashh;`E+`, `E-` Excel formats.
- Filling cell width&mdash;`*` Excel format.

## See Also

* [Server-Side API](/api/spreadsheet)
