---
title: DateInput
page_title: Configuration, methods and events of Kendo UI DateInput
description: Easy to follow steps guide how to quickly configure DateInput UI widget, easily enable/disable it using methods and how to change events.
res_type: api
component: dateinput
---

# kendo.ui.DateInput

Represents the Kendo UI DateInput widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration


### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"

#### Example - sets the fillMode

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        fillMode: "flat"
    });
    </script>

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to format the value of the DateInput displayed in the input. The format also will be used to parse the input.

#### Example - specify a custom date format

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        format: "yyyy/MM/dd"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the dateinput. If the dateinput has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
            label: "Description"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: function() {
                    return "First name";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: {
                    content: "Date"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: {
                    content: function() {
                        return "Date";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/dateinput/methods/value) method **does not trigger** the `focusout` event of the dateinput.
This can affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#dateinput").data("kendoDateInput").label.floatingLabel.refresh();`

#### Example - create a floating label

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: {
                    content: "Date",
                    floating: true
                }
        })
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date which can be entered in the input.

#### Example - specify the maximum date

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        max: new Date(2013, 0, 1) // sets max date to Jan 1st, 2013
    });
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that which be entered in the input.

#### Example - specify the minimum date

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        min: new Date(2011, 0, 1) // sets min date to Jan 1st, 2011
    });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        value: new Date(2011, 0, 1)
    });
    </script>

### messages `Object`

The messages that DateInput uses.  Use it to customize or localize the placeholders of each date/time part.

#### Example - customize column menu messages

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages:{
            "year": "year",
            "month": "month",
            "day": "day",
            "weekday": "day of the week",
            "hour": "hours",
            "minute": "minutes",
            "second": "seconds",
            "dayperiod": "AM/PM"
        }
    });
    </script>

### messages.year `String` *(default: "year")*

The placeholder for the years part.

### messages.month `String` *(default: "month")*

The placeholder for the months part.

### messages.day `String` *(default: "day")*

The placeholder for the day of the month part.

### messages.weekday `String` *(default: "day of the week")*

The placeholder for the day of the week part.

### messages.hour `String` *(default: "hours")*

The placeholder for the hours part.

### messages.minute `String` *(default: "minutes")*

The placeholder for the minutes part.

### messages.second `String` *(default: "seconds")*

The placeholder for the seconds part.

### messages.dayperiod `String` *(default: "AM/PM")*

The placeholder for the AM/PM part.

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"

#### Example - sets the rounded value

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        rounded: "large"
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        size: "large"
    });
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    var options = dateinput.options;
    <script>

## Methods

### destroy
Prepares the **DateInput** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DateInput element from DOM.

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    // detach events
    dateinput.destroy();
    </script>

### enable

Enable/Disable the DateInput widget.

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the DateInput.

#### Example - disable DateInput widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.enable(false);
    </script>

#### Example - enable DateInput widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the DateInput should be readonly or editable.

#### Example - make DateInput widget readonly

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.readonly();
    </script>

#### Example - make DateInput widget editable

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.readonly(false);
    </script>

### max

Gets/Sets the max value of the DateInput.

#### Parameters

##### value `Date|String`

The max date to set.

#### Returns

`Date` The max value of the DateInput.

#### Example - get the max value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    var max = dateinput.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.max(new Date(2100, 0, 1));
    </script>

### min

Gets/Sets the min value of the DateInput.

#### Parameters

##### value `Date|String`

The min date to set.

#### Returns

`Date` The min value of the DateInput.

#### Example - get the min value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    var min = dateinput.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.min(new Date(2000, 0, 1));
    </script>

### setOptions

Changes the initial DateInput configuration.

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        min: new Date(2001, 0, 1),
        max: new Date()
    });

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.setOptions({
        min: new Date(2010, 5, 6)
    });
    </script>

### value

Gets/Sets the value of the DateInput.

#### Parameters

##### value `Date|String`

The value to set.

#### Returns

`Date` The value of the DateInput.

> * This method **does not trigger** [change](/api/javascript/ui/dateinput/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");
    dateinput.value(new Date(2016, 10, 1));
    dateinput.trigger("change");
    </script>

#### Example - gets the value of the widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        value: new Date(2013, 10, 10)
    });

    var dateinput = $("#dateinput").data("kendoDateInput");

    var value = dateinput.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - sets the value of the widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        value: new Date(2013, 10, 10)
    });

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.value(new Date());
    </script>

## Events

### change

Fires when the selected date is changed

#### Event Data

##### e.sender `kendo.ui.DateInput`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the dateinput
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the dateinput
    });
    </script>
