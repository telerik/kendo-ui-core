---
title: Set Global Font Size
description: How can I set global font size for the Telerik UI components, for example the Grid?
type: how-to
page_title: Set Global Font Size In Pixels
slug: set-global-font-size
tags: font, size, grid
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® {{ site.product_short }}</td>
 </tr>
</table>

## Description

This KB article demonstrates how to adjust the global font size of the text displayed inside the Telerik UI {{ site.product_short }} components.

## Solution

The default font size of the components is 14px by default.

However, font sizes now operate in rem-s, and this might lead to different results depending on the environment. For instance, the default value of the **kendo-font-size** variable inside the SASS theme is 0.875rem. In some systems, this might translate to 14px, in others to 18px, and in third ones - to 12.5px.

To set the global font size in pixels, you can use one of these different options:

**Option 1:**

You can set a value like this:
```CSS
html {
    font-size: 16px;
}
```

Which will result to something like 14px in the components operating with rem units, because **kendo-font-size** is 0.875rem.

**Option 2:**

By modifying the variable you can set final value in pixels dynamically:
```CSS
html {
    --kendo-font-size: 16px;
}
```

**Option 2:**

By modifying the variable in rem-s, you can again let the pixel value unmodified:
```CSS
html {
    --kendo-font-size: 1rem;
    font-size: 16px;
}
```

And this will also result in text font size of 16px.

## See Also

- [Theme Variables](https://www.telerik.com/design-system/docs/themes/theme-default/theme-variables)
- [Themes Foundation - Typography](https://www.telerik.com/design-system/docs/foundation/typography/)
- [Themes Default - Typography](https://www.telerik.com/design-system/docs/themes/theme-default/customization/#typography)