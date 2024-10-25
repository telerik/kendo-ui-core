---
title: Icons Disappear after Upgrade
page_title: Icons Disappear after Upgrade
description: "Learn how to handle the issue that icons disappear after a Kendo UI for jQuery upgrade."
slug: icons_disappear_after_upgrade
tags: telerik, kendoui, jquery, troubleshooting, icons, disappear, after, upgrade
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

Icons disappear after a Kendo UI for jQuery upgrade.

## Cause
 
As of the R1 2017 release, Kendo UI widgets utilize font-icons instead of sprites. This approach outdates some CSS, which are now removed from the built-in styles.

## Solution

To provide for the backward compatibility of any custom icons you add to your project, include the following styles in your application:

```css
/* Provides backward compatibility support for custom sprites */
.k-sprite {
    display: inline-block;
    width: 16px;
    height: 16px;
    overflow: hidden;
    background-repeat: no-repeat;
    font-size: 0;
    line-height: 0;
    text-align: center;
    -ms-high-contrast-adjust: none;
}

/* Removes sprite styles from font icons */
.k-sprite.k-icon {
    font-size: 16px;
    line-height: 1;
}
```

