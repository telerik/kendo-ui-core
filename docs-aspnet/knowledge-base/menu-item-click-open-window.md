---
title: Open Window from Menu Item Click by Using Ajax
page_title: Open Window from Menu Item Click by Using Ajax
description: "Learn how to open a Telerik UI for {{ site.framework }} Window through an Ajax request when a specified Telerik UI for {{ site.framework }} Menu item is clicked."
previous_url: /helpers/navigation/menu/how-to/grid-hierarchy-with-dynamic-model-loading-and-datatable, /html-helpers/navigation/menu/how-to/grid-hierarchy-with-dynamic-model-loading-and-datatable
slug: menu-item-click-open-window
tags: menu, window, open, select, item, ajax
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
How can I use a Telerik UI for {{ site.framework }} Menu item click to open a Telerik UI for {{ site.framework }} Window?

## Solution

1. Declare the Menu component.
1. Handle the [`Select`](/api/kendo.mvc.ui.fluent/menueventbuilder#selectsystemstring) event of the Menu. 
1. In the event handler, get the `id` attribute of the current item.
1. Conditionally check if the `id` is the expected one (**openWindow**).
1. Implement an [Ajax request](https://api.jquery.com/jQuery.ajax/) to an Action Method, which is specified in the Menu item.
1. In the Action Method, return a Partial View with the Window.

```HtmlHelper
    @{Html.Kendo().Menu()
          .Orientation(MenuOrientation.Horizontal)
          .Name("applicationMenu")
          .Items(menu => menu.Add().Text("Home").Items(homeMenu =>
              {
                  homeMenu.Add().Text("Show Window").Action("RenderWindow", "Home").HtmlAttributes(new { id = "openWindow" });
              }))
          .Events(e => e.Select("onSelect"))
          .Render();
    }
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-menu name="applicationMenu" on-select="onSelect">
        <items>
            <menu-item text="Home">
                <sub-items>
                    <menu-item text="Show Window" id="openWindow" asp-action="RenderWindow" asp-controller="Home"></menu-item>
                </sub-items>
            </menu-item>
        </items>
    </kendo-menu>
```
{% endif %}

```JavaScript
    <script type="text/javascript">
        function onSelect(e) {
    
            var itemId = $(e.item).attr("id");
    
            // Check if the menu item it the one, which must request the Partial View with the Window.
            if (itemId == "openWindow") {
                var url = $(e.item).find("a").attr("href");
                // Stop the link from redirecting to another page.
                e.preventDefault();
                // Request the Partial View with the Window.
                $.ajax({
                    url: url,
                    success: function (data) {
                        $("#main").append(data);
                    }
                });
            }
        }
    </script>
```

```Controller
    public IActionResult Index()
    {
        return View();
    }
    public ActionResult RenderWindow()
    {
        return PartialView("ShowWindow");
    }
```

```Razor PartialView
    <script type="text/javascript">
    	 // Destroy the Window after close to allow the opening of multiple Windows.
    	 function onClose(e) {
    		 itemForDelete = $(this.element);
    		 this.destroy();
    		 itemForDelete.remove();
    	 }
    </script>



    @(Html.Kendo()
    		.Window()
    		.Name("window")
    		.Title("My Window Title")
    		.Content(@<text>This is the content of a window, opened with ajax.</text>)
    		.Modal(true)
    		.Actions(a => a.Close())
    		.Draggable()
    		.Resizable()
    		.Width(400)
    		.Height(300)
    		.Events(e => e.Close("onClose"))
    )
```

For the complete implementation of the suggested approach, refer to the [ASP.NET MVC project on how to open a Window when a specified Menu item is clicked](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/MenuOpenWindowWithAjax). {% if site.core %}You can use this as a starting point to configure the same setup in an ASP.NET Core project.{% endif %}

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
