---
title: CheckBox
page_title: Configuration, methods and events of Kendo UI CheckBox
description: How to quickly configure the checked and unchecked state of CheckBox widget.
res_type: api
component: checkbox
---

# kendo.ui.CheckBox

Represents the Kendo UI CheckBox. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the CheckBox.

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false`, the CheckBox will be disabled and will not allow the user to change its checked state.

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            enabled: false
        });
    </script>

### encoded `Boolean` *(default: true)*

Determines whether the checkbox label content should be rendered as an HTML string or it should be encoded.

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            label: "<strong>Label one</strong>",
            encoded: false
        });
    </script>

### label `String`

Specifies the label content for the checkbox.

#### Example

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            label: "Label one"
        });
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the component input element border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- null

#### Example

    <input id="checkbox" />
    <script>
    $("#checkbox").kendoCheckBox({
        rounded: "small"
    });
    </script>

### size `String` *(default: 'medium')*

Sets a value controlling the size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- null

#### Example

    <input id="checkbox" />
    <script>
    $("#checkbox").kendoCheckBox({
        size: "large"
    });
    </script>

## Methods

### check

Gets or sets the checked state of the CheckBox.

#### Parameters

##### check `Boolean`

Checks or unchecks the CheckBox.

#### Returns

`Boolean` - The checked state of the CheckBox.

#### Example

    <input id="checkbox" />

    <script>
        var checkboxInstance = $("#checkbox").kendoCheckBox().data("kendoCheckBox");
        checkboxInstance.check(true);
    </script>

### toggle

Toggles the checked state of the CheckBox.

#### Example

    <input id="checkbox" />
    <button id="toggle">Toggle</button>

    <script>
        $("#checkbox").kendoCheckBox()

        $("#toggle").on("click", function () {
            var checkboxInstance = $("#checkbox").data("kendoCheckBox");
            // toggle the checked state of the checkbox.
            checkboxInstance.toggle();
        });
    </script>

### destroy

Prepares the CheckBox for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the CheckBox element from DOM.

#### Example

    <input id="checkbox" />

    <script>
        var checkboxInstance = $("#checkbox").kendoCheckBox().data("kendoCheckBox");
        checkboxInstance.destroy();
    </script>

### enable

Changes the enabled state of the CheckBox.

#### Parameters

##### enable `Boolean`

Enables or disables the CheckBox.

#### Example

    <input id="checkbox" />

    <script>
        var checkboxInstance = $("#checkbox").kendoCheckBox().data("kendoCheckBox");
        checkboxInstance.enable(false);
    </script>

## Events

### change

Fires when the checked state of the CheckBox is changed through user interaction.

#### Event Data

##### e.checked `Object`

The checked state of the CheckBox.

##### e.sender `kendo.ui.CheckBox`

The widget instance which fired the event.

#### Example - handling the change event

    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            change: function (e) {
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.checked);
            }
        });
    </script>
