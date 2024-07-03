---
title: Export to Excel Only the Filtered Rows from Telerik UI for {{ site.framework }} Grid
description: Learn how to export only the filtered rows from the Telerik UI for {{ site.framework }} Grid
type: how-to
page_title: Exporting Filtered Rows from Grid to Excel through Server Export 
slug: exporting-filtered-rows-grid
tags: grid, export, excel, filtered rows, filtered data, server export
ticketid: 1555436
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.framework }}</td>
 </tr>
</table>

## Description

How can I export only the filtered rows when using the Telerik UI for {{ site.framework }} Grid that uses [server export](https://demos.telerik.com/{{ site.platform }}/grid/server-export)?

## Solution

To export only the filtered rows to Excel when the Grid exports the data on the server, follow these steps:

1. Install the `Telerik.Core.Export` NuGet package from the private Telerik NuGet feed.
1. Create a form with three hidden inputs above the Grid declaration.

    * The input with name **data** will store both the format and workbook title.
    * The input with name **model** will store the column header information for the Grid.
    * The **filter** input will retrieve the currently applied column filters.

    ```HtmlHelper
        <form action="@Url.Action("ExportServer", "Grid")" method="POST">
            <input type="hidden" id="export-data" name="data" />
            <input type="hidden" id="export-model" name="model" />
            <input type="hidden" id="export-filter" name="filter" />
            <input type="submit" class="k-button download" data-format="xlsx" data-title="Title1" value="Export to XLSX" />
        </form>

        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            ...// Additional configuration.
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
                .Model(m=> m.Id(i=> i.OrderID))
            )
        )
    ```
    {% if site.core %}
    ```
        @addTagHelper *, Kendo.Mvc

        <form action="@Url.Action("ExportServer", "Grid")" method="POST">
            <input type="hidden" id="export-data" name="data" />
            <input type="hidden" id="export-model" name="model" />
            <input type="hidden" id="export-filter" name="filter" />
            <input type="submit" class="k-button download" data-format="xlsx" data-title="Title1" value="Export to XLSX" />
        </form>

        <kendo-grid name="grid">
            <!--Additional configuration.-->
            <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
                <transport>
                    <read url="@Url.Action("Orders_Read","Grid")"/>
                </transport>
                <schema>
                    <model id="OrderID"></model>
                </schema>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

1. Add the custom function for serializing and encoding the existing fields:

    ```
    <script>
        var escapeQuoteRegExp = /'/ig;

        function encodeFilterValue(value, encode) {
            if (typeof value === "string") {
                if (value.indexOf('Date(') > -1) {
                    value = new Date(parseInt(value.replace(/^\/Date\((.*?)\)\/$/, '$1'), 10));
                } else {
                    value = value.replace(escapeQuoteRegExp, "''");

                    if (encode) {
                        value = encodeURIComponent(value);
                    }

                    return "'" + value + "'";
                }
            }

            if (value && value.getTime) {
                return "datetime'" + kendo.format("{0:yyyy-MM-ddTHH-mm-ss}", value) + "'";
            }
            return value;
        }

        function serializeFilter(filter, encode) {
            if (filter.filters) {
                return $.map(filter.filters, function (f) {
                    var hasChildren = f.filters && f.filters.length > 1,
                        result = serializeFilter(f, encode);

                    if (result && hasChildren) {
                        result = "(" + result + ")";
                    }

                    return result;
                }).join("~" + filter.logic + "~");
            }

            if (filter.field) {
                return filter.field + "~" + filter.operator + "~" + encodeFilterValue(filter.value, encode);
            } else {
                return undefined;
            }
        }
    </script>

    ```
1. Handle the `click` event of the submit button of the form and populate the hidden inputs with the respective data. Transpose the custom serialization function of the data source and serialize the filter alongside other fields such as the model and current selection from the client side:

    ```
    <script>
        $(".download").on("click", function() {
            var grid = $("#grid").data("kendoGrid");
            var options = {
                format: $(this).data("format"),
                title: "DemoSheet"
            }

            $("#export-data").val(encodeURIComponent(JSON.stringify(options)));
            $("#export-model").val(encodeURIComponent(JSON.stringify(grid.columns)));
            $("#export-filter").val(encodeURIComponent(serializeFilter(grid.dataSource.filter())));
        });
    </script>
    ```
    
1. Set up the **ExportServer** action that creates the Excel file on the server and pushes it to the client:
    * Parse the passed filters from the client into a `FilterDescriptor` (built-in class provided by Kendo UI).
    * Execute the filter expression over the data collection and take the data items only.

    ```GridController.cs
    using Kendo.Core.Export;
    using Newtonsoft.Json;
    using Telerik.Documents.SpreadsheetStreaming;

    public class GridController : Controller
    {
        [HttpPost]
        public FileStreamResult ExportServer(string model, string data, string filter, string selected)
        {
            var columnsData = JsonConvert.DeserializeObject<IList<ExportColumnSettings>>(HttpUtility.UrlDecode(model));
            columnsData = columnsData.Where(column => column.Field != null).ToList();

            var filters = FilterDescriptorFactory.Create(filter); // Parse the passed filters.

            var filteredData = GetData().ToDataSourceResult(new DataSourceRequest() { Filters = filters, Page = 1 }).Data; // Exdecute the filter expression. The "GetData()" Action returns a List<OrderViewModel> (the grid's data).

            dynamic options = JsonConvert.DeserializeObject(HttpUtility.UrlDecode(data));
            SpreadDocumentFormat exportFormat = options.format.ToString() == "csv" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;
            Action<ExportCellStyle> cellStyle = new Action<ExportCellStyle>(ChangeCellStyle);
            Action<ExportRowStyle> rowStyle = new Action<ExportRowStyle>(ChangeRowStyle);
            Action<ExportColumnStyle> columnStyle = new Action<ExportColumnStyle>(ChangeColumnStyle);

            string fileName = string.Format("{0}.{1}", options.title, options.format);
            string mimeType = Helpers.GetMimeType(exportFormat);

            Stream exportStream = filteredData.ToXlsxStream(columnsData, (string)options.title.ToString(), cellStyleAction: cellStyle, rowStyleAction: rowStyle, columnStyleAction: columnStyle);

            var fileStreamResult = new FileStreamResult(exportStream, mimeType);
            fileStreamResult.FileDownloadName = fileName;
            fileStreamResult.FileStream.Seek(0, SeekOrigin.Begin);

            return fileStreamResult;
        }

        private void ChangeCellStyle(ExportCellStyle e)
        {
            bool isHeader = e.Row == 0;
            SpreadCellFormat format = new SpreadCellFormat
            {
                ForeColor = isHeader ? SpreadThemableColor.FromRgb(50, 54, 58) : SpreadThemableColor.FromRgb(214, 214, 217),
                IsItalic = true,
                VerticalAlignment = SpreadVerticalAlignment.Center,
                WrapText = true,
                Fill = SpreadPatternFill.CreateSolidFill(isHeader ? new SpreadColor(93, 227, 0) : new SpreadColor(50, 54, 58))
            };
            e.Cell.SetFormat(format);
        }

        private void ChangeRowStyle(ExportRowStyle e)
        {
            e.Row.SetHeightInPixels(e.Index == 0 ? 80 : 30);
        }

        private void ChangeColumnStyle(ExportColumnStyle e)
        {
            double width = 100;
            e.Column.SetWidthInPixels(width);
        }
    }
    ```


## Notes

* The **filter** parameter contains the currently applied filters to the Grid columns.
* If you experience issues when exporting the data to CSV, ensure that the [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) is correct.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Grid Server Export Demo](https://demos.telerik.com/{{ site.platform }}/grid/server-export)
