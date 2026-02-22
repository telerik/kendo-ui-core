---
title: Configure ForeignKey Columns with ComboBox Editor in Grids
page_title: Configure ForeignKey Columns with ComboBox Editor in Grids
description: "Edit a {{ site.product }} Grid that has a foreign-key column with a {{ site.product }} ComboBox editor in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/configure-foreignkey-columns-combobox-edit-template, /html-helpers/data-management/grid/how-to/editing/configure-foreignkey-columns-combobox-edit-template
slug: howto_confforeignkeycomboboxedittemplates_gridaspnetmvc
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I configure the foreign-key columns in the Grid to use a ComboBox editor?

## Solution

You can achieve this requirement using the following implementation:

1. Define a foreign-key column in the Grid and specify the name of the View that contains its editor using the `EditorTemplateName` option:

```Razor
columns.ForeignKey(p => p.EmployeeId, (System.Collections.IEnumerable)ViewData["employees"], "EmployeeId", "Name").EditorTemplateName("ComboBox");

```

2. Create a View in the `~/Views/Shared/EditorTemplates/` folder with the name **ComboBox** that contains the ComboBox editor:

```Razor
@model object

@(Html.Kendo().ComboBoxFor(m => m)
        .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("") + "_Data"])
)
```

To review the complete example, refer to the [ASP.NET MVC application on how to configure a foreign-key column in the Grid to use the ComboBox component as an editor](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridForeignKeyComboBoxColumn).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)