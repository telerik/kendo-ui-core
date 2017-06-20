---
title: Menu
page_title: Menu | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_aspnetcore
---

# Menu HtmlHelper Overview

The Menu HtmlHelper extension is a server-side wrapper for the [Kendo UI Menu](http://demos.telerik.com/kendo-ui/menu/index).

It enables you to configure the Kendo UI Menu widget from server-side code. The [Menu](http://docs.telerik.com/kendo-ui/controls/navigation/menu/overview) displays hierarchical data as a multi-level menu. It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands.

For more information on the HtmlHelper, refer to the article on the [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview).

## Basic Usage

The following example demonstrates how to define the Menu by using the Menu HtmlHelper.

###### Example

```tab-Razor
    @(Html.Kendo().Menu()
        .Name("menu")
        .Items(items =>
        {
            items.Add()
                .Text("Products")
                .Items(children =>
                {
                   children.Add().Text("Furniture")
                        .Items(innerChildren =>
                        {
                            innerChildren.Add().Text("Tables & Chairs");
                            innerChildren.Add().Text("Sofas");
                            innerChildren.Add().Text("Occasional Furniture");
                            innerChildren.Add().Text("Childerns Furniture");
                            innerChildren.Add().Text("Beds");
                        });

                   children.Add().Text("Decor")
                        .Items(innerChildren =>
                        {
                            innerChildren.Add().Text("Bed Linen");
                            innerChildren.Add().Text("Throws");
                            innerChildren.Add().Text("Curtains & Blinds");
                            innerChildren.Add().Text("Rugs");
                            innerChildren.Add().Text("Carpets");
                        });
                });

            items.Add()
                .Text("Stores")
                .Items(children =>
                {
                    children.Add().Text("Around the Globe")
                        .Items(innerChildren =>
                        {
                            innerChildren.Add().Text("United States");
                            innerChildren.Add().Text("Canada");
                            innerChildren.Add().Text("Europe");
                            innerChildren.Add().Text("Australia");
                        });

                    children.Add().Text("Decor")
                        .Items(innerChildren =>
                        {
                            innerChildren.Add().Text("Bed Linen");
                            innerChildren.Add().Text("Throws");
                            innerChildren.Add().Text("Curtains & Blinds");
                            innerChildren.Add().Text("Rugs");
                            innerChildren.Add().Text("Carpets");
                        });
               });
        })
    )
```
```tab-Controller

    public class MenuController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the Menu HtmlHelper and how to get the Menu instance.

```tab-Razor
    @(Html.Kendo().Menu()
        .Name("menu")
        .Items(items =>
        {
            items.Add().Text("Item 1")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/baseball.png"))
                .Items(children =>
                {
                    children.Add().Text("Top News");
                    children.Add().Text("Photo Galleries");
                    children.Add().Separator(true);
                    children.Add().Text("Videos Records");
                    children.Add().Text("Radio Records");
                });
            items.Add().Text("Item 2")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/golf.png"))
                .Items(children =>
                {
                    children.Add().Text("Top News");
                    children.Add().Text("Photo Galleries");
                    children.Add().Separator(true);
                    children.Add().Text("Videos Records");
                    children.Add().Text("Radio Records");
                });
            items.Add().Text("Item 3")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/swimming.png"))
                .Items(children =>
                {
                    children.Add().Text("Top News");
                    children.Add().Text("Photo Galleries");
                });
        })
        .Animation(animation =>
        {
            animation.Open(open =>
            {
                open.Expand(ExpandDirection.Vertical);
            });
        })
        .HoverDelay(500)
        .Direction(MenuDirection.Left)
        .Orientation(MenuOrientation.Horizontal)
        .Events(events => events
            .Open("onOpen")
            .Close("onClose")
            .Select("onSelect")
            .Activate("onActivate")
            .Deactivate("onDeactivate")
        )
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the Menu is used to get its client-side instance.
            var menu = $("#menu").data("kendoMenu");
            console.log(menu);
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
