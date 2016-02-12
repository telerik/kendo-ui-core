---
title: Slider
page_title: Configuration, methods and events of Kendo UI Slider
description: Configuration of Slider UI control, different methods, and events, triggered when the slider value changes upon specific conditions.
---

# kendo.ui.Slider

Represents the Kendo UI Slider widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### decreaseButtonTitle `String`*(default: "Decrease")*

The title of the decrease button of the **Slider**.

### increaseButtonTitle `String`*(default: "Increase")*

The title of the increase button of the **Slider**.

### largeStep `Number`*(default: 5)*

The delta with which the value will change when the user presses the Page Up or Page Down key (the drag
handle must be focused). Note: `largeStep` will also set a large tick for every large step.

Must be a positive number, larger than [smallStep](#configuration-smallStep).

### max `Number`*(default: 10)*

The maximum value of the **Slider**.

### min `Number`*(default: 0)*

The minimum value of the **Slider**.

### orientation `String`*(default: "horizontal")*

The orientation of a **Slider**: **"horizontal"** or **"vertical"**.

### showButtons `Boolean`*(default: true)*

Can be used to show (**true**) or hide (**false**) the
increase and decrease buttons of a **Slider**.

### smallStep `Number`*(default: 1)*

The small step value of the **Slider**. Must be a positive number, otherwise an Javascript exception will be thrown.

The small step value determines the amount of Slider value change when the end user

* clicks on the increase or decrease buttons of the **Slider**;
* presses the arrow keys (the drag handle must be focused);
* drags the drag handle.

### tickPlacement `String`*(default: "both")*

Denotes the location of the tick marks in the **Slider**. The available options are:


* topLeft - Tick marks are located on the top of the horizontal widget or on the left of
  the vertical widget.
* bottomRight - Tick marks are located on the bottom of the horizontal widget or on the
  right side of the vertical widget.
* both - Tick marks are located on both sides of the widget.
* none - Tick marks are not visible.

### tooltip `Object`

Configuration of the **Slider** tooltip.

### tooltip.enabled `Boolean`*(default: true)*

Disables (**false**) or enables (**true**) the tooltip of
the **Slider**.

### tooltip.format `String`*(default: "{0:#,#.##}")*

Format string for the text of the tooltip. Note: The applied
format will also influence the appearance of the **Slider**
tick labels.

The slider widget supports precision of up-to 10 digits after the decimals point.

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

### tooltip.template `String`

Template of the tooltip. The following variables are passed by the Slider and are ready to be used inside the template:

*   **value** - the current value when using a regular slider
*   **selectionStart** and **selectionEnd** - the current values when using a range slider

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

## Methods

### destroy

Prepares the **Slider** for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.

#### Example

	// deatach events
	$("#slider").data("kendoSlider").destroy();

	// remove slider html from DOM
    $("#slider").closest(".k-slider").remove();

### enable

Enable/Disable the **Slider** widget.

#### Example

    // get a reference to the slider widget
    var slider = $("#slider").data("kendoSlider");

    // disables the slider
    slider.enable(false);

    // enables the slider
    slider.enable(true);

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the **Slider**.

### value

Gets or sets the value of a **Slider**. It accepts a string or number as parameters and returns
a number representing the underlying value.

#### Example

    var slider = $("#slider").data("kendoSlider");
    var sliderValue = slider.value();

#### Parameters

##### value `Number`

_optional, default: _

The value to be set for a Slider.

#### Returns

`Number` The value of the Slider.

### resize

Adjusts the Slider layout to match the size of the container.

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

#### Event Data

##### e.value `Number`

Represents the updated value of the slider.

### slide

Fires when the user drags the drag handle to a new position.

#### Event Data

##### e.value `Number`

Represents the value from the current position of the drag handle.
