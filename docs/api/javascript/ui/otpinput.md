---
title: OTPInput
page_title: Configuration, methods and events of the Kendo UI OTPInput
description: Code examples and tips how to configure OTPInput widget, use available methods and events.
res_type: api
component: otpinput
---

# kendo.ui.OTPInput

Represents the Kendo UI OTPInput widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### type `String` *(default: "text")*

Sets type of the input. Can also be set to the following string values:

- "text"
- "number"
- "password"


<div class="meta-api-description">
How can I configure Kendo UI's OTPInput to accept only numeric input for secure codes? Set and customize the input mode to handle different character types by configuring whether the field accepts plain text characters, restricts input to numbers only for secure numeric codes, or masks entries to hide sensitive data like passwords or confidential one-time passcodes. Adjust input behavior to switch between normal text input, numeric keypad usage, or secure password-style dots or asterisks, enabling control over character visibility, input validation, and user experience in authentication flows or form fields requiring concealed or numeric-only input.
</div>

#### Example - sets the input type

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            type: "number"
        });
    </script>

### inputMode `String` *(default: "text")*

Sets the appearance of the keyboard for a devices with a virtual keyboard


<div class="meta-api-description">
How do I configure the virtual keyboard for an OTP input in Kendo UI? Control or configure the type of virtual keyboard displayed for one-time password or OTP entry by specifying input modes such as numeric, text, email, telephone keypad, or search keyboard. Enable optimized keyboard presentation on mobile or touch devices by setting input hints that influence the soft keyboard layout and behavior during secure code input. Customize the input experience to ensure users see the most appropriate keyboard type for entering OTPs, PINs, verification codes, or similar short strings, improving usability and input accuracy across platforms and input contexts.
</div>

#### Example - sets the input mode


    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            inputMode: "tel"
        });
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How can I prevent users from typing in the OTP input field? Control enabling or disabling user interaction with an input component designed for one-time password entry, allowing developers to set, toggle, or restrict input acceptance to prevent or allow user typing, editing, or focus. This control can be used to block input, lock the field, deactivate the OTP entry box, pause interactivity, or enable the input for entering verification codes. It supports use cases such as disabling input for security, conditional activation based on app state, or controlling whether users can type or edit one-time passcodes during authentication flows. The setting can be configured dynamically or at initialization to allow, forbid, permit, or suspend user input and interaction with the OTP input fields.
</div>

#### Example - disable the widget

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            enable: false
        });
    </script>

### readonly `Boolean` *(default: false)*

If set to `false`, the user will be will unable to enter values within the inputs. The widget is non-readonly by default and allows user input.


<div class="meta-api-description">
How to prevent users from editing OTP input fields in Kendo UI for jQuery? Configure the OTP input fields to enable or disable user editing by setting them as read-only or editable, controlling whether users can type or change values directly in the input boxes. Adjusting this setting restricts or permits manual input, blocking or allowing keyboard interaction with the one-time password fields, effectively toggling input acceptance for security, validation, or interface requirements. This option is useful to enforce fixed OTP values, prevent modification while displaying codes, or allow user entry depending on the application state or workflow.
</div>

#### Example - set the widget as readonly

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            readonly: true
        });
    </script>

### space `Boolean` *(default: false)*

If set to `true`, each of the input groups will not be concatenated with one another.


<div class="meta-api-description">
How do I prevent automatic joining of one-time password input segments in Kendo UI for jQuery? Control how one-time password inputs handle spacing between groups by configuring whether separate input segments stay distinct or merge into a single concatenated string; adjust settings to prevent automatic joining, keep individual OTP fields separate for precise value extraction, customize grouping and delimiting of input segments, enable or disable concatenation of adjacent inputs, manage data submission formats, and tailor how multi-part verification codes are read, parsed, or processed without combining segments unintentionally.
</div>

#### Example - set the spacing of the input groups

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            space: true
        });
    </script>

### separator `String|Function` *(default: null)*

Adds a separator for each of the input groups.

> The configuration can only be applied when the `items` configuration is declared in the form of an array.


<div class="meta-api-description">
How do I customize the separators between input fields in a Kendo UI OTPInput control? Control and customize visual dividers or separators between grouped input fields or segments in one-time password (OTP) or PIN input interfaces to enhance clarity and readability, enabling developers to set, enable, configure, or render separators that distinguish each input group or block within multi-part inputs, especially when inputs are organized as arrays or segmented fields, improving user interaction by clearly dividing PIN or OTP characters for better user experience and input accuracy.
</div>

#### Example - create a separator from a string

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: [
                {
                    groupLength: 3
                },
                {
                    groupLength: 2
                }
            ],
            separator: "-"
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a separator from a function

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: [
                {
                    groupLength: 3
                },
                {
                    groupLength: 2
                }
            ],
            separator: () => kendo.ui.icon({icon: "star", type: "svg"})
        });
    </script>

### items `Number|Array` *(default: null)*

Sets the Otp Input's items configuration.


<div class="meta-api-description">
How can I customize each input field in an OTPInput widget? Set up and customize each input box within a one-time password (OTP) entry field by defining a collection of individual input configurations, allowing control over placeholder text, predefined values, input behavior, focus handling, per-character settings, and validation rules for every OTP digit cell. Enable configuring each segment of the multi-input OTP interface separately to control appearance, default content, input type restrictions, and user input flow. Tailor each entry field’s parameters to match specific formatting, masking, or interaction patterns required when capturing multi-part codes or verification tokens in a secure and user-friendly manner.
</div>

#### Example - create input groups through a number.

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
    </script>

### items.groupLength `Number`

Sets each of the input groups's length when created through an array.


<div class="meta-api-description">
How can I configure the length of each character group within multiple input segments in Kendo UI for jQuery OTPInput? Control and configure the length of each character group within multiple input segments by setting the number of characters accepted per group, enabling customization of input field segmentation, grouping input characters into fixed-size chunks, adjusting how many characters each segment or item accepts, defining the size of input blocks when splitting input across groups, specifying the per-group character count in multi-part inputs, managing group size during initialization, setting chunk lengths for array-based input items, and tailoring the input grouping to fit requirements for segmented input fields or grouped text entry.
</div>

#### Example - create input groups through an array.

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: [
                {
                    groupLength: 3
                },
                {
                    groupLength: 2
                }
            ]
        });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when the inputs are empty. Not set by default.


<div class="meta-api-description">
How do I set the placeholder text for a Kendo UI OTPInput widget? Set or customize the hint text, placeholder, or prompt shown inside empty input fields or boxes when no user input is present; control the initial display message, default text, or guiding label in one-time password inputs, verification code fields, or any form inputs to improve user guidance, onboarding, or UI clarity before any characters are entered.
</div>

#### Example - specify placeholder

    <input id="otpInput" />
    <script>
        $("#otpInput").kendoOTPInput({
            items: 3,
            type: "number",
            placeholder: "0-9"
        });
    </script>

### value `String`*(default: "")*

The value of the widget.


<div class="meta-api-description">
How to read the current OTP code entered in a Kendo UI OTPInput field? Control, retrieve, or assign the current code entered in a one-time password input field, enabling reading or updating the full OTP string for validation, data binding, or dynamic changes; supports setting, configuring, fetching, or synchronizing the entire multi-digit authentication or verification code, including empty or partial inputs, to manage user input programmatically or reactively within security forms.
</div>

#### Example - specify value of the widget

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            value: "123"
        });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How do I adjust the size of an OTPInput in Kendo UI for jQuery? Adjust or define the visual dimensions of one-time password input fields by configuring size parameters to control height, width, and overall display scale; customize the input box scale with presets like small, medium, large, or no size formatting, or specify exact size values to fit design requirements; manage input field sizing for responsiveness, usability, and aesthetic consistency in forms where dimensional control of OTP input elements is essential.
</div>

#### Example - sets a size

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            size: "large"
        });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"


<div class="meta-api-description">
How can I customize the appearance of my Kendo UI OTP input field's cells? Configure color styling and visual appearance of one-time password input fields by controlling background fill, border outlines, and flat color application on each input cell, including options for solid colors, flat shading, outlined borders, or no color fill, enabling customization of how input boxes are visually highlighted or separated for better user interface clarity and emphasis in authentication forms.
</div>

#### Example - sets the fillMode

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            fillMode: "outline"
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
How do I customize the corner of an OTP input field in Kendo UI for jQuery? Adjust and customize the corner curvature of one-time password input fields by configuring the border radius with numeric values or predefined size options like small, medium, large, full, or none, enabling control over roundness, edge softness, and visual style of OTP input boxes to achieve desired UI appearance and user experience.
</div>

#### Example - sets the roundness

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            rounded: "full"
        });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly remove an OTP input component from my page to prevent memory leaks? clean up or teardown an OTP input component by detaching event listeners, clearing data attributes, releasing internal resources, removing attached handlers and child widget instances to prevent memory leaks and ensure safe removal from the page, resetting or disposing of associated interactive elements, unbinding events, and properly finalizing embedded components without deleting the underlying DOM element, enabling efficient resource management and avoiding residual state after the component is no longer needed or before programmatic removal.
</div>

#### Example - destroy  the widget

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I temporarily lock a Kendo UI OTPInput to prevent user input? Control whether the one-time passcode input field accepts user input by programmatically enabling or disabling its interactive state, allowing you to toggle input acceptance, block or allow editing, manage focus and validation flows, enforce conditional access or temporarily lock the input to prevent data entry, using methods to set the component as active or inactive for user interaction.
</div>

#### Parameters

##### enable `Boolean`

If set to `true`, the widget will be enabled. If set to `false`, the widget will be disabled.

#### Example - enable the widget

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            enable: false
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.enable(true);
    </script>

#### Example - disable the widget

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.enable(false);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How do I programmatically focus on the Kendo UI OTPInput field? Programmatically set or control input focus to the one-time password input field, enabling keyboard interaction, cursor placement, and user typing readiness, ideal for managing focus flow, accessibility, event-triggered focus shifts, auto-focusing after rendering, or handling keyboard navigation between multiple input components.
</div>

#### Example - focus the widget

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.focus();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How can I prevent users from editing my OTP input field while still submitting its value with the form data? Control or configure the OTP input field to block user editing without disabling the component, ensuring the current value remains submitted with the form data; toggle between read-only mode and editable mode to prevent changes while preserving input value for form submission, avoid user modifications yet still include the input value in HTTP requests, differentiate from disabling inputs that omit values from forms, use read-only settings to lock input fields dynamically while maintaining data postability, implement behaviors to make OTP fields non-editable but still send data during form processing.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.readonly(false);
    </script>

#### Example - make the widget readonly

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/otpinput/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.


<div class="meta-api-description">
How can I programmatically change the one-time password in a Kendo UI OTPInput widget? Access or modify the current input code programmatically, retrieve or set the one-time password (OTP) field content directly without triggering automatic change notifications or event listeners; control and update the entered verification code value in the component while managing event dispatch manually to synchronize model bindings or reactive states, useful for scripting input values, dynamic updates, or integrating with custom change detection and update flows.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - trigger the change event after setting the value

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
        
        var otpInput = $("#otpinput").getKendoOTPInput();
        otpInput.value("123");
        otpInput.trigger("change")
    </script>


#### Example - set and get the value of the widget

    <<input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            value: "foo"
        });
        var otpInput = $("#otpinput").getKendoOTPInput();
        var value = otpInput.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "foo"
        otpInput.value("123");
        value = otpInput.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "123"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How do I capture user input modifications in OTPInput fields? Capture user input modifications in one-time password or verification code fields to respond to changes interactively, such as updating interfaces, validating input dynamically, triggering form submissions, or executing custom logic whenever the user types or edits values manually. Listen for real-time change events that activate specifically on direct user input rather than programmatic updates, enabling responsive behavior tied to value alterations in multi-field PIN, OTP, or secure code entry components. Control and track user-driven value updates in authentication input elements for immediate feedback, validation checks, or conditional workflows triggered by typing, deleting, or pasting codes.
</div>

#### Event Data

##### e.sender `kendo.ui.OTPInput`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            change: function(e) {
                var value = this.value();
	            /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="otpinput" />
    <script>
        function otpChange(e) {
            var value = this.value();
	        /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };

        $("#otpinput").kendoOTPInput({
            items: 3
        });

        var otpInput = $("#otpinput").data("kendoOTPInput");
        otpInput.bind("change", otpChange);
    </script>

