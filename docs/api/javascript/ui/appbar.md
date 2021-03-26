---
title: AppBar
page_title: Configuration, methods and events of Kendo UI AppBar
description: 'Configuration steps for the AppBar widget.'
res_type: api
---

# kendo.ui.AppBar

Represents the Kendo UI AppBar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### themeColor `String` *(default: 'light')*

Specifies the color of the component. Valid options are

* `inherit`: no coloring will be applied to the appbar. Useful when the appbar needs to blend-in with the surrounding elements.
* `dark`: applies coloring based on **dark** theme color.
* `light`: applies coloring based on **light** theme color.

#### Example - set color
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                template: "<span><input /><span>"
            }
        ],
        themeColor: "dark"
    });
    </script>

### items `Array`

An array with objects representing the appbar items.

#### Example - set the widths of the columns
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

### items.className `String`

Defines a set CSS classes for the item.

#### Example - set the type for an item
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                className: "k-first k-one"
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

### items.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders as content for the appbar item. Valid only for the **contentItem** type

#### Example - set the template using function
    <script id="first" type="text/x-kendo-template">
    <input />
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                template: kendo.template($("#first").html())
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: kendo.template($("#second").html())
            },
        ]
    });
    </script>

#### Example - set the template using string
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

### items.type `String`

A value determining the type of the item. Valid options are

* `spacer`: creates a **span** which to add space between the items.
* `contentItem`: creates an item using a specific template provided for it.

#### Example - set the type for an item
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

### items.width `String|Number`

Determines the width of the item. Valid only for the spacer items. Numeric values are treated as pixels.

#### Example - set the width for an item
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer",
                width: 60
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

### position `String` *(default: 'none')*

Defines where in the page the AppBar will be positioned. Valid options are

* `none`: does not add specific positioning syles
* `top`: adds the AppBar at the top of the page
* `bottom`: adds the AppBar at the bottom of the page.

#### Example - set the position
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        position: "bottom",
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

### positionMode `String` *(default: 'static')*

Defines the type of positioning. Valid options are

* `static`: positions the AppBar according to the normal flow of the page.
* `sticky`: sticks the AppBar to a given position(top or bottom).
* `fixed`: positions the AppBar relative to the viewport.

#### Example - set the positionMode
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        positionMode: "sticky",
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>

## Events

### resize

Fired when the window is resized.

#### Event Data

##### e.sender `kendo.ui.AppBar`

The widget instance.

#### Example - subscribe to resize event
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        positionMode: "sticky",
        resize: function () {
            console.log("Resize fired!");
        },
        items: [
            {
                type: "contentItem",
                template: "<span><input /><span>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: "<h1>This is just a text</h1>"
            },
        ]
    });
    </script>
