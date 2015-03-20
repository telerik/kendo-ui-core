---
title: Overview
page_title: Overview of DOM element Draggable functionality | Kendo UI Docs
description: Lear more about the draggable functionality on any DOM element and how to enable and initialize it. We guide you how to enable DOM elements to be targets for draggable elements.
---

# Drag & Drop Overview

There are two separate Kendo UI widgets which, combined together, allow the developer to implement Drag & Drop scenarios - `kendoDraggable` and `kendoDropTarget`.
The first one enables the draggable functionality, while the second one creates the drop-able zones.

## Draggable

The Draggable widget allows a DOM element to be moved using the mouse or finger on touch devices.

### Initialization

    <div id="draggable" style="width: 200px; height: 200px; background-color: #0ff;">drag me</div>
    <script>
        var draggable = $("#draggable").kendoDraggable({
          hint: function(element) {
            return element.clone();
          }
        });
    </script>

> The `hint` configuration option must be specified in order for the user to have a visual indication of the dragged item.

### Creating a list/table with draggable items

The Draggable widget itself does not support binding to DataSource. The developer may bind a DataSource instance to a ListView or a Grid widget and initialize a Draggable widget for it.
If the data is retrieved from a remote server **asynchronously**, by the time the Draggable is initialized the items that should be draggable will not be rendered yet.
Because of this, you should initialize the Draggable widget on the parent container and use the `filter` draggable configuration option with a selector that matches the Grid/ListView item elements.

#### ListView with draggable items

    <div id="listA"></div>

    <script>
        //create dataSource
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

        //display dataSource's data through ListView
        $("#listA").kendoListView({
            dataSource: listA_DS,
            template: "<div class='item'>ListA: #: item #</div>"
        });

        //create a draggable for the parent container
        $("#listA").kendoDraggable({
            filter: ".item", //specify which items will be draggable
            hint: function(element) { //create a UI hint, the `element` argument is the dragged item
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

## DropTarget

The DropTarget widget marks a DOM element as a drop target for a draggable widget.

### Initialization

    <div id="listB"></div>
    <script>
        $("#listB").kendoDropTarget();
    </script>
    <style>
        #listB {
            width: 300px;
            height: 280px;
            border: 3px solid black;
            border-radius: 3px;
        }
    </style>

> If the DropTarget element is initially empty, the developer should set the element `height` or `min-height` with CSS, like in the example above. The user will not be able to drag on target with zero height.

## Using the Draggable/DropTarget events

The Draggable, DropTarget and DropTargetArea widgets provide various [events](/api/javascript/ui/draggable#events) that the developer may use to implement specific business requirements.

### Getting the dragged element corresponding dataItem

Data management widgets such as the Grid or the ListView automatically append an `uid` data attribute to their items' DOM elements. The developer may use the `uid` attribute to get reference to the dataItem from the DataSource instance.

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

### Add visual indications

The developer may use the DropTarget events such as `dragenter` and `dragleave` to visually indicate that when the dragged item enters/leaves the DropTarget element boundaries.


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

        //create dropTarget
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

### Moving items from one list to another

The Drag & Drop components don't automatically change the data bound widget data.
To have the move changes applied to the DataSource instances, the developer may use the `drop` event and the DataSource's `add` and `remove` methods.

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
            drop: function(e) { //apply changes to the data after an item is dropped
                var draggableElement = e.draggable.currentTarget,
                dataItem = listA_DS.getByUid(draggableElement.data("uid")); //find the corresponding dataItem by uid

                listA_DS.remove(dataItem); //remove the item from ListA
                listB_DS.add(dataItem); //add the item to ListB

                resetStyling.call(this); //reset visual dropTarget indication that was added on dragenter
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

## DropTargetArea

The DropTargetArea allows the developer to create multiple DropTarget elements located in the area container. This is useful when the DropTarget elements will be added dynamically.

> Specifying `filter` for the DropTargetArea is mandatory!

### Initialization

    <div id="area">
      <div class="orange"></div>
      <div class="purple"></div>
      <div class="orange"></div>
      <div class="purple"></div>
    </div>

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#area").kendoDropTargetArea({
          filter: ".orange",
          drop: onDrop
      });

      function onDrop(e) {
        e.dropTarget.removeClass("orange").addClass("purple");
      }
    </script>

    <style>
      #draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
        background-color: orange;
      }
      .orange, .purple {
        width: 50px;
        height: 50px;
        margin: 10px;
        display: inline-block;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
          background-color: gray;
      }
      #droptarget {
        width: 100px;
        height: 100px;
        border: 2px solid green;
        margin: 0 96px;
        display: inline-block;
        vertical-align: middle;
      }
    </style>

### Next Steps

- [Online demos](http://demos.telerik.com/kendo-ui/dragdrop/index)
- [Draggable API reference](/api/javascript/ui/draggable)
- [DropTarget API reference](/api/javascript/ui/droptarget)
- [DropTargetArea API reference](/api/javascript/ui/droptargetarea)
