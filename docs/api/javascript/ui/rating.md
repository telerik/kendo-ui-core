---
title: Rating
page_title: Configuration, methods and events of Kendo UI Rating
description: Get started with code examples for the jQuery Rating by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: rating
---

# kendo.ui.Rating

Represents the Kendo UI Rating. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### min `Number` *(default: 1)*

The value from which the Rating items will be rendered.


<div class="meta-api-description">
How do I set the starting value for my Kendo UI rating control? Set or adjust the initial minimum value for rendered rating elements, control the baseline or starting point of rating scales, define the lowest selectable or visible rating number, configure where rating items begin in rating components or interfaces, specify the minimum index or value for rating indicators, enable customization of rating range start, influence how rating items are indexed or displayed from a low threshold, set starting rating value for star or numeric ratings, control minimum rating bounds for UI rating controls, and manage the base number for rating rendering and user input scales.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 2,
            max: 6
        });
    </script>

### max `Number `*(default: 5)*

The value to which the Rating items will be rendered.


<div class="meta-api-description">
How do I set the maximum rating value in Kendo UI for jQuery? Set or configure the highest possible rating value to control the maximum score users can select and the total number of rating items displayed in the interface; adjust the upper limit for rating scales, define the top threshold for rating components, determine how many rating stars or symbols appear, specify the maximum rating count, and manage rating boundaries for user input through numeric settings that establish rating limits, rating range, or scoring caps for custom rating controls and user feedback rating systems.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 2,
            max: 6
        });
    </script>

### selection `String` *(default: "continuous")*

Specifies the selection behavior. The available options are:

*`continuous` - all items, starting from the first one, are marked as selected.
*`single` - a single item is marked as selected.


<div class="meta-api-description">
How to allow continuous selection of rating values in Kendo UI for jQuery? Control user rating input by configuring whether ratings are chosen as a continuous range from the first item onward or as a single isolated value, enabling options to set, switch, enable, or restrict selection modes between continuous multi-item selection or single-item selection to influence how users pick or change rating scores, stars, or values in rating interfaces, facilitating customization of selection behavior in rating components or feedback widgets.
</div>

#### Example - continuous selection

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            selection: "continuous"
        });
    </script>

### precision `String` *(default: "item")*

Specifies the precision with which an item is selected. The available options are:

*`item` - rate by selecting the whole item.
*`half` - rate by selecting half of the item or the whole item.


<div class="meta-api-description">
How do I set up half-step score selections in a Kendo UI rating input? Adjust the rating input accuracy by configuring the granularity to capture whole numbers or fractional steps, enabling users to rate in increments like full points or half points, fine-tune rating sensitivity, control rating step size, set precision to enable exact or half-step score selections, customize rating input detail level, determine whether ratings accept only integers or half values, configure rating increments for more precise user feedback, and manage how detailed users can express their ratings from coarse to fine-grained scales.
</div>

#### Example - item precision

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            precision: "item"
        });
    </script>

#### Example - half precision

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            precision: "half"
        });
    </script>

### tooltip `Boolean` *(default: true)*

The Rating displays the value of the item through the title attribute when it is hovered.

If `tooltip` is set to `false`, the widget will not display the value of the items when hovering over them.

The tooltips are not visible when the Rating is disabled.


<div class="meta-api-description">
How to enable tooltips for rating items in Kendo UI for jQuery? Control whether to show or hide each item's numeric or descriptive value as a hover tooltip or tooltip text in a rating interface, including enabling mouseover hints, configuring tooltip visibility, suppressing hover info, setting titles for rating items, and managing interactive or disabled states where tooltips may be automatically disabled or omitted.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            tooltip: false
        });
    </script>

### label `Boolean|Object` *(default: true)*

The Rating displays a label by default that shows the current value out of the max value `3 / 5`. If the widget does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

If `label` is set to `false`, the widget will not display the label.


<div class="meta-api-description">
How do I control the display of the rating value in a Kendo UI star rating? Control the display of the numeric score or value indicator in star ratings, number ratings, or other rating components, enabling configuration to show or hide the current rating value out of the maximum possible, with options to toggle visibility for empty or unselected ratings, customize whether the rating label appears dynamically when users select a score, disable the numerical label entirely, or configure how rating values are presented alongside icons for user feedback, score representation, or progress indication.
</div>

#### Example - disable the label

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            label: false
        });
    </script>

### label.template `String|Function`

The template for the label.


<div class="meta-api-description">
How to customize the label for each rating item in a Kendo UI Rating widget? Adjust and personalize the text or markup shown for each individual rating item, configure dynamic or static labels by supplying template strings with HTML or expressions, set custom formatting or content through functions returning text or markup, control how rating labels appear or behave, enable tailored labels for different rating values, create conditional or dynamic label displays for feedback scores, define how star ratings or numeric levels are described with custom templates, manipulate label output to fit design or localization needs, and format or generate rating item descriptions using programmable or string-based templates.
</div>

#### Parameters

##### value `Number`

The current value of the widget.

##### maxValue `Number`

The max value of the widget.

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the label.

#### Example - customize the label through the template option

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            label: { template: "<span>#=value# / #=maxValue# selected.</span>"  }
        });
    </script>

### selectValueOnFocus `Number` *(default: null)*

If the option is set, the widget will automatically select the specified item when the Rating receives focus and no previous value has been set.


<div class="meta-api-description">
How can I make Kendo UI rating widget automatically select a value when it gains focus? Control automatic selection of a rating or score value when the input or rating widget gains focus, enabling the first or default rating to be highlighted or chosen automatically if no prior selection exists, useful for improving user interaction by pre-selecting a value on focus, configuring focus behavior to highlight or set a rating value instantly, managing default selection state when users tab into or click on a rating interface, and customizing whether the rating component sets an initial selection on focus to streamline input or UI flow.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            selectValueOnFocus: 2
        });
    </script>

### itemTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the items of the Rating.


<div class="meta-api-description">
How do I customize the appearance of individual rating elements in Kendo UI for jQuery? Customize and control the appearance and rendering of individual rating elements by configuring templates that define how each rating icon, star, or label is displayed, enabling developers to set custom HTML, icons, text, or dynamic content for each item based on its data and position within the rating component, supporting functions or template strings for flexible rendering, styling, and behavior of rating items during initialization or runtime updates, allowing tailored visual feedback for user reviews, scores, or selection indicators.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            itemTemplate: "<i class='k-icon k-i-copy'></i>",
        });
    </script>

### selectedTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the selected state of the items.


<div class="meta-api-description">
How can I customize the appearance of selected rating elements in a Kendo UI rating widget? Control how selected rating elements are displayed by configuring templates that define the visual representation of chosen or active rating entries, enabling developers to customize or override default selected item styles, set unique icons or layouts for highlighted rating stars or symbols, apply custom designs when users pick or select rating values, and tailor the appearance of selected ratings within interactive rating interfaces or components.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            selectedTemplate: "<i class='k-icon k-i-close'></i>",
        });
    </script>

### hoveredTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the hovered state of the items.


<div class="meta-api-description">
How do I customize the appearance of rating stars when hovered over in Kendo UI for jQuery? Control and customize the appearance and layout of items when hovered over in rating components by defining a template that renders the hover state, enabling dynamic visual feedback when users mouse over rating elements; adjust the hover rendering, modify star or icon styles on hover, create custom hover effects, and tailor interactive states by setting templates that specify how rating items look under cursor interaction, supporting flexible styling and dynamic content display during hover events for enhanced user experience and UI responsiveness.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            hoveredTemplate: "<i class='k-icon k-i-close'></i>",
        });
    </script>

### enabled `Boolean` *(default: true)*

If set to `false`, the Rating will be:

* disabled and will not allow the user to change its state.
* excluded from the tab order and not receiving focus.
* will not submit its value if part of a form.


<div class="meta-api-description">
How do I programmatically enable or disable user interaction with a Kendo UI rating widget? Control interactive rating input availability, toggle user ability to modify star or point scores, enable or disable rating selection, set the rating widget’s active or inactive state, manage focus and keyboard navigation for rating controls, prevent rating changes and submission in forms, configure whether users can update or lock the rating value, control user interaction acceptance for rating components, disable or enable user feedback on rating widgets, adjust component interactivity and form participation for ratings.
</div>

#### Example - disable the Rating

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            enabled: false
        });
    </script>

### readonly `Boolean`*(default: false)*

If set to `true`, the Rating will:

* be in readonly state and will not allow the user to change its state.
* be included in the tab order and able to receive focus.
* submit data if part of a form.


<div class="meta-api-description">
How to make Kendo UI rating control non-editable but still focusable? Control the rating component to be non-editable yet still focusable and form-submittable by enabling a read-only mode that disables user input changes while preserving keyboard navigation and ensuring the selected rating value is included during form submission; configure the rating to prevent modification but allow focus and tab access, making it ideal for displaying fixed scores that must be submitted without allowing users to alter them interactively.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            readonly: true
        });
    </script>

### value `Number` *(default: null)*

Specifies the initial value of the Rating.

If a greater value than the max option is used, then the max value will be set.

If a value less than the min option is used, then the min value will be set.


<div class="meta-api-description">
How do I set the initial value in a Kendo UI rating component? Set or configure the initial score, starting rating, default value, or baseline rating displayed and controlled by the rating system or component, ensuring the input rating is automatically limited or clamped within a minimum and maximum range, enabling setting, adjusting, or initializing the first rating value shown, controlling the starting number for user feedback, star ratings, score defaults, or rating widgets with enforced boundaries to prevent out-of-range values.
</div>

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            value: 3
        });
    </script>

## Methods

### value

Gets or sets the value of the Rating.If the passed value is smaller/bigger than the min/max option, then the min/max value will be automatically selected.

> * The `value` method does not trigger select or change events. Those events are triggered by user interaction.


<div class="meta-api-description">
How to set the value of a Kendo UI rating component in code? Retrieve or update the numeric score or current selection of a rating component programmatically by getting or setting its value after setup, with automatic clamping to predefined minimum and maximum limits if out-of-range numbers are supplied. Control or access the rating level directly without triggering user event handlers like selection or change, useful for synchronizing or initializing rating states in code, adjusting scores, resetting ratings, or retrieving the current numerical rating quietly without invoking UI interaction events. This method enables precise numerical manipulation, configuration, and querying of star counts, rating levels, or score values within bounded ranges, supporting scenarios such as validation, dynamic updates, and silent state retrieval in rating widgets.
</div>

#### Parameters

##### value `Number`

The value to set.

#### Returns

`Number` The value of the Rating.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating({
            min: 1,
            max: 6,
        }).data("kendoRating");

        ratingInstance.value(3);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(ratingInstance.value());
    </script>

### enable

Changes the enabled state of the Rating.


<div class="meta-api-description">
How can I programmatically enable or disable user interactions with a Kendo UI rating input? Control whether the rating input is active or inactive by programmatically enabling or disabling user interactions, toggling the component’s responsiveness to clicks, taps, or key presses, setting the rating as read-only or interactive dynamically at runtime, managing input acceptance for validation workflows, or switching between editable and locked states to allow or block user rating changes and event handling.
</div>

#### Parameters

##### enable `Boolean`

Enables or disables the Rating.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating().data("kendoRating");
        ratingInstance.enable(false);
    </script>

### reset

Resets the value of the widget to `null` and removes selection.


<div class="meta-api-description">
How do I programmatically reset a Kendo UI rating component to its initial empty state? Reset, clear, or remove the current rating selection by programmatically setting the rating value to null, erasing any chosen stars or visual indicators, and returning the rating component to its initial empty or default state; use this method to undo user input, reset the rating back to no selection, clear all stars, or restore the component to a blank or unselected state instantly during interactions or form resets.
</div>

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating({
            min: 1,
            max: 6,
            value: 3
        }).data("kendoRating");

        ratingInstance.reset();
    </script>

### readonly

Changes the read-only state of the Rating.


<div class="meta-api-description">
How to make Kendo UI rating control read-only? Control the interactive state of a rating input to enable or disable user modifications dynamically, such as making the rating read-only to prevent changes or toggling between editable and locked modes without reloading the component. Manage user permissions to update scores or stars, programmatically set the rating control’s interactivity, configure whether users can submit new ratings, lock the rating display to avoid input, or switch the rating widget between active and disabled states that restrict or allow updating the current value on the fly.
</div>

#### Parameters

##### readonly `Boolean`

Defines whether the Rating will render in its read-only state.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating().data("kendoRating");
        ratingInstance.readonly(true);
    </script>

### destroy

Prepares the Rating for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks.

> The `destroy` method does not remove the Rating elements from DOM.


<div class="meta-api-description">
How to properly destroy a Kendo UI for jQuery rating widget to prevent memory leaks? Configure safe teardown or cleanup for a rating interface by detaching event listeners, clearing internal references, removing associated data attributes to prevent memory leaks, unregistering handlers, and releasing resources tied to the component before manually removing its DOM elements. Enable proper destruction of interactive rating controls to ensure no leftover bindings or memory consumption persists post component lifecycle, supporting controlled removal without automatic DOM node deletion. Manage cleanup routines for rating widgets by disabling events, clearing stored data, and freeing memory to maintain application performance and prevent dangling references during component disposal.
</div>

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating().data("kendoRating");
        ratingInstance.destroy();
    </script>

### setOptions

Sets the options of the Rating dynamically. Use this method if you want to enable/disable a particular feature/option.


<div class="meta-api-description">
How can I dynamically change the settings of a Kendo UI rating control at runtime? Update or modify rating control settings dynamically during runtime by configuring option key/value pairs to enable, disable, or customize features, adjust visual styles, behavior, or functionality without restarting or recreating the rating component; instantly apply new configurations, control interactive elements, and refresh the user interface and internal state for rating widgets to adapt appearance, responsiveness, or feature toggles on the fly.
</div>

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating({
            min:1,
            max: 6,
            value: 3
        }).data("kendoRating");

        ratingInstance.setOptions({ label: false });
    </script>

## Events

### change

Fires when the value of the Rating is changed through user interaction.


<div class="meta-api-description">
How do I detect when the user changes the rating value in a Kendo UI for jQuery widget? Detect and handle user-driven changes to rating values through mouse clicks, keyboard input, or touch interactions to update the UI dynamically, save new ratings, trigger events when users adjust ratings, respond to input events indicating rating modifications, listen for rating update actions initiated by users, manage feedback submission actions, enable real-time rating value tracking on interaction, distinguish user changes from programmatic modifications, and implement custom behaviors or data persistence in response to user rating adjustments.
</div>

#### Event Data

##### e.sender `kendo.ui.Rating`

The widget instance which fired the event.

##### e.target `jQuery`

The DOM element that triggered the change.

##### e.oldValue `Number`

The previous value of the widget.

##### e.newValue `Number`

The new value of the widget.

#### Example - handling the change event

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            change: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.target);
            }
        });
    </script>

### select

Fires when an item is selected through user interaction.


<div class="meta-api-description">
How do I detect when a rating choice is made in Kendo UI for jQuery? Capture and respond to user interactions when a rating choice is made, enabling detection of which rating item was picked, triggering event-driven updates, managing application state changes based on user feedback, handling selection events to execute custom logic or UI modifications, and receiving detailed event data for further processing or conditional workflows related to rating input.
</div>

#### Event Data

##### e.sender `kendo.ui.Rating`

The widget instance which fired the event.

##### e.target `jQuery`

The DOM element that triggered the event.

#### Example - handling the select event

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            select: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.target);
            }
        });
    </script>
