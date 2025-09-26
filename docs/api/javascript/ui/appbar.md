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


<div class="meta-api-description">
Adjust the app bar’s color scheme by configuring its theme color to blend seamlessly with the surrounding layout or to explicitly set it to dark or light color themes, enabling control over the appearance with options to inherit parent colors, apply a dark-themed palette for nighttime or high-contrast interfaces, or a light-themed palette suitable for bright, clean designs, facilitating consistent UI theming, color customization, and visual integration across different modes and design requirements.
</div>

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


<div class="meta-api-description">
Set, configure, or customize the entries within a navigation or command bar by specifying a collection of item objects that represent buttons, icons, commands, labels, or templates. Control adding, removing, reordering, or updating these elements to tailor the app bar’s contents dynamically, including binding actions, displaying icons, rendering text, or injecting custom templates for toolbar or header navigation elements. Enable precise management of the app bar’s interactive items to create flexible menus, toolbars, or command sets with various presentation and behavior options for user interface navigation and command execution.
</div>

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


<div class="meta-api-description">
Customize the styling and behavior of navigation bar elements by assigning one or multiple CSS class names to individual items, enabling developers to configure, control, or target specific UI components with custom styles, scripts, selectors, or animations. This capability supports adding, modifying, or overriding default styles through class selectors, facilitating dynamic theming, responsive design adjustments, interactive effects, and precise visual customization of toolbar or header controls within application interfaces. Whether setting classes for initial setup or updating them programmatically, it provides flexible options for selective appearance and behavior modification on each AppBar item.
</div>

#### Example - set the type for an item
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                type: "contentItem",
                className: "k-first k-one",
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


<div class="meta-api-description">
Customize and control how app bar items display by defining templates that render inline HTML, data-bound markup, or dynamic rendering functions specifically for content items within an application’s navigation bar or toolbar; configure, enable, or set custom item content presentation using flexible templating options that handle both static and data-driven content, supporting use cases such as embedding custom markup, binding UI elements to data models, or injecting specific HTML structure inside toolbar or app bar item elements for tailored visual and functional layouts.
</div>

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


<div class="meta-api-description">
Configure or identify the role and behavior of interface elements in an app bar by specifying their type, enabling control over how individual items render and function within the toolbar. This includes setting elements to act as spacers to create flexible gaps or defining content items that use custom templates to display specific content, facilitating layout arrangement, customization, or dynamic item rendering. Developers might search for how to assign roles, adjust item visualization, manage spacing between controls, apply templates to toolbar elements, or control app bar item behavior and presentation.
</div>

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


<div class="meta-api-description">
Adjust, configure, or control the horizontal spacing of spacer elements within the AppBar by setting their width to a specific pixel value, defining how much space these spacer items occupy to customize layout spacing, set fixed or dynamic widths for spacers, and fine-tune the horizontal alignment or gaps between toolbar elements by specifying numeric pixel measurements for spacer width.
</div>

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


<div class="meta-api-description">
Control the placement or anchoring of the app bar along the vertical axis of a page or screen, enabling developers to set or configure it to stick or float at the top, bottom, or have no fixed position at all; adjust where the navigation or header bar appears during layout initialization for flexible UI design, including options to position it at the upper edge, lower edge, or leave it unanchored without applying specific positioning styles.
</div>

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


<div class="meta-api-description">
Customize header or navigation bar placement by setting its layout behavior to flow naturally within page content, adhere persistently to the top or bottom edges while scrolling, or remain fixed relative to the viewport regardless of page scroll. Control whether the app header participates in regular document flow, enables sticky positioning to stay visible at specified edges during scrolling, or uses fixed positioning to maintain constant visibility independent of page movement. Configure the bar to be static within the flow, sticky for edge attachment, or fixed for viewport anchoring, ensuring flexible control over how the top or bottom navigation bar behaves during user interaction and scrolling. Adjust position modes to manage header layout dynamics, fixed positioning, sticky behavior, or standard in-flow placement, optimizing navigation visibility and page structure.
</div>

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


<div class="meta-api-description">
Detect and handle browser window size changes with events triggered on resize, enabling dynamic updates, responsive layouts, viewport adjustments, element repositioning, layout recalculations, and state refreshes whenever the window dimensions change, supporting custom reactions, adaptive UI behaviors, and reflows for components sensitive to viewport resizing.
</div>

#### Event Data

##### e.sender `kendo.ui.AppBar`

The widget instance.

#### Example - subscribe to resize event
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        positionMode: "sticky",
        resize: function () {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
