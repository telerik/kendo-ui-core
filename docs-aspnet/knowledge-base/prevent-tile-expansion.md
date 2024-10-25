---
title: Learn how to override the default CSS style of the TileLayout component in order to set the grid-auto-rows property to min-content and prevent the automatic expansion of a tile
type: how-to
page_title: Prevent automatic TileLayout tile expansion
slug: prevent-tile-expansion
tags: tilelayout, tile, expand, resize, css, style, min-content, grid-auto-rows
res_type: kb
---

## Environment

| Product | Version |
|---------|---------|
| TileLayout for ASP.NET Core | 2023.3.1010 |

## Description

I want to override the default CSS style of the TileLayout component in my web project. The issue I'm facing is that when I expand the hierarchy of the kendo-treeview in the second container, the first container also expands and leaves empty spaces.

## Solution

To override the default CSS style of the TileLayout component and set the `grid-auto-rows` property to `min-content`, follow these steps:

1. Add the following CSS rule to your project:

    ```css
    .k-tilelayout {
        grid-auto-rows: min-content !important;
    }
    ```

2. Apply the CSS rule to your TileLayout component.

Here's an example of the effect of this CSS rule when applied to a TileLayout that has a TreeView in its second container:

![TileLayout example](https://netcorerepl.telerik.com/GdvQFcPR16ya7oT458)

That's it! With this CSS override, the first container (tile) will no longer automatically resize when you expand the hierarchy of the TreeView in the second container.
