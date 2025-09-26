---
title: RadioGroup
page_title: Configuration, methods and events of Kendo UI RadioGroup
description: Get started with code examples for the jQuery RadioGroup by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: radiogroup
---

# kendo.ui.RadioGroup

Represents the Kendo UI RadioGroup. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enabled `Boolean` *(default: true)*

Sets the enabled state of all radio buttons in the RadioGroup.


<div class="meta-api-description">
Control whether all radio buttons within a group are active or inactive, toggling their interactive state to enable or disable user selection, focus reception, and programmatic interaction; set the entire group as selectable or non-selectable, manage the enabled status globally to prevent or allow changes, and configure the radio inputs to be responsive or locked based on true/false settings affecting accessibility and input handling across the set.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            enabled: false,
            items: [ "one", "two", "three" ]
        });
    </script>

### inputName `String`

The `name` attribute to be used for the radio inputs. If omitted, the `id` of the wrapper element will be used.


<div class="meta-api-description">
Set or customize the HTML name attribute for radio button groups to control how multiple radio inputs are grouped together, ensure proper form data submission, manage shared selection states across radio options, and configure grouping behavior. Developers often look to assign or override the input name for grouped radio elements to enable form serialization, manage mutually exclusive selections, coordinate radio button groups within forms, and handle identification for event handling or form processing. This attribute is essential for grouping radios so only one option can be selected at a time, defining the name used during data submission, or aligning input names for consistent behavior across dynamic or linked radio sets.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            inputName: "radioName"
        });
    </script>

### inputSize `String` *(default: 'medium')*

Sets a value controlling the size of the radio inputs. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- null


<div class="meta-api-description">
Adjust the size, scale, and spacing of radio button inputs within grouped selections by configuring small, medium, or large visual sizes, enabling control over compactness or prominence of individual radio options. Customize, set, or enable different input dimensions for radio groups to achieve desired user interface density or accessibility requirements, supporting varied layouts, responsiveness, and user preferences for input element sizing in forms or selection controls.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            inputSize: "large"
        });
    </script>

### items `Array`

Array of items to be rendered as radio buttons in the RadioGroup. If the array contains objects, their fields will be used for each radio button. If the array contains strings, those will be used as both value and label of the respective radio button.


<div class="meta-api-description">
Configure or set the collection of selectable radio button options by providing an array of values or objects, enabling dynamic control over which choices appear within a group of mutually exclusive selections; this includes defining labels, values, and metadata for each option, supporting scenarios where you want to customize displayed text, underlying values, or both, whether through simple strings or more complex structures that specify multiple properties for each radio control.
</div>

#### Example - items defined as array of strings

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
        });
    </script>

#### Example - items defined as array of objects

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "Label one"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### items.attributes `Object`

Collection of key-value pairs that would be used to generate the attributes attached to each `k-radio-item` element.


<div class="meta-api-description">
Configure or set custom HTML attributes on each radio button item within a group by specifying key-value pairs that apply to every radio element, enabling addition of data attributes, ARIA roles for accessibility, unique IDs, CSS classes for styling, or other custom properties for enhanced control, styling, accessibility, data binding, automation identification, and integration with testing or custom scripts across all radio options in a selection list.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "Label one",
                attributes: {
                    "data-test": "custom"
                }
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### items.cssClass `String`

Custom class that would be set on the respective `k-radio-item` element.


<div class="meta-api-description">
Customize individual radio button styles by assigning specific CSS classes to each radio option to control appearance, add unique selectors for styling or testing, target particular items with class names for DOM manipulation, apply per-item styling rules, enable conditional formatting on radio buttons, set custom class identifiers for accessibility or automation, use distinct CSS identifiers for specific radio inputs, configure individual radio elements with custom styles or hooks, and facilitate precise UI adjustments or automated test selectors within radio groups.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "Label one",
                cssClass: "custom-class"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Defines whether the radio button is enabled or not. By default all radio buttons are enabled.


<div class="meta-api-description">
Control the interactive state of individual options within a group of radio buttons by configuring whether each choice is selectable, focusable, or disabled, enabling developers to activate or deactivate specific radio items for customized user input control, managing availability and user interaction on a per-item basis within radio groups, toggling enabled or disabled status to dynamically control user selection possibilities, handling enabling and disabling behaviors of radio controls for tailored form experiences, adjusting which radio buttons users can focus on or select, and setting active or inactive states for each radio entry in the group.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "Label one",
                enabled: false
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### items.encoded `Boolean` *(default: true)*

Determines whether the radio button label content should be rendered as an HTML string or it should be encoded.


<div class="meta-api-description">
Configure radio button label rendering to either display raw HTML content or automatically encode text to escape HTML tags, special characters, and entities for security and XSS prevention. Enable or disable HTML encoding on individual radio items to control label output formatting, sanitize input, prevent injection attacks, or customize label presentation using rich HTML markup within radio groups. Manage escaping behavior for radio option labels to suit use cases requiring safe text display versus rendered HTML content in forms or UI components.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "<strong>Label one</strong>",
                encoded: false
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### items.label `String`

Specifies the label content for the radio button.


<div class="meta-api-description">
Configure or customize the text, display name, caption, or visible title shown next to each radio button option in a group selection component, enabling control over the label content for individual radio choices, setting or modifying the textual or display information users see for each selectable item, specifying the descriptive text or tag associated with each radio option to enhance clarity and usability in forms or interfaces that use grouped radio inputs.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "<strong>Label one</strong>"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### items.value `String`

Specifies the value for the radio button.


<div class="meta-api-description">
Set or configure the selection identifier for individual radio button options within a group, enabling binding, model updates, or form data submission by assigning specific values that can be primitives or complex objects representing the chosen option; useful for controlling which radio button is active, capturing user selection, managing state, handling form inputs, and differentiating options in dynamic or static radio button lists.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [{
                value: "one",
                label: "<strong>Label one</strong>"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three",
                label: "Label three"
            }]
        });
    </script>

### labelPosition `String` *(default: "after")*

Specifies the label position according to its radio button for all items in the widget. Accepts "before" and "after".


<div class="meta-api-description">
Control the placement of labels relative to their radio buttons by configuring whether labels appear before or after each option in a radio button group, enabling customization of label alignment or order across all choices, with settings to position text preceding or following the selectable input elements, ideal for adjusting layout preferences, accessibility considerations, or UI consistency in forms and selection components.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            labelPosition: "before"
        });
    </script>

### layout `String` *(default: "vertical")*

Specifies whether the radio buttons will be rendered one below the other ("vertical") or on the same line ("horizontal").


<div class="meta-api-description">
Control the arrangement and orientation of selectable options by configuring how radio buttons are displayed either stacked vertically, aligned horizontally inline, laid out in a row or column format, or organized to optimize user interface layout and spacing. Set or adjust the layout style to manage whether choices appear one below another or side by side, enabling customization of stacking order, inline grouping, alignment, flow direction, and display style for interactive selection controls.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            layout: "horizontal"
        });
    </script>

### value `String`

The selected (checked) radio button value. Will also be used as a RadioGroup widget value.


<div class="meta-api-description">
Control or retrieve the currently selected option's value in a group of radio inputs, enabling binding, reading, updating, or programmatic selection changes; supports form handling, data synchronization, and dynamic selection states by managing which radio button is checked and reflecting that choice as the group's active value for use in user input processing, form submissions, UI state monitoring, and event-driven interfaces.
</div>

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            value: "two"
        });
    </script>

## Methods

### enable

Changes the enabled state of the RadioGroup and all its radio buttons.


<div class="meta-api-description">
Control or toggle the interactive state of a group of radio buttons or form inputs by programmatically enabling or disabling user interaction, activating or deactivating selection options within a set of radio controls, locking or unlocking input fields to prevent or allow user clicks and changes, managing form control accessibility during data processing or asynchronous tasks, and dynamically switching the enabled state of radio button groups to control whether users can make selections or submit choices.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the RadioGroup.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        radioGroup.enable(false);
    </script>

### enableItem

Changes the enabled state of the radio button at a given index.


<div class="meta-api-description">
Activate, deactivate, toggle, or set the enabled state of an individual radio button within a group by specifying its position or index, allowing control over user selection, interactivity, or availability of particular options dynamically without rebuilding or resetting the entire group; this method supports use cases like disabling specific choices based on conditions, enabling previously unavailable options, managing form inputs programmatically, and updating selection control responsiveness during runtime.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the radio button.

##### index `Number`

The index of the radio button to be enabled/disabled.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        radioGroup.enableItem(false, 1);
    </script>

### item

Returns the radio button at the specified index. If the index is not specified, the selected index will be used.


<div class="meta-api-description">
Retrieve or access individual radio buttons within a group by specifying their position or index, enabling precise control over selection and manipulation; obtain the currently selected radio button without an index, fetch a button by its order number, or programmatically reference specific radios for event handling, styling, or value retrieval in forms and user interfaces.
</div>

#### Parameters

##### index `Number`

The index of the requested radio button.

#### Returns

`jQuery` The radio button at the specified index that has been requested.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        // The result can be observed in the DevTools(F12) console of the browser.
        console.log(radioGroup.item(1));
    </script>

### items

Returns all radio buttons in the RadioGroup.


<div class="meta-api-description">
Retrieve or manipulate the collection of radio button elements within the group to iterate through all selectable options, access individual radio inputs, query or filter items based on value or state, update checked or disabled statuses, attach event listeners for user interaction, modify labels or attributes dynamically, control which option is selected programmatically, and perform DOM or UI changes to the radio options in forms or interfaces. This covers tasks like fetching all radio buttons, listing available choices, querying radio inputs by criteria, toggling enabled states, setting or getting current selection, binding events to radios, and updating options or visibility dynamically.
</div>

#### Returns

`jQuery` The radio buttons in the group.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        // The result can be observed in the DevTools(F12) console of the browser.
        console.log(radioGroup.items());
    </script>

### value

Gets or sets the value (the checked radio button) of the RadioGroup. If the passed value is not present among the values of the radio buttons, the value would not changed. If passing `null`, the value of the widget will be reset and the checked state will be removed from the selected radio input.

> * The `value` method does not trigger select or change events. Those events are triggered by user interaction.


<div class="meta-api-description">
Retrieve or update the currently selected option in a group of radio buttons, controlling which radio input is checked or unchecked programmatically. This functionality enables reading the active radio button’s value, assigning a new selection by value, resetting the selection to none, and managing selection states without triggering user input events like change or select. This method supports scenarios where you need to programmatically set, get, clear, or manipulate the checked state of radio inputs within a grouped selection context while maintaining synchronicity with form controls and user interface components.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the RadioGroup (the value of the checked radio button), if any.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        radioGroup.value("two");
        // The result can be observed in the DevTools(F12) console of the browser.
        console.log(radioGroup.value());
    </script>

## Events

### change

Fires when the selected radio input in the RadioGroup is changed through user interaction.


<div class="meta-api-description">
Detect user-driven selection changes in grouped radio buttons, handle events triggered specifically by manual clicks or keyboard inputs on radio options, listen for updates when users switch choices within a radio group, respond to selection modifications caused by interactive input rather than code updates, manage state transitions, perform validation checks, or initiate UI adjustments seamlessly when the chosen radio input changes due to direct user actions.
</div>

#### Event Data

##### e.sender `kendo.ui.RadioGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="radio">` DOM element that triggered the change.

##### e.oldValue `String`

The previous value of the widget.

##### e.newValue `String`

The new value of the widget.

#### Example - handling the change event

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            change: function (e) {
                // The result can be observed in the DevTools(F12) console of the browser.
                console.log(e.target);
                // The result can be observed in the DevTools(F12) console of the browser.
                console.log("Old value: " + e.oldValue);
                // The result can be observed in the DevTools(F12) console of the browser.
                console.log("New value: " + e.newValue);
            }
        });
    </script>

### focus

Fires when a radio input in the RadioGroup is focused through user interaction.


<div class="meta-api-description">
Detect when a radio button within a group gains focus from keyboard navigation, mouse click, or touch input to handle focus styling, control keyboard accessibility, manage validation triggers on focus, and update user interface or ARIA attributes accordingly. Capture focus events on radio inputs to respond to focus shifts, enable custom focus management, enhance navigation flow, and dynamically adjust visual or accessibility states as users interact with the radio options.
</div>

#### Event Data

##### e.sender `kendo.ui.RadioGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="radio">` DOM element that triggered the change.

#### Example - handling the change event

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            focus: function (e) {
                // The result can be observed in the DevTools(F12) console of the browser.
                console.log(e.target);
            }
        });
    </script>

### select

Fires when a radio input is clicked to be selected through user interaction. If prevented, the clicked input will not be selected.


<div class="meta-api-description">
Capture and handle user selection events from radio button groups, detect when a radio option is chosen or clicked, intercept selection changes to perform validation or conditional logic, enable or disable selections dynamically, update UI or application state based on user input, listen for changes in selected radio inputs, control or prevent user selections programmatically, manage interaction events within radio groups for custom behaviors, respond to selection triggers to synchronize form data or feedback, and integrate event handlers that react to radio option selection changes in interactive components.
</div>

#### Event Data

##### e.sender `kendo.ui.RadioGroup`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the input select action. The widget will retain the previously selected input (if any).

##### e.target `jQuery`

The `<input type="radio">` DOM element that triggered the event.

#### Example - handling the select event

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            select: function (e) {
                if(e.target.val() === "two") {
                    // Prevent selection if clicking on the "two" radio button
                    e.preventDefault();
                }
            }
        });
    </script>
