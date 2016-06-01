---
title: Drag and Drop on Shapes
page_title: Drag and Drop on Shapes | Kendo UI Diagram
description: "Learn how to find a particular element from the shape visual and dynamically change it in a Kendo UI Diagram."
slug: howto_draganddrop_onshapes_diagram
---

# Drag and Drop on Shapes

The example below demonstrates how to allow the dropping of new shapes only on existing ones in the Kendo UI Diagram.

###### Example

```html

    <script>
      $(function () {

        $("#splitter").kendoSplitter({
          panes: [
            { collapsible: true, size: "200px" },
            { collapsible: false, scrollable: false }
          ]
        });

        var diagram = $("#diagram").kendoDiagram({
          dataSource: {
            data: [{
              items: [{}, {}]
            }],
            schema: {
              model: {
                children: "items"
              }
            }
          },
          shapeDefaults: {
            width: 120,
            height: 120,
            fill: "#8ebc00"
          },
          layout: {
            type: "tree"
          }
        }).getKendoDiagram();


        $("#shapesPanelBar").kendoPanelBar({
          expandMode: "multiple"
        }).getKendoPanelBar();

        $("#shapesPanelBar").kendoDraggable({
          filter: ".shapeItem",
          hint: function (element) {
            return element.clone();
          }
        });

        $("#diagram").kendoDropTarget({
          drop: function (e) {
            if (e.draggable.hint) {                          
              var position = diagram.documentToModel({ x: e.pageX, y: e.pageY });
              var targetShape = shapeByPosition(position);
              if (targetShape) {
                var item = e.draggable.hint.data("shape");
                var newShape = diagram.addShape(item);
                diagram.connect(targetShape, newShape);
                diagram.layout(diagram.options.layout);
              }
            }
          }
        });

        function shapeByPosition(position) {
          var shapes = diagram.shapes;
          var shape;
          for (var idx = 0; idx < shapes.length; idx++) {
            shape = shapes[idx];
            if (shape.bounds().contains(position)) {
              return shape;
            }
          }
        }
      });
    </script>
    <div id="splitter">
      <div id="left-pane">
        <div class="pane-content">
          <ul id="shapesPanelBar">
            <li class="k-state-active">
              Basic Shapes
              <ul>
                <li>
                  <span class="shapeItem" data-shape='{"width":120,"height":120,"type":"rectangle"}' style="background-position: 0 0"></span>
                  <span>Square</span>
                </li><li>
                <span class="shapeItem" data-shape='{"type":"circle","width":120,"height":120}' style="background-position: -60px 0"></span>
                <span>Circle</span>
                </li><li>
                <span class="shapeItem" data-shape='{"width":120,"height":80,"type":"rectangle"}' style="background-position: -120px 0"></span>
                <span>Rectangle</span>
                </li><li>
                <span class="shapeItem" data-shape='{"type":"circle","width":120,"height":80}' style="background-position: -180px 0"></span>
                <span>Ellipse</span>
                </li>
              </ul>
            </li>
            <li class="k-state-active">
              Polygons
              <ul>
                <li>
                  <span class="shapeItem" data-shape='{"path":"M 60,0 L120,44 L97,114 L23,114 L0,44 z"}' style="background-position: -240px 0"></span>
                  <span>Pentagon</span>
                </li><li>
                <span class="shapeItem" data-shape='{"path":"m30,0 L90,0 L120,52 L90,104 L30,104 L0,52 z"}' style="background-position: -300px 0"></span>
                <span>Hexagon</span>
                </li><li>
                <span class="shapeItem" data-shape='{"path":"m60,0 L108.12,23.17 L120,75.24 L86.7,116.99 L33.3,116.99 L0,75.24 L11.88,23.17 z"}' style="background-position: -360px 0"></span>
                <span>Heptagon</span>
                </li><li>
                <span class="shapeItem" data-shape='{"path":"m35.15,0 L84.85,0 L120,35.15 L120,84.85 L84.85,120 L35.15,120 L0,84.85 L0,35.15 z"}' style="background-position: -420px 0"></span>
                <span>Octagon</span>
                </li>
              </ul>
            </li>
            <li class="k-state-active">
              Arrows
              <ul>
                <li>
                  <span class="shapeItem" data-shape='{"path":"m0,20 L20,0 L20,10 L120,10 L120,30 L20,30 L20,40 z"}' style="background-position: -480px 0"></span>
                  <span>45 degree</span>
                </li><li>
                <span class="shapeItem" data-shape='{"path":"m0,20 L11.5,0 L11.5,10 L120,10 L120,31 L11.5,31 L11.5,40 z"}' style="background-position: -540px 0"></span>
                <span>60 degree</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="pane-content">
          <div id="diagram"></div>
        </div>
      </div>
    </div>

    <style>
      html, body, #splitter
      {
        height: 100%;
      }
      #shapesPanelBar .k-panel .k-state-hover,
      #shapesPanelBar .k-panel .k-state-selected
      {
        color: inherit;
        background: #fff;
      }

      #shapesPanelBar .k-panel .k-item
      {
        display: inline-block;
        width: 50%;
      }


      .shapeItem
      {
        margin-top: 10px;
        display: inline-block;
        width: 60px;
        height: 60px;
        background-image: url("http://demos.telerik.com/kendo-ui/content/integration/diagram/images/diagram-toolbox.png");
        background-size: auto 100%;
      }

      #shapesPanelBar span
      {
        text-align: center;
        display: block;
      }
    </style>

```

## See Also

Other articles on Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Change Shape Visual Elements Dynamically]({% slug howto_changeshapevisualelements_dynamically_diagram %})
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
