---
title: TextBlock
previous_url: /api/javascript/dataviz/diagram/text-block, /api/javascript/dataviz/diagram/text-block
res_type: api
---

# kendo.dataviz.diagram.TextBlock

A non-wrapping text element with optional background.

## Configuration

### color `String`

The text color of the text block.


<div class="meta-api-description">
Specify or customize the text color, font color, or foreground color of labels, captions, annotations, or any textual content within diagram text blocks by setting color properties, styling text appearance with CSS color values such as named colors, hexadecimal codes, RGB, or RGBA formats, and controlling how text elements are visually rendered or highlighted in diagrams.
</div>

#### Example - setting a color to the text

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#336699" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 25,
          y: 20,
          color: "#fff"
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          visual: getVisual
        }]
      });
    </script>

### fontFamily `String`

The font family of the text block.


<div class="meta-api-description">
Customize the text appearance by specifying the typeface or font stack to control how text is rendered, including setting custom fonts, fallback options, web fonts, or standard CSS font families to adjust typography, choose specific fonts for readability or branding, and manage font rendering in text display components.
</div>

#### Example - setting a font family to the text

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 15,
          y: 20,
          fontFamily: "Verdana"
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### fontSize `Number`

The font size of the text block.


<div class="meta-api-description">
Adjust or configure the size of text characters, control text scale, set font dimensions, modify typography size for readability, increase or decrease text legibility and spacing, enable resizing of text within a block, customize font height for layout design, control how large or small text appears, fine-tune text presentation through scalable font settings, and manage visual text proportions in user interfaces.
</div>

#### Example - setting font size to the text

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 15,
          y: 20,
          fontSize: 16
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### fontStyle `String`

The font style of the text block.


<div class="meta-api-description">
Control and customize text appearance by adjusting font styling options such as normal, italic, or oblique to change text slant, emphasize content, enable styling variations, configure text formatting, set emphasis styles, apply slanted or tilted fonts, manage text aesthetics, toggle between standard and cursive-like font presentations, and fine-tune how text is rendered or displayed within drawing or UI components.
</div>

#### Example - setting font style to the text

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 15,
          y: 20,
          fontStyle: "italic"
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### fontWeight `String`

The font weight of the text block.


<div class="meta-api-description">
Control and adjust the thickness or intensity of text rendering by specifying font weight options like bold, normal, or light, enabling customization of text appearance in user interfaces. Configure, set, or modify the weight or stroke of fonts to emphasize or de-emphasize text, manage font boldness, or style text elements with heavier or lighter strokes for readability, design consistency, or accessibility within text components or blocks. Enable boldface, lightface, or regular weight styles to highlight, differentiate, or harmonize textual content across applications or layouts, supporting dynamic styling based on user preference or context.
</div>

#### Example - setting font weight to the text

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 18,
          y: 20,
          fontWeight: "bold"
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### height `Number`

The height of the text block.


<div class="meta-api-description">
Adjust vertical dimensions, set or configure the text container height, control text block sizing for layout and rendering in drawing components, influence text wrapping behavior, manage clipping boundaries, customize vertical alignment space, define vertical limits for multiline or single-line text elements, optimize reserved vertical space for text display, regulate height to prevent overflow or truncation, and tailor text area height within graphical or drawing contexts to fit various content lengths and design constraints.
</div>

#### Example - setting height to the text

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 15,
          y: 15,
          height: 30,
          width: 30
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### text `String`

The content of the text block.


<div class="meta-api-description">
Control, update, or retrieve the displayed text content or visible string within a UI text element, enabling dynamic changes, binding data sources, setting labels, customizing inline text, or replacing the shown characters in real time for user interfaces, text display areas, or content placeholders.
</div>

#### Example - setting the content of the text block

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 80,
          height: 80,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: "My Shape",
          x: 5,
          y: 30
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### width `Number`

The width of the text block.


<div class="meta-api-description">
Configure or set the horizontal dimension or size of a text container to control layout placement, text alignment, wrapping behavior, and how text fits within user interfaces or components. Adjust the width to influence text flow, enforce fixed or flexible dimensions, manage multiline wrapping, overwrite default sizing, or tailor display areas in UI design and layout arrangements. Control and customize the horizontal space used by text elements for responsive design, content formatting, or visual arrangement in various frameworks and development environments.
</div>

#### Example - setting width to the text block

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 15,
          y: 15,
          height: 30,
          width: 30
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### x `Number`

The X position of the top-left corner of the text block.


<div class="meta-api-description">
Control or configure the horizontal placement, position, or alignment of a text element’s left edge or top-left corner along the X-axis, enabling precise movement, offset, or layout adjustment of text blocks within a user interface or graphical surface. Adjust, set, or define the horizontal coordinate, left position, or X value to position text content exactly where needed across various layouts or designs.
</div>

#### Example - setting position to the text block

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 18,
          y: 20
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### y `Number`

The Y position of the top-left corner of the text block.


<div class="meta-api-description">
Adjust or configure the vertical placement, positioning, or alignment of a text element by setting its top-left corner’s Y coordinate within the layout or UI component, enabling control over where text appears vertically, shifting text blocks up or down, moving labels or captions vertically, and managing vertical text alignment or offset within container boundaries or coordinate spaces.
</div>

#### Example - setting position to the text block

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        g.append(new diagram.TextBlock({
          text: data.id,
          x: 18,
          y: 20
        }));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

## Fields

### drawingElement `kendo.drawing.Text`

The drawing element used to draw the text.


<div class="meta-api-description">
Control and customize the core graphical element responsible for rendering text within a drawing or visual component, enabling direct access to the underlying instance that manages text display. Configure, modify, or retrieve rendering properties, apply transformations such as scaling or rotation, and attach event handlers or custom logic to dynamically influence text appearance and behavior. This facilitates fine-grained manipulation of text rendering, interactions, graphical updates, and modifications at the element level inside drawing environments or visual UI components.
</div>

#### Example - accessing the text block drawing element

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        var text = new diagram.TextBlock({
          text: data.id,
          x: 18,
          y: 20
        });

        text.drawingElement.options.fill.color = "#ff7f50";
        g.append(text);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

## Methods

### content
Gets or sets the text block content.


<div class="meta-api-description">
Access or modify the text displayed in a drawing or UI element by retrieving the current string content or updating it dynamically; this feature lets you get the existing text value, change or overwrite the visible text, refresh or re-render the display with new strings, control and manipulate the textual content on the fly, set the text programmatically, enable live updates of text blocks, read current labels or captions, and handle text changes within graphical or drawing components.
</div>

#### Parameters

##### content `String`
The new text content.

#### Returns
`String` the current text content.

#### Example - setting the text block text dynamically

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        var text = new diagram.TextBlock({
          x: 18,
          y: 20
        });

        text.content("123");
        g.append(text);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### position
Get or sets the element position.


<div class="meta-api-description">
Retrieve or update the x and y coordinates of a text element on a canvas or diagram by accessing or setting its position, enabling precise control over placement and movement of text blocks within graphical layouts or UI components; supports getting current location data or assigning new coordinates to reposition, adjust alignment, or move text elements programmatically based on numeric values, coordinate objects, or point representations, facilitating dynamic layout adjustments, animations, or interaction-driven repositioning in visual interfaces.
</div>

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The origin of the element.

#### Example - setting the text block position dynamically

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        var text = new diagram.TextBlock({
          text: 123
        });

        g.append(text);

        text.position(new kendo.dataviz.diagram.Point(18, 20));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### rotate
Rotates the element with the specified parameters.


<div class="meta-api-description">
Change, set, or update the text orientation by programmatically applying rotation transforms to text elements, enabling dynamic control over angle adjustments for text display, including immediate rotation changes, animated rotations, transforming text layout direction, rotating text blocks in UI elements, modifying text alignment through rotation, configuring text angles for custom presentation, controlling text spin or tilt in user interfaces, applying rotation effects to text for design or interaction purposes, and integrating rotation transformations within animation sequences or runtime updates.
</div>

#### Parameters

##### angle `Number`
The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `kendo.dataviz.diagram.Point`
The center of rotation.

#### Example - rotating the text block

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        var text = new diagram.TextBlock({
          text: 123,
          x: 20
        });

        g.append(text);

        text.rotate(-45, new kendo.dataviz.diagram.Point(40, 40));

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>

### visible
Gets or sets the visibility of the current element.


<div class="meta-api-description">
Control or query the display state of elements within a diagram by toggling visibility on or off, retrieving whether items are currently shown or hidden, programmatically setting visibility flags, enabling or disabling render of text or graphic components, checking if elements are visible, or dynamically adjusting element display during runtime to manage what parts of the diagram are seen or concealed based on boolean states or conditional logic.
</div>

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.

#### Example - hiding the text block

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group();

        g.append(new diagram.Circle({
          width: 60,
          height: 60,
          fill: { color: "#add8e6" }
        }));

        var text = new diagram.TextBlock({
          text: "123",
          x: 18,
          y: 20
        });

        g.append(text);

        text.visible(false);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: 123,
          visual: getVisual
        }]
      });
    </script>