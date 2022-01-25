---
title: Create Custom Number Editor Using NumericTextBox
description: How to create a Grid with a custom number editor by using the NumericTextBox.
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

How to create a Grid with a custom number editor by using the NumericTextBox.

## Solution 

1. Create an editor template within the following directory - "~\Views\Shared\EditorTemplates\"
2. Pass the newly created view name to the following column configuration : 

```
columns.Bound(p => p.Freight).EditorTemplateName("CustomNumericTextBox");
```

#### Example

```Index.cshtml
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
```CustomNumericTextBox.cshtml
@model double?

@(Html.Kendo().NumericTextBoxFor(m => m)
      .Value(Model)
      .Decimals(7)
      .Format("{0:p5}")
)

```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)