---
title: FloatingToolBar
description: Configuration, methods and events of the Kendo UI FloatingToolBar
res_type: api
component: floatingtoolbar
---

# kendo.ui.FloatingToolBar

Represents the Kendo UI FloatingToolBar widget. Inherits from [Widget](/api/ui/widget).

The FloatingToolBar hosts a [ToolBar](/api/ui/toolbar) inside a floating, positionable, and optionally draggable container. It can be anchored to a target element, or freely positioned within its container.

## Configuration

### items `Array` *(default: [])*

A JavaScript array that contains the configuration of the commands rendered inside the hosted [ToolBar](/api/ui/toolbar). The item configuration is identical to the ToolBar `items` configuration and supports buttons, toggle buttons, button groups, split buttons, separators, spacers, and templates.

> For more information regarding supported commands and their configuration properties check the [ToolBar `items` API](/api/ui/toolbar/configuration/items) and the [Getting Started topic](/web/toolbar/overview#command-types).


<div class="meta-api-description">
Configure the set of buttons, toggle buttons, button groups, split buttons, separators, spacers, or custom templates rendered inside a floating, draggable, or anchored toolbar by supplying an array of command configuration objects, controlling order, text, icons, click handlers, grouping, and toggle state of the floating action bar's contents, enabling customization of which commands appear, how they are grouped or separated, and how custom markup or controls are injected into a positionable overlay toolbar during initialization or at runtime.
</div>

#### Example - initialize the FloatingToolBar with buttons, a toggle button and a separator

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      items: [
        { type: "button", text: "Bold", icon: "bold" },
        { type: "button", text: "Italic", icon: "italic", togglable: true },
        { type: "separator" },
        { type: "button", text: "Underline", icon: "underline" },
        { type: "spacer" },
        { type: "button", text: "More" }
      ]
    });
    </script>

### visible `Boolean` *(default: false)*

Specifies whether the FloatingToolBar is shown initially, upon widget initialization.


<div class="meta-api-description">
Control whether a floating toolbar appears immediately when the page loads or component initializes, enabling developers to configure the initial visible or hidden state of a floating action bar without calling show or hide methods manually, useful when setting up a toolbar that should be displayed by default, toggling initial visibility during setup, controlling startup appearance, deciding if the floating controls render open or closed on first render, and initializing the widget already shown or invisible based on configuration rather than runtime method calls.
</div>

#### Example - show the FloatingToolBar on initialization

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### anchor `String|Element|jQuery` *(default: undefined)*

Specifies the target element the FloatingToolBar is anchored to. When set, the widget operates in **Anchored** mode and positions itself relative to the specified target based on the [`position`](/api/ui/floatingtoolbar/configuration/position) option. When left unset, the widget operates in **Free-position** mode and is positioned based on the [`containerAlign`](/api/ui/floatingtoolbar/configuration/containeralign) and [`margin`](/api/ui/floatingtoolbar/configuration/margin) options.


<div class="meta-api-description">
Attach or dock a floating toolbar next to a specific element, button, selection, or region on the page by specifying a CSS selector, DOM element, or jQuery object as the anchor target, switching the toolbar from free, manually positioned placement to an anchored mode where it automatically follows and aligns relative to that target using configured side or edge positioning; useful for pinning contextual controls near selected text, images, table cells, or any UI element, controlling whether the toolbar tracks a target versus floats independently, and enabling dynamic re-anchoring by changing the target at runtime.
</div>

#### Example - anchor the FloatingToolBar to a target element

    <div id="target" style="width: 200px; height: 100px; border: 1px solid #ccc; margin: 100px;">Target element</div>
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      anchor: "#target",
      position: "top",
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### position `String` *(default: "top")*

Specifies the side of the anchor target the FloatingToolBar is positioned at when the [`anchor`](/api/ui/floatingtoolbar/configuration/anchor) option is set. This option is ignored in Free-position mode. The supported values are:

* `"top"` — positions the toolbar above the anchor target.
* `"bottom"` — positions the toolbar below the anchor target.
* `"left"` — positions the toolbar to the left of the anchor target.
* `"right"` — positions the toolbar to the right of the anchor target.


<div class="meta-api-description">
Set or control where a floating toolbar appears relative to its anchored target element, choosing to place it above, below, to the left, or to the right of the anchor, useful for configuring contextual toolbars, floating menus, or annotation controls that need to dock on a specific side of a button, selection, or reference element; this setting only takes effect when an anchor target is configured and has no impact when the toolbar is freely positioned, enabling developers to align, orient, or reposition floating UI controls around a target element on any of the four cardinal sides.
</div>

#### Example - position the FloatingToolBar below the anchor target

    <div id="target" style="width: 200px; height: 100px; border: 1px solid #ccc; margin: 100px;">Target element</div>
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      anchor: "#target",
      position: "bottom",
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### overflow `Object`

Configures the overflow behavior of the hosted [ToolBar](/api/ui/toolbar). The configuration is forwarded verbatim to the hosted ToolBar instance.


<div class="meta-api-description">
Configure how extra or overflowing commands within a floating, positionable toolbar are handled when there is not enough space to display them all, controlling whether hidden items collapse into a dropdown menu, become horizontally scrollable, group into collapsible sections, or are simply cut off; set up scroll buttons, their visibility and placement, and the scroll distance for a scrollable floating toolbar, enabling responsive and adaptive layouts for toolbars that host many buttons, toggle buttons, or custom commands inside a floating container.
</div>

#### Example - customize the overflow settings of the hosted ToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      overflow: {
        mode: "scroll",
        scrollButtons: "visible",
        scrollButtonsPosition: "split",
        scrollDistance: 100
      },
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" },
        { type: "button", text: "Button 3" },
        { type: "button", text: "Button 4" },
        { type: "button", text: "Button 5" },
        { type: "button", text: "Button 6" }
      ]
    });
    </script>

### overflow.mode `String` *(default: "menu")*

Defines the overflow mode of the hosted ToolBar. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


<div class="meta-api-description">
Configure how a floating toolbar handles commands that do not fit within the available width, choosing whether overflowing buttons collapse into a dropdown menu, remain reachable through horizontal scrolling, are grouped into collapsible sections, or are left unmanaged and potentially clipped; control and set the overflow strategy for a positionable, anchored, or freely placed toolbar to manage limited space, adapt to small containers, and decide how hidden or extra commands become accessible to users.
</div>

#### Example - set overflow mode to scroll

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      overflow: {
        mode: "scroll"
      },
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" },
        { type: "button", text: "Button 3" }
      ]
    });
    </script>

### overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `overflow.mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
Control the display and visibility of scroll navigation arrows in a floating toolbar with scrollable overflow content, configuring whether scroll buttons appear automatically only when items overflow and scrolling is possible, remain permanently visible at all times regardless of content length, or stay hidden entirely for a cleaner floating toolbar appearance, enabling developers to set up adaptive, always-on, or button-free scrolling navigation for toolbars with limited space and overflowing commands.
</div>

#### Example - always show scroll buttons

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      overflow: {
        mode: "scroll",
        scrollButtons: "visible"
      },
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" },
        { type: "button", text: "Button 3" }
      ]
    });
    </script>

### overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of the scroll buttons of the hosted ToolBar. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
Position or align the scroll navigation buttons of a floating, scrollable toolbar by choosing to place them split across both the start and end edges, only at the beginning, or only at the end of the overflow area, enabling control over where users click to reveal hidden or overflowing toolbar commands, adjusting scroll control placement for better ergonomics, layout consistency, or UI design preferences in a floating toolbar with scrollable overflow content.
</div>

#### Example - position scroll buttons at the end

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      overflow: {
        mode: "scroll",
        scrollButtonsPosition: "end"
      },
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" },
        { type: "button", text: "Button 3" }
      ]
    });
    </script>

### overflow.scrollDistance `Number` *(default: 200)*

Specifies the distance, in pixels, the hosted ToolBar scrolls when a scroll button is clicked.


<div class="meta-api-description">
Adjust or configure how many pixels a floating toolbar shifts horizontally each time a scroll navigation button is clicked, controlling the scroll step size, increment, or distance for overflow content within a scrollable toolbar, useful when fine-tuning the speed or granularity of scrolling through hidden or overflowing commands, buttons, or controls in a floating, anchored, or draggable toolbar interface.
</div>

#### Example - set a custom scroll distance

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      overflow: {
        mode: "scroll",
        scrollDistance: 50
      },
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" },
        { type: "button", text: "Button 3" }
      ]
    });
    </script>

### draggable `Boolean` *(default: false)*

Specifies whether the FloatingToolBar can be repositioned by the user through pointer dragging or keyboard-driven Move mode. When enabled, a drag handle is rendered inside the widget and the movement is clamped to remain within the browser viewport.


<div class="meta-api-description">
Enable or configure a movable, repositionable floating toolbar that users can drag with a pointer or move using keyboard shortcuts, adding a visible drag handle for manual repositioning while keeping the toolbar constrained within the visible browser viewport; useful for allowing end users to relocate a floating action bar, toolbar, or control panel by mouse, touch, or keyboard navigation, controlling whether the widget supports free dragging, click-and-drag repositioning, or accessible keyboard-based movement, and ensuring the toolbar cannot be dragged off-screen.
</div>

#### Example - enable dragging of the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### size `String` *(default: undefined)*

Controls the overall physical size of the hosted ToolBar and its items. When `undefined` (the default), the theme resolves the size to `"medium"`. Valid values are `"small"`, `"medium"`, and `"large"`.


<div class="meta-api-description">
Adjust or configure the overall physical scale, dimensions, and visual density of a floating toolbar and its buttons, choosing between compact, standard, or larger control sizing to fit different layouts, screen densities, or touch-target requirements; set or control the toolbar footprint using small, medium, or large size presets, letting the theme fall back to a default medium size when left unset, useful for customizing button spacing, padding, and overall toolbar prominence in responsive or high-density interfaces.
</div>

#### Example - set the size of the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      size: "large",
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" }
      ]
    });
    </script>

### fillMode `String` *(default: undefined)*

Controls the way the color is applied to the hosted ToolBar and its items. When `undefined` (the default), the theme resolves the fill mode to `"solid"`. Valid values are `"solid"`, `"outline"`, and `"flat"`.


<div class="meta-api-description">
Configure or change how background color and borders are rendered on a floating toolbar's buttons and controls, choosing between solid filled backgrounds, outlined borders with transparent backgrounds, or flat minimal styling without borders or shading, letting developers control visual emphasis, theme appearance, and styling mode of floating toolbar items, set or override the default fill style, switch between solid, outline, and flat presentation modes for buttons and controls inside a floating, positionable toolbar component.
</div>

#### Example - set the fill mode of the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      fillMode: "outline",
      items: [
        { type: "button", text: "Button 1" },
        { type: "button", text: "Button 2" }
      ]
    });
    </script>

### ariaLabel `String` *(default: undefined)*

Specifies the `aria-label` attribute applied to the hosted ToolBar element, overriding the ToolBar's own default `"Toolbar"` label. Use this option to provide an accessible name that describes the purpose of the floating toolbar to assistive technologies.


<div class="meta-api-description">
Configure or set an accessible name, aria-label, or screen-reader description for a floating toolbar so assistive technologies announce a meaningful label instead of the default generic toolbar text, enabling developers to customize accessibility labeling, improve ARIA compliance, describe the toolbar's purpose for screen readers, override default accessible names, and ensure users relying on assistive technology understand what the floating toolbar controls or represents.
</div>

#### Example - set a custom aria-label

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      ariaLabel: "Text formatting toolbar",
      items: [
        { type: "button", text: "Bold" }
      ]
    });
    </script>

### containerAlign `Object` *(default: { horizontal: "center", vertical: "top" })*

Specifies the alignment of the FloatingToolBar relative to its positioned container when the [`anchor`](/api/ui/floatingtoolbar/configuration/anchor) option is **not** set (Free-position mode). This option is ignored when `anchor` is set.


<div class="meta-api-description">
Control how a floating toolbar aligns itself within its parent or positioned container when it is not anchored to a specific target, configuring its horizontal placement such as left, center, or right and its vertical placement such as top, center, or bottom, useful for setting default free-floating positioning, centering the toolbar at the top of its container, aligning it to a corner, or customizing the resting position of a movable toolbar before any anchor point is configured; this alignment setting has no effect once an anchor target is specified.
</div>

#### Example - align the FloatingToolBar to the bottom-right of its container

    <div id="container" style="position: relative; width: 400px; height: 200px; border: 1px solid #ccc;"></div>
    <script>
    $("#container").append("<div id='toolbar'></div>");
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      containerAlign: {
        horizontal: "right",
        vertical: "bottom"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### containerAlign.horizontal `String` *(default: "center")*

Specifies the horizontal alignment of the FloatingToolBar within its container in Free-position mode. Valid values are `"left"`, `"center"`, and `"right"`.


<div class="meta-api-description">
Control or configure the horizontal placement of a floating toolbar within its parent container when it is freely positioned rather than anchored, aligning it to the left edge, centering it, or aligning it to the right edge of the containing element; useful for setting up default toolbar positioning, adjusting where a floating action bar rests horizontally inside its wrapper, and customizing left, center, or right alignment for a non-anchored floating toolbar layout.
</div>

#### Example - align the FloatingToolBar horizontally to the left

    <div id="container" style="position: relative; width: 400px; height: 200px; border: 1px solid #ccc;"></div>
    <script>
    $("#container").append("<div id='toolbar'></div>");
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      containerAlign: {
        horizontal: "left"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### containerAlign.vertical `String` *(default: "top")*

Specifies the vertical alignment of the FloatingToolBar within its container in Free-position mode. Valid values are `"top"`, `"center"`, and `"bottom"`.


<div class="meta-api-description">
Control or configure the vertical placement of a floating toolbar within its parent container when the toolbar is not anchored to a specific element, choosing to align it near the top, vertically centered, or at the bottom of the containing area; useful for setting up default free-floating positioning, adjusting where the toolbar rests inside its wrapper on the vertical axis, and customizing top, middle, or bottom alignment for a non-anchored floating toolbar layout.
</div>

#### Example - align the FloatingToolBar vertically to the bottom

    <div id="container" style="position: relative; width: 400px; height: 200px; border: 1px solid #ccc;"></div>
    <script>
    $("#container").append("<div id='toolbar'></div>");
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      containerAlign: {
        vertical: "bottom"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### margin `Object` *(default: { horizontal: 0, vertical: 0 })*

Specifies an additional offset, in pixels, applied to the FloatingToolBar position. The margin is applied in both Anchored and Free-position modes.


<div class="meta-api-description">
Adjust or fine-tune the spacing, gap, or offset between a floating toolbar and its anchor point or reference edge by configuring horizontal and vertical pixel margins, useful for nudging the toolbar's placement away from an anchored element or container boundary in both anchored and freely positioned modes, controlling extra distance, padding, or buffer space around the floating toolbar regardless of positioning mode, and customizing exact pixel-based offsets to prevent the toolbar from overlapping content or sitting flush against its target.
</div>

#### Example - apply a margin to the FloatingToolBar position

    <div id="target" style="width: 200px; height: 100px; border: 1px solid #ccc; margin: 100px;">Target element</div>
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      anchor: "#target",
      position: "top",
      visible: true,
      margin: {
        horizontal: 10,
        vertical: 20
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### margin.horizontal `Number` *(default: 0)*

Specifies the horizontal offset, in pixels, applied to the FloatingToolBar position.


<div class="meta-api-description">
Adjust or configure the horizontal pixel offset, spacing, or gap applied to a floating toolbar's position, controlling how far left or right the toolbar shifts from its anchor point or calculated placement, useful for fine-tuning toolbar alignment, nudging position along the x-axis, setting custom horizontal margins or padding for a floating control bar, and correcting overlap or spacing issues in both anchored and free-floating positioning modes.
</div>

#### Example - set a horizontal margin

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      margin: {
        horizontal: 30
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### margin.vertical `Number` *(default: 0)*

Specifies the vertical offset, in pixels, applied to the FloatingToolBar position.


<div class="meta-api-description">
Adjust or configure the vertical pixel offset, spacing, or gap applied to a floating toolbar's position, controlling how far up or down the toolbar shifts from its anchor point or calculated placement, useful for fine-tuning toolbar alignment, nudging position along the y-axis, setting custom vertical margins or padding for a floating control bar, and correcting overlap or spacing issues in both anchored and free-floating positioning modes.
</div>

#### Example - set a vertical margin

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      margin: {
        vertical: 30
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### messages `Object`

Specifies the localizable messages of the FloatingToolBar.


<div class="meta-api-description">
Customize, translate, or localize the text and accessible labels used within a floating toolbar, such as the drag handle instructions or other user-facing strings, to support internationalization, multiple languages, custom wording, or accessibility requirements, enabling configuration of displayed messages and labels for different locales or branding needs.
</div>

#### Example - customize the messages of the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      messages: {
        dragHandle: "Drag to move the toolbar"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### messages.dragHandle `String` *(default: "Drag to reposition")*

Specifies the text used as the `aria-label` of the drag handle, rendered when [`draggable`](/api/ui/floatingtoolbar/configuration/draggable) is set to `true`.


<div class="meta-api-description">
Customize or translate the accessible label, screen reader text, or tooltip announced for the drag handle control used to reposition a floating toolbar, configuring the aria-label string read by assistive technology when the toolbar is draggable, enabling localization, internationalization, or custom wording for the move/reposition handle's accessible name so screen reader users understand its purpose when dragging is enabled.
</div>

#### Example - set a custom drag handle label

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      messages: {
        dragHandle: "Move toolbar"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### messages.movedUp `String` *(default: "Moved up")*

Specifies the text announced through the live region when the FloatingToolBar is moved up with the keyboard, while [`draggable`](/api/ui/floatingtoolbar/configuration/draggable) is set to `true`.


<div class="meta-api-description">
Customize or translate the screen reader announcement, live region text, or assistive technology feedback spoken when a floating toolbar is repositioned upward using keyboard navigation, enabling localization, internationalization, or custom wording for the upward movement confirmation message so screen reader users receive accurate feedback during keyboard-driven dragging.
</div>

#### Example - set a custom "moved up" announcement

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      messages: {
        movedUp: "Toolbar moved up"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### messages.movedDown `String` *(default: "Moved down")*

Specifies the text announced through the live region when the FloatingToolBar is moved down with the keyboard, while [`draggable`](/api/ui/floatingtoolbar/configuration/draggable) is set to `true`.


<div class="meta-api-description">
Customize or translate the screen reader announcement, live region text, or assistive technology feedback spoken when a floating toolbar is repositioned downward using keyboard navigation, enabling localization, internationalization, or custom wording for the downward movement confirmation message so screen reader users receive accurate feedback during keyboard-driven dragging.
</div>

#### Example - set a custom "moved down" announcement

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      messages: {
        movedDown: "Toolbar moved down"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### messages.movedLeft `String` *(default: "Moved left")*

Specifies the text announced through the live region when the FloatingToolBar is moved left with the keyboard, while [`draggable`](/api/ui/floatingtoolbar/configuration/draggable) is set to `true`.


<div class="meta-api-description">
Customize or translate the screen reader announcement, live region text, or assistive technology feedback spoken when a floating toolbar is repositioned to the left using keyboard navigation, enabling localization, internationalization, or custom wording for the leftward movement confirmation message so screen reader users receive accurate feedback during keyboard-driven dragging.
</div>

#### Example - set a custom "moved left" announcement

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      messages: {
        movedLeft: "Toolbar moved left"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

### messages.movedRight `String` *(default: "Moved right")*

Specifies the text announced through the live region when the FloatingToolBar is moved right with the keyboard, while [`draggable`](/api/ui/floatingtoolbar/configuration/draggable) is set to `true`.


<div class="meta-api-description">
Customize or translate the screen reader announcement, live region text, or assistive technology feedback spoken when a floating toolbar is repositioned to the right using keyboard navigation, enabling localization, internationalization, or custom wording for the rightward movement confirmation message so screen reader users receive accurate feedback during keyboard-driven dragging.
</div>

#### Example - set a custom "moved right" announcement

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      draggable: true,
      messages: {
        movedRight: "Toolbar moved right"
      },
      items: [
        { type: "button", text: "Button" }
      ]
    });
    </script>

## Methods

### destroy

Prepares the FloatingToolBar for safe removal from the DOM. Detaches all event handlers, destroys the internally hosted ToolBar, Popup, and Draggable (when created), and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the widget element from the DOM.

<div class="meta-api-description">
How do I safely remove a Kendo UI FloatingToolBar from my page? Clean up or dispose of floating toolbar resources by detaching event listeners, destroying the internally hosted toolbar, popup, and drag behavior, and clearing internal data attributes to prevent memory leaks, without removing the widget element itself from the DOM. Use this method to safely release event handlers, reset associated data, and finalize the lifecycle of a dynamic floating toolbar prior to DOM removal or component replacement, ensuring efficient memory management and avoiding orphaned event bindings in web applications.
</div>

#### Example

    <div id="floatingtoolbar"></div>

    <script>
        var floatingToolBar = $('#floatingtoolbar').kendoFloatingToolBar({
            items: [
                { type: 'button', text: 'Copy' }
            ]
        }).getKendoFloatingToolBar();

        floatingToolBar.destroy();
    </script>

### show

Shows the FloatingToolBar. When called without arguments, the widget shows using its current configuration — positioned relative to the [`anchor`](/api/ui/floatingtoolbar/configuration/anchor) target if set, or otherwise based on the [`containerAlign`](/api/ui/floatingtoolbar/configuration/containeralign) and [`margin`](/api/ui/floatingtoolbar/configuration/margin) options.


<div class="meta-api-description">
Programmatically display, reveal, open, or toggle the visibility of a floating toolbar at runtime, showing it relative to a previously configured anchor element or according to its default container alignment and margin settings, useful for controlling when a floating action bar appears in response to user interactions, application state changes, conditional logic, or events rather than showing it automatically on load, and for triggering the toolbar to appear using its existing configuration without needing to specify a new anchor or explicit coordinates each time.
</div>

#### Parameters

##### arg `String|Element|jQuery|Object` *(optional)*

If a `String`, `Element`, or `jQuery` object is passed, it is used as the anchor target for this call and the widget shows in **Anchored** mode against that target. If an `Object` with `top` and/or `left` `Number` properties is passed, the widget shows in **Free-position** mode at the specified coordinates, overriding the `containerAlign` and `margin` options for this call.

#### Example - show the FloatingToolBar using its current configuration

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.show();
    </script>

#### Example - show the FloatingToolBar anchored to a target

    <div id="target" style="width: 200px; height: 100px; border: 1px solid #ccc; margin: 100px;">Target element</div>
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.show("#target");
    </script>

#### Example - show the FloatingToolBar at explicit coordinates

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.show({ top: 50, left: 100 });
    </script>

### hide

Hides the FloatingToolBar. If the widget held the focus at the time of hiding, the focus is restored to the element that was previously focused before the widget was shown.


<div class="meta-api-description">
Programmatically close, dismiss, or hide a floating toolbar at runtime, triggering it to disappear after a user action, timeout, or workflow step completes while automatically restoring keyboard focus back to whichever element held focus before the toolbar was shown, useful for controlling toolbar visibility dynamically, managing focus restoration for accessibility, hiding contextual controls after actions are performed, and ensuring smooth keyboard navigation flows when dismissing on-screen floating panels or toolbars.
</div>

#### Example - hide the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.hide();
    </script>

### setPosition

Moves the FloatingToolBar to the specified coordinates while in **Free-position** mode. When [`draggable`](/api/ui/floatingtoolbar/configuration/draggable) is set to `true`, the resulting position is clamped to remain within the browser viewport.


<div class="meta-api-description">
Programmatically move, reposition, or set the exact top and left pixel coordinates of a floating toolbar that is not anchored to a target element, useful for placing the toolbar at custom locations on screen, syncing its position with drag gestures, cursor location, or other UI elements, and automatically constraining or clamping the toolbar so it stays within the visible viewport bounds when the draggable option is enabled, enabling dynamic runtime positioning control beyond the initial container alignment or margin configuration.
</div>

#### Parameters

##### position `Object`

The object specifying the new coordinates of the FloatingToolBar.

##### position.top `Number`

The new top offset, in pixels.

##### position.left `Number`

The new left offset, in pixels.

#### Example - reposition the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.setPosition({ top: 80, left: 120 });
    </script>

### setAnchor

Re-targets an **Anchored** FloatingToolBar to a new target element and re-runs the collision handling to keep the widget within the viewport.


<div class="meta-api-description">
Dynamically move or re-anchor a floating toolbar to a different target element at runtime, switching which element the toolbar tracks and re-triggering collision detection and viewport boundary adjustments so the toolbar repositions correctly, useful when the anchor point changes due to selection changes, focus shifts, dynamic content updates, or user interactions requiring the floating toolbar to follow a new reference element while remaining visible and properly aligned on screen.
</div>

#### Parameters

##### target `String|Element|jQuery` *(optional)*

The new anchor target of the FloatingToolBar. If omitted, the current anchor is cleared and the widget returns to container positioning.

#### Example - re-anchor the FloatingToolBar to a new target

    <div id="target1" style="width: 150px; height: 80px; border: 1px solid #ccc; margin: 50px;">Target 1</div>
    <div id="target2" style="width: 150px; height: 80px; border: 1px solid #ccc; margin: 50px;">Target 2</div>
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      anchor: "#target1",
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.setAnchor("#target2");
    </script>

### focus

Moves the focus into the hosted [ToolBar](/api/ui/toolbar), at its current roving-tabindex position.


<div class="meta-api-description">
Programmatically set or move keyboard focus into a floating toolbar's currently active or last-focused button, control which toolbar item receives focus using roving tabindex behavior, enable keyboard navigation and accessibility by focusing the toolbar without requiring a mouse click, restore or shift input focus to the toolbar after showing it or performing an action, and manage focus state for screen reader and keyboard-only users interacting with a floating, positionable toolbar widget.
</div>

#### Example - focus the FloatingToolBar

    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoFloatingToolBar({
      visible: true,
      items: [
        { type: "button", text: "Button" }
      ]
    });
    var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
    floatingToolBar.focus();
    </script>

## Events

### show

Fired when the FloatingToolBar transitions from hidden to visible as a result of a successful [`show`](/api/ui/floatingtoolbar/methods/show) call. The event is cancelable — calling `e.preventDefault()` prevents the toolbar from becoming visible. A `show` call made while the toolbar is already visible (for example, calling `show()` only to retarget or reposition an open toolbar) does not fire this event, since no Hidden/Visible transition occurs.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to the moment a floating toolbar actually becomes visible, whether triggered by calling the show method while the toolbar was hidden, enabling developers to run custom logic, update UI elements, synchronize application state, or block the toolbar from appearing entirely by preventing the default behavior, while ignoring redundant show calls made on an already-visible toolbar.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked, prevents the FloatingToolBar from becoming visible.

##### e.sender `kendo.ui.FloatingToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "show" event during initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        items: [
          { type: "button", text: "Button" }
        ],
        show: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("shown");
        }
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.show();
    </script>

#### Example - subscribe to the "show" event after initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        items: [
          { type: "button", text: "Button" }
        ]
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.bind("show", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("shown");
      });
      floatingToolBar.show();
    </script>

### hide

Fired when the FloatingToolBar transitions from visible to hidden as a result of a successful [`hide`](/api/ui/floatingtoolbar/methods/hide) call. The event is cancelable — calling `e.preventDefault()` prevents the toolbar from becoming hidden. A `hide` call made while the toolbar is already hidden does not fire this event, since no Hidden/Visible transition occurs.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to the moment a floating toolbar actually becomes hidden, whether triggered by calling the hide method while the toolbar was visible, enabling developers to run custom logic, update UI elements, synchronize application state, or block the toolbar from disappearing entirely by preventing the default behavior, while ignoring redundant hide calls made on an already-hidden toolbar.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked, prevents the FloatingToolBar from becoming hidden.

##### e.sender `kendo.ui.FloatingToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "hide" event during initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        items: [
          { type: "button", text: "Button" }
        ],
        hide: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("hidden");
        }
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.hide();
    </script>

#### Example - subscribe to the "hide" event after initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        items: [
          { type: "button", text: "Button" }
        ]
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.bind("hide", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("hidden");
      });
      floatingToolBar.hide();
    </script>

### dragStart

Fired when the user starts repositioning the FloatingToolBar, either by starting a pointer drag or by entering keyboard-driven Move mode. The event is cancelable — calling `e.preventDefault()` prevents the drag or Move mode from starting.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to the moment a user begins dragging or moving a floating toolbar, whether initiated through mouse/pointer drag or keyboard-based move mode, to run custom logic before repositioning starts, validate or restrict movement, block or cancel the drag operation entirely by preventing the default behavior, track the toolbar's starting top and left coordinates, implement custom drag constraints, log or analyze when users begin repositioning a floating UI element, and control whether dragging or keyboard move mode is allowed to proceed based on application state or business rules.
</div>

#### Event Data

##### e.top `Number`

The current top offset of the FloatingToolBar, in pixels.

##### e.left `Number`

The current left offset of the FloatingToolBar, in pixels.

##### e.preventDefault `Function`

If invoked, prevents the drag operation or keyboard Move mode from starting.

##### e.sender `kendo.ui.FloatingToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "dragStart" event during initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        draggable: true,
        items: [
          { type: "button", text: "Button" }
        ],
        dragStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.top, e.left);
        }
      });
    </script>

#### Example - subscribe to the "dragStart" event after initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        draggable: true,
        items: [
          { type: "button", text: "Button" }
        ]
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.bind("dragStart", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.top, e.left);
      });
    </script>

### move

Fired when the position of the FloatingToolBar changes as a result of a pointer drag, keyboard-driven Move mode, or a call to the [`setPosition`](/api/ui/floatingtoolbar/methods/setposition) method.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Track and respond to real-time position changes of a floating toolbar as it is dragged, repositioned via keyboard controls, or moved programmatically through a positioning method, enabling developers to capture updated top and left coordinates during dragging, moving, or repositioning actions, synchronize UI elements, persist the toolbar's location, constrain or validate movement in real time, log positional changes as they occur, and hook into continuous move notifications while a floating panel is being relocated by user interaction or code.
</div>

#### Event Data

##### e.top `Number`

The new top offset of the FloatingToolBar, in pixels.

##### e.left `Number`

The new left offset of the FloatingToolBar, in pixels.

##### e.sender `kendo.ui.FloatingToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "move" event during initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        draggable: true,
        items: [
          { type: "button", text: "Button" }
        ],
        move: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.top, e.left);
        }
      });
    </script>

#### Example - subscribe to the "move" event after initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        items: [
          { type: "button", text: "Button" }
        ]
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.bind("move", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.top, e.left);
      });
      floatingToolBar.setPosition({ top: 60, left: 90 });
    </script>

### dragEnd

Fired when the user finishes repositioning the FloatingToolBar, either by ending a pointer drag or by committing or canceling keyboard-driven Move mode.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to the completion of a drag-and-drop or keyboard-driven repositioning action on a floating toolbar, whether the user finishes dragging with the pointer or commits or cancels a keyboard move operation, to capture the final top and left position, persist the new toolbar location, trigger layout updates, save the last known coordinates after the toolbar stops moving, run cleanup or confirmation logic once repositioning ends, and handle both successful drag completion and canceled keyboard moves consistently.
</div>

#### Event Data

##### e.top `Number`

The top offset of the FloatingToolBar at the end of the drag or Move mode operation, in pixels.

##### e.left `Number`

The left offset of the FloatingToolBar at the end of the drag or Move mode operation, in pixels.

##### e.sender `kendo.ui.FloatingToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "dragEnd" event during initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        draggable: true,
        items: [
          { type: "button", text: "Button" }
        ],
        dragEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.top, e.left);
        }
      });
    </script>

#### Example - subscribe to the "dragEnd" event after initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        draggable: true,
        items: [
          { type: "button", text: "Button" }
        ]
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.bind("dragEnd", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.top, e.left);
      });
    </script>

### kendoKeydown

Triggered when the user presses a keyboard key while the FloatingToolBar is focused.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
How do I handle keyboard events in Kendo UI FloatingToolBar? Capture and intercept keydown events fired while the FloatingToolBar is focused, enabling custom keyboard navigation, overriding default key behaviors, preventing built-in keydown logic with the preventKendoKeydown flag, canceling native browser actions via preventDefault, and implementing custom keyboard shortcuts or accessibility enhancements within the FloatingToolBar component.
</div>

#### Event Data

##### e.sender `kendo.ui.FloatingToolBar`

The widget instance which fired the event.

##### e.preventKendoKeydown `Boolean`

If set to `true` prevents the default FloatingToolBar keydown logic.

##### e.preventDefault `Function`

If invoked cancels the default action that belongs to the keydown event.

#### Example - subscribe to the "kendoKeydown" event during initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        items: [
          { type: "button", text: "Button" }
        ],
        kendoKeydown: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.keyCode);
        }
      });
    </script>

#### Example - subscribe to the "kendoKeydown" event after initialization

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoFloatingToolBar({
        visible: true,
        items: [
          { type: "button", text: "Button" }
        ]
      });
      var floatingToolBar = $("#toolbar").data("kendoFloatingToolBar");
      floatingToolBar.bind("kendoKeydown", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.keyCode);
      });
    </script>
