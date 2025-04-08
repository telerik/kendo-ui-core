---
title: Creating Custom Number Editor Using NumericTextBox
description: How can I create a Grid with a custom number editor by using the NumericTextBox in {{ site.product }}?
type: how-to
page_title: Create Custom Number Editor Using NumericTextBox
slug: grid-custom-editor-numeric-textbox
tags: aspnet, mvc, grid, custom, editor, numerictextbox, textbox, numeric
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

How can I create a Grid with a custom number editor by using the {{ site.product }} NumericTextBox?

## Solution 

1. Create an editor template within the `~\Views\Shared\EditorTemplates\` directory.

2. Pass the newly created view name to the following column configuration:

```Razor
columns.Bound(p => p.Freight).EditorTemplateName("CustomNumericTextBox");
```

### Example

```Razor Index.cshtml
@(Html.Kendo().Grid<GridColumnEditorTemplateKB.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID).Filterable(false);
        columns.Bound(p => p.Freight).Format("{0:p5}").EditorTemplateName("CustomNumericTextBox");
    })
    .Editable(s=>s.Mode(GridEditMode.InCell))
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(10)
        .Model(m=>m.Id(s=>s.OrderID))
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)
```
```Razor CustomNumericTextBox.cshtml
@model double?

@(Html.Kendo().NumericTextBoxFor(m => m)
      .Value(Model)
      .Decimals(7)
      .Format("{0:p5}")
)

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
