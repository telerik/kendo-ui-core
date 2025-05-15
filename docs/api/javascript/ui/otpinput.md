---
title: OTPInput
description: Configuration, methods and events of the Kendo UI OTPInput
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

### Example - sets the input type

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            type: "number"
        });
    </script>

### inputMode `String` (default: "text")

Sets the appearance of the keyboard for a devices with a virtual keyboard

### Example - sets the input mode


    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3,
            inputMode: "tel"
        });
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

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

### Example - set the spacing of the input groups

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

#### Example - create input groups through a number.

    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: 3
        });
    </script>

### items.groupLength `Number`

Sets each of the input groups's length when created through an array.

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

### Example - sets the fillMode

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

