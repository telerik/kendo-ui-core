---
title: Icons
page_title: Telerik UI Menu component for {{ site.framework }} Documentation - Icons
description: "Learn how you can display icons in the items of the {{ site.product }} Menu."
components: ["menu"]
slug: htmlhelpers_menu_icons
position: 6
---

# Icons

Starting with version R2 2025, you can use icons in the Menu items.

For a runnable example, refer to the [demo on displaying icons in the Menu](https://demos.telerik.com/{{ site.platform }}/menu/icons).

## Basic Usage

The icons of the items can be configured depending on how the Menu binds to its data. For more information on the available data-binding approaches, refer to the [data binding article of the Menu]({% slug htmlhelpers_menu_databinding_aspnetcore%}).

### Remote Data Binding

When the [Menu is configured for remote data binding]({% slug htmlhelpers_menu_bindingremotedata_aspnetcore%}) or [binds to a Model collection using the `BindTo()` method]({% slug htmlhelpers_menu_modelbinding_aspnetcore%}), specify the Model property that stores the icon's name through the [`DataIconField`](/api/kendo.mvc.ui.fluent/menubuilder#dataiconfieldsystemstring) option. Also, you can define an additional Model property that holds a custom CSS `class` for the respective icon and set it in the Menu configuration using the [`DataIconClassField`](/api/kendo.mvc.ui.fluent/menubuilder#dataiconclassfieldsystemstring) method.

```HtmlHelper
    @(Html.Kendo().Menu()
        .Name("menu")
        .DataTextField("Text")
        .DataIconField("Icon")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("GetItems", "Menu"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-menu name="menu" datatextfield="Text" dataiconfield="Icon">
        <hierarchical-datasource>
            <transport>
                <read url="@Url.Action("GetItems", "Menu")" />
            </transport>
        </hierarchical-datasource>
    </kendo-menu>
```
{% endif %}

### Items Binding

When using [Items binding]({% slug itemsbinding_menu_aspnetmvc%}) to define the Menu items, you can specify an icon for each item through the `Icon` option. 
To define a custom CSS `class` for the respective icon, use the `IconClass` option.

```HtmlHelper
    @(Html.Kendo().Menu()
        .Name("menu")
        .Items(items => {
            items.Add().Text("Item 1").Icon("pencil");
            items.Add().Text("Item 2").Icon("home");
            items.Add().Text("Item 3").Icon("plus");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-menu name="menu">
        <items>
            <menu-item text="Item 1" icon="pencil"></menu-item>
            <menu-item text="Item 2" icon="home"></menu-item>
            <menu-item text="Item 3" icon="plus"></menu-item>
        </items>
    </kendo-menu>
```
{% endif %}

## SVG Icons

The following example demonstrates how to display {% if site.core %}[SVG icons](https://www.telerik.com/aspnet-core-ui/documentation/styles-and-layout/sass-themes/svg-icons){% else %}[SVG icons](https://www.telerik.com/aspnet-mvc/documentation/styles-and-layout/sass-themes/svg-icons){% endif %} in the Menu's items when the component is configured for remote data binding. Also, the icon of the first item has a custom CSS class added through the `IconClass` option.

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

The following example demonstrates how to display {% if site.core %}[Font icons](https://www.telerik.com/aspnet-core-ui/documentation/styles-and-layout/sass-themes/font-icons){% else %}[Font icons](https://www.telerik.com/aspnet-mvc/documentation/styles-and-layout/sass-themes/font-icons){% endif %} in the Menu's items when the component binds to a data collection.

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