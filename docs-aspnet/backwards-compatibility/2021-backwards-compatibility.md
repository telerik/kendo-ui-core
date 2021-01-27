---
title: 2021 Releases
page_title: 2020 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2021."
slug: breakingchanges_2021
position: 2
---

# 2021 Releases

This article lists the breaking changes in the 2021 releases of Kendo UI for {{ site.product }}.

## {{ site.product }} R1 2021

**Grid**

Changes appear in the Grid Toolbar which now utilizes the [`CSS flexbox`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) concept. This change improves Grid Toolbar responsiveness and visualization on smaller screen sizes.

Reverting to the previous appearance is possible by:

- setting the Search Panel as the last element in the toolbar

```
.ToolBar(toolbar =>
    {
        toolbar.Excel();
        toolbar.Pdf();
        toolbar.Search();
    })
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

In previous versions, when setting the [`Height`](/api/window) option, the total height of the Window was equal to the specified value plus the title bar height. As of 2021 R1, the Window now sets the height by also taking into account the title bar height and including it in the calculation. Thus, if height is specified to 200 pixels, this means that the full Window height will be 200 pixels. This change improves the Window behavior and allows for correctly specifying the height of the Window in percentage.

This change will affect Window instances that have height specified explicitly (height will be reduced with the title bar height). Reverting to the previous state is possible by increasing the height accordingly:

```
@(Html.Kendo().Window()
    .Name("window")
    .Height(250) // increase this value with the title bar height
    ...
);
```
