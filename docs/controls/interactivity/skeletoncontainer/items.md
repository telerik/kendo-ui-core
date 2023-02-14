---
title: Items
page_title: jQuery SkeletonContainer Documentation - Items
description: "Learn how to configure the items in the jQuery SkeletonContainer by Kendo UI."
slug: items_kendoui_skeletoncontainer_widget
position: 2
---

# Items 

The Kendo UI SkeletonContainer uses the default [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) layout as a base. Each cell or group of cells from the CSS Grid can be represented by an item from the SkeletonContainer.

Each item contains the following properties:

*   `colStart` - indicates the starting column of the item.
*   `colSpan` - indicates how many columns the item will occupy.
*   `rowStart` - indicates the starting row of the item.
*   `rowSpan` - indicates how many rows the item will occupy
*   `shape` - the type of shape that will fill the selected cells.

The following example shows how to create a SkeletonContainer using a grid featuring all shape types:

```dojo
    <style>
        #skeleton {
            border: 1px solid;
            border-color: rgba(0, 0, 0, 0.08);
        }
    </style>
    <div id="skeleton"></div>

    <script>
            $("#skeleton").kendoSkeletonContainer({
                animation: "pulse",
                height: 340,
                width: 350,
                grid: {
                    items: [{
                        colStart: 2,
                        colSpan: 4,
                        rowStart: 2,
                        rowSpan: 4,
                        shape: "circle"
                    },
                    {
                        colStart: 7,
                        colSpan:13,
                        rowStart: 2,
                        rowSpan: 2,
                        shape: "text"
                    },
                    {
                        colStart: 7,
                        colSpan: 9,
                        rowStart: 4,
                        rowSpan: 2,
                        shape: "text"
                    },
                    {
                        colStart: 1,
                        colSpan: 20,
                        rowStart: 7,
                        rowSpan: 11,
                        shape: "rectangle"
                    },
                    {
                        colStart: 2,
                        colSpan: 18,
                        rowStart: 19,
                        rowSpan: 1,
                        shape: "text"
                    }],
                    rows: 20,
                    columns: 20
                },
            });
        });
    </script>
```

## See Also

* [Overview of the SkeletonContainer (Demo)](https://demos.telerik.com/kendo-ui/skeletoncontainer/index)
* [JavaScript API Reference of the SkeletonContainer](/api/javascript/ui/skeletoncontainer)
