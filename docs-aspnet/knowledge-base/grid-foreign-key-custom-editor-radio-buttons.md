---
title: Using Radio Buttons as Foreign Key Editor in the Grid
description: An example on how to provide and use radio buttons instead of a DropDownDown Foreign Key column editor in the {{ site.product }} Grid.
type: how-to
page_title: Using Radios for a Foreign Key Column Editor
slug: grid-foreign-key-custom-editor-radio-buttons
tags: grid, foreign, editor, key, radio, buttons, custom, editor
ticketid: 1402074
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

I was wondering if there is a way to convert the foreign key column from a dropdown to radio buttons?

## Solution

-  Define a new editor in `Shared/EditorTemplates` and pass the collection via the `EditorViewData` to it:

```Razor
	columns.ForeignKey(x => x.NameCodeId, (System.Collections.IEnumerable)ViewData["NameCodes"], "Id", "Description")
        .Title("Foreign Key Column")
        .Width(200)
        .EditorTemplateName("Radios")
        .EditorViewData((System.Collections.IEnumerable)ViewData["NameCodes"]);
```

-  Get the ViewData, loop over it, creating the radio checkboxes. The must have a unique name which is translated to their id

    [Radios demo](https://demos.telerik.com/aspnet-mvc/styling/radios)

    The name HTML attribute is necessary so that the radios work as a group:

```cshtml
    // Radios.cshtml
 
    @model object
    @using ForeignKey.Models
    @{
        var options = (List<NameCode>)ViewData["NameCodes"];
    
        for (var i=0;i <options.Count; i++)
        {
            @Html.Kendo().RadioButton().Name("radio" + options[i].Id.ToString()).Label(options[i].  Description).HtmlAttributes(new { @name = "NameCodeId" }).Value(options[i].Id)
        }
    }
```
- In the case of in cell editing, every time you click on the edit cell, it closes. So you need to also add a mouse-down handler targeting the label as the input element is hidden:

```JS
	$(document).ready(function () {
        $("#grid").on("mousedown", ".k-radio-label", function (e) {
            e.preventDefault();
        })
    });
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
