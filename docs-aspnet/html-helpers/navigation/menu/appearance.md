---
title: Appearance
page_title: Appearance
description: "Learn about the Telerik UI Menu HtmlHelper for {{ site.framework }} rendering and appearance."
slug: appearance_menu
position: 2
---

# Appearance

The Menu renders as a `<ul>` element and expands horizontally by default.

If a horizontal Menu is wider than the total width of its root items, a blank space will remain visible on the right. To remove this space, use the CSS rules from the following example.

    #menu-id /* For a specific Menu instance. */
    ,
    .k-menu-horizontal /* For all horizontal Menus. */
    {
       display: inline-block;
    }

In left-to-right layouts, shrinking the horizontal Menu will cause the border of the last root item to touch the right border of the Menu. The following example demonstrates how to remove the last item border.

    #menu-id > .k-last /* For a specific Menu instance. */
    ,
    .k-menu-horizontal > .k-last /* For all horizontal Menus. */
    {
       border-width: 0;
    }

## Rendering

> As of {{ site.product }} R1 2022, the Menu component uses updated rendering.

The text and the expand arrow are now wrapped in new separate containers.

Old Rendering:

```html
<span class="k-link k-menu-link">
    Products
    <span class="k-menu-expand-arrow k-icon k-i-arrow-60-down"></span>
</span>
```

New Rendering:
```html
<span class="k-link k-menu-link">
    <span class="k-menu-link-text">Hover</span>
    <span class="k-menu-expand-arrow">
        <span class="k-icon k-i-arrow-s"></span>
    </span>
</span>
```

Additionally, the Menu groups receive a new size class:

Old Rendering:

```html
<ul class="k-group k-menu-group k-popup k-reset">
    ...
</ul>
```

New Rendering:

```html
<ul class="k-group k-menu-group k-reset k-menu-group-md">
     ... 
</ul>
```

## Visual Backwards Compatibility

The following example showcases how to customize the styles of the **Menu** in both the new, and the old rendering:

```
    <style>
      /* applies light-blue background to the Menu items in the new rendering. */
      #menu .k-menu-link-text{ 
        background-color: lightblue !important;
      }
      /* .k-menu-expand-arrow and .k-icon elements are different elements in the new rendering, thus the green and the red border will be applied when a version after 2022 R1 is selected. 
      .k-menu-expand-arrow and .k-icon is the same element in the old rendering. Thus, only the green border will be applied when a version prior to 2022 R1 is selected */
      #menu .k-menu-expand-arrow{
        border: 2px solid red !important;
      }
      #menu .k-icon{
        border: 2px solid green !important;
      }
    </style>
```
<!--*-->

## See Also

* [Rendering Overview Article]({% slug components_rendering_overview %})
* [Basic Usage of the Menu (Demo)](https://demos.telerik.com/{{ site.platform }}/menu)
* [Using the API of the Menu (Demo)](https://demos.telerik.com/{{ site.platform }}/api/menu)
* [JavaScript API Reference of the Menu](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
