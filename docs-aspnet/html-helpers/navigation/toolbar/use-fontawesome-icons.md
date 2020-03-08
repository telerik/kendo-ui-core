---
title: Using FontAwesome Icons
page_title: Using FontAwesome Icons
description: "Learn how to use Fontawesome icons in the Telerik UI ToolBar HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_use_fontawesome_icons_aspnetcore
position: 4
---

# Use FontAwesome Icons

The ToolBar enables you to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as its sprite icons.

> To use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as ToolBar sprite icons, add `<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">` to the `_Layout.cshtml` file.

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

## See Also

* [Server-Side API](/api/toolbar)
