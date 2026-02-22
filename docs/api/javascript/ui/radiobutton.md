---
title: RadioButton
page_title: Configuration, methods and events of Kendo UI RadioButton
description: How to quickly configure the checked and unchecked state of RadioButton widget.
res_type: api
component: radiobutton
---

# kendo.ui.RadioButton

Represents the Kendo UI RadioButton. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the RadioButton.


<div class="meta-api-description">
How can I programmatically check if a radio button in Kendo UI is currently selected? Control or retrieve the selected state of a radio button, toggle whether it is chosen or active, initialize it as selected or unselected, check its current state, update the selection programmatically, bind data to reflect or modify its chosen status, query if the radio button is selected, set or get if it is checked, and manage user input selection within form controls or interfaces using radio options.
</div>

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false`, the RadioButton will be disabled and will not allow the user to change its checked state.


<div class="meta-api-description">
How do I disable user interaction with a radio button in Kendo UI for jQuery? Configure or set the interactive state of a radio button to accept or block user input, enabling or disabling toggling functionality, controlling whether the radio option can be selected or changed, managing component states for user interaction permissions, activating or deactivating the control to respond to clicks or taps, and specifying if the radio element is interactive, locked, or read-only to prevent changes in selection during initialization or runtime.
</div>

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            enabled: false
        });
    </script>

### encoded `Boolean` *(default: true)*

Determines whether the radio label content should be rendered as an HTML string or it should be encoded.


<div class="meta-api-description">
How do I prevent cross-site scripting in Kendo UI radio button labels? Control label rendering by toggling between raw HTML output and HTML-encoded text to either enable innerHTML display or prevent cross-site scripting by encoding special characters; configure whether labels are parsed as safe HTML or treated as plain text, allowing developers to set encoding for labels in radio buttons, manage security through HTML escaping, handle injection risks, and customize label presentation by enabling or disabling HTML decoding.
</div>

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            label: "<strong>Label one</strong>",
            encoded: false
        });
    </script>

### label `String`

Specifies the label content for the radio.


<div class="meta-api-description">
How do I change the label next to a radio button in Kendo UI for jQuery? Set or update the visible text, caption, or title displayed next to a radio button to define or change its descriptive label, including static strings, dynamically bound content, or programmatically modified values for user interface elements, selection options, or form controls, enabling customization and real-time updates of radio option names, tags, or identifiers for enhanced accessibility, clarity, and user interaction in web or application forms.
</div>

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            label: "Label one"
        });
    </script>

### size `String` *(default: undefined)*

Sets a value controlling the size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"


<div class="meta-api-description">
How to adjust the size of radio buttons in Kendo UI for jQuery? Adjust or configure the button dimensions, scale, or visual size to fit different form layouts, user interface density, or display preferences with options for small, medium, large, or default sizing, enabling control over how compact or spacious radio buttons appear in your UI design, allowing developers to set or change the interactive element’s scale for better alignment with surrounding components and overall user experience.
</div>

#### Example

    <input id="radio" />
    <script>
    $("#radio").kendoRadioButton({
        size: "large"
    });
    </script>

## Methods

### check

Gets or sets the checked state of the RadioButton.


<div class="meta-api-description">
How can I programmatically check if a radio button is selected in Kendo UI? Programmatically retrieve or update the selected state of a radio button control, allowing developers to check if a button is currently selected, toggle its selection status, set it as checked or unchecked through code, bind the selection value to data models, synchronize the checked state across UI elements, control radio group selections dynamically, query or modify selection states, enable automated form interactions, and manage user input selections efficiently.
</div>

#### Parameters

##### check `Boolean`

Checks or unchecks the RadioButton.

#### Returns

`Boolean` - The checked state of the RadioButton.

#### Example

    <input id="radio" />

    <script>
        var radioInstance = $("#radio").kendoRadioButton().data("kendoRadioButton");
        radioInstance.check(true);
    </script>

### toggle

Toggles the checked state of the RadioButton.


<div class="meta-api-description">
How do I programmatically toggle the checked state of a radio button in Kendo UI for jQuery? Programmatically switch or flip a radio button’s selected or checked state to change its current status, simulate user interaction, update the selection dynamically, enable toggling between checked and unchecked conditions, control the checked state through code, perform state inversion, handle external event-driven updates, and mimic user clicks by toggling the component’s active or selected flag.
</div>

#### Example

    <input id="radio" />
    <button id="toggle">Toggle</button>

    <script>
        $("#radio").kendoRadioButton()

        $("#toggle").on("click", function () {
            var radioInstance = $("#radio").data("kendoRadioButton");
            // toggle the checked state of the radio.
            radioInstance.toggle();
        });
    </script>

### destroy

Prepares the RadioButton for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the RadioButton element from DOM.


<div class="meta-api-description">
How do I properly clean up event listeners and resources when removing a Kendo UI RadioButton? clean up event listeners, detach handlers, release memory, remove jQuery data associations, clear internal state, prevent memory leaks, dispose child components, unlink nested UI widgets, prepare radio button for removal, safely teardown UI elements, clean bindings before DOM removal, reset component state, unregister events and data linked to the element prior to deletion, free resources related to radio button and its children without deleting the HTML element itself, ensure proper cleanup of event handlers and data caches for UI controls.
</div>

#### Example

    <input id="radio" />

    <script>
        var radioInstance = $("#radio").kendoRadioButton().data("kendoRadioButton");
        radioInstance.destroy();
    </script>

### enable

Changes the enabled state of the RadioButton.


<div class="meta-api-description">
How do I dynamically enable or disable a radio button in Kendo UI? Activate or deactivate a radio button dynamically during application runtime to control user input and interaction, toggle the selectable state programmatically, switch the component on or off to manage form usability and focus behavior, set the enabled or disabled state to allow or block user selection, and modify the interactivity of radio options on the fly for responsive UI control and accessibility management.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the RadioButton.

#### Example

    <input id="radio" />

    <script>
        var radioInstance = $("#radio").kendoRadioButton().data("kendoRadioButton");
        radioInstance.enable(false);
    </script>

## Events

### change

Fires when the checked state of the RadioButton is changed through user interaction.


<div class="meta-api-description">
How do I detect when a radio button's checked state changes in Kendo UI for jQuery? Listen for user-driven toggles or selection updates when a radio button's checked state changes, enabling detection of user interaction, handling state synchronization, updating interface elements, performing validation, or triggering logic on selection shifts. Capture events triggered by user input on radio controls to respond to changes in choice, option switching, or selection toggling, with access to event context for implementing dynamic UI updates, form processing, or application state management after user-initiated changes.
</div>

#### Event Data

##### e.checked `Object`

The checked state of the RadioButton.

##### e.sender `kendo.ui.RadioButton`

The widget instance which fired the event.

#### Example - handling the change event

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            change: function (e) {
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.checked);
            }
        });
    </script>
