---
title: Aligning a Numeric Column to the Right
description: Learn how to add CSS styling for right alignment of numeric field in the Grid for {{ site.framework }}. Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
type: how-to
page_title: Numeric Column Right Alignment
slug: grid-numeric-column-add-css-alignment
tags: grid, CSS, alignment, column, numeric
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® {{ site.product_short }} Grid</td>
 </tr>
</table>


## Description

How can I align a numeric column in the {{ site.product }} Grid?

## Solution

Add a custom class for the needed columns. Apply the appropriate styles using the class name selector. 

```
<column field="UnitPrice" title="Unit Price" html-attributes='new Dictionary<string, object>{ ["class"] = "numericColumn" }'/>

<style>
    .numericColumn {
        text-align: right;
    }
</style>    
```

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
