---
title: Sortable
page_title: Configuration, methods and events of Kendo UI Sortable
---

# kendo.ui.Sortable

Represents the Kendo UI Sortable. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### axis `String`*(default: null)*

Constrains the hint movement to either the horizontal (x) or vertical (y) axis. Can be set to either "x" or "y".

#### Example - initiate horizontally draggable Sortable widget

    <div id="sortable">
        <span>Item1</span>
        <span>Item2</span>
        <span>Item3</span>
    </div>

    <script>
        $("#sortable").kendoSortable({
            axis: "x"
         });
    </script>

### autoScroll `Boolean`*(default: false)*

If set to `true` the widget will auto-scroll the container when the mouse/finger is close to the top/bottom of it.

#### Example - use autoScroll in a scrollable container

    <div style="width: 200px; height: 200px; overflow: auto">
        <div style="width: 1000px; height: 1000px;">
            <div id="sortable">
                <span>Item 1</span>
                <span>Item 2</span>
                <span>Item 3</span>
                <span>Item 4</span>
                <span>Item 5</span>
                <span>Item 6</span>
                <span>Item 7</span>
                <span>Item 8</span>
                <span>Item 9</span>
                <span>Item 10</span>
                <span>Item 11</span>
                <span>Item 12</span>
            </div>
        </div>
    </div>

    <script>
        $("#sortable").kendoSortable({
            autoScroll: true
         });
    </script>

### container `String | jQuery`*(default: null)*

Selector that determines the container to which boundaries the hint movement will be constrained.

#### Example - initiate Sortable widget with hint movement constrains

    <div id="wrapper">
        <ul id="sortable">
            <li>Item1</li>
            <li>Item2</li>
            <li>Item3</li>
        </ul>
    </div>

    <script>
        $("#sortable").kendoSortable({
            container: $("#wrapper")
         });
    </script>

    <style>
        #wrapper {
            padding: 10px;
            width: 100px;
            border: 1px solid #FF0000;
        }
    </style>

### connectWith `String`*(default: null)*

Selector which determines if items from the current Sortable widget can be accepted from another Sortable container(s). The `connectWith` option describes **one way** relationship, if the developer wants a two way connection then the connectWith option should be set on both widgets.

> By default when the Sortable widget is left with no items its height will become zero. This will prevent the user from being able to drop items back into it. To avoid this behaviour the developer should set the min-height CSS property of the sortable container.

#### Example - set up a one way connection from ListA to ListB

    <ul id="listA">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <ul id="listB">
        <li>ItemB1</li>
        <li>ItemB2</li>
        <li>ItemB3</li>
    </ul>

    <script>
        $("#listA").kendoSortable({
            connectWith: "#listB"
        });

        $("#listB").kendoSortable();
    </script>

    <style>
        #listA li { background-color: #FF0000; }
        #listB li { background-color: #0000FF; }
    </style>

#### Example - set up a bidirectional connection between Sortable widgets

    <ul id="listA">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <ul id="listB">
        <li>ItemB1</li>
        <li>ItemB2</li>
        <li>ItemB3</li>
    </ul>

    <script>
        $("#listA").kendoSortable({
            connectWith: "#listB"
        });

        $("#listB").kendoSortable({
            connectWith: "#listA"
        });
    </script>

    <style>
        #listA, #listB {
            border: 1px solid #000000;
            min-height: 20px;
        }

        #listA li { background-color: #FF0000; }
        #listB li { background-color: #0000FF; }
    </style>

### cursor `String`*(default: "auto")*

The cursor that will be shown while user drags sortable item.

#### Example - setting cursor to move

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            cursor: "move"
        });
    </script>

### cursorOffset `Object`*(default: null)*

If set, specifies the offset of the hint relative to the mouse cursor/finger.
By default, the hint is initially positioned on top of the draggable source offset. The option accepts an object with two keys: `top` and `left`.

#### Example - initialize Sortable with cursorOffset

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            cursorOffset: { top: 30, left: 30 }
        });
    </script>

### cursorOffset.left `Number`

The left offset of the hint element relative to the mouse cursor/finger.

### cursorOffset.top `Number`

The top offset of the hint element relative to the mouse cursor/finger.

### disabled `String`*(default: null)*

Selector that determines which items are disabled. **Disabled items cannot be dragged but are valid sort targets**.

#### Example - disabled sortable items

    <ul id="sortable">
        <li class="disabled">ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
        <li>ItemA4</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            disabled: ".disabled"
        });
    </script>

    <style>
        .disabled { color: #FF0000; }
    </style>

### filter `String`*(default: null)*

Selector that determines which items are sortable. **Filtered items cannot be dragged and are not valid sort targets**.

#### Example - filtered sortable items

    <ul id="sortable">
        <li class="filtered">ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
        <li>ItemA4</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            filter: ">li:not(.filtered)"
        });
    </script>

    <style>
        .filtered { color: #FF0000; }
    </style>

### handler `String`*(default: null)*

Selector that determines which element will be used as a draggable handler. If a handler is defined, the user will be able to move the Sortable items only if the cursor/finger is positioned onto the handler element.

#### Example - Sortable widget with drag handlers

    <ul id="sortable">
        <li><span class="handler"></span>ItemA1</li>
        <li><span class="handler"></span>ItemA2</li>
        <li><span class="handler"></span>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            handler: ".handler"
        });
    </script>

    <style>
        .handler {
            width: 16px;
            height: 16px;
            background-color: #FF0000;
            display: inline-block;
        }
    </style>

### hint `Function | String | jQuery`

Provides a way for customization of the sortable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If hint function is not provided the widget will clone dragged item and use it as a hint.

> **Important: The hint element is appended to the `<body>` tag.** The developer should have this in mind in order to avoid styling issues.

#### Example - Sortable with custom hint

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            hint: function(element) {
                return $("<span></span>")
                        .text(element.text())
                        .css("color", "#FF0000");
            }
        });
    </script>

### holdToDrag `Boolean`*(default: false)*

Suitable for touch oriented user interface, in order to avoid collision with the touch scrolling gesture. When set to `true`, the item will be activated after the user taps and holds the finger on the element for a short amount of time.
The item will also be activated by pressing, holding and lifting the finger without any movement. Dragging it afterwards will initiate the drag immediately.

#### Example - Sortable with holdToDrag enabled

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            holdToDrag: true
        });
    </script>

### ignore `String`*(default: null)*

Selector that determines which elements inside the sorted item's container will be ignored. *Useful if the sortable item contains input elements.*

> **Important** The `ignore` option is available in the latest internal build! This feature is **not** included in Q1 2014 (v2014.1.318).

#### Example - Sortable widget with input elements

    <ul id="sortable">
        <li>ItemA1 <input type="text" /></li>
        <li>ItemA2 <input type="text" /></li>
        <li>ItemA3 <input type="text" /></li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            ignore: "input"
        });
    </script>

### placeholder `Function | String | jQuery`

Provides a way for customization of the sortable item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.

> **Important: The placeholder element is appended to the Sortable widget container.

#### Example - Sortable with custom placeholder

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            placeholder: function(element) {
                return element.clone().css({
                    "opacity": 0.3,
                    "border": "1px dashed #000000"
                });
            }
        });
    </script>

## Methods

### indexOf

Returns the index of specified item. **Filtered items are excluded from the collection.**

> **Important:** While user drags to sort the original item is hidden and the placeholder is appended to the Sortable collection. This is why jQuery's `index` method might return incorrect results. When the developer wants to find the index of a given item it is recommended to use widget's `indexOf` method.

#### Parameters

##### element `jQuery`

jQuery object which represents the sortable element.

#### Returns

`Number` the index of specified item.

#### Example - working with indexOf method

    <div id="sortable">
        <h4>Sortable List</h4>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
    </div>

    <script>
        $("#sortable").kendoSortable({
            filter: ">div",
            move: function(e) {
                //NOTE: the heading element will be excluded from the
                //collection as it does not match the filter

                //shows the original position of the item
                console.log("index of item", this.indexOf(e.item));
                //shows the position where item will be moved to
                console.log("index of placeholder", this.indexOf(this.placeholder));
            }
        });
    </script>

### items

Returns the sortable elements. **Filtered items and the placeholder are excluded from the collection.**

> **Important:** While user drags to sort the original item is hidden and the placeholder is appended to the Sortable collection. This is why jQuery's `children` method might return incorrect results. When the developer wants to obtain the sortable items it is recommended to use widget's `items` method.

#### Returns

`jQuery` the sortable items

#### Example - using the items method

    <div id="sortable">
        <h4>Sortable List</h4>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
    </div>

    <script>
        var sortable = $("#sortable").kendoSortable({
            filter: ">div"
        }).data("kendoSortable");

        console.log(sortable.items());
    </script>

## Events

### start

Fires when sortable item drag starts.

#### Event Data

##### e.draggableEvent `Object`

The original draggable's dragstart event data.

##### e.item `jQuery`

The element that will be dragged.

##### e.preventDefault `Function`

If invoked prevents the drag start action. The element will remain at its original position. The hint and placeholder will not be initialized.

#### Example - prevent certain item from being sorted by cancelling the drag start action

    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            start: function(e) {
                if(e.item.text() === "Item1") {
                    e.preventDefault();
                }
            }
        });
    </script>

### move

Fires when Sortable's placeholder changes its position.

#### Event Data

##### e.item `jQuery`

The element that is dragged.

##### e.target `jQuery`

The target element under cursor against which placeholder is positioned.

##### e.list `kendo.ui.Sortable`

The Sortable widget instance which the item belongs to (useful in case there are connected Sortable widgets).

##### e.draggableEvent `Object`

The original draggable's drag event data.

#### Example

    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            move: function(e) {
                console.log("move to index: " + this.indexOf(this.placeholder));
            }
        });
    </script>

### end

Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.

#### Event Data

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.preventDefault `Function`

If invoked prevents the sort action. The element will be reverted at its original position. The hint and placeholder will be destroyed.

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position of the item in the Sortable collection. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item will be placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

#### Example

    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            end: function(e) {
                console.log("from " + e.oldIndex + " to " + e.newIndex);

                //prevent first item to be placed at the end of the list
                if(e.newIndex == 2 && e.oldIndex == 0) {
                    e.preventDefault();
                }
            }
        });
    </script>

### change

Fires when item is sorted and the item's position is changed in the DOM.

> Important: This event cannot be prevented. If this is required the developer should use the `end` event.

#### Event Data

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position where the item was located at. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item is placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

#### Example

    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            change: function(e) {
                console.log("from " + e.oldIndex + " to " + e.newIndex);
            }
        });
    </script>

### cancel

Fires when item sorting is canceled by pressing the Escape key.

#### Event Data

##### e.item `jQuery`

The element that is dragged.

#### Example

    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            cancel: function(e) {
                console.log(e.item.text() + " sorting called!");
            }
        });
    </script>
