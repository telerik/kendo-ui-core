---
title: TimeDurationPicker
page_title: Configuration, methods and events of the Kendo UI TimeDurationPicker
description: Code examples and tips how to configure TimeDurationPicker widget, use available methods and events.
res_type: api
component: timedurationpicker
---

# kendo.ui.TimeDurationPicker

Represents the Kendo UI TimeDurationPicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### columns `Array`

The configuration of the picker columns. An array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
a predifined column with defaulted values for the particular time unit.

#### Example - specify width

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ]
        })
    </script>

### columns.format `String`

The format that will be used to display the column value in the input. The amount of `#` symbols should be equal to the largest amount of digits that the time unit can hold.

#### Example - specify width

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", format: "## hh" }, "minutes" ]
        })
    </script>

### columns.max `Number`

Sets the maximum time unit value.

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", max : 12 }, "minutes" ]
        })
    </script>

### columns.min `Number`

Sets the minimum time unit value.

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", min : 12 }, "minutes" ]
        })
    </script>

### columns.name `String`

Specifies the name of the time unit the column will hold. Can be set to the following values:

- "days"
- "hours"
- "minutes"
- "seconds"
- "milliseconds"

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", min : 12 }, "minutes" ]
        })
    </script>

### columns.step `Number`

Specifies the value used to increment or decrement the column value

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", step : 2 }, "minutes" ]
        })
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        enable: false
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        fillMode: "flat"
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        "messages": {
            "set": "Apply"
        }
     })
    </script>

### messages.cancel `String` *(default: "Cancel")*

Allows customization of the cancel button inside the popup.

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        "messages": {
            "cancel": "Abort"
        }
     })
    </script>

### messages.days `String` *(default: "Days")*

Sets the title of the days column in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "days", "hours" ],
        "messages": {
            "days": "The days"
        }
     })
    </script>

### messages.hours `String` *(default: "Hours")*

Sets the title of the hours column in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "days", "hours" ],
        "messages": {
            "hours": "The hours"
        }
     })
    </script>

### messages.milliseconds `String` *(default: "Milliseconds")*

Sets the title of the milliseconds column in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "seconds", "milliseconds" ],
        "messages": {
            "milliseconds": "The milliseconds"
        }
     })
    </script>

### messages.minutes `String` *(default: "Minutes")*

Sets the title of the minutes column in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        "messages": {
            "minutes": "The minutes"
        }
     })
    </script>

### messages.seconds `String` *(default: "Seconds")*

Sets the title of the seconds column in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "seconds", "minutes" ],
        "messages": {
            "seconds": "The seconds"
        }
     })
    </script>

### messages.set `String` *(default: "Set")*

Sets the title of the set button in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "seconds", "minutes" ],
        "messages": {
            "set": "Set Time"
        }
     })
    </script>


### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.

#### Example - make the widget readonly

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        value: 5400000,
        readonly: true
    });
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        rounded: "large"
    });
    </script>

### separator `String` *(default: ',')*

Sets a string value that is used to devide the different column values inside the input. The value must be a **single character**, you cannot use more than one character as a separator.

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        separator: ":"
    });
    </script>

### shortcuts `Array`

An array of buttons that hold certain timeframe values and will be displayed in the popup

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 },
            { text: "2h", value: 7200000  }
        ]
    });
    </script>

### shortcuts.text `String`

The text that will be displayed in the button

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 },
            { text: "2h", value: 7200000  }
        ]
    });
    </script>

### shortcuts.value `Number`

The value of the timeframe in milliseconds

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 },
            { text: "2h", value: 7200000  }
        ]
    });
    </script>

### value `Number`

The value of the widget in milliseconds

#### Example - specify value of the widget

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        value: 5400000
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        size: "large"
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example - destroy  the widget

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] } ).data('kendoTimeDurationPicker');
        picker.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If `true`, the widget will be enabled. If `false`, the widget will be disabled.

#### Example - enable the widget

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ],
            enable: false
        }).data('kendoTimeDurationPicker');
        picker.enable(true);
    </script>

#### Example - disable the widget

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ],
            enable: false
        }).data('kendoTimeDurationPicker');
        picker.enable(false);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            readonly: true,
            columns: [ "hours", "minutes" ]
        }).data('kendoTimeDurationPicker');

        picker.readonly(false);
    </script>

#### Example - make the widget readonly

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ]
        }).data('kendoTimeDurationPicker');

        picker.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/textarea/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

#### Parameters

##### value `Number`

The value to set in milliseconds.

#### Returns

`Number` the value of the widget.

#### Example - trigger the change event after setting the value

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ]
        }).data('kendoTimeDurationPicker');

        picker.value(5400000);
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.TimeDurationPicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ],
            change: function(e){
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        })
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="timedurationpicker" />
    <script>
        function picker_change(e) {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };

        var picker = $("#timedurationpicker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] }).data('kendoTimeDurationPicker');

        picker.bind("change", picker_change)
    </script>

### close

Fires when the popup  is closed

#### Event Data

##### e.sender `kendo.ui.TimeDurationPicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="picker" />
    <script>
    $("#picker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] });

    var picker = $("#picker").data("kendoTimeDurationPicker");

    picker.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the time drop-down list is opened

#### Event Data

##### e.sender `kendo.ui.TimeDurationPicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="picker" />
    <script>
    $("#picker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="picker" />
    <script>
    $("#picker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] });

    var picker = $("#picker").data("kendoTimeDurationPicker");

    picker.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });
    </script>
