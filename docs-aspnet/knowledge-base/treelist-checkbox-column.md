---
title: Bind CheckBoxes in the TreeList
description: An example on how to add a checkbox column to the {{ site.product }} TreeList which will set the initial checked state based on model values.
type: how-to
page_title: Add a CheckBbox Column to the TreeList
slug: treelist-checkbox-column
tags: treelist, checkbox
ticketid: 1141320
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} TreeList</td>
 </tr>
</table>

## Description

How can I add a checkbox column to the TreeList which will set an initial checked or unchecked state of the checkboxes based on the model values?

## Solution

Use the [`template`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/treelistcolumnbuilder#templatesystemstring) method of the TreeList column.

```Razor
columns.Add().Field(e => e.CheckBoxColumnField).Template(
        "#if(CheckBoxColumnField == true){#" +
            Html.Kendo().CheckBox().Name("name#:CheckBoxColumnField#").HtmlAttributes(new { @class = "CheckBoxColumnField" }).Checked(true).ToHtmlString() +
        "#}else{#" +
            Html.Kendo().CheckBox().Name("name#:CheckBoxColumnField#").HtmlAttributes(new { @class = "CheckBoxColumnField" }).ToHtmlString() +
        "#}#"
    );
```

## More {{ site.framework }} TreeList Resources

* [{{ site.framework }} TreeList Documentation]({%slug htmlhelpers_treelist_aspnetcore%})

* [{{ site.framework }} TreeList Demos](https://demos.telerik.com/{{ site.platform }}/treelist)

{% if site.core %}
* [{{ site.framework }} TreeList Product Page](https://www.telerik.com/aspnet-core-ui/treelist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TreeList Product Page](https://www.telerik.com/aspnet-mvc/treelist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TreeList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [Server-Side API Reference of the TreeList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/treelist)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
