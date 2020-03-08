---
title: Rating
page_title: Configuration, methods and events of Kendo UI Rating
description: Get started with code examples for the jQuery Rating by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: rating
---

# kendo.ui.Rating

Represents the Kendo UI Rating. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### min `Number` *(default: 1)*

The value from which the Rating items will be rendered.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 2,
            max: 6
        });
    </script>

### max `Number `*(default: 5)*

The value to which the Rating items will be rendered.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 2,
            max: 6
        });
    </script>

### selection `String` *(default: "continuous")*

Specifies the selection behavior. The available options are:

*`continuous` - all items, starting from the first one, are marked as selected.
*`single` - a single item is marked as selected.

#### Example - continuous selection

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            selection: "continuous"
        });
    </script>

### precision `String` *(default: "item")*

Specifies the precision with which an item is selected. The available options are:

*`item` - rate by selecting the whole item.
*`half` - rate by selecting half of the item or the whole item.

#### Example - item precision

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            precision: "item"
        });
    </script>

#### Example - half precision

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            precision: "half"
        });
    </script>

### tooltip `Boolean` *(default: true)*

The Rating displays the value of the item through the title attribute when it is hovered.

If `tooltip` is set to `false`, the widget will not display the value of the items when hovering over them.

The tooltips are not visible when the Rating is disabled.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            tooltip: false
        });
    </script>

### label `Boolean|Object` *(default: true)*

The Rating displays a label by default that shows the current value out of the max value `3 / 5`. If the widget does not have a selected value, the label will not be displayed initially and will be toggled after an item is selected.

If `label` is set to `false`, the widget will not display the label.

#### Example - disable the label

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            label: false
        });
    </script>

### label.template `String|Function`

#### Parameters

##### value `Number`

The current value of the widget.

##### maxValue `Number`

The max value of the widget.

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the label.

#### Example - customize the label through the template option

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            label: { template: "<span>#=value# / #=maxValue# selected.</span>"  }
        });
    </script>

### selectValueOnFocus `Number` *(default: null)*

If the option is set, the widget will automatically select the specified item when the Rating receives focus and no previous value has been set.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            selectValueOnFocus: 2
        });
    </script>

### itemTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the items of the Rating.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            itemTemplate: "<i class='k-icon k-i-copy'></i>",
        });
    </script>

### selectedTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the selected state of the items.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            selectedTemplate: "<i class='k-icon k-i-close'></i>",
        });
    </script>

### hoveredTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the hovered state of the items.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            hoveredTemplate: "<i class='k-icon k-i-close'></i>",
        });
    </script>

### enabled `Boolean` *(default: true)*

If set to `false`, the Rating will be:

* disabled and will not allow the user to change its state.
* excluded from the tab order and not receiving focus.
* will not submit its value if part of a form.

#### Example - disable the Rating

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            enabled: false
        });
    </script>

### readonly `Boolean`*(default: false)*

If set to `true`, the Rating will:

* be in readonly state and will not allow the user to change its state.
* be included in the tab order and able to receive focus.
* submit data if part of a form.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            readonly: true
        });
    </script>

### value `Number` *(default: null)*

Specifies the initial value of the Rating.

If a greater value than the max option is used, then the max value will be set.

If a value less than the min option is used, then the min value will be set.

#### Example

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            min: 1,
            max: 6,
            value: 3
        });
    </script>

## Methods

### value

Gets or sets the value of the Rating.If the passed value is smaller/bigger than the min/max option, then the min/max value will be automatically selected.

> * The `value` method does not trigger select or change events. Those events are triggered by user interaction.

#### Parameters

##### value `Number`

The value to set.

#### Returns

`Number` The value of the Rating.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating({
            min: 1,
            max: 6,
        }).data("kendoRating");

        ratingInstance.value(3);
        console.log(ratingInstance.value());
    </script>

### enable

Changes the enabled state of the Rating.

#### Parameters

##### enable `Boolean`

Enables or disables the Rating.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating().data("kendoRating");
        ratingInstance.enable(false);
    </script>

### reset

Resets the value of the widget to `null` and removes selection.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating({
            min: 1,
            max: 6,
            value: 3
        }).data("kendoRating");

        ratingInstance.reset();
    </script>

### readonly

Changes the read-only state of the Rating.

#### Parameters

##### readonly `Boolean`

Defines whether the Rating will render in its read-only state.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating().data("kendoRating");
        ratingInstance.readonly(true);
    </script>

### destroy

Prepares the Rating for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks.

> The `destroy` method does not remove the Rating elements from DOM.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating().data("kendoRating");
        ratingInstance.destroy();
    </script>

### setOptions

Sets the options of the Rating dynamically. Use this method if you want to enable/disable a particular feature/option.

#### Example

    <input id="rating" />

    <script>
        var ratingInstance = $("#rating").kendoRating({
            min:1,
            max: 6,
            value: 3
        }).data("kendoRating");

        ratingInstance.setOptions({ label: false });
    </script>

## Events

### change

Fires when the value of the Rating is changed through user interaction.

#### Event Data

##### e.sender `kendo.ui.Rating`

The widget instance which fired the event.

##### e.target `jQuery`

The DOM element that triggered the change.

##### e.oldValue `Number`

The previous value of the widget.

##### e.newValue `Number`

The new value of the widget.

#### Example - handling the change event

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            change: function (e) {
                console.log(e.target);
            }
        });
    </script>

### select

Fires when an item is selected through user interaction.

#### Event Data

##### e.sender `kendo.ui.Rating`

The widget instance which fired the event.

##### e.target `jQuery`

The DOM element that triggered the event.

#### Example - handling the select event

    <input id="rating" />

    <script>
        $("#rating").kendoRating({
            select: function (e) {
                console.log(e.target);
            }
        });
    </script>
