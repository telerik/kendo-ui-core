---
title: Sortable
page_title: Configuration, methods and events of Kendo UI Sortable
res_type: api
component: sortable
---

# kendo.ui.Sortable

Represents the Kendo UI Sortable. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### axis `String`*(default: null)*

Constrains the hint movement to either the horizontal (x) or vertical (y) axis. Can be set to either "x" or "y".


<div class="meta-api-description">
Control and restrict drag-and-drop movement to a single axis by setting direction locking along horizontal or vertical boundaries, enabling the sortable placeholder or drag indicator to move only left-right or up-down during item rearrangement, supporting use cases where axis-constrained sorting or one-dimensional dragging behavior is required, with options to configure axis locking on initialization for consistent user interaction, ensuring drag hints do not stray beyond the specified x-axis (horizontal) or y-axis (vertical) limits.
</div>

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


<div class="meta-api-description">
Control automatic scrolling behavior during drag-and-drop operations to smoothly scroll container content when dragging items near its edges, enabling seamless movement of elements beyond visible boundaries, support for touch and mouse input, configurable auto-scroll activation when pointer approaches container top or bottom, continuous scrolling to facilitate repositioning items in scrollable lists or containers, and dynamic adjustment of scrolling speed and direction during drag interactions.
</div>

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


<div class="meta-api-description">
Control and limit the drag hint movement area by setting a container element using a CSS selector, enabling developers to confine draggable item hints within specific DOM boundaries or parent elements during sorting or reordering operations, ensuring the dragged indicator stays inside designated regions, restricting overflow or movement beyond certain elements, and customizing containment zones for drag-and-drop interfaces to improve user interaction and visual feedback within sortable lists or components.
</div>

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


<div class="meta-api-description">
Enable cross-container drag and drop by configuring multiple sortable lists to accept items dragged from each other using CSS selectors, allowing connected groupings for one-way or two-way transfer of draggable elements between lists; control and customize inter-list compatibility, manage item movement across containers seamlessly, support bidirectional dragging by linking containers reciprocally, and avoid empty container collapse by adjusting container size or min-height to ensure smooth dropping zones and consistent drag-and-drop behavior in multi-list sortable interfaces.
</div>

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


<div class="meta-api-description">
Control and customize the mouse pointer appearance during drag-and-drop interactions by setting the cursor style for draggable items. Adjust the pointer icon dynamically while dragging elements to improve user feedback, specify custom drag cursors using CSS cursor options, enable visual cues that reflect drag activity, and configure cursor changes to match different dragging states or visual themes for enhanced interactivity and usability during sortable list manipulations.
</div>

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


<div class="meta-api-description">
Adjust the draggable hint’s position relative to the pointer or touch coordinate during drag operations by setting an offset that controls how far the drag preview appears from the mouse cursor or finger location. Configure the horizontal and vertical displacement to fine-tune the drag indicator’s placement, enabling precise control over where the visual drag hint floats while moving sortable elements, such as setting top and left values to customize the drag feedback relative to pointer interaction for improved UX, responsive drag positioning, and cursor tracking adjustments during drag-and-drop actions.
</div>

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


<div class="meta-api-description">
Adjust the horizontal positioning of a draggable item’s visual indicator or drag hint relative to the mouse pointer or touch location, enabling precise control over left-right alignment during drag-and-drop interactions by setting or configuring a horizontal offset. This feature supports shifting the drag preview or cue offset left or right to customize the drag experience, improve alignment accuracy, or fine-tune the visual feedback while dragging elements across user interfaces.
</div>

#### Example

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>
    <script>
        $("#sortable").kendoSortable({
            cursorOffset: { left: 50 }
        });
    </script>

### cursorOffset.top `Number`

The top offset of the hint element relative to the mouse cursor/finger.


<div class="meta-api-description">
Adjust vertical positioning of the drag indicator or drag hint relative to the mouse pointer or touch input by setting an offset that moves the hint element up or down to avoid overlapping or obscuring the cursor during drag-and-drop interactions. Configure or control how far the drag preview shifts vertically from the pointer, enabling precise alignment, improved visibility, and enhanced user experience when dragging items in sortable lists or draggable UI components. Fine-tune the vertical drag hint placement to prevent cursor obstruction, improve drag feedback clarity, and customize the pointer-relative positioning for different screen sizes or input methods.
</div>

#### Example

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>
    <script>
        $("#sortable").kendoSortable({
            cursorOffset: { top: 25 }
        });
    </script>

### disabled `String`*(default: null)*

Selector that determines which items are disabled. **Disabled items cannot be dragged but are valid sort targets**.


<div class="meta-api-description">
Configure which elements within a sortable list cannot be dragged by specifying selectors that disable dragging functionality while still accepting other items dropped around them; control non-draggable list items using CSS selectors, prevent dragging for certain elements but keep them as valid drop targets, set up sortable components to exclude specific items from drag operations while allowing sorting interaction relative to those items, identify and mark elements as non-draggable in drag-and-drop sortable interfaces, manage draggable state on individual items through selector-based rules, enable precise control over which items are locked from dragging but remain part of the sortable structure.
</div>

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


<div class="meta-api-description">
Control which list items are allowed to be dragged or accept drops by specifying a CSS selector to filter sortable elements, enabling developers to configure or restrict drag-and-drop behavior, exclude certain items from sorting, disable dragging on specific elements, set conditions for draggable targets, and manage drag operations by defining non-draggable or invalid drop zones within sortable lists.
</div>

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


<div class="meta-api-description">
Control and restrict drag-and-drop initiation to specific sub-elements within draggable items by specifying selectors that define precise drag handles, enabling users to start moving items only when interacting with designated controls like icons, grips, or headers, preventing unintended drag actions from other parts of the item and allowing configuration of custom drag zones through CSS or query selectors to improve user interaction precision and drag control.
</div>

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


<div class="meta-api-description">
Configure or customize the drag preview element shown during drag-and-drop or reordering interactions within sortable lists or components by supplying a custom DOM element or a function that generates the preview dynamically. Control what visual feedback users see while dragging items by providing a cloned element, custom styling, or a function that receives the draggable item and returns a tailored drag indicator. Enable setting a drag hint that can be dynamically created or statically defined to improve user experience of draggable interfaces, handle styling and positioning as the hint is appended directly to the document body, and fine-tune how drag previews appear during reordering operations. This covers use cases for custom drag visuals, previews, dynamic drag feedback customization, and ensuring proper interaction feedback while managing styling constraints due to global placement in the DOM.
</div>

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


<div class="meta-api-description">
Configure touch-enabled delayed drag activation for sortable items using long-press or tap-and-hold gestures to prevent accidental dragging during touch scrolling or swiping. Enable touch-friendly drag initiation that triggers only after holding on an item without movement, supporting seamless drag start after a brief press and hold delay. This setting helps control drag behavior on touch devices by requiring a hold gesture before activating drag mode, improving usability for sortable lists in mobile or tablet environments. Set or enable hold-to-drag functionality to differentiate between scrolling and dragging actions, ensuring precise drag activation on touch interfaces.
</div>

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


<div class="meta-api-description">
Control dragging behavior by specifying CSS selectors to exclude certain child elements from triggering drag operations within sortable containers, enabling developers to prevent drag initiation on inputs, buttons, or other interactive elements inside sortable items, configuring which nested elements should be ignored during drag-and-drop actions to refine user interaction and avoid conflicts with form fields or clickable controls inside draggable lists.
</div>

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

### navigatable `Boolean`*(default: false)*

If set to true, the user can navigate the widget with the keyboard. By default, keyboard navigation is disabled.


<div class="meta-api-description">
Enable, activate, or allow keyboard navigation, keyboard controls, or arrow key movement for sortable lists, sortable components, or draggable items, letting users interact, reorder, move, or traverse items using the keyboard instead of a mouse, support accessibility, tabbing, focus management, and keyboard shortcuts, configure keyboard support for sorting, and control whether users can use keys to navigate or rearrange sortable elements.
</div>

#### Example - Sortable with navigatable enabled

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            navigatable: true,
        });
    </script>

### placeholder `Function | String | jQuery`

Provides a way for customization of the sortable item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.

> **Important: The placeholder element is appended to the Sortable widget container.


<div class="meta-api-description">
Control and customize the visible placeholder or ghost element displayed when dragging or sorting items in a drag-and-drop interface by configuring a static element or a dynamic function that defines the placeholder’s content, style, or behavior during drag operations; this setting can clone the dragged item or accept a callback to generate custom markup, allowing developers to set, enable, or modify the temporary drag indicator, invisible clones, or placeholder appearance within sortable lists, grids, or containers for enhanced user interaction feedback during item rearrangement.
</div>

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


<div class="meta-api-description">
Find the position or index of a specific item within a sortable list or collection while accurately excluding any filtered or hidden elements, especially during drag-and-drop operations where placeholders replace the original item and standard index methods might give incorrect results; reliably retrieve the zero-based order, rank, or location of elements for sorting, dynamic reordering, UI updates, or event handling by determining where an item currently resides despite temporary changes made by drag actions or filtering, enabling precise tracking and manipulation of items in sortable interfaces.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("index of item", this.indexOf(e.item));
                //shows the position where item will be moved to
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("index of placeholder", this.indexOf(this.placeholder));
            }
        });
    </script>

### items

Returns the sortable elements. **Filtered items and the placeholder are excluded from the collection.**

> **Important:** While user drags to sort the original item is hidden and the placeholder is appended to the Sortable collection. This is why jQuery's `children` method might return incorrect results. When the developer wants to obtain the sortable items it is recommended to use widget's `items` method.


<div class="meta-api-description">
Retrieve or access the current list or collection of sortable elements, filter out excluded or disabled items and placeholders, get the accurate set of draggable or sortable components during drag-and-drop operations, avoid incorrect results from DOM queries like children or descendants methods that include temporary placeholders, obtain up-to-date sortable items for manipulation, enumeration, or inspection within sorting interfaces, query active or enabled sortable objects while excluding filtered entries, dynamically fetch the live collection of reorderable elements managed by the sorting system, handle issues with placeholder elements affecting direct DOM element queries during drag events, and obtain the precise set of elements currently managed as sortable for customization or processing purposes.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(sortable.items());
    </script>

## Events

### start

Fires when sortable item drag starts.


<div class="meta-api-description">
Track the initial moment when a drag-and-drop operation begins on a draggable item to trigger custom reorder actions or apply special logic at drag start, enabling detection of when a user starts moving elements to reorder lists or grids. Capture the event signaling the first interaction for drag initiation to set up state, adjust the dragged element’s styling or appearance, log original positions, or prepare for subsequent drag handling, with access to event details and DOM event info to customize behavior as dragging commences.
</div>

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


<div class="meta-api-description">
Detect changes in item positions during drag-and-drop operations, track placeholder movement to update interfaces dynamically, control and respond to items being reordered, handle live adjustments of drop zones or indicators, enforce custom drag constraints, synchronize reordered data states in real time, trigger events when sortable elements shift position during dragging, enable reactive behaviors while dragging list or grid items, monitor and react to item rearrangements as they occur, and integrate dynamic feedback or data updates tied to draggable element movements.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("move to index: " + this.indexOf(this.placeholder));
            }
        });
    </script>

### end

Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.


<div class="meta-api-description">
Detect when a drag-and-drop sorting action finishes and respond before the list order updates by capturing the event triggered at the end of dragging; intercept or cancel the reorder operation by inspecting the dragged element, validating its new position, preventing the final rearrangement, reverting changes, executing custom code, or controlling the outcome of sorting interactions before the user interface reflects the new order.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Trigger actions or respond programmatically when a list or collection element is reordered and its position in the DOM updates, enabling you to detect changes in item sequence for syncing data models, saving updated item order to databases or servers, refreshing user interfaces, or tracking reorder events for analytics and logging purposes; ideal for reacting after drag-and-drop sorting completes and reflects the new arrangement, with an emphasis on post-move notifications rather than cancellation or interception of the reorder process.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("from " + e.oldIndex + " to " + e.newIndex);
            }
        });
    </script>

### cancel

Fires when item sorting is canceled by pressing the Escape key.


<div class="meta-api-description">
Detect and respond to user actions canceling a drag-and-drop reorder, specifically when the Escape key interrupts sorting, enabling rollback of item order changes, cleanup of drag state, reverting to original lists, aborting reorder operations, handling aborted drag events, preventing updates after cancelation, and restoring initial sequences during drag cancellations or aborted rearrangements.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.item.text() + " sorting called!");
            }
        });
    </script>
