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