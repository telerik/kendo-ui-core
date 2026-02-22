---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Spreadsheet component for {{ site.framework }}."
components: ["spreadsheet"]
previous_url: /helpers/html-helpers/spreadsheet, /helpers/data-management/spreadsheet/overview
slug: htmlhelpers_spreadsheet_aspnetcore
position: 0
---

# {{ site.framework }} Spreadsheet Overview

{% if site.core %}
The Telerik UI Spreadsheet TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Spreadsheet widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Spreadsheet HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Spreadsheet widget.
{% endif %}

The Spreadsheet allows you to edit and visualize tabular data by using cell formatting options, styles, and themes.

* [Demo page for the Spreadsheet HtmlHelper](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)
{% if site.core %}
* [Demo page for the Spreadsheet TagHelper](https://demos.telerik.com/aspnet-core/spreadsheet/tag-helper)
{% endif %}

## Initializing the Spreadsheet

The following example demonstrates how to define the Spreadsheet.

```HtmlHelper
@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .Sheets(sheets => {
        sheets.Add()
            .Name("Food Order")
            .MergedCells("A1:F1", "C15:E15")
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
                rows.Add().Height(50).Cells(cells =>
                {
                    cells.Add()
                        .Value("My Company")
                        .FontSize(25)
                        .Background("rgb(142,196,65)")
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white");
                });

                rows.Add().Height(25).Cells(cells =>
                {
                    cells.Add()
                        .Value("ID")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Product")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Quantity")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Price")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Tax")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Amount")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);
                });
            });
        })
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        string[] mergedCells = new string[] { "A1:F1", "C15:E15" };
    }
    <kendo-spreadsheet name="spreadsheet">
        <sheets>
            <sheet name="FoodOrder" merged-cells="@mergedCells">
                <columns>
                    <sheet-column width="100" />
                    <sheet-column width="215" />
                    <sheet-column width="115" />
                    <sheet-column width="115" />
                    <sheet-column width="115" />
                    <sheet-column width="155" />
                </columns>
                <rows>
                    <sheet-row height="50">
                        <cells>
                            <cell value="My Company" font-size="25" background="rgb(142,196,65)" text-align="SpreadsheetTextAlign.Center" color="white">
                            </cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="ID" background="rgb(212,223,50)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Product" background="rgb(212,223,50)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Quantity" background="rgb(212,223,50)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Price" background="rgb(212,223,50)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Tax" background="rgb(212,223,50)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Amount" background="rgb(212,223,50)" text-align="SpreadsheetTextAlign.Center"></cell>
                        </cells>
                    </sheet-row>
                </rows>
            </sheet>
        </sheets>
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

## Basic Configuration

The following example demonstrates the basic configuration for the Spreadsheet component.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .HtmlAttributes(new { style = "width:100%" })
        .Excel(excel => excel
            .ProxyURL(Url.Action("Index_Save", "Spreadsheet"))
        )
        .Pdf(pdf => pdf
            .ProxyURL(Url.Action("Index_Save", "Spreadsheet"))
        )
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
```
```TagHelper
    <kendo-spreadsheet name="spreadsheet" style="width: 100%">
        <excel proxy-url="@Url.Action(" TagHelper_Save", "Spreadsheet" )" />
        <pdf proxy-url="@Url.Action("TagHelper_Save", "Spreadsheet")" />
        <sheets>
            <sheet name="FoodOrder" merged-cells="@mergedCells">
                <columns>
                    <sheet-column width="100" />
                    <sheet-column width="215" />
                    <sheet-column width="115" />
                    <sheet-column width="115" />
                    <sheet-column width="115" />
                    <sheet-column width="155" />
                </columns>
                <rows>
                    <sheet-row height="70">
                        <cells>
                            <cell value="Invoice #52 - 06/23/2015" font-size="32" background="rgb(96, 181, 255)" text-align="SpreadsheetTextAlign.Center" color="white">
                            </cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="ID" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Product" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Quantity" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Price" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Tax" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell value="Amount" background="rgb(167,214,255)" color="rgb(0,62,117)" text-align="SpreadsheetTextAlign.Center"></cell>
                            <cell background="rgb(167,214,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="216321" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Calzone" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="1" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="12.39" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C3*D3*0.2" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C3*D3+E3" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="546897" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Margarita" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="2" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="8.79" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C4*D4*0.2" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C4*D4+E4" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="456231" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Pollo Formaggio" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="1" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="13.99" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C5*D5*0.2" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C5*D5+E5" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="455873" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Greek Salad" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="1" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="9.49" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C6*D6*0.2" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C6*D6+E6" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="456892" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Spinach and Blue Cheese" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="1" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="11.49" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C7*D7*0.2" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C7*D7+E7" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="546564" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Rigoletto" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="1" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="10.99" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C8*D8*0.2" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C8*D8+E8" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="789455" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Creme Brulee" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="5" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="6.99" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C9*D9*0.2" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C9*D9+E9" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="123002" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Radeberger Beer" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="4" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell value="4.99" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C10*D10*0.2" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C10*D10+E10" format="$#,##0.00" background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell value="564896" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Budweiser Beer" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="3" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell value="4.49" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C11*D11*0.2" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="C11*D11+E11" format="$#,##0.00" background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(255,255,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(229,243,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="25">
                        <cells>
                            <cell background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell value="Tip:" text-align="SpreadsheetTextAlign.Right" vertical-align="SpreadsheetVerticalAlign.Bottom" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell formula="SUM(F3:F11)*0.1" bold="true" format="$#,##0.00" vertical-align="SpreadsheetVerticalAlign.Bottom" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                    <sheet-row height="50">
                        <cells>
                            <cell index="0" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell index="1" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell index="2" value="Total Amount: " text-align="SpreadsheetTextAlign.Right" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell index="5" formula="SUM(F3:F13)" bold="true" format="$#,##0.00" vertical-align="SpreadsheetVerticalAlign.Bottom" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                            <cell index="6" background="rgb(193,226,255)" color="rgb(0,62,117)"></cell>
                        </cells>
                    </sheet-row>
                </rows>
            </sheet>
        </sheets>
    </kendo-spreadsheet>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Rows(10)
        .Columns(10)
        .Sheetsbar(true)
        .Toolbar(true)
        .HtmlAttributes(new { style = "width:100%" })
        .Toolbar(t => t.Home(true).Data(false).Insert(false))
        .Excel(excel => excel
            .ProxyURL(Url.Action("Index_Save", "Spreadsheet"))
        )
        .Pdf(pdf => pdf
            .ProxyURL(Url.Action("Index_Save", "Spreadsheet"))
        )
    .Sheets(sheets =>
    {
        sheets.Add()
            .Name("Food Order")
            .MergedCells("A1:F1", "C15:E15")
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
                rows.Add().Height(50).Cells(cells =>
                {
                    cells.Add()
                        .Value("My Company")
                        .FontSize(25)
                        .Background("rgb(142,196,65)")
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white");
                });

                rows.Add().Height(25).Cells(cells =>
                {
                    cells.Add()
                        .Value("ID")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Product")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Quantity")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Price")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Tax")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Amount")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);
                });
            });
    })
    )
```
{% endif %}

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Comments]({% slug htmlhelpers_spreadsheet_comments_aspnetcore %}) | The Spreadsheet allows the user to insert comments within each cell. |
| [Custom functions]({% slug htmlhelpers_spreadsheet_custom_functions_aspnetcore %}) | You can customize the behavior of the Spreadsheet with formulas. |
| [Cell formatting]({% slug htmlhelpers_spreadsheet_formatting_aspnetcore %}) | The Spreadsheet supports cell-formatting options such as formatting of strings, text, numbers, dates, and time. |
| [Images]({% slug htmlhelpers_spreadsheet_images_aspnetcore %}) | The Spreadsheet supports the placing of images in its sheets. |
| [Import and export of data]({% slug htmlhelpers_spreadsheet_bind_to_datasource_aspnetcore %}) | The Spreadsheet can consume data from the server-side and then export an Excel file. |
| [End user guide]({% slug htmlhelpers_spreadsheet_user_guide_aspnetcore %}) | You can provide ready-made comprehensive guides about the Spreadsheet to your users. |
| [Sorting and Filtering]({% slug htmlhelpers_spreadsheet_sorting_filtering_aspnetcore %}) | The Spreadsheet for ASP.NET Core allows you to set predefined sort and filter settings. |
| [Disabled Cells]({% slug htmlhelpers_spreadsheet_disabled_cells_aspnetcore %}) | You can control the enabled and disabled state of the cells. |
| [Validation]({% slug htmlhelpers_spreadsheet_validation_aspnetcore %}) | The Spreadsheet allows you to validate if the user-provided input meets the expected requirements. |
| [Custom Cell Editors]({% slug htmlhelpers_spreadsheet_custom_cell_editors_aspnetcore %}) | The component supports custom cell editors that aids users enter correct values with ease.  |
| [Toolbar]({% slug spreadsheet_toolbar_aspnetcore %}) | The Spreadsheet component provides the means to customize its toolbar. |
| [Accessibility]({% slug htmlhelpers_spreadsheet_accessibility %}) | The component is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_spreadsheet %}) for faster navigation. |

## Next Steps

* [Getting Started with the Spreadsheet]({% slug spreadsheet_getting_started %})
* [Basic Usage of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet)
{% if site.core %}
* [Basic Usage of the Spreadsheet TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/spreadsheet)
* [Spreadsheet in Razor Pages]({% slug htmlhelpers_spreadsheet_bind_to_datasource_aspnetcore%}#data-source-binding-in-razor-pages)
{% endif %}

## See Also

* [Server-Side API](/api/spreadsheet)
* [Knowledge Base Section](/knowledge-base)

