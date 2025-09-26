---
title: Connection
res_type: api
---

# kendo.dataviz.diagram.Connection

The Connection object is a visual link or connection in the graph or diagram.
Connections are usually created by calling [connect](/api/dataviz/diagram#methods-connect) on a Diagram instance.

## Configuration

### content `Object`

Defines the options for the label displayed on the connection path.


<div class="meta-api-description">
Control and customize the text, labels, captions, or annotations displayed on lines or connectors between nodes in diagrams or flowcharts, including configuring label content, templates, placement, positioning, styling, formatting, appearance, and visibility along connection paths. Enable setting dynamic or static connection labels, defining display options, adjusting alignment and offsets, and managing visual properties for connection text elements used to annotate links, edges, or relationships within graphical representations such as flow diagrams, network graphs, or UI connectors.
</div>

#### Example - configuring the content

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Step 1",
          color: "#336699",
          fontSize: 16,
          fontStyle: "italic",
          fontWeight: "bold"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### content.color `String`

The color of the connection content text.


<div class="meta-api-description">
Control and customize the text color of labels within diagram connections by setting any valid CSS color format such as hex codes, RGB, RGBA, or named colors to style connection content text. Enable configuring label font colors dynamically to improve readability, highlight specific connections, or match design themes by changing the connection text appearance. Adjust and set the color properties for connection descriptions or annotations within diagram elements, ensuring that text labels in connections can be precisely colored for clarity, contrast, and visual emphasis across different UI states or contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Connection",
          color: "red"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.fontFamily `String`

The font family of the connection content text.


<div class="meta-api-description">
Configure the font family or typeface used for text labels and content within connections in a diagram, enabling you to specify CSS font stacks such as Arial, Helvetica, or generic sans-serif fonts to control text appearance, style, and fallback options for connection content, including setting or changing fonts during initialization to customize the visual presentation of connection labels, captions, or inline text within diagram components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Connection",
          fontFamily: "Arial"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.fontSize `Number`

The font size of the connection content text.


<div class="meta-api-description">
Adjust, set, or configure the text size, font scale, or label dimensions of connection content within diagrams or graphical flows to enhance readability, layout clarity, text visibility, and visual hierarchy. Enable larger or smaller font sizes for connection labels, captions, or annotations to customize appearance, improve user interface design, and ensure content on links or connectors is legible and appropriately sized across different display resolutions and contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Connection",
          fontSize: 16
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.fontStyle `String`

The font style of the connection content text.


<div class="meta-api-description">
Control and customize the text appearance within connection elements by configuring font style attributes such as italic, normal, or oblique font settings for diagram connections. Adjust, set, or enable different font styling options to change the typographic look of content text inside connection lines or connectors, influencing how text is rendered in flowcharts, network diagrams, or visual data structures. Modify and apply varied font style formats to connection text labels for enhanced readability, emphasis, or stylistic consistency during component setup or dynamic updates.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Connection",
          fontStyle: "italic"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.fontWeight `String`

The font weight of the connection content text.


<div class="meta-api-description">
Adjust and control the thickness or boldness of text labels on connections to highlight or soften the appearance of connection content in diagrams or graphical interfaces. This setting lets you configure font weight styling for connection labels, enabling emphasis, readability adjustments, and visual hierarchy by specifying standard CSS font weight values such as normal, bold, lighter, or numeric weights. Common uses include making connection names stand out, tone down label prominence, or customize text appearance for clarity and design consistency within diagram components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Connection",
          fontWeight: "bold"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified


<div class="meta-api-description">
Customize connection labels in diagram visuals by providing templates that define how content appears, enabling dynamic rendering of text or HTML based on underlying data. Control label appearance through templates that bind to data fields, format display values, and integrate custom markup or components, supporting scenarios like conditional formatting, dynamic content generation, and advanced data-driven label customization. Enable data-driven, template-based labels for connections with access to data items for flexible, formatted, and context-aware rendering within diagram or graph components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          template: function(dataItem){
            return `Connection --->`
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.text `String`

The static text displayed on the connection.


<div class="meta-api-description">
Set or customize the text label, caption, or annotation displayed on a connection line in a diagram to identify, describe, or explain edges, links, or relationships between nodes; configure static content, inline text, or connection captions to visually represent connection details, comments, or identifiers during diagram setup or runtime, enabling clear communication of connection purpose, attributes, or metadata through customizable textual overlays on links or lines between components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Custom Connection Text"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### content.visual `Function`

A function returning a visual element to render for the content of a connection.


<div class="meta-api-description">
Customize or configure how connection labels, badges, inline graphics, or visual indicators appear within diagram links by providing a function that dynamically generates and returns rendering elements such as DOM nodes or drawing components for each connection. Control and set dynamic visuals, data-driven content, or custom appearance of connection elements, enabling flexible rendering of annotations, icons, or graphical decorations along connections in diagram-based interfaces or flowcharts. Enable tailored rendering logic to display custom visuals, badges, or label enhancements on connections to reflect state, metadata, or contextual information visually within the diagram's linking elements.
</div>

#### Example - configuring the content

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Step 1",
          visual: function(e){
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.TextBlock({ text: e.text }));
            group.rotate(-90, new kendo.dataviz.diagram.Point(10, 0));
            return group;
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### fromConnector `String` *(default: "Auto")*

Specifies the name of the source shape connector that should be used by default.


<div class="meta-api-description">
Configure the starting attachment point for connections by selecting or specifying the source shape’s connector, controlling where links originate to ensure accurate anchoring and consistent routing of diagram connections. Enable precise endpoint selection, customize connection origin anchors, set default source attachment points, and manage how connections attach and render on the source element for predictable layout and linking behavior in diagrams and flowcharts.
</div>

#### Example - configuring the fromConnector

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### fromX `Number`

The absolute point (X-coordinate), if any, that the connection is originating from.


<div class="meta-api-description">
Specify or adjust the horizontal start position of a diagram connection by setting the initial X-coordinate value where the connection begins, enabling precise control over the connection’s origin point on the X-axis; useful for defining fixed or absolute starting coordinates, aligning connection anchors horizontally, customizing connection layout positions, and combining with vertical coordinates to position connections accurately.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var connection = new kendo.dataviz.diagram.Connection({
        fromX: 100,
        fromY: 150,
        toX: 300,
        toY: 200,
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### fromY `Number`

The absolute point (Y-coordinate), if any, that the connection is originating from.


<div class="meta-api-description">
Control the vertical starting position or Y-coordinate for the origin of a connection line within a diagram, enabling precise placement of where a link or edge begins on the vertical axis. Adjust or configure the initial vertical anchor point to set the exact Y position for connections, specifying absolute coordinates for connection origins, useful for fine-tuning link layouts, positioning flowchart arrows, or defining starting points of edges along the vertical plane. This supports scenarios requiring custom vertical alignment, setting connection entry points by pixels or units, and controlling connection start positions programmatically during diagram initialization or dynamic updates.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var connection = new kendo.dataviz.diagram.Connection({
        fromX: 150,
        fromY: 100,
        toX: 350,
        toY: 250,
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### stroke `Object`

Defines the stroke configuration.


<div class="meta-api-description">
Adjust and customize the line appearance of diagram connections by setting color, thickness, dash patterns, transparency, and other stroke attributes to control the visual style, border, outline, and rendering of connector lines within diagrams or flowcharts, enabling fine-tuned control over connection borders, line effects, dash styles, stroke opacity, and overall connector visualization for clear and distinct graphical link representation.
</div>

#### Example - configuring the stroke

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        stroke: {
          color: "red",
          width: 2,
          dashType: "dash"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### stroke.color `String`

Defines the stroke or line color of the connection.


<div class="meta-api-description">
Control and customize the color of lines or edges connecting nodes in diagrams and flowcharts by specifying any valid CSS color format such as hex codes, RGB, RGBA, or named colors. Adjust, configure, or set the visual stroke color for connections, links, or connectors to enhance diagram readability, style connections with precise colors, change edge appearance dynamically, and apply custom line hues for better visual distinction in graphical interfaces or workflow mappings.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        stroke: {
          color: "blue"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### stroke.dashType `String`

Specifies the stroke dash type.

The following dash types are supported:

* "dash" - A line that consists of dashes
* "dashDot" - A line that consists of a repeating pattern of dash-dot
* "dot" - A line that consists of dots
* "longDash" - A line that consists of a repeating pattern of long-dash
* "longDashDot" - A line that consists of a repeating pattern of long-dash-dot
* "longDashDotDot" - A line that consists of a repeating pattern of long-dash-dot-dot
* "solid" - A solid line


<div class="meta-api-description">
Control, configure, or customize the stroke style of connection lines in diagrams by setting line patterns such as solid, dashed, dotted, dash-dot, long dash, and complex combinations like long dash-dot or long dash-dot-dot. This includes enabling various dash configurations to visually distinguish connections with patterns including repeating dashes, dots, mixed dash-dot sequences, and continuous solid lines, allowing precise styling of link strokes in flowcharts, network diagrams, and graphical connectors to match design preferences or enhance readability. Adjust line stroke patterns to create solid or segmented line appearances tailored to visualization needs, diagramming workflows, or interactive graphical UIs.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        stroke: {
          dashType: "dot"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### stroke.width `Number`

Defines the stroke width of the connection.


<div class="meta-api-description">
Adjust the thickness, weight, or boldness of lines, connectors, edges, and links within diagrams or visual graphs by configuring stroke width to control how thick, thin, or prominent connection lines appear, enabling customization of line thickness for better visual clarity or style in diagrams and graphic flows.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        stroke: {
          width: 3
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### hover `Object`

Defines the hover configuration.


<div class="meta-api-description">
Control and customize how diagram connections react to mouse pointer hovering by configuring visual styles, enabling or disabling hover effects, setting tooltip content, adjusting cursor appearance on hover, defining hover-specific event handlers or callbacks, and tailoring interactive behaviors during pointer-over actions on connections in diagram or flowchart components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        hover: {
          stroke: {
            color: "orange",
            width: 2
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### hover.stroke `Object`

Defines the hover stroke configuration.


<div class="meta-api-description">
Adjust and customize the outline style that appears when the user hovers over links, connectors, or edges in a diagram or network graph by setting stroke attributes like color, thickness, dash patterns, and transparency to visually emphasize connections during mouseover or hover interactions; configure hover border effects, highlight strokes, and hover outlines to improve interactive feedback and clarity for edges, lines, or links within graphical interfaces or diagram components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        hover: {
          stroke: {
            color: "red",
            width: 3
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### hover.stroke.color `String`

Defines the highlight color when the pointer is hovering over the connection.


<div class="meta-api-description">
Control and customize the color of the outline or border that appears around a connection line when a user’s cursor is hovering or moving over it, enabling enhanced visual feedback such as hover highlights, mouseover stroke color changes, dynamic line coloring on pointer focus, and improved connection visibility for interactive diagrams, graphs, and network representations to better indicate selection, targeting, or emphasis during user interaction and navigation.
</div>

#### Example - configuring the hover

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        hover: {
          stroke: {
            color: "red"
          }
        },
        stroke: {
          color: "green",
          width: 2
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### startCap `String|Object`

The connection start cap configuration or type name.


<div class="meta-api-description">
Control and customize the starting endpoint marker or arrowhead style of a diagram connection by setting its shape, size, or choosing from predefined cap types; configure the initial line cap appearance, adjust visual markers on the connection start, set connection arrowhead styles, define the beginning cap shape for connectors, or specify custom start endpoint decorations and markers to enhance diagram flow visualization.
</div>

#### Example - configuring the startCap

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        startCap: {
          type: "FilledCircle",
          fill: {
            color: "red"
          },
          stroke: {
            color: "blue",
            width: 2
          }
        },
        selectable: false
      });
    </script>


### startCap.fill `String|Object`

The connection start cap fill options or color.


<div class="meta-api-description">
Customize or configure the fill color, gradient, or opacity for the starting cap of connections or lines in diagrams, flowcharts, or graphical interfaces, allowing control over visual styling, color settings, shading, transparency levels, and appearance options for the connection’s start endpoint, enabling designers and developers to set solid or gradient fills, adjust fill effects, and modify the look of the connection’s beginning node or cap element.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          fill: "red"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.fill.color `String` *(default: "black")*

The connection start cap fill color.


<div class="meta-api-description">
Adjust the fill color, paint, or background shade of the start endpoint marker, arrowhead, or cap on connection lines to customize, configure, or control its visual appearance and styling, enabling developers to set, enable, or modify the fill hue, tone, or color value for the connection's starting cap or symbol in diagrams, flowcharts, or graphical links.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          fill: {
            color: "green"
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.fill.opacity

The connection start cap fill opacity.


<div class="meta-api-description">
Adjust or configure the transparency level, alpha, or opacity of the starting endpoint fill color for diagram connections, controlling how visible or translucent the beginning cap's background appears; set or modify the fill transparency for connection start caps from fully transparent to fully opaque to customize visual clarity, emphasis, or layering effects in diagram links or edges during initial setup or runtime styling.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          fill: {
            color: "blue",
            opacity: 0.5
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.stroke `String|Object`

The connection start cap stroke options or color.


<div class="meta-api-description">
Control and customize the line color, stroke style, and appearance of the starting endpoint or start cap in a diagram connection by configuring stroke properties such as color, width, dash patterns, or passing CSS color values to define how the connection’s start segment is visually rendered, enabling setting, adjusting, or styling the outline and stroke effects at the connection’s initial point for clear graphical representation and tailored visual design.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          stroke: "red"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.stroke.color `String`

The connection start cap stroke color.


<div class="meta-api-description">
Customize and control the outline color of a diagram connection’s starting endpoint or line cap by setting the stroke or border color that defines the visual style at the beginning of the connector line, enabling developers to configure, adjust, or style the initial line ending’s border hue during initialization or dynamically for clearer visual distinction, start point highlighting, or thematic color matching in diagrams, flowcharts, or graphical connectors.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          stroke: {
            color: "purple"
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.stroke.dashType `String`

The connection start cap stroke dash type.


<div class="meta-api-description">
Configure or set the dash pattern, dash style, or line style for the starting edge stroke of a connection or link in diagrams and flowcharts, including options for solid lines, dashed lines, dotted lines, or custom dash arrays that control how the start cap line is visually rendered or displayed. Enable customizing the appearance of the initial segment’s stroke with various dash patterns to control line styling at the connection's starting point in graphical components, connectors, or flowchart edges.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          stroke: {
            dashType: "dash"
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.stroke.width `Number`

The connection start cap stroke width.


<div class="meta-api-description">
Adjust or configure the thickness, weight, or width of the outline stroke at the beginning or start of a connection line or cap in diagram visuals, controlling how bold or thin the start endpoint appears by setting the stroke width, enabling customization of connection line caps during setup for enhanced visual styling, line rendering, or graphical emphasis on connection start points.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "arrow",
          stroke: {
            width: 3
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### startCap.type `String` *(default: "none")*

The connection start cap type.

The supported values are:

* "none": no cap
* "ArrowStart": a filled arrow
* "FilledCircle": a filled circle


<div class="meta-api-description">
Control or set the shape, marker, or visual indicator at the beginning or start of a connection line or link in a diagram to show directionality or endpoint style, including options such as no marker, an arrowhead pointing forward, or a filled circular cap; customize, configure, or enable different starting caps for connections to improve diagram clarity, flow visualization, or network mapping, with choices to toggle between no start marker, arrow start markers, or filled circles to represent connection origins or arrow tips on links between nodes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        startCap: {
          type: "FilledCircle"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap `String|Object`

The connection end cap configuration or type name.


<div class="meta-api-description">
Set or customize the shape, style, or appearance of the endpoint of a connection or line in a diagram or graph, controlling how the connection terminates with various end shapes, caps, or markers; configure, enable, or modify the visual end marker by specifying different types, styles, or detailed shape parameters to define arrowheads, dots, squares, or other endpoint decorations for connections, edges, or links.
</div>

#### Example - configuring the endCap

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        endCap: {
          type: "ArrowEnd",
          fill: {
            color: "red"
          },
          stroke: {
            color: "blue",
            width: 2
          }
        },
        selectable: false
      });
    </script>


### endCap.fill `String|Object`

The connection end cap fill options or color.


<div class="meta-api-description">
Control or customize the fill color, gradient, pattern, or complex styling for the end cap of a connection or connector in a diagram, configure solid colors, transparent fills, or advanced fill options, adjust appearance for connection arrowheads, endpoints, or line caps, set or update fill properties to change the end marker's background, enable specific fill effects on connection terminals in visual graph or diagram components, define how connection ends are visually filled whether with simple colors or detailed fill configurations during initialization or dynamic updates.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          fill: "orange"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.fill.color `String` *(default: "black")*

The connection end cap fill color.


<div class="meta-api-description">
Control, specify, or customize the fill color of arrowheads, markers, or connection endpoints in diagrams and flowcharts by setting the end cap’s interior color. Adjust or configure connector tip colors, style endpoint fills, change arrowhead shading, or theme the fill appearance of connection ends to match design requirements, branding, or visual preferences in diagramming components. Enable color customization for connector ends, apply specific fill shades to line caps, and modify the appearance of directional markers or terminal points on connection lines for enhanced visual clarity and stylistic consistency.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          fill: {
            color: "purple"
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.fill.opacity

The connection end cap fill opacity.


<div class="meta-api-description">
Adjust the fill transparency or opacity level of arrowhead end caps on connections to control how solid, clear, or see-through the end cap appears; set or configure alpha values for end cap fills to customize visibility, transparency degree, or opacity shading for connection arrows or endpoints, enabling styling that ranges from fully opaque to partially or fully transparent finishes on connection arrowheads.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          fill: {
            color: "yellow",
            opacity: 0.7
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.stroke `String|Object`

The connection end cap stroke options or color.


<div class="meta-api-description">
Set or customize the outline appearance of connection endpoints in diagrams by controlling stroke color, line width, dash styles, opacity, and other stroke-related attributes; enable configuring the visual border of connector end caps with simple color values or detailed stroke option objects, adjusting how the connection line terminates visually, including solid, dashed, or transparent effects, and modify these settings during component setup or initialization to achieve precise connector styling and ensure clear, customizable diagram links.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          stroke: "black"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.stroke.color `String`

The connection end cap stroke color.


<div class="meta-api-description">
Adjust or customize the outline color of connection end caps, arrowheads, endpoints, or line terminators in diagram connectors by configuring the stroke color for connection endpoints. Enable setting, changing, or styling the border color of connection tips, controlling how connection ends appear visually in flowcharts, graphs, or network diagrams. This includes options to color code, highlight, or differentiate arrow outlines or connection caps by modifying their stroke hues for better visual clarity or design consistency.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          stroke: {
            color: "cyan"
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.stroke.dashType `String`

The connection end cap stroke dash type.


<div class="meta-api-description">
Adjust or configure the stroke dash pattern, dash style, or line style for the end cap of a connection in diagrams, enabling settings for dashed, dotted, solid, or custom stroke outlines on connection terminators, endpoints, or arrow tips to customize visual appearance or control how connection ends are rendered and styled in flowcharts, network graphs, or schematic representations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          stroke: {
            dashType: "dot"
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.stroke.width `Number`

The connection end cap stroke width.


<div class="meta-api-description">
Adjust the thickness, width, or stroke size of connection arrowheads, terminal caps, or line endings in diagram connectors, configuring how bold, thin, or prominent the outlines of connection end caps appear; control or set the border width for connector endpoints, customize the visual weight of connector strokes, and modify the boundary thickness of diagram link terminals or arrows to achieve precise styling and visual emphasis on connection terminations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "ArrowEnd",
          stroke: {
            width: 4
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### endCap.type `String` *(default: "none")*

The connection end cap type.

The supported values are:

* "none": no cap
* "ArrowEnd": a filled arrow
* "FilledCircle": a filled circle


<div class="meta-api-description">
Set or configure the shape at the end of a connection line in a diagram or flowchart, choosing from options like no endpoint decoration, a solid arrowhead for directional indication, or a filled circular cap to highlight connection termination. Control, customize, or specify the endpoint style of connectors, links, or edges to visually represent flow direction, connection termination, or highlight point, including enabling no decoration, arrowheads, or filled circles. Adjust or modify connection endings for diagrams, graphs, or network visualizations to improve readability or emphasis on the start or finish of lines, paths, or relations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        endCap: {
          type: "FilledCircle"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### points `Array`

Sets the intermediate points (in global coordinates) of the connection.


<div class="meta-api-description">
Specify an ordered list of intermediate coordinates or waypoints to control the exact routing path of a connection line between source and target elements in a diagram, enabling manual path adjustments, custom bends, intermediate anchor points, or precise edge shaping by setting, configuring, or modifying the sequence of global vertex positions that define the connection’s trajectory.
</div>

#### Example - configuring the points

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        type: "polyline",
        points: [
          new Point(150,100),
          new Point(150,150),
          new Point(200,150),
          new Point(200,100)
        ],
        selectable: false
      });
    </script>


### points.x `Number`

Sets the X coordinate of the point.


<div class="meta-api-description">
Set or adjust the horizontal position or X coordinate of a connection point within a diagram, control or configure the left-right placement, align or move connection anchors along the X axis, specify exact horizontal coordinates for connectors, programmatically shift connection points side to side, define or retrieve the connection's X position for precise layout and alignment tasks, manipulate or control the connection point’s lateral placement in graphical interfaces or flow diagrams, customize horizontal positioning of link endpoints for diagrammatic connections.
</div>

#### Example - configuring the points.x

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        type: "polyline",
        points: [
          { x: 150, y: 100 },
          { x: 175, y: 150 },
          { x: 200, y: 100 }
        ],
        selectable: false
      });
    </script>


### points.y `Number`

Sets the Y coordinate of the point.


<div class="meta-api-description">
Set, adjust, or control the vertical position of a connection node or anchor point within a diagram or flowchart by specifying the Y coordinate, enabling dynamic updates or initial placement to influence layout, alignment, or path routing of connections. This includes modifying the vertical coordinate of connection points to reposition connectors, manage anchor placement, customize link pathways, and refine the visual arrangement in graphical interfaces or diagramming tools during runtime or setup.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      var Point = kendo.dataviz.diagram.Point;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        points: [
          new Point(200, 50),
          new Point(250, 150)
        ],
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### selectable `Boolean` *(default: true)*

Specifies if the connection can be selected.


<div class="meta-api-description">
Enable or disable user interaction for selecting connection lines or links within diagrams, controlling whether these connections can be highlighted, clicked, or programmatically targeted. This toggle manages the ability to pick, focus, or manipulate connection elements during editing or navigation, affecting user-driven or code-driven selection behaviors, selection toggles, and interaction filters in graphical interfaces or flowchart components.
</div>

#### Example - configuring the selectable

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        selectable: false
      });
    </script>


### toConnector `String` *(default: "Auto")*

Specifies the name of the target shape connector that should be used by default.


<div class="meta-api-description">
Configure or specify the default attachment point for connections on target shapes in diagrams by setting or selecting the connector name where links or connections should automatically connect when created or displayed. This includes controlling the connection endpoint, defining which connector or anchor point on a shape is used for connecting lines, links, or relationships, and enabling precise or automatic binding to designated connection slots. Use cases include setting default connection targets, managing how connections snap to shapes, customizing connector anchors, and controlling attachment behavior when rendering diagram connections or establishing relationships between elements.
</div>

#### Example - configuring the toConnector

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 250}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 50}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "top",
        toConnector: "bottom",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### toX `Number`

The absolute point (X-coordinate), if any, that the connection is pointing to.


<div class="meta-api-description">
Specify, adjust, or retrieve the exact horizontal position of a connection's endpoint within a diagram or graphical interface by setting or reading its absolute X coordinate, enabling precise control over connection placement, endpoint movement, or dynamic updating of where links or connectors conclude along the X-axis in visual layouts or flowcharts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var connection = new kendo.dataviz.diagram.Connection({
        fromX: 50,
        fromY: 100,
        toX: 250,
        toY: 150,
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### toY `Number`

The absolute point (Y-coordinate), if any, that the connection is pointing to.


<div class="meta-api-description">
Set or retrieve the vertical position of a connection's endpoint by specifying an absolute Y coordinate in pixels within the diagram space, controlling the target point along the Y-axis for connections that may point directly to a coordinate instead of linking to a shape or default endpoint. Adjust, configure, or read the precise vertical placement of connection targets, enable manual vertical alignment of connectors, override default shape anchoring with custom Y-values, or control the endpoint’s pixel-based Y position for diagram connections and linking behavior.
</div>

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var connection = new kendo.dataviz.diagram.Connection({
        fromX: 75,
        fromY: 50,
        toX: 275,
        toY: 200,
        selectable: false
      });

      diagram.addConnection(connection);
    </script>

### type `String`

Specifies the connection type. The supported values are `"polyline"` and `"cascading"`.


<div class="meta-api-description">
Configure or set the routing style for links between nodes to control how connections are drawn and laid out in diagrams or graph visualizations. Adjust connection rendering by specifying the link path style, such as straight polylines or stepped cascading routes, enabling customization of edge layout, line routing, or connector appearance. Use options to switch between different connection flow patterns to optimize visual clarity, link direction, or diagram readability, influencing how edges curve, bend, or segment when connecting nodes. Control link path styling, connection shape, routing behavior, or edge layout when initializing or customizing graph structures and network diagrams.
</div>

#### Example - configuring the type

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 250}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 50}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "top",
        toConnector: "bottom",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


## Fields

### dataItem `Object`
The data item, if any, for the connection.


<div class="meta-api-description">
Retrieve or modify the underlying data model, metadata, or custom properties linked to a diagram connection instance, enabling synchronization with data sources, accessing unique identifiers, binding connection attributes, updating model details programmatically, or maintaining state for save and load processes within diagramming contexts.
</div>

#### Example - configuring the dataItem

    <button id="getConnInfo">Get 1st Connection Label</button>
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        dataSource: {
          data: [
            {id: 1, name:"One"},
            {id: 2, name:"Two"},
            {id: 3, name:"Four"},
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        connectionsDataSource:[
          {from: 1, to: 2, label: "plus one"},
          {from: 2, to: 3, label: "plus three"}
        ],
        layout: {
          type: "tree",
          subtype: "right"
        },
        shapeDefaults: {
          type: "circle",
          content: {
            template: "#= name #"
          },
          width: 70,
          height: 70,
          hover: {
            fill: "Orange"
          }
        },
        connectionDefaults: {
          stroke: {
            color: "#979797",
            width: 1
          },
          type: "polyline",
          startCap: "FilledCircle",
          endCap: "ArrowEnd",
          content:{
            template:"#= label#"
          }
        }
      });

      $("#getConnInfo").on("click", function(){
        var diagram = $("#diagram").getKendoDiagram();

        var dataItem = diagram.connections[0].dataItem;
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("First connection text: " + dataItem.label);
      });
    </script>


### from `kendo.dataviz.diagram.Shape`
The shape, if any, that the connection originates from.


<div class="meta-api-description">
Access or determine the starting shape or source node of a diagram connection, retrieve the initial endpoint object, get or set the origin shape for linking or reconnecting edges, check which shape a connection begins from, identify the source element in flowcharts or graphs, control or modify connection anchors by referencing their originating shapes, handle null or undefined states when no shape is attached, dynamically reassign connection sources, and inspect or update shape identifiers related to connection start points.
</div>

#### Example - configuring the from

    <button id="getShapeBtn">Get Source Shape</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getShapeBtn").on("click", function(){
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Source shape id: " + diagram.connections[0].from.id);
      });
    </script>


### sourceConnector `kendo.dataviz.diagram.Connector`
The connector, if any, that the connection originates from.


<div class="meta-api-description">
Identify, access, or configure the starting point of a connection by referencing or retrieving the origin connector linked to the connection within a diagram or flowchart, enabling developers to determine which connector initiates the link, inspect connection sources, update or modify origin connectors, trace connection paths back to their source element, and manage relationships between nodes and connectors programmatically.
</div>

#### Example - configuring the sourceConnector

    <button id="getConnectorBtn">Get Source Connector</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getConnectorBtn").on("click", function(){
        var connector = diagram.connections[0].sourceConnector;
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Source connector name: " + connector.options.name);
      });
    </script>


### targetConnector `kendo.dataviz.diagram.Connector`
The connector, if any, that the connection points to.


<div class="meta-api-description">
Accessing or modifying the connector endpoint where a connection terminates on a diagram, including retrieving the linked connector node, its identifier, or replacing the connection target to control diagram link endpoints, anchor points, or manage how connections attach and update dynamically in graphical interfaces, flowcharts, or visual editors.
</div>

#### Example - configuring the targetConnector

    <button id="getConnectorBtn">Get Target Connector</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getConnectorBtn").on("click", function(){
        var connector = diagram.connections[0].targetConnector;
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Target connector name: " + connector.options.name);
      });
    </script>


### to `kendo.dataviz.diagram.Shape`
The shape, if any, that the connection points to.


<div class="meta-api-description">
Accessing or modifying the target shape that a connection points to within a diagram or graph structure, including retrieving the current connected shape, checking if a connection endpoint is assigned or empty, reassigning connections to new shapes, updating or changing anchor points to alter linkage, inspecting connected nodes or elements, controlling references to target objects, dynamically reconnecting lines or edges, managing endpoint targets for connections, and handling cases where connections have no assigned target shape or need to be reset.
</div>

#### Example - configuring the to

    <button id="getShapeBtn">Get Target Shape</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getShapeBtn").on("click", function(){
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Target shape id: " + diagram.connections[0].to.id);
      });
    </script>


## Methods

### source

Gets or sets the current source of the connection.

This object can be a Point for a floating endpoint (i.e. not attached to a shape), a Shape or a Connector of a Shape. You can use the Shape.getConnector() method to fetch a Connector on the basis of its name. If a Shape is specified the Connection will attach to the "Auto" connector.


<div class="meta-api-description">
Control or query the origin endpoint of a connection by setting or retrieving its source, enabling dynamic attachment or detachment of endpoints in code; this source can be defined as a floating point, a graphical shape, or a specific connector within a shape, with options to identify connectors by name or default to automatic connector selection on shapes, supporting programmatic management of link origins in diagrams, flowcharts, or graphical interfaces.
</div>

#### Parameters

##### source `kendo.dataviz.diagram.Shape|kendo.dataviz.diagram.Point|kendo.dataviz.diagram.Connector`

* Point: any Point on the canvas. This creates an unattached floating endpoint.
* Shape: will bind the endpoint to the"Auto" Connector which will switch between the other connectors to minimize the length of the connection.
* Connector: the connection's endpoint will remain fixed attached to the specified Connector.

If no source is specified the method will return the current object to which the Connection's endpoint is attached.

#### Returns

`Object` the connection source.


The following example shows how to change the source shape of a connection:

#### Example - configuring the source

    <button id="changeSourceBtn">Change Connection Source</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));
      var shape3 = diagram.addShape( new Shape({ x: 300, y: 20 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#changeSourceBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.source(shape3);
      });
    </script>


### sourcePoint

Gets the global coordinate of the connection's start (initial endpoint).
The method returns a Point independently of the object to which the source is attached.


<div class="meta-api-description">
Retrieve or calculate the exact global starting position, origin, or coordinates of a connection’s initial endpoint for tasks such as overlay placement, distance measurement, hit detection, or spatial analysis, enabling developers to access absolute or world-space points of where connections begin irrespective of the attached source object’s local coordinates or transformations, useful for positioning visual elements, determining connection start locations, or integrating with layout and interaction logic.
</div>

#### Returns

`kendo.dataviz.diagram.Point` the coordinates of the connection source.


#### Example - configuring the sourcePoint

    <button id="getSourceBtn">Get Connection Source Point</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getSourceBtn").on("click", function(){
        var connection = diagram.connections[0];
        var point = connection.sourcePoint();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Connection source point: x = " + point.x + "; y = " + point.y);
      });
    </script>


### target

Gets or set the target of the Connection.

This object can be a Point for a floating endpoint (i.e. not attached to a shape), a Shape or a Connector of a Shape. You can use the Shape.getConnector() method to fetch a Connector on the basis of its name. If a Shape is specified the Connection will attach to the "Auto" connector.


<div class="meta-api-description">
Configure or retrieve the destination endpoint of a connection within a diagram by specifying whether the endpoint should attach to a floating coordinate point, directly link to a shape, or connect to a specific connector on a shape. Control how connections anchor by targeting standalone points not tied to any shape, entire shapes for automatic connection placement, or designated connectors identified by name on shapes to precisely manage link attachment. Enable setting or querying the connection’s endpoint to flexibly define linking behavior for shapes and connectors, including methods to select and assign connectors dynamically for diagram connections.
</div>

#### Parameters

##### target `kendo.dataviz.diagram.Shape|kendo.dataviz.diagram.Point|kendo.dataviz.diagram.Connector`

* Point: any Point on the canvas. This creates an unattached floating endpoint.
* Shape: will bind the endpoint to the"Auto" Connector which will switch between the other connectors to minimize the length of the connection.
* Connector: the connection's endpoint will remain fixed attached to the specified Connector.

If no source is specified the method will return the current object to which the Connection's endpoint is attached.

#### Example - configuring the target

    <button id="changeTargetBtn">Change Connection Target</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 120, y: 180 }));
      var shape2 = diagram.addShape( new Shape({ x: 120, y: 30 }));
      var shape3 = diagram.addShape( new Shape({ x: 120, y: 330 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#changeTargetBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.target(shape3.getConnector("right"));
      });
    </script>


#### Returns

`Object` the connection target.

### targetPoint

Similar to the sourcePoint, this gets the coordinates of the target of the Connection independently of its endpoint attachment.


<div class="meta-api-description">
Retrieve or calculate the precise target coordinates or position for a connection line or edge in a diagram or graph visualization, independent of any endpoint attachments, connectors, or alignment adjustments, enabling access to the raw or absolute target location point for tasks like positioning, layout, hit testing, or custom rendering logic on target endpoints, regardless of how the connection endpoint is visually attached or styled.
</div>

#### Returns

`kendo.dataviz.diagram.Point` the coordinates of the connection target.

#### Example - configuring the targetPoint

    <button id="getTargetBtn">Get Connection Target Point</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getTargetBtn").on("click", function(){
        var connection = diagram.connections[0];
        var point = connection.targetPoint();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Connection target point: x = " + point.x + "; y = " + point.y);
      });
    </script>


### select

Select or deselects the Connection.


<div class="meta-api-description">
Control or update the selected state of a link or edge within a diagram by programmatically toggling its selection status, enabling you to highlight, activate, or deselect connections through code. Manage connection highlighting, adjust which connections are marked as chosen or unchosen, synchronize selection with user interactions, implement custom logic to select or deselect edges, and dynamically update visual focus on connectors inside diagrams by setting or clearing their selection state.
</div>

#### Parameters

##### value `Boolean` *(default: true)*

True to select the Connection and `false` to deselect it.

#### Example - configuring the select

    <button id="selectBtn">Select Connection</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 100 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "cascading",
        selection: {
          handles: {
            width: 8,
            height: 8,
            fill: {
              color: "green"
            }
          }
        },
        editable: false
      });

      diagram.addConnection(connection);

      $("#selectBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.select(true);
      });
    </script>


### type

Gets or sets the (sub-) type of the Connection which defines the way it routes.

The routing of a connection is the way that intermediate points of a Connection defines a route. A route is usually defined on the basis of constraints or behaviors. Currently the framework defines a default polyline route (which simply connects the given intermediate points) and a simple rectangular (aka cascading) route. The cascading type is useful when using tree layout and hierarchies; the routed Connection will in this case enhance the representation of the hierarchy and thus reproduce a classic organization diagram.


<div class="meta-api-description">
Control or configure the way connections route between nodes or points in diagram or graph layouts by setting connection path styles, such as direct multi-segment polylines or rectangular cascading routes that follow hierarchical or tree-like structures; define connection routing behavior to optimize edge display with intermediate points, manage visual hierarchy with orthogonal or grid-like bends, customize connection path shaping for organization charts, flowcharts, or network diagrams, enable clear routing that respects constraints and layout patterns, switch between flexible polyline routes and fixed rectangular cascades to enhance readability and structure representation, and adapt connection styling for complex diagram relationships with control over line routing methods and visual connection types.
</div>

#### Parameters

##### value `String` *(default: "Polyline")*

* "polyline" - connects the defined intermediate points. See the points() method.
* "cascading" - discards given points and defines a cascading path between the endpoints.

#### Example - configuring the type

    <button id="changeTypeBtn">Change Connection Type</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        selectable: false
      });

      diagram.addConnection(connection);

      $("#changeTypeBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.type("cascading");
      });
    </script>


### points

Gets the intermediate points of the connection.


<div class="meta-api-description">
Retrieve the set of intermediate coordinates or waypoints along a connection's path, enabling access to all points that form the polyline route between start and end nodes; this supports inspecting, iterating over, modifying, or recalculating positions for custom rendering, dynamic repositioning, path updates, routing adjustments, or coordinate computations within connection lines or graph edges.
</div>

#### Example - configuring the points

    <button id="getPointsBtn">Get Connection Points</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 20, y: 180 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "polyline",
        points: [
          { x: 150, y: 100 },
          { x: 175, y: 150 },
          { x: 200, y: 100 }
        ],
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getPointsBtn").on("click", function(){
        var connection = diagram.connections[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(connection.points());
      });
    </script>


#### Returns

`Array` the intermediate points of the connection.

### allPoints

Gets all points of the Connection.
This is the union of the endpoints and the intermediate points.


<div class="meta-api-description">
Retrieve the full set of coordinates that make up a connection’s path, including start and end points plus any intermediate vertices, to access or manipulate the complete route for purposes such as hit-testing, serialization, editing, or redrawing; this method enables you to get all point data defining the shape and geometry of connections within diagramming or graph layouts, supporting tasks like coordinate extraction, connection path analysis, multi-point control, and dynamic updates to connection lines.
</div>

#### Returns

`Array` all points of the connection.

#### Example - using allPoints

    <button id="getPointsBtn">Get Connection Points</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 20, y: 180 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "polyline",
        points: [
          { x: 150, y: 100 },
          { x: 175, y: 150 },
          { x: 200, y: 100 }
        ],
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getPointsBtn").on("click", function(){
        var connection = diagram.connections[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(connection.points());
      });
    </script>


### redraw

Redraws the Connection with the given options.


<div class="meta-api-description">
Refresh or force update of a specific connection’s visual layout, styling, or routing without resetting the entire diagram, enabling targeted redraws with customizable options for geometry adjustments, style overrides, path recalculations, or other connection-specific rendering changes; useful for applying visual updates after modifying connection data programmatically, controlling incremental rendering, or dynamically updating appearance and structure of individual connections while keeping overall diagram state intact.
</div>

#### Parameters

##### options `Object` *optional*
The new options for the connection. This object should follow the configuration structure.

#### Example - using redraw

    <button id="redrawBtn">Redraw Connection</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 20, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 100 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        selectable: false
      });

      diagram.addConnection(connection);

      $("#redrawBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.redraw({
          stroke: {
            color: "orange",
            width: 3
          },
          content: {
            text: "Step 1"
          }
        });
      });
    </script>


### visible

Gets or sets the connection visible state.


<div class="meta-api-description">
Control or query the display status of a diagram connection by checking if it is shown or hidden, toggling visibility to reveal or conceal links, adjusting connection appearance in charts or graphs, enabling or disabling display of relationship lines, retrieving current visibility states, setting connections to be visible or invisible, managing whether connections appear in visual layouts, configuring graphical line presence, and updating the on-screen visibility to hide or show edges between nodes in diagrams or flowcharts.
</div>

#### Parameters

##### visible `Boolean` *optional*
Indicates whether the connection should be visible in the Diagram. If skipped, the method will return the current visible state of the connection.

#### Example - using visible

    <button id="hideBtn">Hide Connection</button>
    <div id="diagram"></div>
    <script>
      $("#hideBtn").on("click", function(e){
        var diagram = $("#diagram").getKendoDiagram();
        var connection = diagram.connections[0];
        connection.visible(false);
      });
      $("#diagram").kendoDiagram({
        shapes:[
          {
            id:"1",
            content:{
              text: "State 1"
            },
            x: 20,
            y: 20
          },
          {
            id:"2",
            content: {
              text: "State 2"
            },
            x: 160,
            y: 20
          }
        ],
        connections:[
          {
            from: "1",
            to: "2"
          }
        ]
      });
    </script>
