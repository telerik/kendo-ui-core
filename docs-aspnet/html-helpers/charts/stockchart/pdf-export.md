---
title: PDF Export
page_title: PDF Export
description: "Export the Telerik UI StockChart for {{ site.framework }} to PDF."
components: ["stockchart"]
slug: pdf_export_stockchart_aspnetcore
position: 4
---

# PDF Export

The StockChart component provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the StockChart to PDF](https://demos.telerik.com/{{ site.platform }}/financial/pdf-export).

To enable the PDF export:

1. Define the PDF export settings of the chart through the `Pdf()` configuration. You can specify the author, creator, date, name of the exported file, paper size, and more.

    ```HtmlHelper
        @(Html.Kendo().StockChart<StockDataPoint>()
        .Name("stockChart")
        .Pdf(pdf => pdf
            .FileName("Dashboard.pdf")
            .Date(DateTime.Now)
            .PaperSize("A4")
            .Margin(m => m.Top(2).Bottom(1).Left(2).Right(2))
        )
        ... // Additional configuration.
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-stockchart name="stockChart" date-field="Date">
            <pdf file-name="Dashboard.pdf" date=DateTime.Now paper-size="A4">
                <chart-pdf-margin top="2" bottom="1" left="2" right="2"/>
            </pdf>
            <!-- Additional configuration -->
        </kendo-stockchart>
    ```
    {% endif %}

1. Create an external button that will trigger the export and handle its `click` event. Within the event handler, get a reference to the StockChart and call the [`exportPDF()`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/methods/exportpdf) or [`saveAsPDF()`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/saveaspdf) client-side method.

    ```HtmlHelper
        @(Html.Kendo().Button()
        .Name("exportBtn")
        .Content("Export to PDF")
        .Events(ev => ev.Click("onClick")))

        <script>
            function onClick() {
                $("#stockChart").getKendoStockChart().exportPDF();
            }
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-button name="exportBtn" on-click="onClick">
            Export to PDF
        </kendo-button>

        <script>
            function onClick() {
                $("#stockChart").getKendoStockChart().exportPDF();
            }
        </script>
    ```
    {% endif %}

## See Also

* [Exporting the StockChart for {{ site.framework }} to PDF (Demo)](https://demos.telerik.com/{{ site.platform }}/financial/pdf-export)
* [Client-Side API of the StockChart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart)
* [Server-Side API of the StockChart](/api/stockchart)