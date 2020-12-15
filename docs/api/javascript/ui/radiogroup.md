---
title: RadioGroup
page_title: Configuration, methods and events of Kendo UI RadioGroup
description: Get started with code examples for the jQuery RadioGroup by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: radiogroup
---

# kendo.ui.RadioGroup

Represents the Kendo UI RadioGroup. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enabled `Boolean` *(default: true)*

Sets the enabled state of all radio buttons in the RadioGroup.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            enabled: false,
            items: [ "one", "two", "three" ],
        });
    </script>

### inputName `String`

The `name` attribute to be used for the radio inputs. If omitted, the `id` of the wrapper element will be used.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            inputName: "radioName"
        });
    </script>

### items `Array`

Array of items to be rendered as radio buttons in the RadioGroup. If the array contains objects, their fields will be used for each radio button. If the array contains strings, those will be used as both value and label of the respective radio button.

#### Example - items defined as array of strings

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
        });
    </script>

#### Example - items defined as array of objects

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "Label one"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### items.attributes `Object`

Collection of key-value pairs that would be used to generate the attributes attached to each `k-radio-item` element.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "Label one",
                attributes: {
                    "data-test": "custom"
                }
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### items.cssClass `String`

Custom class that would be set on the respective `k-radio-item` element.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "Label one",
                cssClass: "custom-class"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Defines whether the radio button is enabled or not. By default all radio buttons are enabled.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "Label one",
                enabled: false
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### items.encoded `Boolean` *(default: true)*

Determines whether the radio button label content should be rendered as an HTML string or it should be encoded.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "<strong>Label one</strong>",
                encoded: false
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### items.label `String`

Specifies the label content for the radio button.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "<strong>Label one</strong>"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### items.value `String`

Specifies the value for the radio button.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "<strong>Label one</strong>"
            },{
                value: "two",
                label: "Label two"
            },{
                value: "three"
                label: "Label three"
            }],
        });
    </script>

### labelPosition `String` *(default: "after")*

Specifies the label position according to its radio button for all items in the widget. Accepts "before" and "after".

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            labelPosition: "before"
        });
    </script>

### layout `String` *(default: "vertical")*

Specifies whether the radio buttons will be rendered one below the other ("vertical") or on the same line ("horizontal").

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            layout: "horizontal"
        });
    </script>

### value `String`

The selected (checked) radio button value. Will also be used as a RadioGroup widget value.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
            value: "two"
        });
    </script>

## Methods

### enable

Changes the enabled state of the RadioGroup and all its radio buttons.

#### Parameters

##### enable `Boolean`

Enables or disables the RadioGroup.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        radioGroup.enable(false);
    </script>

### enableItem

Changes the enabled state of the radio button at a given index.

#### Parameters

##### enable `Boolean`

Enables or disables the radio button.

##### index `Number`

The index of the radio button to be enabled/disabled.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        radioGroup.enableItem(false, 1);
    </script>

### item

Returns the radio button at the specified index. If the index is not specified, the selected index will be used.

#### Parameters

##### index `Number`

The index of the requested radio button.

#### Returns

`jQuery` The radio button at the specified index that has been requested.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        console.log(radioGroup.item(1));
    </script>

### items

Returns all radio buttons in the RadioGroup.

#### Returns

`jQuery` The radio buttons in the group.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        console.log(radioGroup.items());
    </script>

### value

Gets or sets the value (the checked radio button) of the RadioGroup. If the passed value is not present among the values of the radio buttons, the value would not changed. If passing `null`, the value of the widget will be reset and the checked state will be removed from the selected radio input.

> * The `value` method does not trigger select or change events. Those events are triggered by user interaction.

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the RadioGroup (the value of the checked radio button), if any.

#### Example

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ],
        });

        var radioGroup = $("#radiogroup").getKendoRadioGroup();
        radioGroup.value("two");
        console.log(radioGroup.value());
    </script>

## Events

### change

Fires when the selected radio input in the RadioGroup is changed through user interaction.

#### Event Data

##### e.sender `kendo.ui.RadioGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="radio">` DOM element that triggered the change.

##### e.oldValue `Number`

The previous value of the widget.

##### e.newValue `Number`

The new value of the widget.

#### Example - handling the change event

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
            change: function (e) {
                console.log(e.target);
                console.log("Old value: " + e.oldValue);
                console.log("New value: " + e.newValue);
            }
        });
    </script>

### focus

Fires when a radio input in the RadioGroup is focused through user interaction.

#### Event Data

##### e.sender `kendo.ui.RadioGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="radio">` DOM element that triggered the change.

#### Example - handling the change event

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
            focus: function (e) {
                console.log(e.target);
            }
        });
    </script>

### select

Fires when a radio input is clicked to be selected through user interaction. If prevented, the clicked input will not be selected.

#### Event Data

##### e.sender `kendo.ui.RadioGroup`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the input select action. The widget will retain the previously selected input (if any).

##### e.target `jQuery`

The `<input type="radio">` DOM element that triggered the event.

#### Example - handling the select event

    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "one", "two", "three" ]
            select: function (e) {
                if(e.target.val() === "two") {
                    // Prevent selection if clicking on the "two" radio button
                    e.preventDefault();
                }
            }
        });
    </script>
