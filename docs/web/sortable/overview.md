---
title: Overview
page_title: Sortable widget - getting started help topic
description: How to use the Sortable widget
position: 0
---

# Sortable Overview

The Sortable widget makes a group of DOM elements sortable by dragging and dropping with a mouse or a finger.

<div id="page-toc"></div>

- [Initialization and basic usage](#initialization-and-basic-usage)
- [Initialize a Sortable widget using jQuery plug-in syntax](#initialize-a-sortable-widget-using-jquery-plug-in-syntax)
- [Key features](#key-features)
- [Placeholder](#placeholder)
  - [Customize the placeholder](#customize-the-placeholder)
    - [Build the placeholder from the dragged element](#build-the-placeholder-from-the-dragged-element)
    - [Build a static placeholder](#build-a-static-placeholder)
- [Hint](#hint)
  - [Customize the hint](#customize-the-hint)
    - [Build the hint from the dragged element](#build-the-hint-from-the-dragged-element)
    - [Build a static hint](#build-a-static-hint)
    - [Disable the hint](#disable-the-hint)
- [Filter/Disable items](#filterdisable-items)
  - [Disable all items at runtime](#disable-all-items-at-runtime)
- [Cursor](#cursor)
  - [Change the cursor to "move"](#change-the-cursor-to-move)
  - [Example - grab/grabbing cursor on hover](#example---grabgrabbing-cursor-on-hover)
- [Movement by axis](#movement-by-axis)
- [Common scenarios](#common-scenarios)
- [Persist the order](#persist-the-order)
  - [Persist items' order in local storage](#persist-items-order-in-local-storage)
- [Sortable items with inputs](#sortable-items-with-inputs)
  - [Sortable widget with focus-able input elements](#sortable-widget-with-focus-able-input-elements)
- [Related help topics](#related)

## Initialization and basic usage

The Sortable widget is initialized on an existing HTML element and enables the reordering of the element's children.

### Initialize a Sortable widget using jQuery plug-in syntax

    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable();
    </script>

## Key features

### Placeholder

The Placeholder is the element which indicates where the dragged item will be placed when dropped. By default, the placeholder is a clone of the dragged element with removed `id` attribute and `visibility` set to `hidden` in order to form a visual gap.

> **Important:** The placeholder element is appended to the Sortable container DOM element. Because of this, jQuery's `index` method **returns unexpected results** while dragging. If you want to get the index of a given item in the Sortable collection you should use widget's [`indexOf`](../../../api/web/sortable#methods-indexof) method.

#### Customize the placeholder

You may change the default placeholder by setting the `placeholder` configuration option.

##### Build the placeholder from the dragged element

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

##### Build a static placeholder

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({ 
            placeholder: "<li>Drop Here!</li>"
        });
    </script>

### Hint

The Hint is the element representing the dragged item. By default, the hint is a clone of the dragged item.

> **Important:** The hint element is appended to the `<body>` tag. This may cause styling issues if the CSS rules are applied only to the Sortable's container.

#### Customize the hint

You may change the default hint by setting the `hint` configuration option.

##### Build the hint from the dragged element

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

##### Build a static hint

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({ 
            hint: "<span>hint!</span>"
        });
    </script>

##### Disable the hint

The Sortable widget can work without a visible hint. To disable the hint, set the `hint` option to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({ 
            hint: $.noop
        });
    </script>

### Filter/Disable items

The **filter** option specifies which items inside the Sortable's container will be sortable. Items that do not match the `filter` selector will not be draggable nor reordered when the user drags a sortable item over them.

The **disabled** option specifies which items inside the Sortable's container cannot be dragged. Items that match the disabled selector cannot be dragged **but will reorder** when the user drags a sortable item over them.

#### Disable all items at runtime

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <button id="btnDisable">Disable</button>

    <script>
        $("#sortable").kendoSortable({ 
            disabled: ".disabled"
        });

        $("#btnDisable").click(function() {
            $("#sortable").children().addClass("disabled");
        });
    </script>

### Cursor

The `cursor` configuration option is used to specify what cursor will be shown while the **user drags a sortable item**.
There are several build-in cursor types you can choose from. A full list is available at [quirksmode.org](http://quirksmode.org/css/user-interface/cursor.html).

#### Change the cursor to "move"

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

The `cursor` option changes the cursor style **only while the item is being dragged**. You may change the on-hover cursor with CSS.

#### Example - grab/grabbing cursor on hover

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            cursor: "url('http://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default"
        });
    </script>

    <style>
        #sortable li {
            cursor: url('http://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default;
        }
    </style>

### Movement by axis

By default, the widget uses the mouse cursor to determine the place of the drop placeholder. This means that if the mouse cursor is not over a sortable item, the placeholder will not be re-positioned.

If the `axis` is set to "x" or "y", the widget will start operating in movement by axis mode. The widget will **use only the x or y coordinate** of the mouse cursor to determine the placeholder position. 
This mode is useful when the **dragging is restricted in a container**.

To see this feature in action please check [constraints demo page](http://demos.telerik.com/kendo-ui/web/sortable/constraints.html).

## Common scenarios

### Persist the order

The Sortable widget doesn't persist the current items' order.
You may use the `change` event to detect when changes in the order occur and save them either in local storage or submit them to the server with [jQuery.ajax](http://api.jquery.com/jQuery.ajax/).

To restore the Sortable layout you should render the DOM elements in their last order.

#### Persist items' order in local storage

    <div id="sortable"></div>

    <button id="reset">Reset</button>

    <script id="tmp" type="text/x-kendo-template">
        <div class="sortable">Item #:data#</div>
    </script>

    <script>
        var initialData = [ 1, 2, 3, 4, 5, 6, 7 ], //initial items order (used if there is no saved data
            localStorageSupport = (('localStorage' in window && window['localStorage'] !== null)),
            data,
            html;

        if (localStorageSupport) {
            //retrieve local storage data if such is available, else use the default order
            data = JSON.parse(localStorage.getItem("sortableData")) || initialData;
        } else {
            alert("your browser does not support local storage");
            data = initialData;
        }

        html = kendo.render(kendo.template($("#tmp").html()), data); //render the HTML with the data
        $("#sortable").html(html); //append the HTML to the Sortable container

        $("#sortable").kendoSortable({ //initialize the sortable widget
            filter: ".sortable",
            change: function(e) {
                var item = data.splice(e.oldIndex, 1)[0]; //remove the item that has changed its order
                data.splice(e.newIndex, 0, item); //add the item back using the newIndex

                localStorage.setItem("sortableData", kendo.stringify(data)); //set the updated data in the local storage
            }
        });

        $("#reset").click(function() {
            localStorage.clear(); //clear the local storage
            alert("Local storage is cleared. Please reload the page!");
        });
    </script>

    <style>
        #sortable {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            width: 300px;
        }

        .sortable {
            padding: 10px 0;
            margin: 1px 0;
            width: 358px;
            text-align: center;
            color: #ffffff;
            background-color: #51A0ED;
        }
    </style>

### Sortable items with inputs

A common problem that developers encounter is that input elements inside the Sortable items cannot be focused due to the item being draggable. To avoid that, use the `ignore` option.

#### Sortable widget with focus-able input elements

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


## Related

- [Kendo Templates](../../../framework/templates/overview)
- [Kendo DataSource](../../../framework/datasource/overview)
- [Integration with Grid/ListView](../../../web/sortable/integration)
- [Integration with TabStrip](../../../web/sortable/integration-tabstrip)
