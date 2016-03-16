---
title: Overview
page_title: Overview | Kendo UI Sortable
description: "Learn how to initialize the Kendo UI Sortable widget and configure its behaviors."
slug: overview_kendoui_sortable_widget
position: 1
---

# Sortable Overview

The [Kendo UI Sortable widget](http://demos.telerik.com/kendo-ui/sortable/index) makes a group of DOM elements sortable by dragging and dropping with a mouse or a finger.

## Getting Started

### Initialize the Sortable

The Sortable is initialized on an existing HTML element and enables the reordering of the element's children.

The example below demonstrates how to initialize Kendo UI Sortable by using jQuery plug-in syntax.

###### Example

```html
    <ul id="sortable">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable();
    </script>
```

## Features

### Placeholder

The Placeholder is the element which indicates where the dragged item will be placed when dropped. By default, the Placeholder is a clone of the dragged element with a removed `id` attribute, and `visibility` set to `hidden` to form a visual gap.

> **Important**  
>
> The placeholder element is appended to the Sortable DOM element container. Because of this, jQuery's `index` method returns unexpected results while dragging. If you want to get the index of a given item in the Sortable collection, use widget's [`indexOf`](/api/javascript/ui/sortable#methods-indexof) method.

#### Customize the Placeholder

You can change the default Placeholder by setting the `placeholder` configuration option.

The example below demonstrates how to build the Placeholder from the dragged element.

###### Example

```html
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
```

The example below demonstrates how to build a static Placeholder.

###### Example

```html
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
```

### Hint

The Hint is the element representing the dragged item. By default, the Hint is a clone of the dragged item.

> **Important**  
> The `hint` element is appended to the `<body>` tag. This may cause styling issues if the CSS rules are applied only to the Sortable's container.

#### Customize the Hint

You can change the default Hint by setting the `hint` configuration option.

The example below demonstrates how to build the Hint from the dragged element.

###### Example

```html
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
```

The example below demonstrates how to build a static Hint.

###### Example

```html
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
```

The example below demonstrates how to disable the Hint.

###### Example

The Sortable widget can work without a visible hint. To disable the hint, set the `hint` option to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

```html
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
```

### Cursor

The `cursor` configuration option determines the type of cursor to be displayed while the user drags a sortable item. There are several build-in cursor types you can choose from. A full list is available at [quirksmode.org](http://quirksmode.org/css/user-interface/cursor.html).

The example below demonstrates how to change the cursor type to `"move"`.

###### Example

```
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
```

The `cursor` option changes the cursor style only for the time while the item is dragged. If you want to changhe the cursor type on `hover`, use CSS.

The example below demonstrates how to grab the cursor on `hover`.

###### Example

```html
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
```

> **Important**  
>
> It is advisable not to use a custom cursor in Internet Explorer, as due to the browser's specifics in custom cursor icon rendering, this may cause performace issues.

### Filter and Disable Items

The `filter` option specifies which items inside the Sortable's container will be sortable. Items not matching the `filter` selector will neither be draggable, nor reordered, when the user drags a sortable item over them.

The `disabled` option specifies which items inside the Sortable's container cannot be dragged. Items matching the disabled selector cannot be dragged, but will reorder, when the user drags a sortable item over them.

The example below demonstrates how to disable all items at runtime.

###### Example

```html
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
```

### Move by Axis

By default, Kendo UI Sortable uses the mouse cursor to determine the place of the drop Placeholder. This means that if the mouse cursor is not over a sortable item, the Placeholder will not be re-positioned.

If the `axis` is set to `"x"` or `"y"`, the widget will start operating in movement by axis mode. The widget will use only the `x` or `y` coordinate of the mouse cursor to determine the position of the Placeholder. This mode is useful when dragging is restricted in a container.

To see this feature in action, check the [constraints demo page](http://demos.telerik.com/kendo-ui/web/sortable/constraints.html).

## Common Scenarios

### Order Persistence

The Sortable widget does not persist the order of the current items. If you want to detect when changes in the order occur and save them either in local storage, or submit them to the server with [`jQuery.ajax`](http://api.jquery.com/jQuery.ajax/), use the `change` event. To restore the Sortable layout, render the DOM elements in their last order.

The example below demonstrates how to persist the order of items in local storage.

###### Example

```html
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
```

### Sortable Items Containing input Elements

The `<input>` elements inside Sortable items cannot be focused because the items are draggable. To avoid that, use the `ignore` option, as demonstrated in the example below.

###### Example

```html
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
```

### Radio Buttons

A Sortable with radio buttons and a Hint cloned from the Sortable element will lose the selected radio if dragged, because the clone will take over the selection. To avoid this, clear the name of the radio in the Hint, as demonstrated in the example below.

###### Example

```html
 <ul id="sortable-basic">
      <li class="sortable"><input type="radio" name="foo" />Papercut <span>3:04</span></li>
      <li class="sortable"><input type="radio" name="foo" />One Step Closer <span>2:35</span></li>
      <li class="sortable"><input type="radio" name="foo" />With You <span>3:23</span></li>
      <li class="sortable"><input type="radio" name="foo" />Points of Authority <span>3:20</span></li>
      <li class="sortable"><input type="radio" name="foo" />Crawling <span>3:29</span></li>

    </ul>

    <script>
      $("#sortable-basic").kendoSortable({
        hint:function(element) {
          var hint = element.clone().addClass("hint");
          // alternatively, you may remove the input from the hint
          hint.find("input").attr("name", "");
          return hint;

        },
        placeholder:function(element) {
          return element.clone().addClass("placeholder").text("drop here");
        }
      });
    </script>
```

## Further Reading

* [Kendo UI Templates](/framework/templates/overview)
* [Kendo UI DataSource](/framework/datasource/overview)

## See Also

Other articles on Kendo UI Sortable:

* [Integration with TabStrip]({% slug integrationwith_tabstrip_sortable_widget %})
* [Integration with Grid and ListView]({% slug integrationwith_gridandlistview_sortable_widget %})
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})
* [How to Use Sortable with Grid in Incell Editing Mode]({% slug howto_usesortablewithgrid_inincellediting_sortable %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Sortable Widget](/aspnet-mvc/helpers/sortable/overview)
* [Overview of the Sortable JSP Tag]({% slug overview_sortable_uiforjsp %})
* [Overview of the Sortable PHP Class](/php/widgets/sortable/overview)
* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
