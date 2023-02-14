---
title: Customization
page_title: jQuery Chip Documentation - Chip Customization
description: "Try now the Kendo UI for jQuery Chip component and learn how to customize it by configuring its icons and avatars."
slug: customization_kendoui_chip_widget
position: 3
---

# Customization

The Chip component provides options for customizing its look and feel.

When customizing the rendering of the Chip, you can:

* [Render a custom Remove icon](#custom-remove-icons)
* [Display avatars](#displaying-avatars)

## Custom Remove Icons

To specify a custom Remove icon, use the [`removeIcon`](api/javascript/ui/chip/configuration/removeicon) property.

```dojo
	<span id="chip"></span>

	<script>    
	    $("#chip").kendoChip({
            removable: true,
            removeIcon: "close",
            label: "Close"
        });
	</script>
```

## Displaying Avatars

The Chip component treats the avatar as an icon. To display an avatar, pass a CSS class to the [`avatarClass`](api/javascript/ui/chip/configuration/avatarClass) property.

The `avatarClass` property allows you to define a CSS class or multiple classes separated by spaces. These classes are applied to a span element inside the Chip.

```dojo
	<span id="chip"></span>

	<script>    
	    $("#chip").kendoChip({
            avatarClass: "maria",
            label: "Maria"
        });
	</script>
    <style>
        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
```

## See Also

* [Binding the Chip over MVVM (Demo)](https://demos.telerik.com/kendo-ui/chip/mvvm)
* [Applying the Chip API (Demo)](https://demos.telerik.com/kendo-ui/chip/api)
* [JavaScript API Reference of the Chip](/api/javascript/ui/chip)
