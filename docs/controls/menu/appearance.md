---
title: Appearance
page_title: jQuery Menu Documentation - Appearance
description: "Get started with the jQuery Menu by Kendo UI and manage its appearance."
slug: appearance_kendoui_menu
position: 5
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

> As of Kendo UI R1 2022, the Menu widget uses updated rendering.

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
<!--*-->

The following example showcases how to customize the styles of the **Menu** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <ul id="menu">
      <li>Item 1
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
      <li>Item 2
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
    </ul>
    <script>
      $("#menu").kendoMenu();
    </script>
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


## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Basic Usage of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/index)
* [Using the API of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/api)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
