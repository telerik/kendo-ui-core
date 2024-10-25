---
title: Using AutoComplete as Custom Column Editor
description: How can I use the {{ site.product }} AutoComplete as a custom column editor for the Grid in {{ site.product }}?
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

How can I use the {{ site.product }} AutoComplete as a custom column editor for the Grid in {{ site.product }}?

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
@model string

@(Html.Kendo().AutoCompleteFor(m => m)
      .Placeholder("Select name...")
      .BindTo(new List<string>() {
            "My new name 1",
            "My new name 2",
            "My new name 3",
      }))

```
```ComboBoxEditor.cshtml
@model string

@(Html.Kendo().ComboBoxFor(m => m)
      .Placeholder("Select name...")
      .BindTo(new List<string>() {
          "My new name 1",
          "My new name 2",
          "My new name 3"
      })
      .HtmlAttributes(new { style="width:100%;" }))

```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
