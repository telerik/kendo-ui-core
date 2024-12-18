---
title: Adding Multiple Icons to a Kendo UI Button
description: Learn how to add two SVG icons into a single Kendo UI Button using iconClass in Kendo UI for jQuery.
type: how-to
page_title: How to Include Multiple Icons in a Kendo UI Button
slug: how-to-add-multiple-icons-kendo-ui-button
tags: kendo-ui, jquery, button, icons, svg, iconclass
res_type: kb
ticketid: 1672719
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I want to add two icons into a Kendo UI Button using the iconClass. How can I achieve this?

This knowledge base article also answers the following questions:
- How to use SVG icons in a Kendo UI Button?
- How to customize the icon layout in a Kendo UI Button?
- How to append multiple elements to a Kendo UI Button?

## Solution

To add multiple icons to a Kendo UI Button, follow these steps:

1. Create custom CSS to adjust the width of the icons container to accommodate two icons.
   ```css
   /* Double width for icons in button */
   .two-icons {
     width: 32px;
   }
   ```

2. Initialize the Kendo UI Button with the custom `iconClass` that references the CSS class created.
   ```javascript
   $("#button").kendoButton({ 
     iconClass: "two-icons",
   });
   ```

3. Create two SVG icons using the `kendo.ui.icon` method.
   ```javascript
   var icon = kendo.ui.icon({ icon: 'zoom-in', type: 'svg' });
   var icon2 = kendo.ui.icon({ icon: 'x-circle', type: 'svg' });
   ```

4. Append the created icons to the button using jQuery's `append` method.
   ```javascript
   $("button span.two-icons").append([ icon, icon2 ]);
   ```

For a practical demonstration, refer to the following [Progress Kendo UI Dojo](https://dojo.telerik.com/PaiuOoPn) example which showcases the above steps.

## See Also

- [Rendering SVG Icons with Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/svg-icons?#rendering-svg-icons)
- [Kendo UI Button API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/configuration/iconclass)
- [jQuery Append Method Documentation](https://api.jquery.com/append/)
