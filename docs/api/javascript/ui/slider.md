---
title: Slider
page_title: Configuration, methods and events of Kendo UI Slider
description: Configuration of Slider UI control, different methods, and events, triggered when the slider value changes upon specific conditions.
res_type: api
component: slider
---

# kendo.ui.Slider

Represents the Kendo UI Slider widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### decreaseButtonTitle `String`*(default: "Decrease")*

The title of the decrease button of the **Slider**.


<div class="meta-api-description">
How can I change the label on the decrease button of a Kendo UI slider? Adjust or customize the text label, tooltip, or accessibility description for the decrease control on a slider component, enabling you to set or configure the hover title, ARIA label, or screen reader-friendly name for the button that reduces the slider value, with options to personalize or localize the displayed prompt, assistive technology cues, and user interface hints for better clarity and usability when interacting with the decrement control element.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        decreaseButtonTitle: "Decrease Value",
        showButtons: true,
        min: 0,
        max: 100,
        value: 25
      });
    </script>

### dragHandleTitle `String`*(default: "drag")*

The title of the drag handle of the **Slider**.


<div class="meta-api-description">
How can I customize the tooltip text for the slider's drag handle? Configure or customize the tooltip text, hover label, or accessibility description for the slider drag handle or thumb by setting the drag handle’s title attribute. Control, set, or override the text shown on mouse hover or screen reader announcements for the slider’s draggable element to enhance usability, provide descriptive labels, and improve accessibility compliance. Enable descriptive tooltips, customize hover titles, and specify assistive text for the interactive slider handle commonly referred to as the thumb or drag grip.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        dragHandleTitle: "Slider Handle",
        min: 0,
        max: 100,
        value: 50
      });
    </script>

### increaseButtonTitle `String`*(default: "Increase")*

The title of the increase button of the **Slider**.


<div class="meta-api-description">
How do I customize the tooltip for the increment button in a Kendo UI slider? Set or customize the tooltip text, hover label, and accessible name for the slider’s increment button to improve usability, screen reader support, or user interface clarity. Control the descriptive title or alt text for the slider increase control to enable better accessibility, localization, or customized user guidance. Configure the label that appears when hovering over the slider’s increase button or that is read aloud by assistive technologies, enhancing user experience and accessibility compliance through flexible naming of the increment action.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        increaseButtonTitle: "Increase Value",
        showButtons: true,
        min: 0,
        max: 100,
        value: 75
      });
    </script>

### largeStep `Number`*(default: 5)*

The delta with which the value will change when the user presses the Page Up or Page Down key (the drag
handle must be focused). Note: `largeStep` will also set a large tick for every large step.

Must be a positive number, larger than [smallStep](/api/javascript/ui/slider#configuration-smallStep).


<div class="meta-api-description">
How do I set the large step increment for my Kendo UI slider to make it easier to navigate with page up/page down keys? Adjust or configure the slider's page navigation increment, defining how much the slider value moves when pressing Page Up or Page Down keys during keyboard focus; control the step size for large jumps, set the distance between major tick marks, ensure the value exceeds the smaller step increments, customize large step intervals for keyboard-driven adjustments, enable faster slider value changes with paged key presses, specify the numeric increment that governs page key navigation and visual large ticks, optimize slider movement granularity for accessibility and usability, define the significant stepping interval for keyboard input and slider scale, modulate large-step positioning for efficient slider control and accurate value snapping.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 100,
        smallStep: 1,
        largeStep: 10,
        value: 50,
        tickPlacement: "both"
      });
    </script>

### max `Number`*(default: 10)*

The maximum value of the **Slider**.


<div class="meta-api-description">
How do I set the maximum value limit for a Kendo UI slider control? Set or configure the maximum value limit, upper bound, or highest selectable number for a slider control to restrict user input or programmatic value assignment within a defined range, enabling control over the slider’s end point, maximum threshold, or top value alongside minimum and step constraints, useful for setting value ceilings, range boundaries, upper limits, maximum permitted values, or limiting the draggable or assignable numeric extent of the slider control component.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 200,
        value: 100,
        smallStep: 5
      });
    </script>

### min `Number`*(default: 0)*

The minimum value of the **Slider**.


<div class="meta-api-description">
What is the minimum value for Kendo UI slider input? Define or configure the minimum numeric value allowed for the slider input, setting the lowest boundary for user selection and validating the input range alongside maximum and step intervals to restrict or control the slider's value output, enabling range limits, value constraints, and input validation for numeric sliders across various implementations and interactive configurations.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: -50,
        max: 50,
        value: 0,
        smallStep: 2
      });
    </script>

### orientation `String`*(default: "horizontal")*

The orientation of a **Slider**: `"horizontal"` or `"vertical"`.


<div class="meta-api-description">
How to set the direction of a Kendo UI slider to horizontal or vertical? Set or configure the direction and layout of the slider control, enabling horizontal or vertical axis orientation to adjust slider movement, thumb navigation, keyboard and mouse interaction behavior, and visual alignment within user interfaces. Adjust the slider’s axis to control the direction of dragging, scrolling, or selection input, whether you need a sideways (left-right) or up-down control, affecting how users manipulate values with touch, mouse, or keyboard. Manage the component’s orientation to fit design layouts, switch between vertical and horizontal sliders, and optimize user experience and accessibility through directional input configuration.
</div>

#### Example

    <div style="height: 200px; width: 100px;">
      <input id="slider" />
    </div>
    <script>
      $("#slider").kendoSlider({
        orientation: "vertical",
        min: 0,
        max: 100,
        value: 30,
        smallStep: 5
      });
    </script>

### showButtons `Boolean`*(default: true)*

Can be used to show (**true**) or hide (**false**) the
increase and decrease buttons of a **Slider**.


<div class="meta-api-description">
How can I customize the arrow controls on my Kendo UI Slider to enable explicit step input? Customize the display of increment and decrement arrow controls for adjusting values, enabling or disabling visible step buttons that allow users to increase or decrease a slider’s setting explicitly; configure whether to show or hide these controls for precise value adjustments, toggling visual up/down buttons commonly used in compact interfaces or when explicit step input is needed, controlling the presence of arrows that facilitate manual increments and decrements in the slider component.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        showButtons: false,
        min: 0,
        max: 100,
        value: 40
      });
    </script>

### smallStep `Number`*(default: 1)*

The small step value of the **Slider**. Must be a positive number, otherwise an Javascript exception will be thrown.

The small step value determines the amount of Slider value change when the end user

* clicks on the increase or decrease buttons of the **Slider**;
* presses the arrow keys (the drag handle must be focused);
* drags the drag handle.


<div class="meta-api-description">
How do I adjust the incremental change amount for Kendo UI slider controls during fine-grained user interactions? Adjust the incremental change amount for slider controls during fine-grained user interactions such as clicking increase/decrease buttons, using keyboard arrow keys when the slider handle is focused, or dragging the handle gently; configure this positive step size to define how much the slider value moves with each small adjustment, ensuring smooth, precise value changes without errors, and set this parameter when initializing the slider component to enable controlled, responsive step increments during user input.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 100,
        smallStep: 0.5,
        value: 25.5
      });
    </script>

### tickPlacement `String`*(default: "both")*

Denotes the location of the tick marks in the **Slider**. The available options are:


* topLeft - Tick marks are located on the top of the horizontal widget or on the left of
  the vertical widget.
* bottomRight - Tick marks are located on the bottom of the horizontal widget or on the
  right side of the vertical widget.
* both - Tick marks are located on both sides of the widget.
* none - Tick marks are not visible.


<div class="meta-api-description">
How to customize the placement of tick marks on a Kendo UI slider? Control the placement and visibility of tick marks on a slider component by configuring their position relative to the slider's orientation, enabling options to display ticks on the top or left side, bottom or right side, both sides simultaneously, or to hide tick marks entirely for a clean appearance, allowing developers to customize visual cues on horizontal or vertical sliders, adjust tick mark alignment for design consistency, or disable ticks when no incremental markers are needed.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 40,
        largeStep: 20,
        smallStep: 5,
        tickPlacement: "topLeft"
      });
    </script>

### tooltip `Object`

Configuration of the **Slider** tooltip.


<div class="meta-api-description">
How do I enable tooltips for each handle in a Kendo UI slider? Manage and customize slider handle pop-up labels by enabling or disabling the hover or focus tooltips, controlling when and how the tooltip appears such as on mouseover, drag, or always visible, adjusting the format of displayed values or templates for dynamic content, modifying positioning and styling for clarity and user feedback, and setting trigger events or conditional visibility to enhance interactive range inputs and user interface sliders.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 60,
        tooltip: {
          enabled: true,
          format: "{0:N2}"
        }
      });
    </script>

### tooltip.enabled `Boolean`*(default: true)*

Disables (**false**) or enables (**true**) the tooltip of
the **Slider**.


<div class="meta-api-description">
How to control the visibility of the slider tooltip in Kendo UI for jQuery? Control the visibility of the slider’s dynamic value indicator that appears on hover or drag, allowing users to enable or disable the display of current progress or selected value in real time. Customize whether the slider tooltip showing numeric feedback or value hint is visible during interactions, such as dragging or hovering over the slider handle, to improve UI feedback or simplify the interface. Adjust settings to show, hide, toggle, or configure tooltip presence that reflects the slider’s active value or percentage while sliding, ensuring clear or minimal visual cues based on user preferences or app design.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 35,
        tooltip: {
          enabled: false
        }
      });
    </script>

### tooltip.format `String`*(default: "{0:#,#.##}")*

Format string for the text of the tooltip. Note: The applied
format will also influence the appearance of the **Slider**
tick labels.

The slider widget supports precision of up-to 10 digits after the decimals point.


<div class="meta-api-description">
How do I format slider tooltip text in Kendo UI? Adjust the display format for slider tooltip text and tick labels by configuring number or date formatting, controlling decimal precision up to 10 digits, customizing numeric or temporal representations, setting how values appear in tooltips and axis marks, enabling formatted value presentations for sliders, managing appearance of slider indicators and labels through format strings, specifying decimal places, rounding, date/time formats, and controlling precision and style of displayed slider values.
</div>

#### Example - set format according to the precision

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        precision: 4,
        smallStep:0.0001,
        largeStep:0.0001,
        min:0,
        max:0.0004,
        value: 0.0002,
        tooltip: {
          format: "{0:#,#.####}"
        }
      });
    </script>

### tooltip.template `String|Function`

Template of the tooltip. The following variables are passed by the Slider and are ready to be used inside the template:

*   **value** - the current value when using a regular slider
*   **selectionStart** and **selectionEnd** - the current values when using a range slider


<div class="meta-api-description">
How to customize the appearance of a Kendo UI slider's tooltip with custom HTML? Control and customize the appearance and content of the slider tooltip with custom HTML or template formats, enabling formatting, styling, localization, or dynamic display of values in the tooltip area; configure how the tooltip shows current values, either for single-value sliders or range sliders with start and end selections, using variables like value, selectionStart, and selectionEnd to create tailored, context-sensitive tooltip content for better user feedback and interface clarity.
</div>

#### Example - using RangeSlider template

	<div id="rangeslider" class="humidity">
      <input />
      <input />
    </div>

    <script>
      // the following template definitions are identical and represent the default RangeSlider template

      var templateString = "#= selectionStart # - #= selectionEnd #";
      // or
      // var templateString = "# return selectionStart  + ' - ' + selectionEnd #";

      $("#rangeslider").kendoRangeSlider({
        min: 0,
        max: 100,
        tooltip: {
          template: kendo.template(templateString)
        }
      });
    </script>

### value `Number`

The underlying value of the **Slider**.


<div class="meta-api-description">
How can I dynamically update the value of a Kendo UI slider? Adjust, retrieve, or bind the current numeric position or selection on a slider control, enabling initialization, dynamic updates, programmatic setting or reading of single values or value ranges, handling slider handle placement, and responding to user changes or events on one-thumb or dual-thumb range sliders for interactive value selection and control.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 65,
        smallStep: 1,
        largeStep: 10
      });
    </script>

## Methods

### destroy

Prepares the **Slider** for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
What happens when I call destroy() on my Kendo UI Slider? Remove or clean up a slider instance from the webpage by fully detaching event listeners, unbinding internal events, clearing stored data, and disabling interactions to prevent memory leaks and residual behaviors when the slider element is deleted or replaced. Use this method to safely reset or disable a slider, ensuring all associated event handlers and data bindings are properly removed before DOM removal, stopping any leftover references or event triggers that could cause issues or unexpected behavior.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        precision: 4,
        smallStep:0.0001,
        largeStep:0.0001,
        min:0,
        max:0.0004,
        value: 0.0002,
        tooltip: {
          format: "{0:#,#.####}"
        }
      });
	  
	  	// deatach events
	$("#slider").data("kendoSlider").destroy();

	// remove slider html from DOM
    $("#slider").closest(".k-slider").remove();
	
    </script>

### enable

Enable/Disable the **Slider** widget.


<div class="meta-api-description">
How do I disable user interaction on a Kendo UI slider? Control whether the slider component is interactive by enabling or disabling user input programmatically, allowing developers to toggle the slider’s active or inactive state, block or permit user adjustments, manage user interaction on sliders dynamically, update the slider’s enabled or disabled appearance, configure the slider to accept or ignore input after initialization, set the slider’s active state for UI responsiveness, and programmatically lock or unlock sliding functionality to control value changes based on application logic or user permissions.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        precision: 4,
        smallStep:0.0001,
        largeStep:0.0001,
        min:0,
        max:0.0004,
        value: 0.0002,
        tooltip: {
          format: "{0:#,#.####}"
        }
      });
	  
    // get a reference to the slider widget
    var slider = $("#slider").data("kendoSlider");

    // disables the slider
    slider.enable(false);

    // enables the slider
    slider.enable(true);
	
    </script>

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the **Slider**.

### max

Gets/Sets the max value of the **Slider**.


<div class="meta-api-description">
How to set the maximum value of a Kendo UI slider control? Retrieve or assign the maximum limit or upper boundary value for a slider control, enabling configuration of the highest allowable input, adjustment of the slider's top range dynamically, setting constraints on user selection and drag endpoints, controlling value validation thresholds during runtime, and querying or modifying the maximum permissible numeric value to enforce input restrictions, define upper bounds, or tune interactive range limits.
</div>

#### Parameters

##### value `Number | String`

The max value to set.

#### Returns

`Number` The max value of the **Slider**.

#### Example - get the max value of the **Slider**

    <input id="slider" />
    <script>
    $("#slider").kendoSlider();

    var slider = $("#slider").data("kendoSlider");

    var max = slider.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the **Slider**

    <input id="slider" />
    <script>
    $("#slider").kendoSlider();

    var slider = $("#slider").data("kendoSlider");

    slider.max(20);
    </script>

### min

Gets/Sets the min value of the **Slider**.


<div class="meta-api-description">
How do I set the minimum value for a Kendo UI slider? Configure or retrieve the minimum value for a slider component by setting or getting its lower limit boundary, defining the smallest allowable number users can select or input, controlling the slider’s minimum range to enforce lower value constraints, updating or querying the minimal threshold to restrict slider movement or input limits, establishing a baseline value that can be programmatically adjusted or read to ensure user selections don’t go below a specified numeric floor, enabling precise control over minimum allowed values for user interfaces involving range selection or value adjustments.
</div>

#### Parameters

##### value `Number | String`

The min value to set.

#### Returns

`Number` The min value of the **Slider**.

#### Example - get the min value of the **Slider**

    <input id="slider" />
    <script>
    $("#slider").kendoSlider();

    var slider = $("#slider").data("kendoSlider");

    var min = slider.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the **Slider**

    <input id="slider" />
    <script>
    $("#slider").kendoSlider();

    var slider = $("#slider").data("kendoSlider");

    slider.min(-10);
    </script>

### setOptions

Changes the initial **Slider** configuration.


<div class="meta-api-description">
How do I dynamically update a Kendo UI slider's minimum value? Adjust, update, or modify slider settings dynamically during runtime by configuring properties such as minimum and maximum values, step increments, current value, tick marks, and orientation without restarting or reconstructing the slider component; control and fine-tune slider behavior on-the-fly by supplying new configuration parameters that merge seamlessly with existing settings to enable real-time changes, live slider customization, interactive adjustments, or responsive UI updates based on user interaction or application state.
</div>

#### Parameters

##### options `Object`

The new configuration options. It can be used for changing "min", "max", "smallStep" and "largeStep" options of the **Slider**.

#### Example

    <input id="slider" />
    <script>
    $("#slider").kendoSlider({
        min: -10,
        max: 20,
        smallStep: 2,
    });

    var slider = $("#slider").data("kendoSlider");

    slider.setOptions({
        min: -5,
        max: 5,
        smallStep: 1,
        largeStep: 2
    });
    </script>

### value

Gets or sets the value of a **Slider**. It accepts a string or number as parameters and returns
a number representing the underlying value.


<div class="meta-api-description">
How can I set the value of a Kendo UI slider programmatically? Accessing or modifying the current position or numeric state of a slider control, enabling you to retrieve the selected value or assign a new one using numbers or strings, with the method returning the updated numeric value after setting or providing the current value when no input is given, useful for reading the slider’s status, adjusting it programmatically, configuring user input boundaries, synchronizing with other UI elements, or controlling slider behavior in interactive interfaces.
</div>

#### Example

    <input id="slider" style="width: 300px" />
    <script>
      $("#slider").kendoSlider({
        precision: 4,
        smallStep:0.0001,
        largeStep:0.0001,
        min:0,
        max:0.0004,
        value: 0.0002,
        tooltip: {
          format: "{0:#,#.####}"
        }
      });
	  
    var slider = $("#slider").data("kendoSlider");
    var sliderValue = slider.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
	console.log(sliderValue);
	
    </script>

    

#### Parameters

##### value `Number`

_optional, default: _

The value to be set for a Slider.

#### Returns

`Number` The value of the Slider.

### resize

Adjusts the Slider layout to match the size of the container.


<div class="meta-api-description">
How do I recalculate a Kendo UI slider's dimensions after resizing its container? Adjust, update, or recalibrate the slider’s dimensions and layout to fit changes in the container size or visibility state by triggering a function that recalculates element widths, track lengths, tick marks, and handle positions, ensuring the slider’s visuals and interactive elements realign properly after dynamic DOM modifications, style changes, or viewport resizing; useful for syncing the slider with programmatic container resizing, toggling hidden elements, or responding to window resizing events to maintain correct rendering and user interaction fidelity.
</div>

#### Example

    <input id="slider" style="width: 200px;" />
    <script>
        $(document).ready(function() {
            $("#slider").kendoSlider();

            var slider = $("#slider").getKendoSlider();
            slider.wrapper.css("width", "400px");
            slider.resize();
        });
    </script>

## Events

### change

Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.


<div class="meta-api-description">
How do I detect when a Kendo UI slider's value is changed? Capture and respond to updates in numeric input by detecting when a slider’s value is adjusted through dragging, button clicks, keyboard input, or programmatic changes, enabling synchronization of data models, real-time validation, saving or persisting values, refreshing connected user interface elements, or initiating side effects and downstream processes whenever the slider position or value changes.
</div>

#### Example - subscribe to the change event

    <label>Temperature</label>
    <input id="slider" class="temperature" />         

    <script>
        function sliderOnChange(e) {
            console.log("Change :: new value is: " + e.value);
        }

        $(document).ready(function() {
            $("#slider").kendoSlider({
                change: sliderOnChange,
                min: 0,
                max: 30,
                smallStep: 1,
                largeStep: 10,
                value: 18
            });                    
        });
    </script>

#### Event Data

##### e.value `Number`

Represents the updated value of the slider.

### slide

Fires when the user drags the drag handle to a new position.


<div class="meta-api-description">
How to detect when the slider handle is being moved in real-time? Detect and handle user interactions when dragging or moving the slider handle, capturing real-time updates as the slider’s position changes, enabling responsive UI adjustments, syncing values, triggering events during slider thumb movement, tracking continuous drag motions, responding to user input on sliding controls, monitoring slider handle shifts, and updating state or interface dynamically as the slider is adjusted or moved along its track.
</div>

#### Example - subscribe to the slide event

    <label>Temperature</label>
    <input id="slider" class="temperature" />         

    <script>
        function sliderOnSlide(e) {
            console.log("Slide :: new slide value is: " + e.value);
        }

        $(document).ready(function() {
            $("#slider").kendoSlider({
                slide: sliderOnSlide,
                min: 0,
                max: 30,
                smallStep: 1,
                largeStep: 10,
                value: 18
            });                    
        });
    </script>

#### Event Data

##### e.value `Number`

Represents the value from the current position of the drag handle.
