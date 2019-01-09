---
title: Switch
page_title: Configuration, methods and events of Kendo UI Switch
description: How to quickly configure the checked and unchecked state of Switch widget.
res_type: api
component: switch
---

# kendo.ui.Switch

Represents the Kendo UI Switch. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the widget.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow the user to change its checked state.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            enabled: false
        });
    </script>

### readonly `Boolean`*(default: false)*

If set to `true` the Kendo UI Switch will render into its read-only state.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            readonly: true
        });
    </script>

### messages `Object`

Defines the text of the `checked` and `unchecked` labels that are shown within the Switch. All labels could be localized.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                checked: "on",
                unchecked: "off"
            }
        });
    </script>

### messages.checked `String`*(default: "On")*

The label when Kendo UI Switch is checked.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                checked: "YES"
            }
        });
    </script>

### messages.unchecked `String`*(default: "Off")*

The label when Kendo UI Switch is unchecked.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                unchecked: "NO"
            }
        });
    </script>

### width `Number|String`*(default: "6em")*

The width of the Kendo UI Switch.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            width: 140
        });
    </script>

## Methods

### check

Get/Set the checked state of the widget.

#### Parameters

##### check `Boolean`

Whether to check or uncheck the Kendo UI Switch.

#### Returns

`Boolean` The checked state of the widget.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.check(true);
    </script>

### toggle

Toggle the checked state of the widget.

#### Example

    <input id="switch" />
    <button id="toggle">Toggle</button>

    <script>
        $("#switch").kendoSwitch()

        $("#toggle").on("click", function () {
            var switchInstance = $("#switch").data("kendoSwitch");
            // toggle the checked state of the switch.
            switchInstance.toggle();
        });
    </script>

### destroy
Prepares the **Switch** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Switch element from DOM.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.destroy();
    </script>

### enable

Changes the enabled state of the widget.

#### Parameters

##### enable `Boolean`

Whether to enable or disable the widget.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.enable(false);
    </script>

### readonly

Changes the readonly state of the widget.

#### Parameters

##### readonly `Boolean`

Whether to make the widget readonly.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.readonly(true);
    </script>

## Events

### change

Fires when the checked state of the Kendo UI Switch changes by user interaction.

#### Event Data

##### e.checked `Object`

The checked state of the widget.

#### Handle Switch change event

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            change: function (e) {
                console.log(e.checked);
            }
        });
    </script>