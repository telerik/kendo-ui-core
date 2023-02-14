---
title: Persist Order in the localStorage of the Sortable
page_title: Persist Order in the localStorage of the Sortable
description: "Learn how to save the order in localStorage and restore it on page load in the Kendo UI Sortable widget."
slug: howto_persistoderinlocalstorage_sortable
previous_url: /controls/interactivity/sortable/how-to/persist-order-in-localstorage
tags: telerik, kendo, jquery, sortable, persist, order, in, localstorage
component: sortable
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Sortable for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I save the order in the `localStorage` and restore it on page load in the Kendo UI Sortable?

## Solution

The following example demonstrates how to achieve the desired scenario.

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

        html = kendo.render(kendo.template($("#tmp").html()), data); // Render the HTML with the data.
        $("#sortable").html(html); // Append the HTML to the Sortable container.

        $("#sortable").kendoSortable({ // Initialize the Sortable.
            filter: ".sortable",
            change: function(e) {
                var item = data.splice(e.oldIndex, 1)[0]; // Remove the item that has changed its order.
                data.splice(e.newIndex, 0, item); // Add the item back using the newIndex.

                localStorage.setItem("sortableData", kendo.stringify(data)); // Set the updated data in the local storage.
            }
        });

        $("#reset").click(function() {
            localStorage.clear(); // Clear the local storage.
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

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
