---
title: CheckBoxGroup
page_title: Configuration, methods and events of Kendo UI CheckBoxGroup
description: Get started with code examples for the jQuery CheckBoxGroup by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: checkboxgroup
---

# kendo.ui.CheckBoxGroup

Represents the Kendo UI CheckBoxGroup. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enabled `Boolean` *(default: true)*

Sets the enabled state of all checkboxes in the CheckBoxGroup.


<div class="meta-api-description">
How do I disable all checkboxes in a Kendo UI checkbox group at once? Control the interactive state of all checkboxes within a group by enabling or disabling user input, selection, focus, and toggling functionality for every checkbox at once. Configure or dynamically update whether the entire collection of checkboxes accepts clicks, changes, or keyboard navigation to prevent or allow users from modifying their checked status. Manage group-level activation, activation locking, and input permission across all contained checkbox elements to enforce disabled or enabled behavior consistently.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            enabled: false,
            items: [ "one", "two", "three" ]
        });
    </script>

### inputName `String`

The `name` attribute to be used for the checkbox inputs. If omitted, the `id` of the wrapper element will be used.


<div class="meta-api-description">
How do I set a custom input name for multiple checkboxes in a Kendo UI checkbox group? Specify or customize the HTML name attribute for checkbox inputs to control how multiple checkbox values are grouped, identified, and submitted in forms, enabling developers to set, configure, or override default input naming for grouping, form data binding, or consistent value submission across varied use cases, ensuring form inputs share the same name for grouping checkboxes, managing input names programmatically, or aligning with backend expectations for grouped checkbox data.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            inputName: "check-name"
        });
    </script>

### inputRounded `String` *(default: undefined)*

Sets a value controlling the border radius of the checkbox inputs. When `undefined` (the default), the theme controls the rounding. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"


<div class="meta-api-description">
How to set rounded corners for multiple checkboxes in Kendo UI CheckboxGroup? Adjust or configure the border radius, corner rounding, or curvature of multiple checkbox inputs within a group, enabling control over how rounded or sharp the checkbox corners appear by setting specific values or selecting predefined size options like small, medium, large, full, or none; this setting influences the visual style of checkbox elements at initialization and supports customization for user interface design, appearance tweaking, and consistent form elements styling across various user interaction contexts.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            inputRounded: "full"
        });
    </script>

### inputSize `String` *(default: undefined)*

Sets a value controlling the size of the checkbox inputs. When `undefined` (the default), the theme controls the size. Can also be set to the following string values:

- "small"
- "medium"
- "large"


<div class="meta-api-description">
How can I adjust the size of checkboxes in a Kendo UI checkbox group? Adjust and configure the size, scale, and visual appearance of checkbox inputs within a group, enabling developers to set small, medium, large, or default compact styling to control layout density, spacing, and input dimensions; customize input height, width, and spacing for responsive forms or interfaces requiring varied checkbox sizes and presentation modes to fit diverse UI design needs and user preferences.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            inputSize: "large"
        });
    </script>

### items `Array`

Array of items to be rendered as checkboxes in the CheckBoxGroup. If the array contains objects, their fields will be used for each checkbox configuration. If the array contains strings, those will be used as both value and label of the respective checkbox.


<div class="meta-api-description">
How do I add multiple checkboxes to a Kendo UI for jQuery CheckboxGroup control? Configure a list of selectable choices by providing an array of options to display as multiple checkboxes within a group; you can set these options using simple strings where each string acts as both the label and value, or supply an array of objects for more detailed checkbox properties and custom labels, enabling easy population, dynamic binding, or customization of the checkbox entries in forms, filters, or selection interfaces.
</div>

#### Example - items defined as array of strings

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });
    </script>

#### Example - items defined as array of objects

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Collection of key-value pairs that would be used to generate the attributes attached to each `k-checkbox-item` element.


<div class="meta-api-description">
How can I add custom attributes to each checkbox in a Kendo UI CheckBoxGroup? Configure individual checkboxes with custom HTML attributes by setting key-value pairs that apply data attributes, ARIA labels, test hooks, metadata tags, or any user-defined attributes to each checkbox element within a group. Enable attaching accessibility features, testing identifiers, or custom properties on every item, controlling element-level attribute customization in checkbox collections for enhanced semantics, automation, or data binding.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Any custom classes that should be attached to the `k-checkbox-item` element.


<div class="meta-api-description">
How to customize individual checkbox styles in Kendo UI for jQuery? Customize individual checkbox elements within a group by assigning one or multiple CSS classes to each item, enabling precise styling control, targeted DOM selection, or integration with testing frameworks through class-based selectors. Configure item-level class names for checkbox groups to apply unique visual styles, facilitate automated UI tests, or hook into custom CSS rules that distinguish specific checkboxes from others in the same collection. This supports setting, controlling, or modifying CSS class attributes on each checkbox item for enhanced flexibility in appearance and behavior across different user interface scenarios.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Defines whether the checkbox is enabled or not. By default all checkboxes are enabled.


<div class="meta-api-description">
How to enable specific checkboxes in a Kendo UI checkbox group? Control interactive states of individual checkboxes within a group by configuring their enabled or disabled status, allowing you to set specific items as selectable or non-selectable, toggle checkbox interactivity on a per-item basis, enable or disable options dynamically, manage which checkboxes users can check or uncheck, customize active versus inactive checkboxes, configure availability of choices in checkbox collections, set item-level responsiveness for grouping controls, and adjust which checkboxes are operable within multi-select inputs.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Determines whether the checkbox label content should be rendered as an HTML string or it should be encoded.


<div class="meta-api-description">
How to prevent XSS attacks in Kendo UI checkbox group labels? Control how checkbox group option labels handle HTML content by configuring whether item labels are rendered as raw HTML with markup like strong tag interpreted or encoded as plain text to prevent HTML injection and show literal tags. Enable or disable HTML rendering, sanitize label content, manage security concerns around markup injection, switch between displaying styled labels versus safe text, and configure encoding to safeguard against XSS risks while customizing label presentation in checkbox lists. Adjust rendering modes to interpret, escape, or display label code literally, ensuring proper display and protection based on application needs.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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
            }],
        });
    </script>

### items.label `String`

Specifies the label content for the checkbox.


<div class="meta-api-description">
How do I customize the labels for each checkbox in a Kendo UI CheckBoxGroup? Configure, set, or customize the visible text or content for each checkbox option within a group, including plain text labels, HTML formatting, or dynamic data bindings from your item source to control how each checkbox label appears in the UI, enabling precise display of option names, descriptions, or templated content for user selection interfaces.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Specifies the value for the checkbox.


<div class="meta-api-description">
How do I set custom values for items in a Kendo UI checkbox group? Set, configure, or control the underlying value for each checkbox option within a group to define what is submitted, bound, or compared during form interactions, enabling precise mapping between user selections and data models, supporting customized values for items in checkbox collections, managing form data binding, value comparison, and form submission payloads.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Specifies the label position according to its checkbox for all items in the widget. Accepts "before" and "after".


<div class="meta-api-description">
How to position labels in a Kendo UI checkbox group? Set or configure the position of labels in a group of checkboxes to appear on either the left or right side, control label alignment relative to checkboxes, adjust label placement to precede or follow each checkbox, customize label orientation in a checkbox group for UI layout preferences, position text labels before or after checkbox inputs, enable label placement on the left or right to match design requirements, determine label location around checkboxes to improve accessibility or user interface flow, shift label alignment for better visual grouping or reading order, set consistent label positioning in checkbox lists for form design, and control label order in checkbox components to optimize usability and appearance.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            labelPosition: "before"
        });
    </script>

### layout `String` *(default: "vertical")*

Specifies whether the checkboxes will be rendered one below the other ("vertical") or on the same line ("horizontal").


<div class="meta-api-description">
How do I stack multiple checkboxes vertically in a Kendo UI checkbox group? Configure the arrangement and orientation of multiple checkboxes by setting the group layout to vertical for stacking items one below another or horizontal for aligning checkboxes side by side in a single line, allowing control over whether checkboxes appear inline or in a column, managing the visual flow and grouping style for form inputs, toggle lists, selection panels, or options display to create vertical lists, horizontal rows, or inline checkbox groupings according to layout preferences, UI design needs, or responsive adjustments.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            layout: "horizontal"
        });
    </script>

### value `Array`*(default: [])*

The selected (checked) checkboxes values. Will also be used as a CheckBoxGroup widget value.


<div class="meta-api-description">
How to get selected values from Kendo UI checkbox group? Control, retrieve, or update which checkboxes are currently selected within a group, managing the checked states collectively for form inputs, user selections, or data binding scenarios; supports setting multiple selected values, tracking user choices, synchronizing model data, and programmatically changing or reading the active checked items in checkbox collections to handle selection state, form input values, or dynamic interaction within checkbox groups.
</div>

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            value: ["two", "one"]
        });
    </script>

## Methods

### checkAll

Selects or deselects all checkboxes in the group.


<div class="meta-api-description">
How can I programmatically select all checkboxes in a Kendo UI CheckBoxGroup? Toggle all checkboxes simultaneously by enabling select all or clear all functionality, programmatically setting every option's checked or unchecked state within a group, controlling bulk selection and deselection for checkbox collections, managing synchronized UI updates for multiple check inputs, and implementing mass toggle actions to facilitate user interactions with checkbox groups.
</div>

#### Parameters

##### select `Boolean`

Selects or deselects all checkboxes in the group.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.checkAll(true);
    </script>

### enable

Changes the enabled state of the CheckBoxGroup and all its checkboxes.


<div class="meta-api-description">
How to enable or disable an entire Kendo UI checkbox group in jQuery? Control the interactive state of a group of checkboxes by programmatically enabling or disabling the entire collection and all its individual boxes at once, toggling user input accessibility, setting the active or inactive status for multiple check options collectively, managing availability for selection, adjusting whether checkboxes within a container respond to user actions, turning checkbox group functionality on or off dynamically, configuring the group to accept or block input, and synchronizing the enabled or disabled state of all child checkbox elements simultaneously to ensure consistent user interface behavior and interaction control after initialization.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the CheckBoxGroup.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.enable(false);
    </script>

### enableItem

Changes the enabled state of the checkbox at a given index.


<div class="meta-api-description">
How can I dynamically enable or disable individual checkboxes within a Kendo UI checkbox group? Control the interactive state of individual checkboxes within a group by enabling or disabling specific items based on their position or index, allowing dynamic toggling of checkbox options whether to activate, deactivate, set as clickable, or make unclickable during runtime or user interaction flows, supporting use cases such as conditional selection control, access restriction per item, or programmatic updates to checkbox availability in forms, lists, or UI components that require selective enabling and disabling of options without affecting the entire group.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the checkbox.

##### index `Number`

The index of the checkbox to be enabled/disabled.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.enableItem(false, 1);
    </script>

### item

Returns the checkbox at the specified index.


<div class="meta-api-description">
How do I access a specific checkbox in a Kendo UI for jQuery CheckBoxGroup by its index number? Retrieve a checkbox element by its position in a group by index number, access and control individual checkboxes within a collection, get a reference to a checkbox at a specific numeric index for inspecting or changing properties, toggle the checked status, enable or disable checkboxes programmatically, manipulate or query checkbox attributes and event handlers dynamically, control selection states in checkbox lists using numeric access, update or read values from specific checkboxes inside a group, iterate through checkboxes by index to manage their settings and behavior easily.
</div>

#### Parameters

##### index `Number`

The index of the requested checkbox.

#### Returns

`jQuery` The checkbox at the specified index that has been requested.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        // The result can be observed in the DevTools(F12) console of the browser.
        console.log(checkGroup.item(1));
    </script>

### items

Returns all checkboxes in the CheckBoxGroup.


<div class="meta-api-description">
How do I get a list of all checkboxes in a Kendo UI checkbox group? Retrieve all checkbox elements contained within a group to iterate through each input, access references, read or modify their selected or checked states, attach event listeners, perform batch updates, enable or disable boxes, inspect the collection of checkbox controls, manipulate checkbox states collectively, configure group selections, or dynamically control and manage checkbox inputs in a container or form.
</div>

#### Returns

`jQuery` The checkboxes in the group.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        // The result can be observed in the DevTools(F12) console of the browser.
        console.log(checkGroup.items());
    </script>

### value

Gets or sets the value (the checked checkboxes) of the CheckBoxGroup. If some of the passed values are not present among the values of the checkboxes, those values will be disregarded. If passing an empty array, the value of the widget will be reset and the checked state will be removed from the selected checkboxes.

> * The `value` method does not trigger select or change events. Those events are triggered by user interaction.


<div class="meta-api-description">
How do I programmatically select specific items in a Kendo UI CheckBoxGroup control? Retrieve or update the selected items in a group of checkboxes by reading or assigning the current checked values; programmatically control which options are active by specifying valid values while ignoring invalid entries, clear all selections by setting an empty list, and manage the state of checkbox groups without triggering user interaction events, enabling seamless querying, setting, resetting, or synchronizing checkbox selections through code without emitting selection or change notifications.
</div>

#### Parameters

##### value `Array`

The value to set.

#### Returns

`Array` Array of the selected values in the CheckBoxGroup, if any.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.value(["two", "one"]);
        // The result can be observed in the DevTools(F12) console of the browser.
        console.log(checkGroup.value());
    </script>

## Events

### change

Fires when checking or unchecking a checkbox in the widget through user interaction.


<div class="meta-api-description">
How can I detect when individual checkboxes in a group change state? Detect and handle user interactions with grouped checkboxes, capturing when individual checkboxes are toggled on or off via mouse clicks or keyboard input, triggering event-driven updates to application state, UI elements, form validation, or business logic, differentiating between user-initiated changes versus programmatic modifications, enabling real-time response to checkbox selection changes, change detection for multiple checkbox controls, monitoring checked or unchecked states, and implementing dynamic behaviors based on user checkbox actions within a set of related options.
</div>

#### Event Data

##### e.sender `kendo.ui.CheckBoxGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="checkbox">` element that triggered the change.

#### Example - handling the change event

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            change: function (e) {
                // The result can be observed in the DevTools(F12) console of the browser.
                console.log(e.target);
            }
        });
    </script>

### focus

Fires when a checkbox in the CheckBoxGroup is focused through user interaction.


<div class="meta-api-description">
How do I detect when a checkbox in a Kendo UI for jQuery CheckBoxGroup gains focus? Detect when a checkbox within a group gains user-initiated focus through keyboard, mouse, or touch interaction to manage UI updates, accessibility features, keyboard navigation flows, input validation triggers, or user behavior tracking. Capture focus events activated by users to enable responsive interface adjustments, improve usability, enable focus styling, handle focus-related logic, and integrate event-driven analytics within checkbox collections.
</div>

#### Event Data

##### e.sender `kendo.ui.CheckBoxGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="checkbox">` element that triggered the change.

#### Example - handling the change event

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            focus: function (e) {
                // The result can be observed in the DevTools(F12) console of the browser.
                console.log(e.target);
                console.log("The old checked state of the checkbox --> " + e.target.val() + "  " + e.target[0].checked);
                setTimeout(function(){
                  console.log("The new checked state of the checkbox --> " + e.target.val() + "  " + e.target[0].checked);
                })
            }
        });
    </script>

### select

Fires when a checkbox input is clicked to be selected through user interaction. If prevented, the clicked input will not be checked/unchecked.


<div class="meta-api-description">
How can I prevent checkbox selection in Kendo UI for jQuery before it changes? Capture, intercept, or handle user checkbox selections within checkbox groups by listening to events triggered on input clicks before the selection state changes, enabling you to validate, confirm, cancel, block, override, or customize checkbox toggling behavior during selection attempts. This event fires when users interact with checkbox inputs, allowing control over whether boxes get checked or unchecked by using preventable event patterns and custom logic to enforce rules, validation, or confirmation prompts prior to any changes. Ideal for implementing pre-selection validation, conditional checks, custom selection workflows, or dynamic enabling/disabling of checkboxes based on user input or application state.
</div>

#### Event Data

##### e.sender `kendo.ui.CheckBoxGroup`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the input select action. The widget will retain the previously selected value (if any).

##### e.target `jQuery`

The `<input type="checkbox">` element that triggered the event.

#### Example - handling the select event

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            select: function (e) {
                if(e.target.val() === "two") {
                    // Prevent selection if clicking on the "two" checkbox
                    e.preventDefault();
                }
            }
        });
    </script>
