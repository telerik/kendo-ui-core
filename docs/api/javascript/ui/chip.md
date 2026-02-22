---
title: Chip
description: Configuration, methods and events of the Kendo UI Chip
res_type: api
component: Chip
---

# kendo.ui.Chip

Represents the Kendo UI Chip widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the chip by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
How do I set an icon for a Kendo UI chip element using its configuration? Configure or customize a visual symbol or graphic element within the chip UI component by specifying an icon using either a predefined theme icon name or custom SVG markup, enabling developers to visually represent content, status, or categories inside the chip. This includes setting font-based icons or scalable vector graphics that render inline to enhance user interface clarity, support dynamic icon assignment, and facilitate consistent styling of chips with recognizable imagery. It supports use cases such as adding status indicators, category symbols, or decorative icons within chip elements, making it easy to control the appearance and semantic meaning of chip components through icons configured by name or SVG data.
</div>

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            icon: 'plus',
            label: 'Add'
        });
    </script>

### iconClass `String` *(default: '')*

If set, value will be appended to the icon's element class attribute.


<div class="meta-api-description">
How can I customize the appearance of the icon in a Kendo UI Chip component? Add custom CSS class names to style or target the icon inside a chip component, extending or combining with default icon classes to customize appearance, apply additional styling rules, integrate icon fonts, control icon sizing, colors, or animations, enable flexible icon theming, or target the icon element specifically for styling overrides without removing the base classes.
</div>

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            iconClass: 'k-icon k-i-add',
            label: 'Add'
        });
    </script>

### avatarClass `String` *(default: '')*

If set, value will be appended to the icon's element class attribute. It also appends "k-chip avatar" and "k-avatar" classes to the icon's element.


<div class="meta-api-description">
How can I customize the appearance of a Kendo UI chip's avatar element? Customize the avatar or icon element of a chip by setting CSS classes to style, theme, or adjust its appearance during initialization, enabling developers to add one or multiple class names that enhance or override default styling for avatars, icons, or graphical elements embedded in chips. This setting supports appending custom class attributes alongside built-in classes to control visual presentation, apply design tokens, or integrate with CSS frameworks within chip components where avatar or icon customization is required.
</div>

#### Example
    <style>
        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            avatarClass: 'maria',
            label: 'Maria'
        });
    </script>


### removeIcon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content for the remove button when `removable=true`. The icon is rendered inside the chip by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
How to customize the close button icon in Kendo UI Chip? Customize the icon used for the removable chip’s close or delete button by configuring it with a predefined theme icon name or supplying custom SVG markup, enabling developers to control the visual appearance of the chip’s remove indicator whether using built-in icon sets or bespoke vector graphics, suitable for setting or changing the delete cross, close symbol, or removal glyph inside the chip’s UI element when toggling removable states or adjusting user interaction cues for chip deletion.
</div>

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            removable: true,
            removeIcon: 'x',
            themeColor: 'success'
        });
    </script>

### removeIconClass `String` *(default: '')*

If set, value will be appended to the remove icon's element class attribute.


<div class="meta-api-description">
How to add custom CSS classes to Kendo UI Chip's remove icon? Add custom CSS classes, style, customize, or target the remove icon on a chip element by appending additional class names without replacing existing classes; configure or set extra classes to control appearance, enable consistent theming, modify icon styling, or hook event listeners by attaching custom class selectors to the chip remove icon at initialization for adaptable design and interaction adjustments.
</div>

#### Example

    <span id="chip"></span>
    <script>
        $('#chip').kendoChip({
            removable: true,
            removeIconClass: 'k-chip-icon k-icon k-i-close',
            themeColor: 'success'
        });
    </script>


### fillMode `String` *(default: undefined)*

Specifies the background and border styles of the Chip. When `undefined` (the default), the theme controls the default fill mode. Valid fillMode options are:

* `solid`
* `outline`


<div class="meta-api-description">
How to configure the background rendering of a Kendo UI for jQuery Chip component? Adjust the chip's appearance by configuring how its background and border are rendered, choosing between a solid fill for a fully colored background or an outline style that emphasizes border visibility while keeping the background transparent; this setting controls visual styling options such as enabling filled backgrounds, outlined borders, background colors, border presence, and overall chip presentation for customization of component look and feel.
</div>

#### Example

    <span id="chip-solid"></span>
    <span id="chip-outline"></span>
    <script>
        $('#chip-solid').kendoChip({fillMode: 'solid', label: 'Solid' });
        $('#chip-outline').kendoChip({fillMode: 'outline', label: 'Outline' });
    </script>


### rounded  `String` *(default: undefined)*

Specifies the size of the chip. When `undefined` (the default), the theme controls the default border radius. Valid options are `small`, `medium`, `large`, `full`.

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to set a rounded corner style for a Kendo UI chip element? Adjust or configure the chip’s border radius, corner radius, or roundness level to create various curved edge styles such as subtle rounding, medium curves, large roundness, fully circular shapes, or completely square edges, enabling designers and developers to set how rounded or sharp the chip component corners appear during setup or customization.
</div>

#### Example

    <span id="chip-small">Small chip</span>
    <span id="chip-medium">Medium chip</span>
    <span id="chip-large">Large chip</span>
    <span id="chip-full">Full chip</span>
    <span id="chip-none">Non-rounded chip</span>
    <script>
        $('#chip-small').kendoChip({ rounded: 'small', themeColor: 'success' });
        $('#chip-medium').kendoChip({ rounded: 'medium', themeColor: 'success' });
        $('#chip-large').kendoChip({ rounded: 'large', themeColor: 'success' });
        $('#chip-full').kendoChip({ rounded: 'full', themeColor: 'success' });
        $('#chip-none').kendoChip({ rounded: 'none', themeColor: 'success' });
    </script>

### size  `String` *(default: undefined)*

Specifies the size of the chip. When `undefined` (the default), the theme controls the default size. Valid options are `small`, `medium`, `large`.

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to adjust the size of a Kendo UI chip element? Adjust or configure the visual dimensions, scale, and spacing of a chip or tag element by selecting among predefined size options such as small, medium, large, or disabling sizing with none. This setting controls how compact or spacious the chip appears, enabling customization of its footprint, layout impact, or visual prominence in user interfaces. Developers may want to scale, resize, shrink, enlarge, or toggle chip sizing to fit design requirements, UI density preferences, responsive layouts, or accessibility needs, making it easier to match styling and component proportions across different screen sizes and contexts.
</div>

#### Example

    <span id="chip-small">Small chip</span>
    <span id="chip-medium">Medium chip</span>
    <span id="chip-large">Large chip</span>
    <span id="chip-none">No padding chip</span>
    <script>
        $('#chip-small').kendoChip({ size: 'small', themeColor: 'success' });
        $('#chip-medium').kendoChip({ size: 'medium', themeColor: 'success' });
        $('#chip-large').kendoChip({ size: 'large', themeColor: 'success' });
        $('#chip-none').kendoChip({ size: 'none', themeColor: 'success' });
    </script>


### label `String` *(default: '')*

The label text of the chip. Default is empty string.


<div class="meta-api-description">
How do I customize the text that appears on a Kendo UI chip component? Configure or set the text content, caption, or tag that appears on a chip or badge component to identify, name, or describe an item or element visually. Control the displayed label, title, or identifier text that users see on this UI element, enabling customization of chip text, tag names, or labels during initialization or runtime. This property supports assigning, updating, or modifying the visible string, tag text, or short descriptive phrase used for marking, categorizing, or highlighting items with customizable chip or badge text.
</div>

#### Example

    <span id="text-chip"></span>
    <span id="notext-chip"></span>
    <script>
        $('#text-chip').kendoChip({
            themeColor: 'success',
            text: 'Chip'
        });
        $('#notext-chip').kendoChip({icon : 'home' });
    </script>


### themeColor `String` *(default: 'base')*

Specifies the theme color of the component. Valid options are

* `base`: apply coloring based on surface theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.


<div class="meta-api-description">
How to customize the color of Kendo UI jQuery Chip component? Control and customize the visual theme and color styling of chip or tag UI elements by selecting predefined semantic color schemes such as info, success, warning, error, or base surface colors to adjust background, accent, and overall appearance. Configure, set, or enable consistent color themes for chips to match application status indicators, alerts, notifications, or branding requirements using common color variants representing semantic meanings or surface-based palettes. Adjust chip component colors dynamically or on initialization to reflect state, meaning, or theme coherence across interfaces by choosing from standard theme color options designed for clear visual differentiation and style consistency in user interface elements.
</div>

#### Example

    <span id="chip-base">Base</span>
    <span id="chip-info">Info</span>
    <span id="chip-success">Success</span>
    <span id="chip-warning">Warning</span>
    <span id="chip-error">Error</span>

    <script>
        $('#chip-base').kendoChip({ themeColor: 'base' });
        $('#chip-info').kendoChip({ themeColor: 'info' });
        $('#chip-success').kendoChip({ themeColor: 'success' });
        $('#chip-warning').kendoChip({ themeColor: 'warning' });
        $('#chip-error').kendoChip({ themeColor: 'error' });
    </script>


### removable `Boolean` *(default: false)*

Specifies if the Chip will be removable or not. If the property is set to true, the Chip renders a remove icon.

> **Important:** Clicking the remove icon will not remove the Chip itself.


<div class="meta-api-description">
How to display a removable indicator in Kendo UI for jQuery Chip component? Control whether a chip component displays a removable indicator or delete icon that users can interact with to signify the intent to remove or delete the chip; configure, enable, or set this behavior during initialization to show a close button or remove icon on the chip, supporting user actions for chip removal while requiring custom handling of the actual deletion logic; useful for managing tag-like UI elements where chips can be marked as removable or deletable but do not self-remove automatically on click, offering developers the ability to capture and respond to removal requests programmatically.
</div>

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            removable: true
        });
    </script>

### selectable `Boolean` *(default: false)*

Sets whether the Chip can be selected.


<div class="meta-api-description">
How do I enable user interaction with Kendo UI for jQuery Chip elements? Enable or disable user interaction to select or highlight the chip element using mouse clicks, touch input, keyboard navigation, or through code-driven commands, controlling the chip’s ability to respond to selection actions and toggling its selectable state during setup or runtime, allowing developers to configure whether the chip is interactive, focusable, or passive for selection behaviors in user interfaces.
</div>

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            selectable: true
        });
    </script>

### selected `Boolean` *(default: false)*

Toggles the selected state of the Chip.


<div class="meta-api-description">
How do I programmatically select or deselect an item in a Kendo UI Chip component? Control, set, or toggle the selection state of interactive UI elements to mark them as active, chosen, or highlighted; enable programmatic selection or deselection of tags, tokens, or pills in user interfaces; bind selection status to application data models for dynamic toggling of chosen items; manage active states for filter chips, choice indicators, or selection controls in lists and forms; configure components to appear selected based on user interaction, automation, or state changes, supporting use cases like multi-select, single-select, or toggleable options in UI design.
</div>

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Selected',
            selectable: true,
        });
    </script>


### enabled `Boolean` *(default: true)*

Toggles the enabled state of the Chip.


<div class="meta-api-description">
How do I enable or disable user interaction with a Kendo UI Chip element? Control whether the component is active or inactive by enabling or disabling user interaction, including clicks, focus, keyboard navigation, and event handling for the chip element. Configure the interactive state to allow or prevent user input, toggle responsiveness, manage accessibility focus, and set whether the component can respond to touch or mouse events. Set, switch, or control the boolean activation state to turn the chip on or off, enabling or blocking all user engagement and input handling during initialization or runtime.
</div>

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Disabled chip',
            enabled: false
        });
    </script>

### attributes `Object`

Defines custom attributes of the Chip's element.


<div class="meta-api-description">
How do I add custom attributes to a Kendo UI chip component? Configure custom HTML attributes such as data attributes, ARIA roles, IDs, titles, or other custom name-value pairs directly on the root element of a UI chip component, enabling enhanced accessibility, identification, tracking, and interaction control. This feature supports adding custom attributes for styling hooks, accessibility improvements, event targeting, metadata embedding, or any user-defined HTML attribute insertion to a chip element during initialization or runtime, helping developers customize chip elements with precise control over DOM attributes for testing, automation, labeling, and semantic enhancements in web applications.
</div>

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: 'Disabled chip',
            attributes: { "data-val" : "custom data attribute" }
        });
    </script>

## Methods

### setOptions

Modifies the initial configuration of the chip


<div class="meta-api-description">
How can I dynamically change the options of a Kendo UI chip component after it's been initialized? Change, update, modify, or reconfigure the options and settings of a UI chip component dynamically after it has been created or initialized, enabling runtime adjustments of configuration parameters, properties, or attributes to control appearance, behavior, or functionality without recreating the component, supporting use cases like toggling features, switching styles, altering labels, or customizing interactions on the fly.
</div>

#### Parameters

##### options `Object`

The new options.

#### Example

    <span id="chip"></span>
    <script>
        var chip =  $('#chip').kendoChip({
            label: 'Old chip text',
            themeColor:'success'
        }).data('kendoChip');

        chip.setOptions({
            label: 'New chip text',
            themeColor: 'error'
        });
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I disable user input for a Kendo UI Chip element using jQuery? Activate or deactivate interactivity for the Chip element by setting it to accept or block user input, clicks, taps, keyboard events, or focus, allowing control over its enabled or disabled state in dynamic interfaces such as forms, buttons, toggles, toolbars, or selectable lists. Manage component availability programmatically during runtime to control user access, responsiveness, or visual feedback for interactive UI elements. Adjust the component’s interactive state to reflect conditions like form validation, user permissions, or contextual functionality enabling and disabling user interactions dynamically.
</div>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            enable: false
        });

        var chip = $("#chip").data("kendoChip");
        chip.enable(true);
    </script>

### select

Selects the widget.


<div class="meta-api-description">
How to programmatically select a Kendo UI chip in jQuery? Control and change the selection state of a chip or tag component programmatically by setting or toggling its selected status through code, enabling immediate visual updates without user interaction. This includes simulating user clicks, managing selections dynamically in response to events, updating UI state in real time when data changes, enabling or disabling chip highlighting, activating selection behavior via scripts, or controlling which tags or chips are marked as selected within lists or groups. Developers often need to enable, trigger, or set chip selection manually for workflows involving dynamic user interfaces, event handlers, or reactive data changes.
</div>

#### Parameters

##### state `Boolean`

If set to `true` the widget will be selected. If set to `false` the widget will be deselected.

#### Example - enable the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({
            label: 'Chip text'
        });

        var chip = $("#chip").data("kendoChip");
        chip.select(true);
    </script>

#### Example - disable the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({
            label: 'Chip text',
            enable: true
        });

        var chip = $("#chip").data("kendoChip");
        chip.enable(false);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How do I programmatically set focus on a Kendo UI Chip widget using jQuery? Control keyboard focus programmatically by setting or triggering focus on an interactive element, enabling users to navigate and interact using keyboard inputs or assistive technologies, ensuring the element receives input events and becomes active within the DOM for accessibility, keyboard navigation, and user interaction scenarios such as managing focus order, handling focus state, or dynamically shifting focus after initialization or specific user actions.
</div>

#### Example - focus the widget

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({ label: 'Chip text' });
        var chip = $("#chip").data("kendoChip");
        chip.focus();
    </script>

### destroy

Prepares the **Chip** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the Chip element from DOM.


<div class="meta-api-description">
What is the purpose of using `destroy` method in Kendo UI Chip? Clean up or reset a chip-like UI element by safely detaching event listeners, removing data bindings, clearing internal references, and preventing memory leaks before removing or dynamically replacing the element. Use this method to disable or teardown chip components to ensure no leftover handlers or memory usage remain, allowing smooth removal from the DOM when combined with explicit element deletion. This operation supports managing lifecycle, event cleanup, resource disposal, and clean teardown of interactive badge or token components without directly deleting the DOM node.
</div>

#### Example

    <span id="chip"></span>
    <script>
        $("#chip").kendoChip({ label: 'Chip text' });
        var chip = $("#chip").data("kendoChip");
        chip.destroy();
    </script>

## Events

### click

Fires when the user clicks the content of the Chip or activates it with the Enter or Space keys.


<div class="meta-api-description">
How do I detect a click on a Kendo UI chip component? Detect and respond to user interactions that activate a chip component through mouse clicks or keyboard inputs like Enter or Space keys, enabling developers to configure event handlers for actions such as selecting items, toggling states, navigating interfaces, or executing custom functions triggered by user engagement with chip elements via click events or keyboard activation.
</div>

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Chip`

The **Chip** instance that triggered the event.


#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: "Chip",
            selectable: true,
            click: function (ev) {
                var chip = ev.sender;
                alert(chip.element.text());
            }
        })
    </script>

### select

Fires when the selection of a selectable the Chip toggles.


<div class="meta-api-description">
How do I detect changes in selection status for Kendo UI for jQuery Chip component? Detect changes in item selection status, track toggle actions on selectable chips or tags, respond to user clicks or keyboard events that alter selection, listen for selection state transitions from selected to deselected or vice versa, capture and process selection events to update application state or UI elements dynamically, implement custom logic to override default selection behavior, synchronize selected items with external data sources or application stores, manage interactive choice components that reflect user preferences, control and monitor selection toggling in multi-select or single-select interfaces, handle events that indicate changes in selection for use in conditional rendering or business logic updates.
</div>

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Chip`

The **Chip** instance that triggered the event.

##### e.preventDefault `Function`

If invoked prevents the Chip selection change.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: "Chip",
            selectable: true,
            select: function (ev) {
                var chip = ev.sender;

                // prevent selection
                ev.preventDefault();
                alert("Selection prevented");
            }
        })
    </script>

### remove

Fires when the user clicks the remove icon of the Chip. After this event, the Chip will not remove itself.


<div class="meta-api-description">
How do I handle removal of a Kendo UI chip element when its remove button is clicked? Capture and handle user clicks on the remove button or icon of a chip element to trigger custom actions like confirmation dialogs, event tracking, cleanup routines, or conditional deletion. Enable interception of chip deletion interactions to control whether to proceed with removing the chip programmatically, implement logic before removal, prevent automatic deletion, and manage user-triggered chip removal events for customized UI behavior and workflow integration.
</div>

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Chip`

The **Chip** instance that triggered the event.

#### Example

    <span id="chip"></span>

    <script>
        $("#chip").kendoChip({
            label: "Chip",
            removable: true,
            remove: function (ev) {
                var chip = ev.sender;
                alert(chip.element.text());
            }
        })
    </script>

