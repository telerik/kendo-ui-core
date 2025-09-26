---
title: TileLayout
page_title: Configuration, methods and events of Kendo UI TileLayout
description: 'Configuration steps for the TileLayout widget.'
res_type: api
---

# kendo.ui.TileLayout

Represents the Kendo UI TileLayout widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### columns `Number`

Defines the number of columns.


<div class="meta-api-description">
Set or adjust the number of vertical columns to control how tiles or items are arranged horizontally within a layout, influencing row wrapping and overall grid structure. Customize the horizontal organization by specifying the count of columns to manage content distribution, layout density, or tile alignment. Control tile wrapping behavior and layout responsiveness by determining how many columns appear side by side, enabling flexible grid configurations and horizontal spacing adjustments. Enable developers to define, configure, or modify the width distribution and column count for arranging elements in multiple vertical segments for improved layout control and visual structure.
</div>

#### Example - set the number of columns
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

### columnsWidth  `String|Number` *(default: '1fr')*

Determines the width of the columns. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust or configure column widths, set fixed or pixel-based column sizes, control the horizontal dimensions of columns, define or specify column sizing in grid or tile layouts, manage tile or panel column width proportions, enable customization of column widths in UI layouts, control spacing and width distribution across columns, set numeric pixel values for column width, customize layout grid column measurements, and modify horizontal layout structure by assigning width values to columns.
</div>

#### Example - set the widths of the columns
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        columnsWidth: 300
    });
    </script>

### containers `Array`

An array with objects representing the settings of the layout items.


<div class="meta-api-description">
Set up and customize the arrangement and properties of layout items by providing a list or array of objects that define each tile’s content, position, size, order, and additional metadata; control how the tile-based structure initializes with specific elements, enabling precise layout configuration, item ordering, dimension settings, and embedding custom data or behavior within individual segments for flexible and dynamic grid or tile interfaces.
</div>

#### Example - set the containers that the layout holds
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

### containers.bodyTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders as content for the tile item.


<div class="meta-api-description">
Customize and control the display of individual tiles by defining dynamic content templates that render each tile's main body area, enabling developers to configure personalized layouts, bind data fields, insert HTML structures, and apply conditional expressions or transformations to tile items within grid or tile-based interfaces. This feature supports flexible tile rendering, template customization, dynamic content binding, and presentation control for item bodies in visual layouts.
</div>

#### Example - set the bodyTemplate using function
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

#### Example - set the bodyTemplate using string
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: "<h3>A</h3>"
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: "<h3>B</h3>"
            }
        ],
        columns: 4
    });
    </script>

### containers.colSpan `Number`

A value that determines how many columns will the tile item span.


<div class="meta-api-description">
Adjust the horizontal width or size of grid tiles by specifying how many columns a tile should span across the layout, controlling the number of columns occupied to customize tile width, set tile column span for stretching or shrinking within a grid, configure tile horizontal span in responsive or fixed column layouts, enable tile resizing by column count, control tile wrapping behavior based on column span, align tiles horizontally through column spanning, and define the horizontal footprint of each tile using a positive integer to determine how many columns it covers in a tiled or grid interface.
</div>

#### Example - set the colSpan for an item
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 3,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

### containers.header `Object`

Holds the configuration settings for the header.


<div class="meta-api-description">
Configure and customize the header section in a tiled layout by setting options that control visibility, style, layout, templates, CSS classes, and behavior on initialization. Adjust header container appearance, define custom templates, toggle display settings, apply styling classes, and tailor header interaction and layout properties to fit various UI needs. Enable detailed control over the top area of tile-based interfaces with flexible configuration settings for headers, including custom content placement, design adjustments, and responsive visibility.
</div>

#### Example

    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 2,
                rowSpan: 1,
                bodyTemplate: "<p>Container with header configuration</p>",
                header: {
                    template: "<h3>Custom Header</h3>"
                }
            }
        ],
        columns: 4
    });
    </script>

### containers.header.template `String|Function`

The [template](/api/javascript/kendo/methods/template) that will be rendered as a header.


<div class="meta-api-description">
Customize or set the container header in a tile-based layout by defining a header template using a template string or rendering function that supports dynamic HTML, data bindings, or custom markup, enabling tailored header content, personalized layouts, and interactive or data-driven header components within tile containers.
</div>

#### Example - set the headerTemplate using a function
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <script id="headerOne" type="text/x-kendo-template">
        "Item one"
    </script>
    <script id="headerTwo" type="text/x-kendo-template">
        "Item two"
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    template: kendo.template($("#headerOne").html())
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    template: kendo.template($("#headerTwo").html())
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

#### Example - set the header template using string
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    template: "<span>Item one</span>"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    template: "<span>Item two</span>"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

### containers.header.text `String`

The text that will be rendered as a header.


<div class="meta-api-description">
Control the visible header caption or label displayed on a container within a tiled layout, enabling customization, configuration, or dynamic updates of the header text string shown above each section or tile. This includes setting, changing, or updating the container’s header title, heading, or label during initialization or runtime to reflect context, descriptions, or user-specific content in tile-based user interface arrangements. Adjust, specify, or manage the container header wording or displayed text easily to enhance UI clarity, section identification, or navigation within tiled layouts.
</div>

#### Example - set the headerText
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

### containers.rowSpan `Number`

A value that determines how many rows will the tile item span.


<div class="meta-api-description">
Control the vertical size or height of a tile by setting how many grid rows it occupies within a tile-based layout, enabling configuration of tile height, vertical span, or multi-row stretching to influence placement and spacing in grid or tiled interfaces. Adjust the number of rows a block or widget covers vertically to customize layout density, tile alignment, or distribution when designing responsive, multi-row grid arrangements, managing overlap, and optimizing visual order.
</div>

#### Example - set the rowSpan for an item
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 3,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4
    });
    </script>

### gap `Object`

An object holding values that determine the spacing between the layout items horizontally and vertically.


<div class="meta-api-description">
Adjust or set the spacing between elements in a grid or tile-based layout by configuring horizontal and vertical gaps, gutters, or margins to control the distance separating tiles or items. Enable or customize the padding between grid cells, define the space between rows and columns, or manage the inter-item separation to optimize tile arrangement, clarity, and visual balance within a layout grid container. Control or modify spacing parameters to increase or decrease the empty area between neighboring tiles, ensuring consistent and flexible spacing for responsive or fixed layouts in user interface design and component grid arrangement.
</div>

#### Example

    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                bodyTemplate: "<p>Item 1</p>"
            },
            {
                colSpan: 1,
                rowSpan: 1,
                bodyTemplate: "<p>Item 2</p>"
            },
            {
                colSpan: 1,
                rowSpan: 1,
                bodyTemplate: "<p>Item 3</p>"
            }
        ],
        columns: 3,
        gap: {
            columns: 20,
            rows: 15
        }
    });
    </script>

### gap.columns `Number`

A value in pixels determining the space between horizontal spacing between the layout items.


<div class="meta-api-description">
Adjust horizontal spacing between elements by setting column gaps or horizontal padding in grid or tile layouts, controlling the space between items across columns, managing the distance between elements to affect item alignment, wrapping behavior, layout density, spacing configuration, horizontal margins, and inter-item gaps in responsive or fixed layouts.
</div>

#### Example - set the gap for the columns
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        gap: {
            columns: 30
        },
        columns: 4
    });
    </script>

### gap.rows `Number`

A value in pixels determining the space between vertical spacing between the layout items.


<div class="meta-api-description">
Adjust vertical spacing or set the pixel gap between rows in a tiled grid or layout, customize row intervals, control spacing between stacked items, configure the distance separating rows of elements, manage layout row padding or margin, define vertical gaps for tiled or grid-based interfaces, set row spacing in pixels to optimize visual separation, change or enable row gaps for arranging components, specify vertical layout intervals, and control space between rows for neat alignment in tile or grid layouts.
</div>

#### Example - set the gap for the rows
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        gap: {
            rows: 30
        },
        columns: 4
    });
    </script>

### height `String|Number`

Determines the height of the layout. Numeric values are treated as pixels.


<div class="meta-api-description">
Control or configure the vertical dimension, height, or size of a tiled layout container by setting numeric values interpreted as pixels to fix or adjust how much vertical space the tile arrangement occupies, enabling precise height settings for layout design, UI element spacing, or visual structure in grid, tile, or mosaic-style interfaces.
</div>

#### Example - set the height of the widget
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        height: 400,
        columns: 4
    });
    </script>

### navigatable `Boolean` *(default: false)*

A value indicating whether keyboard navigation will be enabled.

> **Note:** When [`reorderable`](/api/javascript/ui/tilelayout/configuration/reorderable) is enabled after reordering the items the DOM are also reordered.


<div class="meta-api-description">
Control keyboard focus and navigation within a grid or tile-based layout by enabling or disabling keyboard interaction that lets users move selection and focus among tiles using arrow keys, Tab, Enter, or other keyboard shortcuts. Configure keyboard accessibility to facilitate smooth focus management, arrow key navigation, tab order control, and activation of items via keyboard input, supporting users who rely on keyboard navigation in interactive tile or card layouts. This setting allows toggling keyboard-based focus movement and interaction for components structured with multiple tiles, supporting accessible, navigable interfaces with dynamic or static item arrangements.
</div>

#### Example - enable the keyboard navigation
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        navigatable: true,
        columns: 4
    });
    </script>

### reorderable `Boolean|Object` *(default: false)*

Determines whether the reordering functionality will be enabled.


<div class="meta-api-description">
Enable or disable interactive rearranging and dragging of tiles within a grid or tile-based layout at runtime, allowing users to customize the order and positioning of tiles dynamically; control, configure, or set the ability to reorder items by drag-and-drop during initialization or runtime, supporting user-driven tile movement, tile sorting, and layout customization features in a visual interface or dashboard.
</div>

#### Example - enable reordering
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        reorderable: true
    });
    </script>

### reorderable.clickMoveClick `Boolean` *(default: true)*

Determines whether the click move click interaction would be enabled as an alternative of the drag and drop reorder. By default the alternative is enabled.


<div class="meta-api-description">
Enable or disable the ability to reorder items within a tiled interface using a click, move, and click sequence as an alternative to traditional drag-and-drop functionality, providing users with an option to rearrange elements by clicking to select, moving the item, and clicking again to place it; control whether click-to-move item rearrangement is active or inactive, allowing configuration of interactive layouts for customizable item ordering without dragging gestures.
</div>

#### Example - enable reordering
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        reorderable: {
            clickMoveClick: false
        }
    });
    </script>


### resizable `Boolean` *(default: false)*

Determines whether the resizing functionality will be enabled.

> **Note:** When [`resizable`](/api/javascript/ui/tilelayout/configuration/resizable) is enabled items should have a defined rowSpan and colSpan.


<div class="meta-api-description">
Control whether tiles in a grid layout can be interactively resized by dragging, letting users dynamically adjust tile width and height in rows and columns during runtime. Enable or disable drag-to-resize functionality to customize grid item dimensions, set initial size spans, and configure user-driven layout resizing behavior in tile-based interfaces or dashboards. This includes managing tile span adjustments on the fly, controlling whether grid cells can expand or shrink by user input, and allowing responsive rearrangement of tile sizes through direct manipulation. This feature supports flexible, adjustable tile dimensions that adapt based on user interaction with the grid layout system.
</div>

#### Example - enable resizing
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        resizable: true
    });
    </script>

### rowsHeight `String|Number` *(default: '1fr')*

Determines the height of the rows. Numeric values are treated as pixels.


<div class="meta-api-description">
Configure and control the vertical size of rows within a tile-based layout, adjusting row height to manage the spacing, density, and overall visual arrangement of tiles. Set fixed or dynamic row dimensions using pixel values to influence tile scaling and alignment in grid or mosaic interfaces, enabling precise control over row size, vertical rhythm, and uniformity in tile spacing and layout structure. Optimize layout density and tile positioning by defining consistent or variable row heights to accommodate responsive design, grid balancing, and user interface flow.
</div>

#### Example - sets the number of the rows
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        rowsHeight: 300
    });
    </script>

### width `String|Number`

Determines the width of the layout. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust or configure the horizontal size, fixed width, pixel width, or overall component width to control how wide the tile layout appears; set or define the layout’s horizontal dimension, component sizing, or container width by specifying a numeric pixel value to ensure the layout fits precisely within the desired width constraints or user interface design.
</div>

#### Example - sets the width of the layout
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        width: 400
    });
    </script>

## Events

### resize

Fired when a tile item is resized.


<div class="meta-api-description">
Detect handling tile dimension changes, respond to tile resize events, monitor tile size adjustments, trigger updates when tile elements change size, synchronize UI or data after tile scaling, manage dynamic layout recalculations upon tile resizing, customize reactions to tile geometry modifications, control adjacent tile repositioning following size changes, listen for tile item dimension alterations, and implement event-driven updates on tile resizes for responsive, adaptive grid or dashboard layouts.
</div>

#### Event Data

##### e.container `jQuery`

A jQuery object representing the resized item.

##### e.sender `kendo.ui.TileLayout`

The widget instance which fired the event.

#### Example - subscribe to resize event
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        resizable: true,
        resize: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.container[0]);
        }
    });
    </script>

### reorder

Fired when a tile item is reordered.


<div class="meta-api-description">
Detect when an item is dragged, rearranged, or repositioned within a tiled interface and respond to changes in item order by capturing events triggered on reordering actions. Enable custom logic to update data models, save modified sequences, synchronize layouts, animate transitions, or refresh connected UI elements when items move positions, supporting use cases like drag-and-drop sorting, dynamic tile organization, and real-time interface updates triggered by user interaction or programmatic reorder operations.
</div>

#### Event Data

##### e.container `jQuery`

A jQuery object representing the reordered item.

##### e.newIndex `Number`

A number indicating the new index of the item.

##### e.oldIndex `Number`

A number indicating the old index of the item.

##### e.sender `kendo.ui.TileLayout`

The widget instance which fired the event.

#### Example - subscribe to reorder event
    <script id="first" type="text/x-kendo-template">
    <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        containers: [
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: kendo.template($("#first").html())
            },
            {
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: kendo.template($("#second").html())
            }
        ],
        columns: 4,
        reorderable: true,
        reorder: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.newIndex, e.oldIndex);
        }
    });
    </script>
