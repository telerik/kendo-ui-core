---
title: TextBox
description: Configuration, methods and events of the Kendo UI TextBox
description: Code examples and tips how to configure TextBox widget, use available methods and events.
res_type: api
component: textbox
---

# kendo.ui.TextBox

Represents the Kendo UI TextBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### clearButton `Boolean` *(default: false)*

If set to `true`, will render a button that can be used to clear the value.

#### Example - disable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            value: "John",
            clearButton: true
        });
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            enable: false
        });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"

#### Example - sets the fillMode

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        fillMode: "flat"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: "First name"
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: function() {
                return "First name";
            }
        });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: {
                content: "First name"
            }
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: {
                content: function() {
                    return "First name";
                }
            }
        });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/textbox/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#textbox").data("kendoTextBox").floatingLabel.refresh();`

#### Example - create a floating label

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: {
                content: "First name",
                floating: true
            }
        });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            placeholder: "Enter value ..."
        });
    </script>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.

#### Example - specify prefix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify prefix adornment icon

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                icon: "search"
            }
        })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.

#### Example - specify prefix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.

#### Example - specify prefix adornment separator

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.

#### Example - make the widget readonly

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
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

#### Example

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        rounded: "large"
    });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.

#### Example - specify suffix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify suffix adornment icon

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.

#### Example - specify suffix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.

#### Example - specify suffix adornment separator

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### value `String`*(default: "")*

The value of the widget.

#### Example - specify value of the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            value: "John Doe"
        });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        size: "large",
        rounded: "large"
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example - destroy  the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true`, the widget will be enabled. If set to `false`, the widget will be disabled.

#### Example - enable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            enable: false
        });
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.enable(true);
    </script>

#### Example - disable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.enable(false);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.focus();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            readonly: true
        });
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.readonly(false);
    </script>

#### Example - make the widget readonly

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/textbox/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

> **Important:** This method **does not trigger** the `focusout` event of the input.
This can affect the [floating label functionality](/api/javascript/ui/textbox/configuration/label.floating).
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#textbox").data("kendoTextBox").floatingLabel.refresh();`

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - trigger the change event after setting the value

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.value("new value");
        textbox.trigger("change");
    </script>

#### Example - set and get the value of the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            value: "Oranges"
        });
        var textbox = $("#textbox").data("kendoTextBox");
        var value = textbox.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "Oranges"
        textbox.value("Apples");
        value = textbox.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "Apples"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.TextBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            change: function(e) {
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="textbox" />
    <script>
        function textbox_change(e) {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.bind("change", textbox_change);
    </script>


The change event fires only once the value of widget is changed and the widget itself is blurred out. You can add a custom events/methods by extending the existing functionality of the TextBox. How to add a `keyup` event to the TextBox is demonstrated in [this article](/knowledge-base/textbox-add-keyup-event).
