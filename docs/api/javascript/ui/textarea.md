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

### cols `Number` *(default: 20)*

The visible width of the text control, in average character widths.

#### Example - specify width

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            rows:20,
            cols:30,
            resizable: "vertical"
        })
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            rows:20,
            cols:30,
            enable: false
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


The function context (available via the `this` keyword) will be set to the widget instance.

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

The function context (available via the `this` keyword) will be set to the widget instance.

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
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#description").data("kendoTextArea").floatingLabel.refresh();`

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

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                placeholder: "Enter value ..."
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

### resizable `String` *(default: "none")*

Defines if (and how) the widget is resizable by the user.

Can also be set to the following string values:

- "none" - default value. The user cannot resize the widget.
- "both" - the user can resize both the height and width of the widget.
- "horizontal" - the user can resize the width of the widget.
- "vertical" - the user can resize the height of the widget.

#### Example - make both height and width resizable

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                resizable: "both"
        })
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

### value `String`*(default: "")*

The value of the widget.

#### Example - specify value of the widget

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                value: "Best offer in the area!"
        })
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
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

> **Important:** This method **does not trigger** the `focusout` event of the textarea.
This could affect the [floating label functionality](/api/javascript/ui/textarea/configuration/label.floating).
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#textarea").data("kendoTextArea").floatingLabel.refresh();`

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

        console.log(value); // Displays "a very good description"
        textarea.value("even better description");
        value = textarea.value();
        console.log(value); // Displays "even better description"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
            console.log(value);
            // Use the value of the widget
        };

        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.bind("change", textarea_change)
    </script>
