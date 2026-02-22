---
title: Excluding Columns from the Exported PDF File
description: How can I exclude certain columns from the exported PDF file in a {{ site.product }} Grid?
type: how-to
page_title: Excluding Columns from the Exported PDF File
slug: grid-exclude-columns-during-pdf-export
tags: aspnet, mvc, grid, change, columns, exclude, during, pdf, export, exporting
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.product_short }} </td>
 </tr>
</table>

## Description

How can I exclude certain columns from the exported PDF file in a {{ site.product }}  Grid?

## Solution 

#### Using the `k-pdf-export` Class and CSS

To hide a Grid column only during the PDF export, use a CSS rule and reduce the width of the target column to zero. This approach is implemented because the Kendo UI Drawing API adds [the `k-pdf-export` class](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/custom-appearance#using-the) on all elements of the exported content and you can target specific elements in the following way.

```
<style>
  .k-pdf-export colgroup > col:nth-child(4) {
    width:0; /* hides only the 4th column during PDF export */
  }
</style>

```
For example refer to this [Telerik REPL Project](https://netcorerepl.telerik.com/mGEbbFlv24kGE8ul49)


#### Using the `showColum()` and `hideColumn()` Grid Methods

1. Hide the columns by using the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method within the [`pdfExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/pdfexport) event handler.
1. When the export is done, display the hidden column by using the [`showColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) method.

```
<script>
    var exportFlag = false;
    function onPdfExport(e){
             if (!exportFlag) {
              e.sender.hideColumn(1);
              e.preventDefault();
              exportFlag = true;

              e.sender.saveAsPDF().then(function(){
                e.sender.showColumn(1);
                exportFlag = false;
              });

            }
    }
</script>
```

For example refer to this [Telerik REPL Project](https://netcorerepl.telerik.com/mmYPvbvv29bLqpSd35)

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Excluding Columns from the Exported PDF File by Using `k-pdf-export`](https://netcorerepl.telerik.com/mGEbbFlv24kGE8ul49)
* [Telerik REPL: Excluding Columns from the Exported PDF File by Using `showColumn` and `hideColumn`](https://netcorerepl.telerik.com/mmYPvbvv29bLqpSd35)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
