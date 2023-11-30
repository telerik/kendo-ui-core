---
title: DateTimePicker
page_title: Configuration, methods and events of Kendo UI DateTimePicker
description: Learn how to configure the UI DateTimePicker widget. Use methods to open, close, remove, enable, disable, set maximum or minimum values and more.
res_type: api
---

# kendo.ui.DateTimePicker

Represents the Kendo UI DateTimePicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.

### animation `Boolean|Object`

Configures the opening and closing animations of the popups. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the popup will open and close instantly.

`animation:true` is not a valid configuration.

#### Example - disable open and close animations

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
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

The animation played when a popup is closed.

#### Example - configure the close animation

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.close.duration `Number`

The duration of the close animation in milliseconds.

### animation.open `Object`

The animation played when the popup is opened.

#### Example - configure the open animation

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
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

### ARIATemplate `String`*(default: "Current focused #=data.valueType# is #=data.text#")*

 Specifies a template used to populate value of the aria-label attribute of the currently focused cell of the calendar. The parameters available for the template are:

* `current` - The current focused date.
* `valueType` - The focused item value type - month, year and etc.
* `text` - A text representing the focused value.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#"
    });
    </script>

### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.

#### Example - specify modern component type

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
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

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        culture: "de-DE"
    });
    </script>

### dateInput `Boolean`*(default: false)*

 Specifies if the DateTimePicker will use DateInput for editing value

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        dateInput: true
    });
    </script>

### dates `Array`

Specifies a list of dates, which will be passed to the [month template](/api/javascript/ui/datetimepicker#configuration-month.content) of the DateView.
All dates, which match the date portion of the selected date will be used to re-bind the TimeView.

#### Example - specify a list of dates

    <style>
      .party{color:red}
    </style>

    <input id="datetimepicker" />

    <script id="cell-template" type="text/x-kendo-template">
      <span class="#= isInArray(data.date, data.dates) ? 'party' : '' #">#= data.value #</span>
    </script>

    <script>
      $("#datetimepicker").kendoDateTimePicker({
        value: new Date(2000, 10, 1),
        month: {
          content: $("#cell-template").html()
        },
        dates: [
          new Date(2000, 10, 10),
          new Date(2000, 10, 30)
        ] //can manipulate month template depending on this array.
      });

      function isInArray(date, dates) {
        for(var idx = 0, length = dates.length; idx < length; idx++) {
          var d = dates[idx];
          if (date.getFullYear() == d.getFullYear() &&
              date.getMonth() == d.getMonth() &&
              date.getDate() == d.getDate()) {
            return true;
          }
        }

        return false;
      }

    </script>

### depth `String`

Specifies the navigation depth of the calendar. The following
settings are available for the **depth** value:

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

> Note the option will not be applied if **start** option is *lower* than **depth**. Always set both and **start** and **depth** options.

#### Example - set navigation depth of the calendar popup

    <input id="datetimepicker"/>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        depth: "year"
    });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled for selection by the widget.

#### Example - specify an array of days to be disabled

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
		value: new Date(),
		disableDates: ["we", "th"],
    });
    </script>

#### Example - specify an array of dates to be disabled

    <input id="datetimepicker">
    <script>
    $("#datetimepicker").kendoDateTimePicker({
		value: new Date(2015,9,3),
        disableDates: [new Date(2015,9,12), new Date(2015,9,22)]
    });
    </script>

you can also pass a function that will be dynamically resolved for each date of the calendar. Note that when the function returns true, the date will be disabled.

#### Example - use a function to disabled dates

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
		value: new Date(),
		disableDates: function (date) {
			var disabled = [13,14,20,21];
			if (date && disabled.indexOf(date.getDate()) > -1 ) {
				return true;
			} else {
				return false;
			}
		}
	});
    </script>

note that a check for an empty `date` is needed, as the widget can work with a null value as well.

> This functionality was added with the Q1 release of 2016.

### endTime `Date`

 If set, specifies the latest time the TimeView can show.

#### Example - specify the start time for the TimeView

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            endTime: new Date(2023,1,3,18,30,0)
        });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"

#### Example - sets the fillMode

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        fillMode: "flat"
    });
    </script>

### footer `String`

 The [template](/api/javascript/kendo/methods/template) which renders the footer of the calendar. If false, the footer will not be rendered.

#### Example - specify footer template as a function

    <input id="datetimepicker" />
    <script id="footer-template" type="text/x-kendo-template">
        Today - #: kendo.toString(data, "d") #
    </script>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        footer: kendo.template($("#footer-template").html())
    });
    </script>

#### Example - specify footer template as a string

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        footer: "Today - #: kendo.toString(data, 'd') #"
    });
    </script>

### format `String`*(default: "M/d/yyyy h:mm tt")*

 Specifies the format, which is used to format the value of the DateTimePicker displayed in the input. The format also will be used to parse the input.

For more information on date and time formats please refer to [Date Formatting](/framework/globalization/dateformatting).

#### Example - specify a custom date format

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        format: "yyyy/MM/dd hh:mm tt"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the datetimepicker. If the datetimepicker has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            label: "Date"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
                label: function() {
                    return "Date";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
                label: {
                    content: "Date"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
                label: {
                    content: function() {
                        return "Date";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/datetimepicker/methods/value) method **does not trigger** the `focusout` event of the datetimepicker.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#datetimepicker").data("kendoDateTimePicker").label.floatingLabel.refresh();`

#### Example - create a floating label

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
                label: {
                    content: "Date",
                    floating: true
                }
        })
    </script>

### interval `Number|Object`*(default: "30" or "0" in modern picker)*

Specifies the interval between values in the popup list.

* When the [componentType](api/javascript/ui/datetimepicker/configuration/componenttype) is set to `classic`, the interval is specified in minutes (numeric values).
* When the [componentType](api/javascript/ui/datetimepicker/configuration/componenttype) is set to `modern`, the interval is specified as an object of hours, minutes and seconds.

#### Example - specify a time interval for the classic component type

    <input id="dateTimePicker" />
    <script>
    $("#dateTimePicker").kendoDateTimePicker({
        interval: 15
    });
    </script>

#### Example - specify a time interval for the modern component type

    <input id="dateTimePicker" />
    <script>
    $("#dateTimePicker").kendoDateTimePicker({
        componentType: "modern",
        interval: {
            hour: 2,
            minute: 10,
            second: 15
        }
    });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example - specify the maximum date

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        max: new Date(2013, 0, 1, 22, 0, 0)
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### messages.weekColumnHeader `String` *(default: "")*

Allows customization of the week column header text in the Calendar. Set the value to make the widget compliant with web accessibility standards.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### messages.dateInput `Object`

The messages that DateInput uses.  Use it to customize or localize the placeholders of each date/time part.

#### Example - customize column menu messages

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
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

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.

#### Example - specify the minimum date

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        min: new Date(2011, 0, 1, 8, 0, 0)
    });
    </script>

### month `Object`

 Templates for the cells rendered in the calendar "month" view.

### month.content `String`

 Template to be used for rendering the cells in the calendar "month" view, which are in range.

#### Example - specify cell template as a string

    <input id="datetimepicker" />
    <script id="cell-template" type="text/x-kendo-template">
        <div class="#= data.value < 10 ? 'exhibition' : 'party' #"></div>
        #= data.value #
    </script>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        month: {
           content: $("#cell-template").html()
        }
    });
    </script>

### month.weekNumber `String`

 The template to be used for rendering the cells in "week" column. By default, the widget renders the calculated week of the year.
 The properties available in the data object are:

 * currentDate - returns the first date of the current week.
 * weekNumber - calculated week number.

 These properties can be used in the template to make additional calculations.

#### Example - specify week number template as a string

    <style>
      .italic{
        font-style: italic;
      }
    </style>
    <body>

    <input id="datetimepicker1" />
    <script id="week-template" type="text/x-kendo-template">
       <a class="italic">#= data.weekNumber #</a>
    </script>
    <script>
      $("#datetimepicker1").kendoDateTimePicker({
        weekNumber: true,
        month: {
          weekNumber: $("#week-template").html()
        }
      });
    </script>

### month.empty `String`

The template used for rendering cells in the calendar "month" view, which are outside the min/max range.

#### Example - specify an empty cell template as a string

    <input id="datetimepicker1" />
    <script>
    $("#datetimepicker1").kendoDateTimePicker({
        month: {
           empty: '-'
        }
    });
    </script>

#### Example - add date value to the out-of-range cells

    <input id="datetimepicker2" />
    <script>
    $("#datetimepicker2").kendoDateTimePicker({
        month: {
           empty: '<span style="color:\\#ccc;padding:0 .45em 0 .1em;">#= data.value #</span>'
        }
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="datetimepicker" />
    </div>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="datetimepicker" />
    </div>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
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
        <input id="datetimepicker" />
    </div>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
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
        <input id="datetimepicker" />
    </div>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
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

### weekNumber `Boolean` *(default: false)*

If set to `true` a week of the year will be shown on the left side of the calendar. It is possible to define a template in order to customize what will be displayed.

#### Example - enable the week of the year option

    <input id="datetimepicker1" />
    <script>
        $("#datetimepicker1").kendoDateTimePicker({
            weekNumber: true
        });
    </script>

### parseFormats `Array`

 Specifies the formats, which are used to parse the value set with value() method or by direct input. If not set the value of the `options.format` and `options.timeFormat` will be used.
 Note that value of the `format` option is always used. The `timeFormat` value also will be used if defined.

 > Order of the provided parse formats is important and it should from stricter to less strict.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        format: "yyyy/MM/dd hh:mm tt",
        parseFormats: ["MMMM yyyy", "HH:mm tt"] //format also will be added to parseFormats
    });
    </script>

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"

#### Example - sets the rounded value

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        rounded: "large"
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets the rounded value

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        size: "large"
    });
    </script>

### start `String`*(default: "month")*

 Specifies the start view of the calendar.
 The following settings are available for the **start** value:

 * `"month"` - Shows the days of the month.
 * `"year"` - Shows the months of the year.
 * `"decade"` - Shows the years of the decade.
 * `"century"` - Shows the decades from the century.

#### Example - specify the initial view, which calendar renders

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            start: "year"
        });
    </script>

### startTime `Date`

 If set, specifies the earliest time the TimeView can show.

#### Example - specify the start time for the TimeView

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            startTime: new Date(2023,1,3,8,30,0)
        });
    </script>

### timeFormat `String`*(default: "h:mm tt")*

 Specifies the format, which is used to format the values in the time drop-down list.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        timeFormat: "HH:mm" //24 hours format
    });
    </script>

### value `Date`*(default: null)*

 Specifies the selected value.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        value: new Date(2011, 0, 1)
    });
    </script>

## Fields

### options `Object`
An object, which holds the [`configuration options`](/api/javascript/ui/datetimepicker#configuration) of the widget.

#### Example - get options of the widget

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("datetimepicker");

    var options = datetimepicker.options;
    </script>

## Methods

### close

Closes the calendar or the time drop-down list.

#### Parameters

##### view `String`

The view of the DateTimePicker, expressed as a string.
Available views are "time" and "date".

#### Example - close the calendar popup

    <input id="datetimepicker" />
    <button id="close">Close</button>
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    $("#close").click(function() {
        datetimepicker.close("date");
    });
    </script>

#### Example - close the time popup

    <input id="datetimepicker" />
    <button id="close">Close</button>
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    $("#close").click(function() {
        datetimepicker.close("time");
    });
    </script>

### destroy
Prepares the **DateTimePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DateTimePicker element from DOM.

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    // detach events
    datetimepicker.destroy();
    </script>

### enable

Enables or disables a DateTimePicker.

#### Parameters

##### enable `Boolean`

Enables (**true** or undefined) or disables (**false**) a DateTimePicker.

#### Example - disable DateTimePicker widget

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.enable(false);
    </script>

#### Example - enable DateTimePicker widget

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.enable();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the DateTimePicker should be readonly or editable.

#### Example - make DateTimePicker widget readonly

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.readonly();
    </script>

#### Example - make DateTimePicker widget editable

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.readonly(false);
    </script>

### max

Gets or sets the maximum value of the DateTimePicker.

#### Parameters

##### value `Date|String`

The maximum time value to set for a DateTimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The maximum time value of a DateTimePicker.

#### Example - get the max value of the DateTimePicker

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    var max = datetimepicker.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the DateTimePicker

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.max(new Date(2100, 0, 1));
    </script>

### min

Gets or sets the minimum value of the DateTimePicker.

#### Parameters

##### value `Date|String`

The minimum time value to set for a DateTimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The minimum time value of a DateTimePicker.

#### Example - get the min value of the DateTimePicker

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    var min = datetimepicker.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the DateTimePicker

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.min(new Date(2000, 0, 1));
    </script>

### open

Opens the calendar or the time drop-down list.

#### Parameters

##### view `String`

The view of the DateTimePicker, expressed as a string.
Available views are "time" and "date".

#### Example - open the calendar popup

    <input id="datetimepicker" />
    <button id="open">Open</button>
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    $("#open").click(function() {
        datetimepicker.open("date");
    });
    </script>

#### Example - open the time popup

    <input id="datetimepicker" />
    <button id="open">Open</button>
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    $("#open").click(function() {
        datetimepicker.open("time");
    });
    </script>

### setOptions

Sets the options of the DateTimePicker. Use this method if you want to enable/disable a particular feature/option.

When setOptions is called, the DateTimePicker widget will be destroyed and recreated.

#### Parameters

Changes the initial DateTimePicker configuration.

##### options `Object`

The new configuration options.

#### Example - update the minimum date that the calendar can show

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        min: new Date(2001, 0, 1),
        max: new Date()
    });

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.setOptions({
        min: new Date(2010, 5, 6)
    });
    </script>

### toggle

Toggles the calendar or the time drop-down list.

#### Parameters

##### view `String`

The view of the DateTimePicker, expressed as a string.
Available views are "time" and "date".

#### Example - toggle the calendar popup

    <input id="datetimepicker" />
    <button id="toggle">Toggle</button>
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    $("#toggle").click(function() {
        datetimepicker.toggle("date");
    });
    </script>

#### Example - toggle the time popup

    <input id="datetimepicker" />
    <button id="toggle">Toggle</button>
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    $("#toggle").click(function() {
        datetimepicker.toggle("time");
    });
    </script>

### value

Gets or sets the value of the DateTimePicker.

#### Parameters

##### value `Date|String`

The time value to set for a DateTimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The time value of a DateTimePicker.

> * This method **does not trigger** [change](/api/javascript/ui/datetimepicker/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datepicker = $("#datetimepicker").data("kendoDateTimePicker");
    datepicker.value(new Date(2016, 10, 1));
    datepicker.trigger("change");
    </script>

#### Example - gets the value of the widget

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        value: new Date(2013, 10, 10)
    });

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    var value = datetimepicker.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - sets the value of the widget

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        value: new Date(2013, 10, 10)
    });

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.value(new Date());
    </script>

## Events

### change

Triggered when the underlying value of a DateTimePicker is changed.

#### Event Data

##### e.sender `kendo.ui.DateTimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the datetimepicker
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the datetimepicker
    });
    </script>

### close

Fires when the calendar or the time drop-down list is closed

#### Event Data

##### e.view `String`

The view which is closed. Possible values are "date" and "time".

##### e.sender `kendo.ui.DateTimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        close: function(e) {
            if (e.view === "date") {
                e.preventDefault(); //prevent popup closing
            }
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.bind("close", function(e) {
        if (e.view === "date") {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

### open

Fires when the calendar or the time drop-down list is opened

#### Event Data

##### e.view `String`

The view which is opened. Possible values are "date" and "time".

##### e.sender `kendo.ui.DateTimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        open: function(e) {
            if (e.view === "time") {
                e.preventDefault(); //prevent popup opening
            }
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    datetimepicker.bind("open", function(e) {
        if (e.view === "time") {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>
