---
title: Overview
page_title: ContextMenu
description: "Learn the basics when working with the Telerik UI ContextMenu component for {{ site.framework }}."
previous_url: /helpers/html-helpers/menu/contextmenu
slug: htmlhelpers_contextmenu_aspnetcore
position: 1
---

# {{ site.framework }} ContextMenu Overview

{% if site.core %}
The Telerik UI ContextMenu TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ContextMenu widget.
{% else %}
The Telerik UI ContextMenu HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ContextMenu widget.
{% endif %}

The ContextMenu displays hierarchical data as a multi-level menu in a popup. It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands.

* [Demo page for the ContextMenu HtmlHelper](https://demos.telerik.com/{{ site.platform }}/menu/context-menu)
{% if site.core %}
* [Demo page for the ContextMenu TagHelper](https://demos.telerik.com/aspnet-core/menu/contextmenu-tag-helper)
{% endif %}

## Basic Usage

The following example demonstrates how to define the ContextMenu.

```HtmlHelper
<div id="target">Click to open</div>

@(Html.Kendo().ContextMenu()
    .Name("contextmenu")
    .Target("#target")
    .ShowOn("click")
    .Items(items =>
    {
        items.Add()
            .Text("Furniture") //Add an item with the text "Item1".)
            .Items(children =>{
                children.Add().Text("Sofas");
                children.Add().Text("Chairs");
                children.Add()
                    .Text("Tables")
                    .Items(i =>{
                        i.Add().Text("Dinning Tables");
                        i.Add().Text("Coffee Tables");
                    })
                children.Add().Text("Accessories");
            });
        items.Add()
            .Text("Electronics"); //Add an item with the text "Item2".)
            .Items(children =>{
                children.Add().Text("TVs");
                children.Add().Text("Laptops");
            });
    })
)
```
{% if site.core %}
```TagHelper
    <kendo-contextmenu name="menu" target="#target" show-on="click">
        <popup-animation>
            <open effects="fade:in" duration="500" />
        </popup-animation>
        <items>
            <menu-item text="Furniture">
                <sub-items>
                    <menu-item text="Sofas"></menu-item>
                    <menu-item text="Chairs"></menu-item>
                    <menu-item text="Tables">
                        <sub-items>
                            <menu-item text="Dinning Tables"></menu-item>
                            <menu-item text="Coffee Tables"></menu-item>
                        </sub-items>
                    </menu-item>
                    <menu-item text="Accessories"></menu-item>
                </sub-items>
            </menu-item>
            <menu-item text="Electronics">
                <sub-items>
                    <menu-item text="TVs"></menu-item>
                    <menu-item text="Laptops"></menu-item>
                </sub-items>
            </menu-item>
        </items>
    </kendo-contextmenu>
```
{% endif %}


## Configuration

The following example demonstrates the basic configuration of the ContextMenu HtmlHelper and how to get the ContextMenu instance.

```HtmlHelper
<div id="target">Click to open</div>

@(Html.Kendo().ContextMenu()
    .Name("contextmenu")
    .Target("#target")
    .ShowOn("click")
    .Items(items =>
    {
        items.Add().Text("Item 1")
            .ImageUrl(Url.Content("https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png"))
            .Items(children =>
            {
                children.Add().Text("Top News");
                children.Add().Text("Photo Galleries");
                children.Add().Separator(true);
                children.Add().Text("Videos Records");
                children.Add().Text("Radio Records");
            });
        items.Add().Text("Item 2")
            .ImageUrl(Url.Content("https://demos.telerik.com/kendo-ui/content/shared/icons/sports/golf.png"))
            .Items(children =>
            {
                children.Add().Text("Top News");
                children.Add().Text("Photo Galleries");
                children.Add().Separator(true);
                children.Add().Text("Videos Records");
                children.Add().Text("Radio Records");
            });
        items.Add().Text("Item 3")
            .ImageUrl(Url.Content("https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png"))
            .Items(children =>
            {
                children.Add().Text("Top News");
                children.Add().Text("Photo Galleries");
            });
    })
    .Animation(animation =>
    {
        animation.Open(fade => fade.Fade(FadeDirection.In));
        animation.Open(open => open.Expand(ExpandDirection.Vertical));         
    })
    .HoverDelay(500)
    .Direction("left")
    .Orientation(ContextMenuOrientation.Horizontal)
    .Events(events => events
        .Open("onOpen")
    )
)

<script type="text/javascript">
    function onOpen() {
    // The Name() of the ContextMenu is used to get its instance.
    var menu = $("#contextmenu").data("kendoContextMenu");
    console.log(menu);
    }
</script>
```
{% if site.core %}
```TagHelper
    <kendo-contextmenu name="contextmenu" target="#target" hover-delay="500"  orientation="ContextMenuOrientation.Horizontal"
        on-open="onOpen">
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
        <popup-animation >
            <open effects="expand:vertical fade:in"/>
        </popup-animation>
    </kendo-contextmenu>

    <script type="text/javascript">
        function onOpen() {
        // The Name() of the ContextMenu is used to get its instance.
        var menu = $("#contextmenu").data("kendoContextMenu");
        console.log(menu);
        }
    </script>
```
{% endif %}

## Events

You can subscribe to all ContextMenu [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu#events).

### By Handler Names

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
<div id="target">Click to open</div>

@(Html.Kendo().ContextMenu()
        .Name("contextmenu")
        .Target("#target")
        .ShowOn("click")
        .Events(events => events
            .Open("openMenu")
            .Close("closeMenu")
            .Select("onSelect")
        )
)
<script>
    function openMenu(){
        // Handle the open event.
    }

    function closeMenu(){
        // Handle the close event.
    }

    function onSelect(){
        // Handle the select event.
    }
</script>
```
{% if site.core %}
```TagHelper
    <kendo-contextmenu name="contextmenu" target="#target" show-on="click"
        on-open="openMenu" on-close="closeMenu" on-select="onSelect">
    </kendo-contextmenu>

    <script>
    function openMenu(){
        // Handle the open event.
    }

    function closeMenu(){
        // Handle the close event.
    }

    function onSelect(){
        // Handle the select event.
    }
</script>
```
{% endif %}

### By Template Delegates

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
<div id="target">Click to open</div>

@(Html.Kendo().ContextMenu()
    .Name("contextmenu")
    .Target("#target")
    .ShowOn("click")
    .Events(events => events
        .Open(@<text>
            function(){
                // Handle the open event inline.
            }
        </text>)
        .Close(@<text>
            function(){
                // Handle the close event inline.
            }
        </text>)
    )
)
```

### By HTML Attributes

The following example demonstrates how to subscribe to the `select` event of a single ContextMenu item.

```HtmlHelper
<div id="target">Click to open</div>

@(Html.Kendo().ContextMenu()
    .Name("contextmenu")
    .Target("#target")
    .ShowOn("click")
    .Items(items =>
    {       
        items.Add().Text("First Item");
        items.Add().Text("Second Item").HtmlAttributes(new { @onclick = "alert('select');" });
    })
)
```

## See Also

* [Server-Side API](/api/menu)
