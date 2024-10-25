---
title: Using FontAwesome Icons
page_title: Using FontAwesome Icons
description: "Learn how to use Fontawesome icons in the Telerik UI ToolBar component for {{ site.framework }}."
slug: htmlhelpers_use_fontawesome_icons_aspnetcore
position: 4
---

# Use FontAwesome Icons

The ToolBar enables you to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as its sprite icons.

> To use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as ToolBar sprite icons, add `<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>` to the `_Layout.cshtml` file.

[Open the example below in REPL](https://netcorerepl.telerik.com/cPFPkzPo13LZXYbf45)

```HtmlHelper
@(Html.Kendo().ToolBar()
                .Name("toolbar")
                .Items(items =>
                {
                    items.Add().Type(CommandType.Button).Text("Paper plane").SpriteCssClass("fas fa-paper-plane");
                    items.Add().Type(CommandType.Button).Text("Plane").SpriteCssClass("fal fa-plane");
                    items.Add().Type(CommandType.Button).Text("Space shuttle").SpriteCssClass("fas fa-space-shuttle");
                }
                )
)

<style>
    .fas.k-sprite,
    .fas.k-sprite::before,
    .fal.k-sprite,
    .fal.k-sprite::before {
        font-size: 14px;
        line-height: 16px;
    }
</style>
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="toolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Paper plane" sprite-css-class="fas fa-paper-plane" />
            <item type="CommandType.Button" text="Plane" sprite-css-class="fal fa-plane" />
            <item type="CommandType.Button" text="Space shuttle" sprite-css-class="fas fa-space-shuttle" />
        </toolbar-items>
    </kendo-toolbar>
    
    <style>
        .fas.k-sprite,
        .fas.k-sprite::before,
        .fal.k-sprite,
        .fal.k-sprite::before {
            font-size: 14px;
            line-height: 16px;
        }
    </style>
```
{% endif %}
```Controller
    public class ToolBarController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
```

## See Also

* [Server-Side API](/api/toolbar)
