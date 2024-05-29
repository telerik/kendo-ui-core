---
title: DockManager
page_title: Configuration, methods and events of Kendo UI DockManager
description: Configuration options, methods and events for the Kendo UI DockManager widget.
res_type: api
component: dockmanager
---

# kendo.ui.DockManager

Represents the Kendo UI DockManager. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### rootPane `Object`

Defines the root pane configuration.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "split",
                        panes: [{
                                type: "content",
                                title: "Pane 1",
                                content: "Split Pane 1",
                                size: "40%"
                            }, {
                                type: "tab",
                                    panes: [{
                                        type: "content",
                                        title: "Tab 1",
                                        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 2",
                                        content: "Commodi suscipit porro optio veritatis obcaecati nostrum molestias dolor maxime!"
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 3",
                                        content: "Molestias ducimus placeat quia possimus esse atque odio, a recusandae iste exercitationem"
                                    }],
                                size: "60%"
                            }]
                        }, {
                        type: "content",
                        header: "Bottom Tab",
                        content: "Bottom content",
                        size: "50%"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.id `String`

Defines the id of the root pane

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Split Pane 2",
                        }]
                }
            });
    </script>

### rootPane.orientation `String` *(default: "horizontal")*

Defines the orientation of the split pane. Available options are `horizontal` or `vertical`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Split Pane 2",
                        }]
                }
            });
    </script>

### rootPane.panes `Array`

An array of pane definitions.

### rootPane.panes.closeable `Boolean` *(default: true)*

Specifies if the pane can be closed. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                            closeable: false
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Split Pane 2",
                        }]
                }
            });
    </script>

### rootPane.panes.content `String|Function`

The content of the pane. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Split Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: ({ username }) => `User name: ${username}`,
                        }]
                }
            });
    </script>

### rootPane.panes.dockable `Object|Boolean` *(default: true)*

Specifies if the pane can be docked and allow inner docking of other panes. Accepts boolean or object. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            dockable: false
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                        }]
                }
            });
    </script>

### rootPane.panes.dockable.dock `Boolean` *(default: true)*

Specifies if the pane is docked. Available only for panes of type `content`.

### rootPane.panes.dockable.innerDock `Boolean` *(default: true)*

Specifies if the pane allows inner docks. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            dockable: {
                                innerDock: false
                            }
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                        }]
                }
            });
    </script>

### rootPane.panes.header `String|Function`

Sets the content of the header. Accepts a string or a kendo template. By default, the same content is displayed in the tab when the pane is unpinned or within a pane of type `tab`. If not specified the title is displayed. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    id: "rootPaneId",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            header: "Pane 1 header"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: ({ headerContent }) => `Pane: ${headerContent}`,
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                        }]
                }
            });
    </script>

### rootPane.panes.id `String`

Defines the id of the pane

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            id: "myFirstPane"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                            id: "mySecondPane"
                        }]
                }
            });
    </script>

### rootPane.panes.orientation `String` *(default: "horizontal")*

Specifies the orientation of a split pane. Supported values are "horizontal" and "vertical".

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

### rootPane.panes.panes `Array`

Specifies an array of pane definitions.

### rootPane.panes.selected `Number`

Specifies the index of the initially selected tab. Available only for panes of type `tab`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "tab",
                    selected: 2,
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2"
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3"
                        }]
                }
            });
    </script>

### rootPane.panes.size `String`

Specifies the size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                            type: "content",
                            title: "Pane 1",
                            content: "Pane 1",
                            size: "20%"
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                            size: "30%"
                        },{
                            type: "content",
                            title: "Pane 3",
                            content: "Pane 3",
                            size:"50%"
                        }]
                }
            });
    </script>


### rootPane.panes.tabHeader `String|Function`

Sets the content of the tab when the pane is unpinned or within a `tab` pane. If not specified, `header` content is used. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        tabHeader: "I'm unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.title `String`

Sets the title of the pane. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>


### rootPane.panes.type `String`

Specifies the type of the pane. Available options are `tab`, `split` or `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "split",
                        panes: [{
                                type: "content",
                                title: "Pane 1",
                                content: "Split Pane 1",
                                size: "40%"
                            }, {
                                type: "tab",
                                    panes: [{
                                        type: "content",
                                        title: "Tab 1",
                                        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 2",
                                        content: "Commodi suscipit porro optio veritatis obcaecati nostrum molestias dolor maxime!"
                                    },
                                    {
                                        type: "content",
                                        title: "Tab 3",
                                        content: "Molestias ducimus placeat quia possimus esse atque odio, a recusandae iste exercitationem"
                                    }],
                                size: "60%"
                            }]
                        }, {
                        type: "content",
                        header: "Bottom Tab",
                        content: "Bottom content",
                        size: "50%"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.unpinnable `Object|Boolean` *(default: true)*

Specifies if the pane can be pinned/unpinnned. Available only for panes of type `content`.

### rootPane.panes.unpinnable.unpinned `Boolean` *(default: true)*

Specifies if the pane is unpinned. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Other content",
                        unpinnable: {
                            unpinned: false
                        }
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.unpinnable.unpinnedSize `String`

The size of the pane when unpinned. If not specified the pinned size is used. Available only for panes of type `content`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true,
                            unpinnedSize: "500px"
                        }
                    }]
                }
            });
    </script>

### rootPane.panes.visible `Boolean` *(default: true)*

Specifies if the pane is initially visible.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        header: "Pane 2",
                        content: "Hidden Pane",
                        visible: false
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            });
    </script>

### rootPane.type `String` *(default: "split")*

Defines the id of the root pane. Available options are `tab` or `split`.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "tab",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    }, {
                        type: "content",
                        header: "Pane 2",
                        content: "Secpnd Pane content"
                    }, {
                        type: "content",
                        title: "Pane 3",
                        content: "Third Pane content"
                    }]
                }
            });
    </script>

## Methods

### togglePane

Toggles the visibility of a pane.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    var dockmanager = $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        id: "hiddenPaneId",
                        header: "Pane 2",
                        content: "Hidden Pane",
                        visible: false
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            }).data("kendoDockManager");

            dockmanager.toggle("hiddenPaneId") //Toggles the visibility of the pane with id "hiddenPaneId".
    </script>

#### Parameters

##### id `String`

The `id` assigned as a configuration option of the pane.

### refresh

Renders all panes with the current `panes` configuration.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    var dockmanager = $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        id: "hiddenPaneId",
                        header: "Pane 2",
                        content: "Hidden Pane",
                        visible: false
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            }).data("kendoDockManager");

            dockmanager.refresh();
    </script>

### removePane

Removes a pane.

#### Parameters

##### id `String`

The `id` assigned as a configuration option of the pane.

#### Example
    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    var dockmanager = $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    panes: [{
                        type: "content",
                        header: "Pane 1",
                        content: "Pane content"
                    },{
                        type: "content",
                        id: "myPaneId",
                        header: "Pane 2",
                        content: "More content"
                    }, {
                        type: "content",
                        header: "Pane 3",
                        content: "Other content"
                    }, {
                        type: "content",
                        title: "Unpinned",
                        content: "Some unpinned content",
                        unpinnable: {
                            unpinned: true
                        }
                    }]
                }
            }).data("kendoDockManager");

            dockmanager.remove("myPaneId"); // Remove the pane with id "myPaneId".
    </script>

## Events

### close

Triggered when the pane is closed.

#### Example - subscribing to the close event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                close: function(e){
                    // pane is closed
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the close event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_close(e) {
      // pane is closed
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_close);
    </script>

### dock

Triggered when a pane is docked.

#### Example - subscribing to the dock event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                dock: function(e){
                    // pane is docked
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the dock event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_dock(e) {
      // pane is docked
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_dock);
    </script>

### drag

Triggered when a pane is dragged.

#### Example - subscribing to the drag event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                drag: function(e){
                    // pane is dragged
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the drag event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_drag(e) {
      // pane is dragged
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_drag);
    </script>

### dragEnd

#### Example - subscribing to the dragEnd event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                dragEnd: function(e){
                    // dragging has finished
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the dragEnd event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_dragEnd(e) {
      // dragging has finished
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical"
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_dragEnd);
    </script>

### dragStart

Triggered when item drag starts.

#### Example - subscribing to the dragStart event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                dragStart: function(e){
                    // dragging started
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the dragStart event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_dragStart(e) {
      // dragging started
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical"
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_dragStart);
    </script>

### innerDock

Triggered when a pane is docked in the current pane.

#### Example - subscribing to the innerDock event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                innerDock: function(e){
                    // pane is docked
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the innerDock event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_innerDock(e) {
      // pane is docked
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical"
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_innerDock);
    </script>

### pin

Triggered when a pane is pinned.

#### Example - subscribing to the pin event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                pin: function(e){
                    // pane is pinned
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the pin event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_pin(e) {
      // pane is pinned
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical"
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_pin);
    </script>

### resize

Triggered when a pane is resized.

#### Example - subscribing to the resize event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                resize: function(e){
                    // pane is resized
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the resize event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_resize(e) {
      // pane is resized
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical"
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_resize);
    </script>

### unpin

Triggered when a pane is unpinned.

#### Example - subscribing to the unpin event during initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    $("#dockmanager").kendoDockManager({
                unpin: function(e){
                    // pane is unpinned
                },
                rootPane: {
                    type: "split",
                    orientation: "vertical",
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    </script>

#### Example - subscribing to the unpin event after initialization

    <div style="height:500px; width:1000px">
        <div id="dockmanager"></div>
    </div>
    <script>
    function pane_unpin(e) {
      // pane is unpinned
    }
    $("#dockmanager").kendoDockManager({
                rootPane: {
                    type: "split",
                    orientation: "vertical"
                    panes: [{
                            type: "content",
                            title: "Pane title",
                            content: "Pane 1",
                        },{
                            type: "content",
                            title: "Pane 2",
                            content: "Pane 2",
                        }]
                }
            });
    var dockmanager = $("#dockmanager").data("kendoDockManager");
    dockmanager.bind("close", pane_unpin);
    </script>

