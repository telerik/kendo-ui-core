---
title: DateRangePicker
page_title: Configuration, methods and events of Kendo UI DateRangePicker
description: Easy to follow steps guide how to quickly configure DateRangePicker UI widget, easily enable/disable it using methods and how to change events.
res_type: api
---

# kendo.ui.DateRangePicker

Represents the Kendo UI DateRangePicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### allowReverse `Boolean` *(default: false)*

Enables the user to select an end date that is before the start date.


<div class="meta-api-description">
How to enable selecting dates in reverse order with Kendo UI DateRangePicker? Configure the ability to select date ranges in reverse order, enabling users to choose an end date that comes before the start date, which can be important for flexible date input, bidirectional date intervals, or allowing backward date selection for validation, comparison, range swaps, or customized date range controls. This setting supports handling reversed or flipped date ranges by accepting, exposing, binding, and validating start and end dates regardless of chronological order, enabling use cases like inverted intervals, flexible date filters, or user-driven date range adjustments in scheduling, reporting, or data queries.
</div>

#### Example - enable reverse selection

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            allowReverse: true
        });
    </script>

### autoClose `Boolean` *(default: true)*

Specifies whether the calendar popup should close automatically when a range is selected.


<div class="meta-api-description">
How can I make Kendo UI DateRangePicker close automatically after selecting a date range? Configure the calendar popup behavior to automatically close or remain open after selecting a date range, enabling control over whether the date picker dismisses immediately upon selection or stays active for further adjustments, edits to start and end dates, or additional user actions. Enable or disable automatic closing of the date range selector popup to manage how users interact with the calendar interface, whether you want quick dismissal after choosing dates or extended flexibility to refine selections without losing focus on the widget. Adjust settings for popup lifecycle management in date range picking scenarios to control responsiveness to date input and streamline user workflows by controlling if the interface closes on selection or waits for manual closure.
</div>

#### Example - prevent the popup closure

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            autoClose: false
        });
    </script>

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How can I customize the layout of my Kendo UI DateRangePicker to adapt to different screen sizes? Configure how the date range selector adjusts its layout and interaction style for different screen sizes, devices, or input methods, enabling responsive design or compact views to optimize usability on mobile, desktop, or touchscreens. Control adaptive rendering modes such as disabling adaptation entirely or enabling automatic adjustment based on context to improve user experience across varying resolutions, orientations, and input types, ensuring seamless display and functionality in dynamic interfaces. This includes managing flexible UI scaling, input responsiveness, and compact presentation strategies for date range selection components.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the header title in Kendo UI DateRangePicker when it switches to adaptive mode? Configure or customize the header text, title label, or localized caption shown when a date range selection interface switches to mobile-friendly, responsive, or adaptive display mode; control the displayed adaptive header string to tailor the user interface’s top label for smaller screens, compact view, or device-specific layouts in date range pickers.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Date Range"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize the subtitle in Kendo UI DateRangePicker for mobile devices? Control and customize the subtitle text or header information displayed in the responsive or mobile-adaptive view of a date range selector, enabling configuration of localized messages, instructional prompts, or user interface hints that adjust automatically based on device or screen size; set, modify, or tailor adaptive subtitles to improve clarity, user experience, or accessibility for date picking components in different contexts or locales by defining custom text that replaces default labels during initialization or runtime.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        adaptiveMode: "auto",
        adaptiveSubtitle: "Choose start and end dates"
    });
    </script>

### ARIATemplate `String`*(default: "Current focused #=data.valueType# is #=data.text#")*

 Specifies a template used to populate value of the aria-label attribute of the currently focused cell of the calendar..The parameters available for the template are:

* `current` - The current focused date.
* `valueType` - The focused item value type - month, year and etc.
* `text` - A text representing the focused value.


<div class="meta-api-description">
How to customize ARIA label for active date in Kendo UI DateRangePicker? Set or customize the accessible label for the active calendar date cell in a date range selector widget to improve screen reader announcements and accessibility, enabling developers to configure or provide dynamic aria-label templates that describe the focused date, type of value (such as day, month, or year), and related descriptive text for enhanced navigation and usability of calendar components by users relying on assistive technologies.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#"
    });
    </script>

### autoAdjust `Boolean` *(default: true)*

If this property is enabled and you have configured `min` and/or `max` values, and the user enters a value that falls out of that range, the value will automatically be set to either the minimum or maximum allowed value.


<div class="meta-api-description">
How can I prevent users from selecting dates outside of a specified range in Kendo UI's DateRangePicker? Control automatic clamping or adjustment of user-selected or entered date ranges to stay within defined minimum and maximum limits, ensuring out-of-bounds dates are corrected to the nearest allowed boundary, enabling configuration to automatically enforce valid date inputs, constrain date selections within set ranges, handle user input that exceeds allowed start or end dates, and guarantee date range values remain within acceptable limits through auto-correction or bounding features.
</div>

#### Example - prevent automatic value adjustments

    <h3>Try to change the year to an earlier one by typing it and then focus out the input.</h3>
    <input id="daterangepicker" />
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        min: new Date(),
        value: new Date(),
        autoAdjust: false
    });
    </script>

### calendarButton `Boolean` *(default: false)*

If this configuration is enabled, a calendar button will appear inside the date inputs. This is similar to the calendar button in the DatePicker component. The calendar popup will be opened only when the button is clicked. Clicking inside the input itself will have no effect.


<div class="meta-api-description">
How can I prevent the calendar from opening automatically when using a Kendo UI DateRangePicker? Control the presence of a clickable calendar icon or button within date input fields that triggers a calendar popup exclusively on button click, preventing opening the calendar when typing or focusing inside the input box. Configure the input to display or hide this calendar toggle to separate calendar activation from direct input focus, mimicking standalone date picker behavior and enabling user interaction patterns centered around explicit calendar button presses rather than automatic popup on input focus or click. This setting allows developers to set, enable, or disable calendar button controls for clearer user experience on date range selection components.
</div>

#### Example - render the calendar buttons

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            calendarButton: true
        });
    </script>

### clearButton `Boolean` *(default: false)*

If this configuration is enabled, a clear button will appear in the date inputs where a date is selected. Clicking on the clear button will remove the selected date from the input.


<div class="meta-api-description">
How do I enable a clear button in the Kendo UI DateRangePicker? Enable, show, or configure a clear or reset button within date range picker inputs to let users quickly erase or remove selected dates from start or end fields, supporting clearing individual dates, resetting values, toggling clear icons inside date inputs, and improving user control to delete chosen date selections easily.
</div>

#### Example - render the clear button

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            clearButton: true
        });
    </script>

### culture `String`*(default: "en-US")*

Specifies the culture info used by the component. A valid kendo culture file must be added to the page in order for the example to work. `<script src="https://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>`


<div class="meta-api-description">
How do I set the culture for a Kendo UI DateRangePicker? Control and configure date and time localization, regional settings, and international formats for date range selection by specifying culture, language, locale, or regional preferences. Enable setting or adjusting date formatting styles, calendar language, timezone display, or cultural conventions in date range pickers to support multilingual user interfaces, regional calendars, or localized date inputs. Manage localization settings to adapt date formats, cultural norms, and language-specific date representation, ensuring that date ranges appear correctly formatted in various cultures such as US English, German, French, or other international locales. Customize how dates are parsed, displayed, and interpreted within a date-range input component by applying regional culture definitions or localization files.
</div>

#### Example - specify a culture

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        culture: "de-DE"
    });
    </script>

### dates `Array`

Specifies a list of dates, which will be passed to the [month template](/api/javascript/ui/daterangepicker#configuration-month.content).


<div class="meta-api-description">
How do I customize which dates appear in the Kendo UI DateRangePicker? Configure a customizable list of individual dates to integrate with date selection components, enabling developers to control which dates appear highlighted, disabled, annotated, or specially rendered within calendars or month views. This feature supports specifying particular days for customized styling, conditional disabling, or visual emphasis in date pickers, allowing enhanced interaction such as marking events, holidays, or unavailable dates. It facilitates fine-grained manipulation of calendar displays by feeding precise date arrays into rendering templates, thereby empowering developers to tailor user experiences around specific, selectable days and implement custom logic for date availability and presentation in scheduling interfaces.
</div>

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


<div class="meta-api-description">
How do I control calendar navigation levels in Kendo UI's DateRangePicker? Control and configure calendar navigation levels in a date range selector by setting whether users can move through and select specific days, months, years, or broader time spans like decades and centuries; adjust the calendar hierarchy visibility to limit or expand date selection granularity, enabling options to define the initial and maximum calendar views such as daily grids, monthly views, annual overviews, decade ranges, or century spans, ensuring synchronization between starting view and navigable depth to manage user interaction with the date picker effectively, including how far users can zoom in or out when picking dates within a range.
</div>

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


<div class="meta-api-description">
How do I block specific dates from being selected in a Kendo UI DateRangePicker component? Control and restrict selectable dates by specifying exact days or applying custom logic to disable dates within a date range picker component, enabling you to block holidays, weekends, specific blackout periods, or dynamically exclude dates using arrays or callback functions that assess each calendar day for eligibility, thus tailoring allowed date selections for scheduling, booking, or filtering scenarios.
</div>

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


<div class="meta-api-description">
How do I configure the end date field in Kendo UI's DateRangePicker? Specify or configure the target model attribute, key, or field name that holds, stores, or tracks the end date value for date range selections, enabling binding, syncing, or mapping of the chosen end date in forms, data models, or state management alongside start date fields, useful in setting, updating, or retrieving the end of a date interval, time span, or range within user input components or UI controls.
</div>

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

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"


<div class="meta-api-description">
How do I customize the appearance of a date range picker in Kendo UI for jQuery? Configure and customize the visual styling of date selections and calendar cells by setting how colors fill or outline the date range picker interface, enabling options such as solid fills, flat colors, outlined borders, or no color treatment, to control the appearance, highlight selected dates, emphasize ranges, or present a minimalistic calendar display with flexible color application modes that developers can set for focused, subtle, or bold date cell styling.
</div>

#### Example - sets the fillMode

    <div id="daterangepicker" title="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        fillMode: "flat"
    });
    </script>

### footer `String|Function`

 The [template](/api/javascript/kendo/methods/template) which renders the footer of the calendar. If false, the footer will not be rendered.


<div class="meta-api-description">
How to customize the footer in Kendo UI for jQuery DateRangePicker component? Control and customize the calendar footer area of a date range selector by injecting custom template content, enabling or disabling footer display, rendering dynamic or static footer elements, configuring footer appearance, adding informational messages, summary text, action buttons, or additional controls within the footer section, and deciding whether to show or hide the footer area in date range selection components.
</div>

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


<div class="meta-api-description">
How can I customize the date format in Kendo UI's DateRangePicker component? Set or customize the display and input format for date ranges, controlling how start and end dates are shown and interpreted within date selection components. Configure date patterns, delimiters, and formatting styles to match different locales, customize user input parsing, support various date representations, and ensure consistent date range display and validation. Enable flexible date formatting options that affect both rendering and processing of date intervals, allowing adjustment for preferred date order, separators, and pattern tokens for user-friendly and localized date range inputs.
</div>

#### Example - specify a custom date format

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        format: "yyyy/MM/dd"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I change the on-screen keyboard for date range picker inputs to use a numeric keypad? Configure and control the type of on-screen keyboard or virtual keyboard that appears when entering dates in a date range input field by specifying input modes such as numeric, text, decimal, tel, email, or URL. Enable setting or customizing the keyboard layout for date inputs to improve user experience on mobile devices, tablets, or touchscreens, ensuring the appropriate keypad appears for faster and more accurate date or numeric entry. Adjust the input mode to control how the device interprets input focus and optimize data entry for various date formats or custom input types within date range selectors.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        inputMode: "numeric"
    });
    </script>


### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.


<div class="meta-api-description">
How to restrict date selection beyond a certain date in Kendo UI DateRangePicker? Set or configure the upper limit for selectable dates in a date range selector, controlling the maximum allowed date users can pick or navigate to, blocking selection or display of any dates beyond this end boundary, enabling restrictions on future dates, limiting calendar navigation past a certain cutoff, enforcing date validation by capping the latest possible date, and ensuring users cannot select dates after a specific maximum threshold.
</div>

#### Example - specify the maximum date

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        max: new Date() // sets max date to today's date
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How do I customize button captions in Kendo UI's DateRangePicker? Customize or localize text labels, button captions, placeholder prompts, and user interface messages in date range selection components by configuring or overriding default displayed strings. Enable setting custom language or terminology for interface elements, adjusting prompts for start and end dates, changing button text like apply or cancel, and tailoring all user-facing text to match regional, accessibility, or branding requirements within date selection widgets. Control or update all textual content for date range pickers to improve usability, localization, internationalization, and customization of UI messages and labels related to selecting date intervals.
</div>

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


<div class="meta-api-description">
How do I customize the label for the start date in a Kendo UI DateRangePicker? Customize or set the text label displayed for the initial or start date input in a date range selector, control or change the prompt text indicating the beginning of the date range, configure the start date field description, update the label shown near the first calendar input for range selection, enable localization or personalization of the starting date prompt in date pickers, modify the user-facing text that guides selecting the beginning date, support changing or overriding default start date labels in date selection components, adjust or translate the text that precedes the picker for the initial date entry, control how the start date field is labeled for accessibility and clarity within date range input interfaces.
</div>

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


<div class="meta-api-description">
How to change the label for the end date in a Kendo UI DateRangePicker? Set, configure, or customize the text label for the end date field in date range selectors, modify the displayed name for the end boundary in date pickers, change or localize the label that appears at the end of a selected date interval, enable tailored wording for the finishing date input, control how the end date prompt or caption is presented in date range inputs, update or translate the end label to match language or UI preferences, adjust the label text that identifies the last date in date range controls, personalize the title or prompt shown for the end date selector, and manage the terminology used for the end boundary in period or range date inputs.
</div>

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


<div class="meta-api-description">
How do I set the minimum date that can be selected in a Kendo UI DateRangePicker? Control or configure the earliest selectable date, minimum allowable date, or lower boundary for date selection to restrict users from choosing or navigating to dates before a specified point in time; set, enforce, or limit the starting date range to prevent calendar navigation or selection of earlier dates, establish the earliest date constraint, and define the minimum calendar date to ensure inputs fall within an allowed date interval or threshold.
</div>

#### Example - specify the minimum date

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        min: new Date() // sets min date to today's date
    });
    </script>

### month `Object`

Templates for the cells rendered in the calendar "month" view.


<div class="meta-api-description">
How can I customize the rendering of individual day cells in a Kendo UI DateRangePicker's monthly view? Control and customize the rendering of individual day cells in the calendar’s monthly view by providing templates or functions that dynamically modify calendar dates, apply custom classes, insert HTML content, bind data values, and adjust visual states for each day cell. Enable flexible month view customization through template-driven configurations that allow developers to tailor date rendering, highlight specific dates, format cells, and inject dynamic content during initialization or runtime, supporting advanced calendar UI customization, date styling, and conditional formatting in date picker components.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        month: {
            content: (data) => `<div>${data.value}</div>`,
            empty: "<span>-</span>"
        }
    });
    </script>

### month.content `String`

The template to be used for rendering the cells in "month" view, which are between the min/max range.


<div class="meta-api-description">
How can I customize the appearance of each day cell in a Kendo UI DateRangePicker's month view? Adjust or customize the rendering of individual day cells shown in the calendar month view by supplying templates or custom markup that can include formatted dates, icons, tooltips, or CSS classes for selectable days within the minimum and maximum date range. Control how days appear within a monthly calendar grid, enabling tailored visuals or interactive elements for each date cell, influencing the presentation of dates in range selectors, date pickers, or calendar widgets during initialization or runtime. Embed dynamic content, style modifications, or additional metadata inside each visible day cell for enhanced user experience in date selection interfaces.
</div>

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


<div class="meta-api-description">
How can I customize week numbers displayed in the Kendo UI DateRangePicker calendar? Configure or customize the display of week numbers or custom content in calendar week columns by defining templates that control how each week's cell is rendered, including setting the week number, formatting dates, showing the first day of the week, or adding dynamic data for every calendar row; enable binding to properties like the starting date of the week and its computed week number to tailor labeling, formatting, or additional calculations within week-based date range selections, supporting use cases such as international week numbering, custom week displays, or enhanced calendar UI controls.
</div>

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


<div class="meta-api-description">
How do I customize the appearance of months that are not selectable in a Kendo UI DateRangePicker? Control the rendering, display, appearance, or content of calendar month cells that fall outside the allowed date range or minimum and maximum boundaries in a date range selection interface. Customize placeholders, empty states, disabled month cells, or out-of-bounds months with templates to modify HTML, markup, styling, or visual feedback for months that are not selectable or fall beyond configured limits. Enable personalized rendering, conditional formatting, or alternative content for unavailable months in a date range picker or calendar month view.
</div>

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


<div class="meta-api-description">
How to show/hide date input labels in Kendo UI DateRangePicker? Toggle or configure the visibility of start and end date input labels in a date range selection interface, enabling you to show or hide field labels for date pickers, control whether labels appear on date range inputs, set label display preferences for date range fields, manage label visibility during date range selection, and adjust interface elements to display or conceal start and end date indicators in scheduling or calendar components.
</div>

#### Example - disable the labels

    <div id="daterangepicker1"></div>
    <script>
        $("#daterangepicker1").kendoDateRangePicker({
            labels: false
        });
    </script>

### weekNumber `Boolean` *(default: false)*

If set to `true` a week of the year will be shown on the left side of the calendar. It is possible to define a template in order to customize what will be displayed.


<div class="meta-api-description">
How to show week numbers in a Kendo UI DateRangePicker? Enable showing week numbers alongside calendar dates in a date range selector, allowing users to view the week of the year on the calendar's side for easier scheduling and reference; customize the appearance and formatting of these week labels with templates to control display style, add specific content, or modify the week numbering format, supporting use cases like fiscal week tracking, international calendar standards, or user-friendly chronological navigation in date pickers.
</div>

#### Example - enable the week of the year option

    <div id="daterangepicker1"></div>
    <script>
        $("#daterangepicker1").kendoDateRangePicker({
            weekNumber: true
        });
    </script>

### range `Object`

Configures the Kendo UI DateRangePicker range settings.


<div class="meta-api-description">
How do I set default date ranges in Kendo UI for jQuery DateRangePicker? Set or configure the selectable start and end dates for date intervals, control default date ranges, define minimum and maximum date constraints, customize valid date span selections, enforce date range limits, manage selectable periods, and initialize date boundaries for picker controls to validate, display, and restrict user input of date intervals within calendar or scheduling interfaces.
</div>

#### Example

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        range: {
            start: new Date(2024, 0, 15),
            end: new Date(2024, 0, 25)
        }
    });
    </script>

### range.start `Date`

This sets the start date of the range selection.


<div class="meta-api-description">
How do I set the initial start date for a date range selection in a Kendo UI DateRangePicker? Configure or specify the initial or updated start date of a date range selection, enable setting or modifying the beginning boundary of a date interval for scheduling, filtering, or data queries, bind or synchronize the start date value with models or application state, programmatically adjust or control the commencement date within calendar or date picker components, handle user input for the range’s starting point, and manage date intervals by defining the earliest date in a selected period, enabling dynamic updates, date range validations, and customized time span configurations.
</div>

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


<div class="meta-api-description">
How do I set the end date of a date range selection in Kendo UI's DateRangePicker component? Configure, set, or update the end date of a date range selection as the upper bound or closing date within a selectable date interval, enabling control over the final day in a multi-day picker, range filter, or calendar component. Adjust, define, or programmatically modify the last date to specify the conclusion of a user’s date range input, including initializing the range with a preset end date, refining date intervals for searches or filters, and managing end boundaries in timeline selections or booking systems. This property supports scenarios involving date span finalization, cutoff dates, maximum selection limit, and adjustments to the concluding date of a start-to-end timeframe.
</div>

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

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius of the inputs. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"


<div class="meta-api-description">
How do I change the border radius of the date range input fields in a Kendo UI DateRangePicker? Set or customize the border radius and corner curvature of date range input fields, controlling how rounded or sharp the edges appear by specifying pixel values or semantic sizing options like none, small, medium, large, or full. Adjust, configure, or style the input corners to achieve consistent, smooth, or sharp rounded effects that influence the visual shape of the date selection boxes. Enable or disable rounded corners, control the corner radius for user interface elements related to date picking, and match design system tokens to ensure uniform border rounding across different components or themes.
</div>

#### Example - sets the rounded value

    <div id="daterangepicker" title="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        rounded: "large"
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How to adjust the size of the date range picker widget in Kendo UI? Control and customize the visual dimensions, scaling, spacing, and overall size of date range selection inputs to match different user interface densities, layout requirements, and display preferences. Adjust height, padding, typography scale, and compactness with options to set small, medium, large, or no sizing, enabling responsive design adaptations, condensed layouts, or spacious presentations for date picking components. Configure or modify the sizing behavior to optimize usability and visual hierarchy in date range selectors across diverse screen sizes and application contexts.
</div>

#### Example - sets a size

    <div id="daterangepicker" title="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        size: "large"
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
How do I configure the initial calendar display mode in a Kendo UI DateRangePicker? Set or configure the initial calendar display mode or default view when opening a date range selector, controlling whether it opens by days within a month, months within a year, years within a decade, or decades within a century. Enable starting navigation at a specific granularity level to focus the calendar on a particular time scale, such as month, year, decade, or century. Control how the calendar initially presents time units for easier date range selection, allowing quick jumps across different temporal scopes from detailed daily views to broader multi-year or multi-decade perspectives. Adjust the starting point for navigating between dates to customize user experience and improve date range picking efficiency across various time spans.
</div>

#### Example - specify the initial view, which calendar renders

    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            start: "year"
        });
    </script>

### startField `String`*(default: "")*

Specifies the start field name for model binding.


<div class="meta-api-description">
How do I configure the start date input in Kendo UI's DateRangePicker? Configure the initial date input for selecting the beginning of a date range by specifying which data model or form field should receive the start date value during user interaction, enabling precise control over how the start date is bound, mapped, or posted within forms, APIs, or view models. This setting helps link the starting date in a date range picker to a particular property name in your submission payload, data binding context, or request body, supporting customization of model binding, field mapping, or data synchronization for start date values in range selections.
</div>

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


<div class="meta-api-description">
How do I dynamically change the format of dates in a Kendo UI DateRangePicker component after it has been created? Configure, customize, or update the settings, parameters, or properties of a date range selection component after it has been created, enabling dynamic control over initialization options, appearance adjustments, behavior tweaks, nested configurations, and runtime modifications to features such as formats, ranges, styles, or interaction modes through an accessible object that holds all configurable options.
</div>

#### Example - get options of the component

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker();

    var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");

    var options = daterangepicker.options;
    </script>

## Methods

### close

Closes the calendar.


<div class="meta-api-description">
How do I programmatically close the Kendo UI DateRangePicker popup in jQuery? Programmatically close, hide, collapse, or dismiss the date range selector popup or calendar widget through code commands or method calls, enabling developers to control calendar visibility from event handlers, external buttons, or interactive triggers. This function can be invoked to shut down the open calendar panel without affecting selected date values or input fields, ensuring seamless UI control for modals, dropdowns, or overlay elements that present date ranges. Use this to toggle the date picker’s display state, manage focus behavior, or automate closing when users interact outside the picker area or complete their date selection.
</div>

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


<div class="meta-api-description">
How do I properly destroy a Kendo UI DateRangePicker widget to prevent memory leaks? Release and clean up all resources, event listeners, and associated data to prevent memory leaks when removing or disabling a date range selector or calendar widget; fully detach all event handlers, clear internal data storage, and recursively destroy nested UI components or child widgets related to the date range input without removing the actual DOM element, ensuring complete teardown of behaviors and cleanup of any attached event bindings for optimal resource management and preventing residual side effects from lingering components.
</div>

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


<div class="meta-api-description">
How do I dynamically enable or disable user input in a Kendo UI DateRangePicker control? Activate or deactivate the date range selector dynamically by enabling or disabling user input, interaction, and calendar access at runtime. Control whether users can open the date picker widget, type or select dates, toggle the component’s availability, or programmatically set its active state to allow or block date range selection and editing within your application. Adjust the user interface behavior by switching the date range control on or off, managing interactive date input, and preventing or permitting calendar interaction through method calls.
</div>

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


<div class="meta-api-description">
How to prevent users from modifying date selections in Kendo UI DateRangePicker? Control or toggle the ability to prevent users from modifying date selections while ensuring the selected date range remains included in form submissions, enabling a non-editable but still submit-enabled state where input fields cannot be typed into or changed via date pickers, distinguishing between blocking all user interaction without disabling form value posting and managing interactive input states to switch between editable and locked modes without losing data transmission in form handling or user interface workflows.
</div>

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


<div class="meta-api-description">
How can I set an upper date limit for selecting date ranges in a Kendo UI DateRangePicker? Adjust, configure, or retrieve the maximum allowed date for selecting date ranges, set an upper date limit or boundary to restrict user selections in date range inputs, dynamically update or query the highest selectable date value to control date picker constraints, enforce or modify the maximum date for calendar-based input fields, limit date selection windows by setting or getting the latest permissible date, manage or access the upper date threshold to prevent selecting dates beyond a specific point, control allowable date ranges by defining or reading the maximum date parameter in date range components, customize or fetch the end limit of date intervals users can pick, set constraints for date pickers by specifying maximum dates and immediately apply changes, and obtain or update the maximum selectable date to guide user input within desired date boundaries.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How to set minimum date in Kendo UI DateRangePicker? control or retrieve the earliest allowed date for selecting ranges, set minimum date constraints to restrict user input, configure the lowest boundary of selectable dates, enforce date validation limits, update or query the starting date limit for date pickers, dynamically set or get the earliest date that can be chosen, manage minimum selection thresholds in date range inputs, establish or obtain the initial permissible date value to guide user selection, ensure input falls within defined minimum date parameters, adjust or fetch the minimal date boundary to validate or constrain date range picking.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How to programmatically open Kendo UI DateRangePicker dropdown interface? Trigger or programmatically display a calendar popup for selecting a start and end date range without user clicks by calling a method that opens the date picker’s dropdown interface. Enable, invoke, or set the date range selector to become visible on demand, such as in response to button presses, focus events, or other UI actions, allowing immediate access to the date selection calendar. Control the display of the calendar popup for choosing multiple dates using code to show the interactive date range chooser dynamically.
</div>

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


<div class="meta-api-description">
How do I set the selected date range in a Kendo UI DateRangePicker widget? Retrieve or set the currently selected date interval, control or update the chosen start and end dates, access or modify the date range selection dynamically, programmatically fetch or assign the selected period, synchronize or initialize the selection window, validate or adjust the picked date span, configure date boundaries interactively, and manage the selection state for date ranges flexibly within your application.
</div>

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


<div class="meta-api-description">
How can I dynamically change date formats in my Kendo UI DateRangePicker widget? Modify, update, or reconfigure date range picker settings dynamically at runtime by applying new configurations such as date formats, minimum and maximum selectable dates, preset ranges, localization options, display preferences, and other customizable parameters. Enable changing the calendar behavior, appearance, and supported features on the fly without recreating the component, supporting flexible adjustment of time zones, language, disabled dates, and selection constraints through programmatic control over the picker's options and settings after initial setup.
</div>

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


<div class="meta-api-description">
How do I capture updates when date selections in a DateRangePicker change? Capture updates when date selections in a range picker are modified, whether through user interaction or programmatic changes, enabling you to track start and end date shifts, trigger validation, synchronize models, refresh dependent interfaces, or execute custom logic upon any alteration of the chosen date interval.
</div>

#### Event Data

##### e.sender `kendo.ui.DateRangePicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        change: function() {
            var range = this.range();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(range);
    });
    </script>

### close

Fires when the calendar is closed


<div class="meta-api-description">
How to trigger an event when Kendo UI date range picker closes? Detect when a date range calendar or picker closes to trigger actions such as validating selected dates, updating bound data models, managing focus shifts, hiding or dismissing the UI, and performing cleanup or post-selection logic immediately after the user finishes choosing or cancels date ranges. Capture calendar closure events to control workflows tied to date selection completion, implement custom UI refreshes, or enforce date input validation once the picker is no longer visible.
</div>

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


<div class="meta-api-description">
How do I trigger an event when the Kendo UI DateRangePicker is opened? Detect when a date range calendar or picker activates or becomes visible, enabling execution of custom code like focusing input fields, loading dynamic data, triggering analytics tracking, or initializing UI elements upon calendar open events; listen for opening actions, calendar activation, or widget display triggers to capture event details and component context for reactive handling in web or mobile date selection interfaces.
</div>

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
