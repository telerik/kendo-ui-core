---
title: Sankey
page_title: Configuration, methods and events of Kendo UI DataViz Sankey
description: Learn the configuration options for Sankey component, set its options, use methods properly.
res_type: api
component: sankey
---

# kendo.dataviz.ui.Sankey

Represents the Kendo UI Sankey component. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### data `Object` *(required)*

The data of the Sankey. The data object contains the Sankey nodes and links configuration.

#### Example - Setting the data of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });
    </script>

### data.links `Array` *(required)*

The links of the Sankey. The links are the connections between the nodes.
Each link has a `sourceId` and `targetId` that correspond to the id of the source and target nodes, and a `value` that represents the value of the link.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Source 1" } },
                    { id: 2, label: { text: "Source 2" } },
                    { id: 3, label: { text: "Target" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 50 },
                    { sourceId: 2, targetId: 3, value: 30 }
                ]
            }
        });
    </script>

### data.links.color `String`

The color of the link. The color is used when the `colorType` option is set to `static`. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10, color: "#ff6358", colorType: "static" }
                ]
            }
        });
    </script>

### data.links.colorType `String`

The color type of the link. The supported values are:

* "static" - The link color is static. The color is determined by the link's `color` option.
* "source" - The link color is the same as the source node color.
* "target" - The link color is the same as the target node color.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" }, color: "#ff6358" },
                    { id: 2, label: { text: "Node 2" }, color: "#1f8ef1" }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10, colorType: "source" }
                ]
            }
        });
    </script>

### data.links.highlight `Object`

The link highlight configuration options.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { 
                        sourceId: 1, 
                        targetId: 2, 
                        value: 10,
                        highlight: {
                            opacity: 0.9,
                            inactiveOpacity: 0.1
                        }
                    }
                ]
            }
        });
    </script>

### data.links.highlight.inactiveOpacity `Number` *(default: 0.2)*

The opacity of the links when another link is highlighted by hovering or tapping on it.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { 
                        sourceId: 1, 
                        targetId: 2, 
                        value: 10,
                        highlight: {
                            inactiveOpacity: 0.1
                        }
                    },
                    { 
                        sourceId: 2, 
                        targetId: 3, 
                        value: 5,
                        highlight: {
                            inactiveOpacity: 0.1
                        }
                    }
                ]
            }
        });
    </script>

### data.links.highlight.opacity `Number` *(default: 0.8)*

The opacity of the links when they are highlighted by hovering or tapping on them.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { 
                        sourceId: 1, 
                        targetId: 2, 
                        value: 10,
                        highlight: {
                            opacity: 1.0
                        }
                    }
                ]
            }
        });
    </script>

### data.links.opacity `Number` *(default: 0.4)*

The opacity of the links.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10, opacity: 0.8 }
                ]
            }
        });
    </script>

### data.links.sourceId `Number|String` *(required)*

The source node ID of the link. The source node is the node from which the link originates.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: "source1", label: { text: "Source Node" } },
                    { id: "target1", label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: "source1", targetId: "target1", value: 10 }
                ]
            }
        });
    </script>

### data.links.targetId `Number|String` *(required)*

The target node ID of the link. The target node is the node to which the link points.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Source Node" } },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.links.value `Number` *(required)*

The value of the link. The value represents the weight of the link and determines the width of the link.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 25 }
                ]
            }
        });
    </script>

### data.nodes `Array` *(required)*

The nodes of the Sankey. The nodes are the elements that are connected by the links. Each node has an `id` that is used to connect the nodes with the links.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Input 1" }, color: "#ff6358" },
                    { id: 2, label: { text: "Input 2" }, color: "#ffd246" },
                    { id: 3, label: { text: "Process" }, color: "#78d237" },
                    { id: 4, label: { text: "Output" }, color: "#28b4c8" }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 30 },
                    { sourceId: 2, targetId: 3, value: 20 },
                    { sourceId: 3, targetId: 4, value: 50 }
                ]
            }
        });
    </script>

### data.nodes.align `String`

The alignment of the node. The supported values are:

* "stretch" - The node is aligned to left or right in order to fill the entire width of the Sankey.
* "left" - The node is aligned to the left.
* "right" - The node is aligned to the right.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Left Node" }, align: "left" },
                    { id: 2, label: { text: "Right Node" }, align: "right" },
                    { id: 3, label: { text: "Center Node" }, align: "stretch" }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 10 },
                    { sourceId: 2, targetId: 3, value: 15 }
                ]
            }
        });
    </script>

### data.nodes.color `String`

The color of the node. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Red Node" }, color: "#ff6358" },
                    { id: 2, label: { text: "Blue Node" }, color: "#1f8ef1" }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.id `Number|String` *(required)*

The ID of the node. The ID is used to connect the nodes with the links.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: "node-1", label: { text: "First Node" } },
                    { id: "node-2", label: { text: "Second Node" } }
                ],
                links: [
                    { sourceId: "node-1", targetId: "node-2", value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label `Object` *(required)*

The label of the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Custom Label",
                            color: "#ff6358",
                            font: "bold 14px Arial"
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.align `String` *(default: "left")*

The alignment of the label. The supported values are:

* "left" - The label is aligned to the left.
* "right" - The label is aligned to the right.
* "center" - The label is aligned to the center.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Left Label", align: "left" } },
                    { id: 2, label: { text: "Center Label", align: "center" } },
                    { id: 3, label: { text: "Right Label", align: "right" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 },
                    { sourceId: 2, targetId: 3, value: 5 }
                ]
            }
        });
    </script>

### data.nodes.label.border `Object`

The border of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Bordered Label",
                            border: {
                                color: "#ff6358",
                                width: 2,
                                dashType: "solid"
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Red Border",
                            border: {
                                color: "#ff6358",
                                width: 2
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Dashed Border",
                            border: {
                                color: "#ff6358",
                                width: 2,
                                dashType: "dash"
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Thick Border",
                            border: {
                                color: "#ff6358",
                                width: 3
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.color `String`

The color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Colored Label",
                            color: "#ff6358"
                        } 
                    },
                    { id: 2, label: { text: "Default Color" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.font `String`

The font of the label. Accepts a valid CSS font string. For example, "bold 12px Arial".

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Custom Font",
                            font: "bold 16px Arial"
                        } 
                    },
                    { id: 2, label: { text: "Default Font" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.margin `Object`

The margin of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "With Margin",
                            margin: {
                                left: 10,
                                right: 5
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.margin.left `Number` *(default: 0)*

The left margin of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Left Margin",
                            margin: {
                                left: 15
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.margin.right `Number` *(default: 0)*

The right margin of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Right Margin",
                            margin: {
                                right: 15
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.offset `Object`

The offset applied to the label's position.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Offset Label",
                            offset: {
                                left: 10,
                                top: -5
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.offset.left `Number` *(default: 0)*

The left offset of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Left Offset",
                            offset: {
                                left: 20
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.offset.top `Number` *(default: 0)*

The top offset of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Top Offset",
                            offset: {
                                top: -10
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.padding `Number|Object`

The padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Padded Label",
                            padding: {
                                top: 5,
                                bottom: 5,
                                left: 10,
                                right: 10
                            },
                            border: {
                                color: "#ff6358",
                                width: 1
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.padding.bottom `Number` *(default: 0)*

The bottom padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Bottom Padding",
                            padding: {
                                bottom: 8
                            },
                            border: {
                                color: "#ff6358",
                                width: 1
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.padding.left `Number` *(default: 0)*

The left padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Left Padding",
                            padding: {
                                left: 12
                            },
                            border: {
                                color: "#ff6358",
                                width: 1
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.padding.right `Number` *(default: 0)*

The right padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Right Padding",
                            padding: {
                                right: 12
                            },
                            border: {
                                color: "#ff6358",
                                width: 1
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.padding.top `Number` *(default: 0)*

The top padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Top Padding",
                            padding: {
                                top: 8
                            },
                            border: {
                                color: "#ff6358",
                                width: 1
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.position `String` *(default: "inside")*

The position of the label. The supported values are:

* "inside" - The label is positioned after the node, except for the nodes at the end of the Sankey, that are placed before the node.
* "before" - The label is positioned before the node.
* "after" - The label is positioned after the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Before Node", position: "before" } },
                    { id: 2, label: { text: "After Node", position: "after" } },
                    { id: 3, label: { text: "Inside Node", position: "inside" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 10 },
                    { sourceId: 2, targetId: 3, value: 5 }
                ]
            }
        });
    </script>

### data.nodes.label.stroke `Object`

The stroke of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Stroked Label",
                            stroke: {
                                color: "#ff6358",
                                width: 2,
                                lineJoin: "round"
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.stroke.color `String`

The color of the stroke.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Stroke Color",
                            stroke: {
                                color: "#28b4c8",
                                width: 2
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.stroke.lineJoin `String` *(default: "round")*

The line join of the stroke.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Line Join",
                            stroke: {
                                color: "#ff6358",
                                width: 3,
                                lineJoin: "miter"
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.stroke.width `Number` *(default: 1)*

The width of the stroke.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { 
                            text: "Stroke Width",
                            stroke: {
                                color: "#ff6358",
                                width: 4
                            }
                        } 
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.text `String` *(required)*

The text of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Custom Label Text" } },
                    { id: 2, label: { text: "Another Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.label.visible `Boolean` *(default: true)*

If set to `false`, the label will not be displayed.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Visible Label", visible: true } },
                    { id: 2, label: { text: "Hidden Label", visible: false } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.offset `Object` *(default: { top: 0, left: 0 })*

The offset applied to the node's position.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { text: "Offset Node" },
                        offset: {
                            left: 20,
                            top: 10
                        }
                    },
                    { id: 2, label: { text: "Normal Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.offset.left `Number`

The left offset of the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { text: "Left Offset" },
                        offset: {
                            left: 25
                        }
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.offset.top `Number`

The top offset of the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { 
                        id: 1, 
                        label: { text: "Top Offset" },
                        offset: {
                            top: 15
                        }
                    },
                    { id: 2, label: { text: "Target Node" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.opacity `Number` *(default: 1)*

The opacity of the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Semi-transparent" }, opacity: 0.5 },
                    { id: 2, label: { text: "Opaque" }, opacity: 1.0 }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.padding `Number` *(default: 16)*

The minimum vertical space between two nodes.

#### Example

    <div id="sankey" style="width: 500px; height: 300px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" }, padding: 30 },
                    { id: 2, label: { text: "Node 2" }, padding: 30 },
                    { id: 3, label: { text: "Node 3" }, padding: 5 },
                    { id: 4, label: { text: "Node 4" }, padding: 5 }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 10 },
                    { sourceId: 2, targetId: 4, value: 10 }
                ]
            }
        });
    </script>

### data.nodes.width `Number` *(default: 24)*

The width of the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Wide Node" }, width: 40 },
                    { id: 2, label: { text: "Narrow Node" }, width: 10 }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            }
        });
    </script>

### disableAutoLayout `Boolean` *(default: false)*

If set to `true`, the Sankey will not automatically reorder the nodes to reduce the number of links that cross over each other.

#### Example - Disabling the automatic layout of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            disableAutoLayout: true
        });
    </script>

### disableKeyboardNavigation `Boolean` *(default: false)*

If set to `true`, the Sankey keyboard navigation will be disabled.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            disableKeyboardNavigation: true
        });
    </script>

### labels `Object`

The default labels configuration of the Sankey. The labels configuration options will be overridden by the `data.nodes.label` configuration.

#### Example - Setting the default labels options of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            labels: {
                align: "left",
                color: "red",
                font: "12px Arial,Helvetica,sans-serif",
                margin: { left: 8, right: 8 },
                offset: { left: 0, top: 0 },
                opacity: 1,
                padding: 0,
                position: "inside",
                stroke: { color: "white", lineJoin: "round", width: 1 },
                visible: true
            }
        });
    </script>

### labels.align `String` *(default: "left")*

The alignment of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                align: "center"
            }
        });
    </script>

### labels.border `Object`

The border of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                border: {
                    color: "#ff6358",
                    width: 2,
                    dashType: "solid"
                }
            }
        });
    </script>

### labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                border: {
                    color: "#28b4c8",
                    width: 2
                }
            }
        });
    </script>

### labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                border: {
                    color: "#ff6358",
                    width: 2,
                    dashType: "dash"
                }
            }
        });
    </script>

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                border: {
                    color: "#ff6358",
                    width: 3
                }
            }
        });
    </script>

### labels.color `String`

The color of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                color: "#ff6358"
            }
        });
    </script>

### labels.font `String`

The font of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                font: "bold 16px Arial"
            }
        });
    </script>

### labels.margin `Object`

The margin of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                margin: {
                    left: 15,
                    right: 10
                }
            }
        });
    </script>

### labels.margin.left `Number` *(default: 8)*

The left margin of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                margin: {
                    left: 20
                }
            }
        });
    </script>

### labels.margin.right `Number` *(default: 8)*

The right margin of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                margin: {
                    right: 20
                }
            }
        });
    </script>

### labels.offset `Object`

The offset applied to the label's position.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                offset: {
                    left: 10,
                    top: -5
                }
            }
        });
    </script>

### labels.offset.left `Number` *(default: 0)*

The left offset of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                offset: {
                    left: 15
                }
            }
        });
    </script>

### labels.offset.top `Number` *(default: 0)*

The top offset of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                offset: {
                    top: -10
                }
            }
        });
    </script>

### labels.padding `Number|Object` *(default: 0)*

The padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 10,
                    right: 10
                },
                border: {
                    color: "#ff6358",
                    width: 1
                }
            }
        });
    </script>

### labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                padding: {
                    bottom: 10
                },
                border: {
                    color: "#ff6358",
                    width: 1
                }
            }
        });
    </script>

### labels.padding.left `Number` *(default: 0)*

The left padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                padding: {
                    left: 12
                },
                border: {
                    color: "#ff6358",
                    width: 1
                }
            }
        });
    </script>

### labels.padding.right `Number` *(default: 0)*

The right padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                padding: {
                    right: 12
                },
                border: {
                    color: "#ff6358",
                    width: 1
                }
            }
        });
    </script>

### labels.padding.top `Number` *(default: 0)*

The top padding of the label.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                padding: {
                    top: 8
                },
                border: {
                    color: "#ff6358",
                    width: 1
                }
            }
        });
    </script>

### labels.position `String` *(default: "inside")*

The position of the label. The supported values are:

* "inside" - The label is positioned after the node, except for the nodes at the end of the Sankey, that are placed before the node.
* "before" - The label is positioned before the node.
* "after" - The label is positioned after the node.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                position: "before"
            }
        });
    </script>

### labels.stroke `Object`

The stroke of the label text.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                stroke: {
                    color: "#ff6358",
                    width: 2,
                    lineJoin: "round"
                }
            }
        });
    </script>

### labels.stroke.color `String`

The color of the stroke.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                stroke: {
                    color: "#28b4c8",
                    width: 2
                }
            }
        });
    </script>

### labels.stroke.lineJoin `String` *(default: "round")*

The line join of the stroke.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                stroke: {
                    color: "#ff6358",
                    width: 3,
                    lineJoin: "miter"
                }
            }
        });
    </script>

### labels.stroke.width `Number` *(default: 1)*

The width of the stroke.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                stroke: {
                    color: "#ff6358",
                    width: 4
                }
            }
        });
    </script>

### labels.visible `Boolean` *(default: true)*

If set to `false`, the label will not be displayed.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            labels: {
                visible: false
            }
        });
    </script>

### legend `Object`

The legend configuration options of the Sankey.

#### Example - Setting the legend of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            legend: {
                background: "white",
                border: { color: "black", dashType: "solid", width: 1 },
                labels: {
                    color: "black",
                    font: "12px Arial,Helvetica,sans-serif",
                },
                position: "right",
                title: {
                    align: "center",
                    background: "white",
                    color: "black",
                    font: "bold 16px Arial,Helvetica,sans-serif",
                    position: "bottom",
                    text: "Legend",
                }
            }
        });
    </script>

### legend.align `String` *(default: "start")*

The alignment of the legend. The supported values are:

* "start" - The legend is aligned to the start.
* "center" - The legend is aligned to the center.
* "end" - The legend is aligned to the end.

#### Example

    <div id="sankey" style="width: 500px; height: 300px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" }, color: "#ff6358" },
                    { id: 2, label: { text: "Node 2" }, color: "#1f8ef1" }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            legend: {
                visible: true,
                align: "center"
            }
        });
    </script>

### legend.background `String`

The background color of the legend.

#### Example

    <div id="sankey" style="width: 500px; height: 300px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" }, color: "#ff6358" },
                    { id: 2, label: { text: "Node 2" }, color: "#1f8ef1" }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            legend: {
                visible: true,
                background: "#f0f0f0"
            }
        });
    </script>

### legend.border `Object`

The border of the legend.

#### Example

    <div id="sankey" style="width: 500px; height: 300px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" }, color: "#ff6358" },
                    { id: 2, label: { text: "Node 2" }, color: "#1f8ef1" }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            legend: {
                visible: true,
                border: {
                    color: "#ff6358",
                    width: 2,
                    dashType: "solid"
                }
            }
        });
    </script>

### legend.border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 300px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" }, color: "#ff6358" },
                    { id: 2, label: { text: "Node 2" }, color: "#1f8ef1" }
                ],
                links: [
                    { sourceId: 1, targetId: 2, value: 10 }
                ]
            },
            legend: {
                visible: true,
                border: {
                    color: "#28b4c8",
                    width: 2
                }
            }
        });
    </script>

### legend.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            border: {
                dashType: "dash"
            }
        }
    });
    </script>

### legend.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            border: {
                width: 2
            }
        }
    });
    </script>

### legend.height `Number`

The height of the legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            height: 150
        }
    });
    </script>

### legend.item `Object`

The configuration of the legend items.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            item: {
                cursor: "pointer"
            }
        }
    });
    </script>

### legend.item.areaBackground `String`

The background color of the legend item square element. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the corresponding node color.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            item: {
                areaBackground: "#ff6358"
            }
        }
    });
    </script>

### legend.item.areaOpacity `Number`

The opacity of the legend item square element.
Defaults to the corresponding node opacity.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            item: {
                areaOpacity: 0.5
            }
        }
    });
    </script>

### legend.item.cursor `String`

The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            item: {
                cursor: "pointer"
            }
        }
    });
    </script>

### legend.item.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

- `options`&mdash;The item options.
- `createVisual`&mdash;A function for getting the default visual.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            item: {
                visual: function(e) {
                    var rect = new kendo.drawing.Rect(e.rect, {
                        fill: {
                            color: e.options.areaBackground
                        },
                        stroke: {
                            color: "#000000"
                        }
                    });
                    return rect;
                }
            }
        }
    });
    </script>

### legend.labels `Object`

The Sankey legend label configuration.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                color: "#333333",
                font: "14px Arial"
            }
        }
    });
    </script>

### legend.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                color: "#ff6358"
            }
        }
    });
    </script>

### legend.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                font: "16px Arial, sans-serif"
            }
        }
    });
    </script>

### legend.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                margin: 10
            }
        }
    });
    </script>

### legend.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                margin: {
                    bottom: 10
                }
            }
        }
    });
    </script>

### legend.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                margin: {
                    left: 15
                }
            }
        }
    });
    </script>

### legend.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                margin: {
                    right: 15
                }
            }
        }
    });
    </script>

### legend.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                margin: {
                    top: 15
                }
            }
        }
    });
    </script>

### legend.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                padding: 8
            }
        }
    });
    </script>

### legend.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                padding: {
                    bottom: 5
                }
            }
        }
    });
    </script>

### legend.labels.padding.left `Number` *(default: 6)*

The left padding of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                padding: {
                    left: 10
                }
            }
        }
    });
    </script>

### legend.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                padding: {
                    right: 8
                }
            }
        }
    });
    </script>

### legend.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            labels: {
                padding: {
                    top: 5
                }
            }
        }
    });
    </script>

### legend.margin `Number|Object` *(default: 5)*

The margin of the Sankey legend. A numeric value will set all paddings.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            margin: 10
        }
    });
    </script>

### legend.margin.bottom `Number` *(default: 0)*

The bottom margin of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            margin: {
                bottom: 15
            }
        }
    });
    </script>

### legend.margin.left `Number` *(default: 0)*

The left margin of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            margin: {
                left: 20
            }
        }
    });
    </script>

### legend.margin.right `Number` *(default: 0)*

The right margin of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            margin: {
                right: 20
            }
        }
    });
    </script>

### legend.margin.top `Number` *(default: 0)*

The top margin of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            margin: {
                top: 15
            }
        }
    });
    </script>

### legend.offsetX `Number` *(default: 0)*

The X offset of the Sankey legend. The offset is relative to the default position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of its initial position.
A negative value will move the legend to the left of its current position.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            offsetX: 30
        }
    });
    </script>

### legend.offsetY `Number` *(default: 0)*

The Y offset of the Sankey legend.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from its initial position.
A negative value will move the legend upwards from its current position.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            offsetY: -20
        }
    });
    </script>

### legend.orientation `String` *(default: "vertical")*

The orientation of the legend items.

The supported values are:

* "vertical" - the legend items are added vertically.

* "horizontal" - the legend items are added horizontally.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            orientation: "horizontal"
        }
    });
    </script>

### legend.padding `Number|Object` *(default: 5)*

The padding of the Sankey legend. A numeric value will set all paddings.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            padding: 15
        }
    });
    </script>

### legend.padding.bottom `Number` *(default: 0)*

The bottom padding of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            padding: {
                bottom: 10
            }
        }
    });
    </script>

### legend.padding.left `Number` *(default: 0)*

The left padding of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            padding: {
                left: 12
            }
        }
    });
    </script>

### legend.padding.right `Number` *(default: 0)*

The right padding of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            padding: {
                right: 12
            }
        }
    });
    </script>

### legend.padding.top `Number` *(default: 0)*

The top padding of the Sankey legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            padding: {
                top: 8
            }
        }
    });
    </script>

### legend.position `String` *(default: "right")*

The positions of the Sankey legend.

The supported values are:

* "top" - the legend is positioned on the top.
* "bottom" - the legend is positioned on the bottom.
* "left" - the legend is positioned on the left.
* "right" - the legend is positioned on the right.
* "custom" - the legend is positioned using [legend.offsetX](/api/javascript/dataviz/ui/sankey#configuration-legend.offsetX) and [legend.offsetY](/api/javascript/dataviz/ui/sankey#configuration-legend.offsetY).

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            position: "bottom"
        }
    });
    </script>

### legend.reverse `Boolean` *(default: false)*

If set to `true` the legend items will be reversed.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            reverse: true
        }
    });
    </script>

### legend.spacing `Number`

The spacing between the labels in pixels when the [legend.orientation](/api/javascript/dataviz/ui/sankey#configuration-legend.orientation) is "horizontal".

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            orientation: "horizontal",
            spacing: 20
        }
    });
    </script>

### legend.title `Object`

The legend title configuration options.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title"
            }
        }
    });
    </script>

### legend.title.align `String` *(default: "center")*

The alignment of the title.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                align: "left"
            }
        }
    });
    </script>

### legend.title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                background: "#f0f0f0"
            }
        }
    });
    </script>

### legend.title.border `Object`

The border of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                border: {
                    color: "#000000",
                    width: 1
                }
            }
        }
    });
    </script>

### legend.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                border: {
                    color: "#ff6358",
                    width: 2
                }
            }
        }
    });
    </script>

### legend.title.border.dashType `String` *(default: "solid")*

The dash type of the legend title border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                border: {
                    dashType: "dash",
                    width: 2
                }
            }
        }
    });
    </script>

### legend.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                border: {
                    width: 3
                }
            }
        }
    });
    </script>

### legend.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                color: "#ff6358"
            }
        }
    });
    </script>

### legend.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                font: "18px Arial, sans-serif"
            }
        }
    });
    </script>

### legend.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                margin: 15
            }
        }
    });
    </script>

### legend.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                margin: {
                    bottom: 10
                }
            }
        }
    });
    </script>

### legend.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                margin: { left: 20 }
            }
        }
    });
    </script>

### legend.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                margin: { right: 20 }
            }
        }
    });
    </script>

### legend.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                margin: { top: 15 }
            }
        }
    });
    </script>

### legend.title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                padding: 10
            }
        }
    });
    </script>

### legend.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                padding: { bottom: 8 }
            }
        }
    });
    </script>

### legend.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                padding: { left: 12 }
            }
        }
    });
    </script>

### legend.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                padding: { right: 12 }
            }
        }
    });
    </script>

### legend.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                padding: { top: 8 }
            }
        }
    });
    </script>

### legend.title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                position: "bottom"
            }
        }
    });
    </script>

### legend.title.text `String`

The text of the legend title. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Energy Sources\nLegend"
            }
        }
    });
    </script>

### legend.title.visible `Boolean` *(default: true)*

If set to `false` the Sankey will not display the legend title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            title: {
                text: "Legend Title",
                visible: false
            }
        }
    });
    </script>

### legend.visible `Boolean` *(default: true)*

If set to `false` the Sankey will not display the legend.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: false
        }
    });
    </script>

### legend.width `Number`

The legend width when the [legend.orientation](/api/javascript/dataviz/ui/sankey#configuration-legend.orientation) is set to "horizontal".

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        legend: {
            visible: true,
            orientation: "horizontal",
            width: 300
        }
    });
    </script>

### links `Object`

The default links configuration of the Sankey. The links configuration options will be overridden by the `data.links` configuration.

#### Example - Setting the default links options of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            links: {
                color: "green",
                colorType: "static",
                highlight: {
                    inactiveOpacity: 0.2,
                    opacity: 0.8
                },
                opacity: 1
            }
        });
    </script>

### links.color `String`

The color of the links.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            color: "#ff6358"
        }
    });
    </script>

### links.colorType `String` *(default: "static")*

The color type of the links. The supported values are:

* "source" - the color of the link is determined by the source node.
* "static" - the color of the link is static.
* "target" - the color of the link is determined by the target node.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            colorType: "source"
        }
    });
    </script>

### links.focusHighlight `Object`

The link focus highlight configuration options.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            focusHighlight: {
                border: {
                    color: "#ff6358",
                    width: 3
                }
            }
        }
    });
    </script>

### links.focusHighlight.border `Object`

The border of the link focus highlight.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            focusHighlight: {
                border: {
                    color: "#000000",
                    width: 2,
                    opacity: 0.8
                }
            }
        }
    });
    </script>

### links.focusHighlight.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            focusHighlight: {
                border: {
                    color: "#ff6358"
                }
            }
        }
    });
    </script>

### links.focusHighlight.border.opacity `Number` *(default: 1)*

The opacity of the border.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            focusHighlight: {
                border: {
                    opacity: 0.6
                }
            }
        }
    });
    </script>

### links.focusHighlight.border.width `Number` *(default: 2)*

The width of the border.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            focusHighlight: {
                border: {
                    width: 4
                }
            }
        }
    });
    </script>

### links.focusHighlight.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            focusHighlight: {
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### links.highlight `Object`

The link highlight configuration options.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            highlight: {
                inactiveOpacity: 0.3,
                opacity: 0.9
            }
        }
    });
    </script>

### links.highlight.inactiveOpacity `Number` *(default: 0.2)*

The opacity of the links when they are not active.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            highlight: {
                inactiveOpacity: 0.1
            }
        }
    });
    </script>

### links.highlight.opacity `Number` *(default: 1)*

The opacity of the links.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            highlight: {
                opacity: 0.8
            }
        }
    });
    </script>

### links.labels `Object`

The link labels configuration options.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            labels: {
                ariaTemplate: (data) => `Link: ${data.value} units`
            }
        }
    });
    </script>

### links.labels.ariaTemplate `String` | `Function`

The template that will be used for the aria-label attribute of the link.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            labels: {
                ariaTemplate: (data) => `Flow from ${data.link.source.label.text} to ${data.link.target.label.text}: ${data.link.value} units`
            }
        }
    });
    </script>

### links.opacity `Number` *(default: 1)*

The opacity of the links.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        links: {
            opacity: 0.7
        }
    });
    </script>

### messages `Object`

The configuration of the messages displayed in the Sankey.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        messages: {
            tooltipUnits: "({0} MW)"
        }
    });
    </script>

### messages.tooltipUnits `String` *(default: "({0} Units)")*

The units string displayed in the tooltip.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        messages: {
            tooltipUnits: "({0} MW)"
        }
    });
    </script>

### nodes `Object`

The default nodes configuration of the Sankey. The nodes configuration options will be overridden by the `data.nodes` configuration.

#### Example - Setting the default nodes options of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            nodes: {
                align: "stretch",
                color: "green",
                offset: { left: 0, top: 0 },
                padding: 16,
                width: 24
            }
        });
    </script>

### nodes.align `String` *(default: "stretch")*

The alignment of the node. The supported values are:

* "stretch" - The node is aligned to left or right in order to fill the entire width of the Sankey.
* "left" - The node is aligned to the left.
* "right" - The node is aligned to the right.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            align: "left"
        }
    });
    </script>

### nodes.focusHighlight `Object`

The node focus highlight configuration options.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            focusHighlight: {
                border: {
                    color: "#ff6358",
                    width: 3
                }
            }
        }
    });
    </script>

### nodes.focusHighlight.border `Object`

The border of the node focus highlight.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            focusHighlight: {
                border: {
                    color: "#000000",
                    width: 2,
                    opacity: 0.8,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### nodes.focusHighlight.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            focusHighlight: {
                border: {
                    color: "#ff6358"
                }
            }
        }
    });
    </script>

### nodes.focusHighlight.border.opacity `Number` *(default: 1)*

The opacity of the border.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            focusHighlight: {
                border: {
                    opacity: 0.6
                }
            }
        }
    });
    </script>

### nodes.focusHighlight.border.width `Number` *(default: 2)*

The width of the border.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            focusHighlight: {
                border: {
                    width: 4
                }
            }
        }
    });
    </script>

### nodes.focusHighlight.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            focusHighlight: {
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### nodes.labels `Object`

The node labels configuration options.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            labels: {
                ariaTemplate: (data) => `Node: ${data.node.label.text}`
            }
        }
    });
    </script>

### nodes.labels.ariaTemplate `String` | `Function`

The template that will be used for the aria-label attribute of the node.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            labels: {
                ariaTemplate: (data) => `Node: ${data.node.label.text} - Total: ${data.node.value} units`
            }
        }
    });
    </script>

### nodes.offset `Object` *(default: { top: 0, left: 0 })*

The offset applied to the node's position.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            offset: {
                left: 10,
                top: 5
            }
        }
    });
    </script>

### nodes.offset.left `Number`

The left offset of the node.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            offset: {
                left: 15
            }
        }
    });
    </script>

### nodes.offset.top `Number`

The top offset of the node.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            offset: {
                top: 10
            }
        }
    });
    </script>

### nodes.padding `Number` *(default: 16)*

The minimum vertical space between two nodes.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Wind" } },
                { id: 3, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 3, value: 30 },
                { sourceId: 2, targetId: 3, value: 10 }
            ]
        },
        nodes: {
            padding: 24
        }
    });
    </script>

### nodes.width `Number` *(default: 24)*

The width of the node.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        nodes: {
            width: 32
        }
    });
    </script>

### title `Object`

The Sankey title configuration options.

#### Example - Setting the title of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            title: {
                align: "center",
                background: "white",
                border: { color: "red", dashType: "solid", width: 1 },
                color: "black",
                font: "16px Arial,Helvetica,sans-serif",
                margin: { left: 0, right: 0 },
                padding: { left: 5, right: 5 },
                position: "top",
                text: "Title",
                visible: true
            }
        });
    </script>

### title.align `String` *(default: "center")*

The alignment of the title.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        title: {
            text: "Energy Flow",
            align: "left"
        }
    });
    </script>

### title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        title: {
            text: "Energy Flow",
            background: "#f0f0f0"
        }
    });
    </script>

### title.border `Object`

The border of the title.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        title: {
            text: "Energy Flow",
            border: {
                color: "#000000",
                width: 2
            }
        }
    });
    </script>

### title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        title: {
            text: "Energy Flow",
            border: {
                color: "#ff6358",
                width: 2
            }
        }
    });
    </script>

### title.border.dashType `String` *(default: "solid")*

The dash type of the Sankey title border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        title: {
            text: "Energy Flow",
            border: {
                dashType: "dash",
                width: 2
            }
        }
    });
    </script>

### title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="sankey"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Solar" } },
                { id: 2, label: { text: "Electricity" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 40 }
            ]
        },
        title: {
            text: "Energy Flow",
            border: {
                width: 3
            }
        }
    });
    </script>

### title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            color: "#ff0000"
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.description `String`

The accessible description of the Sankey. The description is announced by screen readers when the Sankey is focused.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            description: "A sankey diagram showing data flow"
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            font: "20px Georgia, serif"
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            margin: 20
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            margin: {
                bottom: 15
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            margin: {
                left: 10
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            margin: {
                right: 10
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            margin: {
                top: 15
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            padding: 20
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            padding: {
                bottom: 15
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            padding: {
                left: 10
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            padding: {
                right: 10
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            padding: {
                top: 15
            }
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            position: "bottom"
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.text `String`

The text of the Sankey title. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram\nData Flow Visualization"
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### title.visible `Boolean` *(default: true)*

If set to `false` the Sankey will not display the title.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        title: {
            text: "Sankey Diagram",
            visible: false
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### tooltip `Object`

The tooltip configuration options.

#### Example - Configure the tooltip of the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            tooltip: {
                appendTo: "body",
                delay: 1000,
                followPointer: false,
                linkTemplate: "#= dataItem.source.label.text # -> #= dataItem.target.label.text # #= value #",
                nodeTemplate: "#= dataItem.label.text # #= value #",
                offset: 12
            }
        });
    </script>

### tooltip.appendTo `String|Element` *(default: document.body)*

The element to which the tooltip will be appended.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <div id="tooltip-container"></div>
    <script>
    $("#sankey").kendoSankey({
        tooltip: {
            appendTo: "#tooltip-container",
            nodeTemplate: (data) => `Node: ${data.label.text}`
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### tooltip.delay `Number` *(default: 1000)*

The delay in milliseconds before the tooltip is displayed.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        tooltip: {
            delay: 500,
            nodeTemplate: (data) => `Node: ${data.label.text}`
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### tooltip.followPointer `Boolean` *(default: false)*

If set to `true`, the tooltip will follow the mouse pointer.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        tooltip: {
            followPointer: true,
            nodeTemplate: (data) => `Node: ${data.label.text}`
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

### tooltip.linkTemplate `String|Function`

The template which renders the tooltip content for the links.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        tooltip: {
            linkTemplate: (data) => `Link Value: ${data.value}`
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 25 }
            ]
        }
    });
    </script>

### tooltip.nodeTemplate `String|Function`

The template which renders the tooltip content for the nodes.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        tooltip: {
            nodeTemplate: (data) => `Node: ${data.label.text} (Value: ${data.value})`
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 25 }
            ]
        }
    });
    </script>

### tooltip.offset `Number` *(default: 12)*

The distance between the tooltip and the mouse pointer in pixels.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        tooltip: {
            offset: 20,
            nodeTemplate: (data) => `Node: ${data.label.text}`
        },
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    </script>

## Methods

### setOptions `Object`

Sets the options of the Sankey.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } }
            ],
            links: [
                { sourceId: 1, targetId: 2, value: 1 }
            ]
        }
    });
    
    var sankey = $("#sankey").getKendoSankey();
    sankey.setOptions({
        title: {
            text: "Updated Sankey Title",
            color: "#ff0000"
        }
    });
    </script>

##### Example - Setting the Sankey options

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.setOptions({
            links: {
                color: "green",
                colorType: "static"
            }
        });
    </script>

#### Parameters

##### options `Object`

The configuration options to be set, same type as the Sankey initialization options. The supported configuration options are:

* `data`&mdash;The data of the Sankey.
* `disableAutoLayout`&mdash;If set to `true`, the Sankey will not automatically calculate the nodes' positions.
* `labels`&mdash;The default label options of the Sankey.
* `legend`&mdash;The legend configuration options.
* `links`&mdash;The default link options of the Sankey.
* `nodes`&mdash;The default node options of the Sankey.
* `title`&mdash;The title configuration options.
* `tooltip`&mdash;The tooltip configuration options.

### destroy

Destroys the Sankey.

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } },
                { id: 3, label: { text: "Node 3" } }
            ],
            links: [
                { sourceId: 1, targetId: 3, value: 2 },
                { sourceId: 2, targetId: 3, value: 1 }
            ]
        }
    });

    var sankey = $("#sankey").getKendoSankey();
    sankey.destroy();
    </script>

##### Example - Destroying the Sankey

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.destroy();
    </script>

### exportVisual

Exports the Sankey visual as a [Group](/api/javascript/drawing/group).

#### Example

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
    $("#sankey").kendoSankey({
        data: {
            nodes: [
                { id: 1, label: { text: "Node 1" } },
                { id: 2, label: { text: "Node 2" } },
                { id: 3, label: { text: "Node 3" } }
            ],
            links: [
                { sourceId: 1, targetId: 3, value: 2 },
                { sourceId: 2, targetId: 3, value: 1 }
            ]
        }
    });

    var sankey = $("#sankey").getKendoSankey();
    var visual = sankey.exportVisual();
    console.log("Exported visual:", visual);
    </script>

##### Example - Exporting the Sankey visual

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        var visual = sankey.exportVisual({ width: 800, height: 600 });
        console.log(visual);
    </script>

#### Parameters

##### exportOptions `Object`

The options for exporting the Sankey visual.

##### exportOptions.height `Number`

The height of the exported visual.

##### exportOptions.width `Number`

The width of the exported visual.

##### exportOptions.options `Object`

The Sankey options to be used for the exported visual. The options will extend and override the Sankey configuration.

#### Returns

`Group` - The exported visual.

### exportImage
Exports the Sankey as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Example - Exporting the Sankey to an image

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "sankey.png"
            });
        });
    </script>

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the Sankey width.

##### options.height `String`
The height of the exported image. Defaults to the Sankey height.

##### options.cors `String` *(default: "anonymous")*
Specifies how [cross-origin images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
should be requested.

Requesting images without CORS will "taint" the canvas. It will still be visible on the page, but all
script access to it is disabled to prevent information disclosure.

By default they're requested anonymously. Available options are:
* "anonymous" - do not send user credentials as part of the request
* "use-credentials" - send credentials as part of the request
* false - fetch images without CORS, possibly tainting the canvas

See [crossorigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin)
for more details.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

### exportPDF
Exports the Sankey as a PDF file.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

The available configuration options can be found in the [PDFOptions](/api/javascript/drawing/pdfoptions) api.

#### Example - Exporting the Sankey to a PDF file

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.exportPDF({ paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "sankey.pdf"
            });
        });
    </script>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

### exportSVG
Exports the Sankey as an SVG document.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Example - Exporting the Sankey to an SVG document

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "sankey.svg"
            });
        });
    </script>

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

## Events

### linkClick

Fires when the user clicks a link.

#### Example - subscribe to the "linkClick" event

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.bind("linkClick", function(e) {
            console.log("Link click", e);
        });
    </script>

#### Event Data

##### e.dataItem `Object`

The data item of the clicked link.

##### e.originalEvent `Object`

The original browser event.

##### e.sender `Sankey`

The Sankey widget instance.

### linkEnter

Fires when the user enters a link. Similar to the `mouseenter` event.

#### Example - subscribe to the "linkEnter" event

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.bind("linkEnter", function(e) {
            console.log("Link enter", e);
        });
    </script>

#### Event Data

##### e.dataItem `Object`

The data item of the entered link.

##### e.originalEvent `Object`

The original browser event.

#### e.preventDefault `Function`

If invoked, the default action of the event will not be executed.

##### e.sender `Sankey`

The Sankey widget instance.

### linkLeave

Fires when the user leaves a link. Similar to the `mouseleave` event.

#### Example - subscribe to the "linkLeave" event

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.bind("linkLeave", function(e) {
            console.log("Link leave", e);
        });
    </script>

#### Event Data

##### e.dataItem `Object`

The data item of the left link.

##### e.originalEvent `Object`

The original browser event.

##### e.preventDefault `Function`

If invoked, the default action of the event will not be executed.

##### e.sender `Sankey`

The Sankey widget instance.

### nodeClick

Fires when the user clicks a node.

#### Example - subscribe to the "nodeClick" event

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.bind("nodeClick", function(e) {
            console.log("Node click", e);
        });
    </script>

#### Event Data

##### e.dataItem `Object`

The data item of the clicked node.

##### e.originalEvent `Object`

The original browser event.

##### e.sender `Sankey`

The Sankey widget instance.

### nodeEnter

Fires when the user enters a node. Similar to the `mouseenter` event.

#### Example - subscribe to the "nodeEnter" event

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.bind("nodeEnter", function(e) {
            console.log("Node enter", e);
        });
    </script>

#### Event Data

##### e.dataItem `Object`

The data item of the entered node.

##### e.originalEvent `Object`

The original browser event.

##### e.preventDefault `Function`

If invoked, the default action of the event will not be executed.

##### e.sender `Sankey`

The Sankey widget instance.

### nodeLeave

Fires when the user leaves a node. Similar to the `mouseleave` event.

#### Example - subscribe to the "nodeLeave" event

    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        sankey.bind("nodeLeave", function(e) {
            console.log("Node leave", e);
        });
    </script>

#### Event Data

##### e.dataItem `Object`

The data item of the left node.

##### e.originalEvent `Object`

The original browser event.

##### e.preventDefault `Function`

If invoked, the default action of the event will not be executed.

##### e.sender `Sankey`

The Sankey widget instance.
