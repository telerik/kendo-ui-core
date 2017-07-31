---
title: How to Add a DropDownList for Inline Editing of an ASP.NET Core Grid
description: Add a DropDownList Editor for Kendo UI Grid ASP.NET Core
type: troubleshooting
page_title: Bind a DropDownList Editor in the Kendo UI Grid ASP.NET.Core
slug: dropdownlist_custom_editor_aspnetcore_grid
position: 0
tags: aspnet, core, kendo, grid, editor, dropdownlist,custom,editing, inline,incell, howto, bind, model
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>217.2.621</td>
 </tr>
</table>

 
## Description 

I can't get the dropdown to preselect the current row's dropdown id. How can I bind it to the column value when in edit mode?

## Suggested Workarounds

Use a `.DropDownListFor(m => m)` definition as below: 

```
@model Project.Models.StateProvinceRegionViewModel

@(Html.Kendo().DropDownListFor(m => m)
    .DataValueField("Id") 
    .DataTextField("Name") 
    .DataSource(d => d
        .Read(r => r.Action("GetStateProvinceRegions", "Admin"))
    )
)
```

## Steps to Reproduce

This is a logged issue. The Core wrappers duplicate the property name when `DropDownList()` and `Name()` declaration is used.
More information is available at: [https://github.com/telerik/kendo-ui-core/issues/3447](https://github.com/telerik/kendo-ui-core/issues/3447)
