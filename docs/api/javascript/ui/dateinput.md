---
title: DateInput
page_title: Configuration, methods and events of Kendo UI DateInput
description: Easy to follow steps guide how to quickly configure DateInput UI widget, easily enable/disable it using methods and how to change events.
res_type: api
component: dateinput
---

# kendo.ui.DateInput

Represents the Kendo UI DateInput widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoAdjust `Boolean` *(default: true)*

If this property is enabled and you have configured `min` and/or `max` values, and the user enters a value that falls out of that range, the value will automatically be set to either the minimum or maximum allowed value.


<div class="meta-api-description">
How do I prevent users from entering dates outside my specified minimum and maximum limits in a Kendo UI date input? Control automatic correction or adjustment of user-entered dates to fit within specified minimum and maximum date limits, enabling automatic clamping or bounding of date inputs to prevent out-of-range selections, configuring date validation that adjusts or restricts inputs by snapping invalid dates to the closest allowable boundary, enforcing date range constraints by auto-correcting dates entered outside set minimum and maximum thresholds, and setting behavior that automatically modifies or limits date input values to stay within defined allowable periods.
</div>

#### Example - prevent automatic value adjustments

    <h3>Try to change the year to an earlier one and then focus out the input.</h3>
    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        min: new Date(),
        value: new Date(),
        autoAdjust: false
    });
    </script>

### autoCorrectParts `Boolean`*(default: true)*

Sets a value that indicates whether to automatically correct the segment when out of range


<div class="meta-api-description">
How to configure auto-correction for individual date parts in Kendo UI DateInput? Configure automatic correction and normalization of individual date segments such as day, month, and year when entering or editing dates to ensure invalid or out-of-range values are adjusted dynamically. Enable or set automatic validation and adjustment behaviors that correct partial or mistyped date components on the fly during user input or navigation between date fields. Control how date parts auto-correct by normalizing entries, fixing invalid inputs, and maintaining consistent date formats without manual intervention. Manage automatic fixes for incorrect date segments as users type or move across date portions, enhancing data accuracy and input reliability in date entry scenarios.
</div>

#### Example - sets the autoCorrectParts

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        autoCorrectParts: false
    });
    </script>

### autoSwitchKeys  `Array`

A string array representing keys that when pressed will force a move to the next segment. By default the culture specific symbols that match `/` and `:` are used.


<div class="meta-api-description">
How to customize keyboard navigation in Kendo UI DateInput control? Control and customize keyboard navigation between date and time segments by specifying which keys automatically move focus to the next input part, enabling seamless segment switching while entering dates and times. This setting lets you define or override default culture-specific separators like slashes and colons, tailor key-driven segment advancement, set or change navigation keys during initialization, configure interactive keyboard behaviors for date/time input, and enhance or restrict how segment focus changes with specific keystrokes. It supports scenarios involving custom key mapping for segment transitions, improving data entry flow by enabling or disabling automatic segment jumps based on the keys pressed, and allows dynamic control over keyboard-driven cursor movement within date or time input fields.
</div>

#### Example - sets the autoSwitchKeys

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        autoSwitchKeys: ["-", "/", ":"]
    });
    </script>

### autoSwitchParts `Boolean`*(default: false)*

A value indicating whether to automatically move to the next segment after a valid value is provided for the current


<div class="meta-api-description">
How to enable automatic focus switching between day/month/year in Kendo UI DateInput? Configure automatic cursor movement between date sections when entering day, month, or year values, enabling smooth transition and rapid input without manual navigation through date fields; control automatic focus shift, enable seamless segment advancement in date inputs, set caret to jump to the next part after valid entry, streamline date entry workflows by auto-switching input segments, optimize user experience for fast date component filling with automatic part switching.
</div>

#### Example - sets the autoSwitchParts

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        autoSwitchParts: true
    });
    </script>

### enableMouseWheel `Boolean`*(default: true)*

A value indicating whether the mouse scroll can be used to increase/decrease the segments values


<div class="meta-api-description">
How to prevent date picker from changing values on mouse wheel scroll? Control the ability to adjust date and time fields by scrolling the mouse wheel over inputs, enabling or disabling mouse wheel interactions to increase or decrease segments such as day, month, year, hour, or minute; configure how mouse scroll events manipulate date/time values in input components, allowing users to quickly increment or decrement individual parts by wheel movement or prevent unintended changes from scrolling gestures.
</div>

#### Example - sets the autoSwitchParts

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        enableMouseWheel: false
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"


<div class="meta-api-description">
How to configure the visual style of a Kendo UI DateInput field in jQuery? Adjust the visual style of a date input field by configuring how color accents, backgrounds, and borders appear, enabling options to set it as fully filled, outlined, flat-colored, or without any fill styling; control the component’s appearance to customize its highlight mode, color emphasis, and visual emphasis for different UI states, including solid fills, flat designs, outlined edges, or no fill effect at all to match design themes or user interaction preferences.
</div>

#### Example - sets the fillMode

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        fillMode: "flat"
    });
    </script>

### format `String`*(default: "M/d/yyyy")*

 Specifies the format, which is used to format the value of the DateInput displayed in the input. The format also will be used to parse the input.


<div class="meta-api-description">
How do I customize the date format in Kendo UI DateInput control? Control how dates are displayed and interpreted by specifying custom date patterns, date string formats, or input masks to define the exact format for showing and parsing date values, enabling consistent date display, user input validation, localization adjustments, formatting precision, and support for various date layouts including day, month, year orders or separators across different user input scenarios and display contexts.
</div>

#### Example - specify a custom date format

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        format: "yyyy/MM/dd"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How to set the on-screen keyboard type for date input fields in Kendo UI DateInput widget? Control or configure the on-screen keyboard type for date input fields on mobile devices by setting input methods such as numeric keypad, decimal input, telephone dial pad, email keyboard, or URL keyboard to optimize user experience and data entry precision. Enable or adjust input behaviors for touchscreens to trigger appropriate virtual keyboards that facilitate entering dates, numbers, phone numbers, emails, or web addresses, improving mobile form usability and validation. Customize the keyboard layout shown when the date-related input gains focus to match the expected input format, supporting different input modes like numeric, decimal, text, and URL entry for enhanced user interaction on smartphones and tablets.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        inputMode: "numeric"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the dateinput. If the dateinput has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I customize the label for a date input field in Kendo UI? Set or customize a descriptive text label for a date input field to identify or explain its purpose, enabling control over the label content as plain text or dynamically generated HTML through functions, with automatic linkage between label and input for accessibility by assigning or generating unique IDs when none are provided, useful for configuring form inputs, improving user interface clarity, and ensuring proper association in web forms and validation scenarios.
</div>

#### Example - create a label from a string

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
            label: "Description"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: function() {
                    return "First name";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How to customize date input labels in Kendo UI for jQuery? Control and customize the text and markup of date input labels by providing raw HTML or formatted content for label elements, enabling embedding icons, rich text, or custom HTML inside labels. Configure label appearance and structure with flexible input, set innerHTML for label tags during component setup, and enable precise label customization for date pickers, allowing developers to inject HTML, styled text, or interactive elements directly within the label. Adjust, enable, or modify label content dynamically for date inputs using raw HTML strings to enhance UI clarity and design flexibility in forms and user interfaces.
</div>

#### Example - create a label from a string

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: {
                    content: "Date"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: {
                    content: function() {
                        return "Date";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/dateinput/methods/value) method **does not trigger** the `focusout` event of the dateinput.
This can affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#dateinput").data("kendoDateInput").label.floatingLabel.refresh();`


<div class="meta-api-description">
How to make date input field label float when focused in Kendo UI for jQuery? Control whether the date input field displays its label as a floating label that shifts position when the field is focused or has a value, enabling floating label UI patterns for improved form clarity and usability. Configure, activate, or toggle floating label style around date pickers to enhance user experience by having labels move dynamically above input fields on focus, input, or value changes. Handle scenarios where programmatically setting the date value does not automatically trigger label repositioning by refreshing or updating the floating label state to ensure visual consistency. Manage floating label rendering, behavior, label animations, container wrapping, and focus or blur interactions for date selection components that require accessible, intuitive label presentations. This functionality supports floating label design patterns common in form inputs, including manual updates to floating label positioning when input values change through code or focus events.
</div>

#### Example - create a floating label

    <input id="dateinput" />
    <script>
        $("#dateinput").kendoDateInput({
                label: {
                    content: "Date",
                    floating: true
                }
        })
    </script>

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date which can be entered in the input.


<div class="meta-api-description">
How do I set a maximum date limit for a Kendo UI DateInput? Limit or control the latest allowable date selection by configuring or setting an upper date boundary, maximum date limit, or end date restriction for date inputs. Enable validation to reject dates beyond a specific cutoff, set the final acceptable date range, prevent future or out-of-range date entries, and ensure users cannot pick or enter dates past a defined maximum threshold during input or form submission. This helps enforce date constraints, restrict date pickers, control allowable calendar inputs, and manage valid date intervals in user interfaces where date selection is required.
</div>

#### Example - specify the maximum date

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        max: new Date(2013, 0, 1) // sets max date to Jan 1st, 2013
    });
    </script>

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that which be entered in the input.


<div class="meta-api-description">
How to set minimum allowed date in Kendo UI DateInput widget? Specify the earliest allowed date or starting date limit for date selection or input, enabling control over the minimum acceptable date value to prevent users from choosing or entering dates before a defined threshold, setting constraints on date pickers, calendar inputs, or date fields to enforce valid date ranges for scheduling, booking, validation, or form completion scenarios.
</div>

#### Example - specify the minimum date

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        min: new Date(2011, 0, 1) // sets min date to Jan 1st, 2011
    });
    </script>

### value `Date`*(default: null)*

 Specifies the selected date.


<div class="meta-api-description">
How do I dynamically update the date selection in a Kendo UI DateInput widget? Set or retrieve the selected date to initialize or update date pickers programmatically, bind chosen dates to forms or data models, control date input values dynamically, synchronize date selection between UI and code, handle user date changes, enforce or modify current date selections, programmatically change or read calendar inputs, update date fields reactively, and link date values between components or application state.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        value: new Date(2011, 0, 1)
    });
    </script>

### messages `Object`

The messages that DateInput uses.  Use it to customize or localize the placeholders of each date/time part.


<div class="meta-api-description">
How do I customize the placeholder text for year, month, day fields in a Kendo UI DateInput component? Customize or localize placeholder text for individual date and time segments within a date input component, enabling developers to configure, override, or set custom labels for year, month, day, hour, minute, and second fields. Adjust placeholder messages dynamically to match different languages, regional formats, or UI requirements, controlling how each part of a date/time input is presented to users for clearer, context-specific guidance. This supports fine-tuning input placeholders, tailoring user prompts, and enhancing accessibility by specifying exact wording or translations for all date and time elements in forms and interfaces.
</div>

#### Example - customize column menu messages

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages:{
            "year": "year",
            "month": "month",
            "day": "day",
            "weekday": "day of the week",
            "hour": "hours",
            "minute": "minutes",
            "second": "seconds",
            "dayperiod": "AM/PM"
        }
    });
    </script>

### messages.year `String` *(default: "year")*

The placeholder for the years part.


<div class="meta-api-description">
How do I customize the placeholder text for the year field in a Kendo UI date input? Customize or configure the placeholder text, label, or prompt that appears specifically for the year field within date input forms or date pickers, enabling control over how the year entry is indicated, displayed, or suggested in user interfaces. Adjust, set, or override default year placeholders to reflect formats, languages, or instructions that clarify the year input area in date selection controls, helping users recognize where and how to enter or select the year part of a date value.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "year": "Select year"
        }
    });
    </script>

### messages.month `String` *(default: "month")*

The placeholder for the months part.


<div class="meta-api-description">
How to customize month field placeholder text in Kendo UI DateInput control? Configure or customize the month field placeholder text within a date input control to support localization, internationalization, or user-friendly display by setting or overriding the default month label, enabling modification of the month prompt or hint shown in date entry forms, adjusting the month segment for different languages or regional formats, controlling placeholder text to guide users on month input, and tailoring month placeholders to improve usability in date pickers or forms.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "month": "Select month"
        }
    });
    </script>

### messages.day `String` *(default: "day")*

The placeholder for the day of the month part.


<div class="meta-api-description">
How to change the placeholder text for the day field in a Kendo UI date input? Set or customize the placeholder text for the day field in date inputs to support various languages, localize day-of-month prompts, display custom hints, tailor date entry forms, configure day segment placeholders, enable region-specific day formats, control input guidance for day values, modify day placeholders for improved user clarity, and adapt the day part of date pickers according to locale or design preferences.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "day": "Select day"
        }
    });
    </script>

### messages.weekday `String` *(default: "day of the week")*

The placeholder for the day of the week part.


<div class="meta-api-description">
How do I customize the weekday labels in Kendo UI DateInput? Customize or configure the day-of-week label, placeholder, or text in date input fields for localization, internationalization, or regional settings, enabling control over how weekdays appear, show, or are displayed in date pickers or calendars for different languages, formats, or user preferences.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "weekday": "Choose weekday"
        }
    });
    </script>

### messages.hour `String` *(default: "hours")*

The placeholder for the hours part.


<div class="meta-api-description">
How do I customize the placeholder text in the hour field of a Kendo UI date input control? Configure or customize the placeholder text that appears in the hour field of a date input control, including setting localized messages or labels for hours, defining default hour prompts, adjusting hour placeholders for user interfaces, setting hour input hints, modifying hour part text in date selectors, controlling hour field display text, enabling custom hour prompts for date pickers, and localizing the hour segment placeholder in datetime input components.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "hour": "Enter hour"
        }
    });
    </script>

### messages.minute `String` *(default: "minutes")*

The placeholder for the minutes part.


<div class="meta-api-description">
How do I change the placeholder text for minutes in Kendo UI DateInput? Configure the text displayed as a placeholder for minute input fields, customize or localize the minutes placeholder text, set or change the minute prompt shown during date and time entry, control the minutes label in forms or datetime pickers, enable localization for minute placeholders, update the text guiding users to enter minutes, adjust the displayed minute hint in date input components, modify the placeholder for minute values to match language or formatting preferences, specify the minute field’s placeholder text to assist user input in time selection interfaces.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "minute": "Enter minutes"
        }
    });
    </script>

### messages.second `String` *(default: "seconds")*

The placeholder for the seconds part.


<div class="meta-api-description">
How do I customize the placeholder for the seconds field in a Kendo UI date input? Configure or customize the placeholder text for the seconds field in a time or date input interface when the seconds value is unset or empty, enabling control over the display of default hints or prompts for seconds entry, adjusting the user interface to show specific placeholder text or messages where seconds need to be entered or are missing, helpful for form validation cues, input guidance, or localization of second placeholders in date and time input components.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "second": "Enter seconds"
        }
    });
    </script>

### messages.dayperiod `String` *(default: "AM/PM")*

The placeholder for the AM/PM part.


<div class="meta-api-description">
How to customize AM/PM indicators in Kendo UI date input fields? Customize or configure the placeholder text for AM and PM indicators in time or date input fields by setting labels, messages, or tokens that represent morning and afternoon periods. Control how day periods like AM/PM are displayed, enable localization or alternate text for meridiem markers, modify prompts that signify the half of the day, and tailor the textual cues for selecting or entering time segments in forms or date selectors. Adjust or override default day period placeholders to provide clear, user-friendly, and context-appropriate meridian identifiers in datetime input components across different locales and time formats.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        messages: {
            "dayperiod": "AM/PM"
        }
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
How to adjust the corner radius of a date picker input field in Kendo UI? Adjust the corner radius or border curvature of a date picker input field to achieve various visual styles such as sharp square edges, subtly rounded corners, or fully circular borders, enabling customization of the component’s outline appearance by setting precise radius values or predefined options like none, small, medium, large, or full roundness, allowing developers to configure, control, or style the shape of input boundaries for calendar or date entry controls in user interfaces.
</div>

#### Example - sets the rounded value

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
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
How do I adjust the size of the date input field in Kendo UI for jQuery? Adjust the input field’s overall dimensions, visual scale, padding, and compactness by configuring the size or dimension settings for date pickers or calendar inputs. Control how large or small the date input appears by setting size options such as small, medium, large, or disabling size adjustments entirely. Tailor the component’s footprint for different user interfaces, responsive layouts, or accessibility needs by specifying sizing preferences that affect spacing, field height, and component width. Customize the appearance and density of date selection inputs through configurable size parameters to match your design requirements or user experience goals.
</div>

#### Example - sets a size

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        size: "large"
    });
    </script>

### steps `Object`

An object with the different steps for incrementing/decrementing the various segments


<div class="meta-api-description">
How to adjust increment values for year/month/day in Kendo UI DateInput control? Adjust the increment and decrement values for each date and time segment such as year, month, day, hour, minute, and second by setting numeric step sizes to control how values change when users interact with arrow keys, spin buttons, or through code; configure step intervals to customize how quickly or slowly the date and time fields update in response to user input, enabling fine-tuned control over date-time adjustments, spinner behavior, keyboard navigation increments, and programmatic modification speeds for different time units.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            hour: 2,
            minute: 10
        }
    });
    </script>

### steps.day `Number`*(default: 1)*

A value used for incrementing/decrementing the year segment


<div class="meta-api-description">
How to change the step size for day values in a Kendo UI date input field? Control the numeric increment or step size for changing day values in date input fields, enabling customization of how much the day advances or decreases with each adjustment, configure step intervals for day segments, set the rate at which days increment or decrement in a date picker, adjust the unit change when navigating days, fine-tune day-by-day stepping behavior in date inputs, modify daily step increments for date selection controls, specify how many days to move per step when scrolling or using arrow keys in date fields, manage day step intervals for precise date input manipulation, and enable setting or altering the frequency of day increments during date entry or adjustment.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            day: 2
        }
    });
    </script>

### steps.hour `Number`*(default: 1)*

A value used for incrementing/decrementing the hour segment


<div class="meta-api-description">
How to set custom hour increment in Kendo UI DateInput control? Control the interval or step size for adjusting the hour value in a date or time input, enabling configuration of how many hours to add or subtract when increasing or decreasing the hour field, such as setting hourly increments in single or multiple hour jumps, customizing hour adjustment granularity for time pickers, or defining the step amount for hour changes when users navigate or input time values.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
       steps: {
         hour: 2
       }
    });
    </script>

### steps.millisecond `Number`*(default: 1)*

A value used for incrementing/decrementing the millisecond segment


<div class="meta-api-description">
How do I adjust the millisecond step size in a Kendo UI DateInput control? Adjust or set the increment and decrement size for milliseconds when modifying date and time inputs, enabling control over how much the millisecond portion changes with each keyboard arrow press, spinner click, or programmatic adjustment, allowing precise tuning of step intervals, fine-grained updates, or larger jumps in millisecond values within date/time input fields.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            millisecond: 10
        }
    });
    </script>

### steps.minute `Number`*(default: 1)*

A value used for incrementing/decrementing the minute segment


<div class="meta-api-description">
How do I adjust the interval for minute changes in a Kendo UI DateInput? Adjust the interval or increment for minute changes in time selection interfaces, enabling precise control over how many minutes advance or rewind when interacting with spinner controls, arrow keys, or scroll actions. Configure minute step sizes to customize the granularity of time input adjustments, set minute increments for faster or finer time selection, control minute interval stepping behavior, define how much time shifts per user input in the minute field, enable tailored minute navigation increments, and manage the sensitivity of minute value changes during keyboard, mouse wheel, or spinner manipulations.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            minute: 10
        }
    });
    </script>

### steps.month `Number`*(default: 1)*

A value used for incrementing/decrementing the month segment


<div class="meta-api-description">
How do I set up month increment steps in Kendo UI date input? Adjust the interval for changing month values when editing dates by setting the monthly increment step size, allowing you to configure how many months are added or subtracted each time the month field is increased or decreased. This control enables customization of month navigation speed, such as skipping single months, jumping quarters, or moving by full years, and supports numeric values to define these increments precisely for date picker or date input components. Use this setting to fine-tune the behavior of date adjustments in user interfaces, tailoring the monthly step size for faster or more granular date selection in editing contexts.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            month: 2
        }
    });
    </script>

### steps.second `Number`*(default: 1)*

A value used for incrementing/decrementing the second segment


<div class="meta-api-description">
How to set interval for seconds in Kendo UI date input widget? Configure the interval or increment for seconds when adjusting time inputs, enabling control over how many seconds increase or decrease during spinning, arrow key presses, keyboard input, or programmatic changes in time selection interfaces. This setting adjusts the step size for the seconds portion in time pickers or date-time controls, allowing customization of time granularity, step intervals, or value changes in seconds for more precise or coarse adjustments of the seconds field in user inputs or automated updates.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            second: 10
        }
    });
    </script>

### steps.year `Number`*(default: 1)*

A value used for incrementing/decrementing the year segment


<div class="meta-api-description">
How to configure the step size for year navigation in Kendo UI DateInput? Adjust how many years the date advances or retreats when changing the year field, set the interval or increment for year navigation, configure yearly stepping for date selection, control how much the year increases or decreases with each user input or arrow key press, define the numeric value for year increments or decrements in date input, customize year change granularity to skip multiple years at once or move one year at a time, specify how the year segment responds to user adjustments by setting step size, enable fast year jumping by setting larger year steps, manage how clicking or scrolling changes the year, and set the magnitude of year changes for precise or rapid date modifications.
</div>

#### Example - sets the steps

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        steps: {
            year: 2
        }
    });
    </script>

### twoDigitYearMax `Number`

The maximum year value that is considered part of the current century.


<div class="meta-api-description">
How do I configure Kendo UI DateInput to correctly interpret two-digit year values? Configure how two-digit year values are interpreted and parsed by setting a cutoff or maximum threshold that determines whether years like "20" represent 1920 or 2020, enabling control over century mapping for date inputs with abbreviated years. Adjust or set the boundary year that differentiates between 1900s and 2000s when processing two-digit year strings, defining whether years below or equal to the cutoff map to the 21st century and those above map to the 20th century, useful for validating, formatting, or parsing date entries with short year formats. Enable customization of century interpretation rules for shorthand year inputs in date fields to ensure accurate date recognition and prevent misinterpretation of ambiguous two-digit years.
</div>

#### Example - sets the twoDigitYearMax

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        twoDigitYearMax: 89
    });
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How do I customize date input settings in Kendo UI for jQuery? Configure or retrieve the date input settings dynamically during runtime by accessing or updating the internal configuration object that controls date format, validation rules, localization options, display preferences, and other date-related behaviors. Modify the date picker or input control parameters on the fly, inspect current formatting and restrictions, enable or adjust regional settings, apply custom validation logic, and fine-tune the user’s date entry experience through programmable configuration adjustments available after initialization.
</div>

#### Example - get options of the component

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    var options = dateinput.options;
    </script>

## Methods

### destroy
Prepares the **DateInput** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DateInput element from DOM.


<div class="meta-api-description">
How do I properly destroy a Kendo UI date input component to prevent memory leaks? Clean up and reset a date input component by detaching all event listeners, removing associated data attributes to prevent memory leaks, and triggering destruction routines on nested child components to ensure full resource cleanup before removing or replacing the element in the DOM. Enable safe teardown and proper disposal by clearing internal references, unbinding events, and recursively destroying embedded widgets without physically deleting the element, supporting scenarios where controlled removal or reuse of the date input is required. This process optimizes memory management, event handler detachment, and component lifecycle completion for date pickers and their nested interactions in web applications.
</div>

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    // detach events
    dateinput.destroy();
    </script>

### enable

Enable/Disable the DateInput widget.


<div class="meta-api-description">
How do I dynamically enable or disable a date input field in Kendo UI? Control whether a date input field can be enabled or disabled dynamically through code, toggling user interaction on or off, activating or deactivating input acceptance, locking the date selector to prevent changes during processing, restoring interactivity to allow user editing again, managing input availability after initialization, programmatically setting editable or read-only states, controlling focus and event handling eligibility to block or permit user input, enabling or disabling the calendar widget responsiveness, and adjusting component usability in response to application state changes.
</div>

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the DateInput.

#### Example - disable DateInput widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.enable(false);
    </script>

#### Example - enable DateInput widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How do I make Kendo UI date input field readonly but still submit its value? Control the date input field to prevent user modifications while ensuring the date value is still included in form submissions by enabling or disabling a readonly state that blocks typing and changes without disabling the entire input. Manage scenarios where you need the date displayed and submitted but not editable by users, differentiating from disabling the field which excludes the value from form posts. Configure, set, or toggle a mode that disallows user edits on the date picker yet retains its value for backend processing, ensuring the date input acts as read-only and supports submission workflows.
</div>

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the DateInput should be readonly or editable.

#### Example - make DateInput widget readonly

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.readonly();
    </script>

#### Example - make DateInput widget editable

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.readonly(false);
    </script>

### max

Gets/Sets the max value of the DateInput.


<div class="meta-api-description">
How do I set the maximum date that can be selected in a Kendo UI DateInput? Retrieve or define the upper limit for selectable dates, set or update the maximum allowed date dynamically to control date range restrictions, configure maximum date boundaries for validation and user input constraints, enforce end date limits, adjust or query the highest permissible calendar selection, restrict date pickers to prevent choosing dates beyond a specified cutoff, manage date input limits for form validation and component behavior, and control or retrieve the maximum date setting to ensure compliance with date restrictions and date-related logic.
</div>

#### Parameters

##### value `Date|String`

The max date to set.

#### Returns

`Date` The max value of the DateInput.

#### Example - get the max value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    var max = dateinput.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.max(new Date(2100, 0, 1));
    </script>

### min

Gets/Sets the min value of the DateInput.


<div class="meta-api-description">
How do I set the minimum date for a Kendo UI DateInput? control or retrieve the earliest selectable date, define or adjust the lower boundary for date inputs, enforce minimum date constraints to validate and restrict user-entered dates, set or get the smallest allowable date value for date pickers or calendars, limit date selection to dates after a specified starting point, configure input validation to reject dates before a certain threshold, establish or query the minimum date limit for scheduling, booking, or form data entries, enable precise control over date input boundaries to ensure compliance with business rules or application logic, dynamically update or read the minimum acceptable date to guide user selection and prevent invalid entries.
</div>

#### Parameters

##### value `Date|String`

The min date to set.

#### Returns

`Date` The min value of the DateInput.

#### Example - get the min value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    var min = dateinput.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the DateInput

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.min(new Date(2000, 0, 1));
    </script>

### setOptions

Changes the initial DateInput configuration.


<div class="meta-api-description">
How to dynamically update date picker settings in Kendo UI? Adjust, modify, or update date picker settings dynamically without recreating the component by configuring runtime options such as date formats, constraints, localization, display preferences, and validation rules; enable developers to change how the date input behaves, looks, and processes user selections on the fly, seamlessly merging new configuration parameters to customize date formatting, allowed date ranges, and input behavior within an existing instance.
</div>

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        min: new Date(2001, 0, 1),
        max: new Date()
    });

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.setOptions({
        min: new Date(2010, 5, 6)
    });
    </script>

### value

Gets/Sets the value of the DateInput.


<div class="meta-api-description">
How to programmatically get/set the selected date in a Kendo UI DateInput widget? Retrieve or update the selected date dynamically, enabling programmatic access to the current date value in forms or user inputs, set or get the date field content, control the date selection through code, manipulate or assign date values for validation, pre-filling forms, user-driven or automated changes, accessing or modifying the date input value on demand, extracting the current date state, and adjusting or syncing date information within interactive components.
</div>

#### Parameters

##### value `Date|String`

The value to set.

#### Returns

`Date` The value of the DateInput.

> * This method **does not trigger** [change](/api/javascript/ui/dateinput/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");
    dateinput.value(new Date(2016, 10, 1));
    dateinput.trigger("change");
    </script>

#### Example - gets the value of the widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        value: new Date(2013, 10, 10)
    });

    var dateinput = $("#dateinput").data("kendoDateInput");

    var value = dateinput.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - sets the value of the widget

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        value: new Date(2013, 10, 10)
    });

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.value(new Date());
    </script>

## Events

### change

Fires when the selected date is changed


<div class="meta-api-description">
How to handle date value changes in Kendo UI DateInput widget? Respond to updates or modifications in date selection by capturing change events that occur when a user picks or alters a date in an input field, enabling developers to execute custom functions, update data models, synchronize UI components, perform validation checks, or trigger side-effects based on user interaction or programmatic date changes. This event-driven mechanism supports listening for date value changes, detecting user input shifts, handling calendar selections, managing reactive data binding, and integrating with form controls to ensure that any adjustments in the selected date propagate through application logic and interface layers seamlessly.
</div>

#### Event Data

##### e.sender `kendo.ui.DateInput`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the dateinput
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="dateinput" />
    <script>
    $("#dateinput").kendoDateInput();

    var dateinput = $("#dateinput").data("kendoDateInput");

    dateinput.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the dateinput
    });
    </script>
