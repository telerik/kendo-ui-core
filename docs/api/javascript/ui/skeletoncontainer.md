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


<div class="meta-api-description">
Control loading indicators with customizable animated placeholders by enabling or disabling animation styles such as wave effects, pulsating pulses, or static states to visually represent content loading progress. Configure the animation type to set whether no animation, a smooth wave shimmer, or a rhythmic pulse highlights skeleton screens during data fetching, providing flexible options for loading feedback, placeholder animation, shimmer effects, and dynamic loading visuals in user interface skeleton containers. Adjust or disable animation behavior to match design needs and improve perceived loading experience with customizable skeleton placeholders.
</div>

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


<div class="meta-api-description">
Adjust layout and arrangement of loading skeleton placeholders using CSS Grid configurations including setting columns, rows, gaps, alignment, and spacing to control positioning and sizing of skeleton shapes for responsive loading states, customizable grid templates, and flexible spacing in container elements. Enable fine-tuning of grid layouts, define grid areas, and manage how placeholders adapt across different screen sizes or component structures. Configure grid properties like template-columns, template-rows, row-gap, column-gap, and alignment to control loading skeleton display in diverse UI scenarios and ensure consistent, responsive placeholder arrangement during content loading.
</div>

#### Example

    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 400,
        height: 300,
        grid: {
            columns: 3,
            rows: 2,
            gap: {
                columns: 10,
                rows: 15
            },
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
        },
        animation: "wave"
    });
    </script>

### grid.columns `Number`

Defines the number of columns.


<div class="meta-api-description">
Configure the number of columns displayed as placeholders in a grid layout to control how many column placeholders appear, manage the grid’s structure and spacing, adjust the density of placeholder items, enable responsive column counts for various screen sizes, customize the visual layout by setting column quantities, define the grid’s column arrangement for loading skeletons, control how many vertical sections or columns render as placeholders, set and modify column counts to influence layout flow, tune the grid column parameters to match design requirements, and optimize placeholder distribution across different device widths and layouts.
</div>

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


<div class="meta-api-description">
Adjust or control the horizontal and vertical spacing, margins, or gaps between placeholder or skeleton loading items arranged in a grid layout; configure the space between rows and columns of loading skeleton elements to fine-tune layout appearance, set distance or padding between grid cells, customize spacing between placeholder blocks, manage the gaps between items for better visual alignment or responsiveness, and modify the empty space separating skeleton components in container grids for consistent UI skeleton structure or loading state display.
</div>

#### Example

    <div id="skeleton"></div>
    <script>
    $("#skeleton").kendoSkeletonContainer({
        width: 300,
        height: 250,
        grid: {
            columns: 4,
            rows: 3,
            gap: {
                columns: 8,
                rows: 12
            },
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
        },
        animation: "pulse"
    });
    </script>

### grid.gap.columns `Number`

A value in pixels determining the space between horizontal spacing between the items.


<div class="meta-api-description">
Adjust horizontal spacing or margin between columns in a grid layout, configure the width of column gaps or gutters in pixel units, control the distance between grid items horizontally, set precise column spacing for arranging placeholders or skeleton elements, customize grid column gaps to refine layout appearance, enable or modify horizontal gaps between grid cells, manage gutter size between columns to achieve consistent spacing, define space between vertical grid lines, tune inter-column padding or separation for better alignment, optimize horizontal white space in grid-based skeleton or placeholder containers.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing or row gaps between grid items in a container by setting numeric pixel values to control the distance between stacked rows, enabling layout customization with precise row padding, margin adjustments, or space control for grid-based interfaces, facilitating flexible design spacing between elements arranged vertically, modifying vertical gaps for improved visual separation and rhythm within grid columns, fine-tuning row interval or vertical padding in user interfaces that use grid layouts or skeleton loaders.
</div>

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


<div class="meta-api-description">
Control and customize placeholder elements within a container grid by defining an array of configuration objects, each specifying individual skeleton item settings such as layout, appearance, and rendering behavior during initialization. Enable precise per-item customization to manage how placeholders are displayed, arranged, and visually represented in grid structures, supporting use cases like loading states, skeleton screens, or temporary UI placeholders. Adjust and configure skeleton item properties including size, style, and position within the container grid to tailor the placeholder experience, ensuring flexibility for developers seeking to modify placeholder granularity, arrangement patterns, or dynamic placeholder rendering in grid-based UI components.
</div>

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


<div class="meta-api-description">
Control or configure the starting column position of a grid item within a container, specifying the initial column index from which the item should begin in the grid layout. Enable precise placement or alignment of elements by setting the column start point, determining where the item appears horizontally in grid-based designs. Adjust the grid item's horizontal starting cell, customize layout flow, and align content by defining its column commencement, managing grid positioning and structure effectively.
</div>

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


<div class="meta-api-description">
Set or adjust how many columns a grid item spans to control horizontal layout and width within a container; configure item column spanning to create responsive grid layouts, define multi-column sizing, merge adjacent columns for an element, manage grid cell coverage across multiple columns, and enable flexible horizontal alignment by extending an item’s column footprint in the grid structure.
</div>

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


<div class="meta-api-description">
Set or control the initial row position of an item within a grid layout, specifying the starting grid line or index along the row axis for flexible placement, alignment, and arrangement of elements in grid containers. Adjust, configure, or define where items begin vertically in grid rows to manage layout flow, ordering, and design structure in complex grid systems or responsive designs.
</div>

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


<div class="meta-api-description">
Control the vertical span of grid items by specifying how many rows an element should occupy within a grid layout, enabling the adjustment of row height coverage, multi-row placement, and layout flexibility for placeholder skeletons or content blocks; customize the number of grid rows spanned to influence spacing, item size, and alignment, effectively managing vertical distribution and layout responsiveness in grid-based interfaces.
</div>

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


<div class="meta-api-description">
Configure the visual style and appearance of loading placeholders by selecting shapes like rectangle, circle, or text line to control how each grid item looks during content loading, enabling customization of placeholder forms to match UI needs, including rounded, block, or inline representations for loading states across skeleton layouts, allowing developers to set or modify the style of placeholders as rectangular blocks, circular dots, or textual lines for a seamless loading experience.
</div>

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


<div class="meta-api-description">
Control the number of horizontal placeholder rows displayed in a skeleton or loading UI grid to adjust layout density, visual length, and the amount of placeholder content shown while data loads. Configure, set, or adjust the row count to customize the skeleton screen appearance, define how many rows render in grids or lists during loading states, manage the vertical size of placeholder skeletons, and tailor loading animations with specific row quantities to match different UI layouts or component initializations.
</div>

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


<div class="meta-api-description">
Adjust or specify the vertical size, height, or dimension of a container placeholder or loading skeleton area by setting explicit pixel values or numeric measurements to control how tall the component appears on the screen. Enable configuring, defining, or resizing the rendered frame’s height during setup or initialization to customize the container’s vertical space, ensuring precise control over layout, spacing, and visual structure in UI skeleton states or loading indicators.
</div>

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


<div class="meta-api-description">
Control and customize placeholder loading skeleton layouts by defining a template that specifies the markup structure and arrangement of skeleton shapes, enabling tailored visual placeholders during content loading. Adjust, configure, or override default skeleton designs with custom templates to create specific loading states, manage layout, or experiment with appearance alternatives. Prioritize layout approaches when combining grid and template configurations, understanding grid settings override template-based skeleton rendering preferences. Enable precise control over how loading placeholders visually represent content structure for improved UX consistency during asynchronous data fetches or rendering delays.
</div>

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


<div class="meta-api-description">
Adjust or define the horizontal dimension, overall width, or layout span of a container, panel, or component by specifying pixel or numerical width values to control how wide the element appears visually or in the interface. Enable setting fixed width size, resize container horizontally, configure layout width in pixels or units, and control element breadth or horizontal scale in UI, including specifying exact or responsive width measurements for placeholders, wrappers, or skeleton loading screens.
</div>

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
