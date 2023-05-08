---
title: Customization
page_title: jQuery ChipList Documentation - ChipList Customization
description: "Try now the Kendo UI for jQuery ChipList and learn how to customize it by defining avatars and custom attributes."
slug: customization_kendoui_chiplist_widget
position: 4
---

# Customization

The ChipList component provides options for customizing its look and feel.

When customizing the rendering of the chips inside the ChipList, you can:

* [Define custom attributes](#define-custom-attributes)
* [Display avatars](#displaying-avatars)

## Custom Attributes

To define a custom attributes for the Chip inside the ChipList, use the [`items.attributes `](api/javascript/ui/chiplist/configuration/items.attributes) property.

```dojo
<div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { text: "Home", icon: "home", attributes: { "data-val" : "custom data attribute" } },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelop" }
            ]
        });
    </script>
```

## Displaying Avatars

The ChipList component treats the avatar as an icon. To display an avatar, pass a CSS class to the [`items.avatarClass`](api/javascript/ui/chiplist/configuration/items.avatarClass) property.


```dojo
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
    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { avatarClass: 'maria', label: 'Maria' },
                { avatarClass: 'thomas', label: 'Thomas' },
                { avatarClass: 'dan', label: 'Dan' },
            ]
        });
    </script>
```

## See Also

* [Binding the ChipList over MVVM (Demo)](https://demos.telerik.com/kendo-ui/chiplist/mvvm)
* [Applying the ChipList API (Demo)](https://demos.telerik.com/kendo-ui/chiplist/api)
* [JavaScript API Reference of the ChipList](/api/javascript/ui/chiplist)
