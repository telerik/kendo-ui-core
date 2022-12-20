---
title: ToggleButton
description: Configuration, methods and events of the Kendo UI ToggleButton
res_type: api
component: togglebutton
---

# kendo.ui.ToggleButton

Represents the Kendo UI ToggleButton widget. Inherits from [Button](/api/javascript/ui/button).


## Configuration

### group `String` *(default: undefined)*

Specifies a group of ToggleButtons the current instance belongs to. The string will be rendered as a value of the `data-group` attribute of the widget's element.

#### Example

    <button id="button1" type="button">Option 1</button>
    <button id="button2" type="button">Option 2</button>
    <script>
        $("#button1").kendoToggleButton({
            group: "myGroup"
        });
        $("#button2").kendoToggleButton({
            group: "myGroup"
        });
    </script>

### selected `String` *(default: false)*

Specifies the selected state of the ToggleButtons. If set to `true` the widget will be initially selected.

#### Example

    <button id="button1" type="button">Option 1</button>
    <button id="button2" type="button">Option 2</button>
    <script>
        $("#button1").kendoToggleButton({
            selected: true
        });
        $("#button2").kendoToggleButton({
            group: "myGroup"
        });
    </script>

## Methods

### toggle

Toggles the selected state of the ToggleButton.

#### Parameters

##### toggle `Boolean`

Indicates whether the **ToggleButton** should be selected or deselected. `true` and `false` arguments are accepted. If no argument is supplied, the **ToggleButton** will toggle its current state to the opposite value.

#### Example

    <button id="button" type="button">Edit</button>

    <script>
        $("#button").kendoToggleButton();
        var button = $("#button").data("kendoToggleButton");
        // select the button
        button.toggle(true);
        // deselect the button
        button.toggle(false);
        // select the button when initially deselected
        button.toggle();
    </script>

## Events

### toggle

Fires when the **ToggleButton** selected state is toggled.

#### Event Data

##### e.sender `kendo.ui.ToggleButton`

The widget instance which fired the event.

##### e.checked `Boolean`

Specifies the selected state of the button after the toggle operation has performed.

##### e.group `String`

Provides the name of the group the button belongs to (if any).

##### e.id `Boolean`

Provides the id of the button element (if any).

##### e.target `Boolean`

Provides the button jQuery element instance.

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoToggleButton({
            toggle: function(e) {
                console.log(e);
            }
        });
    </script>
