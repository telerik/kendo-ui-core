---
title: RadioButton
page_title: Configuration, methods and events of Kendo UI RadioButton
description: How to quickly configure the checked and unchecked state of RadioButton widget.
res_type: api
component: radiobutton
---

# kendo.ui.RadioButton

Represents the Kendo UI RadioButton. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the RadioButton.

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false`, the RadioButton will be disabled and will not allow the user to change its checked state.

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            enabled: false
        });
    </script>

### encoded `Boolean` *(default: true)*

Determines whether the radio label content should be rendered as an HTML string or it should be encoded.

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            label: "<strong>Label one</strong>",
            encoded: false
        });
    </script>

### label `String`

Specifies the label content for the radio.

#### Example

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            label: "Label one"
        });
    </script>

### size `String` *(default: 'medium')*

Sets a value controlling the size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- null

#### Example

    <input id="radio" />
    <script>
    $("#radio").kendoRadioButton({
        size: "large"
    });
    </script>

## Methods

### check

Gets or sets the checked state of the RadioButton.

#### Parameters

##### check `Boolean`

Checks or unchecks the RadioButton.

#### Returns

`Boolean` - The checked state of the RadioButton.

#### Example

    <input id="radio" />

    <script>
        var radioInstance = $("#radio").kendoRadioButton().data("kendoRadioButton");
        radioInstance.check(true);
    </script>

### toggle

Toggles the checked state of the RadioButton.

#### Example

    <input id="radio" />
    <button id="toggle">Toggle</button>

    <script>
        $("#radio").kendoRadioButton()

        $("#toggle").on("click", function () {
            var radioInstance = $("#radio").data("kendoRadioButton");
            // toggle the checked state of the radio.
            radioInstance.toggle();
        });
    </script>

### destroy

Prepares the RadioButton for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the RadioButton element from DOM.

#### Example

    <input id="radio" />

    <script>
        var radioInstance = $("#radio").kendoRadioButton().data("kendoRadioButton");
        radioInstance.destroy();
    </script>

### enable

Changes the enabled state of the RadioButton.

#### Parameters

##### enable `Boolean`

Enables or disables the RadioButton.

#### Example

    <input id="radio" />

    <script>
        var radioInstance = $("#radio").kendoRadioButton().data("kendoRadioButton");
        radioInstance.enable(false);
    </script>

## Events

### change

Fires when the checked state of the RadioButton is changed through user interaction.

#### Event Data

##### e.checked `Object`

The checked state of the RadioButton.

##### e.sender `kendo.ui.RadioButton`

The widget instance which fired the event.

#### Example - handling the change event

    <input id="radio" />

    <script>
        $("#radio").kendoRadioButton({
            change: function (e) {
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.checked);
            }
        });
    </script>
