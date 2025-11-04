---
title: RangeSlider
page_title: Configuration, methods and events of Kendo UI RangeSlider
description: Easy configuration guide for the Range Slider widget and methods to enable/disable, set start and end value, or safely remove the widget from the DOM.
res_type: api
---

# kendo.ui.RangeSlider

Represents the Kendo UI RangeSlider widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### largeStep `Number`*(default: 5)*

The delta with which the value will change when the user presses the Page Up or Page Down key (the drag
handle must be focused). Note: The allied `largeStep` will also set large tick for every large step.


<div class="meta-api-description">
How to configure large step size for Kendo UI RangeSlider when using keyboard shortcuts? Configure the step size for large incremental movements when using keyboard shortcuts like Page Up and Page Down to adjust slider values, enabling control over how much the value increases or decreases with each key press. Set or customize the jump interval for faster navigation through ranges, manage larger value changes on key events, and synchronize the slider’s step increments with visual ticks or markers for easier tracking. Enable precise or coarse adjustments, configure keyboard-driven jumps, set the magnitude of value changes per page step, and control the frequency of large ticks displayed along the slider scale for enhanced usability.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            largeStep: 10,
            min: 0,
            max: 100,
            selectionStart: 20,
            selectionEnd: 60
        });
    </script>

### leftDragHandleTitle `String`*(default: "drag")*

The title of the left drag handle of the **RangeSlider**.


<div class="meta-api-description">
How can I customize the accessibility label for the left handle of a Kendo UI range slider? Set or customize the tooltip text, accessible label, or screen reader description for the left thumb or drag handle of a range slider control to improve accessibility, enable clearer keyboard navigation cues, provide assistive technology support, configure hover titles, or control the element’s title attribute related to the slider’s left handle for enhanced user experience and compliance with accessibility standards.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            leftDragHandleTitle: "Start Value",
            rightDragHandleTitle: "End Value",
            selectionStart: 20,
            selectionEnd: 60
        });
    </script>

### max `Number`*(default: 10)*

The maximum value of the **RangeSlider**.


<div class="meta-api-description">
How do I set the maximum value for a Kendo UI RangeSlider control? Define or adjust the maximum selectable value or upper bound for the slider control, set limits for the highest possible input range, configure or constrain the greatest numerical selection users can choose, control the slider’s top range endpoint, enforce maximum allowable values for range selection, specify highest value limits, set the cap or ceiling for the range input, restrict maximum slider handles movement, establish maximum thresholds for interactive range inputs, and manage the upper extremity of input ranges within a slider component.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            min: 0,
            max: 200,
            selectionStart: 50,
            selectionEnd: 150
        });
    </script>

### min `Number`*(default: 0)*

The minimum value of the **RangeSlider**.


<div class="meta-api-description">
How do I set the minimum value in a Kendo UI RangeSlider widget? Configure or set the minimum limit, lower bound, or starting point for numeric selection in a slider control, defining the least value users can choose within a range input component. Control or enforce the smallest allowable value, establish minimum range thresholds, and prevent selections below this floor when working with slider widgets or range inputs, often combined with maximum limits, current values, and step increments to constrain or manage selection intervals. Adjust or define the baseline numeric boundary for range sliders, range selectors, or input controls where users pick values between minimum and maximum, ensuring inputs do not drop below the specified lower threshold.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            min: 10,
            max: 100,
            selectionStart: 25,
            selectionEnd: 75
        });
    </script>

### orientation `String`*(default: "horizontal")*

The orientation of a **RangeSlider** - `"horizontal"` or `"vertical"`.


<div class="meta-api-description">
How to configure orientation of a Kendo UI RangeSlider component? Adjust the slider direction to display the range selector either horizontally or vertically, enabling control over the component’s layout orientation for vertical sliders, horizontal sliders, range input along the X-axis or Y-axis, configuring the display axis, setting up vertical scroll-like sliders, horizontal progress bars, or choosing slider alignment for user interface design, allowing developers to switch between horizontal and vertical range controls for flexible range input presentation and UI customization.
</div>

#### Example

    <div id="rangeslider" style="height: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            orientation: "vertical",
            min: 0,
            max: 100,
            selectionStart: 20,
            selectionEnd: 80
        });
    </script>

### rightDragHandleTitle `String`*(default: "drag")*

The title of the right drag handle of the **RangeSlider**.


<div class="meta-api-description">
How do I customize the tooltip title for the right drag handle in a Kendo UI RangeSlider control? Configure the hover tooltip text and accessibility label for the right handle or thumb of a dual-thumb slider control, enabling customization of the displayed title on mouseover and providing descriptive ARIA labels for screen readers to improve usability and accessibility. This setting lets you specify the label or title that appears when hovering over the right slider knob, helping users identify or understand the function of the right drag handle, and ensures support for assistive technologies by defining semantic descriptions for the right slider control element. Adjust, set, or control the tooltip content and accessible naming for the right slider thumb for enhanced user interaction, clarity, and compliance with accessibility standards.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            leftDragHandleTitle: "Minimum",
            rightDragHandleTitle: "Maximum",
            selectionStart: 10,
            selectionEnd: 80
        });
    </script>

### selectionEnd `Number`

The selection end value of the **RangeSlider**.


<div class="meta-api-description">
How do I set or get the end value of a numeric range selection in Kendo UI for jQuery? Control or retrieve the endpoint of a numeric range selection, adjusting the right or upper handle within minimum and maximum bounds to define the selection's limit, supporting runtime updates or initial configuration for dynamic range inputs, sliders, or dual-handle controls where precise selection end values are needed alongside start positions for filtering, value picking, or interactive UI elements.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            min: 0,
            max: 100,
            selectionStart: 25,
            selectionEnd: 75
        });
    </script>

### selectionStart `Number`

The selection start value of the **RangeSlider**.


<div class="meta-api-description">
How do I set the minimum value for a selectable range in Kendo UI RangeSlider? Set or get the lower limit, minimum value, or start point of a selectable range within a range slider control, enabling initialization, adjustment, or retrieval of the beginning boundary for active range selection, range selection start, or range slider minimum handle position, useful for configuring, controlling, updating, or reading the starting value of a user-defined range on a slider input component.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            min: 0,
            max: 100,
            selectionStart: 30,
            selectionEnd: 70
        });
    </script>

### smallStep `Number`*(default: 1)*

The small step value of the **RangeSlider**. The underlying value will be changed when the end
user (1) clicks on the increase or decrease buttons of the **RangeSlider**, (2) presses the
arrow keys (the drag handle must be focused), or (3) drags the drag handle.


<div class="meta-api-description">
What is the minimum step size for changing a RangeSlider's value with keyboard arrows? Adjust the smallest increment or minimum step size that changes the slider’s value when interacting through clicks, keyboard arrows, or dragging; set how much the value moves on fine adjustments, define precise value increments for control buttons or handle movement, customize sensitivity for small changes, enable snapping to specific intervals, and configure the minimal value jump for granular tuning of slider behavior during user input or keyboard navigation.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            smallStep: 2,
            largeStep: 20,
            min: 0,
            max: 100,
            selectionStart: 20,
            selectionEnd: 60
        });
    </script>

### tickPlacement `String`*(default: "both")*

Denotes the location of the tick marks in the **RangeSlider**. The available options are:


<div class="meta-api-description">
How to position tick marks on a Kendo UI range slider? Configure and control the positioning of tick marks or interval indicators on a range slider to visually represent value steps, specify whether ticks appear above, below, on both sides, or inside the slider track, and adjust the placement of these markers to enhance user interaction and clarity when selecting values. This setting enables customization of where ticks are rendered relative to the slider handle and track, allowing developers to set precise locations for ticks, improve readability, and tailor appearance for range inputs or selection bars. Whether you want to enable, disable, adjust, or fine-tune the display of tick marks for a slider component, controlling tick placement ensures that value intervals are clearly marked for better user feedback and interface design.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            tickPlacement: "topLeft",
            min: 0,
            max: 100,
            selectionStart: 25,
            selectionEnd: 75,
            smallStep: 5,
            largeStep: 25
        });
    </script>

#### *"topLeft"*

Tick marks are located on the top of the horizontal widget or on the left of
  the vertical widget.

#### *"bottomRight"*

Tick marks are located on the bottom of the horizontal widget or on the right side of the vertical widget.

#### *"both"*

Tick marks are located on both sides of the widget.

#### *"none"*

Tick marks are not visible.

### tooltip `Object`

Configuration of the **RangeSlider** tooltip.


<div class="meta-api-description">
How to customize tooltip in Kendo UI RangeSlider? Control how the selected range values are displayed through customizable tooltips that can be enabled or disabled, formatted with specific number or date styles, positioned relative to the slider handles, styled with custom templates or themes, and configured for visibility and content appearance during initialization or runtime to improve user interaction and feedback when adjusting slider ranges or selecting min and max values.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            tooltip: {
                enabled: true,
                format: "Value: {0}%"
            },
            min: 0,
            max: 100,
            selectionStart: 30,
            selectionEnd: 70
        });
    </script>

### tooltip.enabled `Boolean`*(default: true)*

Disables (**false**) or enables (**true**) the tooltip of the **RangeSlider**.


<div class="meta-api-description">
How can I show tooltips on Kendo UI RangeSlider handles during user interaction? Control the visibility of interactive value popups or tooltips on slider handles during user interaction, allowing configuration to show, hide, enable, disable, toggle, or display real-time numeric feedback of current slider positions and selected ranges while dragging or hovering. This setting manages whether tooltips appear dynamically with slider movements, providing immediate visual indicators of slider handle values for range inputs, adjustable during component setup to configure user interface feedback for range selection or numeric input controls.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            tooltip: {
                enabled: false
            },
            min: 0,
            max: 100,
            selectionStart: 25,
            selectionEnd: 75
        });
    </script>

### tooltip.format `String`*(default: "{0}")*

Format string for the text of the tooltip. Note: The applied format will also influence the appearance of
the **RangeSlider** tick labels.


<div class="meta-api-description">
How do I customize the format of values displayed in a Kendo UI RangeSlider tooltip? Customize how values appear in the slider’s tooltip by specifying format patterns to display numbers, dates, or other data types, enabling precise control over tooltip text during handle dragging or hovering. Configure numeric formats like decimals, percentages, or currency, as well as date and time styles to match your application's locale or design requirements. Adjust formatting to improve readability, user experience, and consistency between tooltip values and tick label displays on range selectors or sliders, supporting scenarios such as dynamic value previews, customized data representation, and enhanced UI clarity when interacting with range controls.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            tooltip: {
                format: "n2"
            },
            min: 0,
            max: 100,
            selectionStart: 12.345,
            selectionEnd: 67.890
        });
    </script>

### tooltip.template `String`

Template of the tooltip.

*   **selectionStart** - the current selectionStart.
*   **selectionEnd** - the current selectionEnd.


<div class="meta-api-description">
How do I customize the appearance of a Kendo UI RangeSlider tooltip? Control and customize the appearance and content of a slider tooltip by defining a flexible template to format, bind, or structure the displayed values, including dynamically inserting the current selection start and end points within the slider range; enable tailored tooltip formatting, custom layouts, and personalized label presentations that reflect the selected range boundaries for enhanced user feedback, allowing developers to adjust how selection values appear in real-time on the slider’s tooltip.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            tooltip: {
                template: (data) => `Range: ${data.selectionStart} - ${data.selectionEnd}`
            },
            min: 0,
            max: 100,
            selectionStart: 20,
            selectionEnd: 80
        });
    </script>

## Methods

### destroy

Prepares the **RangeSlider** for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
How do I properly remove a Kendo UI RangeSlider instance from my webpage? Remove or dismantle a range slider component instance from the webpage, ensuring all event listeners, data bindings, and internal references tied to the slider are completely cleared to prevent memory leaks and enable efficient garbage collection. Safely clean up and dispose of slider resources synchronously before element removal, disable functionality, detach handlers, and purge stored state to avoid residue in the DOM or lingering event hooks. Control proper destruction or teardown of interactive slider widgets by invoking a method that fully unregisters events, deletes associated metadata, and prepares the browser environment for optimal resource reclamation and avoidance of orphaned objects in memory.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $(document).ready(function() {
            $("#rangeslider").kendoRangeSlider();
            var rangeSlider = $("#rangeslider").getKendoRangeSlider();
  	    // deatach events
	    $("#rangeslider").data("kendoRangeSlider").destroy();

		// remove slider html from DOM
		$("#rangeslider").closest(".k-slider").remove();
        });
    </script>

### enable

Enable/Disable the **RangeSlider** widget.


<div class="meta-api-description">
How do I programmatically enable or disable a RangeSlider in Kendo UI for jQuery? Control activation and interactivity of a range selection slider by toggling its enabled state, allowing developers to set, enable, disable, or configure user input on the slider interface dynamically; this method manages whether users can adjust or interact with the slider handles, switching between active and inactive modes, triggering visual styling for disabled or enabled states, and supporting runtime changes to user interaction capabilities based on boolean flags or programmatic conditions.
</div>

#### Example

	<div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $(document).ready(function() {
            $("#rangeslider").kendoRangeSlider();
            var rangeSlider = $("#rangeslider").getKendoRangeSlider();
  	        // get a reference to the range slider widget
			var rangeSlider = $("#rangeslider").data("kendoRangeSlider");

			// disables the range slider
			rangeSlider.enable(false);

			// enables the range slider
			rangeSlider.enable(true);
        });
    </script>

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the **RangeSlider**.

### value

The value method gets or sets the values of the **RangeSlider**. It
accepts an array as parameter, and returns an object array with the start and end
selection values.


<div class="meta-api-description">
How do I dynamically update the selected range values of a Kendo UI RangeSlider? Get or set the current selected range values of a slider component by retrieving or updating the start and end positions programmatically; this method enables reading the slider’s active selection boundaries, adjusting the range dynamically, controlling or synchronizing slider values through code by passing or returning arrays representing the minimum and maximum selected points, accessing or modifying the value span within interactive range controls for user interfaces where range inputs need to be queried, assigned, or linked with application logic features.
</div>

#### Example

	<div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $(document).ready(function() {
            $("#rangeslider").kendoRangeSlider();
            var rangeSlider = $("#rangeslider").getKendoRangeSlider();
  	        rangeSlider.value([1, 5]);
        });
    </script>

#### Parameters

##### startEndArray `Array`

Array of two numbers—start and end.

#### Returns

`Array` The value of the RangeSlider.

### values

The values method gets or sets the start and end values of the **RangeSlider**. It
accepts either an an array as parameter or two parameters—start and end, and returns an object array with the start and end
selection values.


<div class="meta-api-description">
How do I dynamically set the minimum and maximum values of a Kendo UI RangeSlider? Accessing or modifying the selected range boundaries programmatically, adjusting or retrieving the start and end points, setting the minimum and maximum values dynamically, getting the currently chosen range as an array or object, updating range slider positions through code, controlling or configuring the slider’s low and high value handles, reading or changing selected intervals by providing paired inputs or arrays, extracting the range limits for validation or display, manipulating the range of selected values within a slider component, and querying or assigning the range selection boundaries for precise control in user interfaces.
</div>

#### Example

	<div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $(document).ready(function() {
            $("#rangeslider").kendoRangeSlider();
            var rangeSlider = $("#rangeslider").getKendoRangeSlider();
  	        rangeSlider.values(1, 5);
        });
    </script>

#### Parameters

##### selectionStart `Number`

The selection start value of the RangeSlider.

##### selectionEnd `Number`

The selection start value of the RangeSlider.

#### Returns

`Array` The value of the RangeSlider.

### resize

Adjusts the RangeSlider layout to match the size of the container.


<div class="meta-api-description">
How can I make Kendo UI range slider resize dynamically to fit its container changes? adjust the slider’s dimensions dynamically to fit container changes, reflow the range slider UI after layout or style updates, trigger recalculation of internal sizes and redraw visual elements without resetting settings, update the slider’s layout after programmatic resizing or when becoming visible from hidden state, control responsive resizing behavior of the range input component to ensure it matches the container size automatically or on demand, apply real-time resizing to synchronize the slider with parent element dimension changes, refresh the slider’s measurements and redraw its graphical track and handles after CSS or DOM modifications affecting size, invoke slider update methods to correct layout after window resizes or container adjustments, enable slider reflow for adaptive interfaces requiring dynamic dimension recalculation.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $(document).ready(function() {
            $("#rangeslider").kendoRangeSlider();
            var rangeSlider = $("#rangeslider").getKendoRangeSlider();
            rangeSlider.wrapper.css("width", "400px");
            rangeSlider.resize();
        });
    </script>

## Events

### change

Fires when the RangeSlider value changes as a result of selecting a new value with one of the drag handles or the keyboard.


<div class="meta-api-description">
How do I detect changes to slider values in Kendo UI RangeSlider? Capture and handle user-driven updates to slider values, including changes made by dragging handles or keyboard input, enabling real-time detection of adjustments to number ranges or intervals. This event-driven response supports syncing application state, triggering validation processes, updating data models, coordinating UI components, and executing callback logic whenever the user modifies the selected numerical range or slider positions. Monitor value shifts in interactive sliders for dynamic feedback, state management, or reactive programming workflows triggered by user input changes.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            change: function(e) {
                console.log("Range changed to:", e.value);
                console.log("Start value:", e.value[0]);
                console.log("End value:", e.value[1]);
            },
            min: 0,
            max: 100,
            selectionStart: 20,
            selectionEnd: 80
        });
    </script>

#### Event Data

##### e.value `Array`

Represents the updated array of values of the first and second drag handle.

### slide

Fires when the user drags the drag handle to a new position.


<div class="meta-api-description">
How do I detect continuous adjustments in a Kendo UI RangeSlider? Detect continuous slider adjustments and track handle dragging actions in real time as users interact with a range input, enabling live updates, dynamic value previews, or responsive UI feedback during handle movement; capture position changes, monitor slider thumb sliding, respond to drag events, and receive detailed event data to implement interactive features that reflect the current slider values instantly.
</div>

#### Example

    <div id="rangeslider" style="width: 200px;">
        <input />
        <input />
    </div>
    <script>
        $("#rangeslider").kendoRangeSlider({
            slide: function(e) {
                console.log("Sliding - current positions:", e.value);
                console.log("Start position:", e.value[0]);
                console.log("End position:", e.value[1]);
            },
            min: 0,
            max: 100,
            selectionStart: 30,
            selectionEnd: 70
        });
    </script>

#### Event Data

##### e.value `Array`

Represents an array of values of the current positions of the first and second drag handle.
