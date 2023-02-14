---
title: DropDownList Cannot Preselect the Drop-Down ID of the Current Grid Row
description: I cannot get the DropDownList to preselect the drop-down ID of the current Grid row and cannot bind it to the column value of the Telerik UI Grid HtmlHelper for ASP.NET Core.
type: troubleshooting
page_title: Bind a DropDownList Editor in the Grid
previous_url: /knowledge-base/how-to-bind-a-dropdownlist-editor-aspnet-core-grid
slug: grid-bind-a-dropdownlist-editor
tags: aspnet, core, kendo, grid, editor, dropdownlist,custom,editing, inline, incell, howto, bind, model
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

I cannot get the DropDownList to preselect the drop-down ID of the current row. How can I bind it to the column value when the Grid for ASP.NET Core is in edit mode?

## Steps to Reproduce

This is a logged issue. The Core helpers duplicate the property name when the `DropDownList()` and `Name()` declarations are used. For more information, refer to [this issue](https://github.com/telerik/kendo-ui-core/issues/3447).

## Suggested Workarounds

Telerik UI for ASP.NET Core does not provide a built-in solution for achieving this behavior. However, you can still work around the issue by using a `.DropDownListFor(m => m)` definition when defining an Editor Template.

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

For further details on configuring Custom Editors for the Grid refer to the [Custom Editing](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/editing/custom#custom-editing) section of the documentation and the [runnable example demonstrating the use of a DropDownList as a Custom Editor](https://demos.telerik.com/aspnet-core/grid/editing-custom)
## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
