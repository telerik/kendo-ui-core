---
title: Use FontAwesome Icons
page_title: ToolBar | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to use Fontawesome icons in the Kendo UI ToolBar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_use_fontawesome_icons_aspnetcore
position: 3
---

# Use FontAwesome Icons

The example below demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as Kendo UI ToolBar sprite icons.

> **Important**
>
> To use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as Kendo UI ToolBar sprite icons this code should be added to the **_Layout.cshtml** file: 
>```<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">```

```Razor
@(Html.Kendo().ToolBar()
                .Name("toolbar")
                .Items(items =>
                {
                    items.Add().Type(CommandType.Button).Text("Paper plane").SpriteCssClass("fa fa-paper-plane");
                    items.Add().Type(CommandType.Button).Text("Plane").SpriteCssClass("fa fa-plane");
                    items.Add().Type(CommandType.Button).Text("Space shuttle").SpriteCssClass("fa fa-space-shuttle");
                }
                )
)

<style>
    .fa.k-sprite,
    .fa.k-sprite::before {
        font-size: 14px;
        line-height: 16px;
    }
</style>
```
```Controller
    public class ToolBarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

