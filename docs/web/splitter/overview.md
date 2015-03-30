---
title: Overview
page_title: Summary of Splitter UI widget primary functions
description: Find out how to use the Splitter UI widget and achieve complex layouts.
---

# Splitter Overview

The **Splitter** provides a dynamic layout of resizable and collapsible panes. It converts the
children of an HTML element in to the interactive layout, adding resize and collapse handles based on
configuration. A **Splitter** can be mixed in a vertical or horizontal orientation to build
complex layouts.


## Getting Started

The layout and structure of a **Splitter** is defined within the DOM as a div with child elements.

### Create a div with children that will become panes

    <div id="splitter">
        <div>Area 1</div>
        <div>Area 2</div>
    </div>

Initialization of a **Splitter** should occur after the DOM is fully loaded. It is recommended
that initialization the **Splitter** occur within a handler is provided to $(document).ready().

### Initialize the Splitter using a selector within $(document).ready()

    $(document).ready(function() {
        $("#splitter").kendoSplitter();
    });

When the **Splitter** is initialized, a vertical split bar will be placed between the two div
elements. This bar can be moved by a user left and right to adjust the size on the panes.


## Configuring Splitter Behaviors

The **Splitter** has a default configuration specified during initialization. However, these
options may be overriden to control the following properties:


*   Maximum and/or minimum pane sizes
*   Resizable and collapsible/expandable pane behaviors
*   Orientation (horizontal or vertical)



The properties of a pane must be set during initialization and set for each individual pane in a
**Splitter**.

### Initialize a Splitter and the properties of its panes

    $("#splitter").kendoSplitter({
        panes: [
            { collapsible: true, min: "100px", max: "300px" },
            { collapsible: true }
        ],
        orientation: "vertical"
    });


## Nested Splitter Layouts

To achieve complex layouts, the **Splitter** supports nested layouts.

### Creating nested Splitter layout

    <div id="horizontalSplitter">
        <div><p>Left Side Pane Content</p></div>
        <div>
            <div id="verticalSplitter">
                <div><p>Right Side, Top Pane Content</p></div>
                <div><p>Right Side, Bottom Pane Content</p></div>
            </div>
        </div>
    </div>

### Initialize two Splitters with differing orientations

    $("#horizontalSplitter").kendoSplitter();
    $("#verticalSplitter").kendoSplitter({ orientation: "vertical" });

> Using the same DIV element for a Splitter pane and for a nested Splitter is not recommended.
Nested Splitters will be sized automatically to match the parent pane's height if the nested Splitter has 100% width and height styles.
We recommend using a nested Splitter, which is a direct child of the parent Splitter's pane.

## Loading Content with AJAX


While any valid technique for loading content via AJAX may be used, **Splitter** provides built-in
support for asynchronously loading content from URLs. These URLs should return HTML fragments that can be
loaded in the pane of a **Splitter**. If you want to load a whole page in an IFRAME, you may do so
by specifying the complete URL (i.e. http://telerik.com/).

### Loading Splitter content asynchronously

    <div id="splitter">
        <div>Area 1 with Static Content</div>
        <div></div>
        <div></div>
    </div>

### Initialize Splitter; configure async loading for one pane; and an iframe for a third pane

    $(document).ready(function() {
        $("#splitter").kendoSplitter({
            panes: [
                {},
                { contentUrl: "html-content-snippet.html" },
                { contentUrl: "http://telerik.com/" }
            ]
        });
    });

## Accessing an Existing Splitter

You can reference an existing **Splitter** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing Splitter instance

    var splitter = $("#splitter").data("kendoSplitter");

## Make the Splitter expand to 100% height

When making the Splitter 100% high, one should keep in mind that web standards require elements with percentage height to have a parent element with an explicit height.
In this case the parent of the Splitter is the `body`, so it receives a `height:100%` style, which in turn results in the `html` element obtaining the style as well. If the requirement is not met,
the Splitter's computed height will fallback to `auto` and the widget may collapse completely, depending ot its content. In addition, the Splitter should have its border removed. 100% high elements
cannot have borders, margins, paddings and sibling elements. In a nested Splitters scenario, the inner Splitters remove their borders automatically,
given that each Splitter is a direct child of a parent pane.

### HTML Markup

    <body>
      <div id="vertical">
        <div>
            <p>
                Outer splitter : top pane (resizable and collapsible)
            </p>
        </div>
        <div>
            <div id="horizontal">
                <div>
                    <p>
                        Inner splitter :: left pane
                    </p>
                </div>
                <div>
                        Inner splitter :: center pane
                </div>
                <div>
                    <p>
                        Inner splitter :: right pane
                    </p>
                </div>
            </div>
        </div>
        <div>
            <p>
                Outer splitter : bottom pane (non-resizable, non-collapsible)
            </p>
        </div>
    </div>

    </body>

### Javascript code

    $("#vertical").kendoSplitter({
        orientation: "vertical",
        panes: [
            { collapsible: true, size: "60px" },
            { collapsible: false },
            { collapsible: false, resizable: false, size: "10%" }
        ]
    });

    $("#horizontal").kendoSplitter({
        panes: [
            { collapsible: true, size: "100px" },
            { collapsible: false },
            { collapsible: true, size: "20%" }
        ]
    });

### CSS code

    html,
    body
    {
        height:100%;
        margin:0;
        padding:0;
        overflow:hidden;
    }

    #vertical,
    #horizontal
    {
        height:100%;
    }

    #vertical
    {
        border-width: 0;
    }

## Resizing a Splitter manually

The Splitter `div` can be resized manually by applying new width or height style with Javascript. Afterwards, the [`resize()`](/using-kendo-in-responsive-web-pages) method
should be executed, so that the widget readjusts its layout and pane sizes.

    var splitterElement = $("#SplitterID"),
        splitterObject = splitterElement.data("kendoSplitter");

    splitterElement.css({width: "800px", height: "600px" });
    splitterObject.resize();

    // for versions Q2 2013 SP1 and older use this instead:
    //splitterObject.trigger("resize");

If the Splitter layout needs readjusting, but the dimensions of the Splitter wrapper `<div>` have not changed, the `resize` method must be executed with a parameter in order to take effect.
This is useful when the Splitter has been initialized in an invisible container and the panes' dimensions and position have not been calculated correctly.

    splitterObject.resize(true);
    
On a side note, changing the pane sizes manually is not recommended. Use the [`size()`](/api/web/splitter#methods-size) method for that.

## Change pane settings after initialization

The Splitter pane settings (`collapsible` and `resizable`) can be changed with Javascript after the Splitter has been initialized. For example:

    $("#SplitterID").kendoSplitter({
        panes: [
            { collapsible: false, resizable: false, size: 100 },
            { }
        ]
    });

    var splitterObject = $("#SplitterID").data("kendoSplitter");

    splitterObject.options.panes[0].collapsible = true;
    splitterObject.options.panes[0].resizable = true;
    splitterObject.resize(true);

The `resize()` method of the Splitter causes the pane sizes to be recalculated, and the splitbars to be rendered with the current widget settings.

## Allow an element to overflow a Splitter pane

Splitter panes are either scrollable (have an `overflow:auto` style) or they clip overflowing content (have an `overflow:hidden` style). In either case, nothing is allowed to be displayed outside the pane boundaries.
This can be problematic in scenarios, which include Menus and other **non-detached** popups, which are rendered **inside** the pane (Most Kendo UI widgets, except the Menu, use detached popups, so there is no problem).

The solution is to disable pane content scrolling and clipping by enforcing an `overflow:visible` style to the Splitter pane `<div>`. In addition, the pane's stacking context must be raised by applying
a positive `z-index` style.

### Example

#### HTML

    <div id="splitter1">
        <div id="pane1">
            <ul id="menu1">
                <li>root menu item
                    <ul>
                        <!-- child menu items -->
                    </ul>
                </li>
            </ul>
        </div>
    </div>

#### CSS

    #pane1
    {
        overflow: visible;
        z-index: 2;
    }

If there are several nested Splitters, then **each** pane, which is an ancestor of the Menu, requires the specified `overflow` and `z-index` styles. These styles can also be applied inline instead of externally.