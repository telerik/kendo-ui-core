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


<div class="meta-api-description">
Set, update, or bind the flow diagram's dataset by supplying or modifying the collection of nodes and links that define the structure and connections of the graph; configure or replace the underlying data model to control the network visualization, manage nodes and edges, adjust relationships, and dynamically load or refresh the graph representation for showing connections, pathways, or flow information within the Sankey chart.
</div>

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


<div class="meta-api-description">
Configure the relationships and flow strengths between nodes in a Sankey diagram by specifying arrays of link objects that connect source and target points, control the direction and magnitude of flows, set weights or values representing quantities or sizes, and enable visualization of movement between elements through links defined by source IDs, target IDs, and numeric values indicating connection intensity or volume.
</div>

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


<div class="meta-api-description">
Configure and customize individual connection colors in a flow or Sankey diagram by assigning fixed visual colors to links, enabling precise control over link styling and appearance when static coloring is applied. Adjust the link hues using standard CSS color formats such as hex codes, RGB values, or named colors to highlight, differentiate, or emphasize specific flows, pathways, or relationships within the visualization. Enable designers and developers to set consistent and static colors for links regardless of dynamic data mapping, facilitating enhanced readability, color coding, and visual distinction in network or flow representations. This supports use cases like fixing colors for key transitions, customizing link visuals in reports, and overriding automatic color schemes with manual color assignments.
</div>

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


<div class="meta-api-description">
Configure link color mapping for Sankey diagrams by setting how connection colors are applied, including options to assign fixed colors to links, inherit colors from source nodes, or derive colors from target nodes, enabling control over visual relationships, color coding consistency, and styling of links between nodes to support scenarios like customizing static link colors, matching link colors to originating or ending nodes, and adjusting link appearance based on node attributes or flow direction.
</div>

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


<div class="meta-api-description">
Configure and control the appearance and behavior of connections or flows in a Sankey diagram to emphasize or highlight links based on user interaction, selection, or hover states. Enable setting colors, opacity levels, widths, animations, and visual emphasis for link flows to customize how relationships and data transitions stand out in the visualization. Adjust highlight effects dynamically to respond to user actions, improve flow visibility, control emphasis on particular paths, and fine-tune interactive feedback on connections within Sankey charts.
</div>

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


<div class="meta-api-description">
Adjust the transparency or fade level of links in a Sankey diagram that are not currently selected, hovered over, or tapped, to emphasize active connections and de-emphasize inactive ones; configure, set, or control the opacity of unhighlighted or inactive links to manage visual focus during interactions, hover states, or user selections, enabling clearer distinction between highlighted and non-highlighted flows, dimming background links, or customizing link visibility during user engagement with the Sankey chart.
</div>

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


<div class="meta-api-description">
Control and customize the transparency level or alpha of connections in a flow diagram when hovered over or touched, enabling adjustment of link visibility, emphasis, or fade effects during user interaction such as mouse hover, tap, or highlight states. Set, modify, or configure the opacity of edges or link highlights in data flow visualizations to enhance user feedback, visual clarity, or interactive emphasis on specific paths, flows, or connections within a Sankey chart or network graph. This setting helps developers fine-tune visual highlighting, interactive link emphasis, and feedback responsiveness by controlling the translucency of links during pointer events or touch gestures.
</div>

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


<div class="meta-api-description">
Adjust or configure the transparency, alpha level, or opacity of connection lines in a Sankey diagram to highlight, fade, or visually balance link paths between nodes; control the visual prominence or subtlety of flow links without affecting their shape or structure, enabling emphasis or de-emphasis of relationships, connections, or data flows by setting numeric opacity or transparency values that influence link rendering and styling.
</div>

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


<div class="meta-api-description">
Specify or set the origin node of a connection in a flow diagram by assigning the unique identifier for the source or starting point of a link between two nodes. Enable linking nodes by referencing the initial node’s ID to establish directional connections, configure data relationships where each link begins, control which node a flow or edge departs from in visualization maps, and match link entries to their originating nodes for mapping movement, transitions, or data paths within Sankey or network graphs.
</div>

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


<div class="meta-api-description">
Set or configure the destination node identifier for a link in a flow or network visualization to define connections between elements, specify where a link points, establish relationships from source to target nodes, enable directional flow control, assign target node IDs for mapping paths, and control linkage endpoints in graph or Sankey diagrams for visualizing data relationships and transitions.
</div>

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


<div class="meta-api-description">
Control and adjust the thickness, weight, or magnitude of connections between nodes in flow or Sankey diagrams by assigning numeric values representing the strength, volume, or amount of flow for each link; customize link widths proportionally to reflect data intensity, capacity, or importance, enabling visualization of quantitative relationships, flow sizes, transfer amounts, or weighted connections in network graphs, resource mapping, or process flows.
</div>

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


<div class="meta-api-description">
Set or configure the list, array, or collection of elements representing individual points or entities in a flow diagram, including defining unique identifiers or IDs for each node to enable linking and connections between source and target points, configuring the nodes that form the structure of the diagram, supplying node data to build network or flow charts, specifying the elements that represent the connected parts, and managing node objects that links reference for constructing visual flow relationships.
</div>

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


<div class="meta-api-description">
Control or configure the horizontal positioning and alignment of nodes within each column of a Sankey diagram by setting alignment options such as left-aligning nodes to the start of the column, right-aligning nodes to the end, or stretching nodes horizontally to fill the entire available column width, enabling customization of node layout, arrangement, or placement within the visual flow representation for clarity, design adjustment, or enhanced readability in data visualization workflows.
</div>

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


<div class="meta-api-description">
Control and customize the fill color of nodes in a Sankey chart using any valid CSS color format, including hex codes, RGB values, or named colors, to adjust node appearance, highlight specific data points, emphasize flow sections, or match branding styles; configure or set colors dynamically during initialization or through property updates to visually differentiate nodes, enhance readability, and improve data visualization clarity in Sankey diagrams.
</div>

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


<div class="meta-api-description">
Assign unique identifiers to nodes to establish connections and link relationships within flow diagrams or network visualizations, enabling referencing, mapping, and binding of individual elements when configuring or updating data structures; set, define, or control node IDs to link source and target points, manage node relationships in the graph, and ensure proper association of nodes with edges or links for accurate data mapping and flow representation.
</div>

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


<div class="meta-api-description">
Customize or define the text labels, names, or identifiers displayed on each node within a flow or Sankey diagram, enabling precise control over how nodes are represented visually, including setting, updating, configuring, or changing node captions, titles, or descriptions to improve readability, clarity, and user understanding in data visualization or diagram layouts.
</div>

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


<div class="meta-api-description">
Adjust horizontal text alignment for node labels in a flow diagram or Sankey chart by configuring label placement to left, right, or center positions. Control how labels appear relative to nodes for better readability and layout customization, including setting text alignment direction in node components, aligning labels horizontally within the graph, or positioning the label on either side or at the center of nodes to enhance visualization clarity and meet design preferences.
</div>

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


<div class="meta-api-description">
Customize and control the appearance of label borders on nodes within flow diagrams, including setting border color, stroke width, dash patterns, and toggling visibility of outlines around node labels; configure styling, adjust label border thickness or style for clarity, enable or disable border strokes on node text, and refine label visuals to improve readability and design consistency in Sankey or flow chart components.
</div>

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


<div class="meta-api-description">
Customize the color of the outline or stroke around labels on nodes within a Sankey diagram by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors; this setting enables control over the border appearance of node text, letting you adjust label emphasis, visibility, contrast, or styling to fit themes, enhance readability, or highlight nodes in data flow visualizations.
</div>

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


<div class="meta-api-description">
Customize and control the border stroke style of node labels in flow or Sankey diagrams by setting different dashed patterns such as solid, dotted, dashed lines, dash-dot combinations, long dashes, or multi-pattern sequences like long dash-dot and long dash-dot-dot to configure the outline appearance of nodes, enabling visual differentiation and styling options for label borders including dash, dot, dashDot, longDash variations, and solid strokes for enhanced graph readability and presentation.
</div>

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


<div class="meta-api-description">
Control and customize the thickness of borders around node labels in a Sankey diagram by specifying the numeric pixel value to set how thick or thin the label edges appear, enabling you to enhance label visibility or design by adjusting border width, outlining node descriptions clearly or subtly, modifying label outline thickness for better visual separation or emphasis, or configuring border sizing during chart setup to match styling preferences and improve readability in flow visualization components.
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the text color of node labels in flow diagrams or Sankey charts to enhance visibility, customize styling, improve contrast, and ensure readability of the labels in various color formats such as hex codes, RGB values, or standard CSS color strings; this control helps tailor the appearance of node labels for better visual distinction, thematic design, or accessibility purposes within data visualization components that depict flow, connections, or weighted relationships.
</div>

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


<div class="meta-api-description">
Adjust or customize the text appearance of flow diagram node labels by specifying font styles such as typeface, size, weight, and style using any standard CSS font notation or shorthand. Control label typography for readability or design consistency by configuring font family names, numeric sizes, bold or italic weights, and other common font attributes. Enable fine-tuned styling of node label text in diagrams by setting CSS-compatible font strings, allowing varied font customization scenarios including sizing the labels, changing font weights like bold or normal, applying italics, and selecting specific typefaces such as Arial, Helvetica, or custom fonts to ensure clear and visually appealing labeling within graphical data flow representations or Sankey charts.
</div>

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


<div class="meta-api-description">
Control and customize the spacing or padding around node labels in Sankey diagrams to prevent overlap, improve alignment, and enhance readability by adjusting margins or gaps surrounding label text; set or configure label offsets and buffer zones to manage visual separation and layout clarity of nodes within flow visualizations, ensuring clear presentation of connected elements and better integration of label positioning within the overall chart structure during setup and rendering.
</div>

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


<div class="meta-api-description">
Adjust horizontal spacing or left offset of node labels in Sankey diagrams to shift text inward or outward, control the gap between labels and node boundaries, fine-tune label positioning relative to adjacent nodes and links, set left padding or margin for better alignment, and customize label placement for improved readability and layout clarity in flow visualizations.
</div>

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


<div class="meta-api-description">
Configure the horizontal spacing and offset of node labels in Sankey diagrams by adjusting the right margin, enabling precise control over label distance from node edges, preventing overlap, fine-tuning alignment, and customizing label layout for clearer visualization and improved readability.
</div>

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


<div class="meta-api-description">
Adjust node label positioning in flow diagrams to prevent overlaps, improve alignment, and enhance readability by shifting labels away from or closer to their default anchor points; control label displacement for fine-tuning placement in Sankey charts, customize label offsets to avoid clutter, adjust label spacing for better visual clarity, and set precise label positioning to optimize node label layout in complex flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust the horizontal position, left margin, or x-axis offset of node labels in a Sankey diagram to control spacing, alignment, indentation, or overlap with node elements, enabling fine-tuning of label placement for improved visual clarity and readability in flow or network visualizations.
</div>

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


<div class="meta-api-description">
Adjust vertical label positioning for nodes in Sankey diagrams by setting the top offset to shift text labels upward or downward, enabling fine-tuning of label placement, controlling label alignment, customizing label spacing, repositioning node captions vertically, managing label displacement on nodes, modifying label height offset, and refining text label layout within the flow chart visualization.
</div>

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


<div class="meta-api-description">
Adjust or configure the spacing, margin, or padding around node labels in a Sankey diagram to control how much space appears between the label text and the node edges, enabling fine-tuning of label placement, layout clarity, visual separation, and readability by setting or modifying padding values that influence the distance between the text inside nodes and their boundaries; customize label spacing for aesthetics, legibility, or to prevent overlap in flow visualizations, and enable dynamic label padding adjustments during setup or runtime to optimize diagram appearance across different data sets or screen sizes.
</div>

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


<div class="meta-api-description">
Adjust the space or vertical gap underneath node labels in a Sankey diagram by configuring bottom padding for label text, enabling control over label-to-node boundary distance, spacing, or margin below labels for clearer visualization; set or modify numeric padding values to increase or decrease the vertical offset beneath node captions, improving label readability, layout aesthetics, or collision avoidance in flow diagrams and data visualization components during setup or rendering.
</div>

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


<div class="meta-api-description">
Adjust horizontal spacing, indentation, or offset of node labels in Sankey diagrams by controlling the left padding between label text and the label edge to improve alignment and prevent overlap; set or configure left margin, inner spacing, text inset, or horizontal label offset to fine-tune label position, customize label layout, or manage label padding on the left side for node text in flow visualizations or graph components.
</div>

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


<div class="meta-api-description">
Adjust the horizontal spacing or margin on the right side of node labels in Sankey diagrams by setting label padding or offset to control how far label text sits from its boundary. Configure the distance, gap, inner margin, or inset on the label's right edge within Sankey nodes to optimize label positioning, readability, and avoid overlap during visualization setup or layout adjustments. Use this padding configuration to fine-tune label alignment, spacing, and text placement for nodes within flow or network diagrams that use Sankey representations.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing above labels in flow diagram nodes by configuring the top padding or margin to control the empty space between the label text and the upper edge of each node, improving label clarity, alignment, and visual layout in Sankey or flow charts. Enable precise control over label positioning by setting or modifying the padding above node labels to optimize readability, manage label overlap, fine-tune node text placement, or customize label spacing within diagram components during rendering or initialization. Use this setting when you want to increase or decrease the vertical gap above text labels inside nodes to enhance diagram aesthetics and user interface presentation.
</div>

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


<div class="meta-api-description">
Adjust or configure the placement of node labels within a Sankey diagram by setting the label position to appear inside, before, or after each node, enabling control over whether labels are displayed adjacent to, preceding, or following nodes, with special handling for nodes at the end of the flow to optimize readability and visual layout, allowing developers to customize text alignment, label orientation, node-relative positioning, and improve diagram clarity through flexible label placement options.
</div>

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


<div class="meta-api-description">
Customize the outline color around node labels in flow diagrams or Sankey charts by setting the stroke color for text labels, enabling control over text highlight, border, or edge colors using any CSS-compatible color format such as hex, RGB, RGBA, or named colors. Adjust the label's stroke to enhance visibility, contrast, or styling of node names in data visualizations, allowing fine-tuning of label borders for clarity, emphasis, or design consistency within interactive or static charts. This controls the color outlining the label text nodes to improve readability or aesthetic appearance in node-based flow or network representations.
</div>

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


<div class="meta-api-description">
Adjust or customize the outline color, stroke color, border color, or edge color around labels on nodes in a Sankey diagram to control the visibility, contrast, and styling of node label outlines. Enable, set, or configure the label border color for clearer, highlighted, or subtle node label edges in flow or network visualizations. This controls label outline styling such as stroke color or border shading to enhance node label readability or aesthetics within Sankey chart elements.
</div>

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


<div class="meta-api-description">
Adjust the styling of label outlines on flow chart nodes by configuring the stroke corner joins, enabling options to set how label borders meet with choices such as miter, round, or bevel joins; control and customize the appearance of node text outlines in visualizations by specifying the line join style for label strokes, influencing the shape and smoothness of label edges and corners to enhance readability and aesthetics in Sankey diagrams or similar node-link visual components.
</div>

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


<div class="meta-api-description">
Adjust the thickness, weight, or border size of label outlines on nodes in a flow diagram to control how prominent or subtle node text edges appear, customize label stroke widths, set or configure the label border line width, and modify the edge thickness around node labels for enhanced readability or style in Sankey chart node annotations.
</div>

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


<div class="meta-api-description">
Control and customize the text displayed on each node’s label within a flow or Sankey chart, enabling setting, changing, or formatting the visible label content to represent node names, titles, or descriptions; configure and assign specific strings for node labels to influence how node information appears, including options to update, modify, or define label text for clarity, identification, or presentation purposes across data visualization, Sankey diagrams, or flow mapping tools.
</div>

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


<div class="meta-api-description">
Toggle visibility of node labels in Sankey diagrams to show or hide node names, enable or disable label display, control whether node text appears on the diagram, configure label rendering visibility for nodes, set node label display on or off during chart initialization, manage presentation of node identifiers, and adjust whether labels are visible or hidden to customize node appearance in flow visualizations.
</div>

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


<div class="meta-api-description">
Control or customize the horizontal or vertical positioning of elements within a flow or Sankey diagram by applying numeric offset values to individual data points, enabling precise adjustment, alignment tweaks, overlap prevention, manual node shifting, layout fine-tuning, position nudging, spatial rearrangement, and visual order control within node-based graphical representations to achieve optimal arrangement and clarity.
</div>

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


<div class="meta-api-description">
Control the horizontal placement or left shift of flow diagram nodes by adjusting the left offset to customize node alignment, spacing, or precise positioning within a Sankey or flow chart layout, enabling developers to configure or set node coordinates horizontally, tweak visual node distribution, and manage spatial arrangement when initializing or rendering flow diagram components for clearer data flow visualization and improved layout control.
</div>

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


<div class="meta-api-description">
Adjust or configure the vertical position, top offset, or y-axis placement of nodes in a Sankey diagram to control node spacing, alignment, or layout arrangement by shifting nodes up or down from their default coordinates, enabling precise tuning of node vertical alignment, positioning, custom offsets, and spatial distribution within flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust or set the transparency level of nodes in a Sankey diagram to fade, highlight, emphasize, or layer node elements, enabling control over node visibility, translucency, blending with node colors and connecting links, and customizing visual prominence or subtlety of individual or groups of nodes within the flow visualization for improved clarity or aesthetic effect.
</div>

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


<div class="meta-api-description">
Configure the vertical spacing or minimum gap between nodes in a Sankey diagram to control node separation, prevent overlap, adjust layout density, and customize the vertical padding between elements for clearer visualization. This setting can be used to manage how tightly or loosely nodes are stacked vertically, influencing the overall flow layout and improving readability by increasing or decreasing the vertical margin between connected nodes or blocks. Adjust node vertical padding, set minimum space between nodes, control node gaps, and fine-tune the Sankey chart’s node spacing for optimal distribution and visual clarity.
</div>

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


<div class="meta-api-description">
Adjust, set, or configure the width or size of individual nodes within a flow diagram or Sankey chart to control layout, spacing, visual emphasis, or node thickness. Customize node dimensions to influence appearance, improve flow readability, optimize diagram spacing, manage node visual weight, and tailor node sizing in data flow or network visualizations for clearer connections and enhanced graphical presentation.
</div>

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


<div class="meta-api-description">
Control automatic node rearrangement in Sankey diagrams by disabling auto layout to maintain the original node order or apply a custom arrangement, preventing the system from repositioning nodes to minimize link crossings. This setting enables manual layout management, preserves node sequence, stops automatic node sorting, and supports customized diagram structures where you want to keep fixed node positions, override default layout algorithms, or maintain consistent visual flow without automatic adjustments.
</div>

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


<div class="meta-api-description">
Control keyboard interaction handling by enabling or disabling built-in keyboard navigation and focus management within the flow diagram component, allowing you to turn off default keyboard shortcuts, key events, and focus behavior for accessibility customization or to implement personalized keyboard controls, keyboard event handling, or alternative navigation methods tailored to your application’s needs.
</div>

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


<div class="meta-api-description">
Set and customize default text labels, font styles, placement, visibility options, and formatting for nodes and connections in flow diagrams, enabling control over how labels appear by default across the entire chart while allowing individual nodes to override these defaults. Adjust label positioning, enable or disable visibility, define text content and appearance, and configure global label settings for visualizing data flows dynamically in Sankey diagrams or similar node-link visualizations.
</div>

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


<div class="meta-api-description">
Configure horizontal positioning of labels in Sankey diagrams to set alignment options like left, center, or right, enabling adjustment of label placement relative to nodes or links for better clarity, readability, and customized text layout or wrapping within flow visualizations, supporting control over how labels line up horizontally to suit different display needs or design preferences in diagram rendering.
</div>

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


<div class="meta-api-description">
Adjust label outlines around nodes and links in Sankey diagrams by configuring border color, thickness, and dash styles such as solid or dashed lines; customize label borders to enhance visibility, delineate edges, control the stroke appearance, and set outline shapes for node or connection text annotations during chart setup or runtime styling.
</div>

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


<div class="meta-api-description">
Set or customize the outline color, stroke color, or border shade around the text labels of nodes in flow or Sankey diagrams using any valid CSS color format like hex, RGB, or named colors. Control the appearance, highlight, or style of label edges, text borders, and label outlines within Sankey charts, enabling styling, theming, or visual emphasis on node labels with configurable border colors, strokes, or outlines to enhance clarity and design.
</div>

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


<div class="meta-api-description">
Customize and configure the outline style of labels in flow diagrams by setting the border dash pattern, enabling solid, dashed, dotted, or custom stroke effects around label edges for enhanced visual distinction and styling in Sankey charts; control label border appearance including line types for clearer separation, highlight, or emphasis by adjusting dash patterns during chart setup or dynamic updates.
</div>

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


<div class="meta-api-description">
Adjust or configure the thickness, size, or width of label outlines or borders around text in Sankey charts or diagrams by specifying pixel values to enhance, remove, or customize label border appearance and visibility, controlling how bold or subtle the label edges look in flow visualizations and ensuring clear separation or emphasis of node labels.
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the text color of labels within the Sankey chart to improve visibility, readability, or match custom themes by specifying any CSS-compatible color format such as hex codes, RGB or RGBA values, or standard named colors, enabling fine-tuned control over label appearance and styling to ensure labels stand out or blend appropriately with backgrounds or design palettes in data visualization contexts.
</div>

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


<div class="meta-api-description">
Set or customize the font style, size, weight, family, and appearance of labels on nodes within flow diagrams or Sankey charts, enabling control over text formatting in visual data flows. Adjust or configure node label typography using CSS-like font strings, fine-tune font weight and style for clarity or emphasis, specify font family to match design needs, and control text size and style settings to enhance readability and presentation of connected data paths or flow visualizations.
</div>

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


<div class="meta-api-description">
Control and customize the spacing around Sankey diagram labels to improve readability and layout by adjusting the distance between label text and adjacent nodes or links, enabling precise positioning, margin configuration, label padding, text spacing, and fine-tuning visual separation for clearer data flow representation and enhanced diagram clarity.
</div>

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


<div class="meta-api-description">
Control and customize the horizontal spacing and alignment of labels by setting the left margin or padding for Sankey diagram labels, enabling precise adjustment of the distance between the label content and its left edge to improve label positioning, avoid overlap, ensure consistent label alignment, and fine-tune the layout during setup or configuration. This setting supports modifying label indentation, offset, or left-side buffer to enhance readability and visual clarity in flow or network diagrams.
</div>

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


<div class="meta-api-description">
Control or set the right margin, spacing, or padding for labels in a Sankey diagram to adjust label placement, offset, alignment, or separation from nodes, edges, or links. Configure how much horizontal space appears to the right of labels to improve readability, avoid overlap, and customize label positioning within Sankey visualizations for layout and rendering purposes. Enable fine-tuning of label distance on the right side to manage clarity and visual balance in flow diagrams.
</div>

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


<div class="meta-api-description">
Control the positioning and spacing of labels in flow or Sankey diagrams by configuring label offset to shift text away from nodes, links, or edges, preventing overlap and enhancing clarity. Adjust or set label displacement to improve readability, customize label alignment, move labels for better visual distinction, and manage text placement relative to diagram elements for optimized layout and user interface presentation in flow charts, network graphs, or Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjust horizontal label positioning in Sankey diagrams by setting the left offset to move label text leftward from its default alignment, enabling precise control over label spacing, layout adjustments, and fine-tuning of label placement for clearer visualization, customization of label horizontal alignment, and layout optimization during Sankey chart configuration.
</div>

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


<div class="meta-api-description">
Control and adjust the vertical alignment or positioning of labels in Sankey diagrams by shifting label placement up or down, fine-tuning label spacing or offset along the y-axis, managing label overlap with nodes or links, customizing label vertical margins, repositioning text to enhance clarity and avoid collisions, setting top offset for labels in flow visualizations, modifying label vertical displacement to improve readability, and tailoring label vertical adjustments to suit layout needs and prevent clutter in data flow charts.
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the spacing, margin, or padding around label text within a flow or Sankey diagram to control label readability, avoid overlap or collisions, manage label placement, fine-tune visual spacing between labels and diagram elements, optimize layout density, and improve clarity of node or flow labels in data visualization components.
</div>

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


<div class="meta-api-description">
Adjust or configure the space beneath text labels in flow diagrams or Sankey charts to prevent overlapping, increase readability, and improve label layout by adding extra padding or margin at the bottom of each label, enabling control over vertical label spacing, enhancing clarity, and fine-tuning label positioning for better visual balance and avoidance of clutter in data visualizations.
</div>

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


<div class="meta-api-description">
Control or customize the spacing between text labels and their left boundary inside flow diagrams or visualizations by adjusting the left padding or margin around label text elements; configure, set, or fine-tune the amount of empty space on the left side of labels to improve readability, alignment, or prevent overlap in Sankey charts or similar node-link visualizations, enabling precise positioning of label content relative to the left edge.
</div>

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


<div class="meta-api-description">
Control and customize the spacing between label text and the right edge in flow diagrams by adjusting the right padding for labels, enabling precise alignment, preventing overlap, managing label layout, and setting margins to optimize readability and visual balance in Sankey charts or similar node-link visualizations.
</div>

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


<div class="meta-api-description">
Adjust or set the vertical space or top margin above labels in a Sankey diagram to control label positioning, spacing, or offset, enabling fine-tuned alignment and clear separation of text elements; configure padding or top offset for diagram labels to prevent overlap or improve readability, customize label layout by increasing or decreasing the gap above each label, and manage vertical label distance for better visual clarity or aesthetic adjustment in flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust label placement relative to flow nodes in a Sankey diagram to optimize readability, avoid overlap, and clarify the diagram’s structure by positioning labels before, after, or inside nodes; this setting controls whether text appears preceding or following nodes, supporting enhanced layout customization, directional emphasis, dense node spacing management, label alignment, and improved visualization clarity for complex or compact flow diagrams.
</div>

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


<div class="meta-api-description">
Control the edge color or outline around label text to enhance label visibility, highlight text boundaries, accentuate labels against graph nodes and edges, customize label stroke color or CSS color codes, set label text border hues to improve contrast and readability, adjust label outlining for better distinction in Sankey diagrams, modify label stroke appearance to emphasize or de-emphasize text against links and nodes, configure label border color presets, and apply custom outline colors to label fonts for clearer visualization.
</div>

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


<div class="meta-api-description">
Adjust and customize the outline or border color of text labels on flow diagram nodes, enabling you to set label stroke or edge color using any CSS-compatible format such as hex codes, RGB, RGBA, or named colors to improve label visibility, contrast, readability, and styling for Sankey diagrams, flow charts, or node-based visualizations.
</div>

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


<div class="meta-api-description">
Adjust stroke corner rendering for label outlines in flow or Sankey diagrams by setting the join style of connected line segments, including options like miter, round, or bevel joins, to control how sharp or smooth corners appear, prevent clipping, and customize edge appearance on label strokes. This configuration enables precise control over how label borders connect, influencing visual clarity and aesthetics in data flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust the thickness, width, or stroke size of label outlines and borders in a Sankey diagram to enhance clarity, control emphasis, or improve readability by configuring how bold or subtle label edges appear, enabling customization of label line weight for better visual distinction and presentation in flow or connection visualizations.
</div>

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


<div class="meta-api-description">
Control whether node and link labels in Sankey diagrams are displayed or hidden by enabling or disabling label visibility, allowing customization of text annotations, toggling label rendering on or off, managing label display for clearer visualization, hiding labels to reduce clutter, showing labels for better data interpretation, configuring label presence in Sankey charts, turning label output off or on during setup, adjusting label visibility settings, and deciding if text labels appear alongside diagram flows.
</div>

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


<div class="meta-api-description">
Control and customize the display, layout, positioning, labels, styling, grouping, and interactive behaviors of the Sankey chart legend, including options to show or hide the legend, adjust its appearance, configure item styles, and manage click or hover interactions, enabling fine-tuned presentation and user engagement with legend elements during initialization or runtime.
</div>

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


<div class="meta-api-description">
Adjust or configure the horizontal placement, positioning, or alignment of the Sankey chart legend within its container to start, center, or end locations, enabling control over whether the legend appears left-aligned, right-aligned, or centrally aligned. Enable setting or controlling legend alignment for better label arrangement, layout customization, or UI design, including options to position the legend at the beginning, middle, or end of the display area to improve readability and visual balance in Sankey diagrams.
</div>

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


<div class="meta-api-description">
Adjust or configure the legend background color to improve visibility, contrast, and readability within flow or Sankey diagrams, using any CSS-compatible color format such as hexadecimal codes, RGB/RGBA values, or named colors; customize the appearance of legend panels, enable background styling for clarity in data visualizations, and control how legend items stand out against the overall chart area to enhance user interface and presentation.
</div>

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


<div class="meta-api-description">
Adjust and style the outline or border of the Sankey chart’s legend by configuring parameters like stroke color, border thickness, dash patterns, and corner rounding to control its visual presentation. Enable customization of the legend’s frame, including setting solid or dashed lines, choosing color schemes for the legend boundary, tweaking width or weight of the border line, and refining border shape details to enhance clarity or match design requirements. Control and configure the external edge or box around the legend for improved visibility, branding consistency, or aesthetic preferences within Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjust or customize the color outlining the legend area in Sankey diagrams by setting border colors using any valid CSS formats such as hex codes, RGB values, or color names to enhance visual distinction, highlight legend boundaries, control legend frame appearance, style or theme the legend box, configure border hues for clarity, or emphasize the legend's edges during chart setup or initialization.
</div>

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


<div class="meta-api-description">
Adjust, customize, or configure the legend border line pattern, border dash style, or stroke pattern for Sankey diagrams by setting different dash types such as dashed lines, dot patterns, dash-dot sequences, long dashes, combined long dash with dots, or fully solid borders to control the visual style and appearance of the legend’s outline and border stroke in Sankey chart presentations and visualizations.
</div>

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


<div class="meta-api-description">
Adjust the thickness or visibility of the legend border in a Sankey diagram by configuring the pixel width of the border outline, enabling you to set a clear, prominent frame or make the legend border invisible by defining zero or any desired pixel value, controlling how the legend edges appear visually and customizing the border’s prominence, outline, or frame thickness for better styling and readability of the legend area.
</div>

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


<div class="meta-api-description">
Set or configure the vertical size and height of the legend area for Sankey diagrams to control layout, spacing, alignment, and visual balance between the legend and the main diagram. Adjust the legend’s height to optimize component composition, improve readability, and manage how the legend aligns with or relates to the Sankey diagram’s flow visualization. Enable fine-tuning of legend sizing to fit design requirements, accommodate different screen sizes, or customize the legend’s vertical dimension within Sankey chart presentations.
</div>

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


<div class="meta-api-description">
Control and customize individual legend entries in a Sankey diagram by setting label text, adjusting marker or symbol styles, toggling visibility, defining display order, and applying personalized templates or formatting for each legend item during setup. Enable precise configuration of legend components such as custom labels, icons, display preferences, show or hide options, sorting, and styling to tailor how legend entries present and interact within the flow visualization. Manage legend behavior and appearance through customizable entries that support labeling, icon tweaking, visibility control, ordering sequences, and template customization for enhanced Sankey chart legend presentation.
</div>

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


<div class="meta-api-description">
Adjust or configure the background color, fill, or shading of the colored square or box within a flow diagram legend or chart key, including options to override default node or category colors with any CSS-compatible color code such as hex values, RGB, RGBA, or named colors, enabling customization of legend indicators for enhanced visual clarity, theme matching, or branding in Sankey diagrams and similar data flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust or set the transparency level, fill opacity, or alpha channel of the color swatch squares in the legend of a Sankey diagram to control visual emphasis, match node opacity, customize legend item visibility, blend legend colors smoothly, or configure the opacity of legend markers for improved readability and design consistency in data flow visualizations.
</div>

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


<div class="meta-api-description">
Control or customize the pointer style displayed when hovering over legend elements within Sankey diagrams, enabling visual cues for interactivity by setting the cursor appearance to any valid CSS cursor type such as pointer, default, crosshair, or move. Enable, configure, or modify hover cursor effects on legend items to enhance user experience and indicate clickable or interactive states, supporting intuitive navigation, highlighting, or selection prompts commonly used in UI customization and accessibility enhancements. Adjust or set cursor behavior on legend labels or items within flow diagrams to signal interactivity, hover states, or user engagement, applying standard CSS cursor values for consistent and recognizable interface feedback.
</div>

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


<div class="meta-api-description">
Customize or override the appearance of legend items in a Sankey diagram by providing a function to generate or modify the default visuals, enabling developers to control how each legend entry is rendered through customizable options and visual creation callbacks, support for replacing default icons, adding badges or labels, or tailoring the legend item display during component setup or runtime customization.
</div>

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


<div class="meta-api-description">
Control the appearance, visibility, formatting, and content of labels in the Sankey chart legend by setting custom text, applying templates, adjusting layout, styling fonts and colors, toggling label display on or off, and specifying how legend items are presented to customize the legend for clarity, readability, and design consistency in Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjust or customize the color of legend label text in flow diagrams or Sankey charts by specifying any valid CSS color format such as hex codes (#FF0000), rgb(), rgba(), or named colors to enhance readability, improve visual contrast, align with branding or theme colors, control legend appearance, and ensure text clarity in data visualizations and interactive dashboards.
</div>

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


<div class="meta-api-description">
Adjust or customize the font appearance of the legend labels in Sankey diagrams by specifying font size, typeface, weight, and style using standard CSS font syntax, enabling control over text styling such as bold, italic, or different font families, and allowing developers to configure typography for better readability, visual hierarchy, and presentation of legend text with common formatting commands like setting pixel size, font family names, and font weights in a single CSS font shorthand string for flexible label design.
</div>

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


<div class="meta-api-description">
Adjust, configure, or control the spacing, padding, or margins around legend labels within Sankey diagrams, enabling uniform distance on all sides including top, bottom, left, and right; set numeric values to fine-tune label layout, enhance readability, prevent overlap, and customize visual gaps around legend text during chart setup or initialization for better presentation and clarity.
</div>

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


<div class="meta-api-description">
Configure the spacing or padding below legend labels to control vertical separation and layout in Sankey diagrams, adjust the margin beneath label texts to fine-tune label positioning and prevent overlap, set or customize bottom margins or gaps for legend text elements to improve readability and visual clarity, manage label spacing parameters to optimize diagram aesthetics, and control the vertical distance beneath legend labels for better layout arrangement and consistent design in flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust horizontal spacing or left indentation of legend labels in Sankey charts by configuring label margin or offset values; control the distance between legend text and other elements, set label padding or spacing on the left side to improve readability or alignment, customize label positioning within the legend area, tweak horizontal gaps or label margins for better visual balance, and enable fine-tuning of left-side label offsets in Sankey visualizations for precise legend layout adjustments.
</div>

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


<div class="meta-api-description">
Control the horizontal spacing or padding on the right side of legend labels for Sankey diagrams, enabling adjustment of label margins to prevent overlap, fine-tune layout alignment, manage spacing between labels and adjacent elements, and configure visual separation in legend text areas. This setting helps set or modify the right margin distance of legend labels to improve readability, optimize component appearance, and customize spacing for responsive or dense Sankey chart designs.
</div>

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


<div class="meta-api-description">
Control and customize the vertical spacing above legend labels in Sankey diagrams by adjusting the top margin or padding of labels, enabling fine-tuning of label positioning, visual spacing, alignment, and layout within the legend area. Configure the distance or gap between the top edge of the legend container and label text, set or modify label offsets, and control spacing to improve readability, avoid overlap, and enhance appearance in flow or network visualizations with stacked or grouped legend labels. This feature supports margin, padding, layout adjustments, and spacing tweaks for optimal Sankey diagram legend presentation.
</div>

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


<div class="meta-api-description">
Adjust and configure the spacing or margin around legend label text in flow diagrams to improve readability, layout, and visual separation, enabling you to set uniform padding or buffer space on all sides of each label for clearer presentation, consistent gaps between text and boundaries, and better control over label positioning within the legend area in Sankey charts or similar flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust the vertical spacing below legend labels in Sankey charts by setting the bottom padding, enabling precise control over label alignment, layout refinement, and separation between labels and adjacent elements. Configure the lower padding to optimize label positioning, improve readability, and customize the legend’s vertical appearance in data visualizations or flow diagrams, allowing developers to set, modify, and fine-tune the spacing beneath legend text for better visual balance and clarity in Sankey diagrams.
</div>

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


<div class="meta-api-description">
Adjust horizontal padding or spacing on the left side of legend labels in a Sankey diagram to control label alignment, layout, and text positioning within the legend area. Configure, set, or customize the left margin or indentation of legend label text to improve visual spacing, prevent overlap, and manage how legend entries align horizontally inside the chart's legend block. Easily adjust the internal left padding for textual labels shown in the Sankey legend to refine presentation, layout consistency, or aesthetics during chart initialization or runtime.
</div>

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


<div class="meta-api-description">
Adjust or configure the spacing on the right side of legend labels in a flow diagram, controlling the padding between label text and the label edge to manage layout, alignment, and visual clarity. Enable setting right-side label margin or buffer to fine-tune text positioning within legend components, improve readability, and customize horizontal spacing in Sankey charts or similar visualization legends during setup or styling phases.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing above legend text in Sankey charts by configuring top padding for legend labels, enabling fine-tuned control over the gap between the label's upper boundary and its text. Customize label alignment, spacing, and padding in the legend area, set or modify label top margin or offset to optimize visual clarity and layout in Sankey diagram legends. Control how much space appears above label text in legend entries, allowing developers to fine-tune the vertical distance for better label positioning, visual balance, or overlap prevention.
</div>

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


<div class="meta-api-description">
Adjust spacing around the Sankey diagram legend by setting uniform margins to control whitespace and layout, enabling customization of legend positioning and padding within the Sankey component. Configure or set the outer gap, space, or buffer surrounding the legend area to improve visual clarity, fine-tune alignment, or customize layout aesthetics. Modify or control the margin size to create balanced spacing, prevent overlap, and ensure consistent padding around the legend in Sankey charts or flow diagrams. Enable customization of the legend's outer boundary spacing through a numeric margin value affecting all sides equally.
</div>

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


<div class="meta-api-description">
Adjust or configure the vertical spacing below the legend in flow diagrams or Sankey charts by setting bottom margin values to control the gap beneath the legend area, enabling fine-tuning of alignment, layout spacing, padding, and chart presentation during initialization or rendering. This setting helps manage visual separation between the legend and other elements, customize legend placement, and optimize overall chart design for clarity and aesthetics in data visualization workflows.
</div>

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


<div class="meta-api-description">
Control or adjust the horizontal spacing, left offset, padding, or margin of the legend in a Sankey diagram to shift, align, reposition, or create space between the legend and the diagram body, enabling fine-tuning of layout, alignment, indentation, or separation during configuration or initialization to optimize visual presentation and avoid overlap or crowding at the left side of the legend panel.
</div>

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


<div class="meta-api-description">
Adjust the horizontal spacing or right margin of the Sankey chart legend to control the distance between the legend area and the component's edge or nearby interface elements, enabling precise layout tuning, spacing customization, or margin setting for better alignment and visual organization in various UI arrangements or dashboard designs.
</div>

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


<div class="meta-api-description">
Control and adjust the vertical spacing or top margin above the Sankey diagram legend to customize layout, positioning, and alignment. Configure the distance between the legend and main chart area by setting numeric values that influence spacing, padding, and responsive design for better visual balance and clarity in Sankey visualizations. Modify top margin settings to fine-tune legend placement, ensure consistent alignment, and adapt to different screen sizes or container constraints.
</div>

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


<div class="meta-api-description">
Control or configure the horizontal positioning of the Sankey diagram’s legend by adjusting the left or right offset in pixels, enabling precise placement relative to its default location; this setting supports shifting the legend along the X-axis with positive values moving it right and negative values moving it left, useful for aligning, customizing, or fine-tuning legend placement to fit different layout requirements or avoid overlap with other chart elements.
</div>

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


<div class="meta-api-description">
Adjust vertical placement of the Sankey diagram’s legend using vertical offset settings to fine-tune its position relative to the chart area, enabling precise control over moving the legend up or down by specific pixel values, shifting the label display for clarity, layout customization, and improved visual alignment within dashboards or reports.
</div>

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


<div class="meta-api-description">
Configure the layout direction and arrangement of flow diagram legend items by setting the orientation to vertical for top-to-bottom stacking or horizontal for left-to-right alignment, enabling control over how legend labels or keys are displayed in data visualizations, charts, or Sankey diagrams to optimize readability and presentation style.
</div>

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


<div class="meta-api-description">
Adjust the inner spacing or whitespace around legend items and labels in a Sankey diagram by configuring the padding or margin inside the legend container. Control uniform internal gaps, edge buffers, or inset spacing to manage visual separation and layout balance for legend elements by setting numeric padding values that evenly apply to all sides, enabling layout adjustment for clarity, compactness, or expanded spacing in the Sankey legend area.
</div>

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


<div class="meta-api-description">
Control and adjust the vertical spacing or bottom margin beneath the Sankey diagram’s legend area by setting padding parameters that influence layout, alignment, and the gap between the legend and the main chart content; configure spacing to optimize visual clarity, avoid overlap, manage legend positioning relative to the diagram, and tailor the distance below legend elements for better chart aesthetics during rendering or initialization.
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the left padding or spacing inside the Sankey legend area to control the gap between the legend’s left boundary and its content, enabling fine-tuned alignment, margin customization, label positioning, white space management, and visual balance for improved clarity and consistent layout in Sankey diagram legends.
</div>

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


<div class="meta-api-description">
Control or customize the horizontal space or margin on the right side of the Sankey diagram's legend by setting or adjusting the right padding distance, enabling fine-tuning of layout alignment, spacing between legend items and chart elements, preventing overlap or overflow issues, and ensuring proper visual separation from the chart boundary or container edge in Sankey visualizations.
</div>

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


<div class="meta-api-description">
Control or configure the vertical spacing, top margin, or padding above the legend area in a Sankey diagram or chart layout to adjust the legend’s vertical positioning or offset for better alignment, spacing, or visual balance. Enable setting the top padding of the legend container to fine-tune the legend placement relative to other components or page elements, customize the gap above the legend box, and manage vertical layout adjustments during initialization or runtime to improve chart readability and design.
</div>

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


<div class="meta-api-description">
Control the placement and alignment of the Sankey chart's legend by specifying its position, enabling configuration to display the legend at the top, bottom, left, or right edges of the chart area or inside it with precise custom offsets. Adjust, set, or enable legend positioning to fit layout requirements, align labels for clarity, customize legend location with X and Y coordinates, and manage how the legend integrates visually with the Sankey diagram for improved readability and presentation. Users searching for ways to move, reposition, place, or align the Sankey legend dynamically or programmatically will find options to configure standard preset positions or fine-tune custom placements through offset controls.
</div>

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


<div class="meta-api-description">
Control the order of legend items in Sankey diagrams by enabling or disabling the reversal of their display sequence, allowing developers to invert the arrangement of labels or keep the default order for better visual emphasis or clarity. Adjust, toggle, or set the legend sequence to appear in reverse or normal order through a boolean switch, useful for customizing the legend layout, improving readability, or matching specific design requirements and use cases during chart setup or dynamic updates. This functionality supports reversing the legend entries, flipping the display order, or configuring the arrangement of legend labels to suit different presentation or user interface needs.
</div>

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


<div class="meta-api-description">
Adjust the horizontal spacing or gap between legend labels in a Sankey diagram to control label density, distance, or layout when the legend orientation is set to horizontal, enabling customization of pixel-based spacing to improve readability, avoid label overlap, manage label alignment, or create clearer visual separation in flow diagrams and charts.
</div>

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


<div class="meta-api-description">
Control and customize the text, visibility, style, font, layout, and positioning of the Sankey diagram’s legend title, enabling developers to set descriptive labels, configure title appearance, adjust formatting, and manage how the legend header is displayed or hidden within the visualization for improved clarity and presentation.
</div>

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


<div class="meta-api-description">
Control the horizontal alignment of the legend title text in a Sankey diagram by specifying whether the title should be left-aligned, centered, or right-aligned, enabling customization of text positioning for clarity, visual layout adjustments, title placement preferences, and aesthetic tuning of the legend header in data flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust or define the background color behind the title of a Sankey chart’s legend using any CSS-compatible color notation such as hex codes, RGB, RGBA, or named colors to style, customize, or theme the legend header area; control the legend title’s backdrop shading, fill color, or visual highlight in Sankey diagrams for enhanced readability, visual hierarchy, or branding consistency by setting or configuring the background color attribute.
</div>

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


<div class="meta-api-description">
Customize and configure the outline, stroke, width, color, dash patterns, and spacing of the title border in a Sankey legend to control its visual styling, appearance, and emphasis, allowing developers to set or enable specific border styles, adjust line thickness, choose border colors, define dashed or solid lines, and tailor the title's border around the legend for enhanced clarity or branding in data visualizations.
</div>

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


<div class="meta-api-description">
Configure or customize the border color around the legend title to enhance visual separation, highlight, or contrast in flow or Sankey diagrams by setting any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors; control the outline styling of the legend heading to improve readability or fit specific design themes, themes, user interface consistency, or branding requirements in data visualization components where color emphasis on legend titles matters, including adjusting border hues during chart initialization, styling legend boundaries, or modifying interface elements for better user experience and clarity in complex topology or flow representations.
</div>

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


<div class="meta-api-description">
Configure and customize the border style of the legend title in a Sankey diagram by specifying various stroke patterns such as dashed lines, dotted lines, solid lines, and complex repeating patterns like dash-dot or long-dash-dot-dot. Enable different border dash types to control the visual appearance of the title outline, including options for dash, dash-dot, dot, long dash, long dash with dots, and solid strokes, allowing flexible styling and precise control over how the legend title border is rendered. Adjust, set, or control the stroke style or line pattern to enhance the Sankey chart’s legend title visual emphasis and border decoration in data visualization.
</div>

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


<div class="meta-api-description">
Adjust or configure the thickness, size, or width of the border around the legend title in a Sankey diagram to control its visual prominence or emphasis, including enabling or disabling the border by setting pixel values for how bold or subtle the outline appears, with options to make the border visible or invisible by specifying numeric border thickness during setup or styling of the legend header area.
</div>

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


<div class="meta-api-description">
Control and customize the color of the legend title text in Sankey charts by specifying any valid CSS color value such as hex codes, RGB, RGBA, HSL, or named colors. Configure, set, or change the title's font color to match themes, improve readability, or highlight legend headings in Sankey diagrams, flow visualizations, or data mapping components. Adjust and style the legend header text color dynamically or statically during chart setup to enhance visual consistency and accessibility for users seeking to modify or theme the Sankey chart legend's title appearance.
</div>

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


<div class="meta-api-description">
Adjust and customize the font style, size, family, and appearance of the legend title text in a Sankey diagram by specifying font settings such as CSS font strings or supported font descriptors, enabling control over typography including font weight, font style, font size, and font face to enhance readability, branding, or design consistency within the legend area; useful for configuring the visual presentation of the legend’s title text to match themes, improve clarity, or apply custom fonts during initialization or setup.
</div>

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


<div class="meta-api-description">
Adjust the outer spacing or padding around the legend title in a Sankey diagram to control the distance between the title and surrounding legend items or chart elements, by setting uniform numeric margins on all sides. Configure the space around the legend header to optimize layout, alignment, and visual separation within the graph container, ensuring the title does not overlap or crowd other parts of the visualization. Enable precise control over the buffer area around the Sankey legend’s title text to customize its positioning, improve readability, and maintain consistent appearance across different display sizes or configurations.
</div>

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


<div class="meta-api-description">
Adjust the vertical spacing below the legend title in flow or Sankey diagrams by setting the bottom margin to control the gap between the title text and the legend items, enabling customization of layout spacing, padding, or separation under the title area for clearer visualization, better alignment, or improved readability in chart legends during configuration or initialization.
</div>

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


<div class="meta-api-description">
Adjust the horizontal spacing or left padding between the legend title and the left boundary of the Sankey diagram’s legend area, enabling control over title alignment, offset, indentation, or margin from the left edge; configure, set, shift, or fine-tune the left margin to optimize the title’s position within the legend for better visual layout, spacing consistency, and alignment preferences during chart setup or styling.
</div>

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


<div class="meta-api-description">
Adjust or set the horizontal spacing or right-side margin between the legend title and nearby elements within a Sankey diagram's legend, enabling control over the gap, padding, or clearance to fine-tune layout, alignment, and visual separation of the title from other legend content or chart components on the right side.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing or top padding above the legend heading in Sankey diagrams, configure the gap or margin between the title text and the legend area, set or control whitespace above chart legend titles, customize the top offset or distance to improve legend title positioning, manage the upper margin for better visual separation from legend items, tweak spacing above the legend heading for clarity or layout alignment in flow charts and node-link visualizations.
</div>

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


<div class="meta-api-description">
Control the spacing or gap around the title of a Sankey chart legend by configuring the padding to increase or decrease distance from adjacent elements, set uniform or custom margins around the legend header, adjust layout separation for better readability or styling, customize the title’s buffer space to prevent overlap or crowding, and fine-tune the legend header’s surrounding white space for alignment or design consistency using numeric or uniform padding values.
</div>

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


<div class="meta-api-description">
Adjust or configure the space below the legend's title in a Sankey chart by setting bottom padding, controlling vertical spacing, margin, or gap beneath the title text to improve layout, appearance, or readability for legend headings. This is useful for customizing legend title spacing, managing padding below legend headers, tuning layout aesthetics, and enhancing visual separation between the title and other legend elements in Sankey diagrams.
</div>

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


<div class="meta-api-description">
Control and customize the horizontal spacing, offset, or indentation of the legend title in a Sankey diagram by adjusting the left padding or margin, enabling precise alignment and positioning of the title text relative to the legend area. Fine-tune title placement, shift the legend heading to the left, increase or decrease its starting horizontal space, and adjust layout spacing to achieve the desired visual balance or alignment in Sankey chart legends. This setting is useful for configuring title padding, adjusting horizontal offsets, managing title indentation, and improving label readability and spacing in complex Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjusting the horizontal spacing to the right side of a Sankey chart legend title, configuring right padding or margin around the legend heading, controlling alignment and whitespace on the title’s right edge, setting extra spacing to separate the legend title from adjacent elements, customizing the layout and visual balance of the legend header, tuning right-side spacing to improve readability or style, modifying the title boundary on the horizontal axis, enabling precise control over the title’s right offset or indents, managing the gap between the legend title and other chart components, or setting layout padding for improved legend title presentation and spatial arrangement.
</div>

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


<div class="meta-api-description">
Adjust the vertical space or top margin above the legend title in a Sankey diagram to control alignment, offset, or fine-tune layout and styling by configuring the amount of padding or spacing above the title area. Enable precise control over the gap, distance, or offset between the legend title and other elements for customization of positioning, appearance, or formatting in chart legends. Modify spacing to increase or decrease the top padding, margin, or whitespace for better visual balance and improved layout within the legend section of flow or Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjust or set the placement of the legend title in a flow or Sankey diagram to appear either above or below the legend area, customize legend header positioning for improved visual layout, configure the title location relative to the legend for clarity and design control, enable repositioning of the legend header text between top and bottom alignments, control label placement in the legend to optimize chart readability, specify whether the legend’s descriptive heading displays at the upper or lower part of the legend section, manage header arrangement within Sankey chart legends for aesthetic or functional preferences, manipulate title location to refine diagram presentation and user interface, set the label title alignment in relation to the legend block, and define how the legend heading sits vertically for precise chart formatting.
</div>

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


<div class="meta-api-description">
Control and customize the legend title text for flow diagrams or Sankey charts by setting or changing the title string, enabling multi-line titles with line breaks, adjusting legend header labels, configuring text content for legend headings, specifying or formatting the legend’s main title, and managing how descriptive titles or captions appear above the legend, useful for clarifying data relationships, improving readability, or highlighting chart segments.
</div>

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


<div class="meta-api-description">
Control the display of the legend title in a Sankey diagram by enabling or disabling its visibility, allowing customization of whether the legend heading is shown or hidden, toggling the presence of the legend label for clarity or simplicity, managing the appearance of the legend’s title text, setting the legend header to be visible or not, configuring the inclusion or exclusion of the legend title for cleaner visuals or more descriptive charts, adjusting legend title visibility for presentation purposes, turning the legend caption on or off, and deciding if the legend’s descriptive title should appear within the Sankey chart interface.
</div>

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


<div class="meta-api-description">
Configure the display or hiding of the chart legend for flow diagrams like Sankey by enabling or disabling the legend visibility setting, allowing users to toggle whether the legend appears alongside the diagram on initialization; adjust the boolean flag to show, hide, or control the appearance of legends in data flow visualizations, supporting customization of legend presence for better clarity, layout control, or minimal design preferences during rendering.
</div>

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


<div class="meta-api-description">
Adjust the horizontal legend's width to control layout spacing and placement of legend items in a flow diagram, enabling configuration of the legend’s horizontal size to manage wrapping behavior, alignment, and how much space the legend occupies within the visualization area. This setting helps configure, set, or control the width for horizontal legends in diagrams where space optimization, item distribution, and responsive design affect the overall Sankey or flow chart appearance and legend readability.
</div>

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


<div class="meta-api-description">
Set or customize the default connections between nodes in a Sankey diagram to control appearance, styling, labels, link colors, widths, and value mapping when individual link settings are not specified; adjust how flows are visually represented and behave by defining baseline link properties such as styles or label displays, ensuring consistent default link formatting that applies unless specifically overridden by data-driven or per-link configurations.
</div>

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


<div class="meta-api-description">
Customize and control the coloring of flow connections between nodes in a Sankey diagram by setting link colors, enabling distinctions of edge colors to represent data flow intensity, differentiate paths, emphasize specific connections, or apply color coding for visual clarity and thematic design across all linking lines or individual flows in the chart visualization.
</div>

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


<div class="meta-api-description">
Set or configure how connection colors are assigned in flow or Sankey diagrams by choosing color mapping based on source nodes, target nodes, or applying fixed static colors to links; control link color behavior to customize visuals, color links by their origin or destination nodes, assign static uniform colors, or switch between dynamic and static coloring schemes for relationships displayed in Sankey or flow visualizations.
</div>

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


<div class="meta-api-description">
Control and customize the visual emphasis and highlighting behavior of connections or links within a Sankey diagram when they receive keyboard or interaction focus, including enabling or disabling focus highlights, adjusting how focused links appear, managing accessibility-related focus indicators, configuring interactive focus states to improve visibility and user navigation, setting styles to emphasize selected or focused link paths, tuning focus behavior for better user experience and clarity when links are targeted via keyboard, screen readers, or other input methods, and refining the visual feedback and interaction cues to ensure clear identification of active or highlighted links during user navigation and focus events.
</div>

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


<div class="meta-api-description">
Customize or set the border styling around highlighted connections or links in a Sankey diagram to emphasize focus, enabling control over border color, thickness, style, and appearance for better visibility, theme alignment, accessibility enhancements, or user interaction feedback when hovering, selecting, or navigating through link elements within flow visualizations.
</div>

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


<div class="meta-api-description">
Customize or configure the border color that appears around Sankey diagram links when they are highlighted or focused for accessibility and visual emphasis, enabling control over the outline or stroke color using any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to enhance user interaction, focus states, keyboard navigation visibility, and highlight effects on connections between nodes within the Sankey chart visualization during initialization or dynamic updates.
</div>

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


<div class="meta-api-description">
Adjust the transparency or opacity level of the border around Sankey diagram links when they are focused or selected to enhance visual emphasis, highlight active or hovered connections, control focus indication intensity, and customize the strength or clarity of link borders during interaction states by setting numeric opacity values for link border visibility and prominence in Sankey flow visualizations.
</div>

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


<div class="meta-api-description">
Control and customize the thickness, size, or width of the border or outline that appears around links in a Sankey diagram when they are focused, highlighted, selected, or active. Adjust the thickness of focus or hover borders around link connections to emphasize or visually distinguish them, enabling precise styling of link focus outlines in flow or network visualizations, including setting highlight border widths for better visibility and accessibility of interactive elements.
</div>

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


<div class="meta-api-description">
Customize the border stroke pattern and style for focused or highlighted links with options to configure dashed lines, dotted lines, alternating dash-dot sequences, solid outlines, and various combinations such as dash-dot-dot or long dash patterns. Control the appearance of focus indicators on interactive link elements by setting different border dash types, including solid, dash, dot, dash-dot, long dash, and mixed dash-dot-dot styles for enhanced visual emphasis and accessibility in flow diagrams or network visualizations. Adjust or enable specific stroke patterns to highlight link focus states in Sankey charts or similar components, ensuring distinct border appearances for linked paths under keyboard focus or selection scenarios.
</div>

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


<div class="meta-api-description">
Control and customize link emphasis, visual feedback, and interactive effects for connections within a flow diagram or Sankey chart, enabling configuration of colors, transparency levels, animations, and hover or selection highlighting behavior to enhance visibility and user interaction with links, edges, or connectors in data flow visualizations.
</div>

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


<div class="meta-api-description">
Adjust or configure the transparency level, opacity, or fade effect of non-active or inactive Sankey diagram links to control visual emphasis, de-emphasize or dim connections when they are not selected or highlighted, manage the visibility and distinction between active versus inactive links, set or tune link translucency and opacity values for better focus and clarity, customize how faint or subtle inactive links appear, enable control over link brightness or shading based on activity status, and fine-tune the link visibility to emphasize certain flows while muting others in Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjust and configure the transparency, alpha level, or translucency of highlighted connections or links in flow diagrams, controlling how prominent, visible, or emphasized these selected paths or relationships appear to enhance contrast and focus within Sankey charts or network visualizations. Fine-tune the intensity or opacity of highlighted edges to customize visual emphasis, set highlight brightness or fade effects, and manage the clarity or subtlety of link highlights to improve user understanding, readability, or visual hierarchy in interactive data flow or connection graphs.
</div>

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


<div class="meta-api-description">
Control and customize the appearance, content, and positioning of labels on connections or links in flow diagrams, including setting visibility on or off, formatting text, applying templates, adjusting layout and styling for readability, and configuring how link labels display information dynamically or statically within Sankey charts or similar graphical flows.
</div>

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


<div class="meta-api-description">
Control how screen readers announce link descriptions in a flow diagram by setting customizable, dynamic accessibility labels that include source, target, or value information for each connection; configure templates or formatters to generate meaningful aria-label text for links, enabling better assistive technology support, clearer navigation hints, and improved semantic descriptions for visually impaired users interacting with linked data flows or relationships.
</div>

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


<div class="meta-api-description">
Control or adjust the transparency, opacity, or alpha level of links or connections within a Sankey diagram to highlight, emphasize, fade, or de-emphasize flow paths and relationships by configuring link translucency, visibility, or shading intensity; enable setting how solid, faint, light, or see-through link colors appear to customize visual emphasis on data connections, flows, or edges in chart initialization or rendering settings.
</div>

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


<div class="meta-api-description">
Customize and configure localized text, labels, tooltips, and message strings displayed in Sankey diagrams, enabling control over language-specific content, user-facing messages, interface wording, and tooltip texts for internationalization, text customization, and enhanced user experience in flow visualization components.
</div>

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


<div class="meta-api-description">
Configure, customize, or set the units label or unit text shown in tooltip pop-ups or hover messages within flow or Sankey diagrams to support localization, internationalization, or display preferences by controlling the unit string that appears alongside values in interactive visual elements, tooltips, or data labels to ensure accurate, context-aware measurement units are presented in charts, graphs, or network flows.
</div>

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


<div class="meta-api-description">
Set and customize default node settings for sankey diagrams including appearance, labels, layout hints, global node configurations, and initialization defaults, enabling control over node styling, labeling, and positioning before data-specific overrides, providing a baseline setup for node visuals and behavior in flow visualizations while accommodating node-specific customizations from data inputs.
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the horizontal alignment and positioning of nodes within a flow diagram or Sankey chart to control whether nodes appear left-aligned, right-aligned, or stretched across the full width of the visualization area; this enables precise control over node layout for better visual distribution, balanced spacing, and customization of node placement along the horizontal axis in flow or network diagrams.
</div>

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


<div class="meta-api-description">
Customize or control the visual focus indication for individual nodes in a Sankey diagram by configuring highlight settings such as color, opacity, intensity, and whether the focus effect is enabled or disabled. Enable or disable distinct focus highlights to improve user interaction feedback, accessibility, and clarity when nodes receive keyboard or programmatic focus, adjusting visual emphasis and styling of focused nodes to suit design preferences or UI requirements. Configure how node highlighting behaves on focus events, including adjusting appearance attributes to enhance visibility, contrast, and user navigation cues within the Sankey flow visualization.
</div>

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


<div class="meta-api-description">
Customize and control the visual outline, stroke color, thickness, and dash style used to highlight nodes in a Sankey diagram when they gain focus or are selected, enabling you to set up distinct border styles for focused nodes through configurable properties at initialization, supporting use cases such as emphasizing active or highlighted elements, managing accessibility cues, adjusting focus indicators, and tailoring graphical emphasis on individual nodes for clarity and interaction feedback.
</div>

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


<div class="meta-api-description">
Configure the highlight border color around focused nodes to customize the node outline when selecting or hovering over elements, enabling control over the stroke color for emphasis, using any valid CSS color formats such as hex, rgb, rgba, or named colors to set the outline or border shading of active nodes in visual flows, diagrams, or Sankey charts for clear node focus indication and enhanced visual guidance during interaction or user focus states.
</div>

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


<div class="meta-api-description">
Adjust or configure the transparency level, alpha, or opacity of the focus border or outline around highlighted nodes in a Sankey diagram to control how visible, prominent, or subtle the node's focus indication appears; set, tune, or customize the border opacity to emphasize, highlight, or de-emphasize selected or active nodes with varying degrees of outline clarity for improved visual focus, UI feedback, or interactive node emphasis effects.
</div>

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


<div class="meta-api-description">
Adjust the thickness or width of the highlight border that appears around nodes when they are focused or selected in a Sankey diagram, enabling control over the visual emphasis, outline prominence, and accessibility cues for active or hovered nodes, with customization options to set how bold, thin, or pronounced the node border appears during interaction or focus states.
</div>

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


<div class="meta-api-description">
Adjust, customize, or set the stroke style, pattern, or outline type of a focused node’s highlight border in a Sankey diagram visualization by controlling the dash style with options like solid lines, dashed lines, dotted lines, dash-dot repeats, long dashes, and complex dash-dot-dot sequences; this feature enables configuring visual emphasis, border highlighting styles, focus indicators, and outline patterns for nodes when selected or active within flow diagrams, allowing flexible control over how node borders appear during focus states to enhance clarity, differentiation, and user interface feedback.
</div>

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


<div class="meta-api-description">
Control and customize the appearance and content of node labels in flow diagrams or Sankey charts, including options to toggle label visibility, set text content, apply formatting and templating for dynamic or static labels, choose fonts, colors, and styles, and adjust label positions and layouts for enhanced readability and presentation during rendering or initialization.
</div>

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


<div class="meta-api-description">
Customize and control accessible labels for Sankey diagram nodes by defining templates for aria-label attributes, enabling precise text descriptions for screen readers, configuring node label accessibility, setting custom voice-over content, enhancing assistive technology support, tailoring node descriptions for users with disabilities, specifying dynamic or static label formats for nodes, improving navigation and interpretation of Sankey flows, and ensuring that each node’s accessible name matches the intended context and user experience for accessibility compliance and inclusive design.
</div>

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


<div class="meta-api-description">
Control and customize the displacement or shift of nodes within a Sankey diagram by adjusting the horizontal or vertical offset from their default positions, enabling precise alignment, spacing, and layout tuning of elements in flow visualizations, useful for refining node arrangement, overriding automatic placements, setting custom node positions, modifying gap distances between nodes, and optimizing the visual clarity and balance of interconnected data flows during rendering or initialization.
</div>

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


<div class="meta-api-description">
Control horizontal positioning for individual Sankey diagram nodes by setting or adjusting their leftward offset to shift nodes left from default or calculated placements; customize spatial alignment, fine-tune layout spacing, nudge nodes horizontally, apply precise left-side displacement, reposition nodes manually, or configure horizontal margins and padding to improve visualization clarity and arrangement in Sankey flow diagrams.
</div>

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


<div class="meta-api-description">
Adjust vertical positioning or shift individual nodes upward or downward within a flow diagram by setting the top offset of nodes, control node alignment and placement in Sankey charts, customize vertical spacing or node layout adjustments, configure node top margins or offsets to fine-tune visual arrangement, enable precise vertical node movement, manipulate Sankey node height positioning, modify node vertical anchors, and set or tweak node top coordinates to optimize diagram structure and readability.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing between connected elements in a Sankey diagram by setting the minimum gap or padding between nodes to control overlap and layout density. Configure node vertical gaps, spacing, or separation to improve clarity, readability, or prevent collisions in flow charts and energy or data visualization graphs. Enable customization of space distribution between stacked nodes, adjusting vertical distance, padding, or margin in layout algorithms to fine-tune node positioning and prevent clutter in Sankey-style network diagrams.
</div>

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


<div class="meta-api-description">
Adjust node thickness, width, or size within a Sankey diagram by configuring how wide each node appears to control visual density, layout spacing, and overall diagram clarity. This setting lets you customize node dimensions, scale node breadth, set fixed or relative thickness, and fine-tune the appearance of flow elements for better readability, compactness, or expanded node sizing to match design needs or data presentation styles. Developers might want to modify node width for precise layout control, improve user experience, optimize visualization spacing, or balance node prominence in the flow chart.
</div>

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


<div class="meta-api-description">
Set or customize the main heading of a flow visualization chart, control the text content, toggle title visibility, adjust alignment and placement within the chart area, and style the heading with fonts, colors, spacing, background shades, and borders. Enable or disable the chart title, position it at the top or other preferred locations, apply custom margins and padding for precise layout, and modify font family, size, weight, and color to match branding or visual preferences. Configure appearance aspects such as background color and border style to enhance emphasis or integration with surrounding UI elements in Sankey diagrams or related flow charts.
</div>

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


<div class="meta-api-description">
Adjust the horizontal alignment or positioning of chart titles by setting alignment to left, center, or right, enabling control over title placement in visualizations such as Sankey diagrams, including options to left-align, center-align, or right-align the heading text, title orientation adjustment, text alignment for headers, configuring title position on the horizontal axis, and aligning top labels for better layout and presentation in data flow or network charts.
</div>

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


<div class="meta-api-description">
Set or customize the background color behind a chart or diagram title to enhance visibility, contrast, and branding consistency using any CSS-compatible color format such as hex codes, RGB, or named colors. Control the title's background appearance for improved readability, theming, or alignment with design guidelines by specifying color values during setup or configuration. Adjust or configure the overlay, fill, or backdrop color behind the heading or label area to achieve desired visual emphasis, user interface coherence, or stylistic customization.
</div>

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


<div class="meta-api-description">
Customize and control the border styling around the chart title by setting properties like border color, thickness, dash pattern, and corner radius to adjust the outline appearance and shape for clear visual emphasis, enabling configuration of title edges, line style, shadows, rounded corners, and decorative borders to enhance readability and presentation of the main heading in flow diagrams or Sankey charts.
</div>

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


<div class="meta-api-description">
Customize the header edge color to highlight or blend the title border with your theme by setting any CSS-compatible color including hex codes, RGB, RGBA, or named colors; control and configure the outline shade around the Sankey diagram title to enhance visibility, emphasize headers, or match branding styles using various color formats for flexible styling and design consistency.
</div>

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


<div class="meta-api-description">
Configure and customize the stroke pattern or line style of the Sankey chart’s title border by selecting from various dash patterns such as dashed lines, dot patterns, combinations like dash-dot or long dash-dot-dot, or solid continuous lines. Control the appearance and styling of the title border using predefined stroke styles including dash, dash-dot, dot, long dash, long dash-dot, long dash-dot-dot, and solid line options to enhance visual differentiation, emphasis, or thematic consistency across Sankey diagram titles. Adjust border dash types for graphical customization, line style preferences, or stroke pattern settings in Sankey chart titles.
</div>

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


<div class="meta-api-description">
Adjust the thickness, size, or width of the border around the Sankey chart title by setting pixel values to control how prominent or subtle the title frame appears, enabling customization of title border thickness from no border (0 pixels) to thicker lines to improve visual separation or emphasis in dashboard titles, headings, or labels, with integer values defining the pixel width for the border line around the title area.
</div>

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


<div class="meta-api-description">
Control and customize the text color of the Sankey diagram title by specifying a valid CSS color value such as hex codes, RGB, RGBA, HSL, or named colors; adjust, configure, or set the title’s font color to match themes, branding, visual preferences, or accessibility requirements during initialization or dynamic updates to ensure the title stands out, is clearly visible, and aligns with your overall design palette in web or app interfaces.
</div>

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


<div class="meta-api-description">
Set or customize the descriptive text that screen readers and assistive technologies announce when the Sankey diagram gains focus, enhancing accessibility by providing meaningful context and clear explanations for users relying on keyboards, screen readers, or other assistive devices, enabling improved usability and clarity for visually impaired users through configurable accessible descriptions or labels.
</div>

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


<div class="meta-api-description">
Adjust and customize the Sankey diagram's title text appearance by setting font family, size, weight, style, and color to enhance readability, align with brand guidelines, and improve visual hierarchy; configure typography settings to control how the title is rendered, including options for bold, italic, font scaling, color customization, and CSS-compatible font properties to achieve the desired look and feel for charts, headings, or labels.
</div>

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


<div class="meta-api-description">
Adjust or set the spacing, padding, or outer margins around the Sankey diagram’s title by specifying numeric values to control uniform or custom gaps on all sides including top, right, bottom, and left edges; customize the title’s margin, whitespace, or buffer area to optimize layout, improve readability, or align the heading within the chart container.
</div>

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


<div class="meta-api-description">
Adjust or configure the spacing below the main heading or title above a Sankey diagram to control how far the title sits from the visual flowchart, enable setting the bottom margin or padding area beneath the title to avoid overlap with diagram nodes, labels, or connectors, fine-tune vertical gaps for clearer separation between the title text and the graphical elements below, customize the title’s lower spacing to improve layout margins, prevent visual clutter or collisions, and control the positioning of the top label relative to the data flow visualization in dashboards, reports, or web analytics presentations.
</div>

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


<div class="meta-api-description">
Adjust the horizontal spacing or left padding of the chart title to control how far it is positioned from the left boundary, enabling customization of title alignment and layout for Sankey diagrams. Configure, set, or modify the left margin or left offset of the title text to achieve precise positioning, left indentation, or margin control for better visual arrangement in flow or Sankey charts. Manage title alignment, left spacing, and edge offset to fine-tune the title placement relative to the chart container's left side, supporting layout adjustments and alignment preferences.
</div>

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


<div class="meta-api-description">
Adjust the right margin or spacing of a chart title to control its horizontal alignment, positioning, padding, or whitespace on the right side to prevent overlap, ensure proper layout, and customize visual placement within diagram or graph headings such as Sankey charts. Configure, set, or modify the right-side title padding or gap to influence title spacing, boundary margins, and text placement for improved readability and style consistency in flow diagrams or visualization titles.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing above the chart title by setting or configuring the top margin to control layout positioning and fine-tune how the title aligns with the Sankey diagram area, enabling you to increase or decrease the gap above headings, shift the title downward or upward, manage padding above labels, and customize title placement for better visual hierarchy and presentation within flow or network graph visualizations.
</div>

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


<div class="meta-api-description">
Adjust or configure the spacing, margin, or gap around the diagram title by setting uniform numeric padding values to control top, bottom, left, and right title edges, enabling customization of the distance between the chart header and content area for clearer layout alignment, visual balance, or aesthetic spacing in flow or Sankey diagrams.
</div>

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


<div class="meta-api-description">
Adjust the bottom spacing or vertical margin beneath the Sankey chart title to control layout separation and improve visual clarity, enabling customization of the gap between the header text and the main Sankey diagram area. Set or configure the padding below the title to influence title-to-content spacing, fine-tune the appearance of the header region, and manage vertical alignment for better readability and aesthetic balance in Sankey visualizations.
</div>

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


<div class="meta-api-description">
Adjust or configure the horizontal left spacing or margin for the title text in a flow or Sankey diagram to control alignment, placement, or padding from the left edge and surrounding UI elements. This enables setting or tweaking the left indent, whitespace, or offset before the title to customize layout, visual balance, or spacing specific to Sankey chart headings during initialization or dynamic updates.
</div>

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


<div class="meta-api-description">
Adjust, set, or configure the horizontal right-side spacing or padding of a flow diagram or Sankey chart title to fine-tune the gap between the title text and the container edge or adjacent elements, enabling precise control over title alignment, margin, or whitespace on the right side for better visual layout, spacing customization, and design consistency in data visualization components.
</div>

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


<div class="meta-api-description">
Adjust the vertical spacing above the chart title to create extra padding or margin at the top of the Sankey diagram’s heading, control the distance between the title and the chart edges or content area, configure the top offset to prevent overlap or add breathing room above the title text, set or customize how much space appears above the title in a Sankey visualization, modify the padding above the header to improve layout or visual hierarchy, control vertical title spacing for better alignment or spacing in Sankey charts, enable fine-tuning of title placement by increasing or decreasing top padding near the chart’s upper boundary.
</div>

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


<div class="meta-api-description">
Control the placement or alignment of the diagram’s title by configuring its position to appear either above or below the visualization, setting the label location at the top edge or bottom edge of the Sankey chart, adjusting the title’s vertical orientation, switching the title placement for better layout or display preferences, customizing whether the heading or caption is on the upper or lower part of the diagram, specifying the arrangement of the title in relation to the chart area, enabling title alignment to top or bottom positions, manipulating where the title sits during rendering, and choosing between displaying the title at the upper portion or beneath the flow diagram for clarity and design flexibility.
</div>

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


<div class="meta-api-description">
Control and customize the Sankey chart header by specifying the title content, text string, or string with line breaks for multiline headings, enabling developers to configure, update, or set the main label, caption, or heading displayed atop the flow diagram. Adjust or define the displayed name, title text, or chart heading, including inserting newline characters to split the title across multiple lines, allowing versatile formatting, naming, and labeling of the visualization’s top text area to suit user preferences or UI requirements.
</div>

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


<div class="meta-api-description">
Control whether the header or title of the Sankey diagram is displayed or hidden by enabling or disabling the visibility setting, configuring the chart to show the descriptive title text or omit it completely, toggling the diagram’s main label on or off based on user preference, setting visibility flags to manage the presence of the top caption or heading, and adjusting display options to either render or suppress the Sankey’s title element dynamically in the visualization.
</div>

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


<div class="meta-api-description">
Control and customize the display of interactive hover popups, tooltips, or info boxes for Sankey diagram nodes and links, including enabling or disabling tooltip visibility, configuring dynamic content and formatting, adjusting placement and positioning on hover, styling appearance and themes, and tailoring templates or messages to present contextual data and summaries when users mouse over or interact with network flows or connections in Sankey charts.
</div>

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


<div class="meta-api-description">
Configure and control the insertion point of interactive flow diagram tooltips within the webpage by specifying the container element to which tooltip elements are appended, enabling you to set, change, or override the default attachment target for hover or focus overlays, manage tooltip layering, clipping, stacking context, and positioning relative to parent elements, document body, or custom containers for Sankey chart visualizations, ensuring precise tooltip display control in complex layouts or dynamic DOM structures.
</div>

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


<div class="meta-api-description">
Adjust the timing before tooltip popups show on hover in flow visualizations to manage how fast or slow information boxes appear when hovering over nodes or connections, enabling delay configuration to prevent immediate or accidental tooltips from cluttering the interface or distracting users, with customizable wait intervals in milliseconds to fine-tune tooltip responsiveness in interactive diagrams and data flow charts.
</div>

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


<div class="meta-api-description">
Enable dynamic tooltip behavior that tracks the mouse pointer movement for Sankey chart nodes and links, allowing tooltips to follow the cursor position on hover. Configure interactive cursor-based tooltip positioning to enhance user experience by making information panels move in real-time with pointer location, improving clarity and accessibility of Sankey diagram data during mouse interactions and hover events. Control tooltip follow settings to adjust tooltip responsiveness relative to pointer movement for detailed insight display in flow visualization.
</div>

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


<div class="meta-api-description">
Control and customize the content displayed in tooltips for connections between nodes in flow diagrams, enabling dynamic, data-driven HTML or template-based rendering that reflects link-specific information such as values, labels, and metrics, with options to format, style, and tailor tooltip displays for user interactions, hover states, or detailed insights on relationships within Sankey charts or similar linked data visualizations.
</div>

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


<div class="meta-api-description">
Customize or configure the node tooltip content, rendering personalized templates or HTML for tooltips in flow diagrams or data visualizations. Enable setting custom labels, values, or dynamic content using template functions for node details, controlling the popup or hover display information for each segment. Adjust or bind data fields to tooltip presentation, format node-specific information with flexible markup options, and tailor the interactive tooltip experience within UI components that visualize relationships or flow, such as Sankey charts.
</div>

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


<div class="meta-api-description">
Adjust the distance or spacing between the mouse cursor and the tooltip that appears when hovering over Sankey diagram nodes or links by setting the pixel offset value, enabling control over tooltip positioning to optimize visibility and reduce overlap, customize tooltip placement relative to the pointer, fine-tune hover label distance, configure how far the info box stays from the mouse for clarity, and manage the gap between cursor and displayed hover details for improved user experience in Sankey flows.
</div>

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


<div class="meta-api-description">
Modify or update the configuration and settings of a flow diagram dynamically by applying new parameters to adjust data inputs, visual layout, styling, and interactive behavior without needing to recreate or reinitialize the entire chart. Change options on the fly for Sankey diagrams to control node positions, link paths, colors, dimensions, and other display or functional properties during runtime. Enable real-time updates to structure, appearance, and operational settings of the flow visualization by configuring an existing instance with new options or preferences, supporting flexible adjustment, customization, and refinement of the diagram’s components after it has been rendered.
</div>

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


<div class="meta-api-description">
Remove or delete the Sankey visualization and its related DOM elements, clear event listeners, stop running processes, release memory and resources tied to the component, fully dismantle or unload the chart, and clean up all associated handlers and internal data to avoid memory leaks or lingering effects. This operation disables or disables the instance so it cannot be reused unless reinitialized, supporting scenarios where you want to reset, refresh, or permanently remove the Sankey diagram from the page or application environment.
</div>

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


<div class="meta-api-description">
Export, save, capture, or extract the rendered Sankey diagram visual as a reusable drawing group for printing, embedding, exporting, or further graphical editing. Convert the displayed Sankey chart into a manipulable vector drawing element for integration, composition, transformation, layering, or exporting to other canvases and drawing surfaces, enabling programmatic control, customization, or reuse in different graphical contexts. Generate a grouped visual object representing the entire Sankey layout for downstream processing, layout adjustments, or inclusion in complex drawings and graphic workflows.
</div>

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


<div class="meta-api-description">
Generate or create a PNG image of a flow or Sankey diagram in a format suitable for downloading, sharing, exporting, or saving as a file. Convert the current visual state of a data flow chart or network diagram into an image representation encoded as a data URI. Enable asynchronous extraction and rendering of the diagram into a portable graphic format for embedding, snapshotting, or exporting purposes. Capture and save the chart’s visual output in PNG format, supporting workflows like exporting visuals for reports, presentations, or data sharing via image files.
</div>

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


<div class="meta-api-description">
Convert or save the Sankey diagram as a PDF document, enabling exporting charts or flow diagrams to portable file formats for reporting, sharing, or offline use. Trigger asynchronous PDF generation that produces a Data URI encoded file for download or storage, supporting customization of output appearance and layout through PDF options. Enable exporting visualizations to PDF with promise-based handling to manage export completion, integration with file saving utilities, and control over document configuration such as page size, margins, and formatting for Sankey diagrams.
</div>

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


<div class="meta-api-description">
Generate and retrieve a scalable vector graphics (SVG) representation of the Sankey diagram for saving, downloading, or processing by exporting the visualization as an asynchronous operation that returns a promise with an encoded SVG data URI; enable seamless exporting, conversion, or serialization of the diagram into SVG format suitable for embedding, further editing, external use, or integration with file-saving utilities.
</div>

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


<div class="meta-api-description">
Detect and handle interactions when users click connections or links within a flow diagram or Sankey chart, enabling custom responses such as navigation, highlighting, selection, or triggering custom logic. Capture detailed event data including the clicked link’s properties, the chart instance, and original click event, with options to intercept and prevent default actions. Perfect for implementing user-driven behaviors, click event handlers, interactive data exploration, and modifying link interaction workflows inside Sankey visualizations or similar network or flow diagrams.
</div>

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


<div class="meta-api-description">
Detect when a pointer or cursor moves over or enters a link or connection within a flow or Sankey diagram to trigger hover effects, show tooltips, highlight paths, enable interactive UI updates, start animations, run custom event handlers, track mouse or pointer movements, detect user interaction with links, and control dynamic behaviors based on user pointer presence over flow connections.
</div>

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


<div class="meta-api-description">
Detect when the user’s pointer, mouse, or interaction leaves or exits a connection between nodes in a flow diagram to trigger cleanup actions such as hiding tooltips, removing hover highlights, resetting styling, stopping animations, or finalizing link-specific behaviors; useful for handling pointer leave, mouse out, hover end, or interaction exit events on links in Sankey diagrams or similar chart connections.
</div>

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


<div class="meta-api-description">
Detect and handle user clicks on Sankey diagram nodes to trigger custom actions like navigation, displaying detailed information, updating data dynamically, or performing interactive logic; capture click events on individual nodes with access to node-specific data, event context, and source elements for fine-grained control over user interactions, enabling developers to bind behaviors such as opening panels, filtering content, or modifying flow based on which part of the diagram was clicked.
</div>

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


<div class="meta-api-description">
Capture and respond to pointer hover, mouseenter, mouseover, or pointerenter events on graph nodes to trigger custom behaviors or interactive feedback when a user’s cursor enters a Sankey diagram node area, enabling control over hover states, highlighting, tooltips, or dynamic updates tied to node entry interactions.
</div>

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


<div class="meta-api-description">
Detect or track when the mouse pointer, cursor, or user interaction leaves or exits a Sankey diagram node, enabling actions such as removing hover highlights, hiding tooltips, clearing temporary states, resetting styles, or updating application data when the pointer departs from a specific node element. Capture node exit, mouseleave, or cursor out events on Sankey nodes to handle cleanup tasks, manage UI responsiveness, or trigger state changes connected to user navigation away from a node region. Recognize and respond to user pointer transitions off Sankey node elements for dynamic interaction control, tooltip dismissal, and visual state resets.
</div>

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
