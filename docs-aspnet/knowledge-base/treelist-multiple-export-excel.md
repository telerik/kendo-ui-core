---
title: Export Multiple TreeLists to Excel
page_title: Export Multiple TreeLists to Excel
description: "Export two or more Telerik UI TreeLists to the same Excel document in {{ site.framework }} applications."
type: how-to
previous_url: /helpers/data-management/treelist/how-to/multiple-grid-export, /html-helpers/data-management/treelist/how-to/multiple-grid-export
slug: howto_exportmultipletoexcel_treelistaspnetmvc
tags: treelist, multiple, export, excel, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TreeList for {{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I export multiple {{ site.framework }} TreeList components to a single Excel document?

## Solution

In this example, each TreeList is exported to a separate Excel sheet. For more information on the Excel generation, refer to the [Excel export overview article](https://docs.telerik.com/kendo-ui/framework/excel/introduction).

1. Create an external button to export the TreeLists data when it is clicked.
1. Use the client-side [`saveAsExcel()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/saveasexcel) method to trigger the data export of each TreeList.
1. Handle the [`ExcelExport`](/api/kendo.mvc.ui.fluent/treelisteventbuilder#excelexportsystemstring) event of the TreeLists and prevent its default action.
1. Create a new Workbook that contains the sheets with the TreeLists data and save it through the [`kendo.saveAs()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/saveas) method.

```HtmlHelper
<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

<button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" id="export">Export TreeLists to Excel</button>

<h3>Designers</h3>
@(Html.Kendo().TreeList<Telerik.Examples.Mvc.Areas.TreeListExportingMultiple.Models.EmployeeDirectoryModel>()
    .Name("designers")
    .Events(e => e.ExcelExport("onExcelExportDesigners"))
    ... // Additional configuration.
)
<h3>Lead personnel</h3>
@(Html.Kendo().TreeList<Telerik.Examples.Mvc.Areas.TreeListExportingMultiple.Models.EmployeeDirectoryModel>()
    .Name("leads")
    .Events(e => e.ExcelExport("onExcelExportLead"))
    ... // Additional configuration.
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

<button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" id="export">Export TreeLists to Excel</button>

<h3>Designers</h3>
<kendo-treelist name="designers" on-excel-export="onExcelExportDesigners">
    <!-- Additional configuration.-->
</kendo-treelist>

<h3>Lead personnel</h3>
<kendo-treelist name="leads" on-excel-export="onExcelExportLead">
    <!-- Additional configuration.-->
</kendo-treelist>
```
{% endif %}
```JS Scripts
<script>
    function onExcelExportDesigners(e) {
        e.preventDefault();
        promises[0].resolve(e.workbook);
    }

    function onExcelExportLead(e) {
        e.preventDefault();
        promises[1].resolve(e.workbook);
    }

    // Used to sync the exports.
    var promises = [
        $.Deferred(),
        $.Deferred()
    ];

    $(document).ready(function(){
        $("#export").click(function (e) {
            // Trigger the export of the "designers" TreeList.
            $("#designers").data("kendoTreeList").saveAsExcel();
            // Trigger the export of the "leads" TreeList.
            $("#leads").data("kendoTreeList").saveAsExcel();
            // Wait for both exports to finish.
            $.when.apply(null, promises)
                .then(function (designersWorkbook, leadsWorkbook) {

                    // Create a new workbook using the sheets of the "designers" and "leads" workbooks.
                    var sheets = [
                        designersWorkbook.sheets[0],
                        leadsWorkbook.sheets[0]
                    ];

                    sheets[0].title = "Designers";
                    sheets[1].title = "Leads";

                    var workbook = new kendo.ooxml.Workbook({
                        sheets: sheets
                    });

                    promises = [
                        $.Deferred(),
                        $.Deferred()
                    ];

                    // Save the new workbook.
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "DesignersAndLeaders.xlsx"
                    });
                });
        });
    });
</script>
```

For a runnable example, refer to the [ASP.NET MVC application on how to export the data of multiple TreeLists in a single Excel document](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/TreeListExportingMultiple). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} TreeList Resources

* [{{ site.framework }} TreeList Documentation]({%slug htmlhelpers_treelist_aspnetcore%})
* [{{ site.framework }} TreeList Demos](https://demos.telerik.com/{{ site.platform }}/treelist)
{% if site.core %}
* [{{ site.framework }} TreeList Product Page](https://www.telerik.com/aspnet-core-ui/treelist)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} TreeList Product Page](https://www.telerik.com/aspnet-mvc/treelist)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Getting Started with Excel Export](https://docs.telerik.com/kendo-ui/framework/excel/get-started)
* [Server-Side API Reference of the TreeList for {{ site.framework }}](/api/treelist)
{% if site.core %}
* [Server-Side TagHelper API Reference of the TreeList for {{ site.framework }}](/api/taghelpers/treelist)
{% endif %}
* [Client-Side API Reference of the TreeList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
