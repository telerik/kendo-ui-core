---
title: Excel Export
page_title: PivotGridV2 Excel Export
description: "Get started with the Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} and learn how to export it to Excel."
slug: htmlhelpers_pivotgridv2_aspnetcore_excelexport
position: 0
---

# Excel Export

The PivotGridV2 provides built-in Excel export capabilities.

To use the Excel export feature, reference the JSZip library before the Kendo UI JavaScript files in the `_Layout.cshtml`. For more information, refer to the Excel export [requirements]({% slug exportsupport_core %}#jszip-library).

## General

To export the PivotGridV2, call the [`saveAsExcel()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgridv2/methods/saveasexcel) client-side API method of the component.

```JS script
<script>
    function buttonClick() {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");
        pivotgrid.saveAsExcel(); 
    }
</script>
```

The PivotGridV2 also provides an Excel configuration that allows you to set additional options, such as the name of the generated file or the proxy URL.

```HtmlHelper
    @(Html.Kendo().PivotGridV2()
        .Name("pivotgrid")
        .Excel(excel => excel
            .FileName("Kendo UI PivotGridV2 Export.xlsx")
            .Filterable(true)
            .ProxyURL(Url.Action("Excel_Export_Save", "Home"))
        )
        //... Other configuration ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="580">
        <excel proxy-url="@Url.Action("Excel_Export_Save","Home")" filterable="true" file-name="Kendo UI PivotGridV2 Export.xlsx" />
        //... Other configuration ...
    </kendo-pivotgridv2>
```
{% endif %}

## Next Steps

* [Configuring the export to Excel](/api/kendo.mvc.ui.fluent/pivotgridv2builder)
* [Exporting the PivotGridV2 to Excel (demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/excel-export)

## See Also

* [PDF Export by the PivotGridV2 HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/pdf-export)
* [Server-Side API](/api/pivotgridv2)
