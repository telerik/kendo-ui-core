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

The adaptive rendering of the DateTimePicker provides consistency to the customer experience on any device by supporting adaptive enhancements such as changes in styling and behavior.


<div class="meta-api-description">
Control how the date and time selector adjusts its appearance and behavior for various devices by enabling or disabling adaptive rendering, allowing automatic optimization of layout, styling, and touch interactions for small screens and mobile devices, or retaining standard non-adaptive display; configure to support responsive design, improve usability on phones and tablets, customize interface adaptation modes, and ensure seamless user experience across different viewport sizes and input methods.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
Set or customize the header text displayed in responsive or mobile views for date and time selection interfaces to provide clear, concise, localized, or context-aware titles that improve user understanding and interface clarity, enabling control over how the picker’s title appears on small screens or adaptive layouts by configuring or overriding default labels in different languages or usage scenarios.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Date and Time"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
Customize or set the subtitle text shown in responsive or mobile layouts of date and time pickers, enabling control over adaptive views, small-screen subtitles, localized or custom subtitle labels, modifying the secondary text displayed when switching to compact or adaptive modes, configuring subtitle content for narrow or mobile interfaces, and tailoring the brief descriptive text shown in condensed date/time selection components.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Date and Time",
        adaptiveSubtitle: "Choose the desired date and time"
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the popups. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
Configure how date and time selection popups open and close by enabling, disabling, or customizing the transition animations for smoother or immediate display effects. Adjust animation settings to control popup appearance behavior, such as enabling fade, slide, or instant opening and closing without delays. Set or disable animation to optimize user experience, responsiveness, or performance in date and time picker interfaces. Manage popup reveal and hide effects with animation toggles, ensuring the control opens and closes either with visual transitions or instantly, depending on your UI preferences, timing requirements, or user interaction design.
</div>

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


<div class="meta-api-description">
Control and customize the closing animation or transition effect when a date and time selection popup is dismissed, enabling developers to define or configure how the popup disappears, including setting animation styles, durations, easing functions, or supplying custom animation effects for smooth, visually appealing closing behavior on interactive date/time pickers, dropdowns, or modal popups.
</div>

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


<div class="meta-api-description">
Set or customize the closing animation effects for a datetime picker widget by specifying one or multiple visual transition names that define how the picker hides or closes, enabling control over the exit animations, fade outs, slide transitions, or other visual effects during the closing sequence; configure the animation behavior by listing one or more effects separated by spaces to create smooth, combined closing motions and enhance user interface interaction with the date/time selector's dismissal.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        animation: {
            close: {
                effects: "fadeOut slideUp"
            }
        }
    });
    </script>

### animation.close.duration `Number`

The duration of the close animation in milliseconds.


<div class="meta-api-description">
Set and customize the duration of the closing animation for date and time picker popups or calendars by specifying the length of the close transition in milliseconds, enabling control over animation speed to make the closing effect faster or slower according to user interface preferences, transition timing adjustments, smoothness customization, or performance tuning for date/time selection components.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        animation: {
            close: {
                effects: "fadeOut",
                duration: 500
            }
        }
    });
    </script>

### animation.open `Object`

The animation played when the popup is opened.


<div class="meta-api-description">
Set and customize the opening animation effect for popup components like date and time selectors, enabling control over transition styles, animation types, durations, easing functions, and delays to enhance user interface interactions and visual feedback when popups appear. Adjust or configure how popup windows animate into view, including fade, slide, zoom, or other transition effects, and fine-tune timing and motion parameters for seamless opening animations on interactive datetime inputs or similar UI elements.
</div>

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


<div class="meta-api-description">
Configure and customize popup opening animations by setting one or more named animation effects that control how the DateTimePicker or similar dropdown elements visually appear when triggered, enabling smooth, combined, or sequenced animated transitions; this includes specifying multiple effects separated by spaces to enhance user interface interactivity, control entrance motion styles, and tailor the display behavior of calendar or time selection popups with supported animation types.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        animation: {
            open: {
                effects: "fadeIn slideDown"
            }
        }
    });
    </script>

### animation.open.duration `Number`

The duration of the open animation in milliseconds.


<div class="meta-api-description">
Control and customize the length of the popup opening animation in date and time selectors by setting the duration of how long the opening animation runs, specifying the time in milliseconds to adjust the speed or smoothness of the appearance effect, enabling developers to configure animation timing, transition duration, fade-in speed, or popup reveal intervals for enhanced UI responsiveness and user experience when activating or displaying date and time pickers or similar popup components.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        animation: {
            open: {
                effects: "fadeIn",
                duration: 600
            }
        }
    });
    </script>

### ARIATemplate `String`*(default: "Current focused #=data.valueType# is #=data.text#")*

 Specifies a template used to populate value of the aria-label attribute of the currently focused cell of the calendar. The parameters available for the template are:

* `current` - The current focused date.
* `valueType` - The focused item value type - month, year and etc.
* `text` - A text representing the focused value.


<div class="meta-api-description">
Customize or configure dynamic accessible labels for focused calendar cells in date and time pickers by using template-based ARIA attributes, enabling developers to set or control screen reader announcements for selected dates, months, or years, generate contextual aria-label strings based on the current focus, value types, or text representations, and improve accessibility by providing tailored spoken feedback for calendar navigation, date selection, or time input components.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#"
    });
    </script>

### autoAdjust `Boolean` *(default: true)*

If this property is enabled and you have configured `min` and/or `max` values, and the user enters a value that falls out of that range, the value will automatically be set to either the minimum or maximum allowed value. This property has effect only when the `dateInput` of the component is enabled.


<div class="meta-api-description">
Automatically constrain, clamp, or limit user-entered date and time inputs to predefined minimum and maximum boundaries, ensuring values typed outside the allowed range are adjusted to the nearest valid limit; this setting controls automatic correction of out-of-range date or time entries when manual date input is enabled, useful for enforcing date or time restrictions, preventing invalid input, and maintaining consistent value boundaries during user interaction or form submission.
</div>

#### Example - prevent automatic value adjustments

    <h3>Try to change the year to an earlier one and then focus out the input.</h3>
    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        min: new Date(),
        value: new Date(),
        dateInput: true,
        autoAdjust: false
    });
    </script>

### autoCorrectParts `Boolean`*(default: true)*

Sets a value that indicates whether to automatically correct the segment when out of range. In order to work, `dateInput` prop should be set to `true`.


<div class="meta-api-description">
Enable automatic correction or auto-fix of individual date or time segments when editing values interactively, allowing seamless adjustment of out-of-range parts during keyboard input or segmented edits, ensuring that hours, minutes, days, or months automatically snap to valid ranges without manual validation; use this to handle input constraints dynamically and improve user experience when typing or modifying partial date/time entries with segment-based controls.
</div>

#### Example - sets the autoCorrectParts

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        dateInput: true,
        autoCorrectParts: true
    });
    </script>

### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.


<div class="meta-api-description">
Set or customize the appearance and visual style of a date and time selector interface by choosing between traditional, classic layouts or modern, updated themes, enabling control over the UI rendering mode, design style, or component look to match user interface preferences, switch rendering modes at initialization, apply different visual themes or skins for datetime pickers, and configure how the date/time selection control displays within your application.
</div>

#### Example - specify modern component type

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            componentType: "modern"
        });
    </script>

### culture `String`*(default: "en-US")*

Specifies the culture info used by the component. A valid kendo culture file must be added to the page in order for the example to work. `<script src="https://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>`


<div class="meta-api-description">
Set or customize the date and time input to match specific regional or international formats by specifying locale, language, culture, or regional settings; control how dates and times are displayed, parsed, formatted, and localized including language-specific month names, day names, date separators, and calendar conventions; enable support for various cultural preferences and formatting standards such as those used in different countries, time zones, or language packs; configure cultural context to ensure correct date representation and validation in forms, UI components, or localization workflows; adapt date-time input for multilingual applications, internationalization (i18n), or global audience support by defining culture information that affects parsing rules and display style.
</div>

#### Example - specify a culture

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        culture: "de-DE"
    });
    </script>

### dateInput `Boolean`*(default: false)*

 Specifies if the DateTimePicker will use DateInput for editing value


<div class="meta-api-description">
Configure the date entry mode for selecting or editing dates and times by enabling or disabling a masked, keyboard-friendly input format that supports culture-aware date and time values, allowing users to type dates with validation and formatting assistance or alternatively use a free-text editor for flexible manual input. Adjust the control to switch between structured date input fields with input masking for easier date editing via keyboard and locale-sensitive formats or unstructured free-text editing that permits any date/time entry style, enabling customization of how end users interact with date and time values during editing, including toggling between guided, format-enforced date typing and unrestricted manual input.
</div>

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


<div class="meta-api-description">
Configure or set a collection of specific dates to highlight or activate within a calendar interface, enabling custom rendering of month cells and dynamically adjusting available time selections based on chosen days. Control date lists to mark special, disabled, or selectable dates, ensuring calendar views reflect custom schedules, events, or constraints, while synchronizing date selections with corresponding time options for accurate time slot availability and interaction. This capability supports scenarios requiring tailored date highlighting, dynamic updates of time slots as date selections change, and integration of special date-based logic into calendar and time-picker components.
</div>

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


<div class="meta-api-description">
Control and limit calendar navigation levels by configuring the visible date selection scope such as day, month, year, decade, or century views; specify how deep users can drill down in date pickers by setting boundaries for calendar display, enabling filtering or restricting available date ranges based on granularities like month view, year overview, decade spans, or century groupings; configure navigation depth to prevent scrolling beyond specified time units and synchronize initial display levels with allowed navigation depth to ensure consistent user interface behavior when selecting dates or periods.
</div>

#### Example - set navigation depth of the calendar popup

    <input id="datetimepicker"/>
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        depth: "year"
    });
    </script>

### disableDates `Array|Function` *(default: null)*

An array or function that will be used to determine which dates to be disabled for selection by the widget.


<div class="meta-api-description">
Prevent selection of specific calendar dates by configuring the ability to block, exclude, or mark certain days as unavailable or disabled in date-pickers. Enable disabling individual dates using arrays of exact dates or dynamic functions that evaluate each date to determine if it should be selectable, allowing developers to customize which dates users can pick, filter out holidays, weekends, or any undesired dates, restrict input to allowed days only, and control date availability in scheduling, booking, or form interfaces.
</div>

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


<div class="meta-api-description">
Set or configure the maximum selectable time limit, control the latest time displayed in a time picker or scheduling component, restrict time selection to a defined upper boundary, prevent users from choosing times beyond a specified threshold, customize or adjust the end range for time options shown in date and time inputs, enforce an upper bound on time choices for time-based UI controls, limit the available times in time selection interfaces to a certain cutoff point, define the last allowable time for appointment, event, or booking selectors, manage or cap the final time displayed in time pickers, and configure time input widgets to exclude times later than a set limit.
</div>

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


<div class="meta-api-description">
Configure or customize the color fill style for date and time selection components by setting how buttons, accents, and input fields display colors, enabling options to apply no color fill, solid color blocks, flat color layers, or outlined color borders. Adjust the appearance of interactive elements within a date picker or time picker interface by choosing different fill modes that control color intensity, style, and visual emphasis, providing flexibility for UI theming, highlighting active inputs, or defining button backgrounds with solid, flat, outlined, or transparent (none) color fills. This setting influences the visual styling of elements in date/time widgets to match design preferences and improve clarity or emphasis in user interactions.
</div>

#### Example - sets the fillMode

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        fillMode: "flat"
    });
    </script>

### footer `String`

 The [template](/api/javascript/kendo/methods/template) which renders the footer of the calendar. If false, the footer will not be rendered.


<div class="meta-api-description">
Customize or hide the calendar footer area of a date and time picker by supplying a custom template, such as HTML content, buttons, or summary information, or disable the footer entirely to remove it from rendering. Control footer visibility, enable custom footer layouts, configure footer content presentation, and manage footer display options within date/time selection interfaces to tailor the calendar’s bottom section for enhanced user interaction or simplified designs.
</div>

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


<div class="meta-api-description">
Customize, configure, or set the date and time display style, input format, and parsing rules for date pickers, datetime input fields, or calendar controls using flexible date/time patterns, formatting strings, or templates that handle user input, output rendering, localization, and parsing accuracy. Enable control over how timestamps, dates, and times appear and are interpreted, supporting both standard and custom formats, ensuring consistent representation, input validation, and user-friendly date/time handling across applications.
</div>

#### Example - specify a custom date format

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        format: "yyyy/MM/dd hh:mm tt"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
Control and configure the type of on-screen keyboard or virtual keypad that appears when entering date and time input, enabling specific input modes such as numeric, decimal, telephone, email, text, or search keyboards to optimize user typing experience, handle keyboard layouts, customize input behavior for mobile and desktop devices, set input restrictions or enhancement for easier data entry, and improve form usability by determining which keyboard should show based on the context of the input field.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        inputMode: "numeric"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the datetimepicker. If the datetimepicker has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
Set or customize the text or dynamic content that appears as a label before a date and time selector component by providing a static string or a function that returns HTML or text, enabling control over labeling, accessibility with associated input IDs, customizable captions, prompts, or titles linked to the date/time input, allowing developers to configure, update, or generate labels dynamically for user interface clarity and better user experience with date and time input fields.
</div>

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


<div class="meta-api-description">
Set or customize the text, formatted content, icons, or HTML markup displayed inside a date-time picker label, enabling control over the label’s inner content or innerHTML for styling, embedding symbols, adding rich text, or injecting custom elements during initialization or configuration of the date and time input label display.
</div>

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


<div class="meta-api-description">
Control whether the input label floats above the date-time picker field by enabling or disabling floating label behavior, allowing the label to move or stay fixed based on user focus or whether a date-time value is entered; configure the floating label wrapper for dynamic label positioning to improve form clarity, set floating labels to show or hide depending on input interaction, and manage or refresh label state programmatically to handle focus changes or value updates that do not fire typical focus events, ensuring seamless label animation and consistent visual cues in date and time selection inputs.
</div>

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


<div class="meta-api-description">
Adjust or configure the time step size, granularity, or increments for time selection in a date-time picker or dropdown, controlling how often times appear in the list, with options to specify intervals in minutes or detailed durations using hours, minutes, and seconds; customize or modify the interval to set time slots, define dropdown time ranges, enable precise time spacing, set step intervals for classic styles as numeric minutes, or use an object format for modern components to fine-tune time increments in scheduling, booking, or time input interfaces.
</div>

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


<div class="meta-api-description">
Set or configure the latest permissible date to restrict calendar navigation and selection, defining the maximum date boundary for date pickers that prevents users from choosing or browsing beyond a certain day, enabling control over allowed months and date ranges either at setup or dynamically, useful for limiting input to a cutoff date, expiry, deadline, or maximum scheduling window.
</div>

#### Example - specify the maximum date

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        max: new Date(2013, 0, 1, 22, 0, 0)
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
Customize and localize the text, labels, placeholders, and displayed strings within date and time selection components to enable translations, change default wording, override UI messages, adapt interface language, set custom prompts, or configure text elements for internationalization, localization, or user-specific language preferences in date-time pickers and calendar controls.
</div>

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


<div class="meta-api-description">
Customize or set the week column header text in the calendar or date picker interface to improve accessibility, localization, or user interface clarity by configuring labels, headers, or displayed text for the weekly column; control or override default weekday column titles, adjust week index headers, or specify custom strings to enhance screen reader support, internationalization, or visual guidance in date selection components and calendar views.
</div>

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


<div class="meta-api-description">
Customize and localize date and time input placeholders by configuring message settings that control each segment such as day, month, year, hour, minute, and second. Enable tailored prompts or hints for date and time entry fields to improve user guidance in forms, adapt placeholders for different languages or regions, set custom labels or text for date/time input components, and adjust localization strings to match various cultural formats. This supports flexible user interface text customization for date/time selectors, helping developers control how date and time parts are presented during input across diverse locales and applications.
</div>

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


<div class="meta-api-description">
Customize or configure the placeholder text for the year input field in a date and time picker, enabling control over the displayed hint or default text prompting users to enter or select the year value; this helps specify and localize the year input prompt, set custom labels, modify placeholder hints for year selection, and tailor the user interface to guide users in entering the year during date input processes.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                year: "Year"
            }
        }
    });
    </script>

### messages.dateInput.month `String` *(default: "month")*

The placeholder for the months part.


<div class="meta-api-description">
Configure or customize the month placeholder text in date input fields within date and time picker components to support localization, internationalization, and multilingual user interfaces; set, update, or control the default month label, prompt, or hint shown in calendar date selectors, input placeholders, or UI elements to match user locale preferences, regional date formats, or language-specific month names for improved clarity and accessibility in date selection controls.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                month: "Month"
            }
        }
    });
    </script>

### messages.dateInput.day `String` *(default: "day")*

The placeholder for the day of the month part.


<div class="meta-api-description">
Configure the placeholder text for the day field in date and time picker inputs, customize or set the day-of-month prompt or hint shown to users when entering a date, control the day input placeholder label, adjust or localize the day segment placeholder in date selectors, and modify the day part display text for date input components to enhance user guidance during date entry.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                day: "Day"
            }
        }
    });
    </script>

### messages.dateInput.weekday `String` *(default: "day of the week")*

The placeholder for the day of the week part.


<div class="meta-api-description">
Set or customize the placeholder text for the day of the week field in date input controls, configure how weekday prompts appear in date pickers, control the display of day names or abbreviations in calendar inputs, adjust or localize the day-of-week placeholder for scheduling or date selection components, enable developers to define placeholder labels for weekdays in date selection interfaces, change or set the default weekday hint text for date-time inputs, support internationalization or personalization of day labels in date input widgets, specify or override the text shown where users enter or view the day of the week in date/time pickers.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                weekday: "Weekday"
            }
        }
    });
    </script>

### messages.dateInput.hour `String` *(default: "hours")*

The placeholder for the hours part.


<div class="meta-api-description">
Configure or customize the placeholder text, hint, or label displayed in the hours input field of date and time selection components, enabling control over the hour part prompt, the default text that appears when users enter hour values, setting the placeholder for the hour field in date-time pickers, adjusting the displayed guide within the hour input box, or defining the example or empty text shown to users for hour input during date and time entry.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                hour: "Hours"
            }
        }
    });
    </script>

### messages.dateInput.minute `String` *(default: "minutes")*

The placeholder for the minutes part.


<div class="meta-api-description">
Customize or configure the placeholder text for the minute input in time selection interfaces, including setting localized or translated minute prompts, adjusting minute field placeholders in date and time pickers, controlling how minute values are hinted or displayed in input forms, enabling clear minute entry guidance in time selectors, and modifying minute input placeholders for enhanced user experience in scheduling, time setting, or calendar controls.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                minute: "Minutes"
            }
        }
    });
    </script>

### messages.dateInput.second `String` *(default: "seconds")*

The placeholder for the seconds part.


<div class="meta-api-description">
Set or customize the placeholder text for seconds input in date and time selection interfaces, enabling localization and internationalization of the seconds field in date-time pickers; adjust, translate, or configure the seconds prompt or hint text shown to users while entering time, supporting varied language settings and user interface customization for second-level time input.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                second: "Seconds"
            }
        }
    });
    </script>

### messages.dateInput.dayperiod `String` *(default: "AM/PM")*

The placeholder for the AM/PM part.


<div class="meta-api-description">
Customize or configure the AM/PM placeholder text for time input fields in date and time pickers, enabling localization or customization of the day period indicator to match different languages, regions, or user preferences. Adjust, set, or override the default AM/PM labels, day part markers, or meridian indicators shown in date-time selection UI components, ensuring that the period of day display is clear and appropriately localized for user interfaces, forms, or scheduling apps.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        messages: {
            dateInput: {
                dayperiod: "AM/PM"
            }
        }
    });
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.


<div class="meta-api-description">
Set the earliest selectable or visible date in a calendar or date picker control to restrict past date navigation, control minimum allowed dates for scheduling, limit user input to dates not before a specific day, configure the start boundary or lower limit for date selection, enforce date constraints to disallow picking dates before a given threshold, enable setting the earliest date users can view or choose, define the minimum date range to prevent selecting outdated or invalid past dates.
</div>

#### Example - specify the minimum date

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        min: new Date(2011, 0, 1, 8, 0, 0)
    });
    </script>

### month `Object`

 Templates for the cells rendered in the calendar "month" view.


<div class="meta-api-description">
Customize calendar day cells with templates that control the display, formatting, styling, and content of individual dates in a month view calendar component. Enable setting or modifying how each day appears, including dynamic rendering, conditional formatting, and personalized cell layouts to tailor the monthly calendar experience. Configure month grid cells for custom visuals, enhanced date representation, or interactive elements within a monthly calendar picker interface.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        month: {
            content: '<div class="custom">#= data.value #</div>'
        }
    });
    </script>

### month.content `String`

 Template to be used for rendering the cells in the calendar "month" view, which are in range.


<div class="meta-api-description">
Customize and control the appearance and content of in-range month cells within a calendar's month view by configuring templates, HTML markup, or dynamic data bindings, enabling developers to tailor cell rendering, format dates differently, inject custom components or styles, and adjust the display of selectable months in date-picking interfaces for enhanced user experience and precise visual customization in calendar widgets.
</div>

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


<div class="meta-api-description">
Control and customize the rendering of week number cells in the month view calendar by setting a template that defines how each week's cell displays, enabling developers to format or replace the default week number with custom content. This includes configuring the display of the computed week of the year, leveraging data such as the first date of the week and the numeric week identifier for showing week start dates, implementing ISO week calculations, or tailoring the visual presentation of weeks within calendar grids. Ideal for scenarios where you want to override default week numbering, format weeks differently, highlight specific weeks, or add contextual information to the weekly cells in date picker components.
</div>

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


<div class="meta-api-description">
Customize rendering or styling of calendar cells for days outside the allowed minimum and maximum date range in a month view, including options to set placeholders, disable date selection, control appearance of out-of-range dates, apply custom templates or HTML content, configure how invalid or unavailable days appear, and enable visual differentiation or masking of dates not selectable within the calendar grid.
</div>

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


<div class="meta-api-description">
Configure and control the popup behavior and appearance of the date and time selection interface, including how the calendar or clock dropdown opens, closes, animates, and anchors relative to input elements or containers. Enable customization of popup positioning on screen, animation effects for smooth transitions, anchoring points to attach the popup correctly, and specification of the container element where the dropdown renders. Manage overlay behaviors, control popup opening triggers, and set options to fine-tune the UI experience for date and time pickers, ensuring adaptable dropdown placement and interaction in various layouts and responsive designs.
</div>

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


<div class="meta-api-description">
Configure or set the container element where the popup calendar or time selector appears by specifying a jQuery selector or DOM element to control the placement of date and time picker overlays. Enable precise control over where the popup dropdown or overlay appends in the DOM, such as attaching to a specific parent, container, or element outside the default flow. Adjust or customize popup insertion points for better layout management, avoid clipping, or fix z-index stacking issues by defining a target node for appending the DateTimePicker’s popup interface during initialization or runtime.
</div>

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


<div class="meta-api-description">
Control and customize the position of a popup or dropdown relative to its anchor element by specifying vertical and horizontal alignment options such as top, center, bottom for vertical placement and left, center, right for horizontal placement, enabling precise adjustment of where the popup appears on screen, useful for configuring UI elements like date pickers, dropdown menus, or tooltips to open in varied positions like bottom left, top right, center center, or other combinations to fit different layout or design requirements.
</div>

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


<div class="meta-api-description">
Adjust or configure the alignment and placement of a popup relative to its anchor by specifying vertical and horizontal attachment points such as top, center, bottom combined with left, center, or right. Control where a dropdown, floating panel, or overlay appears by setting its position in terms of vertical and horizontal anchors to align precisely with reference elements, enabling customization of popup positioning like bottom left, top right, center center, and other combinations. Enable fine-tuned control over popup origin and attachment for date pickers or other UI elements, allowing positioning flexibility in layouts, responsive designs, or user interface customization scenarios.
</div>

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


<div class="meta-api-description">
Enable or configure displaying week numbers alongside calendar dates to show the week-of-year indicator next to each week in date selection components, including options to toggle visibility, customize the display format, or apply templates for personalized week number rendering. This control helps users view or select dates with associated ISO or custom week numbers, supports showing week indices on the left margin of calendars or pickers, and assists with scheduling or date navigation by highlighting the ordinal week sequence within a year. Adjust, show, or hide week count labels in date pickers or calendars to enhance temporal context and improve date-related interactions.
</div>

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


<div class="meta-api-description">
Configure custom date and time input parsing by specifying multiple format patterns to interpret user-entered or programmatically set values, enabling flexible recognition of various date/time string formats with prioritized strictness levels; if no custom parse formats are configured, default date and time display formats are used as fallbacks, ensuring reliable date/time parsing, validation, and conversion for diverse input styles and formats.
</div>

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


<div class="meta-api-description">
Adjust or configure the corner radius, border curvature, or rounded edges of a date and time selection interface by specifying numeric values or predefined options such as none, small, medium, large, or full; customize the smoothness or sharpness of corners for UI components like date pickers, datetime selectors, or input controls to match design requirements, control visual styling, set border radius for rounded corners, enable or disable corner rounding, and manage the appearance from squared to fully circular edges in user interface elements.
</div>

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


<div class="meta-api-description">
Adjust the visual scale, density, and spacing of the date and time selector interface to make it more compact, spacious, prominent, or minimal within your application layout. Configure or set size options such as small, medium, large, or none to control the component’s overall footprint, appearance, and arrangement according to your UI needs. Enable scaling for tighter or more relaxed layouts, customize the component's dimensions, and control how it fits visually with other interface elements for flexible display and responsive design.
</div>

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


<div class="meta-api-description">
Control the initial calendar view or default zoom level when opening a date and time selection interface by configuring the starting display mode, choosing to begin with daily month view, monthly year overview, yearly decade spread, or decade-level century range; set or customize the initial calendar navigation focus to show days, months, years, or decades upon opening, enabling developers to define how the calendar is first presented and which time scale users see first, such as month grid, year list, decade range, or century decades overview, to improve usability based on context or user preference.
</div>

#### Example - specify the initial view, which calendar renders

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            start: "year"
        });
    </script>

### startTime `Date`

 If set, specifies the earliest time the TimeView can show.


<div class="meta-api-description">
Limit the earliest selectable or visible time in a time picker control to restrict available time slots shown in a dropdown or time selection list, enabling configuration of the minimum time users can choose or view in scheduling interfaces. This controls the starting point of time options presented in time pickers, time selectors, or datetime input fields, ensuring users cannot pick or see times before a specified hour, minute, or timestamp. Developers can set a minimum time boundary or configure a start time cutoff to filter or constrain time ranges dynamically in calendar widgets, appointment schedulers, or time selection components.
</div>

#### Example - specify the start time for the TimeView

    <input id="datetimepicker" />
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            startTime: new Date(2023,1,3,8,30,0)
        });
    </script>

### timeFormat `String`*(default: "h:mm tt")*

 Specifies the format, which is used to format the values in the time drop-down list.


<div class="meta-api-description">
Control and customize the display of time options in a date and time selection dropdown by setting the time display pattern, enabling formats like 12-hour with AM/PM or 24-hour military time, adjusting hour and minute presentation styles, configuring time strings using standard or Kendo-specific format patterns, specifying how times appear in picker lists, and defining custom time formatting to match user locale or application requirements for showing hours, minutes, and meridiem indicators precisely.
</div>

#### Example

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        timeFormat: "HH:mm" //24 hours format
    });
    </script>

### value `Date`*(default: null)*

 Specifies the selected value.


<div class="meta-api-description">
Configure, set, retrieve, or update the current date and time selection in a date-time input control, enabling initialization of default values, programmatic changes, accessing or binding the chosen timestamp, synchronizing user input with form data, validating selected dates, and managing state for date and time pickers or calendar widgets.
</div>

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


<div class="meta-api-description">
Configure and customize the date and time selector by accessing and modifying its runtime settings, enabling developers to dynamically change initialization parameters such as appearance, validation rules, format options, localization settings, and behavioral aspects during execution. Adjust or read properties to control how date and time inputs are displayed and validated, update locale preferences, toggle formats between date and time, manage input restrictions, and dynamically alter UI and functional configurations without recreating the component. This enables flexible programmatic control over date/time picker options to suit various runtime requirements, user preferences, and application contexts.
</div>

#### Example - get options of the component

    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker();

    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
    var options = datetimepicker.options;
    </script>

## Methods

### close

Closes the calendar or the time drop-down list.


<div class="meta-api-description">
Programmatically hide or dismiss an open calendar or time selection popup in a date-time picker control, closing overlays, drop-downs, or popups to return user focus to the input field; enable automatic or manual closing after selection, validation, focus shifts, keyboard interactions, or custom event handling to control visibility and user experience within date and time input components.
</div>

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


<div class="meta-api-description">
clean up and safely remove all event listeners, data associations, and child widget instances linked to a date and time picker control to prevent memory leaks and resource retention before detaching or disposing of it from the web page, including unlinking Kendo UI subordinate components and releasing their resources without deleting the underlying HTML element itself, ensuring proper teardown and enabling reset or reinitialization scenarios for date/time selection widgets.
</div>

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


<div class="meta-api-description">
Toggle the interactive state of the date and time selection control by enabling or disabling user input and focusability programmatically through method calls that activate or deactivate keyboard and mouse interactions, allowing developers to control whether users can edit, select, or change date and time values by setting the control to enabled or disabled dynamically at runtime.
</div>

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


<div class="meta-api-description">
Control or toggle the input field to be non-editable while still submitting its selected value within forms, enabling you to set the date and time picker as read-only or locked to prevent user changes but include its data during form submission, differentiating from disabled states where input is blocked and excluded from form posts, useful for scenarios requiring display-only date and time values that must be sent with the form, configuring the picker to accept no direct input yet retain its value in data handling and submission workflows.
</div>

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


<div class="meta-api-description">
Configure or retrieve the upper limit for selectable date and time values, control the maximum allowed date/time to restrict user input beyond a certain cutoff, set or update the latest permissible date dynamically, enforce date/time boundaries by defining a maximum threshold, prevent selection of dates or times above a specified limit, adjust this limit at runtime or initialization to ensure valid ranges, combine with minimum constraints to create date/time intervals, manage allowed date ranges for scheduling, limit future date entries, and govern date/time picker selections with precise maximum value settings.
</div>

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


<div class="meta-api-description">
Set or retrieve the earliest selectable date and time limit for a date and time selector, controlling the minimum allowed input by specifying a exact date object or a compatible date string. Enable restricting user selection to dates and times on or after a specific threshold to enforce validation rules, filter available options, disable earlier dates and times, or define the lower bound of the selectable range. This function facilitates configuring, adjusting, or querying the starting point for date/time input constraints in interactive date-time controls.
</div>

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


<div class="meta-api-description">
Programmatically trigger or activate the calendar popup or time selection dropdown to display the date and time picker interface dynamically, enabling the UI to open and focus for user input after initialization, useful for automatically showing the date/time selector, controlling visibility through code, or invoking the picker on demand within applications requiring explicit display of date or time selection components.
</div>

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


<div class="meta-api-description">
Change, update, or reconfigure date and time picker settings dynamically during runtime by modifying options such as enabling or disabling features, adjusting display formats, switching between date or time modes, customizing behavior, or altering selectable ranges. Control and apply new configurations after initialization without restarting the whole application, causing the component to rebuild and reflect updated parameters immediately. Implement runtime setting adjustments, live option updates, feature toggling, and on-the-fly customization of the date/time input interface.
</div>

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


<div class="meta-api-description">
Control the visibility of date and time selection popups by programmatically opening, closing, or toggling the calendar or time dropdown, enabling dynamic display of picker interfaces in response to user input, keyboard shortcuts, or event-driven triggers, allowing seamless switching and interactive management of date/time picker overlays and dropdown components without manual user clicks or UI state changes.
</div>

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


<div class="meta-api-description">
Retrieve or set the selected date and time of a date-time input control programmatically, enabling dynamic reading, updating, or binding of the current date/time value. This method supports getting the active date and time without parameters or assigning a new date/time value to modify the displayed selection, useful for syncing, controlling, or automating date/time inputs in code. It covers use cases such as accessing the current timestamp, changing the chosen date/time on user interaction programmatically, resetting or presetting date/time entries, and integrating date/time values with other components or data models.
</div>

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


<div class="meta-api-description">
Detect and respond to updates whenever the date or time selection is modified, either by user input or programmatic changes, enabling real-time validation, synchronization with other interface components, or triggering data refreshes and custom event handling on value change events from date/time input controls.
</div>

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


<div class="meta-api-description">
Trigger actions when a calendar or time selection popup closes, enabling detection of when a date or time picker dropdown is dismissed or hidden, to run cleanup tasks, validate inputs, update UI state, set focus, synchronize related elements, or handle post-selection logic after closing date and time selection components, capture events signaling the closure of date or time pickers for custom handlers and interface updates.
</div>

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


<div class="meta-api-description">
Detect when a date and time selector or calendar popup becomes visible, triggering actions such as adjusting user interface layout, loading deferred or on-demand data, setting keyboard or screen reader focus, tracking user interactions for analytics, or executing custom code whenever the date/time picker control’s calendar panel or time dropdown is shown or opened. This event captures the moment the date selector or time dropdown is displayed, enabling handling of UI changes, lazy loading, focus management, analytics recording, or any behavior tied to the visibility of date and time selection interfaces.
</div>

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
