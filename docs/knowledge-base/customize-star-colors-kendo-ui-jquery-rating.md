---
title: Customizing Star Colors in Kendo UI for jQuery Rating
description: Learn how to change star colors in Kendo UI for jQuery Rating component, including hover, selected, and other states.
type: how-to
page_title: How to Customize Star Colors in Kendo UI for jQuery Rating
meta_title: How to Customize Star Colors in Kendo UI for jQuery Rating
slug: customize-star-colors-kendo-ui-jquery-rating
tags: kendo-ui-for-jquery,rating,templates,customization,theme-color,svg-icons
res_type: kb
ticketid: 1701972
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Rating
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.3.1002 </td>
</tr>
</tbody>
</table>

## Description

I want to customize the star colors in the [Kendo UI for jQuery Rating](https://www.telerik.com/kendo-jquery-ui/documentation/controls/rating/overview) component for different states such as hovered, selected, and others.

This knowledge base article also answers the following questions:
- How to use [`templates`](https://www.telerik.com/kendo-jquery-ui/documentation/controls/rating/templates) to change the colors of stars in Kendo UI for jQuery Rating?
- How to apply predefined or custom colors to Kendo UI for jQuery Rating icons?
- How to customize Kendo UI for jQuery Rating icon colors?

## Solution

To change the star colors in the Rating component, use  [`templates`](https://www.telerik.com/kendo-jquery-ui/documentation/controls/rating/templates). Below are two approaches for customization:

### Using Predefined Colors

If the predefined colors provided by the Kendo UI themes suit your application, use the `themeColor` option. This option allows you to set colors for different states of the icons.

Example:
```javascript
$("#rating").kendoRating({
    itemTemplate: "<i class='k-icon'>#= kendo.ui.icon({ icon: 'star-outline', themeColor: 'success' }) #</i>",
    selectedTemplate: "<i class='k-icon'>#= kendo.ui.icon({ icon: 'star', themeColor: 'warning' }) #</i>",
    hoveredTemplate: "<i class='k-icon'>#= kendo.ui.icon({ icon: 'star', themeColor: 'secondary' }) #</i>"
});
```

### Using Custom Colors

If predefined colors are not sufficient, apply custom colors using templates and custom SVG icons.

Example:
```html
<script id="rating-item-template" type="x/kendo-template">
    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <path fill="Turquoise" d="M256 391.5 117.2 480 154 314.1 32 202.4 192.9 188 256 32l63.1 156L480 202.4 358 314.1 394.8 480z"></path>
    </svg>
</script>
```

#### Example

Below you will find a runnable example demonstrating both of the approaches:

```dojo

    <script id="rating-selected-template" type="x/kendo-template">
        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      	<path fill="PaleGoldenRod" d="M256 391.5 117.2 480 154 314.1 32 202.4 192.9 188 256 32l63.1 156L480 202.4 358 314.1 394.8 480z"></path>
      </svg>
    </script>

    <script id="rating-item-template" type="x/kendo-template">
        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      	<path fill="Turquoise" d="M256 391.5 117.2 480 154 314.1 32 202.4 192.9 188 256 32l63.1 156L480 202.4 358 314.1 394.8 480z"></path>
      </svg>
    </script>

    <script id="rating-hovered-template" type="x/kendo-template">
        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      	<path fill="MediumPurple" d="M256 391.5 117.2 480 154 314.1 32 202.4 192.9 188 256 32l63.1 156L480 202.4 358 314.1 394.8 480z"></path>
      </svg>
    </script>

    <h4>Rating Templates PRedefined Colros</h4>
    <input id="rating" style="width: 100%" />

    <h4>Rating Templates Custom color</h4>
    <input id="rating-custom" style="width: 100%" />
    <script>
      $("#rating").kendoRating({
        min: 1,
        max: 6,
        value: 3,
        itemTemplate:
          "<i class='k-icon'> #= kendo.ui.icon({ icon: 'star-outline', themeColor: 'success' }) #</i>",
        selectedTemplate:
          "<i class='k-icon'>#= kendo.ui.icon({ icon: 'star', themeColor: 'warning' }) #</i>",
        hoveredTemplate:
          "<i class='k-icon'>#= kendo.ui.icon({ icon: 'star', themeColor: 'secondary'}) #</i>",
      });

      $("#rating-custom").kendoRating({
        min: 1,
        max: 5,
        value: 3,
        itemTemplate: $("#rating-item-template").html(),
        selectedTemplate: $("#rating-selected-template").html(),
        hoveredTemplate: $("#rating-hovered-template").html(),
        label: { template: $("#rating-label-template").html() },
      });
   </script>
```

## See Also
- [Kendo UI for jQuery Rating Templates (Demo)](https://demos.telerik.com/kendo-ui/rating/templates )
- [Customizing SVG Icons with ThemeColor](https://www.telerik.com/kendo-jquery-ui/documentation/styles-and-layout/sass-themes/svg-icons#customizing-svg-icons)
- [Predefined Colors for SVG Icons](https://www.telerik.com/design-system/docs/foundation/iconography/visual-adjustments/)
