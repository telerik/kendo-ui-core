---
title: Changing the Icon of the Column Menu Button or Filter Menu Button in Kendo UI for jQuery Grid
description: Learn how to customize the column menu button icon in the Kendo UI for jQuery Grid component.
type: how-to
page_title: How to Customize the Column or Filter Menu Button Icon in Kendo UI for jQuery Grid
slug: customize-column-menu-icon-kendo-ui-grid-jquery
tags: kendo, ui, jquery, grid, icon, customization
res_type: kb
components: ["grid"]
ticketid: 1673973
---

## Description
In some scenarios, you might want to change the default icons of the column menu button or filter menu button in the Kendo UI for jQuery  Grid headers to better suit the design of your application. This knowledge base article also answers the following questions:
- How can I change the icon of the column menu to a different icon?
- What method can I use to customize the column menu button icon in the Kendo UI for jQuery Grid?
- Is it possible to replace the default column menu button icon with a custom icon?

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Solution
To change the icon of the column menu button on the headers in the Kendo UI for jQuery Grid, use the [`kendo.ui.icon`](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/icon) method to target the element containing the SVG icon and replace it with the desired icon.

### Changing the Column Menu Icon
To replace the main column menu icon, target the `.k-grid-column-menu .k-svg-i-more-vertical` class and use the desired icon name. Here is how you can change the icon to a 'filter' icon:

```javascript
kendo.ui.icon($('.k-grid-column-menu .k-svg-i-more-vertical'), { icon: 'filter' });
```

### Changing the Filter Menu Icon
If you need to change the icon in a filterMenu, target the `.k-grid-filter-menu .k-svg-i-filter` class and replace it with the icon of your choice. Here's an example of changing the icon to a 'star':

```javascript
kendo.ui.icon($('.k-grid-filter-menu .k-svg-i-filter'), { icon: 'star' });
```

## See Also
- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Kendo UI Icon Method Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/icon)
