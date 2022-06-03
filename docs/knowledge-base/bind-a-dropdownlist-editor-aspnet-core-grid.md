---
title: DropDownList Cannot Preselect the Drop-Down ID of the Current Grid Row
page_title: Bind a DropDownList Editor in the Grid | Kendo UI Grid for ASP.NET Core
description: I cannot get the dropdown to preselect the dropdown ID of the current row and cannot bind it to the column value of the Kendo UI Grid for ASP.NET Core.
type: troubleshooting
previous_url: /knowledge-base/how-to-bind-a-dropdownlist-editor-aspnet-core-grid
slug: bind-a-dropdownlist-editor-aspnet-core-grid
tags: aspnet, core, kendo, grid, editor, dropdownlist,custom,editing, inline, incell, howto, bind, model
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

I cannot get the DropDownList to preselect the dropdown ID of the current row. How can I bind it to the column value when the Grid for ASP.NET Core is in edit mode?

## Steps to Reproduce

This is a logged issue. The Core wrappers duplicate the property name when the `DropDownList()` and `Name()` declarations are used. For more information, refer to [this issue](https://github.com/telerik/kendo-ui-core/issues/3447).

## Suggested Workarounds

Kendo UI does not provide a built-in solution for achieving this behavior. However, you can still work around the issue by using a `.DropDownListFor(m => m)` definition.

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
