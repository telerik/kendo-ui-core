---
title: Highlighting Selected Menu Item 
description: "Learn how to dynamically highlight the selected Menu item when working with {{ site.product }}."
page_title: Dynamically Highlight Selected Menu Item
slug: menu-selected-item-highlight
tags: menu, item, items, selected, highlight
component: menu
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2023.2.829</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Menu for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I highlight the selected menu items when using {{ site.product }} Menu component?

## Solution

The example implementation relies on the following key steps:

1. Create a `Menu` component with child items.
1. Within the `$(document).ready()` function, loop through the Menu items elements, and check if the item's `href` attribute equals the entire URL of the current page. If yes, add a class `selected-item` to the respective element.
1. Add the desired background color with CSS to the `selected-item` class and the `k-state-highlight` class, which indicates the current active Menu item.

```_Layout.cshtml
@(Html.Kendo().Menu()
    .Name("Menu")    // Add a name to the Menu component.
    .Items(items =>
    {
        items.Add().Text("Contacts").Action("Contact", "Home")  // The action method is used to link between pages.
        .Items(children =>                                     //  Add child items to the parent Menu items.
        {
            children.Add().Text("Contact child 1").Action("Contact1", "Home");
            children.Add().Text("Contact child 2").Action("Contact2", "Home");
            children.Add().Text("Contact child 3").Action("Contact3", "Home");
        });
        items.Add().Text("About").Action("About", "Home")
        .Items(children =>
        {
            children.Add().Text("About child 1").Action("About1", "Home");
            children.Add().Text("About child 2").Action("About2", "Home");
        });
        items.Add().Text("Home").Action("Index", "Home");
    })
    // IMPORTANT: The jQuery and CSS selectors of the Menu component element must match with the Name() of the Menu.
)
```

```HomeController.cs
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult About()
    {
        return View();
    }

    public IActionResult About1()
    {
        return View();
    }

    public IActionResult About2()
    {
        return View();
    }

    public IActionResult Contact()
    {
        return View();
    }

    public IActionResult Contact1()
    {
        return View();
    }

    public IActionResult Contact2()
    {
        return View();
    }

    public IActionResult Contact3()
    {
        return View();
    }

    public IActionResult Error()
    {
        return View();
    }
}
```


```JavaScript
<script>
    $(document).ready(function () {
        $.each(
            $("#Menu").find(".k-link"),  // Iterate through the items with class '.k-link'.
            function (i, data) {
                if (data.href == location.href) {                // Check if the 'href' attribute is the same as the current page location 'href'.
                    $(data).parent().addClass("selected-item"); // Add the selected-item class to its parent.
                }
            }
        );
    });
</script>
```

```CSS
<style>
    .selected-item,
    #Menu .k-state-highlight {    
        background-color: red; /* Customize the background color with whatever color you desire */
    }
</style>

```


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
* [Server-Side API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/menu)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
