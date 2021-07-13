---
title: Server Export
page_title: Server Export
description: "Export the Telerik UI Grid for {{ site.framework }} on the Server."
slug: serverexport_gridhelper_aspnetcore
position: 5
---

# Server Export

The Telerik UI Grid for {{ site.framework }} exposes the functionality to export its data to XLSX (Excel) and CSV on the Server. This approach is recommended when the data is large and resource demanding. It escapes the need to serialize the whole dataset and to create the file on the Client. When Server-side export it used, the file is created on the Server and is pushed to the Client as a `File` object.

For a runnable example, refer to the [demo on Server export by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/server-export).

## Getting Started

To enable the Server export option of the grid:

1. Include a reference to the {% if site.core %} Telerik.Core.Export.nupkg from the private Telerik NuGet feed{% else %}`Kendo.Mvc.Export.dll` and `Telerik.Documents.SpreadsheetStreaming.dll` dlls available in the product's installation folder - `~installationFolder\export\binaries\net<version>`{% endif %}.
1. Include a form HTML element that would post to an ActionMethod on the server-side. 
    ```
    {% if site.core %}
        <form action="@Url.Action("ExportServer", "Grid")" method="POST" id="form">
            <input type="submit" class="k-button download" data-format="xlsx" data-title="ExcelExport" value="Export to XLSX" />
            <input type="submit" class="k-button download" data-format="csv" data-title="CSVExport" value="Export to CSV" />
        </form>
    {% else %}
        <form action="@Url.Action("ExportServer", "Grid")" method="POST">
            <input type="hidden" id="export-data" name="data" />
            <input type="hidden" id="export-model" name="model" />
            <input type="submit" class="k-button download" data-format="xlsx" data-title="Title1" value="Export to XLSX" />
            <input type="submit" class="k-button download" data-format="csv" data-title="Title2" value="Export to CSV" />
        </form>
    {% endif %}
    ```
1. Attach the click event handler to the buttons in the form and include the data and the settings of the columns:
    ```
    {% if site.core %}
        <script>
            function addOptionsToForm(options, form, parents) {
                for (var option in options) {
                    if (!options[option]) {
                        continue;
                    }

                    if (typeof options[option] === 'object') {
                        parents.push(option)
                        addOptionsToForm(options[option], form, parents);
                        parents.pop();
                    } else {
                        form.append('<input type="hidden" name="' + inputName(option, parents) + '" value="' + options[option] + '" />');
                    }
                }
            }

            function inputName(option, parents) {
                var result = "";

                if (!parents.length) {
                    return option;
                }

                for (var i = 0; i < parents.length; i++) {
                    if (i === 0) {
                        result += parents[i];
                        continue;
                    }
                    result += "[" + parents[i] + "]";
                }

                result += "[" + option + "]";

                return result;
            }

            function columnsFilterHandler(col) {
                return col.field;
            }

            function columnsMapHandler(col) {
                return {
                    title: col.title,
                    width: col.width,
                    field: col.field,
                    format: col.format,
                    hidden: col.hidden
                }
            }
            $(document).on("kendoReady", function () {
                $(".download").click(function () {
                    var grid = $("#grid").data("kendoGrid");
                    var options = {
                        format: $(this).data("format"),
                        title: $(this).data("title"),
                        columnSettings: grid.columns.filter(columnsFilterHandler).map(columnsMapHandler),
                        selectedIds: grid.selectedKeyNames()
                    }
                    $('#form input[type="hidden"]').remove();
                    addOptionsToForm(options, $('#form'), []);
                });
            });
        </script>
    {% else %}
        <script>
            $(document).on("kendoReady", function () { 
                $(".download").click(function () {
                    var grid = $("#Grid").data("kendoGrid");
                    var options = {
                        format: $(this).data("format"),
                        title: "DemoSheet"
                    }
                    $("#export-data").val(encodeURIComponent(JSON.stringify(options)));
                    $("#export-model").val(encodeURIComponent(JSON.stringify(grid.columns)));
                });
            });
        </script>
    {% endif %}
    ```
1. Create the File on the server-side and push it to the client:
    ```
    {% if site.core %}
        public FileStreamResult ExportServer(string model, string data)
        {
            var columnsData = JsonConvert.DeserializeObject<IList<ExportColumnSettings>>(HttpUtility.UrlDecode(model));
            dynamic options = JsonConvert.DeserializeObject(HttpUtility.UrlDecode(data));
            SpreadDocumentFormat exportFormat = options.format.ToString() == "csv" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;
            Action<ExportCellStyle> cellStyle = new Action<ExportCellStyle>(ChangeCellStyle);
            Action<ExportRowStyle> rowStyle = new Action<ExportRowStyle>(ChangeRowStyle);
            Action<ExportColumnStyle> columnStyle = new Action<ExportColumnStyle>(ChangeColumnStyle);

            string fileName = string.Format("{0}.{1}", options.title, options.format);
            string mimeType = Helpers.GetMimeType(exportFormat);

            Stream exportStream = exportFormat == SpreadDocumentFormat.Xlsx ?
                productService.Read().ToXlsxStream(columnsData, (string)options.title.ToString(), cellStyleAction: cellStyle, rowStyleAction: rowStyle, columnStyleAction: columnStyle) :
                productService.Read().ToCsvStream(columnsData);

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
            double width = e.Name == "Product name" || e.Name == "Category Name" ? 250 : 100;
            e.Column.SetWidthInPixels(width);
        }
    {% else %}
        public FileStreamResult ExportServer(string model, string data)
        {
            var columnsData = JsonConvert.DeserializeObject<IList<ExportColumnSettings>>(HttpUtility.UrlDecode(model));
            dynamic options = JsonConvert.DeserializeObject(HttpUtility.UrlDecode(data));
            SpreadDocumentFormat exportFormat = options.format.ToString() == "csv" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;
            Action<ExportCellStyle> cellStyle = new Action<ExportCellStyle>(ChangeCellStyle);
            Action<ExportRowStyle> rowStyle = new Action<ExportRowStyle>(ChangeRowStyle);
            Action<ExportColumnStyle> columnStyle = new Action<ExportColumnStyle>(ChangeColumnStyle);

            string fileName = string.Format("{0}.{1}", options.title, options.format);
            string mimeType = Helpers.GetMimeType(exportFormat);

            Stream exportStream = exportFormat == SpreadDocumentFormat.Xlsx ?
                productService.Read().ToXlsxStream(columnsData, (string)options.title.ToString(), cellStyleAction: cellStyle, rowStyleAction: rowStyle, columnStyleAction: columnStyle) :
                productService.Read().ToCsvStream(columnsData);

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
            double width = e.Name == "Product name" || e.Name == "Category Name" ? 250 : 100;
            e.Column.SetWidthInPixels(width);
        }
    {% endif %}
    ```
1. Add the following references in the Controller file:

    {% if site.core %}
    ```
        using Kendo.Mvc.Export;
        using Telerik.Documents.SpreadsheetStreaming;
        using Microsoft.AspNetCore.Mvc;
    ```
    {% else %}
      ```
        using Kendo.Mvc.Export;
        using Telerik.Documents.SpreadsheetStreaming;
    ```
    {% endif%}

{% if site.core %}
## Exporting Selected Data Only

By default, the Telerik UI Grid for {{ site.framework }} exports all rows. However, in order to export only the selected rows, make the grid selectable.

```
.Selectable()
```

Or, add a checkbox column for selection:

```
.Columns(columns => {
    columns.Select().Width(80);
})
```
 {% endif%}

## See Also

* [Excel Export by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/server-export)
* [Server-Side API](/api/grid)

