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
