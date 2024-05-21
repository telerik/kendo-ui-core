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

### data.links.color `String`

The color of the link. The color is used when the `colorType` option is set to `static`. Accepts a valid CSS color string, including hex and rgb.

### data.links.colorType `String`

The color type of the link. The supported values are:

* "static" - The link color is static. The color is determined by the link's `color` option.
* "source" - The link color is the same as the source node color.
* "target" - The link color is the same as the target node color.

### data.links.highlight `Object`

The link highlight configuration options.

### data.links.highlight.inactiveOpacity `Number` *(default: 0.2)*

The opacity of the links when another link is highlighted by hovering or tapping on it.

### data.links.highlight.opacity `Number` *(default: 0.8)*

The opacity of the links when they are highlighted by hovering or tapping on them.

### data.links.opacity `Number` *(default: 0.4)*

The opacity of the links.

### data.links.sourceId `Number|String` *(required)*

The source node ID of the link. The source node is the node from which the link originates.

### data.links.targetId `Number|String` *(required)*

The target node ID of the link. The target node is the node to which the link points.

### data.links.value `Number` *(required)*

The value of the link. The value represents the weight of the link and determines the width of the link.

### data.nodes `Array` *(required)*

The nodes of the Sankey. The nodes are the elements that are connected by the links. Each node has an `id` that is used to connect the nodes with the links.

### data.nodes.align `String`

The alignment of the node. The supported values are:

* "stretch" - The node is aligned to left or right in order to fill the entire width of the Sankey.
* "left" - The node is aligned to the left.
* "right" - The node is aligned to the right.

### data.nodes.color `String`

The color of the node. Accepts a valid CSS color string, including hex and rgb.

### data.nodes.id `Number|String` *(required)*

The ID of the node. The ID is used to connect the nodes with the links.

### data.nodes.label `Object` *(required)*

The label of the node.

### data.nodes.label.align `String` *(default: "left")*

The alignment of the label. The supported values are:

* "left" - The label is aligned to the left.
* "right" - The label is aligned to the right.
* "center" - The label is aligned to the center.

### data.nodes.label.border `Object`

The border of the label.

### data.nodes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

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

### data.nodes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### data.nodes.label.color `String`

The color of the label. Accepts a valid CSS color string, including hex and rgb.

### data.nodes.label.font `String`

The font of the label. Accepts a valid CSS font string. For example, "bold 12px Arial".

### data.nodes.label.margin `Object`

The margin of the label.

### data.nodes.label.margin.left `Number` *(default: 0)*

The left margin of the label.

### data.nodes.label.margin.right `Number` *(default: 0)*

The right margin of the label.

### data.nodes.label.offset `Object`

The offset applied to the label's position.

### data.nodes.label.offset.left `Number` *(default: 0)*

The left offset of the label.

### data.nodes.label.offset.top `Number` *(default: 0)*

The top offset of the label.

### data.nodes.label.padding `Number|Object`

The padding of the label.

### data.nodes.label.padding.bottom `Number` *(default: 0)*

The bottom padding of the label.

### data.nodes.label.padding.left `Number` *(default: 0)*

The left padding of the label.

### data.nodes.label.padding.right `Number` *(default: 0)*

The right padding of the label.

### data.nodes.label.padding.top `Number` *(default: 0)*

The top padding of the label.

### data.nodes.label.position `String` *(default: "inside")*

The position of the label. The supported values are:

* "inside" - The label is positioned after the node, except for the nodes at the end of the Sankey, that are placed before the node.
* "before" - The label is positioned before the node.
* "after" - The label is positioned after the node.

### data.nodes.label.stroke `Object`

The stroke of the label.

### data.nodes.label.stroke.color `String`

The color of the stroke.

### data.nodes.label.stroke.lineJoin `String` *(default: "round")*

The line join of the stroke.

### data.nodes.label.stroke.width `Number` *(default: 1)*

The width of the stroke.

### data.nodes.label.text `String` *(required)*

The text of the label.

### data.nodes.label.visible `Boolean` *(default: true)*

If set to `false`, the label will not be displayed.

### data.nodes.offset `Object` *(default: { top: 0, left: 0 })*

The offset applied to the node's position.

### data.nodes.offset.left `Number`

The left offset of the node.

### data.nodes.offset.top `Number`

The top offset of the node.

### data.nodes.opacity `Number` *(default: 1)*

The opacity of the node.

### data.nodes.padding `Number` *(default: 16)*

The minimum vertical space between two nodes.

### data.nodes.width `Number` *(default: 24)*

The width of the node.

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

### labels.border `Object`

The border of the label.

### labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

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

### labels.color `String`

The color of the label.

### labels.font `String`

The font of the label.

### labels.margin `Object`

The margin of the label.

### labels.margin.left `Number` *(default: 8)*

The left margin of the label.

### labels.margin.right `Number` *(default: 8)*

The right margin of the label.

### labels.offset `Object`

The offset applied to the label's position.

### labels.offset.left `Number` *(default: 0)*

The left offset of the label.

### labels.offset.top `Number` *(default: 0)*

The top offset of the label.

### labels.padding `Number|Object` *(default: 0)*

The padding of the label.

### labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the label.

### labels.padding.left `Number` *(default: 0)*

The left padding of the label.

### labels.padding.right `Number` *(default: 0)*

The right padding of the label.

### labels.padding.top `Number` *(default: 0)*

The top padding of the label.

### labels.position `String` *(default: "inside")*

The position of the label. The supported values are:

* "inside" - The label is positioned after the node, except for the nodes at the end of the Sankey, that are placed before the node.
* "before" - The label is positioned before the node.
* "after" - The label is positioned after the node.

### labels.stroke `Object`

The stroke of the label text.

### labels.stroke.color `String`

The color of the stroke.

### labels.stroke.lineJoin `String` *(default: "round")*

The line join of the stroke.

### labels.stroke.width `Number` *(default: 1)*

The width of the stroke.

### labels.visible `Boolean` *(default: true)*

If set to `false`, the label will not be displayed.

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

### legend.background `String`

The background color of the legend.

### legend.border `Object`

The border of the legend.

### legend.border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb.

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

### legend.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### legend.height `Number`

The height of the legend.

### legend.item `Object`

The configuration of the legend items.

### legend.item.areaBackground `String`

The background color of the legend item square element. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the corresponding node color.

### legend.item.areaOpacity `Number`

The opacity of the legend item square element.
Defaults to the corresponding node opacity.

### legend.item.cursor `String`

The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

### legend.item.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

- `options`&mdash;The item options.
- `createVisual`&mdash;A function for getting the default visual.

### legend.labels `Object`

The Sankey legend label configuration.

### legend.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

### legend.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels. Accepts a valid CSS color string, for example "20px 'Courier New'".

### legend.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

### legend.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

### legend.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

### legend.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

### legend.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

### legend.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

### legend.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

### legend.labels.padding.left `Number` *(default: 6)*

The left padding of the labels.

### legend.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

### legend.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

### legend.margin `Number|Object` *(default: 5)*

The margin of the Sankey legend. A numeric value will set all paddings.

### legend.margin.bottom `Number` *(default: 0)*

The bottom margin of the Sankey legend.

### legend.margin.left `Number` *(default: 0)*

The left margin of the Sankey legend.

### legend.margin.right `Number` *(default: 0)*

The right margin of the Sankey legend.

### legend.margin.top `Number` *(default: 0)*

The top margin of the Sankey legend.

### legend.offsetX `Number` *(default: 0)*

The X offset of the Sankey legend. The offset is relative to the default position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of its initial position.
A negative value will move the legend to the left of its current position.

### legend.offsetY `Number` *(default: 0)*

The Y offset of the Sankey legend.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from its initial position.
A negative value will move the legend upwards from its current position.

### legend.orientation `String` *(default: "vertical")*

The orientation of the legend items.

The supported values are:

* "vertical" - the legend items are added vertically.

* "horizontal" - the legend items are added horizontally.

### legend.padding `Number|Object` *(default: 5)*

The padding of the Sankey legend. A numeric value will set all paddings.

### legend.padding.bottom `Number` *(default: 0)*

The bottom padding of the Sankey legend.

### legend.padding.left `Number` *(default: 0)*

The left padding of the Sankey legend.

### legend.padding.right `Number` *(default: 0)*

The right padding of the Sankey legend.

### legend.padding.top `Number` *(default: 0)*

The top padding of the Sankey legend.

### legend.position `String` *(default: "right")*

The positions of the Sankey legend.

The supported values are:

* "top" - the legend is positioned on the top.
* "bottom" - the legend is positioned on the bottom.
* "left" - the legend is positioned on the left.
* "right" - the legend is positioned on the right.
* "custom" - the legend is positioned using [legend.offsetX](/api/javascript/dataviz/ui/sankey#configuration-legend.offsetX) and [legend.offsetY](/api/javascript/dataviz/ui/sankey#configuration-legend.offsetY).

### legend.reverse `Boolean` *(default: false)*

If set to `true` the legend items will be reversed.

### legend.spacing `Number`

The spacing between the labels in pixels when the [legend.orientation](/api/javascript/dataviz/ui/sankey#configuration-legend.orientation) is "horizontal".

### legend.title `Object`

The legend title configuration options.

### legend.title.align `String` *(default: "center")*

The alignment of the title.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

### legend.title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

### legend.title.border `Object`

The border of the title.

### legend.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

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

### legend.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### legend.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

### legend.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

### legend.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

### legend.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

### legend.title.margin.left `Number` *(default: 0)*

The left margin of the title.

### legend.title.margin.right `Number` *(default: 0)*

The right margin of the title.

### legend.title.margin.top `Number` *(default: 0)*

The top margin of the title.

### legend.title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

### legend.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

### legend.title.padding.left `Number` *(default: 0)*

The left padding of the title.

### legend.title.padding.right `Number` *(default: 0)*

The right padding of the title.

### legend.title.padding.top `Number` *(default: 0)*

The top padding of the title.

### legend.title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

### legend.title.text `String`

The text of the legend title. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

### legend.title.visible `Boolean` *(default: true)*

If set to `false` the Sankey will not display the legend title.

### legend.visible `Boolean` *(default: true)*

If set to `false` the Sankey will not display the legend.

### legend.width `Number`

The legend width when the [legend.orientation](/api/javascript/dataviz/ui/sankey#configuration-legend.orientation) is set to "horizontal".

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

### links.colorType `String` *(default: "static")*

The color type of the links. The supported values are:

* "source" - the color of the link is determined by the source node.
* "static" - the color of the link is static.
* "target" - the color of the link is determined by the target node.

### links.highlight `Object`

The link highlight configuration options.

### links.highlight.inactiveOpacity `Number` *(default: 0.2)*

The opacity of the links when they are not active.

### links.highlight.opacity `Number` *(default: 1)*

The opacity of the links.

### links.opacity `Number` *(default: 1)*

The opacity of the links.

### messages `Object`

The configuration of the messages displayed in the Sankey.

### messages.tooltipUnits `String` *(default: "({0} Units)")*

The units string displayed in the tooltip.

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

### nodes.offset `Object` *(default: { top: 0, left: 0 })*

The offset applied to the node's position.

### nodes.offset.left `Number`

The left offset of the node.

### nodes.offset.top `Number`

The top offset of the node.

### nodes.padding `Number` *(default: 16)*

The minimum vertical space between two nodes.

### nodes.width `Number` *(default: 24)*

The width of the node.

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

### title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

### title.border `Object`

The border of the title.

### title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

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

### title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

### title.description `String`

The accessible description of the Sankey. The description is announced by screen readers when the Sankey is focused.

### title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

### title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

### title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

### title.margin.left `Number` *(default: 0)*

The left margin of the title.

### title.margin.right `Number` *(default: 0)*

The right margin of the title.

### title.margin.top `Number` *(default: 0)*

The top margin of the title.

### title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

### title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

### title.padding.left `Number` *(default: 0)*

The left padding of the title.

### title.padding.right `Number` *(default: 0)*

The right padding of the title.

### title.padding.top `Number` *(default: 0)*

The top padding of the title.

### title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

### title.text `String`

The text of the Sankey title. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

### title.visible `Boolean` *(default: true)*

If set to `false` the Sankey will not display the title.

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

### tooltip.delay `Number` *(default: 1000)*

The delay in milliseconds before the tooltip is displayed.

### tooltip.followPointer `Boolean` *(default: false)*

If set to `true`, the tooltip will follow the mouse pointer.

### tooltip.linkTemplate `String|Function`

The template which renders the tooltip content for the links.

### tooltip.nodeTemplate `String|Function`

The template which renders the tooltip content for the nodes.

### tooltip.offset `Number` *(default: 12)*

The distance between the tooltip and the mouse pointer in pixels.

## Methods

### setOptions `Object`

Sets the options of the Sankey.

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
