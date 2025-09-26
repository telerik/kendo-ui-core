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

### allowReverse `Boolean` *(default: false)*

Enables the user to select an end date that is before the start date. This option is available only when the [`selectable`](/api/javascript/ui/multiviewcalendar/configuration/selectable) configuration is set to **range**.


<div class="meta-api-description">
Configure the calendar to permit selecting date ranges where the end date precedes the start date, enabling reverse range selection or choosing dates in backward order within a multi-view calendar. This setting supports flexible date range input, allowing users to pick an end date earlier than the start, helpful for scenarios needing inverted or reverse chronological selection, and works in conjunction with range-based date picking controls. Adjust the calendar behavior to control whether date ranges can flow backward, enabling or disabling reverse date intervals and supporting unconventional start-end sequences in date range selection.
</div>

#### Example - enable reverse selection

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "range",
            allowReverse: true
        });
    </script>

### centuryCellsFormat `String`*(default: "long")*

 Specifies the format of the century cells.

* `"long"` - The cells will display a decade range **2000-2009**, **2010-2019**.
* `"short"` - The cells will display just the starting year of the decade **2000**, **2010**.


<div class="meta-api-description">
Adjust, configure, or control how decade labels or century cells appear in calendar views, enabling display options for date ranges like full decade spans such as 2000-2009 or simplified formats showing only the starting year of each decade like 2000 or 2010. Enable selection between detailed date range formatting versus minimalistic year-only labels for multi-year calendar navigation, decade grouping, or timeline presentations within calendar interfaces. Customize decade cell display styles for clearer timeline visualization or compact year-only identification in multi-view or century-level calendar components.
</div>

#### Example - render the short version of the century cells

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            centuryCellsFormat: "short",
            start: "century"
        });
    </script>

### culture `String`*(default: "en-US")*

Specifies the culture info used by the component. A valid kendo culture file must be added to the page in order for the example to work. `<script src="https://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>`


<div class="meta-api-description">
Set or customize the language and regional settings for calendar date formats, month and day names, localization, and cultural preferences by specifying a locale or culture code like "de-DE" or any valid language identifier; control how dates, months, and weekdays appear in multi-view calendar components by enabling language-specific formatting, regional date conventions, internationalization, or cultural display so that the calendar aligns with user locale settings and supports multilingual, localized user experiences.
</div>

#### Example - specify a culture

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            culture: "de-DE"
        });
    </script>

### dates `Array`

 Specifies a list of dates, which will be passed to the month template.


<div class="meta-api-description">
Control and customize calendar cells by specifying a collection of dates to highlight, decorate, or modify month views in calendar components, enabling dynamic rendering, conditional styling, date-specific formatting, and custom template data injection for particular days, allowing developers to configure special event markers, disabled dates, or distinct appearances based on supplied date lists and customize month cell behavior in multi-view calendar interfaces.
</div>

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


<div class="meta-api-description">
Control how far users can navigate within a calendar interface by configuring the minimum zoom level or view granularity, such as restricting navigation to days, months, years, decades, or centuries. Set or limit calendar navigation depth to define whether users can browse detailed daily views, monthly grids, annual overviews, decade ranges, or century spans, enabling precise control over calendar view hierarchy and navigation scope. Adjust settings to enable, disable, or constrain transitions between different time scales in a calendar widget, ensuring that users navigate only within desired temporal levels like month, year, decade, or century view layers. Manage calendar navigation boundaries and view levels for user interfaces handling date selection or browsing across different calendar intervals from day-level up to century-level views.
</div>

#### Example - set navigation depth of the multiViewCalendar

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            depth: "year"
        });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled in the multiViewCalendar.


<div class="meta-api-description">
Control which calendar dates cannot be selected or interacted with by specifying exact dates to block or by providing a function that dynamically disables dates based on custom logic, enabling configuration of unavailable, non-selectable, disabled, or restricted dates within a multi-view calendar component; useful for preventing user selection on holidays, weekends, past or future dates, blackout periods, or any specific conditions requiring date exclusion or date disabling behavior.
</div>

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


<div class="meta-api-description">
Control the visibility and content of the calendar footer by configuring, customizing, or disabling the bottom section of the calendar interface; set custom templates to render personalized footer elements, remove the footer completely by turning off its rendering, or adjust footer appearance and behavior for multi-view calendar layouts, enabling developers to enable, disable, hide, or customize footer components to fit design requirements or user interaction needs on calendar widgets and date pickers.
</div>

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
        $("#multiViewCalendar").kendoMultiViewCalendar({
            footer: "Today - #: kendo.toString(data, 'd') #"
        });
    </script>

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to parse value set with value() method.


<div class="meta-api-description">
Control how date strings, timestamps, or programmatic inputs are interpreted and converted into date objects by specifying date formats, patterns, or string templates for parsing values passed to date handling methods. Enable customized date parsing by setting the exact format to match input strings, guiding how external or programmatic date values are read, interpreted, or converted into usable date representations within calendar or scheduling components. Configure parsing behavior to handle different date formats such as ISO, localized patterns, or custom date strings when setting or updating calendar values programmatically or via APIs.
</div>

#### Example - specify a custom date format

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            format: "yyyy/MM/dd"
        });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the multiViewCalendar can show.


<div class="meta-api-description">
Set the maximum allowable date or end date limit for a calendar view, controlling the latest date users can navigate to or select within multi-view calendar components, restricting calendar navigation, disabling future dates beyond the specified boundary, limiting visible months to a specific cutoff, preventing date selection after a certain point, configuring the upper date boundary for calendar widgets, enforcing date constraints that block dates past a defined maximum, and managing date range limits to restrict navigation and selection in multi-month or multi-view calendar interfaces.
</div>

#### Example - specify the maximum date

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            max: new Date(2013, 0, 1) // set the max date to Jan 1st, 2013
        });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
Customize and translate all calendar interface text including labels, tooltips, button names, and messages for multilingual support and localization in calendar views; configure and set language-specific UI strings, override default text, provide custom translations, and adapt the calendar’s display language to suit different regions or user preferences.
</div>

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


<div class="meta-api-description">
Customize or set the text label for the week column header in a multi-view calendar interface to support localization, accessibility, and internationalization needs; control or override default week column names to display custom headers, translations, or localized strings for week identifiers, enabling better user experience across languages and accessible designs by configuring calendar week header text or messages.
</div>

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


<div class="meta-api-description">
Set the earliest selectable or viewable date to limit calendar navigation and restrict displayed dates before a given point, enabling control over minimum date boundaries, start date constraints, disabling past dates, preventing selection or viewing of dates earlier than the specified threshold, and configuring the calendar to only allow future or defined date ranges from this minimum date forward.
</div>

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


<div class="meta-api-description">
Configure custom templates, customize daily cell content, set visual styles for each day in month view, control how individual dates appear within a multi-month calendar interface, define dynamic or static cell layouts for calendar days, customize rendering of day cells in month display, enable personalized content and formatting for monthly calendar cells, tailor each day's presentation in a multi-view calendar when showing monthly dates, adjust and control the appearance and content of day grid cells in month mode, modify or set templates to influence how the monthly days are displayed and rendered.
</div>

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            month: {
                content: (data) => `<span class="custom-cell">${data.value}</span>`,
                empty: (data) => `<span class="empty-cell">&nbsp;</span>`
            }
        });
    </script>

### month.content `String`

 The template to be used for rendering the cells in "month" view, which are between the min/max range.
 By default, the widget renders the value of the corresponding day.


<div class="meta-api-description">
Customize the appearance and content of month view calendar cells by providing templates or render functions to control how each day between minimum and maximum date ranges is displayed, including modifying HTML structure, inserting custom labels, formatting dates, displaying additional data, or overriding default day values; useful for configuring calendar cell content, tailoring day render output, enabling advanced month view customization, setting custom templates for days, and controlling how month cells show information within date boundaries.
</div>

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


<div class="meta-api-description">
Control and customize the display of week numbers in calendar views by setting templates that define the content and structure of week column cells, enabling developers to format, calculate, or style the week labels dynamically based on the starting date of each week or the week number itself; supports creating custom week identifiers, adjusting week number calculations, rendering alternative week formats, and integrating date-based logic for personalized calendar presentations and layouts.
</div>

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


<div class="meta-api-description">
Control and customize the appearance of month view calendar cells that fall outside the allowed date range or minimum and maximum boundaries by setting templates or content for out-of-range or disabled month cells. Enable custom rendering, placeholders, or empty states for calendar dates that are not selectable or lie beyond configured limits, allowing for tailored visual display of unavailable or inactive month cells, such as grayed out, blank, or custom messages to indicate out-of-scope calendar days within multi-view or monthly calendar components. Adjust the display behavior for cells outside the min and max allowed months to enhance UI clarity and user interaction with date ranges in multi-month calendar views.
</div>

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


<div class="meta-api-description">
Control and customize the number of calendar months displayed side-by-side in a multi-month calendar interface by setting how many separate month panels or views appear horizontally. Adjust the visible month count to show two, three, or more month grids simultaneously for better date range selection or comparison. Configure the calendar display to show multiple months in one view to enhance user experience, support wider scheduling horizons, and enable quick navigation across consecutive months. Set or modify the numeric value defining how many month views appear in parallel to tailor the calendar layout to your needs, whether for compact or extended multi-month display.
</div>

#### Example - show three months at same time

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            views: 3
        });
    </script>

### range `Object`

Configures the Kendo UI MultiViewCalendar range settings.


<div class="meta-api-description">
Set, configure, or control the visible date range, navigation limits, start and end boundaries, multi-view span, visible date window, or restrict scrolling and selection across specific calendar dates within a multi-view calendar component during initialization or runtime. Adjust date visibility, limit navigation to a set timeframe, define minimum and maximum selectable dates, control which months or periods are displayed simultaneously, and prevent users from navigating beyond specified date limits for improved date input management and custom calendar setups.
</div>

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            range: {
                start: new Date(2023, 5, 10),
                end: new Date(2023, 5, 20)
            },
            selectable: "range"
        });
    </script>

### range.start `Date`

This sets the start date of the range selection.


<div class="meta-api-description">
Configure or specify the initial date that marks the beginning of a selected range in a calendar component, enabling developers to set, initialize, bind, update, or control the start boundary of a date range selection programmatically. This includes defining where a multi-date range starts for features like range picking, date interval selection, or controlled range inputs within calendar views, ensuring synchronization and dynamic updates of the range's starting point.
</div>

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


<div class="meta-api-description">
Control the maximum date limit or endpoint for selecting a date range within a multi-view calendar, specifying the final day users can pick or that the calendar displays across several views. Enable setting, configuring, or adjusting the end boundary of a date range selection to define the last selectable date, finalize range limits, and manage the displayed trailing date in multi-calendar interfaces. This setting supports initializing or dynamically updating the range’s end date to constrain user selections, schedule cutoffs, or date span closures in complex date-picking scenarios.
</div>

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


<div class="meta-api-description">
Control and configure date selection modes for calendars to enable choosing a single date, multiple non-adjacent dates, or a contiguous range of dates, supporting use cases like selecting several specific days, highlighting date intervals, toggling between single, multiple, or range selection patterns, and customizing calendar behavior for flexible user date input and scheduling scenarios.
</div>

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


<div class="meta-api-description">
Set or configure initial selected dates in a multi-view calendar component, enabling preselection of one or more dates before rendering; control which dates appear highlighted or active when the calendar loads, specify single or multiple date selections in advance, bind selected dates programmatically for default states, initialize calendar selections dynamically, enable preselected date ranges or specific days, support multiple date selections by configuring selection mode accordingly, manage initial highlighted dates on calendar start, and control default active date states for user interfaces requiring preset calendar selections.
</div>

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


<div class="meta-api-description">
Control whether each individual calendar view displays its own header with titles and navigation controls, enabling or disabling separate view-specific headers, toggling display of per-view titles or controls, configuring multi-screen calendar interfaces with distinct section headers, setting visibility of headers on multiple calendar panels, managing how calendar views show their headers independently, customizing display of view titles and controls across split calendar views, enabling segmented headers on multi-view date pickers, adjusting header presence per calendar pane, and switching between unified or multiple headers for calendar views.
</div>

#### Example - set two dates to be selected upon multiViewCalendar initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            showViewHeader: true
        });
    </script>

### weekNumber `Boolean` *(default: false)*

If set to `true` a week of the year will be shown on the left side of the multiViewCalendar.


<div class="meta-api-description">
Show or hide the week of the year numbers alongside calendar weeks, enabling display or suppression of week indexes for each row in a multi-month or multi-view calendar layout, letting users configure or toggle week labels to track or identify weeks by number on the calendar sidebar, control visibility of numerical week markers on the left column to assist with scheduling, planning, or referencing specific weeks within year-based calendar views.
</div>

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


<div class="meta-api-description">
Control the initial display mode of the calendar by configuring which time span or view is shown first, such as starting the calendar on a monthly grid with individual days, a yearly view highlighting all months, a decade overview presenting multiple years, or a century perspective displaying grouped decades, enabling customization of the calendar's default focus from days and months to longer periods like years, decades, or centuries depending on whether you want to begin browsing detailed daily schedules, annual summaries, or long-term date ranges.
</div>

#### Example - specify the initial view, which multiViewCalendar renders

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            start: "year"
        });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.


<div class="meta-api-description">
Control, configure, or retrieve the currently selected date in a calendar component to initialize the selection, programmatically update the active date, bind the chosen day to application data models, synchronize date selection for both reading and writing, dynamically set or get the current calendar date, enable two-way data binding with the calendar's focused day, manage the selected date state in multi-view or multi-month calendar interfaces, and integrate date selection seamlessly into form controls or user interactions.
</div>

#### Example - specify the selected value of the widget

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            value: new Date(2012, 0, 1)
        });
    </script>

### showOtherMonthDays `Boolean`*(default: false)*

When this configuration is enabled, the MultiViewCalendar will render days from the previous and next months in the current views.

> The `showOtherMonthDays` configuration is not compatible with the [`range`](/api/javascript/ui/multiviewcalendar/configuration/selectable) selection. It is advised that this property is set to **false** when `selectable` is set to **range**.


<div class="meta-api-description">
Control the visibility and display of days from previous and next months within a calendar's current multi-view panels, allowing developers to enable or disable adjacent month day rendering to provide context or continuity in date selection interfaces. This setting is useful for configuring calendars to show trailing and leading days beyond the present month for improved user orientation or aesthetic purposes, especially when working with single date selections or non-range modes. Adjust how the calendar grids present days outside the main month when users want to view extended dates, but disable this option when implementing range selections since showing outside days conflicts with range-based date picking behaviors. This impacts how continuous date blocks and adjacent month days appear in calendar components configured for multi-view layouts, supporting scenarios where the calendar should include or exclude neighboring months' days visually within each month pane.
</div>

#### Example - Show dates from the other months

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoCalendar({
            showOtherMonthDays: true
        });
    </script>

## Methods

### current

Gets currently focused date.


<div class="meta-api-description">
Retrieve or access the date that currently holds keyboard focus or visual selection within a multi-view calendar interface, enabling you to programmatically check, get, or identify the active focused day as a standard JavaScript Date object, which is useful for controlling focus, state inspection, navigation, keyboard interaction handling, or synchronizing date selection across components in calendar widgets or date pickers after setup and initialization.
</div>

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


<div class="meta-api-description">
Clean up and safely remove a MultiViewCalendar instance by detaching event listeners, clearing data attributes to prevent memory leaks, and recursively destroying any nested or child components; this method handles proper disposal of all associated resources and event handlers before the calendar element is manually removed from the DOM, ensuring efficient teardown and preventing stale references or memory issues when disabling, destroying, or dynamically removing calendar widgets in applications.
</div>

#### Example
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.destroy();
    </script>

### max

Gets/Sets the max value of the multiViewCalendar.


<div class="meta-api-description">
Set or retrieve the maximum selectable or navigable date in a multi-view calendar interface to restrict user input and limit calendar navigation to a specified upper boundary. Adjust or query the highest allowed date dynamically to enforce date constraints, prevent selection beyond a certain threshold, configure date range limits, or control calendar view boundaries in scheduling, booking, or date-picker components. This functionality supports enforcing cutoffs, setting maximum date limits programmatically, retrieving current maximum date settings, and managing selectable and navigable date ranges for calendar widgets with multiple views.
</div>

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


<div class="meta-api-description">
Configure or retrieve the earliest selectable date to control the minimum allowed date on a multi-view calendar, set constraints to restrict date navigation and selection, enforce date range limits for validation, limit user input to not allow dates before a specified threshold, dynamically adjust the earliest date boundary, get the current minimum date to check restrictions, apply date range enforcement on calendar components, restrict selectable dates from an earliest date, manage temporal constraints for date pickers, and control or set the minimum date value to prevent selection outside a defined timeframe.
</div>

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


<div class="meta-api-description">
Control calendar navigation programmatically by moving the visible calendar view or setting the focused date to a specific day, month, year, or decade, enabling direct navigation to particular timeframes or overview levels. Enable switching calendar display between different view modes such as month view, year view, or decade view through code, synchronizing the calendar’s shown pages and focus state with application logic. Configure or command the calendar to jump to targeted dates or different date range scopes, facilitating custom navigation flows, dynamic date selection, or automated calendar updates in response to user actions or application events. Adjust the calendar’s current visible timeframe and focus programmatically to reflect changes in application state, offering precise control over the displayed date context and enabling seamless integration between calendar UI and backend data or user input.
</div>

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


<div class="meta-api-description">
Navigate to a more detailed calendar view or drill down through different date levels such as moving from decade to year, year to month, or month to day by programmatically controlling or configuring date granularity transitions within a multi-view calendar component. Enable or trigger downward navigation in calendar hierarchies, adjust visible calendar scopes, and switch to finer-grained date views using methods that shift calendar perspectives to more specific time intervals, supporting user interactions and automated date range focusing in scheduling, date picking, or timeline interfaces.
</div>

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


<div class="meta-api-description">
Advance or move calendar views forward to show upcoming dates, enabling navigation to future months, days, weeks, or periods based on the current calendar settings and view mode. Programmatically shift the visible date range ahead, control the display of next time intervals, and update multiple calendar panels or views simultaneously to present future schedules or events. Configure forward navigation, set the calendar to progress to later dates, trigger next-time-frame transitions, and handle user interactions or automated calendar advancements for multi-view date displays.
</div>

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateToFuture();
    </script>

### navigateToPast

Navigates to the past.


<div class="meta-api-description">
Navigate backward in a calendar view by programmatically moving the display to previous dates, months, or years to enable stepping back in time within a multi-view calendar component, supporting scenarios like handling user input from buttons, keyboard navigation, or synchronizing the calendar’s visible range with external controls or events to ensure smooth reverse date traversal and navigation synchronization in date-based interfaces.
</div>

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateToPast();
    </script>

### navigateUp

Navigates to the upper view.


<div class="meta-api-description">
Control calendar view levels by programmatically moving to a higher, less detailed display such as navigating from day to month or month to year, enabling "zoom out" or hierarchical view changes within a calendar component. Use this functionality to shift the calendar focus upward in the hierarchy, switch to broader time spans, update the visible view level, or handle user interactions that require moving from detailed sub-views to parent views. Configure or trigger navigation that steps up one level in the calendar's view structure, supporting scenarios like summarizing dates, expanding context from specific days to months or years, and managing calendar state transitions through code.
</div>

#### Example

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar();

        var multiViewCalendar = $("#multiViewCalendar").data("kendoMultiViewCalendar");

        multiViewCalendar.navigateUp();
    </script>

### selectDates

Gets/Sets the selected dates for the multiViewCalendar.


<div class="meta-api-description">
Retrieve or update the selected dates in a multi-view calendar by getting the currently chosen dates as an array or setting new selections by passing an array of date objects, enabling programmatic control over multiple date selections, configuring calendar selections dynamically, reading or modifying selected date ranges, handling multiple date inputs, adjusting calendar highlights, syncing selected dates with external data, and managing date selection states for user interfaces that require multi-date picking or batch date updates within calendar components.
</div>

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


<div class="meta-api-description">
Retrieve or update the currently selected date range in a multi-view calendar interface by reading the active selection or programmatically setting a new range of dates, enabling control over date intervals, range selection, and synchronization with external data sources or user interface elements, including configuring, enabling, or modifying date spans for calendars that support multiple views and ensuring consistent date range management across applications.
</div>

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


<div class="meta-api-description">
Accessing or modifying the current selected date or dates in a multi-view calendar component, retrieving the active calendar value, setting or updating the calendar selection programmatically, controlling or synchronizing the calendar's date state with external data models, reading the current date value shown, assigning new dates to change the calendar display, dynamically managing the calendar's selected dates through code, fetching or adjusting the calendar's value property, enabling date value synchronization between UI and application logic, and handling date selection updates for multi-view calendar controls.
</div>

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


<div class="meta-api-description">
Retrieve or access the current calendar display instance to inspect, control, or manipulate the active calendar layout, enabling obtaining the visible calendar view state, performing view-specific actions, updating the interface, navigating between calendar views, or interacting with the active calendar mode. This method is used for getting the instance representing the currently displayed calendar perspective, supporting tasks such as querying current settings, invoking view methods, managing calendar navigation, or modifying the displayed calendar content dynamically after initialization.
</div>

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


<div class="meta-api-description">
Detect and respond to date selection changes by capturing events triggered when the calendar's chosen dates or date ranges are updated, enabling execution of custom logic upon user interaction, syncing UI components or data models with the latest selections, handling multiple date picks or single date updates, and accessing event details to retrieve current selection values, monitor selection adjustments, or trigger dependent workflows based on user calendar input.
</div>

#### Example - subscribe to the "change" event during initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            change: function() {
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the multiViewCalendar
        });
    </script>

### navigate

Fires when multiViewCalendar navigates.


<div class="meta-api-description">
Trigger custom actions or execute code when the calendar view changes dates or navigates between months, weeks, or days, capturing user interactions like selecting a new date or switching views. Detect and respond to calendar navigation events to update application state, reload data, sync UI components, or handle dynamic content based on user-driven calendar movements such as moving forward, backward, or jumping to specific dates. Enable event-driven logic for calendar navigation changes to facilitate reactive updates, integration with external data sources, or synchronization across multiple UI elements whenever the visible calendar range shifts.
</div>

#### Example - subscribe to the "navigate" event during initialization

    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            navigate: function() {
                var view = this.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(view.name); //name of the current view

                var current = this.current();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(view.name); //name of the current view

            var current = this.current();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(current); //currently focused date
        });
    </script>
