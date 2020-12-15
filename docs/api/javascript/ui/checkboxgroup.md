---
title: CheckBoxGroup
page_title: Configuration, methods and events of Kendo UI CheckBoxGroup
description: Get started with code examples for the jQuery CheckBoxGroup by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: checkboxgroup
---

# kendo.ui.CheckBoxGroup

Represents the Kendo UI CheckBoxGroup. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enabled `Boolean` *(default: true)*

Sets the enabled state of all checkboxes in the CheckBoxGroup.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            enabled: false,
            items: [ "one", "two", "three" ],
        });
    </script>

### inputName `String`

The `name` attribute to be used for the checkbox inputs. If omitted, the `id` of the wrapper element will be used.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            inputName: "check-name"
        });
    </script>

### items `Array`

Array of items to be rendered as checkboxes in the CheckBoxGroup. If the array contains objects, their fields will be used for each checkbox configuration. If the array contains strings, those will be used as both value and label of the respective checkbox.

#### Example - items defined as array of strings

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });
    </script>

#### Example - items defined as array of objects

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Collection of key-value pairs that would be used to generate the attributes attached to each `k-checkbox-item` element.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Any custom classes that should be attached to the `k-checkbox-item` element.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Defines whether the checkbox is enabled or not. By default all checkboxes are enabled.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Determines whether the checkbox label content should be rendered as an HTML string or it should be encoded.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Specifies the label content for the checkbox.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Specifies the value for the checkbox.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

Specifies the label position according to its checkbox for all items in the widget. Accepts "before" and "after".

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            labelPosition: "before"
        });
    </script>

### layout `String` *(default: "vertical")*

Specifies whether the checkboxes will be rendered one below the other ("vertical") or on the same line ("horizontal").

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            layout: "horizontal"
        });
    </script>

### value `Array`*(default: [])*

The selected (checked) checkboxes values. Will also be used as a CheckBoxGroup widget value.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
            value: ["two", "one"]
        });
    </script>

## Methods

### checkAll

Selects or deselects all checkboxes in the group.

#### Parameters

##### select `Boolean`

Selects or deselects all checkboxes in the group.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.checkAll(true);
    </script>

### enable

Changes the enabled state of the CheckBoxGroup and all its checkboxes.

#### Parameters

##### enable `Boolean`

Enables or disables the CheckBoxGroup.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.enable(false);
    </script>

### enableItem

Changes the enabled state of the checkbox at a given index.

#### Parameters

##### enable `Boolean`

Enables or disables the checkbox.

##### index `Number`

The index of the checkbox to be enabled/disabled.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.enableItem(false, 1);
    </script>

### item

Returns the checkbox at the specified index.

#### Parameters

##### index `Number`

The index of the requested checkbox.

#### Returns

`jQuery` The checkbox at the specified index that has been requested.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        console.log(checkGroup.item(1));
    </script>

### items

Returns all checkboxes in the CheckBoxGroup.

#### Returns

`jQuery` The checkboxes in the group.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        console.log(checkGroup.items());
    </script>

### value

Gets or sets the value (the checked checkboxes) of the CheckBoxGroup. If some of the passed values are not present among the values of the checkboxes, those values will be disregarded. If passing an empty array, the value of the widget will be reset and the checked state will be removed from the selected checkboxes.

> * The `value` method does not trigger select or change events. Those events are triggered by user interaction.

#### Parameters

##### value `Array`

The value to set.

#### Returns

`Array` Array of the selected values in the CheckBoxGroup, if any.

#### Example

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ],
        });

        var checkGroup = $("#checkboxgroup").getKendoCheckBoxGroup();
        checkGroup.value(["two", "one"]);
        console.log(checkGroup.value());
    </script>

## Events

### change

Fires when checking or unchecking a checkbox in the widget through user interaction.

#### Event Data

##### e.sender `kendo.ui.CheckBoxGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="checkbox">` element that triggered the change.

#### Example - handling the change event

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
            change: function (e) {
                console.log(e.target);
            }
        });
    </script>

### focus

Fires when a checkbox in the CheckBoxGroup is focused through user interaction.

#### Event Data

##### e.sender `kendo.ui.CheckBoxGroup`

The widget instance which fired the event.

##### e.target `jQuery`

The `<input type="checkbox">` element that triggered the change.

#### Example - handling the change event

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
            focus: function (e) {
                console.log(e.target);
            }
        });
    </script>

### select

Fires when a checkbox input is clicked to be selected through user interaction. If prevented, the clicked input will not be checked/unchecked.

#### Event Data

##### e.sender `kendo.ui.CheckBoxGroup`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the input select action. The widget will retain the previously selected value (if any).

##### e.target `jQuery`

The `<input type="checkbox">` element that triggered the event.

#### Example - handling the select event

    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "one", "two", "three" ]
            select: function (e) {
                if(e.target.val() === "two") {
                    // Prevent selection if clicking on the "two" checkbox
                    e.preventDefault();
                }
            }
        });
    </script>
