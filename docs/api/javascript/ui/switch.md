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

The checked state of the Switch.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            checked: true
        });
    </script>

### enabled `Boolean`*(default: true)*

If set to `false`, the Switch will be disabled and will not allow the user to change its checked state.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            enabled: false
        });
    </script>

### readonly `Boolean`*(default: false)*

If set to `true`, the Switch will render into its read-only state.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            readonly: true
        });
    </script>

### messages `Object`

Defines the text of the `checked` and `unchecked` labels that are displayed within the Switch. All labels support localization.

> The `messages` property is applicable only for the `Default` and `Classic` themes. All other themes, by design, do not show `checked` and `unchecked` messages.

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

The label for the checked state of the Switch.

> The `messages` property is applicable only for the `Default` and `Classic` themes. All other themes, by design, do not show `checked` and `unchecked` messages.

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

The label for the unchecked state of the Switch.

> The `messages` property is applicable only for the `Default` and `Classic` themes. All other themes, by design, do not show `checked` and `unchecked` messages.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            messages: {
                unchecked: "NO"
            }
        });
    </script>

### size `String` *(default: 'medium')*

Sets a value controlling the size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example

    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        size: "large"
    });
    </script>

### trackRounded `String` *(default: 'full')*

Sets a value controlling the track's border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"

#### Example

    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        trackRounded: "small"
    });
    </script>

### thumbRounded `String` *(default: 'full')*

Sets a value controlling the thumb's border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"

#### Example

    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        thumbRounded: "full"
    });
    </script>

### width `Number|String`*(default: "6em")*

The width of the Switch.

#### Example

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            width: 140
        });
    </script>

The Switch options can be changed dynamically with the `setOptions()` method.

#### Example

    <input id="switch" />

    <script>
      $("#switch").kendoSwitch({
        width: 50
      });

      var switch = $("#switch").data("kendoSwitch")
          switch.setOptions( {
              width: 200
          })
    </script>

## Methods

### check

Gets or sets the checked state of the Switch.

#### Parameters

##### check `Boolean`

Checks or unchecks the Switch.

#### Returns

`Boolean` - The checked state of the Switch.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.check(true);
    </script>

### toggle

Toggles the checked state of the Switch.

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

Prepares the Switch for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the Switch element from DOM.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.destroy();
    </script>

### enable

Changes the enabled state of the Switch.

#### Parameters

##### enable `Boolean`

Enables or disables the Switch.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.enable(false);
    </script>

### readonly

Changes the read-only state of the Switch.

#### Parameters

##### readonly `Boolean`

Defines whether the Switch will render in its read-only state.

#### Example

    <input id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch().data("kendoSwitch");
        switchInstance.readonly(true);
    </script>

## Events

### change

Fires when the checked state of the Switch is changed through user interaction.

#### Event Data

##### e.checked `Object`

The checked state of the Switch.

#### Example - handling the change event

    <input id="switch" />

    <script>
        $("#switch").kendoSwitch({
            change: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.checked);
            }
        });
    </script>
