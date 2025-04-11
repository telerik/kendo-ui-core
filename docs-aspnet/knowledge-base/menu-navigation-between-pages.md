---
title: Navigate Through Pages using Menu Component
description: "Learn how to navigate through the application pages using the Telerik UI for {{ site.product }} Menu component."
page_title: Navigate Through Pages using the Menu
slug: menu-navigation-between-pages
type: how-to
tags: menu, navigation, url, action, link, routing
component: menu
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2025.1.227</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Menu for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I configure the Telerik UI for {{ site.product }} Menu to navigate through different pages of my application?

## Solution

The Menu component renders anchor elements (`<a>`) by default. 

To navigate to the application pages, configure each item using the `Url()` or `Action()` methods.

```Index.cshtml

    @(Html.Kendo().Menu()
        .Name("menu")
        .Items(menu =>
        {
            menu.Add().Text("Home").Url(Url.Action("Index", "Home"));
            menu.Add().Text("About").Url(Url.Action("About", "Home"));
            menu.Add().Text("Contact").Url(Url.Action("Contact", "Home"));
        })
    )

```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-menu name="menu">
        <items>
            <menu-item text="Home" url="@Url.Action("Index", "Home")"></menu-item>
            <menu-item text="About" url="@Url.Action("About", "Home")"></menu-item>
            <menu-item text="Contact" url="@Url.Action("Contact", "Home")"></menu-item>
        </items>
    </kendo-menu>
```
{% endif %}

{% if site.core %}
```C# HomeController.cs
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
    
        public IActionResult Contact()
        {
            return View();
        }
    }
```
{% else %}
```C# HomeController.cs
    public class HomeController : Controller
    { 
        public ActionResult Index()
        {
            return View();
        }
    
        public ActionResult About()
        {
            return View();
        }
    
        public ActionResult Contact()
        {
            return View();
        }
    }
```
{% endif %}


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
* [Server-Side TagHelper API Reference of the Menu for {{ site.framework }}](/api/taghelpers/menu)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
