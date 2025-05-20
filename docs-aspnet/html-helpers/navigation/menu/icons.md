---
title: Icons
page_title: Telerik UI Menu component for {{ site.framework }} Documentation - Icons
description: "Learn how you can display icons in the items of the {{ site.product }} Menu."
slug: htmlhelpers_menu_icons
position: 6
---

# Icons

Starting with Telerik UI for {{ site.framework }} R2 2025, the Menu exposes two new icon-related fields&mdash;the [`DataIconField`](/api/kendo.mvc.ui.fluent/menubuilder#dataiconfieldsystemstring) and the [`DataIconClassField`](/api/kendo.mvc.ui.fluent/menubuilder#dataiconclassfieldsystemstring) options. Depending on your project's needs, you can enhance the content of the Menu by displaying either an SVG or a Font Icon. To display an icon in the items of the Menu, select one from the <a href="https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/" target="_blank">list of icons supported by Telerik UI for {{ site.framework }}</a>, and set the `Icon` field to the necessary icon name. 


## SVG Icons

The following example demonstrates how to display SVG icons in the Menu's items when the component is configured for remote data binding. Also, the icon of the first item has a custom CSS class added through the `IconClass` option.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("menu")
    .DataTextField("Text")
    .DataIconField("Icon")
    .DataIconClassField("IconClass")
    .BindTo(new MenuItem[] {
        new MenuItem { Text = "Home", Icon = "home", IconClass = "custom-icon-class" },
        new MenuItem { Text = "About Us", Icon = "info-circle" },
        new MenuItem { Text = "Contact", Icon = "envelope" }
    })
)
```
{% if site.core %}
```TagHelper
@using Kendo.Mvc.TagHelpers

@{
    var items = new MenuItemBase[] {
        new MenuItemBase { Text = "Home", Icon = "home", IconClass = "custom-icon-class" },
        new MenuItemBase { Text = "About Us", Icon = "info-circle" },
        new MenuItemBase { Text = "Contact", Icon = "envelope" }
    };
}

<kendo-menu 
    name="menu" 
    dataTextField="Text" 
    dataIconField="Icon" 
    dataIconClassField="IconClass" 
    bind-to="@items" 
/>
```
{% endif %}

## Font Icons

The following example demonstrates how to display Font icons in the Menu's items when the component binds to a data collection.

```HtmlHelper
<link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-font-icons/dist/index.css" />

@(Html.Kendo().Menu()
    .Name("menu")
    .BindTo(new MenuItem[] {
        new MenuItem { Text = "Home", Icon = "home" },
        new MenuItem { Text = "About Us", Icon = "info-circle" },
        new MenuItem { Text = "Contact", Icon = "envelope" }
    })
)

<script>
    kendo.setDefaults("iconType", "font");
</script>
```
{% if site.core %}
```TagHelper
@using Kendo.Mvc.TagHelpers

<link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-font-icons/dist/index.css" />

@{
    var items = new MenuItemBase[] {
        new MenuItemBase { Text = "Home", Icon = "home" },
        new MenuItemBase { Text = "About Us", Icon = "info-circle" },
        new MenuItemBase { Text = "Contact", Icon = "envelope" }
    };
}

<kendo-menu 
    name="menu"
    bind-to="@items" 
/>

<script>
    kendo.setDefaults("iconType", "font");
</script>
```
{% endif %}

## Icon Position

You can define the position of the icons in the Menu items by using the `IconPosition()` option. By default, each icon is positioned before the item's text.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("menu")
    .IconPosition(IconPosition.After)
    .BindTo(new MenuItem[] {
        new MenuItem { Text = "Home", Icon = "home" },
        new MenuItem { Text = "About Us", Icon = "info-circle" },
        new MenuItem { Text = "Contact", Icon = "envelope" }
    })
)
```
```TagHelper
@using Kendo.Mvc.TagHelpers

@{
    var items = new MenuItemBase[] {
        new MenuItemBase { Text = "Home", Icon = "home" },
        new MenuItemBase { Text = "About Us", Icon = "info-circle" },
        new MenuItemBase { Text = "Contact", Icon = "envelope" }
    };
}

<kendo-menu
    name="menu"
    icon-position="@IconPosition.After"
    bind-to="@items" 
/>
```

## See Also

* [Using the API of the Menu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/api)
* [Client-Side API of the Menu](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Server-Side API of the Menu](/api/menu)
{% if site.core %}
* [Server-Side API of the Menu TagHelper](/api/taghelpers/menu)
{% endif %}
* [Knowledge Base Section](/knowledge-base)