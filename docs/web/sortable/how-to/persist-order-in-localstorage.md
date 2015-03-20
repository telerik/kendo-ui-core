---
title: Persist order in localStorage
page_title: Persist order in localStorage
description: Persist order in localStorage
---

# Persist order in localStorage

The following runnable sample demonstrates how to save the order in localStorage and restore it on page load

#### Example:

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