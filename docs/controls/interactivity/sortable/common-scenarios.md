---
title: Common Scenarios
page_title: jQuery Sortable Documentation | Common Scenarios
description: "Get started with the jQuery Sortable by Kendo UI and implement some common use-case scenarios."
slug: scenarios_kendoui_sortable
position: 7
---

# Common Scenarios

This article provides common scenarios you might encounter when working with the Kendo UI Sortable widget.

* [Persisting the current items order](#persisting-the-current-items-order)
* [Handling items which contain input elements](#handling-items-with-input-elements)
* [Handling the selection of radio buttons](#handling-radio-button-selections)

## Persisting the Current Items Order

By default, the Sortable does not persist the order of the current items. To detect changes in the items order and save them in local storage or submit them to the server with [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/), use the `change` event. To restore the Sortable layout, render the DOM elements in their last order.

The following example demonstrates how to persist the order of items in local storage.

```dojo
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
            // Retrieve the local storage data if such is available. Otherwise, use the default order.
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

## Handling Items with input Elements

The `<input>` elements inside Sortable items cannot be focused because the items are draggable. To avoid that, use the `ignore` option.

```dojo
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

## Handling Radio Button Selections

A Sortable with radio buttons and a hint cloned from the Sortable element will lose the selected radio button if dragged because the clone will take over the selection. To avoid this behavior, clear the name of the radio button in the hint.

```dojo
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
          // Alternatively, you may remove the input from the hint.
          hint.find("input").attr("name", "");
          return hint;

        },
        placeholder:function(element) {
          return element.clone().addClass("placeholder").text("drop here");
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
