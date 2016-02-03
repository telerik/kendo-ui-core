---
title: DatePicker
page_title: Configuration, methods and events of Kendo UI DatePicker
description: Easy to follow steps guide how to quickly configure DatePicker UI widget, easily enable/disable it using methods and how to change events.
---

# kendo.ui.DatePicker

Represents the Kendo UI DatePicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object`

Configures the opening and closing animations of the calendar popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the calendar popup will open and close instantly.

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

### ARIATemplate `String`*(default: "Current focused date is #=kendo.toString(data.current, 'D')#")*

 Specifies a template used to populate value of the aria-label attribute.

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#"
    });
    </script>

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

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        culture: "de-DE"
    });
    </script>

### dates `Array`

Specifies a list of dates, which will be passed to the [month template](#configuration-month.content).

#### Example - specify a list of dates

    <style>
      .party{color:red}
    </style>

    <input id="datepicker" />

    <script id="cell-template" type="text/x-kendo-template">
      <span class="#= isInArray(data.date, data.dates) ? 'party' : '' #">#= data.value #</span>
    </script>

    <script>
      $("#datepicker").kendoDatePicker({
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

Specifies the navigation depth. The following
settings are available for the **depth** value:

#### *"month"*

shows the days of the month

#### *"year"*

shows the months of the year

#### *"decade"*

shows the years of the decade

#### *"century"*

shows the decades from the century

> Note the option will not be applied if **start** option is *lower* than **depth**. Always set both and **start** and **depth** options.

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

### footer `String|Function`

 The [template](/api/javascript/kendo#methods-template) which renders the footer of the calendar. If false, the footer will not be rendered.

#### Example - specify footer template as a function

    <input id="datepicker" />
    <script id="footer-template" type="text/x-kendo-template">
        Today - #: kendo.toString(data, "d") #
    </script>
    <script>
    $("#datepicker").kendoDatePicker({
        footer: kendo.template($("#footer-template").html())
    });
    </script>

#### Example - specify footer template as a string

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        footer: "Today - #: kendo.toString(data, 'd') #"
    });
    </script>

### format `String`*(default: "MM/dd/yyyy")*

 Specifies the format, which is used to format the value of the DatePicker displayed in the input. The format also will be used to parse the input.

#### Example - specify a custom date format

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        format: "yyyy/MM/dd"
    });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example - specify the maximum date

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        max: new Date(2013, 0, 1) // sets max date to Jan 1st, 2013
    });
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.

#### Example - specify the minimum date

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        min: new Date(2011, 0, 1) // sets min date to Jan 1st, 2011
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

    <input id="datepicker" />

    <script id="cell-template" type="text/x-kendo-template">
        <span class="#= data.value < 10 ? 'exhibition' : 'party' #">#= data.value #</span>
    </script>

    <script>
    $("#datepicker").kendoDatePicker({
        month: {
           content: $("#cell-template").html()
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
           empty: '<span style="color:\\#ccc;padding:0 .45em 0 .1em;">#= data.value #</span>'
        }
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

### start `String`*(default: "month")*

Specifies the start view.
The following settings are available for the **start** value:

#### *"month"*

shows the days of the month

#### *"year"*

shows the months of the year

#### *"decade"*

shows the years of the decade

#### *"century"*

shows the decades from the century

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
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker();

    var datepicker = $("#datepicker").data("kendoDatePicker");

    var options = datepicker.options;
    <script>

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

Changes the initial DatePicker configuration.

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

#### Example - gets the value of the widget

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        value: new Date(2013, 10, 10)
    });

    var datepicker = $("#datepicker").data("kendoDatePicker");

    var value = datepicker.value();
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
