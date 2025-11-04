---
title: Switch
page_title: Configuration, methods and events of Kendo UI Switch
description: How to quickly configure the checked and unchecked state of Switch widget.
res_type: api
component: switch
---

# kendo.ui.Switch

Represents the Kendo UI Switch. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the Switch.


<div class="meta-api-description">
How do I programmatically check the state of a Kendo UI Switch component? Determine, set, or read the toggle state of a switch component as on or off, true or false, enabling programmatic control, two-way binding with form inputs or data models, and dynamic UI updates to reflect the boolean on/off status, checked state, or selected/unselected condition for interactive toggle switches.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false`, the Switch will be disabled and will not allow the user to change its checked state.


<div class="meta-api-description">
How do I disable user interaction with the Kendo UI switch? Control whether the toggle switch can be interacted with or not, enabling or disabling user input and programmatic changes; configure this setting to prevent users from changing the switch state, lock or unlock the toggle control, activate or deactivate user touch or click responsiveness, manage whether the switch is operational or inactive, set the switch to allow toggling through UI interaction or disable it to block any modifications from user actions or code commands.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            enabled: false
        });
    </script>

### readonly `Boolean`*(default: false)*

If set to `true`, the Switch will render into its read-only state.


<div class="meta-api-description">
How do I make a Kendo UI switch read-only? Control toggle interactivity by setting the switch to a non-editable or read-only mode where users can view the current on/off or checked state without the ability to change it. Enable or disable user input on toggle switches, lock the switch state for display-only purposes, prevent modifications while showing status, and configure the switch to render as a static indicator versus an interactive control. Useful for making toggles disabled for editing but still visually reflecting their true value, restricting user changes but allowing status visibility, or setting the switch as a read-only UI element to display settings or flags without toggling capabilities.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            readonly: true
        });
    </script>

### messages `Object`

Defines the text of the `checked` and `unchecked` labels that are displayed within the Switch. All labels support localization.

> The `messages` property is applicable only for the `Default` and `Classic` themes. All other themes, by design, do not show `checked` and `unchecked` messages.


<div class="meta-api-description">
How do I change the on/off labels for a Kendo UI switch in multiple languages? Set or customize localized on/off labels, toggle states, or checked/unchecked text for switch inputs or toggle buttons, enabling support for multiple languages and regional settings within UI components that use Default or Classic themes; configure the display text for active and inactive states, switch captions, toggle indicator messages, or state descriptors in user interface switches, enhancing accessibility and internationalization in toggle controls.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                checked: "on",
                unchecked: "off"
            }
        });
    </script>

### messages.checked `String`*(default: "On")*

The label for the checked state of the Switch.

> The `messages` property is applicable only for the `Default` and `Classic` themes. All other themes, by design, do not show `checked` and `unchecked` messages.


<div class="meta-api-description">
How do I change the text displayed when a Kendo UI Switch is checked? Set or configure the label text displayed when a toggle or switch control is activated, enabled, turned on, or checked, controlling what message appears in user interfaces under various themes, including classic or default styles, managing on-state indicators, status labels, or toggle feedback text that helps users understand the switch’s current state or selection.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                checked: "YES"
            }
        });
    </script>

### messages.unchecked `String`*(default: "Off")*

The label for the unchecked state of the Switch.

> The `messages` property is applicable only for the `Default` and `Classic` themes. All other themes, by design, do not show `checked` and `unchecked` messages.


<div class="meta-api-description">
How do I customize the label text for an unchecked toggle switch in Kendo UI? Set or customize the label text displayed when a toggle switch is in the off, inactive, or unchecked state, enabling localization and translation for user interfaces, particularly for default or classic switch styles. Adjust, configure, or override the off-state messaging, control the unchecked text in different languages, and manage how the switch’s inactive label appears across themes to suit internationalization and user feedback needs.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                unchecked: "NO"
            }
        });
    </script>

### size `String` *(default: 'medium')*

Sets a value controlling the size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How do I adjust the size of a Kendo UI switch control? Adjust the dimensions or scale of toggle controls to customize their visual weight, whether requiring a subtle compact switch or a large prominent toggle, by specifying sizes using numeric values, CSS units, or descriptive keywords like small, medium, large, or disabling sizing with none to influence appearance, layout, and UI responsiveness.
</div>

#### Example

    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        size: "large"
    });
    </script>

### trackRounded `String` *(default: 'full')*

Sets a value controlling the track's border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"


<div class="meta-api-description">
How to customize the border curvature of a Kendo UI switch track element? Control and customize the border curvature of toggle or switch track elements by setting precise radius values or selecting predefined options like small, medium, large, full circle, or no rounding; adjust, configure, enable, or define the rounded corners of interactive toggle backgrounds for consistent UI styling, visual appeal, or design system compliance during component setup or initialization.
</div>

#### Example

    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        trackRounded: "small"
    });
    </script>

### thumbRounded `String` *(default: 'full')*

Sets a value controlling the thumb's border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"


<div class="meta-api-description">
How to style a Kendo UI switch thumb with rounded corners? Control and customize the shape of a toggle or switch component’s thumb by adjusting the corner roundness, using options like small, medium, large, full, none, or by specifying precise radius values to set the border curvature of the thumb. This setting enables developers to configure the thumb’s border radius for different visual styles, enabling rounded or square edges, shaping the toggle knob appearance to match design requirements or user interface themes, and providing flexible control over thumb geometry for interactive switch elements.
</div>

#### Example

    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        thumbRounded: "full"
    });
    </script>

### width `Number|String`*(default: "6em")*

The width of the Switch.


<div class="meta-api-description">
How can I adjust the width of a Kendo UI toggle switch? Adjust or configure the horizontal size, width, or dimension of toggle switches to align with form elements, match button and control sizes, create compact or expanded toggle buttons, set custom CSS width values for switches, control switch span or length within layouts, resize toggle controls for UI consistency, define switch width to fit responsive or fixed layouts, modify the horizontal measurement of toggle components, and customize switch appearance by setting exact width or scaling horizontally to fit design requirements.
</div>

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            width: 140
        });
    </script>

The Switch options can be changed dynamically with the `setOptions()` method.

#### Example

    <input id="switch" />

    <script>
      $("#switch").kendoSwitch({
        width: 50
      });

      var switchInstance = $("#switch").data("kendoSwitch")
          switchInstance.setOptions( {
              width: 200
          })
    </script>

## Methods

### check

Gets or sets the checked state of the Switch.


<div class="meta-api-description">
How do I programmatically check if a Kendo UI switch is currently on or off? Access or modify the toggle state programmatically by retrieving whether the switch is currently on or off, or by setting it true or false to reflect user actions or application data changes. Control, check, update, read, or toggle the boolean switch state dynamically to synchronize UI components, manage interactive controls, enable or disable features, respond to events, or implement conditional logic based on the switch's selected or unselected status.
</div>

#### Parameters

##### check `Boolean`

Checks or unchecks the Switch.

#### Returns

`Boolean` - The checked state of the Switch.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.check(true);
    </script>

### toggle

Toggles the checked state of the Switch.


<div class="meta-api-description">
How can I programmatically toggle the state of a Kendo UI switch control? Toggle the boolean state of a UI switch control programmatically to switch between on/off, checked/unchecked, true/false, or enabled/disabled values, enabling dynamic updates to the switch state in response to code-driven events, form interactions, conditional rendering, or feature flags; configure, enable, or change the toggle state from scripts or event handlers to automate the switch's checked status and integrate its state changes seamlessly into reactive UI logic or application workflows.
</div>

#### Example

    <input id="switch" />
    <button id="toggle">Toggle</button>

    <script>
        $("#switch").kendoSwitch()

        $("#toggle").on("click", function () {
            var switchInstance = $("#switch").data("kendoSwitch");
            // toggle the checked state of the switch.
            switchInstance.toggle();
        });
    </script>

### destroy

Prepares the Switch for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the Switch element from DOM.


<div class="meta-api-description">
What happens when I call destroy() on a Kendo Switch widget? remove or clean up switch instance memory leaks dispose event handlers detach all event listeners free internal references clear jquery data attributes safely tear down nested kendo ui widgets child component destruction avoid dangling references teardown switch widget without removing dom element properly finalize switch widget lifecycle release resources from switch instance ensure no memory retention after switch removal safely disable switch functionality from code
</div>

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.destroy();
    </script>

### enable

Changes the enabled state of the Switch.


<div class="meta-api-description">
How do I programmatically enable or disable user input on a Kendo UI switch element? Control the interactive state of a toggle or switch element by enabling or disabling user input dynamically during runtime, allowing programmatic activation or deactivation of the component's responsiveness, updating its internal state and visual feedback to reflect whether it is clickable, touchable, or accessible, managing user interaction permissions such as turning on or off functionality, controlling focus and event handling, and adjusting accessibility status based on application logic or user context.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the Switch.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.enable(false);
    </script>

### readonly

Changes the read-only state of the Switch.


<div class="meta-api-description">
How to make Kendo UI switch non-interactive programmatically? Control or configure the switch component’s interaction state dynamically by enabling or disabling user input without reloading or resetting it, effectively setting the switch to a non-interactive, read-only mode that blocks toggling while maintaining its current on/off value, suitable for runtime adjustments to restrict or allow user changes programmatically.
</div>

#### Parameters

##### readonly `Boolean`

Defines whether the Switch will render in its read-only state.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.readonly(true);
    </script>

## Events

### change

Fires when the checked state of the Switch is changed through user interaction.


<div class="meta-api-description">
How do I detect user changes to a Kendo UI switch control? Detect user-triggered toggle actions on a switch control to handle changes in application state, update settings or preferences, trigger UI updates, or run custom logic immediately after the user interacts via click, tap, or keyboard input; capture only direct user changes rather than programmatic updates, enabling responsive event handling, change detection, state synchronization, and dynamic interaction responses based on toggling behavior.
</div>

#### Event Data

##### e.checked `Object`

The checked state of the Switch.

#### Example - handling the change event

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            change: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.checked);
            }
        });
    </script>
