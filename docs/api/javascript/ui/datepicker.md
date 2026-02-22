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

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How do I enable adaptive rendering in Kendo UI DatePicker to make it responsive on different devices? Configure responsive date selection behavior with options to enable or disable adaptive rendering that automatically adjusts the calendar layout, interaction patterns, and UI responsiveness based on device type, screen size, or orientation. Control how calendar components adapt seamlessly for mobile, tablet, or desktop environments, switching between fixed or fluid layouts, touch-friendly or mouse-driven interfaces, and optimized presentation modes to enhance usability on varying platforms. This setting supports modes such as disabling responsiveness altogether or activating intelligent automatic detection to tailor the date picker appearance and functionality dynamically across different devices.
</div>

#### Example

    <div id="datepicker"></div>
    <script>
    $("#datepicker").kendoDatePicker({
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the title in a Kendo UI date picker on small screens? Set or customize the header title text displayed in a date picker’s mobile or adaptive view, allowing control over the label shown on small screens, enabling localization, custom captions, or personalized titles for responsive date selection interfaces, and adjusting the displayed string to match user language preferences or design requirements in adaptive layouts.
</div>

#### Example

    <div id="datepicker"></div>
    <script>
    $("#datepicker").kendoDatePicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Date"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in Kendo UI datepicker for mobile views? Set, customize, control, or configure alternative subtitle text specifically for mobile or responsive date picker views, enabling different captions, labels, or descriptive text that adapt to smaller screens or adaptive layouts, ensuring that the displayed subtitle fits various device contexts or adaptive UI modes during date selection interactions and mobile responsiveness scenarios.
</div>

#### Example

    <div id="datepicker"></div>
    <script>
    $("#datepicker").kendoDatePicker({
        adaptiveMode: "auto",
        adaptiveSubtitle: "Choose a date from the calendar"
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the calendar popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the calendar popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How do I control animation effects in Kendo UI for jQuery date picker? Control and customize the transition effects for calendar popups that open or close within date selection interfaces, including the ability to enable or disable smooth animations on date picker dialogs or dropdowns, managing whether the calendar panel appears with fade, slide, or no visual movement for instant display. Adjust animation settings to optimize user experience by toggling popup animation effects, setting animation off to remove opening and closing transitions so the calendar view appears immediately without delay, and fine-tune the visual behavior of date input controls related to animation performance and responsiveness when selecting dates or interacting with calendar widgets.
</div>

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


<div class="meta-api-description">
How to customize the close animation of a Kendo UI DatePicker widget? Set or customize the closing animation effect, speed, transition style, or easing behavior of a calendar popup or date selector when it hides or disappears. Control how the date picker or calendar widget animates on close, including fade out, slide up, bounce, or other exit animations. Adjust or configure the visual closing transition timing and animation curve for calendar dialogs, popups, or pickers to enhance UI responsiveness and user experience during date selection dismissal. Manage the animation parameters that define the closing motion and style of popup calendars or date selectors for smooth or custom effects on hide events.
</div>

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


<div class="meta-api-description">
How do I customize the close animation effects in a Kendo UI datepicker? Configure and customize the closing animation behavior of date selection widgets by specifying one or multiple animation types such as fade, zoom, or other effects combined in a space-delimited string format to control how the interface visually transitions when dismissed or closed, enabling developers to enhance user experience with smooth, tailored exit animations for calendar pickers, date choosers, or time selection controls.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        animation: {
            close: {
                effects: "fadeOut zoom:out"
            }
        }
    });
    </script>

### animation.close.duration `Number`

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How do I adjust the closing animation duration of the date picker in Kendo UI? Set or adjust the duration of the closing animation for a date selection popup, specifying how many milliseconds it takes for the calendar or date picker to smoothly hide or disappear when closing. This timing control helps customize the fade-out or slide-away effect speed, synchronize the closing transition with other interface animations or UX elements, optimize user experience pacing, enable subtle or rapid exit animations, and manage animation intervals on calendar widgets or date input components. Developers may seek to configure, fine-tune, or control the hide animation delay, duration, or timing of the date selector’s closing behavior for UI consistency and responsiveness.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        animation: {
            close: {
                duration: 1000
            }
        }
    });
    </script>

### animation.open `Object`

The animation played when the calendar popup is opened.


<div class="meta-api-description">
How do I customize the opening animation of a Kendo UI date picker? Control and customize the calendar popup opening animation for the date picker component, including setting animation types, effects, durations, easing functions, enabling or disabling the open transition, and configuring how the calendar appears visually when triggered. Adjust, set, or toggle the opening animation behavior and visual effects for date selection popups, ensuring smooth, user-friendly calendar entry transitions with various animation options and timing controls.
</div>

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


<div class="meta-api-description">
How can I customize the animation effects of the Kendo UI DatePicker calendar popup? Control and customize the appearance and behavior of the calendar popup by enabling, configuring, or combining various open animation effects such as fade, slide, or other transition styles when the calendar or date selection panel is triggered to open. Adjust, set, or select one or multiple visual entrance animations to enhance user experience during date picking, specifying effects spaced or concatenated to achieve smooth, dynamic opening motions for the calendar popup or date selector interface.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        animation: {
            open: {
                effects: "fadeIn zoom:in"
            }
        }
    });
    </script>

### animation.open.duration `Number`

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How can I adjust the speed of the date picker's opening animation in Kendo UI for jQuery? Control and configure the length, speed, or timing of the calendar or date selection widget's opening animation by specifying a duration value in milliseconds, adjusting how fast or slow the date picker panel appears or expands on screen, setting the open transition time, animation speed, or delay to customize user interface responsiveness and visual feedback during date selection interactions, and fine-tuning or enabling smooth entrance effects for better UX in date inputs or scheduling components.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        animation: {
            open: {
                duration: 400
            }
        }
    });
    </script>

### ARIATemplate `String`*(default: "Current focused ${valueType} is ${text}")*

 Specifies a template used to populate the value of the aria-label attribute of the currently focused cell of the calendar. The parameters available for the template are:

* `current` - The current focused date.
* `valueType` - The focused item value type - month, year and etc.
* `text` - A text representing the focused value.


<div class="meta-api-description">
How do I customize the accessible screen-reader label for a date picker's focused calendar dates using the ARIATemplate property? Customize and control the accessible screen-reader label for the currently focused date cell in a calendar or date selection component by defining a dynamic template that sets or overrides the aria-label attribute. This enables configuring, formatting, or binding custom descriptive text for focused calendar dates, months, or years to enhance accessibility and convey contextual information for users with assistive technologies. Use template-driven approaches to provide meaningful voiceover content, screen reader announcements, or spoken feedback by supplying parameters such as the focused date, value type (day, month, year), and associated display text, ensuring improved navigation and comprehension of the date picker interface.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        ARIATemplate: ({ current }) => `Date: ${kendo.toString(current, 'G')}`
    });
    </script>

### autoAdjust `Boolean` *(default: true)*

If this property is enabled and you have configured `min` and/or `max` values, and the user enters a value that falls out of that range, the value will automatically be set to either the minimum or maximum allowed value. This property has effect only when the `dateInput` of the component is enabled.


<div class="meta-api-description">
How do I configure the Kendo UI DatePicker to automatically adjust out-of-range dates? Control automatic correction of user-selected or typed dates to keep values within specified minimum and maximum boundaries, enabling seamless enforcement of allowed date ranges by adjusting out-of-range inputs to the closest valid limit when date input mode is active. Configure date validation behavior to automatically clamp dates to bounds during manual entry, facilitating user input correction, preventing out-of-bounds date selection, and maintaining consistent date constraints without manual intervention. Enable or disable automatic date normalization within predefined limits to handle cases where users pick or type dates outside allowed ranges, ensuring reliable date input management and boundary enforcement in date picker components.
</div>

#### Example - prevent automatic value adjustments

    <h3>Try to change the year to an earlier one and then focus out the input.</h3>
    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        min: new Date(),
        value: new Date(),
        dateInput: true,
        autoAdjust: false
    });
    </script>

### autoCorrectParts `Boolean`*(default: true)*

Sets a value that indicates whether to automatically correct the segment when out of range. In order to work, `dateInput` prop should be set to `true`.


<div class="meta-api-description">
How can I configure Kendo UI datepicker to automatically correct invalid date components? Enable automatic adjustment and correction of invalid or out-of-range date components such as day, month, or year when entering dates, supporting flexible input handling by detecting and fixing incorrect date segments on the fly. This feature allows configuring the date input control to intelligently validate and auto-correct date parts that exceed normal limits, ensuring the final date value stays within valid ranges by recalibrating individual components during user entry or programmatic input. Useful for scenarios requiring robust date input validation, dynamic error fixing, flexible date editing, and seamless date normalization without manual intervention or additional validation logic.
</div>

#### Example - sets the autoCorrectParts

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true,
        autoCorrectParts: true
    });
    </script>

### autoFill `Boolean`*(default: false)*

 When enabled, the DatePicker will autofill the rest of the date to the current date when the component loses focus. For example, entering only the date, month or year portion of the date and blurring the component, the missing sections will be automatically completed.
 Requires a [DateInput](/api/javascript/ui/dateinput) for editing the value.


<div class="meta-api-description">
How can I configure my Kendo UI datepicker to automatically fill in missing parts of a partially entered date? Automatically complete or fill in missing parts of a partially entered date such as day, month, or year based on the current date when a date input field loses focus, enabling quick entry by auto-populating incomplete date values, supporting scenarios where users enter only partial date elements and want the system to set defaults or current date segments, helpful for configuring autofill behavior in date selection components or form inputs to streamline date entry and reduce manual typing errors.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true,
        autoFill: true
    });
    </script>


### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.


<div class="meta-api-description">
How do I customize the appearance of a Kendo UI datepicker? Control and customize the visual style, theme, or UI rendering mode of a date selection interface by setting the appearance to classic, legacy, or modern designs, enabling toggling between traditional and updated date picker layouts, adjusting look and feel for enhanced or standard visuals, configuring initialization visuals, switching rendering engines, selecting between old versus new component themes, applying different display modes for dates, and controlling whether the date selector uses a standard or refreshed user interface.
</div>

#### Example - specify modern component type

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
            componentType: "modern"
        });
    </script>

### culture `String`*(default: "en-US")*

 Specifies the culture info used by the widget.


<div class="meta-api-description">
How do I change the date format for a Kendo UI DatePicker to match US English culture settings? Set or customize the date localization, regional formats, language, and cultural settings for date input controls by specifying culture codes like language-country identifiers, controlling how dates, months, weekdays, and week start days appear and are interpreted, enabling parsing and display to match local conventions for calendars, date formats, language-specific month and day names, and first-day-of-week preferences across different locales.
</div>

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


<div class="meta-api-description">
How to enable manual date input in Kendo UI DatePicker control? Control inline date editing and input methods by configuring whether users can type or mask dates directly within the date selection interface, enabling or disabling an integrated editable field for date entry, setting up the picker to accept manual date input or switch to the default popup calendar style, customizing how dates are entered via keyboard or masked input formats, toggling between interactive text input and visual date navigation options, and managing whether the date selection supports freeform typing, input validation, or standard picker controls.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true
    });
    </script>

### dates `Array`

Specifies a list of dates, which will be passed to the [month content](/api/javascript/ui/datepicker/configuration/month#monthcontent).


<div class="meta-api-description">
How can I highlight specific dates in a Kendo UI date picker using the "dates" property? Specify and customize exact calendar days by providing a list of targeted dates to highlight, mark, or modify how individual days appear within a monthly calendar view or date selection interface. Enable setting, filtering, or controlling visible days by passing selected date arrays or collections for focused rendering, calendar day styling, or interactive date customization in date pickers, scheduling tools, or calendar components. This lets developers dynamically define which days to display special content, apply unique formatting, or control day-specific behavior in monthly date selection UIs.
</div>

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


<div class="meta-api-description">
How to limit user navigation in Kendo UI DatePicker? Configure the calendar view level and user navigation range within a date selection component by setting how far users can drill down or up through time units such as days, months, years, decades, or centuries, specifying starting views and maximum allowed scope for browsing dates, enabling control over the depth of the date hierarchy displayed, setting limits on the calendar navigation from granular daily views to broader century overviews, adjusting the interactive timeframe levels to restrict or expand user access to specific date ranges or periods, defining the visible temporal scale for date picking interfaces with options for month, year, decade, or century display modes, managing hierarchical navigation steps in time-based UI elements for selecting dates, and controlling zoom levels in calendar components to improve date selection precision or overview breadth.
</div>

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


<div class="meta-api-description">
How do I disable specific dates from being selected in a Kendo UI DatePicker control? Control or restrict selectable calendar dates by disabling specific days, such as weekends, holidays, past or future dates, custom excluded dates, or dynamically filtered dates using arrays or predicate functions. Enable setting unavailable dates to prevent user selection for scheduling, booking, or form input scenarios where certain dates must be blocked. Configure disabled days flexibly through static lists or dynamic date validation logic to tailor the date picking experience by excluding undesired or invalid dates.
</div>

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


<div class="meta-api-description">
How to customize the footer area in Kendo UI for jQuery DatePicker widget? Control or configure the calendar footer area in date selection interfaces by enabling custom content, templates, or completely hiding the footer section. Customize the bottom portion of a date picking widget with personalized markup, links, buttons, or actions, or disable the footer display entirely to simplify or tailor the calendar interface. Adjust footer visibility and content in date pickers using templates or flags to either render custom elements or suppress the footer fully.
</div>

#### Example - specify footer template as a string literal

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        footer: (data) => `Today - ${kendo.htmlEncode(kendo.toString(data, 'd'))}`
    });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to configure the fill mode for Kendo UI DatePicker controls? Control the styling and visual design of date selector components by configuring how background colors and fills are applied to inputs and buttons, enabling options such as no fill, solid color blocks, flat color schemes without shadows, or outlined borders to customize the appearance and theme of date pickers in user interfaces. Adjust and set fill styles to modify the component’s look for states like default, hover, and active, supporting flexible theming, UI customization, and appearance control for date input controls in web or app development.
</div>

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


<div class="meta-api-description">
How do I customize the date format in Kendo UI DatePicker? Configure how dates display and are interpreted in date picker inputs by specifying custom date format patterns, controlling the input and output date string structure, customizing parsing and formatting behavior, setting preferred date layouts for user-friendly display, handling various date representations and locale-specific formats, enabling flexible date string validation and input recognition, and adjusting the format to match application or regional standards for presenting and reading dates in forms or user interfaces.
</div>

#### Example - specify a custom date format

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        format: "yyyy/MM/dd"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I customize the on-screen keyboard for date input in Kendo UI DatePicker? Configure the on-screen keyboard type that appears when interacting with a date input field by specifying the input mode to suggest numeric, decimal, telephone keypad, email input, search keyboard, or other virtual keyboards on mobile and touch devices, enabling control over user input format, improving data entry accuracy, and tailoring keyboard layouts for date, time, or number inputs within forms or interactive components.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        inputMode: "numeric"
    });
    </script>


### label `String|Function|Object` *(default: null)*

Adds a label before the datepicker. If the datepicker has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I customize the label in Kendo UI Datepicker? Set or customize the text or content displayed as a label or descriptive identifier for a date selection input, enabling users to configure, provide, or modify the visible prompt, tag, or title associated with the calendar picker component; this can include plain text strings or dynamic HTML content generated through functions, ensuring accessible and clear labeling whether by manually assigning or automatically generating unique identifiers to link the label with the date input element for user interface clarity, form organization, or accessibility compliance.
</div>

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


<div class="meta-api-description">
How do I customize the label content in a Kendo UI datepicker widget? Customize the label text or HTML markup for a date picker component, allowing you to set or control the inner content including plain text, styled elements, hyperlinks, or nested tags to create rich, interactive label displays. This enables configuring label appearance, adding custom HTML formatting, embedding links inside the label, or defining complex structured content for date selection interfaces, suitable for enhancing UI with tailored label presentations.
</div>

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


<div class="meta-api-description">
How do I enable floating labels for my Kendo UI DatePicker component? Control the floating label behavior for date input fields by enabling or disabling a floating-label style wrapper around the date picker component; configure a floating or inline label that moves above the input on focus or value change, enhancing UI clarity for date selection forms. This includes setting floating label mode, managing label animations, adjusting floating label positioning or activation on date picker events, and handling edge cases where programmatic value changes do not trigger focus-related updates, requiring manual refresh or re-render of the floating label to maintain correct label placement. Ideal for customizing date input UX with floating placeholders, labels that dynamically float above the calendar input, and ensuring label state stays synchronized with date selection and validation states in web forms and applications.
</div>

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


<div class="meta-api-description">
How do I prevent users from selecting dates after today in Kendo UI for jQuery's datepicker? Control the latest date users can choose or navigate to within a date selection interface by setting an upper boundary for selectable dates. This configuration lets you restrict the calendar view to a maximum date, preventing selection beyond a certain point, whether by providing a Date object or a standard date string. Common needs include limiting date input to today or a specific deadline, enforcing date ranges, and disabling future dates for forms or scheduling components. Adjusting the maximum selectable date helps in scenarios like booking systems, event planning, or any application requiring date validation and constrained date navigation.
</div>

#### Example - specify the maximum date

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        max: new Date() // sets max date to today's date
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How do I customize the date picker messages in Kendo UI for jQuery? Configure and customize the text labels, prompts, notifications, and user interface strings displayed within the date selection control to support multiple languages and regional settings, enabling localization and internationalization of date picker components, adjusting displayed messages, tooltips, placeholder texts, error alerts, and button labels to match different locales or custom wording requirements.
</div>

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


<div class="meta-api-description">
How do I customize the week column header in Kendo UI for jQuery DatePicker? Control and customize the text label for the calendar's week number column header to adapt to different languages, formats, or accessibility requirements, enabling developers to set, localize, or adjust the heading that appears above the week number column in date selection components, improve screen reader compatibility, and support internationalization and user interface customization for better visual clarity and compliance with accessibility guidelines.
</div>

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

### messages.dateInput `Object`

The messages that DateInput uses.  Use it to customize or localize the placeholders of each date/time part.


<div class="meta-api-description">
How do I customize the date input prompt in Kendo UI Datepicker? Customize and localize date input prompts, placeholders, and messages for individual date and time components within date selection interfaces, enabling control over how date fields display hints, format guides, and user input cues across different locales and formats. Adjust or set text prompts, placeholders, and labels for year, month, day, hour, minute, and second inputs, supporting internationalization, accessibility, and tailored user experiences in date and time pickers.
</div>

#### Example - customize column menu messages

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true,
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
How to customize year placeholder text in Kendo UI DatePicker control? Set or customize the placeholder text for the year field in date input interfaces, control or configure the display prompt guiding users on how to enter the year portion when selecting dates, enable setting hints or example text specifically for the year segment within date pickers, adjust or specify the visible placeholder to improve user understanding or localization of the year input area in date selection components, and manage the prompt that appears in the year input box to facilitate correct year entry in forms and date-related user interfaces.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                year: "Année"
            }
        }
    });
    </script>

### messages.dateInput.month `String` *(default: "month")*

The placeholder for the months part.


<div class="meta-api-description">
How do I change the month placeholder text in a Kendo UI datepicker to display localized month names? Set or customize the month placeholder text in a date input field to display localized month names, labels, or prompts for date selection controls; configure language-specific month indicators, adjust or translate month placeholders for calendars, enable multilingual month display within date pickers, and modify the month input field’s hint or default text to match regional settings or UI localization requirements.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                month: "Mois"
            }
        }
    });
    </script>

### messages.dateInput.day `String` *(default: "day")*

The placeholder for the day of the month part.


<div class="meta-api-description">
How to set default day input placeholder in localized date picker? Set or customize the localized placeholder text for the day portion of a date input field to guide users when entering day values, enabling control over language-specific prompts, interface localization, date format customization, input hints for day entry, and improved user experience in date selection components.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                day: "Jour"
            }
        }
    });
    </script>

### messages.dateInput.weekday `String` *(default: "day of the week")*

The placeholder for the day of the week part.


<div class="meta-api-description">
How to customize the placeholder text for weekday in Kendo UI DatePicker? Configure or customize the placeholder text shown for the weekday part of a date input field, control or set the label that indicates the day of the week in a date selection interface, update or change the weekday segment prompt, adjust the placeholder for user input representing weekdays, localize or personalize the weekday display text, define the text guiding users to enter or select the weekday portion of a date, enable setting custom weekday hints in date pickers, modify or configure weekday input placeholders to match language or formatting preferences, tailor the hint for day-of-week inputs in date fields, and control how weekday placeholders appear in date entry components.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                weekday: "Jour de la semaine"
            }
        }
    });
    </script>

### messages.dateInput.hour `String` *(default: "hours")*

The placeholder for the hours part.


<div class="meta-api-description">
How do I change the hour placeholder in a Kendo UI date picker? Set, customize, or configure the placeholder text specifically for the hour portion of a date and time input field, enabling developers to control how the hour segment is labeled or hinted in date-time pickers, time selectors, or scheduling components, including adjusting prompts for hours in user interfaces, modifying default hour input placeholders, setting localized or formatted hour hints, and ensuring clear user guidance when entering or editing hours within date inputs or date picker widgets.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                hour: "Heures"
            }
        }
    });
    </script>

### messages.dateInput.minute `String` *(default: "minutes")*

The placeholder for the minutes part.


<div class="meta-api-description">
How to customize minute input placeholder in Kendo UI DatePicker? Customize or set the text placeholder for minute input fields in date and time selectors, localize or change the default minute prompt, control how minute values are hinted or displayed in date input components, adjust or configure minute placeholders for different languages or user preferences, customize minute input hints in calendar or time picker controls, enable localization and personalization of minute entry prompts in date pickers, modify minute placeholder text to match regional formats or user interface requirements, set or translate minute input placeholders for better clarity in date-time selection widgets, tailor minute field hints in date input components for internationalization and user-friendly interfaces, control and customize minute placeholders within date selection inputs to ensure precise and localized time entry guidance.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
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
How to customize the placeholder for seconds input in Kendo UI date picker? Configure or customize the placeholder text for the seconds input field within a date and time selection component, enabling control over how the seconds segment is prompted or displayed in date picker inputs, date-time forms, or time entry interfaces. This setting helps adapt the user prompt or placeholder specifically for seconds, allowing developers to set, change, localize, or define the message shown in the seconds part of date input controls, enhancing clarity for users entering hours, minutes, and seconds in various date/time input scenarios.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                second: "Secondes"
            }
        }
    });
    </script>

### messages.dateInput.dayperiod `String` *(default: "AM/PM")*

The placeholder for the AM/PM part.


<div class="meta-api-description">
How to customize AM/PM indicator in Kendo UI DatePicker widget? Customize or localize the AM/PM indicator, day period label, or time format placeholders in date and time pickers, enabling users to set or display morning and evening time designations according to different languages, regions, or custom naming conventions; supports adjusting or configuring the meridiem text in time inputs for internationalization, localization, or personalized time displays in user interfaces where precise day period labeling is required.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        messages: {
            dateInput: {
                dayperiod: "Période du jour"
            }
        }
    });
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.


<div class="meta-api-description">
How do I restrict users from selecting dates before a certain date in a Kendo UI DatePicker component? Set the earliest selectable date to limit user input or restrict past dates, control calendar navigation by defining a minimum date threshold that disables all prior dates visually and functionally, configure date range boundaries for forms or scheduling interfaces, enforce start dates to prevent selection of earlier days, establish date constraints to avoid invalid or out-of-range choices, and set the initial allowed day from which users can pick dates in UI date selection components.
</div>

#### Example - specify the minimum date

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        min: new Date() // sets min date to today's date
    });
    </script>

### month `Object`

Templates for the cells rendered in the calendar "month" view.


<div class="meta-api-description">
How do I customize the appearance of individual days in a Kendo UI DatePicker's month view? Control and customize the rendering of individual day cells within a calendar's month view by configuring templates or functions that define how each date appears, enabling developers to set, style, and format daily cells dynamically, inject custom HTML content, manage calendar day layout, and tailor the visual representation of month grid cells according to specific requirements or themes during initialization or setup time.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        month: {
            content: '<div class="custom">#=data.value#</div>',
            empty: '<div class="empty">-</div>'
        }
    });
    </script>

### month.content `String`

The template to be used for rendering the cells in "month" view, which are between the min/max range.


<div class="meta-api-description">
How can I customize the content of individual day cells in a Kendo UI datepicker's monthly calendar view? Customize and control the display and content of individual day cells within a monthly calendar view, enabling tailored rendering, formatting, or templating of dates between minimum and maximum boundaries. Configure how each calendar cell appears, including custom HTML, text, or components for days, modify or override default month view presentations, dynamically set content based on date context, and adapt monthly date layouts for personalized styling or data-driven displays within calendar interfaces.
</div>

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


<div class="meta-api-description">
How to customize week number display in Kendo UI DatePicker calendar month view? Customize or override the default week number display in a calendar month view by defining a template for week column cells, enabling control over how weekly data is rendered based on the starting date of each week and its calculated number; configure, format, or transform week labels by leveraging the initial date of the week and the assigned week index to create tailored or dynamic content for weekly calendar cells in scheduling interfaces or date pickers.
</div>

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


<div class="meta-api-description">
How to customize appearance of out-of-range months in a Kendo UI DatePicker? Control the appearance and content of month cells in a calendar or date selection UI that fall outside the allowed date range by customizing the rendering, setting how disabled, empty, or out-of-bounds months display with tailored HTML, templates, or markup to indicate unavailable or inactive month options within the date picker's month view. This enables configuration of visual feedback for months that exceed minimum or maximum boundaries, allowing developers to define empty placeholders, disable interaction, or provide alternative styling and content for months not selectable in the date selection interface.
</div>

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


<div class="meta-api-description">
How to customize the calendar popup in Kendo UI DatePicker? Control and customize the overlay behavior, appearance, and positioning of the calendar dropdown or popup in date selection components, enabling configuration of placement, animation, visibility triggers, styling, and interaction settings for date picker overlays; adjust settings for how the calendar popup opens, closes, or responds to user actions by passing initialization options typical for popup or overlay components, allowing customization of modal behavior, transitions, event handling, and display parameters to fit various UI requirements for date selection interfaces.
</div>

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


<div class="meta-api-description">
How can I control where the calendar popup appears in my Kendo UI DatePicker widget? Control where the calendar popup appears by specifying a custom container element or selector to append the date selector overlay, enabling placement inside a parent node, modal, or specific section of the page; configure and set the popup root dynamically to manage layering, avoid clipping or overflow issues, anchor the date dropdown inside particular DOM nodes, or change the default body attachment for better styling and positioning control.
</div>

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


<div class="meta-api-description">
How do I configure the popup positioning for my date picker control in Kendo UI? Adjust and configure the popup positioning for date selection interfaces by setting the vertical and horizontal anchor points to control where the popup displays relative to its trigger element, enabling placement options such as top, bottom, center vertically and left, center, right horizontally. This positioning setup helps align the popup’s corner or center precisely with the anchor by specifying combinations like "top left," "bottom center," or "center right," allowing developers to customize popup origin points for better UI alignment, overlay placement, anchor alignment, and precise coordinate-based control when displaying calendar popups or date pickers near input fields or buttons.
</div>

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


<div class="meta-api-description">
How do I adjust the position of the Kendo UI date picker popup? Adjust, configure, or set the alignment and positioning of a popup calendar or date selection panel relative to its anchor element by specifying vertical and horizontal placement options such as top, bottom, center, left, and right; control the exact attachment point where the popup originates on the trigger or anchor, enable positioning adjustments like bottom right, center center, top left, and other combinations to align overlays, dropdowns, or popups intuitively within user interfaces, modulate popup placement for better visibility or user experience, and control how the date picker’s overlay aligns dynamically with the input field or button that triggers it.
</div>

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


<div class="meta-api-description">
How to enable week numbering in Kendo UI datepicker widget? Enable displaying ISO or locale-specific week numbers alongside calendar dates in a date selection interface, customize how week indices appear by adjusting or templating the labels showing the week of the year, show or hide week numbering as part of date picker controls to help users identify calendar weeks, configure week count visibility on date grids for scheduling, planning, or reporting scenarios, control the display of sequential week numbers to facilitate week-based data entry or analysis, toggle week numbering for clearer timeline navigation and date context within interactive calendar components.
</div>

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


<div class="meta-api-description">
How do I configure custom date parsing in Kendo UI DatePicker to handle different user input formats? Configure custom date parsing by specifying multiple date format strings to recognize user input or programmatically set values, controlling how flexible or strict date entries are interpreted beyond the default format; adjust the sequence of formats to prioritize stricter patterns first and enable parsing of diverse date styles, user-typed strings, or different regional representations while ensuring consistent and predictable date value handling regardless of input variation.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        format: "yyyy/MM/dd",
        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats
    });
    </script>

### rounded `String`*(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the corner radius of Kendo UI Datepicker inputs? Adjust or configure the corner radius, border roundness, and visual curvature of date selection inputs by setting or controlling the radius size, enabling smooth, sharp, or fully rounded edges on calendar pickers and date input fields; customize the border styling to be none, minimal, moderate, pronounced, or fully circular, allowing flexible control over the shape and style of date widget corners for UI design and user interface aesthetics during initialization or dynamic styling.
</div>

#### Example - sets the rounded value

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        rounded: "large"
    });
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI DatePicker control in my jQuery application? Adjust the overall dimensions, spacing, and scaling of the date picker component by setting size options like small, medium, large, or none to control its visual footprint, compactness, and layout responsiveness; configure the control's width, height, padding, and element scaling to fit different UI densities, screen sizes, or design preferences, enabling developers to customize the date selector’s appearance for mobile, desktop, or embedded contexts while managing touch target sizes and alignment within forms or interfaces.
</div>

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


<div class="meta-api-description">
How to configure the initial calendar view in Kendo UI DatePicker? Configure the initial calendar view or default zoom level when opening a date selector, determining whether it starts by displaying individual days within a month, the months in a year, the years of a decade, or the decades in a century to control the first visible calendar granularity without limiting selectable dates; adjust, set, or enable the initial navigation level to customize how users first interact with the date picker interface, whether to begin with a detailed day view, broader monthly overview, a year summary, or a long-term decade perspective.
</div>

#### Example - specify the initial view, which calendar renders

    <input id="datepicker" />
    <script>
        $("#datepicker").kendoDatePicker({
            start: "year"
        });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.


<div class="meta-api-description">
How do I set the default date in a Kendo UI DatePicker? Set, get, configure, or bind the selected date in a date picker interface to initialize, update, or retrieve the current chosen date value; control the displayed date programmatically, respond to user selections, preset default dates, or synchronize the date input with data models or state management, enabling dynamic date changes, readouts, and integration with form controls or UI components requiring date selection and manipulation.
</div>

#### Example

    <input id="datepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        value: new Date(2011, 0, 1)
    });
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget. The options object holds all available [DatePicker configuration fields](/api/javascript/ui/datepicker#configuration).


<div class="meta-api-description">
How do I customize the date format in a Kendo UI for jQuery DatePicker widget? Configure, access, or modify the current settings and configurations of the date picker component at runtime, including all adjustable parameters and options for customizing behavior, appearance, format, localization, and interaction modes. Retrieve or update the component’s active setup, control date selection rules, enable or disable features, and inspect the full range of date picker properties dynamically after initialization to tailor the user experience or functionality. Use various keywords like configure, set, update, inspect, read, modify, customize, and options for managing date picker settings in different programming contexts or usage scenarios.
</div>

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


<div class="meta-api-description">
How to programmatically close Kendo UI date picker calendar popup? programmatically hide or dismiss the calendar popup in a date picker component, close the calendar UI after a date selection or validation step, control opening and closing behavior through code, trigger calendar closure from scripts or event handlers, implement custom logic to close or collapse the calendar view automatically, manage calendar visibility state during interactions, disable or retract the date picker popup on demand, automate closing the calendar to streamline user experience, control popup dismissal dynamically within application flows, and ensure the date picker calendar can be closed from programming code when needed.
</div>

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


<div class="meta-api-description">
How do I properly destroy a Kendo UI datepicker widget? Clean up and fully dispose of a date picker widget by detaching event listeners, removing data attributes, releasing internal references to prevent memory leaks, and performing all necessary teardown and cleanup operations without removing the element from the DOM structure; this process also cascades to destroy any nested or child widgets, ensuring complete resource freeing and safe widget removal or replacement during dynamic UI updates, component lifecycle management, or memory optimization tasks.
</div>

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


<div class="meta-api-description">
How can I dynamically disable user input on my Kendo UI datepicker? Control or toggle the interactivity and user input ability of a date selection component dynamically during runtime by enabling or disabling user actions such as clicking, typing, focusing, or opening the calendar interface, allowing developers to programmatically activate or deactivate the component’s responsiveness to keyboard and mouse events, restrict or allow date input, and modify interaction behavior based on application state or conditional logic after initialization.
</div>

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


<div class="meta-api-description">
How do I disable user input in a Kendo UI datepicker while still allowing it to submit its value? Toggle or set the date picker field to readonly mode to disable user input while preserving the selected date for form submission, controlling whether typing or date selection is allowed but ensuring the value remains included in form data; differentiate from disabling the field, which prevents input and excludes the value from form posts, enabling developers to manage input interactivity, form inclusion, and user editing restrictions dynamically through method calls or state changes.
</div>

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


<div class="meta-api-description">
How do I limit the maximum date users can select in a Kendo UI DatePicker? Set, configure, update, or retrieve the highest date limit users can choose within a date selection interface, controlling the maximum allowed date for validation, user input restrictions, calendar display boundaries, and programmatic queries on the latest permissible date value to enforce constraints or dynamically adjust selectable time ranges.
</div>

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


<div class="meta-api-description">
How do I set the minimum date in a Kendo UI Datepicker? Control and configure the earliest selectable date in a date picker component by retrieving or setting the minimum allowable date to restrict user input, block dates before a specified threshold, ensure input validation against a lower boundary, programmatically update or read the minimum date limit, enforce date constraints, disable past dates, set a starting date for selection, and dynamically adjust the earliest permissible date range for user interactions with date inputs or calendar widgets.
</div>

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


<div class="meta-api-description">
How can I programmatically open the Kendo UI date picker calendar? Trigger or invoke the calendar popup programmatically to display the date selection panel on demand, enabling dynamic control over when the calendar widget appears for users to pick dates. This method lets you open, show, or activate the date picker interface in response to events, user interactions, button clicks, or custom logic, allowing precise timing to display the calendar popup, control focus, and handle date input workflows. Whether integrating with forms, modals, or user-driven actions, this function enables automated or manual expansion of the date picker calendar UI without requiring direct user clicks on the input field.
</div>

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

Changes the initial DatePicker configuration by updating the options object. The options object holds all available [DatePicker configuration fields](/api/javascript/ui/datepicker#configuration).

**Value Behavior**

When `setOptions` is called, the value resolution follows a priority order:

- **Explicit value in setOptions**: If the `options` parameter contains a `value` property, this value takes precedence and updates the component's current value.
- **Initial value exists**: If the `options` parameter does not contain a `value` property, and the component was initialized with a `value`, the component reverts to the initial value, discarding any user-selected or programmatically set value.
- **No initial value**: If the `options` parameter does not contain a `value` property, and the component was initialized without a `value`, the component preserves the current value.


<div class="meta-api-description">
How can I dynamically change the date format for a Kendo UI DatePicker after it's been initialized? Configure, update, or override calendar and date selection settings dynamically by changing options such as date formats, range limits, disabled dates, locale, time zones, display styles, and behavior controls after initialization. Adjust or merge new configuration values for a date picker component on the fly, enabling flexible control over appearance, selection rules, validation constraints, and localization without recreating the widget. This method supports modifying the full set of configuration fields including formatting, allowed dates, UI options, and interaction parameters, allowing developers to customize and fine-tune the date picking experience in response to user actions or application state changes.
</div>

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


<div class="meta-api-description">
How do I get the currently selected date in a Kendo UI DatePicker? Retrieve or update the current selected date programmatically by accessing or modifying the date value of a date selection component, enabling you to get the chosen date, assign a new date, synchronize date input with application data, fetch or set the calendar’s selected day, control date picker values dynamically, read user inputted dates, or programmatically adjust the date shown in a date selector control through direct value manipulation.
</div>

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


<div class="meta-api-description">
How do I detect when a user changes the date in a Kendo UI DatePicker? Capture or respond to user interactions that alter the selected date value, triggering updates whenever the date input changes or a new date is picked. Detect modifications to calendar selections, listen for date changes to synchronize models, enable or disable related controls based on user input, validate date entries dynamically, or propagate updates across connected components whenever the date is adjusted. Handle events fired upon user date selection or modification to implement reactive behaviors, state updates, and cross-component synchronization tied to date input.
</div>

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


<div class="meta-api-description">
How to handle datepicker close event in Kendo UI for jQuery? Detect when the calendar popup or date selection overlay closes to trigger follow-up actions such as updating form fields, validating input, adjusting focus, synchronizing UI elements, running custom callbacks, or performing cleanup after users finalize date picking. Capture the moment the date selection interface is dismissed to implement post-interaction logic, manage state changes, ensure data consistency, or respond to user completion of date input in forms or components.
</div>

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


<div class="meta-api-description">
How to detect when Kendo UI datepicker calendar popup becomes visible? Detect when the calendar popup becomes visible, trigger actions or callbacks when the date selection panel opens, respond to the opening event by setting input focus, updating UI layout, loading dynamic content, tracking user activity within the date selector, enabling behaviors for when the calendar is shown, handling open or show events to run custom code as the date picker becomes active or displays its interface, monitor calendar visibility changes, and integrate logic that depends on the date dialog appearing.
</div>

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
