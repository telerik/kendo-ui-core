---
title: CheckBox
page_title: Configuration, methods and events of Kendo UI CheckBox
description: How to quickly configure the checked and unchecked state of CheckBox widget.
res_type: api
component: checkbox
---

# kendo.ui.CheckBox

Represents the Kendo UI CheckBox. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the CheckBox.


<div class="meta-api-description">
Control and query the toggle state of a checkbox element with a boolean value indicating whether it is selected or deselected, enabling programmatic setting or retrieval of checked status, binding or syncing selection state within data models or view-models, tracking user interaction changes, managing form input validation, handling event-driven toggling, configuring default selection, and supporting reactive UI updates based on true/false conditions for checked or unchecked states.
</div>

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false`, the CheckBox will be disabled and will not allow the user to change its checked state.


<div class="meta-api-description">
Configure or control whether a checkbox is interactive, accepting user input or not, including enabling or disabling user clicks and toggles; manage whether the checkbox can be checked or unchecked by users, set its active state for form controls, control form behavior by turning the checkbox on or off for input handling, adjust user interaction permissions dynamically, and restrict or allow changing the checked status programmatically to enforce validation or UI logic.
</div>

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            enabled: false
        });
    </script>

### encoded `Boolean` *(default: true)*

Determines whether the checkbox label content should be rendered as an HTML string or it should be encoded.


<div class="meta-api-description">
Control whether checkbox labels render raw HTML markup or display encoded text to safely show tags as plain text; configure label content to be interpreted as HTML strings for formatted styling or escape HTML elements to prevent rendering, enabling flexible display of labels with embedded HTML, encoded text, or special characters, and toggle between enabling HTML content rendering or enforcing encoded output to manage label presentation effectively in various UI scenarios.
</div>

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            label: "<strong>Label one</strong>",
            encoded: false
        });
    </script>

### label `String`

Specifies the label content for the checkbox.


<div class="meta-api-description">
Configure or customize the text, caption, or descriptive label displayed alongside a checkbox control to clearly identify its function, purpose, or meaning in forms, UI elements, or settings. Enable setting, editing, or changing the visible label content that users see next to the checkbox, providing clarity, accessibility, and context for toggling options, selecting preferences, or marking choices within an interface. Control the display text, set the checkbox title, or adjust the accompanying description to improve usability and user understanding in interactive components.
</div>

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            label: "Label one"
        });
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the component input element border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- null


<div class="meta-api-description">
Adjust corner curvature or border radius of checkbox input elements by configuring rounded edges with customizable values or predefined sizes such as small, medium, large, full, or setting no radius for square corners. Control, set, enable, or customize checkbox corner rounding, border shape, input element style, curvature radius, or shape smoothness for various UI design requirements and responsive layouts. Tailor checkbox appearance by modifying corner rounding to achieve subtle or pronounced rounded corners, ensuring flexible control over input element border radius and style customization.
</div>

#### Example

    <input id="checkbox" />
    <script>
    $("#checkbox").kendoCheckBox({
        rounded: "small"
    });
    </script>

### size `String` *(default: 'medium')*

Sets a value controlling the size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- null


<div class="meta-api-description">
Adjust the control's visual dimensions, scaling, and layout by configuring the size setting to manage padding, spacing, and overall checkbox proportions with options for small, medium, or large styles, or reset to default appearance to suit different UI density preferences, touch targets, or form scales, enabling customization of how compact or spacious the interactive selection box appears in interfaces.
</div>

#### Example

    <input id="checkbox" />
    <script>
    $("#checkbox").kendoCheckBox({
        size: "large"
    });
    </script>

## Methods

### check

Gets or sets the checked state of the CheckBox.


<div class="meta-api-description">
Control or retrieve the selection state of a checkbox element programmatically by reading whether it is checked or unchecked, setting and updating its state dynamically through code, toggling its boolean value, syncing user interface selection with application data, managing checkbox state changes, enabling or disabling the check mark, and handling interactions that require programmatic switching or querying of the checkbox's true or false status.
</div>

#### Parameters

##### check `Boolean`

Checks or unchecks the CheckBox.

#### Returns

`Boolean` - The checked state of the CheckBox.

#### Example

    <input id="checkbox" />

    <script>
        var checkboxInstance = $("#checkbox").kendoCheckBox().data("kendoCheckBox");
        checkboxInstance.check(true);
    </script>

### toggle

Toggles the checked state of the CheckBox.


<div class="meta-api-description">
Change, flip, invert, or switch a checkbox state programmatically to check or uncheck it without directly modifying the checked property. Enable toggling the selection state, updating the visual appearance and internal status of the checkbox control through methods that manage the current boolean value. Control checkbox state changes with functions that can toggle, invert, or switch the checked flag for dynamic user interface updates or automated form handling scenarios. Use toggle actions to switch between true and false states, simulate user clicks, or programmatically manage checkbox selection status in code.
</div>

#### Example

    <input id="checkbox" />
    <button id="toggle">Toggle</button>

    <script>
        $("#checkbox").kendoCheckBox()

        $("#toggle").on("click", function () {
            var checkboxInstance = $("#checkbox").data("kendoCheckBox");
            // toggle the checked state of the checkbox.
            checkboxInstance.toggle();
        });
    </script>

### destroy

Prepares the CheckBox for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the CheckBox element from DOM.


<div class="meta-api-description">
Safely remove a checkbox component by invoking a cleanup method that detaches all event listeners, clears associated data attributes, disposes internal resources, and recursively destroys any nested UI components to prevent memory leaks and ensure proper cleanup without deleting the actual checkbox element from the document structure. This approach helps manage component lifecycle, avoid dangling handlers, and maintain DOM integrity while disabling or resetting checkbox functionality in web applications.
</div>

#### Example

    <input id="checkbox" />

    <script>
        var checkboxInstance = $("#checkbox").kendoCheckBox().data("kendoCheckBox");
        checkboxInstance.destroy();
    </script>

### enable

Changes the enabled state of the CheckBox.


<div class="meta-api-description">
Control the interactive state of a checkbox by programmatically toggling its enabled or disabled condition, allowing developers to activate or deactivate the checkbox dynamically during runtime. Set or update the checkbox’s enabled status to make it responsive or unresponsive to user input, adjusting underlying properties such as DOM disabled flags, visual styles, internal component state, and accessibility attributes including ARIA roles. This method supports enabling, disabling, activating, deactivating, or controlling the checkbox interactivity on demand, ensuring synchronization between visual cues and functional behavior for accessible UI elements. Adjust checkbox states programmatically for use cases involving form validation, dynamic UI updates, conditional user input control, or accessibility compliance.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the CheckBox.

#### Example

    <input id="checkbox" />

    <script>
        var checkboxInstance = $("#checkbox").kendoCheckBox().data("kendoCheckBox");
        checkboxInstance.enable(false);
    </script>

## Events

### change

Fires when the checked state of the CheckBox is changed through user interaction.


<div class="meta-api-description">
Detect and respond to user interactions that toggle the checked state of a checkbox input by capturing events triggered when users manually change selections, enabling execution of custom handlers to update interfaces, synchronize data models, perform validations, or run conditional logic; distinguish these user-driven changes from programmatic modifications that do not emit similar events, ensuring precise handling of user input, state changes, toggle actions, and dynamic UI updates related to checkbox controls.
</div>

#### Event Data

##### e.checked `Object`

The checked state of the CheckBox.

##### e.sender `kendo.ui.CheckBox`

The widget instance which fired the event.

#### Example - handling the change event

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            change: function (e) {
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.checked);
            }
        });
    </script>
