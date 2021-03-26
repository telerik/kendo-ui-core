---
title: 2021 Releases
page_title: 2021 Releases | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2021."
slug: breakingchanges2021_kendoui
position: 1
---

# 2021 Releases

This article lists the breaking changes in the 2021 releases of Kendo UI.

## Kendo UI 2021 R1

**Grid**

Changes appear in the Grid Toolbar which now utilizes the [`CSS flexbox`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) concept. This change improves Grid Toolbar responsiveness and visualization on smaller screen sizes.

Reverting to the previous appearance is possible by:

- setting the Search Panel as the last element in the toolbar:

```
toolbar: ["excel", "pdf", "search"],
```

- utilizing the following styles:

```
    <style>
     .k-grid .k-grid-search {
            margin-left: auto;
            margin-right: 0;
        }
    </style>
```

**Window**

In previous versions, when setting the [`height`](/api/javascript/ui/window/configuration/height) option, the total height of the Window was equal to the specified value plus the title bar height. As of 2021 R1, the Window now sets the height by also taking into account the title bar height and including it in the calculation. Thus, if height is specified to 200 pixels, this means that the full Window height will be 200 pixels. This change improves the Window behavior and allows for correctly specifying the height of the Window in percentage.

This change will affect Window instances that have height specified explicitly (height will be reduced with the title bar height). Reverting to the previous state is possible by increasing the height accordingly:

```
$("#window").kendoWindow({
    height: "250px", // increase this value with the title bar height
});
```
