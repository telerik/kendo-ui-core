---
title: Exporting Detail Grids
page_title:  Exporting Detail Grids
description: Learn how to export master and detail Grids to Excel when working with the {{ site.product }}.
slug: howto_exportto_excel_masterand_detail_grid
tags: grid, export, detail, grids
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.framework }} </td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Progress Telerik UI version</td>
  <td>2021.3.1207</td>
 </tr>
</table>

## Description

How can I export master and detail {{ site.framework }} Grids to Excel?

## Solution

The following examples demonstrate how to export detail Grids to Excel and merge their workbooks with the master Grid workbook.

To get the workbook of the detail Grids, the demos use the [`excelExport`](api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemfuncsystemobjectsystemobject) event. This event is prevented to avoid the saving of an Excel file for each detail Grid. For more information on how Excel documents work, refer to the [introductory help topic on Excel](https://docs.telerik.com/kendo-ui/framework/excel/introduction#create-excel-document).

The following example demonstrates how to export a detail Grid to Excel including the current page only.

Refer to the [following REPL](https://netcorerepl.telerik.com/QwOFwYbU29KigMrU43) for a runnable sample of the code below.

```
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(e => e.FirstName).Width(120);
            columns.Bound(e => e.LastName).Width(120);
            columns.Bound(e => e.Country).Width(120);
            columns.Bound(e => e.City).Width(120);
            columns.Bound(e => e.Title);
        })
        .Sortable()
        .Pageable()
        .Scrollable()
        .ToolBar(tools => tools.Excel())
        .ClientDetailTemplateId("template")
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(5)
            .Model(model => model.Id(p=>p.EmployeeID))
            .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
        )
        .Events(e => e.ExcelExport("employees_excelExport").DetailInit("employees_detailInit").DataBound("dataBound"))
)
<script id="template" type="text/kendo-tmpl">

           @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
             .Name("grid_#=EmployeeID#")
             .Columns(columns =>
             {
                columns.Bound(o => o.OrderID).Title("ID").Width(80);
                columns.Bound(o => o.ShipCountry).Width(110);
                columns.Bound(o => o.ShipAddress);
                columns.Bound(o => o.ShipName).Width(190);
             })
             .DataSource(dataSource => dataSource
                .Ajax()
                .Model(model => model.Id(p=>p.OrderID))
                .PageSize(5)
                .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new{ employeeID = "#=EmployeeID#" })))
            .Pageable()
            .Sortable()
            .ToClientTemplate()
           )

</script>
<script>
            function dataBound() {
                detailExportPromises = [];
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            }
            var detailExportPromises = [];
            function employees_detailInit(e) {
                var deferred = $.Deferred();
                // get the index of the master row
                var masterRowIndex = e.masterRow.index(".k-master-row");
                // add the deferred to the list of promises
                detailExportPromises.push(deferred);
                var detailGrid = e.detailRow.find("[data-role=grid]").data("kendoGrid");
                detailGrid.bind("excelExport", function (e) {
                    // prevent saving the file
                    e.preventDefault();
                    // resolve the deferred
                    deferred.resolve({
                        masterRowIndex: masterRowIndex,
                        sheet: e.workbook.sheets[0]
                    });
                });
            }
            function employees_excelExport(e) {
                // prevent saving the file because we will update the workbook
                e.preventDefault();
                var workbook = e.workbook;
                // Export all detail grids
                $("[data-role=grid]", this.element).each(function () {
                    $(this).data("kendoGrid").saveAsExcel();
                });
                // wait for all detail grids to finish exporting
                $.when.apply(null, detailExportPromises)
                    .then(function () {
                        // get the export results
                        var detailExports = $.makeArray(arguments);
                        // sort by masterRowIndex
                        detailExports.sort(function (a, b) {
                            return a.masterRowIndex - b.masterRowIndex;
                        });
                        // add an empty column
                        workbook.sheets[0].columns.unshift({ width: 30 });
                        // prepend an empty cell to each row
                        for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                            workbook.sheets[0].rows[i].cells.unshift({});
                        }
                        // merge the detail export sheet rows with the master sheet rows
                        // loop backwards so the masterRowIndex doesn't need to be updated
                        for (var i = detailExports.length - 1; i >= 0; i--) {
                            var masterRowIndex = detailExports[i].masterRowIndex + 1;
                            var sheet = detailExports[i].sheet;
                            // prepend an empty cell to each row
                            for (var ci = 0; ci < sheet.rows.length; ci++) {
                                if (sheet.rows[ci].cells[0].value) {
                                    sheet.rows[ci].cells.unshift({});
                                }
                            }
                            // insert the detail sheet rows after the master row
                            [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
                        }
                        // save the workbook
                        kendo.saveAs({
                            dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                            fileName: "Export.xlsx"
                        });
                    });
            }
</script>
```

The following example demonstrates how to export a detail Grid to Excel including its all pages and details. To achieve this configure the Grid's [Excel `AllPages` property](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridexcelsettingsbuilder#allpagessystemboolean).

Refer to the [following REPL](https://netcorerepl.telerik.com/cwkFQYbK53UW6qxu07) for a runnable sample.

```
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(e => e.FirstName).Width(120);
            columns.Bound(e => e.LastName).Width(120);
            columns.Bound(e => e.Country).Width(120);
            columns.Bound(e => e.City).Width(120);
            columns.Bound(e => e.Title);
        })
        .Sortable()
        .Pageable()
        .Scrollable()
        .ToolBar(tools => tools.Excel())
        .Excel(excel=>excel.AllPages())
        .ClientDetailTemplateId("template")
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(5)
            .Model(model => model.Id(p=>p.EmployeeID))
            .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
        )
        .Events(e => e.ExcelExport("employees_excelExport").DetailInit("employees_detailInit").DataBound("dataBound"))
)
<script id="template" type="text/kendo-tmpl">

           @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
             .Name("grid_#=EmployeeID#")
             .Columns(columns =>
             {
                columns.Bound(o => o.OrderID).Title("ID").Width(80);
                columns.Bound(o => o.ShipCountry).Width(110);
                columns.Bound(o => o.ShipAddress);
                columns.Bound(o => o.ShipName).Width(190);
             })
             .DataSource(dataSource => dataSource
                .Ajax()
                .Model(model => model.Id(p=>p.OrderID))
                .PageSize(5)
                .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new{ employeeID = "#=EmployeeID#" })))
            .Pageable()
            .Sortable()
            .ToClientTemplate()
           )

</script>
<script>
            function dataBound() {
                detailExportPromises = [];
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            }
            var detailExportPromises = [];
            function employees_detailInit(e) {
                var deferred = $.Deferred();
                // get the index of the master row
                var masterRowIndex = e.masterRow.index(".k-master-row");
                // add the deferred to the list of promises
                detailExportPromises.push(deferred);
                var detailGrid = e.detailRow.find("[data-role=grid]").data("kendoGrid");
                detailGrid.bind("excelExport", function (e) {
                    // prevent saving the file
                    e.preventDefault();
                    // resolve the deferred
                    deferred.resolve({
                        masterRowIndex: masterRowIndex,
                        sheet: e.workbook.sheets[0]
                    });
                });
            }
            function employees_excelExport(e) {
                // prevent saving the file because we will update the workbook
                e.preventDefault();
                var workbook = e.workbook;
                // Export all detail grids
                $("[data-role=grid]", this.element).each(function () {
                    $(this).data("kendoGrid").saveAsExcel();
                });
                // wait for all detail grids to finish exporting
                $.when.apply(null, detailExportPromises)
                    .then(function () {
                        // get the export results
                        var detailExports = $.makeArray(arguments);
                        // sort by masterRowIndex
                        detailExports.sort(function (a, b) {
                            return a.masterRowIndex - b.masterRowIndex;
                        });
                        // add an empty column
                        workbook.sheets[0].columns.unshift({ width: 30 });
                        // prepend an empty cell to each row
                        for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                            workbook.sheets[0].rows[i].cells.unshift({});
                        }
                        // merge the detail export sheet rows with the master sheet rows
                        // loop backwards so the masterRowIndex doesn't need to be updated
                        for (var i = detailExports.length - 1; i >= 0; i--) {
                            var masterRowIndex = detailExports[i].masterRowIndex + 1;
                            var sheet = detailExports[i].sheet;
                            // prepend an empty cell to each row
                            for (var ci = 0; ci < sheet.rows.length; ci++) {
                                if (sheet.rows[ci].cells[0].value) {
                                    sheet.rows[ci].cells.unshift({});
                                }
                            }
                            // insert the detail sheet rows after the master row
                            [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
                        }
                        // save the workbook
                        kendo.saveAs({
                            dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                            fileName: "Export.xlsx"
                        });
                    });
            }
</script>
```

Refer to the [following REPL](https://netcorerepl.telerik.com/cwkFQYbK53UW6qxu07) for a runnable sample.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

* [{{ site.framework }} Grid Detail Template Demo](https://demos.telerik.com/{{ site.platform }}/grid/detailtemplate)

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

* [Telerik REPL: Exporting a Detail Grid to Excel by Including All Pages and Details](https://netcorerepl.telerik.com/cwkFQYbK53UW6qxu07)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
