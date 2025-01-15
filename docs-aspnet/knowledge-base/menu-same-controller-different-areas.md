---
title: Use the Same Controllers in Different Areas in the Menu Items
page_title: Use the Same Controllers in Different Areas in the Menu Items
description: "Learn how to use the same Controllers in different areas with a Telerik UI for {{ site.framework }} Menu."
previous_url: /helpers/navigation/menu/how-to/use-same-controller-in-different-areas, /html-helpers/navigation/menu/how-to/use-same-controller-in-different-areas
slug: menu-same-controller-different-areas
tags: menu, controller, different, areas
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Menu</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description
How can I use the same Controllers in different Areas with the Telerik UI for {{ site.framework }} Menu?

## Solution

```HtmlHelper
    @(Html.Kendo().Menu()
              .Name("menu")
              .Items(menu =>
              {
                  menu.Add().Text("Home").Action("Index", "Home", new { area = "" });
                  menu.Add().Text("Area1").Action("Index", "Home", new { area = "ChartInGrid" });
                  menu.Add().Text("Area2").Action("Index", "Home", new { area = "GridSelectionByField" });
                  menu.Add().Text("Register").Action("Index", "Home", new { area = "EditorImportExport" }).ContentHtmlAttributes(new { id = "registerLink" });
              })
   )
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-menu name="menu">
        <items>
            <menu-item text="Home" asp-action="Index" asp-controller="Home" asp-route-area=""></menu-item>
            <menu-item text="Area1" asp-action="Index" asp-controller="Home" asp-route-area="ChartInGrid"></menu-item>
            <menu-item text="Area2" asp-action="Index" asp-controller="Home" asp-route-area="GridSelectionByField"></menu-item>
            <menu-item text="Register" asp-action="Index" asp-controller="Home" asp-route-area="EditorImportExport" id="registerLink"></menu-item>
        </items>
    </kendo-menu>
```
{% endif %}

For the complete implementation of the suggested approach, refer to [the ASP.NET MVC project on how to use the same Controller in different Areas with the Menu component](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/MenuSameControllersInDifferentAreas). {% if site.core %}You can use this as a starting point to configure the same setup in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Menu Resources

* [{{ site.framework }} Menu Documentation]({%slug htmlhelpers_menu_aspnetcore%})

* [{{ site.framework }} Menu Demos](https://demos.telerik.com/{{ site.platform }}/menu)

{% if site.core %}
* [{{ site.framework }} Menu Product Page](https://www.telerik.com/aspnet-core-ui/menu)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Menu Product Page](https://www.telerik.com/aspnet-mvc/menu)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Server-Side API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/menu/api)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/menu)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
