---
title: Customization
page_title: Customization of the ChipList Helper
description: "Try now the Telerik UI for {{ site.framework }} ChipList and learn how to customize it by defining avatars and icons."
slug: htmlhelpers_chiplist_aspnetcore_customization
position: 4
---

# Customization of the ChipList

The ChipList component provides options for customizing its look and feel.

When customizing the rendering of the chips inside the ChipList, you can:

* [Display icons](#displaying-icons)
* [Render avatars](#rendering-avatars)

## Displaying Icons

The ChipList allows you to integrate [Kendo UI Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/font-icons) out-of-the-box.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().Icon("plus").Label("Add");
            item.Add().Icon("pencil").Label("Edit");
            item.Add().Icon("trash").Label("Remove");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
        <items>
            <item icon="plus" label="Add"></item>
            <item icon="pencil" label="Edit"></item>
            <item icon="trash" label="Remove"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}

## Rendering Avatars

The ChipList component treats the avatar as an icon. To display an avatar, pass a CSS class to the `Items.AvatarClass` property.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().AvatarClass("maria").Label("Maria");
            item.Add().AvatarClass("thomas").Label("Thomas");
            item.Add().AvatarClass("dan").Label("Dan");
        })
    )
    <style>
        .dan {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/SPLIR.jpg");
        }

        .thomas {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg");
        }

        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
        <items>
            <item avatar-class="maria" label="Maria"></item>
            <item avatar-class="thomas" label="Thomas"></item>
            <item avatar-class="dan" label="Dan"></item>
        </items>
    </kendo-chiplist>
    <style>
        .dan {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/SPLIR.jpg");
        }

        .thomas {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg");
        }

        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
```
{% endif %}


## See Also

* [Applying the ChipList API (Demo)](https://demos.telerik.com/{{ site.platform }}/chiplist/api)
* [JavaScript API Reference of the ChipList HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chiplist#methods)
* [Server-Side API of the ChipList HtmlHelper for {{ site.framework }}](/api/chiplist)
