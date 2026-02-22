---
title: TimePicker
page_title: Configuration, methods and events of Kendo UI TimePicker
description: What type of animations you can use in TimePicker UI widget, find supported methods and see which events are triggered once the value is changed.
res_type: api
component: date-time-pickers
---

# kendo.ui.TimePicker

Represents the Kendo UI TimePicker. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How to enable responsive time selection interface in Kendo UI TimePicker? Control how the time selection interface adjusts its layout and behavior dynamically across various devices and screen sizes, enabling or disabling responsive, adaptive UI modes for maintaining usability on mobile, tablet, or desktop environments; configure automatic adaptation for device-specific rendering or turn off adaptive adjustments to keep a consistent fixed display regardless of platform, allowing developers to set, toggle, or manage time input responsiveness and appearance in multiple contexts and device form factors.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the title in Kendo UI TimePicker for mobile devices? Control and customize the header text or label that appears in a mobile-friendly or responsive time selection overlay, enabling you to set, change, or configure the title shown when the time input adapts to smaller screens or adaptive views. This includes modifying the display title for adaptive or responsive time pickers, adjusting the overlay header text, setting custom labels for mobile time selectors, and enabling dynamic titles in time picker components optimized for adaptive layouts.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Time"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in Kendo UI's adaptive time picker? Configure or customize the secondary label, subtitle text, or descriptive caption displayed in a time selection component’s adaptive, compact, or mobile-friendly interface, enabling localization, alternative wording, or context-specific messages for responsive layouts and ensuring tailored user prompts, labels, or helper text when the time picker adjusts to smaller screens or adaptive views.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        adaptiveMode: "auto",
        adaptiveSubtitle: "Choose preferred time"
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How to customize the animation when opening or closing the time picker popup in Kendo UI for jQuery? Configure, enable, disable, or customize popup opening and closing animations for the time selection interface, controlling whether the popup transitions smoothly or appears instantly; toggle animation effects on or off for time pickers, manage visual effects, handle demonstration of popup entry and exit, and adjust or suppress animation behavior to optimize user experience or performance during time input interactions.
</div>

#### Example - disable open and close animations

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
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

The animation played when the popup is closed.


<div class="meta-api-description">
How do I customize the closing animation of a Kendo UI timepicker popup? Control and customize the closing animation of a time picker popup, including setting the animation type, effect, duration, easing curve, and transition style to define how the popup disappears or hides when exiting. Configure, enable, or adjust the closing visual behavior, timing, and animation sequence for time selection interfaces to tailor user experience and match UI design preferences seamlessly. Adjust how the closing action is animated, manage fade-out, slide-up, or other disappearance effects, and fine-tune the popup’s close animation for smoother, more responsive user interactions.
</div>

#### Example - configure the close animation

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How do I customize the closing animation effects for a Kendo UI TimePicker widget? Customize and configure the closing animation effects for a time selection widget by specifying one or more visual transition styles such as fade, slide, or other supported effects to create smooth or dynamic exit animations; adjust, set, enable, or control how the closing sequence appears visually with combined or single effect names separated by spaces to enhance user interface responsiveness and aesthetics during the time picker’s closure.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 500
            }
        }
    });
    </script>

### animation.close.duration `Number`

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How do I adjust the close animation duration in Kendo UI TimePicker? Adjust the duration of the closing animation for a time selection popup by setting the time in milliseconds, enabling customization of how quickly or slowly the close transition plays when dismissing the time picker interface. Control, configure, or fine-tune the timing of the close animation effect to create smoother, faster, or slower pop-up closures according to user experience needs or application design preferences. Customize the length of the closing animation to optimize interface responsiveness or aesthetic flow when the time picker disappears, affecting transitions, fades, or slide effects when the widget closes.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        animation: {
            close: {
                effects: "fadeOut",
                duration: 1000
            }
        }
    });
    </script>

### animation.open `Object`

The animation played when the calendar popup is opened.


<div class="meta-api-description">
How to customize the opening animation of the Kendo UI TimePicker's calendar popup? Configure and customize the opening animation effect, speed, and easing for the calendar popup in time selection interfaces, enabling control over how the time picker’s dropdown or popup appears with smooth, dynamic transitions, including adjusting animation style, duration, easing curves, and effects to enhance user experience during the time selection process or calendar display activation.
</div>

#### Example - configure the open animation

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
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
How can I customize the opening animation of the Kendo UI TimePicker component? Customize and configure the opening animation of a time selection component by specifying one or multiple animation effects or visual transitions that trigger when the clock or time input dropdown appears. Control, enable, or set fade, slide, zoom, or other animation styles to fine-tune the user experience during the display of the time picker interface. Adjust or combine animation effects to enhance UI responsiveness, specify the transition appearance at component launch, and customize how the time selector visually opens on initialization using various predefined or named animation sequences.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        animation: {
            open: {
                effects: "fadeIn zoom:in",
                duration: 400
            }
        }
    });
    </script>

### animation.open.duration `Number`

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How to set the duration of the time picker popup animation in Kendo UI for jQuery? Control or configure the speed, timing, duration, length, or delay of the popup open animation for time selection interfaces. Enable or disable smooth opening transitions, set animation time in milliseconds, adjust how fast or slow the time picker expands or appears, customize opening effects for improved user experience, optimize responsiveness of time selection dropdowns or dialogs, and fine-tune the visibility transition timing for time input controls. Developers can manipulate opening animation duration to meet design needs or performance goals.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        animation: {
            open: {
                effects: "slideDown",
                duration: 600
            }
        }
    });
    </script>

### autoAdjust `Boolean` *(default: true)*

If this property is enabled and you have configured `min` and/or `max` values, and the user enters a value that falls out of that range, the value will automatically be set to either the minimum or maximum allowed value. This property has effect only when the `dateInput` of the component is enabled.


<div class="meta-api-description">
How does Kendo UI TimePicker automatically adjust times when they exceed minimum/maximum limits? Configure automatic correction of manually entered times to fit within minimum and maximum limits by enabling a feature that clamps or adjusts user input to the nearest allowed boundary when the entered time falls outside defined range constraints; this adjustment ensures input values stay within specified bounds during typing, particularly when direct date or time input fields are active, allowing seamless enforcement of time restrictions and automatic normalization of out-of-range entries for time selection components.
</div>

#### Example - prevent automatic value adjustments

    <h3>Try to change the hour to an earlier one and then focus out the input.</h3>
    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        min: new Date(2000, 0, 1, 11, 0, 0),
        value: new Date(2000, 0, 1, 11, 0, 0),
        dateInput: true,
        autoAdjust: false
    });
    </script>

### autoCorrectParts `Boolean`*(default: true)*

Sets a value that indicates whether to automatically correct the segment when out of range. In order to work, `dateInput` prop should be set to `true`.


<div class="meta-api-description">
How does Kendo UI TimePicker's autoCorrectParts property fix incorrect time input? Automatically adjust or fix invalid time components such as hours, minutes, or seconds when users input values outside acceptable ranges, enabling seamless correction and normalization of time entries during input. This feature handles out-of-bound time segments by wrapping, clamping, or recalculating values to ensure they conform to valid time formats, supporting scenarios where time input needs to be validated and corrected on the fly. It works specifically when time is entered via textual or direct date/time input fields, helping developers enable smart input validation, auto-fixing errors, or making user input more forgiving and intuitive. Ideal for configuring time input controls that require robust handling of incorrect or partial time parts, improving user experience and data accuracy.
</div>

#### Example - sets the autoCorrectParts

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        autoCorrectParts: true
    });
    </script>

### componentType `String`*(default: "classic")*

 Specifies the component type of the widget.

* `"classic"` - Uses the standard rendering of the widget.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.


<div class="meta-api-description">
How do I change the appearance mode of my Kendo UI TimePicker component? Configure the TimePicker display style, appearance mode, or UI variant by selecting between traditional classic layout or a refreshed modern design, allowing customization of theme integration, visual presentation, and user interface style at startup through string values that control rendering modes, component look and feel, and theming options.
</div>

#### Example - specify modern component type

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
            componentType: "modern"
        });
    </script>

### culture `String`*(default: "en-US")*

 Specifies the culture info used by the widget.


<div class="meta-api-description">
How do I configure the timepicker component to display dates in a specific culture? Control and configure locale settings, language preferences, regional time formats, and time parsing rules for the time selection component by specifying cultural or internationalization options that influence how time values are displayed, interpreted, and formatted according to different countries or regions, enabling support for various time notations, AM/PM distinctions, 24-hour clocks, and cultural symbols commonly used in time input and output scenarios.
</div>

#### Example - specify German culture internationalization

    <!--
        List of available cultures - https://github.com/telerik/kendo-ui-core/tree/master/src/cultures

        For more information check this help topic:
        https://docs.telerik.com/kendo-ui/framework/globalization/overview
    -->

    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/cultures/kendo.culture.de-DE.min.js"></script>

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        culture: "de-DE"
    });
    </script>

### dateInput `Boolean`*(default: false)*

 Specifies if the TimePicker will use DateInput for editing value


<div class="meta-api-description">
How do I enable editable time values in Kendo UI TimePicker? configure date and time input with mask formatting, enable editable time values through formatted input fields, set up parsed and validated date/time entry for time selection controls, customize user input with guided date editing, allow controlled date-time value editing using input masking techniques, enhance time picker input with structured date formats, implement easy-to-edit time values with format enforcement, support intuitive date-time entry with validation and parsing, manage time input with user-friendly date editing components, control date/time input behavior for improved user interaction and error reduction.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true
    });
    </script>

### dates `Array`

 Specifies a list of dates, which are shown in the time drop-down list. If not set, the TimePicker will auto-generate the available times.

 > This configuration works only with the [`classic component type`](/api/javascript/ui/timepicker/configuration/componenttype).



<div class="meta-api-description">
How do I customize the list of available times in a Kendo UI timepicker? Configure and customize the list of selectable times in a time picker control by providing an array of Date objects to define specific time options, enabling precise control over time dropdown entries instead of relying on automatically generated intervals. This setup supports scenarios where you need to specify exact allowed times, customize available time slots, set predefined time selections, filter or restrict times shown in the picker, or adjust time choices for classic UI components, ensuring tailored time input selection based on custom date and time arrays.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dates: [
            new Date(2000, 10, 10, 10, 0, 0),
            new Date(2000, 10, 10, 10, 30, 0)
        ] //the drop-down list will consist only two entries - "10:00 AM" and "10:30 AM"
    });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to customize the fill mode of a TimePicker control in Kendo UI for jQuery? Adjust visual styling for time selection controls by configuring fill styles such as solid backgrounds, flat color fills, outlined borders, or no fill effect for interactive elements like buttons, input fields, and highlighted selections. Customize appearance to set the color treatment, controlling how the user interface components are colored or left transparent, enabling design choices that range from fully filled, softly tinted, bordered, or clear visuals on time input and selection parts. Tailor the color application mode on time input elements to achieve different UI aesthetics like fully colored buttons, minimalistic flat fills, outlined edges, or completely unfilled components for flexible theming and user experience.
</div>

#### Example - sets the fillMode

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        fillMode: "flat"
    });
    </script>

### focusTime `Date`*(default: null)*

 Specifies a time that will be focused inside the popup when opened.


<div class="meta-api-description">
How can I set the initial time focus when opening the Kendo UI TimePicker popup? Set or control the initial highlighted or focused time value when opening a time selection popup, allowing users to jump directly to a specific hour or minute, improve keyboard accessibility and navigation within the time list, customize default time focus for better user experience on popup activation, preselect or center a designated time slot to streamline picker interaction, and enhance usability by enabling quick positioning or default emphasis on a particular time when the time input control expands.
</div>

#### Example - specify a focus time

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        focusTime: new Date(2023, 10, 4, 8, 0, 0) //date part is ignored
    });
    </script>


### format `String`*(default: "h:mm tt")*

 Specifies the format, which is used to format the value of the TimePicker displayed in the input. The format also will be used to parse the input.

 For more information on date and time formats please refer to [Date Formatting](/framework/globalization/dateformatting).


<div class="meta-api-description">
How do I customize the time format in a Kendo UI TimePicker widget? Configure and control how time inputs are displayed and interpreted by setting custom patterns for time formatting and parsing, including options to define or adjust input masks, format strings, and validation rules for time values, enabling consistent display and accurate recognition of typed or selected time, with support for various time formats, localizations, and input styles to ensure seamless user interaction and precise time data handling across applications.
</div>

#### Example - specify a custom time format

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        format: "HH:mm"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I configure the on-screen keyboard for time input fields in Kendo UI TimePicker? Configure the type of on-screen keyboard or virtual keypad that appears when users interact with time input fields by setting input mode attributes such as numeric, decimal, telephone, or email. Enable control over which keyboard layout or input method editor shows up on mobile devices for time entry, optimize user experience by specifying input types to influence suggestions and input validation, and customize how data entry is handled on touchscreens and virtual keyboards by defining the preferred input mode. Adjust or set keyboard behavior for touch input to match expected time-related input patterns, enhancing usability and accuracy during time selection or manual entry on various devices.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        inputMode: "numeric"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the timepicker. If the timepicker has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I customize the label in a Kendo UI TimePicker widget? Set, customize, or configure the descriptive text or heading displayed before a time selection input to provide context, instructions, or titles for users interacting with time pickers; control the label content via static strings or dynamic functions to adjust wording, formatting, or HTML output, ensuring accessibility by linking labels with input elements through identifiers that can be generated automatically if not specified; use this to enable clearer user guidance, improve form clarity, or add titles preceding time input controls in interfaces.
</div>

#### Example - create a label from a string

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
            label: "Date"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: function() {
                    return "Date";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How to customize the label content inside a Kendo UI TimePicker control? Set or customize the label content inside a time picker control by defining raw HTML markup, allowing insertion of text, icons, embedded links, formatted elements, or any custom HTML snippets to control how the label appears. Enable flexible label configuration by specifying inner HTML content that can include styled text, SVG icons, hyperlinks, or complex markup, supporting customized labels for time selection interfaces during component setup or initialization. Adjust or override default label text with rich HTML content to enhance clarity, branding, or interactivity of time input fields, controlling exactly what appears as the label through direct HTML content assignment.
</div>

#### Example - create a label from a string

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: {
                    content: "Date"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the wid
get instance.

#### Example - create a label from a function

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: {
                    content: function() {
                        return "Date";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the fl
oating label functionality.

> **Important:** The [value](/api/javascript/ui/timepicker/methods/value) meth
od **does not trigger** the `focusout` event of the timepicker.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating La
bel: `$("#timepicker").data("kendoTimePicker").label.floatingLabel.refresh(
);`


<div class="meta-api-description">
How to enable floating labels in Kendo UI TimePicker widget? Control enabling or disabling floating labels for time input fields to have the label float above the input when focused or filled, configure floating label behavior for time pickers to manage label position dynamically based on input focus or value presence, set or toggle floating label appearance in time selection components, handle floating label layout for time inputs that shift the label upward when the user interacts or inputs data, customize floating or persistent labels in time picker interfaces, address synchronization issues between time value changes and floating label states including refresh or manual updates to maintain correct label positioning, configure label float mode to enhance UI clarity in time input widgets, enable dynamic floating labels to improve form usability with time pickers, and troubleshoot floating label visibility when programmatically changing time values without triggering focus events.
</div>

#### Example - create a floating label

    <input id="timepicker" />
    <script>
        $("#timepicker").kendoTimePicker({
                label: {
                    content: "Date",
                    floating: true
                }
        })
    </script>


### interval `Number|Object`*(default: "30" or "0" in modern picker)*

Specifies the interval between values in the popup list.

* When the [componentType](api/javascript/ui/timepicker/configuration/componenttype) is set to `classic`, the interval is specified in minutes (numeric values).
* When the [componentType](api/javascript/ui/timepicker/configuration/componenttype) is set to `modern`, the interval is specified as an object of hours, minutes and seconds.


<div class="meta-api-description">
How to adjust time step size for Kendo UI TimePicker widget? Adjust the selection frequency or step size for time options in a time picker widget to customize how granular or coarse the available time choices appear, enabling settings for minute-based intervals or combined hour, minute, and second increments depending on interface style, allowing configuration of how often times show up in dropdowns or lists to fine-tune user input precision and control time step sizing for scheduling, time selection, or input components.
</div>

#### Example - specify a time interval for the classic component type

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        interval: 15
    });
    </script>

#### Example - specify a time interval for the modern component type

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        componentType: "modern",
        interval: {
            hour: 2,
            minute: 10,
            second: 15
        }
    });
    </script>

### max `Date`*(default: "00:00")*

Specifies the end value in the popup list.


<div class="meta-api-description">
How can I restrict the maximum selectable time in a Kendo UI TimePicker widget? Control or restrict the maximum selectable time in scheduling inputs, time selection widgets, or time dropdowns by setting an upper time limit or deadline, enabling developers to define the latest allowed time users can choose in time pickers or forms. This setting helps configure the time range boundaries alongside start limits and step intervals, supporting scenarios like appointment booking cutoffs, deadline restrictions, configurable time ranges, or time input validation to prevent selecting times beyond a specified maximum.
</div>

#### Example - specify a maximum selectable time

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        max: new Date(2000, 0, 1, 22, 0, 0) //date part is ignored
    });
    </script>

#### Example - render all available hours

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        max: new Date(2000, 0, 1, 23, 30, 0) //date part is ignored
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How do I customize the time selection interface labels in Kendo UI TimePicker? Customize and localize all displayed text, labels, prompts, and messages within a time selection interface by configuring or overriding default strings and translations, enabling support for multiple languages, adjusting UI text for different locales, modifying button labels, error messages, placeholders, and accessibility descriptions to fit regional or application-specific terminology and preferences.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          now: "My Now",
          hour: "My Hour",
          minute:"My Minute",
          second:"My Second",
          millisecond: "My Millisecond",
          cancel: "My Cancel",
          set:"My Set",
        }
      });
    </script>

### messages.now `String` *(default: "")*

Allows customization of the **Now** text in the TimePicker.


<div class="meta-api-description">
How do I customize the "now" label in a Kendo UI TimePicker component? Customize or set the label text for the current time indicator in time selection components, enable localization or internationalization by defining the displayed string for "now" or immediate time, control the wording users see when selecting the present time during time input or picker interactions, localize or configure real-time labels in time UI elements, and modify or translate the dynamic prompt that shows the exact current moment in time selection interfaces.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          now: "My Now"
        }
      });
    </script>

### messages.hour `String` *(default: "")*

Allows customization of the **Hour** text in the TimePicker.


<div class="meta-api-description">
How can I customize the label for the hour segment in a Kendo UI time picker? Customize the label or text displayed for the hour segment in time selection components, set or change the hour caption, configure the hour indicator wording, adjust the hour placeholder or prompt within time picker interfaces, modify the hour display text for localization, internationalization, or branding purposes, control how the hour unit is presented to users, redefine the hour label for accessibility or UX improvements, rename the hour descriptor in scheduling or clock widgets, tailor the hour message shown during time input or selection, and adapt the hour text shown in time-related UI elements to fit different languages or user preferences.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          hour: "My Hour"
        }
      });
    </script>

### messages.minute `String` *(default: "")*

Allows customization of the **Minute** text in the TimePicker.


<div class="meta-api-description">
How do I change the default label for minutes in a Kendo UI timepicker? Customize or localize the label for minutes in a time selection interface by configuring the text or message that represents minutes, allowing developers to set, change, translate, or override the default minute display in time picker components, supporting various languages, formats, and user interface adjustments related to minute labeling in time input controls.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          minute: "My Minute"
        }
      });
    </script>

### messages.second `String` *(default: "")*

Allows customization of the **Second** text in the TimePicker.


<div class="meta-api-description">
How do I customize the label for seconds in a Kendo UI TimePicker control? Customize the label or text shown for seconds in time selection interfaces, enabling localization and translation of the seconds unit, letting you set or configure the representation of seconds in time picker controls, time inputs, or time-related UI elements to match different languages, formats, or regional preferences, adjusting how the seconds field or unit is named, displayed, or labeled in user interfaces for time entry or time-setting components.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          second: "My Second"
        }
      });
    </script>

### messages.millisecond `String` *(default: "")*

Allows customization of the **Millisecond** text in the TimePicker.


<div class="meta-api-description">
How do I customize the label for milliseconds in Kendo UI TimePicker widget? Customize, configure, or set the label text for milliseconds in time selection interfaces, control how the millisecond unit is displayed or named within time picker components, adjust the terminology for fractional seconds, modify the millisecond field caption or prompt, localize or translate the label for milliseconds, enable tailored messages or captions for the smallest time increment in time input controls, define custom wording for milliseconds in user interfaces handling precise time entry, and personalize the naming conventions related to millisecond display in time selection tools.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          millisecond: "My Millisecond"
        }
      });
    </script>

### messages.cancel `String` *(default: "")*

Allows customization of the **Cancel** button text in the TimePicker.


<div class="meta-api-description">
How do I customize the cancel button in Kendo UI TimePicker? Customize or set the label, text, or caption of the Cancel button in time selection interfaces, including changing default button wording, controlling cancel action prompts, modifying cancel button display text, configuring user interface cancel labels, localizing or translating cancel button content, enabling personalized cancel button messages, and adjusting the wording shown on cancel buttons in time picker controls or time input dialogs.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          cancel: "My Cancel"
        }
      });
    </script>

### messages.set `String` *(default: "")*

Allows customization of the **Set** button text in the TimePicker.


<div class="meta-api-description">
How to change the label on the "Set" button in a Kendo UI time picker? Customize, configure, or change the label text displayed on the Set button within a time selection interface, allowing developers to specify button captions, modify button text, rename action prompts, or localize the confirmation button in a time picker component, supporting diverse user interface text updates, internationalization, and user experience adjustments for the time input control.
</div>

#### Example

    <input id="timepicker" />

    <script>
      $("#timepicker").kendoTimePicker({
        value: new Date(),
        format: "hh:mm",
        componentType:"modern",
        messages: {
          set: "My Set"
        }
      });
    </script>

### messages.dateInput `Object`

The messages that DateInput uses.  Use it to customize or localize the placeholders of each date/time part.


<div class="meta-api-description">
How can I change the placeholder text for date input in a Kendo UI TimePicker widget? Customize or localize the placeholder text for date input fields within time selection components, enabling control over input prompts, date format hints, display labels, and placeholder messages to match localization requirements, user interface customization, accessibility settings, or internationalization needs for date and time entry in applications.
</div>

#### Example - customize column menu messages

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
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
How do I customize the year input placeholder in Kendo UI TimePicker? Configure the year input placeholder text for date and time pickers to customize or localize the year field prompt, control the display of year hints in date inputs, set or modify year placeholders for improved user guidance, adjust the year label in time selection interfaces, and enable year-specific input localization or formatting within date and time components.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                year: "yyyy"
            }
        }
    });
    </script>

### messages.dateInput.month `String` *(default: "month")*

The placeholder for the months part.


<div class="meta-api-description">
How do I customize the month placeholder in Kendo UI TimePicker? Customize or configure the placeholder text for the month section within date input fields when selecting dates and times, enabling control over displayed hints, default month prompts, or input placeholders in date pickers, calendars, or time selection components, useful for adapting month labels, setting localized month placeholders, or guiding users on month entry in date-time input interfaces.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                month: "mm"
            }
        }
    });
    </script>

### messages.dateInput.day `String` *(default: "day")*

The placeholder for the day of the month part.


<div class="meta-api-description">
How do I customize the day input placeholder in a Kendo UI TimePicker? Customize the placeholder text or prompt for entering the day of the month in date and time input fields, enabling localization, user interface personalization, and adaptable day input hints. This feature supports configuring or setting day placeholders in date pickers, time selectors, or calendar inputs, allowing developers to control how day entries are displayed, translated, or indicated within time or date input components. Ensure flexibility for different languages, regional formats, and user experience needs by adjusting day-of-month input messages, labels, or placeholders in interactive date/time forms or widgets.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                day: "dd"
            }
        }
    });
    </script>

### messages.dateInput.weekday `String` *(default: "day of the week")*

The placeholder for the day of the week part.


<div class="meta-api-description">
How to customize the weekday placeholder in Kendo UI TimePicker? Customize or configure the placeholder text for the weekday or day-of-week field in a time or date input control, enabling you to set, change, or localize the text shown for selecting or displaying the day within time picker components, date input forms, or scheduling interfaces, including adjusting labels for weekdays in various languages, formats, or UI contexts where users specify or view the day part of a date and time selector.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                weekday: "day"
            }
        }
    });
    </script>

### messages.dateInput.hour `String` *(default: "hours")*

The placeholder for the hours part.


<div class="meta-api-description">
How can I change the hour placeholder in Kendo UI TimePicker widget? Set or customize the hour placeholder text in time selection inputs, adjust the displayed hour prompt or hint within time pickers, define the label or example text guiding users to enter hours, configure the hour field placeholder for time input controls, change or localize the hour hint in time entry components, specify the default hour placeholder shown in time selection interfaces, control the hour part prompt inside time input fields, update the text suggesting hour input in time picker widgets, enable tailored or translated placeholders for hour entry in time forms, and modify the visible hour guide text that appears in time input placeholders.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                hour: "hh"
            }
        }
    });
    </script>

### messages.dateInput.minute `String` *(default: "minutes")*

The placeholder for the minutes part.


<div class="meta-api-description">
How do I customize the minute placeholder in Kendo UI TimePicker? Customize or configure the placeholder text for minutes in date and time input fields, enable localized or translated minute labels, set or change minute placeholders in time selection interfaces, control how minute values are represented in user input prompts, support internationalization for minute input hints, define custom text placeholders for minute segments in time pickers, adjust minute input UI elements to match language or locale preferences, apply specific minute placeholder strings for better user guidance, and fine-tune minute-related input messaging within time selection components.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                minute: "mm"
            }
        }
    });
    </script>

### messages.dateInput.second `String` *(default: "seconds")*

The placeholder for the seconds part.


<div class="meta-api-description">
How do I customize the placeholder for seconds in Kendo UI TimePicker? Set or customize the placeholder text, default label, or prompt for the seconds input field in time selection components, enabling localization and language adjustments for user interfaces that require configuring or displaying seconds in time entries, time pickers, or date-time input controls, with support for multilingual placeholders, localized prompts, and customizable text for seconds input segments.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                second: "ss"
            }
        }
    });
    </script>

### messages.dateInput.dayperiod `String` *(default: "AM/PM")*

The placeholder for the AM/PM part.


<div class="meta-api-description">
How do I customize the AM/PM labels in a Kendo UI TimePicker? Customize or configure the AM and PM placeholders or labels in time input fields, control how meridiem indicators like morning or afternoon markers display within time pickers, set or change the display text for day period indicators such as "AM" and "PM," adjust the language or placeholder for day period input in time selection components, handle localization or personalization of morning/afternoon toggles in time inputs, modify or set custom text that appears during time entry related to day periods, enable or change the displayed indicators for morning and evening segments in user interfaces involving time selection.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        dateInput: true,
        messages: {
            dateInput: {
                dayperiod: "AM/PM"
            }
        }
    });
    </script>

### min `Date`*(default: "00:00")*

Specifies the start value in the popup list.


<div class="meta-api-description">
How do I set the earliest selectable time in a Kendo UI TimePicker? Control the earliest selectable or visible time in a time selection interface by defining a minimum start time, minimum allowed time, or earliest timestamp to configure the initial option shown in the time dropdown or popup. Enable setting a lower bound on available time entries to restrict selection before a specific hour, date, or time value, thereby adjusting the start point for time navigation, limiting earliest time choices, or setting a minimum threshold for valid time input in scheduling, booking, or appointment applications.
</div>

#### Example - specify a minimum selectable time

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        min: new Date(2000, 0, 1, 8, 0, 0) //date part is ignored
    });
    </script>

### parseFormats `Array`

 Specifies the formats, which are used to parse the value set with the value method or by direct input. If not set the value of the options.format will be used. Note that value of the format option is always used.

 > Order of the provided parse formats is important and it should from stricter to less strict.


<div class="meta-api-description">
How do I configure custom parsing patterns for time input strings in a Kendo UI TimePicker? Configure how time input strings are interpreted and converted into date objects by specifying custom parsing patterns or formats that dictate acceptable input styles and value recognition for time selection components. Enable developers to define multiple time format variations, from strict to flexible, to accurately parse user input or programmatically set values, ensuring compatibility with various time representations, localization needs, and user typing habits while maintaining fallback on default display formats. Control input validation and conversion by setting prioritized patterns that guide time extraction reliably across different scenarios such as manual typing, pasting, or API-driven value assignment.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        format: "h:mm tt",
        parseFormats: ["HH:mm"] //format also will be added to parseFormats
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.


<div class="meta-api-description">
How to customize the dropdown menu behavior for Kendo UI TimePicker? Customize dropdown menu behavior, appearance, and positioning for time selection components by configuring popup options including animation effects, collision detection, placement relative to parent or viewport, and container attachment. Enable or adjust dropdown initialization parameters like display alignment, show/hide transitions, append target elements, and collision strategies to control overlay presentation and interaction for time pickers or similar UI widgets. Fine-tune popup display settings to manage how time selection dropdowns appear, animate, and respond to boundary collisions, ensuring precise control over UI overlay behavior and visual positioning in various contexts.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.


<div class="meta-api-description">
How do I customize the location of the Kendo UI TimePicker popup? Control where the time selection popup appears by specifying a target container using a selector, enabling placement of the popup inside modals, dialogs, custom wrappers, or any chosen DOM element; this allows configuring, setting, or directing the popup’s rendering location for better layout management, dynamic positioning inside parent elements, or adjusting popup containment within different sections of the page or application structure.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
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
How do I customize the time picker popup's alignment in Kendo UI for jQuery? Control and customize the alignment and positioning of a time selection popup relative to its triggering element or anchor by specifying vertical and horizontal placement, enabling precise configuration of popup origin with options like top, bottom, center vertically and left, center, right horizontally, allowing developers to set, adjust, or fine-tune the popup's appearance and location on screen for better user interface layout, popup anchor point, overlay positioning, and dynamic placement of time pickers in various UI contexts.
</div>

#### Example - append the popup to a specific element


    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
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
How do I control the position of the popup in a Kendo UI TimePicker widget? Control or configure the popup placement of a time selection widget by specifying vertical and horizontal alignment points relative to the anchor element, using combinations like top, center, bottom for vertical position and left, center, right for horizontal position to attach the popup precisely where it should appear; this enables setting the popup’s anchor alignment, adjusting dropdown positioning, customizing the timepicker overlay location on the screen, aligning time selector popups in various UI layouts, and managing how the popup opens relative to the input field or container.
</div>

#### Example - append the popup to a specific element


    <div id="container">
        <input id="timepicker" />
    </div>
    <script>
    $("#timepicker").kendoTimePicker({
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

### rounded `String`*(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the corner radius of Kendo UI timepicker inputs? Adjust or customize the corner radius, border rounding, or visual style of time selection inputs by setting rounded edges, curved corners, or smooth borders using CSS length values or predefined options like none, small, medium, large, or full to control the shape and appearance of time picker components for design consistency, UI refinement, and responsive styling across different devices and themes.
</div>

#### Example - sets the rounded value

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
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
How to adjust the size of Kendo UI TimePicker control? Adjust the dimensions, scale, and spacing of the time selection interface by configuring its size parameter, enabling users to set compact, standard, or expanded visuals that affect the control’s overall footprint and density. This customization supports options like small for minimal space usage, medium for balanced display, large for enhanced visibility, or none to disable sizing adjustments, helping tailor the time input widget's appearance to fit various design preferences, accessibility needs, UI scaling requirements, or responsive layouts. Developers often seek to control the visual weight, padding, or element proportions to optimize user interaction, configure compact or spacious time controls, or adapt the component size dynamically based on context or device form factors.
</div>

#### Example - sets a size

    <input id="timepicker" />
    <script>
    $("#datepicker").kendoDatePicker({
        size: "large"
    });
    </script>

### value `Date`*(default: null)*

Specifies the selected time.


<div class="meta-api-description">
How to set default time in Kendo UI TimePicker? Set, get, or control the chosen time value in a time selection input, enabling reading or updating the selected hour and minute as a JavaScript Date object or clearing the selection with null; use this to initialize, programmatically change, or retrieve the currently displayed time in a time picker component, supporting time input handling, default time setting, user selection reading, value binding, and updating time programmatically.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        value: new Date(2011, 0, 1, 10, 30)
    });
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How do I dynamically change the time format in Kendo UI TimePicker widget? Accessing and modifying time picker settings dynamically, adjusting or retrieving configuration parameters during runtime, controlling initialization options and properties programmatically, reading current time selector values and their customization, updating or configuring time input behavior on the fly, managing and changing component settings after creation, enabling runtime customization of time selection features, setting or getting active time picker configurations, altering option objects that define the time widget’s behavior, handling time selection control parameters interactively.
</div>

#### Example - get options of the widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var options = timepicker.options;
    </script>

## Methods

### close

Closes the drop-down list of a TimePicker.


<div class="meta-api-description">
How do I programmatically close the time selection dropdown in Kendo UI TimePicker? Control or trigger the hiding, closing, or collapsing of a time selection dropdown or popup programmatically without changing the chosen time value, enabling dismissal of the time list on demand such as after selecting a time, clicking outside the popup, or cancelling the input, while maintaining focus on the time input field and managing user interface flows for time pickers, time dropdowns, or clock widgets.
</div>

#### Example

    <input id="timepicker" />
    <button id="close">Close</button>
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    $("#close").click(function() {
        timepicker.close();
    });
    </script>

### destroy
Prepares the **TimePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TimePicker element from DOM.


<div class="meta-api-description">
What is the best way to destroy a Kendo UI TimePicker widget? remove or destroy a time picker instance, clean up and release all associated resources and memory, detach event listeners and handlers bound to the time picker component, clear internal states and jQuery data attributes to prevent memory leaks, fully teardown and dispose of child or nested Kendo UI components linked to the time picker, prepare the widget to be safely removed from the page or DOM, control lifecycle and cleanup operations for time picker widgets, disable functionality and unbind events before manual DOM element deletion, finalize and reset the component for garbage collection, enable proper component disposal and prevent lingering data or event references after widget removal.
</div>

#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    // detach events
    timepicker.destroy();
    </script>

### enable

Enables or disables a TimePicker.


<div class="meta-api-description">
How can I programmatically make my Kendo UI TimePicker input field editable? Activate or deactivate the interactive input state of a time selection component by enabling or disabling user interaction, controlling whether the time input field is editable, focusable, and navigable via keyboard, allowing developers to programmatically toggle the ability for users to enter or adjust time values, switch between read-only and editable modes, and manage input accessibility and focus behavior dynamically after initialization.
</div>

#### Parameters

##### enable `Boolean`

Enables (**true** or undefined) or disables (**false**) a TimePicker.

#### Example - disable TimePicker widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.enable(false);
    </script>

#### Example - enable TimePicker widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.enable();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How do I prevent users from editing time values in a Kendo UI TimePicker component while still allowing form submission? Control or toggle the input lock state of a time selection component to prevent user edits while still ensuring the selected time value is submitted with a form; programmatically set the component to readonly mode to disable user modifications without disabling data posting, differentiate between disabling input entirely where values are excluded from form submission and readonly mode where values remain included, configure, enable, or check readonly state dynamically for time input elements to maintain form data integrity while restricting user changes.
</div>

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the TimePicker should be readonly or editable.

#### Example - make TimePicker widget readonly

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.readonly();
    </script>

#### Example - make TimePicker widget editable

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.readonly(false);
    </script>

### max

Gets or sets the maximum value of the TimePicker.


<div class="meta-api-description">
How do I set a maximum time limit for a Kendo UI TimePicker control? Control or configure the maximum allowable time selection, set upper time limits, retrieve or define the latest selectable hour and minute, enforce a cutoff time to prevent choosing times beyond a specific point, limit input range for time picking, adjust or get the maximum time constraint, specify or query the highest selectable time boundary, restrict time selection to no later than a given timestamp, manage time selection limits dynamically, and set or access the endpoint for the latest allowable time choices within time input controls.
</div>

#### Parameters

##### value `Date|String`

The maximum time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The maximum time value of a TimePicker.

#### Example - get the max value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var max = timepicker.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.max(new Date(2000, 0, 1, 22, 0, 0));
    </script>

#### Example - render all available hours

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.max(new Date(2000, 0, 1, 23, 30, 0));
    </script>

### min

Gets or sets the minimum value of the TimePicker.


<div class="meta-api-description">
How do I set a minimum time for selection in a Kendo UI TimePicker? Set or retrieve the earliest selectable or valid time for a time selection control, enabling configuration of minimum allowed hours and minutes, enforcing input validation to prevent choosing or typing times before the specified threshold, dynamically updating displayed times to block earlier selections, controlling the lower time boundary, defining start time limits, and adjusting allowed time ranges to restrict user input accordingly.
</div>

#### Parameters

##### value `Date|String`

The minimum time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The minimum time value of a TimePicker.

#### Example - get the min value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var min = timepicker.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the TimePicker

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.min(new Date(2000, 0, 1, 8, 0, 0));
    </script>

### open

Opens the drop-down list of a TimePicker.


<div class="meta-api-description">
How can I programmatically open the time selection dropdown in a Kendo UI TimePicker widget? Programmatically trigger or activate the time selection dropdown to show the list of available times without altering the current chosen time, enabling control over when the time options popup appears such as on focus, button click, or custom event, allowing dynamic opening of the time selection interface for user interaction or automated workflows.
</div>

#### Example

    <input id="timepicker" />
    <button id="open">Open</button>
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    $("#open").click(function() {
        timepicker.open();
    });
    </script>

### setOptions

Changes the initial TimePicker configuration.

**Value Behavior**

When `setOptions` is called, the value resolution follows a priority order:

- **Explicit value in setOptions**: If the `options` parameter contains a `value` property, this value takes precedence and updates the component's current value.
- **Initial value exists**: If the `options` parameter does not contain a `value` property, and the component was initialized with a `value`, the component reverts to the initial value, discarding any user-selected or programmatically set value.
- **No initial value**: If the `options` parameter does not contain a `value` property, and the component was initialized without a `value`, the component preserves the current value.


<div class="meta-api-description">
How do I dynamically change the time format in a Kendo UI TimePicker widget? Change or update the time picker configuration dynamically by applying new settings such as time format, minimum and maximum selectable times, step intervals, or other display and behavior options without rebuilding or reinitializing the component. Adjust time selection parameters, modify appearance or constraints at runtime, customize time input controls on the fly, set or override initial configuration, enable flexible updates to scheduling controls, or control timepicker options programmatically while the application is running.
</div>

#### Parameters

##### options `Object`

The new configuration options.


#### Example

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        min: new Date(2001, 0, 1, 8, 0, 0),
        max: new Date(2013, 0, 1, 18, 0, 0)
    });

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.setOptions({
        min: new Date(2013, 0, 1, 11, 30, 0),
        max: new Date(2013, 0, 1, 16, 30, 0)
    });
    </script>

### value

Gets or sets the value of the TimePicker.


<div class="meta-api-description">
How do I dynamically update the selected time in a Kendo UI TimePicker component? Retrieve, update, configure, or programmatically control the selected time in a time selection component by getting or setting its current value; use this method to read the chosen time, assign a new time programmatically, bind the time picker’s selection to application state, initialize the displayed time, synchronize user input with internal data, update the time dynamically, or query the component’s time setting for use in logic or display.
</div>

#### Parameters

##### value `Date|String`

The time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The time value of a TimePicker.

> * This method **does not trigger** [change](/api/javascript/ui/timepicker/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");
    timepicker.value(new Date(2016, 10, 1));
    timepicker.trigger("change");
    </script>

#### Example - gets the value of the widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        value: "10:00 AM"
    });

    var timepicker = $("#timepicker").data("kendoTimePicker");

    var value = timepicker.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - sets the value of the widget

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.value("10:00 AM");
    </script>

## Events

### change

Fires when the selected date is changed


<div class="meta-api-description">
How do I detect when the user changes the selected time in a Kendo UI TimePicker? Detect when the user updates or modifies the selected time in a time selection component, triggering custom logic to handle time changes, input validation, UI updates, state synchronization, or model binding in response to user interaction. Capture and respond to events signaling selection changes, implement listeners or handlers that receive the new time value, track user adjustments to time inputs, respond dynamically to time picker modifications, and integrate time selection changes with application data flow or reactive interfaces.
</div>

#### Event Data

##### e.sender `kendo.ui.TimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the timepicker
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the timepicker
    });
    </script>

### close

Fires when the time drop-down list is closed


<div class="meta-api-description">
What event is triggered when the time selection dropdown or popup closes in a Kendo UI TimePicker widget? Detect when the time selection dropdown or popup finishes closing to trigger actions like validating or updating the chosen time, shifting keyboard focus, logging user interactions, syncing UI elements after hiding time options, or initiating any follow-up processes once the time list is dismissed by the user or programmatically.
</div>

#### Event Data

##### e.sender `kendo.ui.TimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the time drop-down list is opened


<div class="meta-api-description">
What event is triggered when the time selection dropdown of a Kendo UI TimePicker becomes visible? Detect when the time selection dropdown or clock interface becomes visible and trigger custom actions such as initializing list elements, setting focus, updating dynamic content, running initialization logic, responding to user interface changes, or executing side effects upon the time picker’s display opening event, allowing developers to handle dropdown activation, component visibility changes, user interaction starts, and related event-driven programming around time input controls.
</div>

#### Event Data

##### e.sender `kendo.ui.TimePicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker();

    var timepicker = $("#timepicker").data("kendoTimePicker");

    timepicker.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });
    </script>
