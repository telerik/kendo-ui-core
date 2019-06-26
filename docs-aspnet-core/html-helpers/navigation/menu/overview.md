---
title: Overview
page_title: Men Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/menu
slug: htmlhelpers_menu_aspnetcore
position: 1
---

# Menu HtmlHelper Overview

The [Menu](http://docs.telerik.com/kendo-ui/controls/navigation/menu/overview) displays hierarchical data as a multi-level menu.

It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands.

The Menu HtmlHelper extension is a server-side wrapper for the [Kendo UI Menu](http://demos.telerik.com/kendo-ui/menu/index) widget. For more information on the Menu HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/menu/overview).

## Initializing the Menu

The following example demonstrates how to define the Menu by using the Menu HtmlHelper.

```Razor
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
```Controller
public class MenuController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

## Basic Configuration

The following example demonstrates the basic configuration of the Menu HtmlHelper.

```Razor
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

## Functionality and Features

* [Binding]({% slug htmlhelpers_menu_databinding_aspnetcore %})
* [Security trimming]({% slug htmlhelpers_menu_securitytrimming_aspnetcore %})
* [Keyboard navigation]({% slug htmlhelpers_menu_keyboardnavigation_aspnetcore %})

## Events

You can subscribe to all Menu [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu#events). For a complete example on basic Menu events, refer to the [demo on using the events of the Menu](https://demos.telerik.com/aspnet-core/menu/events).

### Handling by Handler Names

The following example demonstrates how to subscribe to events by a handler name.

```Razor
@(Html.Kendo().Menu()
        .Name("menu")
        .Events(e => e
            .Open("menu_open")
            .Close("menu_close")
        )
)
<script>
    function menu_close() {
        // Handle the close event.
    }

    function menu_open() {
        // Handle the open event.
    }
</script>
```

### Handling by Template Delegates

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
@(Html.Kendo().Menu()
    .Name("menu")
    .Events(e => e
        .Open(@<text>
            function() {
                // Handle the open event inline.
            }
        </text>)
        .Close(@<text>
            function() {
                // Handle the close event inline.
            }
        </text>)
    )
)
```

### Handling by HTML Attributes

The following example demonstrates how to subscribe to the `select` event of a single Menu item.

```Razor
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item").HtmlAttributes(new { @onclick = "alert('select');" });
    })
)
```

## See Also

* [Basic Usage of the Menu HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/menu)
* [Using the API of the Menu HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/menu/api)
* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
