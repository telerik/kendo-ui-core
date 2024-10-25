---
title: SkeletonContainer
page_title: Configuration, methods and events of Kendo UI SkeletonContainer
description: 'Configuration steps for the SkeletonContainer widget.'
res_type: api
---

# kendo.ui.SkeletonContainer

Represents the Kendo UI SkeletonContainer widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `String` *(default: 'pulse')*

Defines a value determining whether the items will be animated. Valid options are

* `none`: no animation is applied
* `wave`: a wave animation is applied
* `pulse`: a pulsating animation is applied

#### Example - set the animation of the items
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        },
        animation: "wave"
    });
    </script>

### grid `Object`

Defines the settings for the CSS Grid used for layouting the skeleton shapes.

### grid.columns `Number`

Defines the number of columns.

#### Example - set the number of columns
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>

### grid.gap `Object`

An object holding values that determine the spacing between the skeleton items horizontally and vertically.

### grid.gap.columns `Number`

A value in pixels determining the space between horizontal spacing between the items.

#### Example - set the gap for the columns
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 400,
        height: 400,
        grid: {
            columns: 5,
            rows: 5,
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            gap: {
                columns: 25,
                rows: 25
            }
        }
    });
    </script>

### grid.gap.rows `Number`

A value in pixels determining the space between vertical spacing between the items.

#### Example - set the gap for the rows
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 400,
        height: 400,
        grid: {
            columns: 5,
            rows: 5,
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "circle"
                }
            ],
            gap: {
                columns: 25,
                rows: 25
            }
        }
    });
    </script>

### grid.items `Array`

An array with objects representing the settings of the component items.

#### Example - set the items that the skeleton holds
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>

### grid.items.colStart `Number`

A value that determines the start position of the item on the column axis.

#### Example - set the colStart for an item
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>

### grid.items.colSpan `Number`

A value that determines how many columns will the item span.

#### Example - set the columnEnd for an item
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>

### grid.items.rowStart `Number`

A value that determines the start position of the item on the row axis.

#### Example - set the rowStart for an item
    <div id="skeleton"></div>
    <script>
      $("#skeleton").kendoSkeletonContainer({
        animation: "wave",
        height: 200,
        width: 340,
        grid: {
          items: [
            {
              colStart: 1,
              colSpan: 1,
              rowStart: 2,
              rowSpan: 2,
              shape: "rectangle"
            },
            {
              colStart: 2,
              colSpan: 1,
              rowStart: 1,
              rowSpan: 1,
              shape: "circle"
            }
          ],
          columns: 4,
          rows: 4
        },
        animation: "wave"
      });
    </script>

### grid.items.rowSpan `Number`

A value that determines how many rows will the item span.

#### Example - set the rowSpan for an item
    <div id="skeleton"></div>
    <script>
      $("#skeleton").kendoSkeletonContainer({
        animation: "wave",
        height: 200,
        width: 340,
        grid: {
          items: [
            {
              colStart: 1,
              colSpan: 1,
              rowStart: 1,
              rowSpan: 2,
              shape: "rectangle"
            },
            {
              colStart: 2,
              colSpan: 1,
              rowStart: 1,
              rowSpan: 1,
              shape: "circle"
            }
          ],
          columns: 4,
          rows: 4
        },
        animation: "wave"
      });
    </script>

### grid.items.shape `String` *(default: 'text')*

A value that determines the shape of the item. Valid options are

* `rectangle`: sets a rectangular form for the item
* `text`: mimics a text placeholder for the item
* `circle`: sets a circular shape for the item.

#### Example - set the shape for an item
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "circle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>

### grid.rows `Number`

Defines the number of rows.

#### Example - set the number of rows
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 300,
        grid: {
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>

### height `String|Number`

Determines the height of the component. Numeric values are treated as pixels.

#### Example - set the height of the component
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 200,
        grid: {
            columns: 5,
            rows: 5,
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ]
        }
    });
    </script>

### template `String|Function`

Defines a template that will be used to visualize the skeleton shapes. If both grid and template are defined the grid takes precedence.

#### Example - sets the width of the component
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 200,
        animation: "pulse",
        template: "<span>Text</span><span data-shape-text>Text</span>"
    });
    </script>

### width `String|Number`

Determines the width of the component. Numeric values are treated as pixels.

#### Example - sets the width of the component
    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 200,
        height: 200,
        grid: {
            columns: 5,
            rows: 5,
            items: [
                {
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                },
                {
                    colStart: 2,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape: "rectangle"
                }
            ],
            columns: 4,
            rows: 4
        }
    });
    </script>
