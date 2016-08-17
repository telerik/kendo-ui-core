---
title: Overview
page_title: Overview | Kendo UI Drag and Drop
description: "Learn more about the draggable functionality on DOM elements and how to enable and initialize it."
slug: overview_kendoui_draganddrop_intercativityandux
position: 1
---

# Drag and Drop Overview

There are two separate Kendo UI widgets which, combined together, allow you to implement [drag and drop scenarios](http://demos.telerik.com/kendo-ui/dragdrop/index)&mdash;`kendoDraggable` and `kendoDropTarget`. The first one enables the Kendo UI Draggable functionality, while the second one creates the droppable zones.

## Draggable

Kendo UI Draggable (`kendoDraggable`) allows a DOM element to be moved using the mouse or finger on touch devices.

### Initialize the Draggable

The example below demonstrates how to initialize the Kendo UI Draggable widget.

###### Example

    <div id="draggable" style="width: 200px; height: 200px; background-color: #0ff;">drag me</div>
    <script>
        var draggable = $("#draggable").kendoDraggable({
          hint: function(element) {
            return element.clone();
          }
        });
    </script>

> **Important**
>
> The `hint` configuration option must be specified in order for the user to have a visual indication of the dragged item.

## DropTarget

The Kendo UI DropTarget element marks a DOM element as a drop target for the Kendo UI Draggable widget.

### Initialize the DropTarget

The example below demonstrates how to initialize the Kendo UI DropTarget element.

###### Example

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

> **Important**
>
> If the DropTarget element is initially empty, you must set the `height` or `min-height` properties of the element via CSS like in the example above. The user is not going to be able to drag on targets with zero height.

## DropTargetArea

The DropTargetArea allows you to create multiple DropTarget elements located in the area container. This is useful when the DropTarget elements is going to be added dynamically.

> **Important**
>
> Specifying `filter` for the DropTargetArea is mandatory.

### Initialize the DropTargetArea

The example below demonstrates how to initialize the DropTargetArea element.

###### Example

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

## Draggable and DropTarget Events

The Kendo UI Draggable, DropTarget, and DropTargetArea widgets provide various [events](/api/javascript/ui/draggable#events) that enable you to implement specific business requirements.

### Create Lists or Tables with Draggable Items

The Kendo UI Draggable widget itself does not support binding to DataSource. You are able to bind a DataSource instance to a Kendo UI ListView or Grid widget and initialize a Draggable widget for it. If the data is retrieved from a remote server asynchronously, by the time the Draggable is initialized, the items that should be draggable will not be rendered yet. Because of this, you must initialize the Draggable widget on the parent container and use the `filter` draggable configuration option with a selector that matches the Grid or ListView item elements.

The example below demonstrates how to create a Kendo UI ListView with draggable items.

###### Example

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

### Get Corresponding dataItem Dragged Element

Data management widgets such as the Kendo UI Grid or ListView automatically append an `uid` data attribute to their items' DOM elements. You are able to use the `uid` attribute to get reference to the `dataItem` from the DataSource instance, as demonstrated in the example below.

###### Example

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

### Add Visual Indications

You can also use the DropTarget events such as `dragenter` and `dragleave` to visually indicate when the dragged item enters or leaves the DropTarget element boundaries, as demonstrated in the example below.

###### Example

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

<!--*-->
### Move Items between Lists

Kendo UI Drag and Drop components do not automatically change the data-bound widget data. To apply the move changes to the DataSource instances, use the `drop` event and the DataSource's `add` and `remove` methods, as demonstrated in the example below.

###### Example

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

<!--*-->
## See Also

Other articles on Kendo UI Drag and Drop functionality:

* [Kendo UI Online Demos](http://demos.telerik.com/kendo-ui/dragdrop/index)
* [Draggable API Reference](/api/javascript/ui/draggable)
* [DropTarget API Reference](/api/javascript/ui/droptarget)
* [DropTargetArea API Reference](/api/javascript/ui/droptargetarea)
* [How to Enable and Disable Dragging at Runtime]({%slug howto_enableanddisabledraggingatruntime_intercativityandux %})
