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

### containers.header.template `String|Function`

The [template](/api/javascript/kendo/methods/template) that will be rendered as a header.

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

### gap.columns `Number`

A value in pixels determining the space between horizontal spacing between the layout items.

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

### reorderable `Boolean` *(default: false)*

Determines whether the reordering functionality will be enabled.

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

### resizable `Boolean` *(default: false)*

Determines whether the resizing functionality will be enabled.

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
            console.log(e.container[0]);
        }
    });
    </script>

### reorder

Fired when a tile item is reordered.

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
            console.log(e.newIndex, e.oldIndex);
        }
    });
    </script>
