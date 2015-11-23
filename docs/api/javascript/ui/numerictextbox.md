---
title: NumericTextBox
page_title: Configuration, methods and events of Kendo UI NumericTextBox
description: Code examples and tips how to configure NumericTextBox widget, use available methods and events.
---

# kendo.ui.NumericTextBox

Represents the Kendo UI NumericTextBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### culture `String`*(default: "en-US")*

 Specifies the culture info used by the widget.

#### Example - specify German culture internationalization

    <!--
        TODO: Add the kendo.culture.de-DE.min.js file as it is required!

        Here is a sample script tag:
        <script src="http://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>

        For more information check this help topic:
        http://docs.telerik.com/kendo-ui/framework/globalization/overview
    -->

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        culture: "de-DE"
    });
    </script>

### decimals `Number`*(default: null)*

Specifies the number precision applied to the widget value and when the NumericTextBox is focused. If not set, the precision defined by the current culture is used.

Compare with the [`format`](#configuration-format) property.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        decimals: 1
    });
    </script>

### downArrowText `String`*(default: "Decrease value")*

Specifies the text of the tooltip on the down arrow.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        downArrowText: "Less"
    });
    </script>

### format `String`*(default: "n")*

Specifies the number format used when the widget is not focused. Any [valid number format](/framework/globalization/numberformatting) is allowed.

Compare with the [`decimals`](#configuration-decimals) property.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
       format: "c0"
    });
    </script>

### max `Number`*(default: null)*

 Specifies the largest value the user can enter.

#### Example - specify max option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        max: 100
    });
    </script>

#### Example - specify max option as a HTML attribute

    <input id="numerictextbox" max="100" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

### min `Number`*(default: null)*

 Specifies the smallest value the user can enter.

#### Example - specify min option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        min: -100
    });
    </script>

#### Example - specify min option as a HTML attribute

    <input id="numerictextbox" min="-100" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        placeholder: "Select A Value"
    });
    </script>

### spinners `Boolean`*(default: true)*

 Specifies whether the up and down spin buttons should be rendered

#### Example - hide spin buttons

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        spinners: false
    });
    </script>

### step `Number`*(default: 1)*

 Specifies the value used to increment or decrement widget value.

#### Example - specify step option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        step: 0.1
    });
    </script>

#### Example - specify step option as a HTML attribute

    <input id="numerictextbox" step="0.1" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

### upArrowText `String`*(default: "Increase value")*

 Specifies the text of the tooltip on the up arrow.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        upArrowText: "More"
    });
    </script>

### value `Number`*(default: null)*

 Specifies the value of the NumericTextBox widget.

#### Example - specify value option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        value: 10
    });
    </script>

#### Example - specify value option as a HTML attribute

    <input id="numerictextbox" value="10" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var options = numerictextbox.options;
    <script>

## Methods

### destroy
Prepares the **NumericTextBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the NumericTextBox element from DOM.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    // detach events
    numerictextbox.destroy();
    <script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="numerictextbox" disabled="disabled" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    numerictextbox.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    numerictextbox.readonly();
    </script>

### focus

Focuses the widget.

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    numerictextbox.focus();
    </script>

### max

Gets or sets the max value of the widget.

#### Parameters

##### value `Number | String`

The max value to set.

#### Returns

`Number` The max value of the widget.

#### Example - get the max value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var max = numerictextbox.max();

    console.log(max);
    </script>

#### Example - set the max value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var max = numerictextbox.max();

    numerictextbox.max(10);
    </script>

### min

Gets or sets the min value of the widget.

#### Parameters

##### value `Number | String`

The min value to set.

#### Returns

`Number` The min value of the widget.

#### Example - get the min value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var min = numerictextbox.min();

    console.log(min);
    </script>

#### Example - set the min value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var min = numerictextbox.min();

    numerictextbox.min(10);
    </script>

### step

Gets or sets the step value of the widget.

#### Parameters

##### value `Number | String`

The step value to set.

#### Returns

`Number` The step value of the widget.

#### Example - get the step value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var step = numerictextbox.step();

    console.log(step);
    </script>

#### Example - set the step value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var step = numerictextbox.step();

    numerictextbox.step(0.5);
    </script>

### value

Gets or sets the value of the NumericTextBox.

#### Parameters

##### value `Number | String`

The value to set.

#### Returns

`Number` The value of the widget.

#### Example - get the value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var value = numerictextbox.value();

    console.log(value);
    </script>

#### Example - set the value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var value = numerictextbox.value();

    numerictextbox.value(0.5);
    </script>

## Events

### change

Fires when the value is changed

#### Event Data

##### e.sender `kendo.ui.NumericTextBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        change: function() {
            var value = this.value();
            console.log(value); //value is the selected date in the numerictextbox
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    numerictextbox.bind("change", function() {
        var value = this.value();
        console.log(value); //value is the selected date in the numerictextbox
    });
    </script>

### spin

Fires when the value is changed from the spin buttons

#### Event Data

##### e.sender `kendo.ui.NumericTextBox`

The widget instance which fired the event.

#### Example - subscribe to the "spin" event during initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        spin: function() {
            var value = this.value();
            console.log(value); //value is the selected date in the numerictextbox
        }
    });
    </script>

#### Example - subscribe to the "spin" event after initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    numerictextbox.bind("spin", function() {
        var value = this.value();
        console.log(value); //value is the selected date in the numerictextbox
    });
    </script>
