---
title: TimePicker
page_title: Configuration, methods and events of Kendo UI TimePicker
description: What type of animations you can use in TimePicker UI widget, find supported methods and see which events are triggered once the value is changed.
res_type: api
component: date-time-pickers
---

# kendo.ui.TimePicker

Represents the Kendo UI TimePicker. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


### animation `Boolean|Object`

Configures the opening and closing animations of the popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the popup will open and close instantly.

`animation:true` is not a valid configuration.

#### Example - disable open and close animations

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
      animation: {
       close: {
         effects: "fadeOut zoom:out",
         duration: 300
       },
       open: {
         effects: "fadeIn zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.close `Object`

The animation played when the popup is closed.

#### Example - configure the close animation

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.close.duration `Number`

The duration of the close animation in milliseconds.

### animation.open `Object`

The animation played when the calendar popup is opened.

#### Example - configure the open animation

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.open.duration `Number`

The duration of the open animation in milliseconds.

### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.

#### Example - specify modern component type

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
            componentType: "modern"
        });
    </script>

### culture `String`*(default: "en-US")*

 Specifies the culture info used by the widget.

#### Example - specify German culture internationalization

    <!--
        TODO: Add the kendo.culture.de-DE.min.js file as it is required!

        Here is a sample script tag:
        <script src="https://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>

        For more information check this help topic:
        https://docs.telerik.com/kendo-ui/framework/globalization/overview
    -->

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        culture: "de-DE"
    });
    </script>

### dateInput `Boolean`*(default: false)*

 Specifies if the TimePicker will use DateInput for editing value

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true
    });
    </script>

### dates `Array`

 Specifies a list of dates, which are shown in the time drop-down list. If not set, the TimePicker will auto-generate the available times.


#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dates: [
            new Date(2000, 10, 10, 10, 0, 0),
            new Date(2000, 10, 10, 10, 30, 0)
        ] //the drop-down list will consist only two entries - "10:00 AM" and "10:30 AM"
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"

#### Example - sets the fillMode

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        fillMode: "flat"
    });
    </script>

### format `String`*(default: "h:mm tt")*

 Specifies the format, which is used to format the value of the TimePicker displayed in the input. The format also will be used to parse the input.

 For more information on date and time formats please refer to [Date Formatting](/framework/globalization/dateformatting).

#### Example - specify a custom time format

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        format: "HH:mm"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the timepicker. If the timepicker has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
            label: "Date"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: function() {
                    return "Date";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: {
                    content: "Date"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the wid
get instance.

#### Example - create a label from a function

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: {
                    content: function() {
                        return "Date";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the fl
oating label functionality.

> **Important:** The [value](/api/javascript/ui/timepicker/methods/value) meth
od **does not trigger** the `focusout` event of the timepicker.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating La
bel: `$("#timepicker").data("kendoTimePicker").label.floatingLabel.refresh(
);`

#### Example - create a floating label

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: {
                    content: "Date",
                    floating: true
                }
        })
    </script>


### interval `Number`*(default: "30")*

Specifies the interval, between values in the popup list, in minutes.

#### Example - specify a time interval

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        interval: 15
    });
    </script>

### max `Date`*(default: "00:00")*

Specifies the end value in the popup list.

#### Example - specify a maximum selectable time

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        max: new Date(2000, 0, 1, 22, 0, 0) //date part is ignored
    });
    </script>

#### Example - render all available hours

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        max: new Date(2000, 0, 1, 23, 30, 0) //date part is ignored
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          now: "My Now",
          hour: "My Hour",
          minute:"My Minute",
          second:"My Second",
          millisecond: "My Millisecond",
          cancel: "My Cancel",
          set:"My Set",
        }
      });
    </script>

### messages.now `String` *(default: "")*

Allows customization of the **Now** text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          now: "My Now"
        }
      });
    </script>

### messages.hour `String` *(default: "")*

Allows customization of the **Hour** text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          hour: "My Hour"
        }
      });
    </script>

### messages.minute `String` *(default: "")*

Allows customization of the **Minute** text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          minute: "My Minute"
        }
      });
    </script>

### messages.second `String` *(default: "")*

Allows customization of the **Second** text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          second: "My Second"
        }
      });
    </script>

### messages.millisecond `String` *(default: "")*

Allows customization of the **Millisecond** text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          millisecond: "My Millisecond"
        }
      });
    </script>

### messages.cancel `String` *(default: "")*

Allows customization of the **Cancel** button text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          cancel: "My Cancel"
        }
      });
    </script>

### messages.set `String` *(default: "")*

Allows customization of the **Set** button text in the TimePicker.

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          set: "My Set"
        }
      });
    </script>

### messages.dateInput `Object`

The messages that DateInput uses.  Use it to customize or localize the placeholders of each date/time part.

#### Example - customize column menu messages

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        messages:{
            dateInput:{
                "year": "year",
                "month": "month",
                "day": "day",
                "weekday": "day of the week",
                "hour": "hours",
                "minute": "minutes",
                "second": "seconds",
                "dayperiod": "AM/PM"
            }
        }
    });
    </script>

### messages.dateInput.year `String` *(default: "year")*

The placeholder for the years part.

### messages.dateInput.month `String` *(default: "month")*

The placeholder for the months part.

### messages.dateInput.day `String` *(default: "day")*

The placeholder for the day of the month part.

### messages.dateInput.weekday `String` *(default: "day of the week")*

The placeholder for the day of the week part.

### messages.dateInput.hour `String` *(default: "hours")*

The placeholder for the hours part.

### messages.dateInput.minute `String` *(default: "minutes")*

The placeholder for the minutes part.

### messages.dateInput.second `String` *(default: "seconds")*

The placeholder for the seconds part.

### messages.dateInput.dayperiod `String` *(default: "AM/PM")*

The placeholder for the AM/PM part.

### min `Date`*(default: "00:00")*

Specifies the start value in the popup list.

#### Example - specify a minimum selectable time

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        min: new Date(2000, 0, 1, 8, 0, 0) //date part is ignored
    });
    </script>

### parseFormats `Array`

 Specifies the formats, which are used to parse the value set with the value method or by direct input. If not set the value of the options.format will be used. Note that value of the format option is always used.

 > Order of the provided parse formats is important and it should from stricter to less strict.

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        format: "h:mm tt",
        parseFormats: ["HH:mm"] //format also will be added to parseFormats
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.origin `String`

Specifies how to position the popup element based on anchor point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element


    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
      popup: {
        origin: "top left"
      }
    });
    </script>

### popup.position `String`

Specifies which point of the popup element to attach to the anchor's origin point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element


    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
      popup: {
        position: "top center"
      }
    });
    </script>
    <style>
      #container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        width: 100px;
        height: 100px;
      }
    </style>

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"

#### Example - sets the rounded value

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
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

    <input id="timepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        size: "large"
    });
    </script>

### value `Date`*(default: null)*

Specifies the selected time.

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        value: new Date(2011, 0, 1, 10, 30)
    });
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var options = timepicker.options;
    <script>

## Methods

### close

Closes the drop-down list of a TimePicker.

#### Example

    <input id="timepicker" />
    <button id="close">Close</button>
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    $("#close").click(function() {
        timepicker.close();
    });
    </script>

### destroy
Prepares the **TimePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TimePicker element from DOM.

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    // detach events
    timepicker.destroy();
    </script>

### enable

Enables or disables a TimePicker.

#### Parameters

##### enable `Boolean`

Enables (**true** or undefined) or disables (**false**) a TimePicker.

#### Example - disable TimePicker widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.enable(false);
    </script>

#### Example - enable TimePicker widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.enable();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the TimePicker should be readonly or editable.

#### Example - make TimePicker widget readonly

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.readonly();
    </script>

#### Example - make TimePicker widget editable

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.readonly(false);
    </script>

### max

Gets or sets the maximum value of the TimePicker.

#### Parameters

##### value `Date|String`

The maximum time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The maximum time value of a TimePicker.

#### Example - get the max value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var max = timepicker.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.max(new Date(2000, 0, 1, 22, 0, 0));
    </script>

#### Example - render all available hours

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.max(new Date(2000, 0, 1, 23, 30, 0));
    </script>

### min

Gets or sets the minimum value of the TimePicker.

#### Parameters

##### value `Date|String`

The minimum time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The minimum time value of a TimePicker.

#### Example - get the min value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var min = timepicker.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.min(new Date(2000, 0, 1, 8, 0, 0));
    </script>

### open

Opens the drop-down list of a TimePicker.

#### Example

    <input id="timepicker" />
    <button id="open">Open</button>
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    $("#open").click(function() {
        timepicker.open();
    });
    </script>

### setOptions

Changes the initial TimePicker configuration. **Will be included in Q3 2013 SP1. Currently available in Q3 2013 internal builds only.**

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        min: new Date(2001, 0, 1, 8, 0, 0),
        max: new Date(2013, 0, 1, 18, 0, 0)
    });

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.setOptions({
        min: new Date(2013, 0, 1, 11, 30, 0),
        max: new Date(2013, 0, 1, 16, 30, 0)
    });
    </script>

### value

Gets or sets the value of the TimePicker.

#### Parameters

##### value `Date|String`

The time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The time value of a TimePicker.

> * This method **does not trigger** [change](/api/javascript/ui/timepicker/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");
    timepicker.value(new Date(2016, 10, 1));
    timepicker.trigger("change");
    </script>

#### Example - gets the value of the widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        value: "10:00 AM"
    });

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var value = timepicker.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - sets the value of the widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.value("10:00 AM");
    </script>

## Events

### change

Fires when the selected date is changed

#### Event Data

##### e.sender `kendo.ui.TimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the timepicker
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the timepicker
    });
    </script>

### close

Fires when the time drop-down list is closed

#### Event Data

##### e.sender `kendo.ui.TimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").timepicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the time drop-down list is opened

#### Event Data

##### e.sender `kendo.ui.TimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });
    </script>
