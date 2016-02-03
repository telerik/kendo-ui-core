---
title: Calendar
page_title: Configuration, methods and events of Kendo UI Calendar
description: Find out how to successfully configure calendar UI component, how to use methods to get the max value of the calendar and navigate easily.
---

# kendo.ui.Calendar

Represents the Kendo UI Calendar widget. Inherits from [Widget](/api/javascript/ui/widget).

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

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            culture: "de-DE"
        });
    </script>

### dates `Array`

 Specifies a list of dates, which will be passed to the month template.

#### Example - specify a list of dates

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(2000, 10, 1),
            dates: [
                new Date(2000, 10, 10, 10, 0, 0),
                new Date(2000, 10, 10, 30, 0)
            ] //can manipulate month template depending on this array.
        });
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

#### Example - set navigation depth of the calendar

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            depth: "year"
        });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled in the calendar.

#### Example - specify an array of days to be disabled

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
		value: new Date(),
		disableDates: ["we", "th"],
    });
    </script>
	
#### Example - specify an array of dates to be disabled

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
		value: new Date(2015,9,3),
        disableDates: [new Date(2015,9,12), new Date(2015,9,22)]
    });
    </script>

you can also pass a function that will be dynamically resolved for each date of the calendar. Note that when the function returns true, the date will be disabled.

#### Example - use a function to disabled dates

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
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

 The [template](/api/javascript/kendo#methods-template) which renders the footer. If false, the footer will not be rendered.

#### Example - specify footer template as a function

    <div id="calendar"></div>
    <script id="footer-template" type="text/x-kendo-template">
        Today - #: kendo.toString(data, "d") #
    </script>
    <script>
        $("#calendar").kendoCalendar({
            footer: kendo.template($("#footer-template").html())
        });
    </script>

#### Example - specify footer template as a string

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            footer: "Today - #: kendo.toString(data, 'd') #"
        });
    </script>

### format `String`*(default: "MM/dd/yyyy")*

 Specifies the format, which is used to parse value set with value() method.

#### Example - specify a custom date format

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            format: "yyyy/MM/dd"
        });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example - specify the maximum date

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            max: new Date(2013, 0, 1) // set the max date to Jan 1st, 2013
        });
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date, which the calendar can show.

#### Example - specify the minimum date

    <div id="calendar"></div>
    <script>
        // set the min date to Jan 1st, 2011
        $("#calendar").kendoCalendar({
            min: new Date(2011, 0, 1)
        });
    </script>

### month `Object`

 Templates for the cells rendered in "month" view.

### month.content `String`

 The template to be used for rendering the cells in "month" view, which are between the min/max range.
 By default, the widget renders the value of the corresponding day.

#### Example - specify cell template as a string

    <div id="calendar"></div>
    <script id="cell-template" type="text/x-kendo-template">
        <div class="#= data.value < 10 ? 'exhibition' : 'party' #"></div>
        #= data.value #
    </script>
    <script>
        $("#calendar").kendoCalendar({
            month: {
               content: $("#cell-template").html()
            }
        });
    </script>

### month.empty `String`

 The template to be used for rendering the cells in the "month" view, which are not in the min/max range.
 By default, the widget renders an empty string.

#### Example - specify an empty cell template as a string

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            month: {
               empty: '-'
            }
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

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            start: "year"
        });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.

#### Example - specify the selected value of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(2012, 0, 1)
        });
    </script>

## Methods

### current

Gets currently focused date.

#### Returns

`Date` The current focused date shown in the calendar.

#### Example
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        var current = calendar.current(); //will be today, because value is `null`
    </script>

### destroy
Prepares the **Calendar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Calendar element from DOM.

#### Example
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.destroy();
    </script>

### max

Gets/Sets the max value of the calendar.

#### Parameters

##### value `Date | String`

The max date to set.

#### Returns

`Date` The max value of the calendar.

#### Example - get the max value of the calendar

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        var max = calendar.max();
    </script>

#### Example - set the max value of the calendar

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.max(new Date(2100, 0, 1));
    </script>

### min

Gets/Sets the min value of the calendar.

#### Parameters

##### value `Date|String`

The min date to set.

#### Returns

`Date` The min value of the calendar.

#### Example - get the min value of the calendar

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        var min = calendar.min();
    </script>

#### Example - set the min value of the calendar

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.min(new Date(1900, 0, 1));
    </script>

### navigate

Navigates to view.

#### Parameters

##### value `Date`

Desired date.

##### view `String`

Desired view.

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigate(new Date(2012, 0, 1), "year");
    </script>

### navigateDown

Navigates to the lower view.

#### Parameters

##### value `Date`

Desired date.

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateDown(new Date(2012, 0, 1));
    </script>

### navigateToFuture

Navigates to the future.

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateToFuture();
    </script>

### navigateToPast

Navigates to the past.

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateToPast();
    </script>

### navigateUp

Navigates to the upper view.

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateUp();
    </script>

### value

Gets/Sets the value of the calendar.

#### Parameters

##### value `Date|String`

The date to set.

#### Returns

`Date` The value of the calendar.

#### Example - gets the value of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(2013, 10, 10)
        });

        var calendar = $("#calendar").data("kendoCalendar");

        var value = calendar.value();
    </script>

#### Example - sets the value of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(2013, 10, 10)
        });

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.value(new Date());
    </script>

### view

Gets an instance of the current view used by the calendar.

#### Returns

`Object` The instance of the current view used by the calendar.

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        var view = calendar.view();
    </script>

## Events

### change

Fires when the selected date is changed.

#### Example - subscribe to the "change" event during initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            change: function() {
                var value = this.value();
                console.log(value); //value is the selected date in the calendar
            }
        });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.bind("change", function() {
            var value = this.value();
            console.log(value); //value is the selected date in the calendar
        });
    </script>

### navigate

Fires when calendar navigates.

#### Example - subscribe to the "navigate" event during initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            navigate: function() {
                var view = this.view();
                console.log(view.name); //name of the current view

                var current = this.current();
                console.log(current); //currently focused date
            }
        });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.bind("navigate", function() {
            var view = this.view();
            console.log(view.name); //name of the current view

            var current = this.current();
            console.log(current); //currently focused date
        });
    </script>
