---
title: Change Columns Width during PDF Exporting
description: How to change the width of the Grid columns when exporting them to PDF and when working with the {{ site.product }} components?
type: how-to
page_title: Change Columns Width during PDF Exporting
slug: grid-change-columns-width-during-pdf-export
tags: aspnet, mvc, grid, change, columns, width, during, pdf, export, exporting
res_type: kb
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

How can I change the width of the {{ site.product }} Grid columns when I export them to PDF?

## Solution

The PDF Export appends a `k-pdf-export` class to all the elements and then removes it. That is why, you can target the `colgroup > col` setting and use CSS rules.

```CSS
.k-pdf-export colgroup > col {
  width: 50px !important;        
}

.k-pdf-export td {
  white-space: nowrap;
}

```

You can also target specific columns by using the `:nth-child()` selector.

```CSS
.k-pdf-export colgroup > col:nth-child(1),
.k-pdf-export colgroup > col:nth-child(4),
.k-pdf-export colgroup > col:nth-child(7)
{
    width: 150px !important;        
}

```

For a runnable example based on the code above, refer to the [Telerik REPL project on changing column width during PDF exporting](https://netcorerepl.telerik.com/GmOlbYFe44cykJ0K06)

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

* [Telerik REPL: Changing Column Width during PDF Exporting](https://netcorerepl.telerik.com/GmOlbYFe44cykJ0K06)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
