---
title: Customization
page_title: Customizing the Chip Helper
description: "Discover the Telerik UI Chip component for {{ site.framework }} and learn how to customize it by configuring its icons and avatars."
slug: htmlhelpers_chip_aspnetcore_customization
position: 3
---

# Customization of the Chip

The Chip component provides options for customizing its look and feel.

When customizing the rendering of the Chip, you can:

* [Render a custom **Remove** icon](#adding-custom-remove-icons)
* [Display avatars](#displaying-avatars)

## Adding Custom Remove Icons

To specify a custom **Remove** icon, use the [`RemoveIcon`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#removeiconsystemstring) property of the Chip.

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("chip")
            .Removable(true)
            .RemoveIcon("x")
            .Label("Close")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"
                removable="true"
                removable-icon="close"
                label="Close">
    </kendo-chip>
```
{% endif %}

## Displaying Avatars

The Chip component treats the avatar as an icon. To display an avatar, pass a CSS class to the [`AvatarClass`](/api/Kendo.Mvc.UI.Fluent/ChipBuilder#avatarclasssystemstring) property.

The `AvatarClass` property allows you to define a CSS class or multiple classes separated by spaces. These classes are applied to a `span` element inside the Chip.

```HtmlHelper
     @(Html.Kendo().Chip()
            .Name("chip")
            .AvatarClass("maria")
            .Label("Maria")
    )
    <style>
        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chip name="chip"
                avatar-class="maria"
                label="Maria">
    </kendo-chip>
    <style>
        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
```
{% endif %}

## See Also

* [Applying the Chip API (Demo)](https://demos.telerik.com/{{ site.platform }}/chip/api)
* [Server-Side API of the Chip HtmlHelper for {{ site.framework }}](/api/chip)
* [JavaScript API Reference of the Chip HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chip)
