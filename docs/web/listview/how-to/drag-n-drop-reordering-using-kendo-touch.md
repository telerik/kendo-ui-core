---
title: Drag and Drop reordering using Kendo UI Touch
page_title: Drag and Drop reordering using Kendo UI Touch
description: Drag and Drop reordering using Kendo UI Touch  
---

The following runnable sample demonstrates implementation for drag'n'drop reordering in ListView using kendoTouch tap event. The approach is suitable for mobile devices as it does not prevent the scrolling of the page/widget.

```html
    <!-- kendo Web ListView -->
    <div id="listview"></div>
    <script id="tmp" type="text/x-kendo-template">
        <div class="item">
            <p>#: item #</p>
        </div>
    </script>

    <script>
        var touchStartEvent, //variable that will hold the original "down" event
            dataSource = new kendo.data.DataSource({ //dataSource configuration
                data: [
                    { id: 1, item: "Item 1", order: 1 },
                    { id: 2, item: "Item 2", order: 2 },
                    { id: 3, item: "Item 3", order: 3 },
                    { id: 4, item: "Item 4", order: 4 },
                    { id: 5, item: "Item 5", order: 5 },
                    { id: 6, item: "Item 6", order: 6 },
                    { id: 7, item: "Item 7", order: 7 },
                    { id: 8, item: "Item 8", order: 8 },
                    { id: 9, item: "Item 9", order: 9 },
                    { id: 10, item: "Item 10", order: 10 },
                    { id: 11, item: "Item 11", order: 11 },
                    { id: 12, item: "Item 12", order: 12 }
                ],
                sort: { field: "order", dir: "asc" },
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { type: "number" },
                            item: { type: "string" },
                            order: { type: "number" }
                        }
                    }
                }
            });

        //initialize the ListView
        $("#listview").kendoListView({
            dataSource: dataSource,
            template: $("#tmp").html(),
            dataBound: createTouchables //initialize KendoTouch for ListView's items
        });

        function createTouchables() {
            this.element.find(".item").kendoTouch({
                touchstart: function(e) {
                    //store the original event, required in order to start dragging the element immediately
                    touchStartEvent = e.event;
                },
                hold: function(e) {
                    this.element.addClass("draggable");
                    this.element.kendoDraggable({
                        group: "listviewItems",
                        hint: generateHint,
                        //destroy the component when dragging is finished or canceled
                        dragend: destroyDraggable,
                        cancel: destroyDraggable
                    });

                    //the following code forces draggable element to start dragging immediately (without lifting the finder)
                    this.element.data("kendoDraggable").userEvents._start(touchStartEvent);
                }
            });
        }

        //create drop targets
        $("#listview").kendoDropTargetArea({
            filter: ".item:not(.draggable)",
            group: "listviewItems",
            dragenter: function(e) {
                e.dropTarget.addClass("red");
            },
            dragleave: function(e) {
                e.dropTarget.removeClass("red");
            },
            drop: function(e) {
                var draggableDataItem = dataSource.getByUid(e.draggable.element.data("uid")),
                    dropTargetDataItem = dataSource.getByUid(e.dropTarget.data("uid")),
                    temp;
                //logic for swapping the items position
                temp = draggableDataItem.order;
                draggableDataItem.set("order", dropTargetDataItem.order);
                dropTargetDataItem.set("order", temp);
                dataSource.sort({ field: "order", dir: "asc" });

                e.dropTarget.removeClass("red");
            }
        })

        function generateHint(element) {
            var hint = element.clone();
            hint.css({
                "width": element.width(),
                "height": element.height()
            });

            this.element.css("opacity", 0.5);

            return hint;
        }

        function destroyDraggable(e) {
            e.currentTarget.css("opacity", 1);
            e.currentTarget.removeClass("draggable");
            this.destroy();
        }

    </script>

    <style>
        .item { 
            border: 2px solid green;
            border-radius: 0.5em;
            margin: 5px;
            padding-left: 1em;
        }

        .draggable {
            background-color: yellow;
        }

        .dragged { 
            padding: 1em;
            background-color: orange;
            border: 2px solid orange;
            border-radius: 0.5em;
         }

         .red { background-color: red; }
        
         #listview {
             -webkit-user-select: none;
             -moz-user-select: none;
             -ms-user-select: none;
             user-select: none;
         }
    </style>
```