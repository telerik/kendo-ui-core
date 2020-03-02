---
title: MultiViewCalendar
page_title: Configuration, methods and events of Kendo UI multiViewCalendar
description: Find out how to successfully configure multiViewCalendar UI component, how to use methods to get the max value of the multiViewCalendar and navigate easily.
res_type: api
component: multiViewCalendar
---

# kendo.ui.MultiViewCalendar

Represents the Kendo UI MultiViewCalendar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

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

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            culture: "de-DE"
        });
    </script>

### dates `Array`

 Specifies a list of dates, which will be passed to the month template.

#### Example - specify a list of dates

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
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

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

> Note the option will not be applied if **start** option is *lower* than **depth**. Always set both and **start** and **depth** options.

#### Example - set navigation depth of the multiViewCalendar

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            depth: "year"
        });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled in the multiViewCalendar.

#### Example - specify an array of days to be disabled

    <div id="multiViewCalendar"></div>
    <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
		value: new Date(),
		disableDates: ["we", "th"],
    });
    </script>

#### Example - specify an array of dates to be disabled

    <div id="multiViewCalendar"></div>
    <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
		value: new Date(2015,9,3),
        disableDates: [new Date(2015,9,12), new Date(2015,9,22)]
    });
    </script>

you can also pass a function that will be dynamically resolved for each date of the multiViewCalendar. Note that when the function returns true, the date will be disabled.

#### Example - use a function to disabled dates

    <div id="multiViewCalendar"></div>
    <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
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

 The [template](/api/javascript/kendo/methods/template) which renders the footer. If false, the footer will not be rendered.

#### Example - specify footer template as a function

    <div id="multiViewCalendar"></div>
    <script id="footer-template" type="text/x-kendo-template">
        Today - #: kendo.toString(data, "d") #
    </script>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            footer: kendo.template($("#footer-template").html())
        });
    </script>

#### Example - specify footer template as a string

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendomultiViewCalendar({
            footer: "Today - #: kendo.toString(data, 'd') #"
        });
    </script>

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to parse value set with value() method.

#### Example - specify a custom date format

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            format: "yyyy/MM/dd"
        });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the multiViewCalendar can show.

#### Example - specify the maximum date

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            max: new Date(2013, 0, 1) // set the max date to Jan 1st, 2013
        });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### messages.weekColumnHeader `String` *(default: "")*

Allows customization of the week column header text. Set the value to make the widget compliant with web accessibility standards.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
    $("#multiViewCalendar").kendoMultiViewCalendar({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date, which the multiViewCalendar can show.

#### Example - specify the minimum date

    <div id="multiViewCalendar"></div>
    <script>
        // set the min date to Jan 1st, 2011
        $("#multiViewCalendar").kendoMultiViewCalendar({
            min: new Date(2011, 0, 1)
        });
    </script>

### month `Object`

 Templates for the cells rendered in "month" view.

### month.content `String`

 The template to be used for rendering the cells in "month" view, which are between the min/max range.
 By default, the widget renders the value of the corresponding day.

#### Example - specify cell template as a string

    <style>
      .exhibition{
        background-color: #9DD0E0;
        color:black;
      }
      .party{
        color: red;
        background-color: #ccc;
      }
    </style>
    <body>

    <div id="multiViewCalendar"></div>
    <script id="cell-template" type="text/x-kendo-template">
        <div class="#= data.value < 10 ? 'exhibition' : 'party' #">
        #= data.value #
      </div>
    </script>
    <script>
      $("#multiViewCalendar").kendoMultiViewCalendar({
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

    <div id="multiViewCalendar"></div>
    <script id="week-template" type="text/x-kendo-template">
       <a class="italic">#= data.weekNumber #</a>
    </script>
    <script>
      $("#multiViewCalendar").kendoMultiViewCalendar({
        weekNumber: true,
        month: {
          weekNumber: $("#week-template").html()
        }
      });
    </script>

### month.empty `String`

 The template to be used for rendering the cells in the "month" view, which are not in the min/max range.
 By default, the widget renders an empty string.

#### Example - specify an empty cell template as a string

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            month: {
               empty: '-'
            }
        });
    </script>

### views `Number` *(default: 2)*

This property controls how many months to be shown at same time. By default it shows two months.

#### Example - show three months at same time

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            views: 3
        });
    </script>

### range `Object`

Configures the Kendo UI MultiViewCalendar range settings.

### range.start `Date`

This sets the start date of the range selection.

#### Example - show three months at same time

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            range: {
                start: new Date(2016, 10, 11),
                end: new Date(2016, 10, 22)
            }
        });
    </script>

### range.end `Date`

This sets the end date of the range selection.

#### Example - show three months at same time

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            range: {
                start: new Date(2016, 10, 11),
                end: new Date(2016, 10, 22)
            }
        });
    </script>

### selectable `String`  *(default: "single")*

By default user is able to select a single date. The property can also be set to "multiple" or "range". More information about multiple selection can be found in the [Selection]({% slug overview_kendoui_multiviewcalendar_widget %}#selection) article.

#### Example - enable the multiple selection

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "multiple"
        });
    </script>

> Check [Selection](https://demos.telerik.com/kendo-ui/multiviewcalendar/selection) for a live demo.

### selectDates `Array`  *(default: [])*

Specifies which dates to be selected when the multiViewCalendar is initialized.

> **Important:** This configuration option requires the [selectable](/api/javascript/ui/multiviewcalendar/configuration/selectable): "multiple" option to be set.

#### Example - set two dates to be selected upon multiViewCalendar initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "multiple",
            selectDates: [new Date(2013, 10, 10), new Date(2015, 10, 10)]
        });
    </script>

> Check [Selection](https://demos.telerik.com/kendo-ui/multiviewcalendar/selection) for a live demo.

### showViewHeader `Boolean` *(default: false)*

If set to true will render a header for every view.

#### Example - set two dates to be selected upon multiViewCalendar initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            showViewHeader: true
        });
    </script>

### weekNumber `Boolean` *(default: false)*

If set to `true` a week of the year will be shown on the left side of the multiViewCalendar.

#### Example - enable the week of the year option

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            weekNumber: true
        });
    </script>

### start `String`*(default: "month")*

Specifies the start view.
The following settings are available for the **start** value:

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

#### Example - specify the initial view, which multiViewCalendar renders

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            start: "year"
        });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.

#### Example - specify the selected value of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            value: new Date(2012, 0, 1)
        });
    </script>

## Methods

### current

Gets currently focused date.

#### Returns

`Date` The current focused date shown in the multiViewCalendar.

#### Example
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var current = multiViewCalendar.current(); //will be today, because value is `null`
    </script>

### destroy
Prepares the **multiViewCalendar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the multiViewCalendar element from DOM.

#### Example
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.destroy();
    </script>

### max

Gets/Sets the max value of the multiViewCalendar.

#### Parameters

##### value `Date | String`

The max date to set.

#### Returns

`Date` The max value of the multiViewCalendar.

#### Example - get the max value of the multiViewCalendar

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var max = multiViewCalendar.max();
    </script>

#### Example - set the max value of the multiViewCalendar

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.max(new Date(2100, 0, 1));
    </script>

### min

Gets/Sets the min value of the multiViewCalendar.

#### Parameters

##### value `Date|String`

The min date to set.

#### Returns

`Date` The min value of the multiViewCalendar.

#### Example - get the min value of the multiViewCalendar

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var min = multiViewCalendar.min();
    </script>

#### Example - set the min value of the multiViewCalendar

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.min(new Date(1900, 0, 1));
    </script>

### navigate

Navigates to view.

#### Parameters

##### value `Date`

Desired date.

##### view `String`

Desired view.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigate(new Date(2012, 0, 1), "year");
    </script>

### navigateDown

Navigates to the lower view.

#### Parameters

##### value `Date`

Desired date.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateDown(new Date(2012, 0, 1));
    </script>

### navigateToFuture

Navigates to the future.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateToFuture();
    </script>

### navigateToPast

Navigates to the past.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateToPast();
    </script>

### navigateUp

Navigates to the upper view.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateUp();
    </script>

### selectDates

Gets/Sets the selected dates for the multiViewCalendar.

#### Parameters

##### dates `Array`

A list of the dates to be selected.

#### Returns

`Array` The currently selected dates.

> **Important:** This method requires the [selectable](/api/javascript/ui/multiviewcalendar/configuration/selectable): "multiple" option to be set.

#### Example - gets the selected dates of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectDates: [new Date(2013, 10, 10), new Date(2015, 10, 10)],
            selectable: "multiple"
        });

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var value = multiViewCalendar.selectDates();
    </script>

#### Example - sets the value of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectDates: [new Date(2013, 10, 10), new Date(2015, 10, 10)],
            selectable: "multiple"
        });

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.selectDates([new Date(2016, 10,10), new Date()]);
    </script>

### selectRange

Gets/Sets the selected range for the multiViewCalendar.

#### Parameters

##### range `Object`

The range to set. It should have a start and end properties with the respective dates.

#### Returns

`Object` The selected range of the multiViewCalendar. The object has a start and end properties.

> **Important:** This method requires the [selectable](/api/javascript/ui/multiviewcalendar/configuration/selectable): "range" option to be set.

#### Example - gets the selected range for the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            range: {
                start: new Date(2018, 9, 10),
                end: new Date(2018, 10, 10)
            },
            selectable: "range"
        });

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var range = multiViewCalendar.selectRange();
    </script>

#### Example - sets the range of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "range"
        });

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.selectRange({ start: new Date(2018, 9, 10), end: new Date(2018, 10, 10) });
    </script>

### value

Gets/Sets the value of the multiViewCalendar.

#### Parameters

##### value `Date|String`

The date to set.

#### Returns

`Date` The value of the multiViewCalendar.

#### Example - gets the value of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            value: new Date(2013, 10, 10)
        });

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var value = multiViewCalendar.value();
    </script>

#### Example - sets the value of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            value: new Date(2013, 10, 10)
        });

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.value(new Date());
    </script>

### view

Gets an instance of the current view used by the multiViewCalendar.

#### Returns

`Object` The instance of the current view used by the multiViewCalendar.

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        var view = multiViewCalendar.view();
    </script>

## Events

### change

Fires when selection is changed.

#### Example - subscribe to the "change" event during initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            change: function() {
                var value = this.value();
                console.log(value); //value is the selected date in the multiViewCalendar
            }
        });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.bind("change", function() {
            var value = this.value();
            console.log(value); //value is the selected date in the multiViewCalendar
        });
    </script>

### navigate

Fires when multiViewCalendar navigates.

#### Example - subscribe to the "navigate" event during initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            navigate: function() {
                var view = this.view();
                console.log(view.name); //name of the current view

                var current = this.current();
                console.log(current); //currently focused date
            }
        });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.bind("navigate", function() {
            var view = this.view();
            console.log(view.name); //name of the current view

            var current = this.current();
            console.log(current); //currently focused date
        });
    </script>
