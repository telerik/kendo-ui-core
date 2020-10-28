---
title: Common Scenarios
page_title: jQuery Drag-and-Drop Documentation | Common Scenarios
description: "Get started with the jQuery Drag-and-Drop by Kendo UI and handle some of the common scenarios when using the drag-and-drop functionality."
slug: scenarios_kendoui_draganddrop
position: 2
---

# Common Scenarios

The Kendo UI Draggable, DropTarget, and DropTargetArea provide options for implementing common and specific use-case scenarios.

## Creating Lists or Tables with Draggable Items

The Draggable does not support binding to the DataSource component. To work around this issue, bind a DataSource instance to a Kendo UI ListView or Grid widget and initialize a Draggable widget for it. If you asynchronously retrieve the data from a remote server, by the time the Draggable is initialized the items that have to be draggable will not be rendered. As a result, you have to initialize the Draggable on the parent container and use the `filter` Draggable configuration option with a selector that matches the Grid or ListView item elements.

The following example demonstrates how to create a ListView with draggable items.

    <div id="listA"></div>

    <script>
        // Create the dataSource.
        var listA_DS = new kendo.data.DataSource({
            data: [
                { id: 1, item: "Item 1" },
                { id: 2, item: "Item 2" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        item: { type: "string" }
                    }
                }
            }
        });

        // Display the dataSource data through the ListView.
        $("#listA").kendoListView({
            dataSource: listA_DS,
            template: "<div class='item'>ListA: #: item #</div>"
        });

        // Create a draggable for the parent container.
        $("#listA").kendoDraggable({
            filter: ".item", // Specify which items will be draggable.
            hint: function(element) { // Create a UI hint. The `element` argument is the dragged item.
                return element.clone().css({
                    "opacity": 0.6,
                    "background-color": "#0cf"
                });
            }
        });
    </script>

    <style>
        #listA {
            width: 300px;
            border: 3px solid black;
            border-radius: 3px;
        }

        .item {
            margin: 5px;
            padding: 5px;
            text-align: center;
            border: 2px solid #ccc;
            border-radius: 5px;
        }
    </style>

## Getting the Corresponding Dragged dataItem Element

Data management widgets, such as the Kendo UI Grid or ListView, append a `uid` data attribute to the DOM elements of their items. You can use the `uid` attribute to get a reference to the `dataItem` from the DataSource instance.

    <div id="listA"></div>
    <script>
        $("#listA").kendoListView({
            dataSource: listA_DS,
            template: "<div class='item'>ListA: #: item #</div>"
        });

        $("#listA").kendoDraggable({
            filter: ".item",
            dragstart: function(e) {
                var draggedElement = e.currentTarget, //get the DOM element that is being dragged
                    dataItem = listA_DS.getByUid(draggedElement.data("uid")); //get corresponding dataItem from the DataSource instance

                console.log(dataItem);
            },
            hint: function(element) {
                return element.clone().css({
                    "opacity": 0.6,
                    "background-color": "#0cf"
                });
            }
        });
    </script>

## Adding Visual Indications

You can also use the `dragenter` and `dragleave` DropTarget events to visually indicate when the dragged item enters or leaves the DropTarget element boundaries.

    <div id="listA"></div>
    <div id="listB"></div>
    <script>
        var listA_DS= new kendo.data.DataSource({
            data: [
                { id: 1, item: "Item 1" },
                { id: 2, item: "Item 2" },
                { id: 3, item: "Item 3" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        item: { type: "string" }
                    }
                }
            }
        });

        var listB_DS= new kendo.data.DataSource({
            data: [ /* still no data */ ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        item: { type: "string" }
                    }
                }
            }
        });

        $("#listA").kendoListView({
            dataSource: listA_DS,
            template: "<div class='item'>ListA: #: item #</div>"
        });

        $("#listA").kendoDraggable({
            filter: ".item",
            hint: function(element) {
                return element.clone().css({
                    "opacity": 0.6,
                    "background-color": "#0cf"
                });
            }
        });

        $("#listB").kendoListView({
            dataSource: listB_DS,
            template: "<div class='item'>ListB: #: item #</div>"
        });

        function addStyling(e) {
            this.element.css({
                "border-color": "#06c",
                "background-color": "#e0e0e0",
                "opacity": 0.6
            });
        }

        function resetStyling(e) {
            this.element.css({
                "border-color": "black",
                "background-color": "transparent",
                "opacity": 1
            });
        }

        // Create the dropTarget.
        $("#listB").kendoDropTarget({
            dragenter: addStyling, //add visual indication
            dragleave: resetStyling, //remove the visual indication
        });
    </script>
    <style>
        #listA, #listB {
            width: 300px;
            height: 280px;
            float: left;
            margin-right: 30px;
            border: 3px solid black;
            border-radius: 3px;
        }

        .item {
            margin: 5px;
            padding: 5px;
            text-align: center;
            border: 2px solid #ccc;
            border-radius: 5px;
        }
    </style>

<!--*-->
## Moving Items between Lists

The Drag-and-Drop components do not automatically change the data-bound widget data. To apply the move changes to the DataSource instances, use the `drop` event and the `add` and `remove` methods of the DataSource.

    <div id="listA"></div>
    <div id="listB"></div>
    <script>
        var listA_DS= new kendo.data.DataSource({
            data: [
                { id: 1, item: "Item 1" },
                { id: 2, item: "Item 2" },
                { id: 3, item: "Item 3" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        item: { type: "string" }
                    }
                }
            }
        });

        var listB_DS= new kendo.data.DataSource({
            data: [ /* Still no data */ ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        item: { type: "string" }
                    }
                }
            }
        });

        function addStyling(e) {
            this.element.css({
                "border-color": "#06c",
                "background-color": "#e0e0e0",
                "opacity": 0.6
            });
        }

        function resetStyling(e) {
            this.element.css({
                "border-color": "black",
                "background-color": "transparent",
                "opacity": 1
            });
        }

        $("#listA").kendoListView({
            dataSource: listA_DS,
            template: "<div class='item'>ListA: #: item #</div>"
        });

        $("#listA").kendoDraggable({
            filter: ".item",
            hint: function(element) {
                return element.clone().css({
                    "opacity": 0.6,
                    "background-color": "#0cf"
                });
            }
        });

        $("#listB").kendoListView({
            dataSource: listB_DS,
            template: "<div class='item'>ListB: #: item #</div>"
        });

        $("#listB").kendoDropTarget({
            dragenter: addStyling,
            dragleave: resetStyling,
            drop: function(e) { // Apply the changes to the data after an item is dropped.
                var draggableElement = e.draggable.currentTarget,
                dataItem = listA_DS.getByUid(draggableElement.data("uid")); // Find the corresponding dataItem by uid.

                listA_DS.remove(dataItem); // Remove the item from ListA.
                listB_DS.add(dataItem); // Add the item to ListB.

                resetStyling.call(this); // Reset the visual dropTarget indication that was added on dragenter.
            }
        });
    </script>
    <style>
        #listA, #listB {
            width: 300px;
            height: 280px;
            float: left;
            margin-right: 30px;
            border: 3px solid black;
            border-radius: 3px;
        }

        .item {
            margin: 5px;
            padding: 5px;
            text-align: center;
            border: 2px solid #ccc;
            border-radius: 5px;
        }
    </style>

<!--*-->
## See Also

* [Using the Events of the Drag-and-Drop (Demo)](https://demos.telerik.com/kendo-ui/dragdrop/events)
* [API Reference of Draggable](/api/javascript/ui/draggable)
* [API Reference of DropTarget](/api/javascript/ui/droptarget)
* [API Reference of DropTargetArea](/api/javascript/ui/droptargetarea)
