---
title: FloatingActionButton
description: Configuration, methods and events of the Kendo UI FloatingActionButton
res_type: api
component: floatingactionbutton
---

# kendo.ui.FloatingActionButton

Represents the Kendo UI FloatingActionButton widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration


### align `String` *(default: "bottom end")*

Specifies position of the FloatingActionButton relative to its container. Valid position options are:

* `"top start"`: positions the button at top left corner of the container.
* `"top center"`: positions the button at top center of the container.
* `"top end"`: positions the button at top right corner of the container.
* `"middle start"`: positions the button at middle left of the container.
* `"middle end"`: positions the button at middle right of the container.
* `"bottom start"`: positions the button at bottom left corner of the container.
* `"bottom center"`: positions the button at top center of the container.
* `"bottom end"`: positions the button at bottom right corner of the container.

`align` works in conjunction with [`positionMode`](/api/javascript/ui/floatingactionbutton/configuration/positionmode) and [`alignOffset`](/api/javascript/ui/floatingactionbutton/configuration/alignoffset).

**Note: when using `align`, make sure the FloatingActionButton container has [css position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `"static"` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).


<div class="meta-api-description">
Configure the position of a floating action button within its container by specifying alignment options that combine vertical and horizontal placement such as top left, top center, top right, middle left, middle right, bottom left, bottom center, or bottom right. Control and customize the button’s placement relative to its container boundaries, enabling developers to set alignment modes, adjust offsets, and manage positioning behavior for responsive layouts or design consistency. This includes positioning the button at various anchor points, enabling flexible UI placement, and ensuring proper container styling like non-static CSS positioning to support overflow and visible button placement in dynamic interface scenarios.
</div>

#### Example
    <div class="fab-container" style="position: relative;">
        <button id="fab-top-start">Top Start</button>
        <button id="fab-top-center">Top Center</button>
        <button id="fab-top-end">Top End</button>

        <button id="fab-middle-start">Middle Start</button>
        <button id="fab-middle-end">Middle End</button>

        <button id="fab-bottom-start">Bottom Start</button>
        <button id="fab-bottom-center">Bottom Center</button>
        <button id="fab-bottom-end">Bottom End</button>
    </div>

	<script>
        $('#fab-top-start').kendoFloatingActionButton({  align: 'top start' });
        $('#fab-top-center').kendoFloatingActionButton({  align: 'top center' });
        $('#fab-top-end').kendoFloatingActionButton({  align: 'top end' });
        $('#fab-middle-start').kendoFloatingActionButton({  align: 'middle start' });
        $('#fab-middle-end').kendoFloatingActionButton({  align: 'middle end' });
        $('#fab-bottom-start').kendoFloatingActionButton({  align: 'bottom start' });
        $('#fab-bottom-center').kendoFloatingActionButton({  align: 'bottom center' });
        $('#fab-bottom-end').kendoFloatingActionButton({  align: 'bottom end' });
    </script>

### alignOffset `Object` *(default: { x: 16, y: 16 })*

Specifies the horizontal and vertical offset of the FloatingActionButton.


<div class="meta-api-description">
Adjust or customize the horizontal and vertical position of a floating action button by setting offsets that shift, move, nudge, or align it relative to its anchor point, enabling precise control over placement, positioning tweaks, layout adjustments, and alignment fine-tuning for responsive or custom interface designs.
</div>

#### Example

    <button id="fab-top-start">Top Start</button>

	<script>
        $('#fab-top-start').kendoFloatingActionButton({
            align: 'top start',
            alignOffset: { x: 50, y: 50 }
        });
    </script>

### alignOffset.x `Number|String`

Specifies the initial horizontal offset of the FloatingActionButton. Numeric values are treated as pixels. String values can specify pixels, percentages, ems, or other valid values.


<div class="meta-api-description">
Control the horizontal positioning or initial x-offset of a floating action button by setting its left-right displacement relative to alignment points, enabling adjustment via numeric pixel values or CSS units such as percentages, ems, or other valid lengths to precisely shift the button horizontally. Customize the button’s left or right margin, offset from the aligned edge, or fine-tune its horizontal placement using configurable offsets expressed as pixels or flexible CSS measurements for consistent layout control across different screen sizes and designs. Adjust horizontal position, move along the x-axis, set left-right alignment offset, apply pixel-based or unit-based shifts, and manage floating action button placements in UI interfaces by specifying horizontal offset values in various CSS-compatible units.
</div>

#### Example

    <div id="fab"></div>
    <script>
    $("#fab").kendoFloatingActionButton({
        align: 'top start',
        alignOffset: {
            x: 100,
            y: 50
        }
    });
    </script>

### alignOffset.y `Number|String`

Specifies the initial vertical offset of the FloatingActionButton. Numeric values are treated as pixels. String values can specify pixels, percentages, ems or other valid values.


<div class="meta-api-description">
Adjust vertical positioning, vertical offset, or top-bottom alignment of a floating action button by configuring vertical offset values using pixels, percentages, em units, or CSS length expressions; control initial Y-axis placement to move the button up or down, set exact vertical displacement or alignment offsets, and enable responsive or pixel-perfect vertical adjustments for user interface elements that float or overlay content.
</div>

#### Example

    <div id="fab"></div>
    <script>
    $("#fab").kendoFloatingActionButton({
        align: 'bottom end',
        alignOffset: {
            x: 30,
            y: 80
        }
    });
    </script>

### enabled `Boolean` *(default: true)*

Specifies whether the FloatingActionButton is enabled (true) or disabled (false).


<div class="meta-api-description">
Set or toggle the interactivity of a floating action button, enabling or disabling user input, click response, touch feedback, and keyboard activation; control whether the button is active or inactive, responsive or ignored, configurable at runtime or initialization to enable click handling, touch events, focus, and accessibility interaction, or render it visually and functionally disabled to prevent any user engagement or input events.
</div>

#### Example

	<button id="fab-top-start">Top Start</button>

	<script>
        $('#fab-top-start').kendoFloatingActionButton({
            align: 'top start',
            enabled: false
        });
    </script>

### fillMode `String` *(default: 'solid')*

Controls how the color is applied to the button. Valid values are: `"solid"`, and `"none"`.


<div class="meta-api-description">
Configure how the button's color is rendered by choosing whether the background is fully filled with a solid color or left transparent with no fill applied, enabling control over the button's visual style, color application, fill behavior, background coloring options, and appearance customization for floating action buttons or similar UI elements.
</div>

#### Example

    <div id="fab-solid"></div>
    <div id="fab-none"></div>
    <script>
    $("#fab-solid").kendoFloatingActionButton({
        icon: "plus",
        fillMode: "solid"
    });
    
    $("#fab-none").kendoFloatingActionButton({
        icon: "plus",
        fillMode: "none"
    });
    </script>

### icon `String` *(default: "")*

Specifies the name for an existing icon in a Kendo UI theme that is rendered in the FloatingActionButton.

See [`the Web Font Icons help article`](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
Set, configure, or customize an icon within a floating action button using predefined theme icons or web font glyphs, allowing developers to display, embed, or render scalable vector icons inside action buttons, choose from a library of theme-compatible icons, control the button’s visual symbol, enable iconography for buttons, incorporate standard or custom icon names, and adjust the button’s icon representation based on theme web-font sets for consistent UI design and user interaction.
</div>

#### Example - display icon

	<button id="fab-icon"></button>

	<script>
        $('#fab-icon').kendoFloatingActionButton({
            align: 'top start',
            icon: 'plus'
        });
    </script>

### items `Array`

Specifies the speed-dial items that will be rendered in a popup container anchored to the FloatingActionButton.

**Note: when using the `items` configuration, clicking on the FloatingActionButton will open the popup containing the speed-dial list.


<div class="meta-api-description">
Configure a collection of interactive action entries, menu options, or quick-access buttons that appear as a popup or expandable list near the floating action toggle; control which shortcut items, speed-dial buttons, or contextual actions are displayed in the overlay triggered by clicking or tapping the floating action icon, enabling customization, dynamic management, and presentation of individual action elements within a popup menu or radial speed dial interface for fast user interactions and navigational shortcuts.
</div>

#### Example - define speed-dial items

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Save',
                icon: 'save',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('save action'); }
            }, {
                label: 'Print',
                icon: 'print',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }]
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Specifies whether the Item is enabled or not. By default all items are enabled.


<div class="meta-api-description">
Control the interactive state of a floating action button item by enabling or disabling its responsiveness to user input, including clicks, keyboard navigation, focus behavior, and accessibility interactions. Configure whether each item is active, inactive, selectable, or ignores user events, effectively toggling the item's availability for action or user engagement, and easily set individual button elements to a disabled or enabled mode to manage user interface behavior and event handling.
</div>

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Save',
                icon: 'save',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('save action'); }
            }, {
                label: 'Print',
                icon: 'print',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); },
                enabled: false
            }]
        });
    </script>

### items.click `Function` *(default: false)*

Specifies the click event handler of the speed-dial item.


<div class="meta-api-description">
handle click events for individual FloatingActionButton speed-dial items by assigning custom JavaScript functions or callbacks triggered upon user taps or activations, enabling developers to configure event handlers, manage action responses, bind inline or external functions, detect item selections, and execute specific logic when speed-dial menu entries are clicked or interacted with within dynamic button arrays or interactive UI components.
</div>

#### Example

    <button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Download',
                icon: 'download',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('download action'); }
            }]
        });
    </script>

### items.cssClass `String`

Specifies a set of CSS classes for the speed-dial item.


<div class="meta-api-description">
Assign custom CSS classes or one or multiple class names to individual speed-dial or floating action button entries to control styling, animations, theming, or specific visual behavior. Enable targeted customization of particular buttons or menu items by applying unique selectors or class identifiers for fine-grained control over appearance and interactive effects. Set or configure style overrides, additional styles, or class-based decorations directly on separate action button items within a floating menu component to enhance UI consistency or visual differentiation among items.
</div>

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                label: 'Download',
                icon: 'download',
                cssClass: 'fab-download-action',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('download action'); }
            }]
        });
    </script>

### items.icon `String`

Specifies the name for an existing icon in a Kendo UI theme that is rendered in the speed-dial item.

See [`the Web Font Icons help article`](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
Set or customize the icon displayed in a speed-dial item within a floating action button by specifying the name of a Kendo UI theme icon or glyph, enabling control over the visual symbol shown on each item. Configure, change, or update the icon to represent actions with web font icons, glyphs, or theme-based visuals, supporting use cases like specifying, enabling, or switching icons within speed-dial menus. This includes searching for how to assign icons by name, use existing icon libraries, replace default glyphs, and render scalable vector icons inside floating action button items, ensuring consistent, customizable visuals aligned with Kendo UI’s icon sets.
</div>

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            align: 'top start',
            icon: 'home',
            items: [{
                icon: 'download',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('download action'); }
            }]
        });
    </script>


### items.label `String`

Specifies the label for the speed-dial item.


<div class="meta-api-description">
Set or customize the text description, name, or caption displayed for each individual action or option within a floating action button speed dial, enabling clear labeling, identification, user guidance, and better discoverability of specific items when configuring menus, quick actions, or toolbars with multiple selectable entries.
</div>

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                label: 'Save',
                icon: 'save',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('save action'); }
            }]
        });
    </script>

### items.template `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) used to render the contents of the speed-dial item.

The fields which can be used inside the template are:

* text `String` - the label of the item (if configured).
* icon `String` - the icon specified for this step (if configured).


<div class="meta-api-description">
Customize or define the HTML structure and layout for each speed-dial option by setting a template that binds dynamically to item data fields like label text or icon name, enabling flexible rendering of floating action button entries using templating syntax that supports inserting icons and text labels, designing personalized button content, styling individual entries, or overriding default display with custom markup for each item in the floating action menu.
</div>

#### Example - Use a string template

    <button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                label: 'print',
                template: '#:text#',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }]
        });
    </script>

#### Example - Use a function

    <button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                label: 'print',
                template: function(e) {
                    return '<strong>' + e.text + '</strong>';
                },
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }]
        });
    </script>


### items.title `String`

Specifies the label for the speed-dial item that will be read by assistive technologies.


<div class="meta-api-description">
Set or configure the accessible label, name, or description for individual speed-dial options or actions within a floating action button to ensure screen readers and assistive technologies announce the correct text, improving accessibility by providing meaningful, descriptive titles for buttons, menu items, or quick actions that help users with visual impairments identify and interact with each floating action button item easily.
</div>

#### Example

	<button id="fab-items"></button>

	<script>
        $('#fab-items').kendoFloatingActionButton({
            icon: 'home',
            items: [{
                icon: 'print',
                title: 'print action title',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }]
        });
    </script>

### positionMode `String` *(default: 'fixed')*

Specifies CSS position of the FloatingActionButton in the document. Valid options are:

* `"absolute"`: positions the button relative to the nearest positioned ancestor .
* `"fixed"`: positions the button relative to the viewport.


<div class="meta-api-description">
Control how a floating action button is positioned on the screen by configuring its layout behavior to be either fixed relative to the viewport or absolute relative to its closest positioned parent. Adjust placement modes to enable sticky buttons that stay visible during scrolling or to anchor elements precisely within containers. Set or toggle between viewport-based fixed positioning for persistent interface elements and container-relative absolute positioning for context-aware layouts and dynamic UI placements, supporting flexible user interface designs that respond to page scroll or nested component boundaries. Fine-tune button placement strategies to achieve specific user interaction models, including overlay controls, floating controls pinned on the screen, or buttons integrated within scrolling content areas.
</div>

#### Example - fixed position

    <button id="fab-fixed"></button>

	<script>
        $('#fab-fixed').kendoFloatingActionButton({
            icon: 'home',
            align: 'bottom start'
        });
    </script>

#### Example - absolute position

    <div class="fab-container" style="width: 200px; height: 200px; position: relative;">
        <button id="fab-absolute"></button>
    </div>

	<script>
        $('#fab-absolute').kendoFloatingActionButton({
            icon: 'home',
            align: 'bottom start',
            positionMode: 'absolute'
        });
    </script>

### rounded `String` *(default: 'full')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`.


<div class="meta-api-description">
Adjust the button’s corner curvature or border radius to customize shape and style of floating action buttons, including options for rounded corners ranging from small, medium, or large curves to fully circular pill shapes or completely square edges, enabling control over the button’s visual appearance, corner radius styling, button shape configuration, curved or sharp corner design, and tailoring user interface element roundness for different aesthetics or usability preferences.
</div>

#### Example

    <div class="fab-container" style="width: 200px; height: 200px; position: relative;">
        <button id="fab-absolute"></button>
    </div>

	<script>
        $('#fab-absolute').kendoFloatingActionButton({
            icon: 'home',
            align: 'bottom start',
            rounded: 'large'
        });
    </script>

### size  `String` *(default: 'medium')*

Specifies the size of the FloatingActionButton. Valid options are `"small"`, `"medium"`, `"large"` and `"none"`.


<div class="meta-api-description">
Control and adjust the dimensions, scale, and footprint of circular or icon-based action buttons to fit different layout requirements, touch target sizes, or visual prominence by selecting from options like small, medium, large, or disabling size styling entirely. Customize button size for accessibility, responsive designs, or compact interface elements by configuring the appearance, spacing, and scale of interactive floating buttons or icon triggers used in mobile, web, and app interfaces to optimize usability and visual harmony.
</div>

#### Example

    <button id="fab-small">Small</button>
    <button id="fab-medium">Medium</button>
    <button id="fab-large">Large</button>

    <script>
        $('#fab-small').kendoFloatingActionButton({
            size: 'small',
            align: 'top start'
        });
        $('#fab-medium').kendoFloatingActionButton({
            size: 'medium',
            align: 'top end'
        });
        $('#fab-large').kendoFloatingActionButton({
            size: 'large',
            align: 'top center'
        });
    </script>

### text `String` *(default: '')*

Specifies the text of the FloatingActionButton. Default is empty string.


<div class="meta-api-description">
Configure or set the visible label, caption, or accessible name displayed on a floating action button to define the text shown on the button interface; use this to customize, change, or update the button’s label or provide descriptive content for accessibility and user interaction, enabling clear identification or naming of the floating action button element in UI design.
</div>

#### Example

    <button id="fab-text"></button>

	<script>
        $('#fab-text').kendoFloatingActionButton({
            text: 'Actions'
        });
    </script>

### themeColor `String` *(default: 'secondary')*

Specifies the theme color of the FloatingActionButton. Valid options are `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"` and `"none"`.


<div class="meta-api-description">
Customize the circular action button’s appearance by setting its color scheme to align with your application’s design system, choosing from common theme palettes like primary, secondary, tertiary, info, success, warning, error, dark, light, inverse, or opting for no color styling. Configure, apply, or control the floating action button’s visual emphasis through predefined semantic colors that reflect status, importance, or branding, enabling consistent UI theming and styling adaptability across light and dark modes or contrasting backgrounds. Adjust the accent or highlight color of the floating button to communicate context such as confirmation, alerts, or neutral states, ensuring harmony with your app’s color theme and UX guidelines.
</div>

#### Example

    <button id="fab-primary"></button>
    <button id="fab-secondary"></button>
    <button id="fab-tertiary"></button>

    <script>
        $('#fab-primary').kendoFloatingActionButton({
            themeColor: 'primary',
            icon: 'home',
            align: 'top start'
        });
        $('#fab-secondary').kendoFloatingActionButton({
            themeColor: 'secondary',
            icon: 'home',
            align: 'top center'
        });
        $('#fab-tertiary').kendoFloatingActionButton({
            themeColor: 'tertiary',
            icon: 'home',
            align: 'top end'
        });
    </script>

### visible `Boolean` *(default: true)*

Specifies if the FloatingActionButton is visible initially.


<div class="meta-api-description">
Set or configure the initial display state, visibility, or presence of the floating action button when the interface or component loads, controlling whether the button appears or remains hidden by default without additional runtime toggling or method calls; this enables developers to enable, disable, show, hide, or conditionally render the action button right at startup, useful for controlling UI elements dynamically based on state or user permissions.
</div>

#### Example

    <button id="fab-text"></button>

	<script>
        var fab = $('#fab-text').kendoFloatingActionButton({
            text: 'Action',
            visible: true
        });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
Clean up or dispose of floating action button resources by detaching event listeners, clearing internal data attributes to prevent memory leaks, and properly destroying nested child components without removing the button element itself from the DOM. Use this method to safely release event handlers, reset associated data, and finalize the lifecycle of dynamic floating action UI elements prior to DOM removal or component replacement, ensuring efficient memory management and avoiding orphaned event bindings in web applications.
</div>

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            items: [{
                icon: 'print',
                title: 'print action title',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }]
        }).getKendoFloatingActionButton();

        fab.destroy();
    </script>

### enable

Enables or disables the FloatingActionButton.


<div class="meta-api-description">
Control the activation state of the floating action button by programmatically enabling or disabling user interaction and visual availability at runtime, toggling its active or inactive status through method calls that accept boolean parameters, managing whether the button responds to clicks, gestures, or input dynamically during app execution, setting its enabled or disabled condition on demand, and adjusting its operational behavior and interactive feedback after the component has been initialized or rendered.
</div>

#### Parameters

##### value `Boolean`

Specifies whether the button should be enabled (true) or disabled (false).

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'plus'
        }).getKendoFloatingActionButton();

        fab.enable(false);
    </script>

### hide

Hides the FloatingActionButton.


<div class="meta-api-description">
Control the visibility of the floating action button by programmatically hiding or concealing the button through code calls, enabling dynamic show and hide behavior in response to user interactions, navigation changes, app state updates, or conditional logic, allowing developers to toggle, disable, suppress, or remove the floating action element from view during runtime to customize interface presentation and workflow flow without user input.
</div>

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'plus'
        }).getKendoFloatingActionButton();

        fab.hide();
    </script>


### icon

Sets or gets the icon of the FloatingActionButton.


<div class="meta-api-description">
Set, update, modify, or retrieve the icon image, glyph, symbol, or visual graphic displayed on a floating action button dynamically during runtime, enabling developers to programmatically control, change, replace, or access the button’s icon representation without recreating or rebuilding the button component, supporting seamless icon swaps, visual updates, and interface customization through method calls that handle the displayed icon asset or identifier.
</div>

#### Parameters

##### icon `String`

See [`floatingactionbutton.options.icon`](/api/javascript/ui/floatingactionbutton/configuration/icon) for valid options.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.icon('plus');
    </script>


### setOptions

Modifies the initial configuration of the FloatingActionButton


<div class="meta-api-description">
Modify or update the floating action button’s settings, appearance, behavior, nested menu items, position, or interaction options dynamically at runtime without recreating the component. Configure, change, or refresh the floating action button properties on the fly, enabling live adjustments to its visibility, styling, nested actions, layout, alignment, or functionality while the app is running. Adjust floating button parameters, customize its runtime options, set new UI states, or control behavior changes instantly through code to reflect updated designs or user preferences without restarting or rebuilding the component.
</div>

#### Parameters

##### options `Object`

The new options.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.setOptions({
            text: 'Print',
            icon: 'print',
            align: 'top start'
        });
    </script>

### show

Shows the FloatingActionButton.


<div class="meta-api-description">
Trigger or activate the floating action button’s visibility dynamically by calling the method that displays or reveals the button on screen, controlling its visibility programmatically with support for animations or transitions, enabling developers to show, unhide, enable, or make the button appear within the user interface after initial setup, useful for toggling visibility states or creating interactive UI flows that require the button to appear in response to user actions or app events.
</div>

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            icon: 'home',
            visible: false
        }).getKendoFloatingActionButton();

        fab.show();
    </script>

### text

Sets / gets the text of the FloatingActionButton.


<div class="meta-api-description">
Retrieve or change the label text of a floating action button dynamically by accessing or updating its displayed text at runtime, enabling app developers to modify button captions programmatically for localization, real-time UI updates, user interaction response, toggling states, or data binding adjustments, making it simple to get the current text or set new labels without recreating the component.
</div>

#### Parameters

##### text `String`

The new text of the FloatingActionButton.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.text('Print');
    </script>

### themeColor

Sets or gets the theme color of the FloatingActionButton.


<div class="meta-api-description">
Set, get, or update the color scheme of a floating action button by accessing its current theme color or modifying it dynamically, allowing developers to customize, configure, or read the button’s visual appearance for consistent theming, palette management, color control, or adaptive UI styling within applications.
</div>

#### Parameters

##### themeColor `String`

See [`floatingactionbutton.options.themeColor`](/api/javascript/ui/floatingactionbutton/configuration/themeColor) for valid options.

#### Example

    <button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions'
        }).getKendoFloatingActionButton();

        fab.themeColor('secondary');
    </script>


## Events

### click

Fires when the user clicks on a the FloatingActionButton.

**Note: when using [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) configuration, clicking on the FloatingActionButton will open the speed-dial list popup.


<div class="meta-api-description">
Detect and respond to user interactions with the main floating action button by capturing tap, click, or press events to trigger custom behaviors such as navigation actions, command execution, user interface updates, event tracking, or analytics logging. Enable, configure, or listen for button presses, onClick or onTap events, and implement handlers to intercept or extend default actions including activating speed-dial menus or dropdown lists when multiple items are present. Support event handling patterns for single clicks, rapid taps, or custom logic tied to floating action triggers across various UI scenarios and workflows.
</div>

#### Event Data

##### e.event `Object`

The original DOM event.

##### e.sender `kendo.ui.FloatingActionButton`

The **FloatingActionButton** instance that triggered the event.

##### e.preventDefault `Function`

If invoked prevents the click .

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Print',
            click: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log('print');
            }
        });
    </script>

### collapse

Fires when the speed-dial popup is closed and its animation is finished.

**Note: this event is triggered only when using [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) configuration.


<div class="meta-api-description">
Detect when the floating action button or speed dial menu finishes closing its popup and animations to trigger follow-up actions such as running cleanup code, restoring focus, updating interface elements, managing component state, sending analytics events, or handling final UI adjustments after the dial collapses. Listen for events signaling that the expandable action menu is fully closed to coordinate logic that depends on the speed-dial or button folding shut, particularly when using indexed or item-based configurations controlling the dial’s open and close behavior. Capture the moment the animated closing sequence completes for responsive interaction handling, including conditional workflows tied to the end of the floating menu’s visibility or presence on screen.
</div>

#### Event Data

##### e.sender `kendo.ui.FloatingActionButton`

The **FloatingActionButton** instance that triggered the event.

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            items: [{
                icon: 'print',
                title: 'print action title',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }],
            collapse: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log('collapse event triggered');
            }
        }).getKendoFloatingActionButton();

        fab.element.trigger("click");
    </script>

### expand

Fires when the speed-dial popup is opened and its animation is finished.

**Note: this event is triggered only when using [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) configuration.


<div class="meta-api-description">
Trigger actions, execute callbacks, or run custom code after a floating action button’s speed-dial menu finishes opening and its open animation completes, useful for handling UI focus shifts, updating state, initiating chained animations, firing analytics events, or loading asynchronous data once the expandable menu or options are fully visible and interactive, particularly when the button uses multiple items or nested menu configurations and you need to detect precisely when the expansion animation has ended to safely proceed with follow-up logic or user interaction adjustments.
</div>

#### Event Data

##### e.sender `kendo.ui.FloatingActionButton`

The **FloatingActionButton** instance that triggered the event.

#### Example

	<button id="fab"></button>

	<script>
        var fab = $('#fab').kendoFloatingActionButton({
            text: 'Actions',
            items: [{
                icon: 'print',
                title: 'print action title',
	/* The result can be observed in the DevTools(F12) console of the browser. */
                click: function() { console.log('print action'); }
            }],
            expand: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log('expand event triggered');
            }
        }).getKendoFloatingActionButton();

        fab.element.trigger("click");
    </script>
