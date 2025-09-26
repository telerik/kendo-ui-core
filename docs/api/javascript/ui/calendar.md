---
title: Calendar
page_title: Configuration, methods and events of Kendo UI Calendar
description: Find out how to successfully configure calendar UI component, how to use methods to get the max value of the calendar and navigate easily.
res_type: api
component: calendar
---

# kendo.ui.Calendar

Represents the Kendo UI Calendar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### allowReverse `Boolean` *(default: false)*

Enables the user to select an end date that is before the start date. This option is available only when the [`selectable`](/api/javascript/ui/calendar/configuration/selectable) configuration is set to **range**.


<div class="meta-api-description">
Enable or control reverse date range selection in a calendar or date picker, allowing users to select an end date earlier than the start date when choosing date ranges. Configure, set, or allow backward selection of date intervals, support flexible date span input including reversed start and end dates, and manage user interaction for selecting ranges that flow from later to earlier dates in range-enabled calendars or scheduling components. This setting handles reverse chronological date selections, bidirectional range picking, and non-linear date spans when range selection is active.
</div>

#### Example - enable reverse selection

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "range",
            allowReverse: true,
            showOtherMonthDays: false
        });
    </script>

### centuryCellsFormat `String`*(default: "long")*

 Specifies the format of the century cells.

* `"long"` - The cells will display a decade range **2000-2009**, **2010-2019**.
* `"short"` - The cells will display just the starting year of the decade **2000**, **2010**.


<div class="meta-api-description">
Configure display format for century selection cells in a calendar interface, choosing between showing full decade ranges such as "2000-2009" and "2010-2019" or condensed single starting years like "2000" and "2010"; adjust presentation style to toggle between detailed span views or concise year markers, enabling customization of how broader time periods are visualized in calendar navigation, decade grouping, or century overview modes.
</div>

#### Example - render the short version of the century cells

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            centuryCellsFormat: "short",
            start: "century"
        });
    </script>

### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.


<div class="meta-api-description">
Select or set the calendar's visual style, toggling between traditional classic layouts or updated modern appearances, customize the calendar's look and feel during setup, switch rendering modes for a standard or refreshed user interface, control calendar themes for classic versus contemporary display options, configure the calendar to present either the familiar classic design or a sleek, new modern style, enable different calendar skins or presentation types to match user preferences or branding, adjust visual presentation for calendar widgets to appear classic or modern, tailor calendar rendering to provide either a conventional or innovative look at initialization.
</div>

#### Example - specify modern component type

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            componentType: "modern"
        });
    </script>

### culture `String`*(default: "en-US")*

Specifies the culture info used by the component. A valid kendo culture file must be added to the page in order for the example to work. `<script src="https://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>`


<div class="meta-api-description">
Set or change the language, regional settings, and localization preferences for date formats, month and day names, first day of the week, and calendar UI text by specifying culture identifiers like "de-DE" or other locale codes, enabling support for internationalization, multilingual calendars, culturally accurate display of dates, control over local time representation, and integration with corresponding culture scripts to ensure correct formatting and cultural conventions are applied throughout the calendar interface.
</div>

#### Example - specify a culture

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            culture: "de-DE"
        });
    </script>

### dates `Array`

 Specifies a list of dates, which will be passed to the month template.


<div class="meta-api-description">
Control which specific dates appear and how they are displayed in the calendar by supplying a list or array of date values that influence the month view rendering. Configure custom day rendering, highlight particular days, enable dynamic styling, or modify behavior for selected dates when generating the monthly calendar layout. Set or customize visible days, apply special formatting, or inject custom markup on designated dates to tailor the calendar’s appearance and interaction during month rendering. Adjust, filter, or enhance how individual dates are presented within the month, supporting scenarios such as marking events, disabling days, or showing special content for certain dates.
</div>

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

* `"month"` - Shows the days of the month.
* `"year"` - Shows the months of the year.
* `"decade"` - Shows the years of the decade.
* `"century"` - Shows the decades from the century.

> Note the option will not be applied if **start** option is *lower* than **depth**. Always set both and **start** and **depth** options.


<div class="meta-api-description">
Set or configure the navigation level for date selection controls to display and restrict browsing through individual days, months, entire years, or broader time spans like decades and centuries, controlling how deeply users can drill down or zoom out within date pickers or calendar interfaces. Enable or adjust the visible calendar views ranging from daily grids, monthly overviews, yearly selections, decade ranges, or century timelines, specifying how far forward or backward in time users can navigate, browse, or pick dates, while managing the minimum and maximum navigable time scopes in scheduling, event planning, or date input widgets.
</div>

#### Example - set navigation depth of the calendar

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            depth: "year"
        });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled in the calendar.


<div class="meta-api-description">
Prevent picking or selecting specific dates in the calendar by configuring disabled dates through lists or custom logic, such as arrays of dates or functions that evaluate each date to block certain days, disable weekends, holidays, or dynamic rules to restrict date selection, control availability by setting which dates cannot be chosen, filter out dates programmatically, and manage allowed or disallowed calendar days based on fixed dates or conditional checks.
</div>

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

 The [template](/api/javascript/kendo/methods/template) which renders the footer. If false, the footer will not be rendered.


<div class="meta-api-description">
Control the display and customization of the calendar’s bottom section by enabling, disabling, or setting a custom template to render the footer area. Adjust, hide, or configure the footer content according to specific needs, including removing the footer entirely or replacing it with a personalized layout or component. Manage the calendar’s footer visibility, modify footer rendering with custom templates, and tailor the footer output to fit user interface requirements, supporting varied use cases such as hiding default text or injecting specialized elements at the calendar’s base.
</div>

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

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to parse value set with value() method.


<div class="meta-api-description">
Configure and control the pattern or string format used to interpret, parse, and convert date and time values from textual inputs into actual Date objects, enabling consistent handling of various date and time representations, customizing how date strings are read and understood, managing the conversion of input values to standard date/time formats, setting or specifying the parsing rules for user-provided date or time entries, and ensuring accurate and reliable processing of different date formats during value assignments or input normalization in calendar-related operations.
</div>

#### Example - specify a custom date format

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            format: "yyyy/MM/dd"
        });
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.


<div class="meta-api-description">
Set the upper limit for date selection or navigation to restrict users from choosing or moving beyond a specific maximum date on a calendar interface, controlling and bounding the latest possible date visible or selectable, preventing selection of future dates past a set threshold, limiting date pickers to a final allowed date, configuring the calendar’s maximum date boundary to enforce date constraints and disable navigation to later days, ensuring date inputs do not exceed a defined maximum cutoff or endpoint.
</div>

#### Example - specify the maximum date

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            max: new Date(2013, 0, 1) // set the max date to Jan 1st, 2013
        });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
Customize, adapt, or translate the text labels and user interface strings displayed in calendar components for different languages, regions, or cultural contexts by configuring localized messages, text content, UI wording, date and time format strings, tooltips, button labels, prompts, error messages, or display texts; control multilingual support, internationalization, localization settings, string overrides, language customization, and message templates to ensure the calendar UI matches user preferences, locale-specific terminology, or application language requirements.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### messages.weekColumnHeader `String` *(default: "")*

Allows customization of the week column header text. Set the value to make the widget compliant with web accessibility standards.


<div class="meta-api-description">
Control and customize the text displayed in the week column header of a calendar interface to improve accessibility and readability, enabling you to set descriptive, clear, and context-specific labels for week columns, support localization, adjust header wording for screen readers, tailor calendar headings to various user needs, and enhance semantic clarity for better user experience and compliance with accessibility guidelines.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>

### messages.navigateTo `String` *(default: "Navigate to ")*

Allows customization of the "Navigate to " text that would be used for `title` attribute of the Calendar title in the header. The label is also a button allowing navigation to parent view.


<div class="meta-api-description">
Set and customize the calendar header label, title text, and the navigation button’s display to switch or go back to a parent or previous calendar view, enabling control over header navigation labels, button text for moving between views, and configuring how users navigate through calendar hierarchies or summaries.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "navigateTo": "Go to "
        }
     })
    </script>

### messages.parentViews `Object`

Allows customization of names of the views used in the `title` attribute of the Calendar title in the header. The label is also a button allowing navigation to parent view.


<div class="meta-api-description">
Customize and control the display labels or titles used in calendar navigation headers and parent view buttons, enabling you to set, rename, or adjust the navigation hierarchy names seen in calendar interfaces, parent view identifiers, and header tooltips. This includes configuring parent view options, modifying navigation breadcrumbs, changing top-level view names, and personalizing calendar parent navigation captions or titles for clearer user understanding and tailored interface navigation experience.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "parentViews": {
                month: "Go to year view",
                year: "Go to decade view",
                decade: "Go to century view"
            }
        }
     })
    </script>

### messages.parentViews.month `String` *(default: "year view")*

Allows customization of parent view name used in the `title` attribute of the Calendar title when in Month view.


<div class="meta-api-description">
Adjust or configure the display label, header text, or title attribute shown for the monthly calendar view, control how the month view’s parent name or heading appears in tooltips or UI elements, set or override the default naming for the month section in calendar components, localize or customize the month view identifier or descriptor that appears as the parent view label, manage and change the calendar's month view title attribute for accessibility or clarity in the user interface.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "parentViews": {
                month: "parent year"
            }
        }
     })
    </script>

### messages.parentViews.year `String` *(default: "decade view")*

Allows customization of parent view name used in the `title` attribute of the Calendar title when in Year view.


<div class="meta-api-description">
Control or customize the localized label, name, or display text of the main calendar view when showing a year overview, enabling you to set, configure, or adjust how the Year view is referenced in titles, tooltips, or accessibility attributes within calendar components, including modifying parent view names or headings for year-based navigation and display contexts.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "parentViews": {
                year: "parent decade"
            }
        }
     })
    </script>

### messages.parentViews.decade `String` *(default: "century view")*

Allows customization of parent view name used in the `title` attribute of the Calendar title when in Decade view.


<div class="meta-api-description">
Customize or configure the label, title text, or display name for the decade view in calendar components, controlling how the parent view is presented or named when showing a ten-year span; adjust or set the decade header, caption, or identifier used as a tooltip or accessibility title in calendar navigation for better clarity, localization, or user interface labeling in decade-level calendar views.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "parentViews": {
                decade: "parent century"
            }
        }
     })
    </script>

### messages.today `String` *(default: "Today")*

Allows customization of the text of the Today button present in the widget in its `modern` rendering.


<div class="meta-api-description">
Customize or set the label, text, or caption displayed on the Today button within calendar interfaces, enabling you to change, override, or localize the default wording for the current day control in various calendar views or widgets. Adjust, configure, or personalize the displayed text for the button that jumps to the present date, supporting different languages, formats, or custom user interface terminology in scheduling, date pickers, or time management components.
</div>

#### Example

    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        componentType: "modern",
        messages: {
            today: "Click me"
        }
     })
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date, which the calendar can show.


<div class="meta-api-description">
Control the earliest selectable or viewable date in date pickers or calendar components by defining a minimum boundary to restrict navigation and selection to that starting date or any date after it, enabling developers to set the lowest date limit, disable past dates, block dates before a cutoff, enforce earliest allowed dates, and ensure users cannot pick or scroll to dates prior to the specified minimum range.
</div>

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


<div class="meta-api-description">
Configure and customize the appearance and content of individual day cells within the monthly calendar view by specifying templates or rendering logic that inject custom HTML, bind dynamic data like dates, events, or counts, and display visual indicators or markers for each day, enabling control over daily cells’ layout, style, and interactive elements for month-based calendar displays or event scheduling interfaces.
</div>

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            month: {
                content: (data) => `<div class="custom-cell">${data.value}</div>`,
                empty: "-",
                weekNumber: (data) => `<span class="week-num">${data.weekNumber}</span>`
            },
            weekNumber: true
        });
    </script>

### month.content `String`

 The template to be used for rendering the cells in "month" view, which are between the min/max range.
 By default, the widget renders the value of the corresponding day.


<div class="meta-api-description">
Customize or control the display of day cells in a calendar’s month view by defining a content template or rendering logic that overrides the default day numbers, enabling personalized layouts, dynamic content, or conditional formatting within specific date ranges or constraints during calendar initialization, allowing developers to set, configure, or enable custom month cell visuals, content injection, or templating for each calendar day while respecting minimum and maximum date boundaries.
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

    <div id="calendar"></div>
    <script id="cell-template" type="text/x-kendo-template">
        <div class="#= data.value < 10 ? 'exhibition' : 'party' #">
        #= data.value #
      </div>
    </script>
    <script>
      $("#calendar").kendoCalendar({
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
Control and customize how week numbers or week cells appear in a monthly calendar view by configuring templates or custom render functions that define the content and layout for each week's display, allowing display of calculated week numbers, first dates of weeks, or any tailored data for weekly segments; this enables developers to set, modify, render, or override default week columns in calendar month layouts with dynamic, data-driven templates for flexible presentation of weekly information, including showing custom labels, calculations, or styling for weeks within a monthly calendar grid.
</div>

#### Example - specify week number template as a string

    <style>
      .italic{
        font-style: italic;
      }
    </style>
    <body>

    <div id="calendar"></div>
    <script id="week-template" type="text/x-kendo-template">
       <a class="italic">#= data.weekNumber #</a>
    </script>
    <script>
      $("#calendar").kendoCalendar({
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
Control how day cells that are outside the allowed date range appear in the calendar month view by customizing their display, defining or setting templates for out-of-bound dates, handling disabled or inactive days beyond minimum and maximum limits, configuring empty or placeholder cells for invalid or unavailable dates, managing visual representation of dates that fall outside the permitted range, and adjusting how the calendar renders days that are not selectable due to range restrictions.
</div>

#### Example - specify an empty cell template as a string

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            month: {
               empty: '-'
            }
        });
    </script>

### selectable `String`  *(default: "single")*

By default user is able to select a single date. The property can also be set to **multiple** or **range**. More information about the different selection modes can be found in the [Selection]({% slug overview_kendoui_calendar_widget %}#selection) article.


<div class="meta-api-description">
Enable or configure date selection modes in a calendar interface, including single date picking, multiple non-contiguous date selections, or continuous date range selection for choosing intervals. Adjust how users can click, tap, or highlight dates—whether selecting one day, multiple individual days, or a block of dates in sequence—supporting scenarios like booking periods, marking multiple events, or highlighting availability spans. Control interactive date choice behavior for calendar components to facilitate single date picks, multi-date selections, or start-to-end range picking for scheduling and event planning.
</div>

#### Example - enable the multiple selection

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "multiple"
        });
    </script>

> Check [Selection](https://demos.telerik.com/kendo-ui/calendar/selection) for a live demo.

### selectDates `Array`  *(default: [])*

Specifies which dates to be selected when the calendar is initialized.

> **Important:** This configuration option requires the [selectable](/api/javascript/ui/calendar/configuration/selectable): "multiple" option to be set.


<div class="meta-api-description">
Set, initialize, or predefine one or multiple dates to be highlighted, chosen, or selected by default in a calendar or date picker component during startup or load, enabling features like default date selections, reminders, event markers, or initial highlighted days. Configure preselected calendar days, control initial date highlights, enable multiple date selections on load, and apply default chosen dates automatically when the calendar appears. Use this for loading specific dates upfront, setting predefined date ranges or points, initializing selections for user guidance, or marking important calendar entries before user interaction, especially in contexts requiring multiple dates chosen simultaneously.
</div>

#### Example - set two dates to be selected upon calendar initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
           selectDates: [new Date(2013, 10, 10), new Date(2015, 10, 10)]
        });
    </script>

> Check [Selection](https://demos.telerik.com/kendo-ui/calendar/selection) for a live demo.

### weekNumber `Boolean` *(default: false)*

If set to `true` a week of the year will be shown on the left side of the calendar.


<div class="meta-api-description">
Show or hide week numbers on a calendar view, configure the calendar to display the week of the year alongside dates, enable numbering of weeks to track weekly schedules or planning, set calendar options to present ISO or regional week counts, control whether each calendar row includes a visible indicator of the current week number, toggle week numbering on or off for clearer date context during timeline management or event organization, include or exclude week indexes for better alignment with business or project cycles, customize calendar visualization to highlight week breakdowns, and adjust settings for presenting sequential week identifiers within the calendar interface.
</div>

#### Example - enable the week of the year option

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
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
Control and customize the default initial display mode of a calendar interface, specifying whether users first see the monthly days grid, an overview of all months in a year, a range of years spanning a decade, or a broader century view with multiple decades; configure or set the starting calendar view, enabling application developers to define the initial focus or zoom level shown on load, toggle between different temporal granularities, and tailor the calendar’s opening display to user preferences or application requirements such as monthly schedules, yearly planning, decade comparisons, or century overviews.
</div>

#### Example - specify the initial view, which calendar renders

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            start: "year"
        });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.


<div class="meta-api-description">
Configure, access, or update the currently selected date on the calendar control to programmatically set, retrieve, or bind the chosen day, allowing initialization or dynamic changes to the calendar’s active or highlighted date. Enable date selection management, handle user picks, control default or current dates, and synchronize the calendar’s selection state with your application logic by getting or setting this date value.
</div>

#### Example - specify the selected value of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(2012, 0, 1)
        });
    </script>

### range `Object`*(default: { start: null, end: null })*

Specifies an initial range selection. This option is available only when the [`selectable`](/api/javascript/ui/calendar/configuration/selectable) configuration is set to `range`. 


<div class="meta-api-description">
Set or configure an initial continuous date interval, defining both start and end dates to preselect a range when the calendar opens, enabling users to view or adjust a preset date span. Control default date range selection, initialize a calendar with a predefined interval, specify beginning and ending dates for ranges, customize calendar opening state with selected periods, apply selectable date ranges, enable continuous date interval presets, and manage initial multi-day selections within calendars that support range-based selection modes.
</div>

#### Example - specify the selected range of the component

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "range",
            range: { start: new Date(2024, 3, 3), end: new Date(2024, 3, 13) }
        });
    </script>

### range.start `Date`
Specifies the start date of the range selection.


<div class="meta-api-description">
Set or configure the initial starting date for selecting a range of dates, control or update the "from" date in a date picker or calendar component, define the earliest day in a continuous range selection, programmatically specify the beginning boundary for multi-day selections, initialize or adjust the initial date to start a date interval, manage the first date in date range inputs or filters, control the anchor date when selecting consecutive days, set the opening date for periods or time spans, enable precise control over the first day when users pick date ranges, and customize or override the starting point in calendar-based range selections.
</div>

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "range",
            range: { 
                start: new Date(2024, 5, 10), // June 10, 2024
                end: new Date(2024, 5, 20) 
            }
        });
    </script>

### range.end `Date`
Specifies the end date of the range selection.


<div class="meta-api-description">
Configure or set the ending boundary of a selectable date range in a calendar component to define how dates are highlighted, restricted, or limited within a range selection. Control the final date limit for date pickers, scheduling tools, or calendar widgets by specifying the maximum date in a range including start and end points for date intervals, periods, or event durations. Adjust, customize, or define range limits for date selections, date span boundaries, or calendar date intervals in user interfaces that involve selecting multiple consecutive days or timed events.
</div>

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "range",
            range: { 
                start: new Date(2024, 5, 10), 
                end: new Date(2024, 5, 25) // June 25, 2024
            }
        });
    </script>

### showOtherMonthDays `Boolean`*(default: true)*

When this configuration is enabled, the calendar will render days from the previous and next months in the current view.

> The `showOtherMonthDays` configuration is not compatible with the [`range`](/api/javascript/ui/calendar/configuration/selectable) selection. It is advised that this property is set to **false** when `selectable` is set to **range**.


<div class="meta-api-description">
Enable displaying days from the previous and next months within the current calendar grid, showing adjacent month dates in the calendar view to provide continuous date context, overlap month boundaries, or see trailing and leading days beyond the current month; control whether days outside the current month are visible in the calendar, configure showing extra dates for better navigation or visual continuity, toggle visibility of neighboring month days inside the monthly calendar layout, and ensure compatibility with selection modes by disabling this feature during range selection to avoid conflicts.
</div>

#### Example - Hide dates from the other months

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            showOtherMonthDays: false
        });
    </script>

## Methods

### current

Gets currently focused date.


<div class="meta-api-description">
Obtain or access the active date currently highlighted or selected within a calendar interface or component, enabling retrieval of the focused day, month, or year to read the present calendar state, compare dates, update user interface elements, synchronize with other date-based APIs, and manage or track the current temporal context without requiring input parameters or configurations.
</div>

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


<div class="meta-api-description">
Clean up and dispose calendar resources by removing event listeners, unbinding handlers, releasing memory by clearing associated data attributes, and tearing down child components safely to prevent leaks and dangling references; ensure all internal and nested widget event bindings are detached and resources are freed before removing or replacing calendar elements in the DOM, facilitating proper destruction without deleting the calendar element itself.
</div>

#### Example
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.destroy();
    </script>

### max

Gets/Sets the max value of the calendar.


<div class="meta-api-description">
Control, retrieve, or set the highest allowable date or limit within a calendar or date picker component to restrict user selection or navigation beyond a specific upper bound, enabling developers to enforce maximum date constraints, retrieve current maximum settings, define cutoffs for date inputs, configure date limits, or programmatically adjust the latest selectable date to prevent exceeding predefined thresholds.
</div>

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


<div class="meta-api-description">
Configure or retrieve the earliest permissible date boundary to limit calendar navigation and selection to dates from that minimum onwards, enabling control over the calendar’s lower date range by setting or accessing the minimum allowed date value, restricting user interaction and date picking to on or after a specified start date while supporting queries to fetch the current minimum limit or update it dynamically within the calendar component.
</div>

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


<div class="meta-api-description">
Programmatically change or control the calendar’s current display by setting a specific date, view mode, or timeframe such as month, week, or day, allowing dynamic navigation, automated updates, switching calendar views, focusing on particular dates, updating visible content, and enabling custom date selection or view transitions through code.
</div>

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


<div class="meta-api-description">
Control calendar view drill-down to navigate programmatically from broader to more detailed time spans such as year to month, month to week, or week to day, enabling dynamic transition to deeper levels in the calendar hierarchy, customize navigation behaviors, implement stepwise zoom or focus on finer intervals, handle user interactions that require moving into specific dates or periods, and adjust the displayed timeframe to a smaller, detailed perspective through code-driven commands.
</div>

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


<div class="meta-api-description">
Control advancing the calendar view forward in time by programmatically moving to the next day, week, month, or future period based on the current display; enable automatic or custom navigation to future dates, shift the visible date range ahead, trigger forward movement on calendar components, update the timeline to upcoming intervals, or synchronize external controls to show later calendar periods dynamically.
</div>

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateToFuture();
    </script>

### navigateToPast

Navigates to the past.


<div class="meta-api-description">
Shift or move the calendar display to earlier dates, go back in time, navigate to previous days, weeks, or months, programmatically control the calendar to view past time periods, rewind the calendar view, step backward through dates, update the calendar to show a prior date range, enable backward navigation in scheduling or timeline interfaces, scroll or jump to previous calendar intervals.
</div>

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateToPast();
    </script>

### navigateUp

Navigates to the upper view.


<div class="meta-api-description">
Control or trigger navigation within a calendar interface to move from a detailed view to a broader one, such as stepping up from a month view to a year overview, zooming out or drilling up in the calendar hierarchy, updating the displayed date range and current view to a parent or higher-level time granularity, enabling seamless transitions from detailed dates to larger time spans, toggling or programmatically setting calendar views to their next higher levels, managing calendar navigation flow, and adjusting displayed periods for wider context or summary overviews.
</div>

#### Example

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.navigateUp();
    </script>

### selectDates

Gets/Sets the selected dates for the calendar.

> **Important:** This method requires the [selectable](/api/javascript/ui/calendar/configuration/selectable): "multiple" option to be set.


<div class="meta-api-description">
Retrieve, update, or manage multiple selected dates in a calendar interface by getting the currently chosen date array or setting new selections with JavaScript Date objects; control, synchronize, or programmatically initialize multi-date picking, reading, or changing selections in UI components configured for multiple selectable dates.
</div>

#### Example - gets the selected dates of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectDates: [new Date(2013, 10, 10), new Date(2015, 10, 10)],
            selectable: "multiple"
        });

        var calendar = $("#calendar").data("kendoCalendar");

        var value = calendar.selectDates();
    </script>

#### Example - sets the value of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectDates: [new Date(2013, 10, 10), new Date(2015, 10, 10)],
            selectable: "multiple"
        });

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.selectDates([new Date(2016, 10,10), new Date()]);
    </script>

### selectRange

Gets/Sets the selected range for the calendar.


<div class="meta-api-description">
Programmatically retrieve or update the currently selected date range in a calendar interface, enabling control over date range selection, setting or getting the active highlighted period, managing or synchronizing chosen dates, configuring or binding date ranges, dynamically adjusting selection intervals, and handling date span selection changes for UI consistency and interaction.
</div>

#### Parameters

##### range `Object`

The range to set. It should have a start and end properties with the respective dates.

#### Returns

`Object` The selected range of the calendar. The object has a start and end properties.

> **Important:** This method requires the [selectable](/api/javascript/ui/calendar/configuration/selectable): "range" option to be set.

#### Example - gets the selected range for the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            range: {
                start: new Date(2018, 9, 10),
                end: new Date(2018, 10, 10),
                target: "start"
            },
            selectable: "range"
        });

        var calendar = $("#calendar").data("kendoCalendar");

        var range = calendar.selectRange();
    </script>

#### Example - sets the range of the widget

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "range"
        });

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.selectRange({ start: new Date(2018, 9, 10), end: new Date(2018, 10, 10), target: "start" });
    </script>

### value

Gets/Sets the value of the calendar.


<div class="meta-api-description">
Retrieve or update the currently selected date in the calendar widget by getting the current selection, setting a new date using Date objects or date strings, controlling the focused day, changing the visible calendar view programmatically, configuring or reading the chosen date, dynamically adjusting the selected date value, accessing or modifying the calendar’s active date, and managing date input or output through code to handle user selections, automated date changes, date parsing, and synchronization with other components.
</div>

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


<div class="meta-api-description">
Access and control the current calendar display mode or layout by obtaining the active view instance, enabling tasks such as querying the visible date range, customizing navigation controls, adjusting rendering behavior, inspecting or modifying view state and configuration, interacting with the calendar’s presentation layer, invoking view-specific functions or APIs, and programmatically manipulating elements tied to the timeline, day, week, or month displays. This encompasses retrieving and working with the live calendar view to tailor user interactions, implement custom UI changes, or extend functionality at the view level within the calendar interface.
</div>

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


<div class="meta-api-description">
Detect and respond to updates when a user selects or changes a date in a calendar component, triggering event handlers to capture date modifications, synchronize state or data models, validate chosen dates, update user interface elements dynamically, and execute custom logic or callbacks upon date selection changes. Enable monitoring and reacting to calendar date changes, handling selection updates, managing user interactions with date pickers, and integrating date change notifications for seamless state control and validation in scheduling or event-driven applications.
</div>

#### Example - subscribe to the "change" event during initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            change: function() {
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the calendar
        });
    </script>

### navigate

Fires when calendar navigates.


<div class="meta-api-description">
Detect or handle calendar date changes, view switches, month navigation, or programmatic updates by capturing navigation events that signal when the displayed timeframe or calendar perspective shifts. Track user-driven or API-triggered moves across calendar months, weeks, days, or custom views to respond to transitions, update UI, load relevant data, or adjust settings based on new target dates and view modes. Monitor navigation activity reflecting any movement to different calendar intervals, enabling reactions to changes in the presented timeframe, whether through clicks, API calls, or automated navigation commands.
</div>

#### Example - subscribe to the "navigate" event during initialization

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
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

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var calendar = $("#calendar").data("kendoCalendar");

        calendar.bind("navigate", function() {
            var view = this.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(view.name); //name of the current view

            var current = this.current();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(current); //currently focused date
        });
    </script>
