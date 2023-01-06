---
title: DatePicker
page_title: Configuration, methods and events of Kendo UI DatePicker
description: Easy to follow steps guide how to quickly configure DatePicker UI widget, easily enable/disable it using methods and how to change events.
res_type: api
component: date-time-pickers
---

# kendo.ui.DatePicker

Represents the Kendo UI DatePicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Boolean|Object`

Configures the opening and closing animations of the calendar popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the calendar popup will open and close instantly.

`animation:true` is not a valid configuration.

#### Example - disable open and close animations

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
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

The animation played when the calendar popup is closed.

#### Example - configure the close animation

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
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

The animation played when the calendar popup is opened.

#### Example - configure the open animation

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
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

### ARIATemplate `String`*(default: "Current focused ${valueType} is ${text}")*

 Specifies a template used to populate the value of the aria-label attribute of the currently focused cell of the calendar. The parameters available for the template are:

* `current` - The current focused date.
* `valueType` - The focused item value type - month, year and etc.
* `text` - A text representing the focused value.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        ARIATemplate: ({ current }) => `Date: ${kendo.toString(current, 'G')}`
    });
    </script>

### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.

#### Example - specify modern component type

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
            componentType: "modern"
        });
    </script>

### culture `String`*(default: "en-US")*

 Specifies the culture info used by the widget.

#### Example - specify German culture internationalization

    <!--
        Include the culture file.
        List of available cultures - https://github.com/telerik/kendo-ui-core/tree/master/src/cultures
    -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/cultures/kendo.culture.de-DE.min.js"></script>

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        culture: "de-DE",
        value: new Date()
    });
    </script>

### dateInput `Boolean`*(default: false)*

 Specifies if the DatePicker will use [DateInput](/api/javascript/ui/dateinput) for editing value

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true
    });
    </script>

### dates `Array`

Specifies a list of dates, which will be passed to the [month content](/api/javascript/ui/datepicker/configuration/month#monthcontent).

#### Example - specify a list of dates

    <style>
      .party{color:red}
    </style>

    <input id="datepicker" />

    <script>
      $("#datepicker").kendoDatePicker({
        value: new Date(2000, 10, 1),
        month: {
          content: ({ date, dates, value }) => `<span class="${isInArray(date, dates) ? 'party' : '' }">${value}</span>`
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

Specifies the navigation depth. The following
settings are available for the **depth** value:

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

> Note the option will not be applied if **start** option is *lower* than **depth**. Always set both **start** and **depth** options.

#### Example - set navigation depth of the calendar popup

    <input id="datepicker"/>
    <script>
    $("#datepicker").kendoDatePicker({
        depth: "year",
        start: "year"
    });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled for selection by the widget.

#### Example - specify an array of days to be disabled

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
		value: new Date(),
		disableDates: ["we", "th"],
    });
    </script>

#### Example - specify an array of dates to be disabled

    <input id="datepicker">
    <script>
    $("#datepicker").kendoDatePicker({
		value: new Date(2015,9,3),
        disableDates: [new Date(2015,9,12), new Date(2015,9,22)]
    });
    </script>

you can also pass a function that will be dynamically resolved for each date of the calendar. Note that when the function returns true, the date will be disabled.

#### Example - use a function to disabled dates

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
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

### footer `String|Function|Boolean`

 The [template](/api/javascript/kendo/methods/template) which renders the footer of the calendar. If false, the footer will not be rendered.

#### Example - specify footer template as a string literal

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        footer: (data) => `Today - ${kendo.htmlEncode(kendo.toString(data, 'd'))}`
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"

#### Example - sets the fillMode

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        fillMode: "flat"
    });
    </script>

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to format the value of the DatePicker displayed in the input. The format also will be used to parse the input.

 For more information on date and time formats please refer to [Date Formatting](/framework/globalization/dateformatting).

#### Example - specify a custom date format

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        format: "yyyy/MM/dd"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the datepicker. If the datepicker has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
            label: "Date"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
                label: function() {
                    return "Date";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
                label: {
                    content: "Date"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
                label: {
                    content: function() {
                        return "Date";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/datepicker/methods/value) method **does not trigger** the `focusout` event of the datepicker.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#datepicker").data("kendoDatePicker").label.floatingLabel.refresh();`

#### Example - create a floating label

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
                label: {
                    content: "Date",
                    floating: true
                }
        })
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example - specify the maximum date

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        max: new Date() // sets max date to today's date
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### messages.weekColumnHeader `String` *(default: "")*

Allows customization of the week column header text in the Calendar. Set the value to make the widget compliant with web accessibility standards.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.

#### Example - specify the minimum date

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        min: new Date() // sets min date to today's date
    });
    </script>

### month `Object`

Templates for the cells rendered in the calendar "month" view.

### month.content `String`

The template to be used for rendering the cells in "month" view, which are between the min/max range.

#### Example - specify cell template as a string literal

    <style>
      .exhibition{color:blue}
      .party{color:red}
    </style>

    <input id="datepicker" />

    <script>
    $("#datepicker").kendoDatePicker({
        month: {
           content: (data) => `<span class="${data.value < 10 ? 'exhibition' : 'party'}">${data.value}</span>`
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

    <input id="datepicker1" />

    <script>
      $("#datepicker1").kendoDatePicker({
        weekNumber: true,
        month: {
          weekNumber: ({ weekNumber }) => `<a class="italic">${weekNumber}</a>`
        }
      });
    </script>

### month.empty `String`

The template used for rendering cells in the "month" view, which are outside the min/max range.

#### Example - specify an empty cell template as a string

    <input id="datepicker1" />
    <script>
    $("#datepicker1").kendoDatePicker({
        month: {
           empty: '-'
        }
    });
    </script>

#### Example - add date value to the out-of-range cells

    <input id="datepicker2" />
    <script>
    $("#datepicker2").kendoDatePicker({
        month: {
           empty: ({ value }) => `<span style="color:#ccc;padding:0 .45em 0 .1em;">${value}</span>`
        }
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="datepicker" />
    </div>
    <script>
    $("#datepicker").kendoDatePicker({
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="datepicker" />
    </div>
    <script>
    $("#datepicker").kendoDatePicker({
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
        <input id="datepicker" />
    </div>
    <script>
    $("#datepicker").kendoDatePicker({
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
        <input id="datepicker" />
    </div>
    <script>
    $("#datepicker").kendoDatePicker({
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

    <input id="datepicker1" />
    <script>
        $("#datepicker1").kendoDatePicker({
            weekNumber: true
        });
    </script>

### parseFormats `Array`

 Specifies a list of date formats used to parse the value set with `value()` method or by direct user input. If not set the value of the format will be used.
 Note that the `format` option is always used during parsing.

 > The order of the provided parse formats is important and it should go from more strict to less strict.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        format: "yyyy/MM/dd",
        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats
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

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
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

    $("#datepicker").kendoDatePicker({
        size: "large"
    });

### start `String`*(default: "month")*

Specifies the start view.
The following settings are available for the **start** value:

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

#### Example - specify the initial view, which calendar renders

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
            start: "year"
        });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        value: new Date(2011, 0, 1)
    });
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget. The options object holds all available [DatPicker configuration fields](/api/javascript/ui/datepicker#configuration).

#### Example - get options of the widget

    <input id="datepicker" />
    <script>
        //initialize the DatePicker
        $("#datepicker").kendoDatePicker();
        //get instance of the DatePicker
        var datepicker = $("#datepicker").data("kendoDatePicker");
        //Get the DatePicker options object
        var options = datepicker.options;
        console.log("options", options)
    </script>

## Methods

### close

Closes the calendar.

#### Example

    <input id="datepicker" />
    <button id="close">Close</button>
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    $("#close").click(function() {
        datepicker.close();
    });
    </script>

### destroy
Prepares the **DatePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DatePicker element from DOM.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    // detach events
    datepicker.destroy();
    </script>

### enable

Enable/Disable the DatePicker widget.

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the DatePicker.

#### Example - disable DatePicker widget

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.enable(false);
    </script>

#### Example - enable DatePicker widget

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the DatePicker should be readonly or editable.

#### Example - make DatePicker widget readonly

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.readonly();
    </script>

#### Example - make DatePicker widget editable

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.readonly(false);
    </script>

### max

Gets/Sets the max value of the DatePicker.

#### Parameters

##### value `Date | String`

The max date to set.

#### Returns

`Date` The max value of the DatePicker.

#### Example - get the max value of the DatePicker

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    var max = datepicker.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the DatePicker

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.max(new Date(2100, 0, 1));
    </script>

### min

Gets/Sets the min value of the DatePicker.

#### Parameters

##### value `Date | String`

The min date to set.

#### Returns

`Date` The min value of the DatePicker.

#### Example - get the min value of the DatePicker

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    var min = datepicker.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the DatePicker

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.min(new Date(2000, 0, 1));
    </script>

### open

Opens the calendar.

#### Example

    <input id="datepicker" />
    <button id="open">Open</button>
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    $("#open").click(function() {
        datepicker.open();
    });
    </script>

### setOptions

Changes the initial DatePicker configuration by updating the options object. The options object holds all available [DatPicker configuration fields](/api/javascript/ui/datepicker#configuration).

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        min: new Date(2001, 0, 1),
        max: new Date()
    });

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.setOptions({
        min: new Date(2010, 5, 6)
    });
    </script>

### value

Gets/Sets the value of the DatePicker.

#### Parameters

##### value `Date | String`

The value to set.

#### Returns

`Date` The value of the DatePicker.

> * This method **does not trigger** [change](/api/javascript/ui/datepicker/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");
    datepicker.value(new Date(2016, 10, 1));
    datepicker.trigger("change");
    </script>

#### Example - gets the value of the widget

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        value: new Date(2013, 10, 10)
    });

    var datepicker = $("#datepicker").data("kendoDatePicker");

    var value = datepicker.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - sets the value of the widget

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        value: new Date(2013, 10, 10)
    });

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.value(new Date());
    </script>

## Events

### change

Fires when the selected date is changed

#### Event Data

##### e.sender `kendo.ui.DatePicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the datepicker
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the datepicker
    });
    </script>

### close

Fires when the calendar is closed

#### Event Data

##### e.sender `kendo.ui.DatePicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the calendar is opened

#### Event Data

##### e.sender `kendo.ui.DatePicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    datepicker.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });
    </script>
