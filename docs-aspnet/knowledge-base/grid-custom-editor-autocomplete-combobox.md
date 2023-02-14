---
title: Use AutoComplete as Custom Column Editor
description: How can I use the Telerik UI AutoComplete as a custom column editor for the Telerik UI Grid?
type: how-to
page_title: Use AutoComplete as Custom Column Editor
slug: grid-custom-editor-autocomplete-combobox
tags: aspnet, mvc, grid, custom, editor, autocomplete, combobox,
res_type: kb
component: grid, autocomplete, 
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.product_short }} </td>
 </tr>
</table>

## Description

How can I use the Telerik UI AutoComplete as a custom column editor for the Telerik UI Grid?

## Solution 

1. Create an editor template within the following directory - "~\Views\Shared\EditorTemplates\"
2. Pass the newly created view name to the following column configuration : 

```
columns.Bound(p => p.ProductName).EditorTemplateName("CustomEditorName");
```

#### Example
```Index.cshtml

@(Html.Kendo().Grid<GridExample.Models.ProductViewModel>()
    .Name("Grid")
    .Columns(columns => {
        //columns.Bound(p => p.ProductName).EditorTemplateName("AutoCompleteEditor");
        columns.Bound(p => p.ProductName).EditorTemplateName("ComboBoxEditor");
        columns.Command(command => command.Destroy());
    })
    .Pageable()
    .Editable(editable => editable.Mode(GridEditMode.InCell))
    .Scrollable()
    .ToolBar(t => { t.Create(); t.Save(); })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Batch(true)
        .PageSize(20)
        .ServerOperation(false)
        .Model(model => model.Id(p => p.ProductID))
        .Create("Create", "Grid")
        .Read(r=>r.Action("Read", "Grid"))
        .Update(u=>u.Action("Update", "Grid"))
        .Destroy("Destroy", "Grid")
    )
)

```
```AutoCompleteEditor.cshtml

@(Html.Kendo().AutoComplete()
      .Name("ProductName")
      .Placeholder("Select name...")
      .BindTo(new List<string>() {
            "My new name 1",
            "My new name 2",
            "My new name 3",
      }))

```
```ComboBoxEditor.cshtml

@(Html.Kendo().ComboBox()
      .Name("ProductName")
      .Placeholder("Select name...")
      .BindTo(new List<string>() {
          "My new name 1",
          "My new name 2",
          "My new name 3"
      })
      .HtmlAttributes(new { style="width:100%;" }))

```