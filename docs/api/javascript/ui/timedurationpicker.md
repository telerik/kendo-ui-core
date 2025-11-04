---
title: TimeDurationPicker
page_title: Configuration, methods and events of the Kendo UI TimeDurationPicker
description: Code examples and tips how to configure TimeDurationPicker widget, use available methods and events.
res_type: api
component: timedurationpicker
---

# kendo.ui.TimeDurationPicker

Represents the Kendo UI TimeDurationPicker widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How can I configure the adaptive mode for a TimeDurationPicker in Kendo UI? Configure how the time duration selector adjusts or scales its display and interaction for various screen sizes, devices, and environments, including options to enable or disable automatic adaptation, responsive layouts, or dynamic rendering modes that optimize usability on mobile, tablet, desktop, or varying resolutions, controlling whether the component remains fixed or shifts to a device-appropriate interface automatically or stays static.
</div>

#### Example

    <div id="timedurationpicker"></div>
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        adaptiveMode: "auto",
        columns: [ "hours", "minutes" ]
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize the title label in a TimeDurationPicker when switching to adaptive layout? Customize or set the header text, title label, or caption displayed when a time duration selector transitions to responsive, mobile, or adaptive layouts, enabling control over the displayed heading in compact or flexible UI modes. Adjust, configure, or override the title shown during adaptive or small-screen views to fit branding, localization, or user experience needs when the component switches to its condensed or mobile-friendly format. This includes controlling the displayed text in responsive mode, dynamic layout changes, or adaptable UI states for time duration picking interfaces.
</div>

#### Example

    <div id="timedurationpicker"></div>
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Duration",
        columns: [ "hours", "minutes" ]
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I change the subtitle text on a TimeDurationPicker in adaptive mode? Customize or configure the subtitle text displayed in the responsive or adaptive mode of a time duration picker control, enabling developers to set, change, localize, update, or control the smaller-screen explanatory or contextual text shown during component initialization or runtime for improved user guidance on compact or mobile layouts.
</div>

#### Example

    <div id="timedurationpicker"></div>
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Duration",
        adaptiveSubtitle: "Choose hours and minutes",
        columns: [ "hours", "minutes" ]
    });
    </script>

### columns `Array`

The configuration of the picker columns. An array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
a predifined column with defaulted values for the particular time unit.


<div class="meta-api-description">
How to configure custom time units in Kendo UI TimeDurationPicker? Configure and control the arrangement and behavior of time selection units such as hours, minutes, and seconds by setting custom or predefined column options during initialization. Enable the picker to display specific time components by specifying arrays containing strings for standard time units or detailed objects for tailored column settings, allowing flexible customization of time input fields, time value granularity, and unit visibility. Adjust, set, or define individual time columns to manage how users select and interact with different duration segments, supporting varied formatting, ordering, and unit subsets for duration or time interval selection interfaces.
</div>

#### Example - specify width

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ]
        })
    </script>

### columns.format `String`

The format that will be used to display the column value in the input. The amount of `#` symbols should be equal to the largest amount of digits that the time unit can hold.


<div class="meta-api-description">
How to customize time duration format in Kendo UI TimeDurationPicker? Customize the display and input format for time duration fields by defining digit placeholders that determine how many numeric positions appear for each time unit, enabling precise control over how hours, minutes, or seconds are shown or entered, including setting fixed-width digit counts, controlling leading zeros or flexible digit lengths, adjusting parsing behavior for varied time components, formatting column values for consistent user input, and configuring visual and input patterns to match expected numeric ranges and ensure accurate time duration representation.
</div>

#### Example - specify width

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", format: "## hh" }, "minutes" ]
        })
    </script>

### columns.max `Number`

Sets the maximum time unit value.


<div class="meta-api-description">
How do I set a maximum value for hours in a Kendo UI TimeDurationPicker? Set or configure the maximum allowable value for time units like hours, minutes, or seconds in a duration picker, specifying the upper limit for selectable time increments, controlling input bounds, validation constraints, and user selection range in time duration controls.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", max : 12 }, "minutes" ]
        })
    </script>

### columns.min `Number`

Sets the minimum time unit value.


<div class="meta-api-description">
How do I set a minimum allowed value for hours in a Kendo UI time duration picker? Set or configure the minimum allowed value for individual time units such as hours, minutes, or seconds in a duration picker to restrict user input and selection below a specified lower limit; control and enforce minimum bounds during input, scrolling, validation, or selection processes to prevent values less than the defined threshold and ensure time values adhere to desired constraints in time duration settings.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", min : 12 }, "minutes" ]
        })
    </script>

### columns.name `String`

Specifies the name of the time unit the column will hold. Can be set to the following values:

- "days"
- "hours"
- "minutes"
- "seconds"
- "milliseconds"


<div class="meta-api-description">
How do I configure the duration columns in a Kendo UI TimeDurationPicker to display specific time units? Configure, select, or control the specific time unit represented in each duration column, such as days, hours, minutes, seconds, or milliseconds, to display, bind, or edit precise parts of a time interval in customizable duration pickers or time input fields. Enable setting or specifying time components, adjust individual time segments, and manipulate units of elapsed time for duration handling, timer inputs, or interval editing in user interfaces where granular control over temporal measurements is needed.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", min : 12 }, "minutes" ]
        })
    </script>

### columns.step `Number`

Specifies the value used to increment or decrement the column value


<div class="meta-api-description">
How do I configure the step size for each column in a TimeDurationPicker? Adjust or configure the incremental amount by which a time duration selection column increases or decreases with each user interaction, enabling fine-tuning of the adjustment granularity such as setting small precise steps or larger jumps in hours, minutes, or seconds values. Customize, control, or set the numeric stepping interval during initialization to determine how much each column value updates when navigating or modifying duration inputs, supporting both detailed and broad changes in time input controls.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ { name: "hours", step : 2 }, "minutes" ]
        })
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How do I configure a Kendo UI TimeDurationPicker to accept user input? Configure whether the time duration selector accepts or blocks user input, toggle interaction to enable or disable the duration picker control, activate or deactivate the component to allow or prevent users from setting or adjusting time intervals, manage input availability for time span selection, and set the picker to be interactive or read-only, controlling if users can enter or modify duration values during initialization or runtime.
</div>

#### Example - disable the widget

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        enable: false
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"


<div class="meta-api-description">
How do I customize the fill style for duration bars in a TimeDurationPicker? Adjust color rendering styles for duration selection elements by configuring fill behavior to solid, flat, outline, or no fill, enabling customization of how duration intervals are visually highlighted, styled, or colored in time duration controls. Control whether segments appear fully filled, with flat shading, outlined borders, or transparent backgrounds, tailoring the visual emphasis and user interface appearance of duration pickers. Set or control the fill style applied to duration bars or elements to modify UI color schemes, transparency, and accentuation.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        fillMode: "flat"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I customize the on-screen keyboard for TimeDurationPicker input fields? Control or configure the type of on-screen keyboard or input method shown when entering time duration values by setting input modes such as numeric, decimal, telephone keypad, text, email, search, or URL keyboards to improve user input experience on mobile and touch devices, enabling optimized, context-appropriate keyboard layouts for number-only, decimal numbers, phone numbers, email addresses, search queries, or web URLs when focusing on time duration input fields.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        inputMode: "numeric",
        columns: [ "hours", "minutes" ]
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How to customize time duration picker messages in Kendo UI for jQuery? Customize, translate, or override user interface text strings for time duration selection components, enabling localization of labels, prompts, button text, and messages displayed in duration pickers; configure language, provide custom wording, adapt UI text for different locales, control display text in timers or interval selectors, and set up internationalization or multi-language support for time duration input controls.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        "messages": {
            "set": "Apply"
        }
     })
    </script>

### messages.cancel `String` *(default: "Cancel")*

Allows customization of the cancel button inside the popup.


<div class="meta-api-description">
How do I change the cancel button label in Kendo UI's Time Duration Picker widget? Adjust or set the text label for the cancel button in time duration selection popups, enabling localization, custom messaging, or changing default button wording in duration pickers, time interval selectors, or countdown controls where users need clear cancel or abort actions.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        "messages": {
            "cancel": "Abort"
        }
     })
    </script>

### messages.days `String` *(default: "Days")*

Sets the title of the days column in the popup


<div class="meta-api-description">
How do I customize the label for the days column in a Kendo UI TimeDurationPicker? Customize or localize the label for the days column in a time duration selection interface, enabling you to configure, rename, or translate the days header in the duration picker popup, control the display text for day units, set custom text for day intervals, and adapt the days label to different languages or terminology within duration or time span inputs.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "days", "hours" ],
        "messages": {
            "days": "The days"
        }
     })
    </script>

### messages.hours `String` *(default: "Hours")*

Sets the title of the hours column in the popup


<div class="meta-api-description">
How do I customize the hours label in a TimeDurationPicker? Set or customize the label, heading, or title text displayed for the hours selection column within a time duration picker interface, enabling control over how the hours segment is identified or presented in popups, dialogs, or dropdown selectors when choosing or configuring time intervals, durations, or time spans.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "days", "hours" ],
        "messages": {
            "hours": "The hours"
        }
     })
    </script>

### messages.milliseconds `String` *(default: "Milliseconds")*

Sets the title of the milliseconds column in the popup


<div class="meta-api-description">
How to localize the milliseconds label in Kendo UI TimeDurationPicker? Set or customize the label, header, or title text for the milliseconds field in a time duration input, timer, or countdown selector to display localized or translated names for the milliseconds column in user interface components that allow precise time selection or duration input. Adjust, configure, or override the milliseconds display name shown in popups, dialogs, or dropdowns for time duration pickers, countdown timers, or stopwatch interfaces where users specify or view durations with millisecond precision.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "seconds", "milliseconds" ],
        "messages": {
            "milliseconds": "The milliseconds"
        }
     })
    </script>

### messages.minutes `String` *(default: "Minutes")*

Sets the title of the minutes column in the popup


<div class="meta-api-description">
How can I customize the label for the minutes section in a Kendo UI TimeDurationPicker? Set or customize the label, title, or heading text for the minutes section, column, or field in time duration selection interfaces, including configuring displayed minute units, adjusting minute labels, modifying the minutes header in pop-ups or dropdowns, managing minute segment titles, and controlling how minute values are presented or named within time duration pickers or input components.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        "messages": {
            "minutes": "The minutes"
        }
     })
    </script>

### messages.seconds `String` *(default: "Seconds")*

Sets the title of the seconds column in the popup


<div class="meta-api-description">
How do I customize the label for seconds in Kendo UI's TimeDurationPicker? Set or customize the label, title, or header text for the seconds segment or seconds column in a time duration selector, duration input, or time picker popup, including localization, language support, and adjusting the displayed caption for seconds within duration or time interval controls.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "seconds", "minutes" ],
        "messages": {
            "seconds": "The seconds"
        }
     })
    </script>

### messages.set `String` *(default: "Set")*

Sets the title of the set button in the popup


<div class="meta-api-description">
How do I customize the labels on the time duration selection popup in Kendo UI's TimeDurationPicker widget? Customize the label, text, or caption of the confirm, apply, or set action button displayed in the time duration selection popup, enabling developers to configure, rename, or localize the button that users click to finalize or confirm their chosen time interval, duration, or period within the picker interface.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "seconds", "minutes" ],
        "messages": {
            "set": "Set Time"
        }
     })
    </script>


### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.


<div class="meta-api-description">
How do I make a TimeDurationPicker uneditable in Kendo UI? Control whether the time duration input is fixed and uneditable by disabling user changes, preventing typing, editing, or adjustments in the interface; configure to make the duration selection read-only, non-interactive, locked, or immutable so users cannot modify or input new values, ideal for displaying preset values without allowing edits, ensuring the timer or duration field remains static, disabled from input or interaction for scenarios requiring unchangeable time spans or fixed intervals.
</div>

#### Example - make the widget readonly

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        value: 5400000,
        readonly: true
    });
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"


<div class="meta-api-description">
How do I adjust the border radius of a TimeDurationPicker in Kendo UI for jQuery? Adjust the border radius or corner rounding of the time duration selector UI by specifying exact radius values or choosing preset shape options like small, medium, large, full, or none to customize the roundness and style of the component edges. Configure, set, or control the curved appearance of the selection input’s corners to match design requirements, enabling smooth, sharp, or fully rounded edges according to user interface preferences or accessibility needs. Tailor the roundness level for the time picker’s visual container by using either numeric radius inputs or predefined keywords for quick, consistent corner shaping in various layout contexts.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        rounded: "large"
    });
    </script>

### separator `String` *(default: ',')*

Sets a string value that is used to devide the different column values inside the input. The value must be a **single character**, you cannot use more than one character as a separator.


<div class="meta-api-description">
How do I change the separator in Kendo UI TimeDurationPicker to use a colon instead of a dash? Configure the single-character delimiter or symbol that divides hours, minutes, and seconds within a duration input field, enabling customization of the time segment separators in timers, time pickers, or duration selectors; control and set the character used as the divider between different time units such as colons, dots, dashes, or other single-character marks to adjust the visual layout and formatting of input values for hours, minutes, and seconds.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        separator: ":"
    });
    </script>

### shortcuts `Array`

An array of buttons that hold certain timeframe values and will be displayed in the popup


<div class="meta-api-description">
How to enable quick time interval selection in Kendo UI TimeDurationPicker widget? Enable quick selection of common time intervals or durations by configuring preset buttons that users can tap or click to instantly apply predefined time ranges. Customize, set, or control shortcut options for selecting time periods rapidly within a duration picker interface. Support fast access to frequently used time spans, define arrays of typical durations, implement one-click timeframe picks, and programmatically manage quick-select buttons for user-friendly time range selection in scheduling, timers, filters, or date range inputs.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 },
            { text: "2h", value: 7200000  }
        ]
    });
    </script>

### shortcuts.text `String`

The text that will be displayed in the button


<div class="meta-api-description">
How to customize the text on shortcut buttons in Kendo UI TimeDurationPicker? Set, customize, or configure the text label displayed on shortcut buttons within a time duration selector to modify default button names, add localized strings for different languages, change button captions for clarity, rename quick-select options, adjust shortcuts for improved user interface, update action button text for better user understanding, or tailor shortcut labels to specific time intervals and contexts in duration picking components.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 },
            { text: "2h", value: 7200000  }
        ]
    });
    </script>

### shortcuts.value `Number`

The value of the timeframe in milliseconds


<div class="meta-api-description">
How to set custom time intervals in Kendo UI TimeDurationPicker using numeric millisecond values? Specify, retrieve, or configure preset time intervals as numeric millisecond values for quick selection or comparison within duration pickers, enabling precise control over shortcut timeframes, setting custom time spans, defining duration lengths programmatically, working with time intervals in milliseconds for binding or updating shortcut presets during initialization or runtime, and facilitating calculations or adjustments to shortcut durations in various time-based user interface components.
</div>

#### Example

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 },
            { text: "2h", value: 7200000  }
        ]
    });
    </script>

### value `Number`

The value of the widget in milliseconds


<div class="meta-api-description">
How do I set the duration value in a Kendo UI TimeDurationPicker component? Configure, retrieve, update, or bind the duration expressed as a numeric millisecond count to represent elapsed time spans, intervals, or countdowns within a time duration selector component. Adjust or read the duration value programmatically to set initial intervals, modify timers, control elapsed times, convert between milliseconds and user-visible durations, or dynamically change time intervals in applications requiring precise temporal measurements or countdown functionalities.
</div>

#### Example - specify value of the widget

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        value: 5400000
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How do I adjust the size of a Kendo UI TimeDurationPicker component? Adjust or configure the visual scale, dimensions, or compactness of a time duration input component by selecting preset size options like small, medium, large, or none to control layout density, overall footprint, and styling proportions during component setup or initialization.
</div>

#### Example - sets a size

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        size: "large"
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly dispose of a Kendo UI TimeDurationPicker instance to prevent memory leaks? Clear all event listeners, remove stored data, and invoke cleanup routines on nested components to fully dispose of the time duration picker instance, preventing memory leaks and ensuring safe component teardown without deleting the underlying DOM element; this process handles detaching handlers, clearing internal references, and recursively destroying child widgets for reliable resource release and proper component lifecycle termination.
</div>

#### Example - destroy  the widget

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] } ).data('kendoTimeDurationPicker');
        picker.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I programmatically enable or disable user interaction with the TimeDurationPicker in Kendo UI for jQuery? Activate or deactivate the ability for users to interact with the time duration selector by toggling its input acceptance and visual enabled or disabled state, controlling whether the component processes user actions, receives input, or appears interactive on forms and interfaces through programmatic methods to set it enabled or disabled.
</div>

#### Parameters

##### enable `Boolean`

If `true`, the widget will be enabled. If `false`, the widget will be disabled.

#### Example - enable the widget

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ],
            enable: false
        }).data('kendoTimeDurationPicker');
        picker.enable(true);
    </script>

#### Example - disable the widget

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ],
            enable: false
        }).data('kendoTimeDurationPicker');
        picker.enable(false);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How to set time duration input as read-only in Kendo UI? Control or toggle a time duration input component’s ability to block user input while still including its current value in form submissions, enabling the setting of a read-only mode that prevents edits but ensures the value is sent with the form data, distinguishable from disabling which stops the value from being posted; dynamically enable or disable this non-editable state at runtime to manage user interaction for duration inputs without losing submitted data.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            readonly: true,
            columns: [ "hours", "minutes" ]
        }).data('kendoTimeDurationPicker');

        picker.readonly(false);
    </script>

#### Example - make the widget readonly

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ]
        }).data('kendoTimeDurationPicker');

        picker.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/textarea/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.


<div class="meta-api-description">
How do I programmatically get/set the time duration value in a Kendo UI TimeDurationPicker control? Retrieve or assign the current duration value programmatically in a time duration selector control, enabling reading or updating the chosen time span without firing change events or automatically updating bound models, which may require manually triggering change notifications or event listeners to synchronize updates in MVVM or data binding scenarios, including configuring or controlling the selected interval, adjusting the time length dynamically, setting or getting the user-selected duration value, and handling asynchronous or manual updates to maintain state consistency.
</div>

#### Parameters

##### value `Number`

The value to set in milliseconds.

#### Returns

`Number` the value of the widget.

#### Example - trigger the change event after setting the value

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ]
        }).data('kendoTimeDurationPicker');

        picker.value(5400000);
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How to handle user-modified time duration input events in Kendo UI TimeDurationPicker? Capture and handle user-modified time duration input events when the duration value changes interactively, enabling validation of user edits, updating application state, triggering UI refreshes, responding to manual adjustments of time periods, detecting changes initiated by direct user interaction rather than code, and managing callbacks tied to duration edits for time pickers or timers within user interfaces.
</div>

#### Event Data

##### e.sender `kendo.ui.TimeDurationPicker`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="timedurationpicker" />
    <script>
        var picker = $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [ "hours", "minutes" ],
            change: function(e){
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        })
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="timedurationpicker" />
    <script>
        function picker_change(e) {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };

        var picker = $("#timedurationpicker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] }).data('kendoTimeDurationPicker');

        picker.bind("change", picker_change)
    </script>

### close

Fires when the popup  is closed


<div class="meta-api-description">
When is the event triggered in a Kendo UI TimeDurationPicker to indicate it has finished closing? Capture or listen for the event triggered when a time duration selector or popup finishes closing, enabling you to detect when the user stops interacting with the time input widget, update interfaces, save or persist the chosen time interval, restore keyboard focus to prior elements, execute cleanup routines, or run post-interaction logic. This event handler supports responding immediately after the popup closes, allowing you to manage UI state changes, finalize user selections, handle asynchronous tasks after hiding the picker, and coordinate workflows that depend on the user completing time duration input or cancelling out of the selection process.
</div>

#### Event Data

##### e.sender `kendo.ui.TimeDurationPicker`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="picker" />
    <script>
    $("#picker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] });

    var picker = $("#picker").data("kendoTimeDurationPicker");

    picker.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the time drop-down list is opened


<div class="meta-api-description">
How to trigger an event when a TimeDurationPicker dropdown becomes visible? Detect and respond to the moment when a time duration selector or dropdown becomes visible, enabling you to trigger custom actions, initialize settings, manage focus on inputs or elements, execute side effects like analytics or logging, and handle event data related to the opening of time selection controls; useful for developers wanting to listen for, intercept, or react to the activation or display of duration input dropdowns or pickers within user interfaces.
</div>

#### Event Data

##### e.sender `kendo.ui.TimeDurationPicker`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="picker" />
    <script>
    $("#picker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="picker" />
    <script>
    $("#picker").kendoTimeDurationPicker({ columns: [ "hours", "minutes" ] });

    var picker = $("#picker").data("kendoTimeDurationPicker");

    picker.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });
    </script>
