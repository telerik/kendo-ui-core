---
title: DateRangePicker
page_title: Configuration, methods and events of Kendo UI DateRangePicker
description: Easy to follow steps guide how to quickly configure DateRangePicker UI widget, easily enable/disable it using methods and how to change events.
res_type: api
---

# kendo.ui.DateRangePicker

Represents the Kendo UI DateRangePicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### ARIATemplate `String`*(default: "Current focused #=data.valueType# is #=data.text#")*

 Specifies a template used to populate value of the aria-label attribute of the currently focused cell of the calendar..The parameters available for the template are:

* `current` - The current focused date.
* `valueType` - The focused item value type - month, year and etc.
* `text` - A text representing the focused value.

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#"
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

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        culture: "de-DE"
    });
    </script>

### dates `Array`

Specifies a list of dates, which will be passed to the [month template](/api/javascript/ui/daterangepicker#configuration-month.content).

#### Example - specify a list of dates

    <style>
      .party{color:red}
    </style>

    <div id="daterangepicker"></div>

    <script id="cell-template" type="text/x-kendo-template">
      <span class="#= isInArray(data.date, data.dates) ? 'party' : '' #">#= data.value #</span>
    </script>

    <script>
      $("#daterangepicker").kendoDateRangePicker({
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

### depth `String` *(default: "month")*

Specifies the navigation depth. The following
settings are available for the **depth** value:

* `"month"` - Shows the days of the month. (default value)
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

> Note the option will not be applied if **start** option is *lower* than **depth**. Always set both **start** and **depth** options. In order to be able to select dates for the range you need to set the `depth` to `month`.

#### Example - set navigation depth of the calendar popup

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        depth: "month",
        start: "year"
    });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled for selection by the widget.

#### Example - specify an array of days to be disabled

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
		disableDates: ["we", "th"]
    });
    </script>

#### Example - specify an array of dates to be disabled

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        disableDates: [new Date(2015,9,12), new Date(2015,9,22)]
    });
    </script>

you can also pass a function that will be dynamically resolved for each date of the calendar. Note that when the function returns true, the date will be disabled.

#### Example - use a function to disabled dates

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
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

### endField `String`*(default: "")*

Specifies the end field name for model binding.

#### Example - specify the initial view, which calendar renders

	<div id="example">
		<div id="daterangepicker" title="daterangepicker"></div>
		<script>
			$(document).ready(function () {
				$("#daterangepicker").kendoDateRangePicker({
					endField: "endField"
				});

				var viewModel = kendo.observable({
					endField: new Date()
				});
				kendo.bind($("#example"), viewModel);
			});
		</script>
	</div>
	
### footer `String|Function`

 The [template](/api/javascript/kendo/methods/template) which renders the footer of the calendar. If false, the footer will not be rendered.

#### Example - specify footer template as a function

    <div id="daterangepicker"></div>
    <script id="footer-template" type="text/x-kendo-template">
        Today - #: kendo.toString(data, "d") #
    </script>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        footer: kendo.template($("#footer-template").html())
    });
    </script>

#### Example - specify footer template as a string

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        footer: "Today - #: kendo.toString(data, 'd') #"
    });
    </script>

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to format the value of the DateRangePicker displayed in the input. The format also will be used to parse the input.

 For more information on date and time formats please refer to [Date Formatting](/framework/globalization/dateformatting).

#### Example - specify a custom date format

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        format: "yyyy/MM/dd"
    });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example - specify the maximum date

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        max: new Date() // sets max date to today's date
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        "messages": {
            "startLabel": "The Start",
            "endLabel": "The End"
        }
     })
    </script>

### messages.startLabel `String` *(default: "Start")*

Allows customization of the start label text.

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        "messages": {
            "startLabel": "The Start"
        }
     })
    </script>

### messages.endLabel `String` *(default: "End")*

Allows customization of the end label text.

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        "messages": {
            "endLabel": "The End"
        }
     })
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.

#### Example - specify the minimum date

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        min: new Date() // sets min date to today's date
    });
    </script>

### month `Object`

Templates for the cells rendered in the calendar "month" view.

### month.content `String`

The template to be used for rendering the cells in "month" view, which are between the min/max range.

#### Example - specify cell template as a string

    <style>
      .exhibition{color:blue}
      .party{color:red}
    </style>

    <div id="daterangepicker"></div>

    <script id="cell-template" type="text/x-kendo-template">
        <span class="#= data.value < 10 ? 'exhibition' : 'party' #">#= data.value #</span>
    </script>

    <script>
    $("#daterangepicker").kendoDateRangePicker({
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

    <div id="daterangepicker1"></div>

    <script id="week-template" type="text/x-kendo-template">
       <a class="italic">#= data.weekNumber #</a>
    </script>
    <script>
      $("#daterangepicker1").kendoDateRangePicker({
        weekNumber: true,
        month: {
          weekNumber: $("#week-template").html()
        }
      });
    </script>

### month.empty `String`

The template used for rendering cells in the "month" view, which are outside the min/max range.

#### Example - specify an empty cell template as a string

    <div id="daterangepicker1"></div>
    <script>
    $("#daterangepicker1").kendoDateRangePicker({
        month: {
           empty: '-'
        }
    });
    </script>

#### Example - add date value to the out-of-range cells

    <div id="daterangepicker2"></div>
    <script>
    $("#daterangepicker2").kendoDateRangePicker({
        month: {
           empty: '<span style="color:\\#ccc;padding:0 .45em 0 .1em;">#= data.value #</span>'
        }
    });
    </script>

### labels `Boolean` *(default: true)*

Determines if the labels for the inputs will be visible.

#### Example - disable the labels

    <div id="daterangepicker1"></div>
    <script>
        $("#daterangepicker1").kendoDateRangePicker({
            labels: false
        });
    </script>

### weekNumber `Boolean` *(default: false)*

If set to `true` a week of the year will be shown on the left side of the calendar. It is possible to define a template in order to customize what will be displayed.

#### Example - enable the week of the year option

    <div id="daterangepicker1"></div>
    <script>
        $("#daterangepicker1").kendoDateRangePicker({
            weekNumber: true
        });
    </script>

### range `Object`

Configures the Kendo UI DateRangePicker range settings.

### range.start `Date`

This sets the start date of the range selection.

#### Example - show three months at same time

    <div id="daterangepicker1"></div>
    <script>
        $("#daterangepicker1").kendoDateRangePicker({
            range: {
                start: new Date(2019, 10, 11),
                end: new Date(2019, 10, 22)
            }
        });
    </script>

### range.end `Date`

This sets the end date of the range selection.

#### Example - show three months at same time

    <div id="daterangepicker1"></div>
    <script>
        $("#daterangepicker1").kendoDateRangePicker({
            range: {
                start: new Date(2019, 10, 11),
                end: new Date(2019, 10, 22)
            }
        });
    </script>

### start `String`*(default: "month")*

Specifies the start view.
The following settings are available for the **start** value:

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

#### Example - specify the initial view, which calendar renders

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            start: "year"
        });
    </script>
	
### startField `String`*(default: "")*

Specifies the start field name for model binding.

#### Example - specify the initial view, which calendar renders

	<div id="example">
		<div id="daterangepicker" title="daterangepicker"></div>
		<script>
			$(document).ready(function () {
				$("#daterangepicker").kendoDateRangePicker({
					startField: "startField"
				});

				var viewModel = kendo.observable({
					startField: new Date()
				});
				kendo.bind($("#example"), viewModel);
			});
		</script>
	</div>

## Fields

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    var options = daterangepicker.options;
    <script>

## Methods

### close

Closes the calendar.

#### Example

    <div id="daterangepicker"></div>
    <button id="close">Close</button>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    $("#close").click(function() {
        daterangepicker.close();
    });
    </script>

### destroy
Prepares the **DateRangePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DateRangePicker element from DOM.

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    // detach events
    daterangepicker.destroy();
    </script>

### enable

Enable/Disable the DateRangePicker widget.

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the DateRangePicker.

#### Example - disable DateRangePicker widget

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.enable(false);
    </script>

#### Example - enable DateRangePicker widget

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the DateRangePicker should be readonly or editable.

#### Example - make DateRangePicker widget readonly

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.readonly();
    </script>

#### Example - make DateRangePicker widget editable

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.readonly(false);
    </script>

### max

Gets/Sets the max value of the DateRangePicker.

#### Parameters

##### value `Date | String`

The max date to set.

#### Returns

`Date` The max value of the DateRangePicker.

#### Example - get the max value of the DateRangePicker

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    var max = daterangepicker.max();

    console.log(max);
    </script>

#### Example - set the max value of the DateRangePicker

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.max(new Date(2100, 0, 1));
    </script>

### min

Gets/Sets the min value of the DateRangePicker.

#### Parameters

##### value `Date | String`

The min date to set.

#### Returns

`Date` The min value of the DateRangePicker.

#### Example - get the min value of the DateRangePicker

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    var min = daterangepicker.min();

    console.log(min);
    </script>

#### Example - set the min value of the DateRangePicker

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.min(new Date(2000, 0, 1));
    </script>

### open

Opens the calendar.

#### Example

    <div id="daterangepicker"></div>
    <button id="open">Open</button>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    $("#open").click(function() {
        daterangepicker.open();
    });
    </script>

### range

Gets/Sets the selected range for the DateRangePicker.

#### Parameters

##### range `Object`

The range to set. It should have a start and end properties with the respective dates.

#### Returns

`Object` The selected range of the DateRangePicker. The object has a start and end properties.

#### Example - gets the selected range for the widget

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            range: {
                start: new Date(2018, 9, 10),
                end: new Date(2018, 10, 10)
            }
        });

        var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

        var range = daterangepicker.range();
    </script>

#### Example - sets the range of the widget

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            selectable: "range"
        });

        var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

        daterangepicker.range({ start: new Date(2018, 9, 10), end: new Date(2018, 10, 10) });
    </script>

### setOptions

Changes the initial DateRangePicker configuration.

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        min: new Date(2001, 0, 1),
        max: new Date()
    });

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.setOptions({
        min: new Date(2010, 5, 6)
    });
    </script>

## Events

### change

Fires when the selected date is changed

#### Event Data

##### e.sender `kendo.ui.DateRangePicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        change: function() {
            var range = this.range();
            console.log(range);
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.bind("change", function() {
        var range = this.range();
        console.log(range);
    });
    </script>

### close

Fires when the calendar is closed

#### Event Data

##### e.sender `kendo.ui.DateRangePicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the calendar is opened

#### Event Data

##### e.sender `kendo.ui.DateRangePicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    daterangepicker.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });
    </script>
