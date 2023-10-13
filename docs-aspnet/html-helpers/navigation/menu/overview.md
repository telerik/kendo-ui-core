---
title: Overview
page_title: Overview
description: "Try now the Telerik UI Menu component for {{ site.framework }} providing built-in data-binding and customization options, a ContextMenu, and support for various accessibility standards."
previous_url: /helpers/html-helpers/menu, /helpers/navigation/menu/overview
slug: htmlhelpers_menu_aspnetcore
position: 0
---

# {{ site.framework }} Menu Overview

{% if site.core %}
The Telerik UI Menu TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Menu widget.
{% else %}
The Telerik UI Menu HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Menu widget.
{% endif %}

The Menu displays hierarchical data as a multi-level menu. It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands.

* [Demo page for the Menu HtmlHelper](https://demos.telerik.com/{{ site.platform }}/menu/index)
{% if site.core %}
* [Demo page for the Menu TagHelper](https://demos.telerik.com/aspnet-core/menu/tag-helper)
{% endif %}

## Initializing the Menu

The following example demonstrates how to define the Menu.

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-menu orientation="MenuOrientation.Horizontal" name="Menu">
        <items>
            <menu-item text="Products">
                <sub-items>
                    <menu-item text="Furniture">
                        <sub-items>
                            <menu-item text="Tables & Chairs"></menu-item>
                            <menu-item text="Sofas"></menu-item>
                            <menu-item text="Occasional Furniture"></menu-item>
                            <menu-item text="Childerns Furniture"></menu-item>
                            <menu-item text="Beds"></menu-item>
                        </sub-items>
                    </menu-item>
                    <menu-item text="Decor">
                        <sub-items>
                            <menu-item text="Bed Linen"></menu-item>
                            <menu-item text="Throws"></menu-item>
                            <menu-item text="Curtains & Blinds"></menu-item>
                            <menu-item text="Rugs"></menu-item>
                            <menu-item text="Carpets"></menu-item>
                        </sub-items>
                    </menu-item>
                    <menu-item text="Storage">
                        <sub-items>
                            <menu-item text="Wall Shelving"></menu-item>
                            <menu-item text="Kids Storage"></menu-item>
                            <menu-item text="Baskets"></menu-item>
                            <menu-item text="Multimedia Storage"></menu-item>
                            <menu-item text="Floor Shelving"></menu-item>
                            <menu-item text="Toilet Roll Holders"></menu-item>
                            <menu-item text="Storage Jars"></menu-item>
                            <menu-item text="Drawers"></menu-item>
                            <menu-item text="Boxes"></menu-item>
                        </sub-items>
                    </menu-item>
                    <menu-item text="Lights">
                        <sub-items>
                            <menu-item text="Ceiling"></menu-item>
                            <menu-item text="Table"></menu-item>
                            <menu-item text="Floor"></menu-item>
                            <menu-item text="Shades"></menu-item>
                            <menu-item text="Wall Lights"></menu-item>
                            <menu-item text="Spotlights"></menu-item>
                            <menu-item text="Push Light"></menu-item>
                            <menu-item text="String Lights"></menu-item>
                        </sub-items>
                    </menu-item>
                </sub-items>
            </menu-item>
            <menu-item text="Around the Globe">
                <sub-items>
                    <menu-item text="United States"></menu-item>
                    <menu-item text="Canada"></menu-item>
                    <menu-item text="Europe"></menu-item>
                    <menu-item text="Australia"></menu-item>
                </sub-items>
            </menu-item>
            <menu-item text="Decor">
                <sub-items>
                    <menu-item text="Bed Linen"></menu-item>
                    <menu-item text="Throws"></menu-item>
                    <menu-item text="Curtains & Blinds"></menu-item>
                    <menu-item text="Rugs"></menu-item>
                    <menu-item text="Carpets"></menu-item>
                </sub-items>
            </menu-item>
        </items>
    </kendo-menu>
```
{% endif %}
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

The following example demonstrates the basic configuration of the Menu.

```HtmlHelper
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
        // The Name() of the Menu is used to get its client-side instance.
        var menu = $("#menu").data("kendoMenu");
        console.log(menu);
    });
</script>
```
{% if site.core %}
```TagHelper
    <kendo-menu name="menu" hover-delay="500" direction="MenuDirection.Left" orientation="MenuOrientation.Horizontal"
                on-open="onOpen" on-close="onClose" on-select="onSelect" on-activate="onActivate" on-deactivate="onDeactivate">
        <items>
            <menu-item text="Baseball" image-url="@Url.Content("~/shared/icons/sports/baseball.png")">
                <sub-items>
                    <menu-item text="Top News" />
                    <menu-item text="Photo Galleries" />
                    <menu-item separator="true"></menu-item>
                    <menu-item text="Videos Records" />
                    <menu-item text="Radio Records" />
                </sub-items>
            </menu-item>
            <menu-item text="Golf" image-url="@Url.Content("~/shared/icons/sports/golf.png")">
                <sub-items>
                    <menu-item text="Top News" />
                    <menu-item text="Photo Galleries" />
                    <menu-item separator="true"></menu-item>
                    <menu-item text="Videos Records" />
                    <menu-item text="Radio Records" />
                </sub-items>
            </menu-item>
            <menu-item text="Swimming" image-url="@Url.Content("~/shared/icons/sports/swimming.png")">
                <sub-items>
                    <menu-item text="Top News" />
                    <menu-item text="Photo Galleries" />
                </sub-items>
            </menu-item>
        </items>
        <popup-animation>
            <open effects="expand:vertical fade:in" />
        </popup-animation>
    </kendo-menu>

    <script type="text/javascript">
        $(function () {
            // The Name() of the Menu is used to get its client-side instance.
            var menu = $("#menu").data("kendoMenu");
            console.log(menu);
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_menu_databinding_aspnetcore %})&mdash;To bind the Menu to data, you can apply various approaches, for example, binding to a server end point, binding to a hierarchical model, or manually defining the properties of the Menu items.
* [ContextMenu]({% slug htmlhelpers_contextmenu_aspnetcore %})&mdash;The ContextMenu displays hierarchical lists of items in a popup.
* [Accessibility]({% slug accessibility_aspnetcore_menu %})&mdash;The Menu is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.
* [Security trimming]({% slug securitytrimming_menu_aspnetmvc %})&mdash;The built-in security trimming functionality of the Menu is enabled by default.
* [Events]({% slug events_menu %})&mdash;The Menu emits various events that allow you to control what happens when the user interacts with it.

## Next Steps

* [Getting Started with the Menu]({% slug menu_getting_started %})
* [Basic Usage of the Menu HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/index)
{% if site.core %}
* [Basic Usage of the Menu TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/menu/tag-helper)
{% endif %}

## See Also

* [Using the API of the Menu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/api)
* [Knowledge Base Section](/knowledge-base)
