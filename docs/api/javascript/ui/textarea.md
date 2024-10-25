---
title: TextArea
description: Configuration, methods and events of the Kendo UI TextArea
description: Code examples and tips how to configure TextArea widget, use available methods and events.
res_type: api
component: textarea
---

# kendo.ui.TextArea

Represents the Kendo UI TextArea widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            rows:20,
            enable: false
        })
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        fillMode: "flat"
    });
    </script>


### layoutFlow `String` *(default: "vertical")*

This option is used to specify the layout flow of the component. Can also be set to the following string values: `vertical` or `horizontal`.

#### Example - specify layout flow

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            layoutFlow: "horizontal"
        })
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the textarea. If the textarea has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            label: "Description"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: function() {
                    return "First name";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: {
                    content: "First name"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: {
                    content: function() {
                        return "First name";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/textarea/methods/value) method **does not trigger** the `focusout` event of the textarea.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#description").data("kendoTextArea").floatingLabel.refresh();`

#### Example - create a floating label

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: {
                    content: "First name",
                    floating: true
                }
        })
    </script>

### maxLength `Number` *(default: null)*

The maximum number of characters that the user can enter.

#### Example - specify max length

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            maxLength: 200
        })
    </script>

### overflow `String`*(default: "auto")*

Sets a value controlling how the overflow of the textarea is applied. Can also be set to the following string values:

- "auto"
- "hidden"
- "visible"
- "scroll"
- "clip"
- "none"

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        overflow: "visible"
    });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                placeholder: "Enter value ..."
        })
    </script>


### prefixOptions `Object`

The configuration for the prefix adornment of the component.

#### Example - specify prefix adornment template

    <textarea id="prefix"></textarea>
    <script>
        $("#prefix").kendoTextArea({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        });
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.

#### Example - specify prefix adornment template

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        })
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify prefix adornment icon

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            prefixOptions: {
                icon: "pencil"
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.

#### Example - specify prefix adornment separator

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`,
                separator: false
            }
        })
    </script>

### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.

#### Example - make the widget readonly

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                readonly: true
        })
    </script>

### resize `String`*(default: "none")*

Sets a value controlling how the resize is applied. Can also be set to the following string values:

- "both"
- "horizontal"
- "vertical"
- "none"

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        resize: "both"
    });
    </script>

### rows `Number` *(default: 1)*

The number of visible text lines for the control.

#### Example - specify widget height

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                rows: 10
        })
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        rounded: "large"
    });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.

#### Example - specify suffix adornment template

    <textarea id="suffix"></textarea>
    <script>
        $("#suffix").kendoTextArea({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify suffix adornment icon

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.

#### Example - specify suffix adornment template

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.

#### Example - specify suffix adornment separator

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`,
                separator: false
            }
        })
    </script>


### value `String`*(default: "")*

The value of the widget.

#### Example - specify value of the widget

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                value: "Best offer in the area!"
        })
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        size: "large",
        rounded: "large"
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example - destroy  the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');
        textarea.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If `true`, the widget will be enabled. If `false`, the widget will be disabled.

#### Example - enable the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea({
            enable: false
        }).data('kendoTextArea');
        textarea.enable(true);
    </script>

#### Example - disable the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');
        textarea.enable(false);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');
        textarea.focus();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea({
            readonly:true
        }).data('kendoTextArea');

        textarea.readonly(false);
    </script>

#### Example - make the widget readonly

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/textarea/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

> **Important:** This method **does not trigger** the `focusout` event of the textarea.
This can affect the [floating label functionality](/api/javascript/ui/textarea/configuration/label.floating).
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#textarea").data("kendoTextArea").floatingLabel.refresh();`

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - trigger the change event after setting the value

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.value("new value");
        textarea.trigger("change");
    </script>

#### Example - set and get the value of the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea({
            value: "a very good description"
        }).data('kendoTextArea');
        var value = textarea.value();

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "a very good description"
        textarea.value("even better description");
        value = textarea.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "even better description"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.TextArea`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            change: function(e){
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        })
    </script>


#### Example - subscribe to the "change" event after initialization

    <textarea id="description"></textarea>
    <script>
        function textarea_change(e) {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };

        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.bind("change", textarea_change)
    </script>
