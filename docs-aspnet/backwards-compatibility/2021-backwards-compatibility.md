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
