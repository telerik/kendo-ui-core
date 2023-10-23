---
title: Excel Export
page_title: Excel Export
description: "Export the Telerik UI Grid for {{ site.framework }} to Excel."
previous_url: /html-helpers/data-management/grid/excel-export, /helpers/data-management/grid/excel-export
slug: excelexport_gridhelper_aspnetcore
position: 2
---

# Excel Export

The Grid enables you to export its content to Excel.

For a runnable example, refer to the [demo on Excel export by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/excel-export).

## Getting Started

To enable the Excel export option of the Grid:

1. Include the [toolbar configuration](/api/kendo.mvc.ui.fluent/gridtoolbarcommandfactory#excel).
1. Set the [export options](/api/kendo.mvc.ui.fluent/gridexcel{% if site.core %}settings{% endif %}builder).
1. To take full advantage of the Excel export feature, download the JSZip library and include the file before the Kendo UI JavaScript files in the `Layout.cshtml`. For more information, refer to the article with the [requirements]({% slug exportsupport_core %}#jszip-library).
    
    ```HtmlHelper
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>

        @(Html.Kendo().Grid<ProductViewModel>()
            .Name("grid")
            .ToolBar(tools => tools.Excel())
            .Excel(excel => excel
                .FileName("Products.xlsx")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>

        <kendo-grid name="grid">
            <toolbar>
                <toolbar-button name="excel"></toolbar-button>
            </toolbar>
            <excel file-name="Products.xlsx" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Action("Products_Read","Home")" />
                </transport>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}
        

To initiate the Excel export, press the **Toolbar** button or use the [Grid client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) and call the [`saveAsExcel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saveasexcel) method.

> Browser versions, such as Internet Explorer 9 and earlier, and Safari, require the implementation of a server proxy.

        [HttpPost]
        public ActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
        {
            var fileContents = Convert.FromBase64String(base64);

            return File(fileContents, contentType, fileName);
        }

## Outputting the Result

Through its default configuration, the Telerik UI Grid for {{ site.framework }} exports the current page of the data with sorting, filtering, grouping, and aggregates applied. To export all pages, refer to the section on [exporting all data](#exporting-all-data).

The Grid uses the current column order, visibility, and dimensions to generate the Excel file. It does not export the current CSS theme in the Excel file. For more information on changing the visual appearance of the Excel document, refer to the section about [customizing the Excel documents](#customizing-excel-documents).

> * The Grid exports only data-bound columns. Template and command columns are ignored.
> * The `Format` option is not used during export. For more information, refer to the section about [defining the column format](#defining-the-column-format).
> * The `ClientTemplate` option is not used during export. For more information, refer to the section on [setting the column templates](#setting-the-column-templates).

## Exporting All Data

By default, the Telerik UI Grid for {{ site.framework }} exports only the current page of data. To export all pages, set the `AllPages` option to `true`.

> When the `AllPages` option is set to `true`, the Grid makes a `read` request for all data. If the data items are too many, the browser may become unresponsive. For such scenarios, implement a server-side export.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .ToolBar(tools => tools.Excel())
        .Excel(excel => excel
            .AllPages(true)
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="excel"></toolbar-button>
        </toolbar>
        <excel all-pages="true" />
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Products_Read","Home")" />
            </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

## Customizing Excel Documents

The [`ExcelExport()`](/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event allows the customization of the generated excel document. the `workbook` event argument exposes the generated excel workbook configuration. for more information on how the excel documents work, refer to the article on [excel export in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/excel/introduction).

1. Attach an excel export handler.

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()    
            .Name("grid")
            .ToolBar(tools => tools.Excel())
            .Events(e => e.ExcelExport("excelExport"))
            /* Other configuration. */
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid" on-excel-export="excelExport">
            <toolbar>
                <toolbar-button name="excel"></toolbar-button>
            </toolbar>
            <!-- Other configuration. -->
        </kendo-grid>
    ```
    {% endif %}

1. In the handler, manipulate the generated workbook. The example alternates the [background color of the row cells](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.background).

        <script>
            function excelExport(e) {
                var sheet = e.workbook.sheets[0];
                for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                    if (rowIndex % 2 == 0) {
                        var row = sheet.rows[rowIndex];
                        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                            row.cells[cellIndex].background = "#aabbcc";
                        }
                    }
                }
            }
        </script>

## Exporting Right-to-Left Content

The [`ExcelExport()`](/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event allows you to reverse the cells and set the text alignment to support right-to-left (RTL) languages. To render the document in the right-to-left flow in excel, enable the [`rtl`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/rtl) option of the workbook.

Each row has a `type` field that can be used to distinguish between the various row types in the Grid. The supported values are:
- `"header"`
- `"footer"`
- `"group-header"`
- `"group-footer"`
- `"data"`

## Setting the Column Templates

The Telerik UI Grid for {{ site.framework }} does not use the `ClientTemplate` during Excel export. It exports only the data. The reason is that a column template may contain arbitrary HTML which cannot be converted to Excel column values. Here is how to use a column template that does not contain HTML:

1. Attach an excel export handler.

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()    
            .Name("grid")
            .ToolBar(tools => tools.Excel())
            .Events(e => e.ExcelExport("excelExport"))
            .Columns(columns => {
                columns.Bound(p => p.OrderID).Filterable(false).Width(100);
                columns.Bound(p => p.Freight).ClientTemplate("Freight: #: kendo.format('{0:c}', Freight) #");
            })
            /* Other configuration. */
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid" on-excel-export="excelExport">
            <toolbar>
                <toolbar-button name="excel"></toolbar-button>
            </toolbar>
            <columns>
                <column field="OrderID" width="100">
                    <filterable enabled="false"/>
                </column>
                <column field="Freight" width="100" template="Freight: #: kendo.format('{0:c}', Freight) #" />
            </columns>
            <!-- Other configuration. -->
        </kendo-grid>
    ```
    {% endif %}

1. In the handler, manipulate the generated workbook. The example applies the column template to the cell by assigning it to the [rows.cells.value](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.value).

        <script>
            function excelExport(e) {
                var sheet = e.workbook.sheets[0];
                var template = kendo.template(e.sender.columns[1].template);
                var data = e.sender.dataSource.view();
                for (var i = 0; i < data.length; i++) {
                    sheet.rows[i + 1].cells[1].value = template(data[i]);
                }
            }
        </script>

## Defining the Column Format

The Telerik UI Grid for {{ site.framework }} does not use the `Format` option during Excel export because some formats are incompatible with Excel. To format the cell values, set the Kendo UI for jQuery [`format`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells.

The [page on creating a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats that are supported by Excel.

1. Attach an excel export handler.

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()    
            .Name("grid")
            .ToolBar(tools => tools.Excel())
            .Events(e => e.ExcelExport("excelExport"))
            .Columns(columns => {
                columns.Bound(p => p.OrderID).Filterable(false).Width(100);
                columns.Bound(p => p.Freight).ClientTemplate("Freight: #: kendo.format('{0:c}', Freight) #");
            })
            /* Other configuration. */
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid" on-excel-export="excelExport">
            <toolbar>
                <toolbar-button name="excel"></toolbar-button>
            </toolbar>
            <columns>
                <column field="OrderID" width="100">
                    <filterable enabled="false"/>
                </column>
                <column field="Freight" width="100" template="Freight: #: kendo.format('{0:c}', Freight) #" />
            </columns>
            <!-- Other configuration. -->
        </kendo-grid>
    ```
    {% endif %}

1. In the handler, manipulate the generated workbook. The example applies a format to the cell by assigning it to the [rows.cells.format](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.format)

        <script>
            function excelExport(e) {
                var sheet = e.workbook.sheets[0];
                for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                    var sheet = e.workbook.sheets[0];
                    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                        var row = sheet.rows[rowIndex];
                        row.cells[1].format = "[Blue]#,##0.0_);[Red](#,##0.0);0.0;"
                    }
                }
            }
        </script>

{% if site.mvc %}

## Using the Detail Template

The Kendo UI Grid does not export its `DetailTemplate` for the same reason it does not export the column templates. If the detail template contains another Grid, follow [this runnable how-to example]({% slug howto_detailgridexcelexport_aspnetmvcgrid %}).

## Exporting Multiple Grids

For more information on how to export multiple Grids to a separate Excel sheet in a single Excel document, refer to [this runnable how-to example]({% slug howto_multiplegridexport_aspnetmvcgrid %}).
{% endif %}

## Server-Side Processing

To export huge datasets to Excel, use the [RadSpreadStreamProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) which is part of [Telerik Document Processing (TDP) by Progress](https://docs.telerik.com/devtools/document-processing/introduction).


## Excluding Columns from Exporting

In some scenarios, you might want to hide given column or multiple columns from being exported. This can be achieved using the [`Exportable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.exportable) setting.

```HtmlHelper
    columns.Bound(p => p.ProductName).Exportable(false);
``` 
{% if site.core %}
```TagHelper
    <column field="ProductName">
        <exportable enabled="false"/>
    </column>
```
{% endif %}

You can also set `Exportable` in a detailed fashion to include different values for Excel and PDF exporting modes, providing separate options for each:

```HtmlHelper
    columns.Bound(p => p.ProductName).Exportable(x=> x.Pdf(true).Excel(false));
```
{% if site.core %}
```TagHelper
    <column field="ProductName">
        <exportable enabled="true" pdf="true" excel="false"/>
    </column>
```
{% endif %}

In some scenarios, you may want to include instead of exclude columns. You can have defined Grid columns which are not displayed in the View mode and show them in the exported file. In this case, setting `.Exportable(true)` will not work automatically and you'll need to specifically use `.Exportable(x=> x.Pdf(false).Excel(true));`.

It is also important to note the difference between the `.Hidden()` and `.Visible()` properties of a Grid column. `.Hidden()` will hide the column only visually by using CSS. `.Visible()` will prevent the column from rendering at all.


## Known Limitations

* The Grid and its DataSource contain only the data items from the current page during client-side export. As a result, either make the export in chunks, or disable the paging feature.
* The maximum size of the exported file has a system-specific limit. For large data sets, use the server-side solution which is provided by the [RadSpreadStreamProcessing](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) as part of the [Document Processing Library](https://docs.telerik.com/devtools/document-processing/introduction).
* Exporting the Grid to Excel in older browsers, such as Internet Explorer 9 and Safari, requires the implementation of a server proxy. For more information, refer to [the `ProxyURL` configuration section](/api/kendo.mvc.ui.fluent/gridexcel{% if site.core %}settings{% endif %}builder#proxyurlsystemstring).
* The Grid does not use the column [`ClientTemplate`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clienttemplatesystemstring) during the Excel export&mdash;it exports only the data. the reason for this behavior is that a column template might contain arbitrary HTML which cannot be converted to excel column values. for more information on how to use a column template that does not contain HTML, refer to [this column template example](#setting-the-column-templates).
* The Grid does not export its [`ClientDetailTemplateId`](/api/kendo.mvc.ui.fluent/gridbuilder#clientdetailtemplateidsystemstring) for the same reason as it does not export its column templates.
* The Grid does not use [column formats](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#formatsystemstring) during the Excel export because some Kendo UI formats are incompatible with excel. To format the cell values, set the cell [`format`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.format) option of the cells.

For more information on the formats that are supported by Excel, refer to [this page](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4).

## See Also

* [Excel Export by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/excel-export)
* [Copying to Excel by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/copy-to-excel)
* [Server-Side API](/api/grid)
