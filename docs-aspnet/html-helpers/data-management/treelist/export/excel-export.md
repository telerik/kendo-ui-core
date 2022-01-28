---
title: Excel Export
page_title: Excel Export
description: "Export the Telerik UI TreeList for {{ site.framework }} to Excel."
slug: htmlhelpers_treelist_aspnetcore_excelexport
position: 2
---

# Excel Export

The TreeList enables you to export its content to Excel.

For a runnable example, refer to the [demo on Excel export by the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/excel-export).

## Getting Started

To enable the Excel export option of the TreeList:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](/api/Kendo.Mvc.UI.Fluent/TreeListToolbarFactory#excel)
    * [Excel export configuration](/api/Kendo.Mvc.UI.Fluent/TreeListBuilder#excelsystemactionkendomvcuifluenttreelistexcelsettingsbuildert)
1. To take full advantage of the Excel export feature, download the JSZip library and include the file before the Kendo UI JavaScript files in the `Layout.cshtml`. For more information, refer to the article with the [requirements]({% if site.core %}{% slug exportsupport_core %}{% else %}{% slug exportsupport_aspnetmvc %}{% endif %}#jszip-library).

        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>

        @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
            .Name("treelist")
            .Toolbar(tools => tools.Excel())
            .Excel(excel => excel.FileName("Kendo UI TreeList Export.xlsx").ProxyURL(Url.Action("Excel_Export_Save")))
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("All", "EmployeeDirectory"))
            )
        )

To initiate the Excel export, press the **Toolbar** button or use the [TreeList client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist) and call the [`saveAsExcel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/saveasexcel) method.

## Outputting the Result

Through its default configuration, the Telerik UI TreeList for {{ site.framework }} exports the current page of the data with sorting, filtering, and aggregates applied. To export all pages, refer to [this section](#exporting-all-data).

The TreeList uses the current column order, visibility, and dimensions to generate the Excel file. It does not export the current CSS theme in the Excel file.

> * The TreeList exports only data-bound columns. Template and command columns are ignored.
> * The `ClientTemplate` option is not used during export.

## Exporting All Data

By default, the Telerik UI TreeList for {{ site.framework }} exports only the current page of data. To export all pages, set the `AllPages` option to `true`.

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Toolbar(tools => tools.Excel())
        .Excel(excel => excel.AllPages(true))
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "EmployeeDirectory"))
        )
    )

## See Also

* [Excel Export by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/excel-export)
* [Server-Side API](/api/treelist)
