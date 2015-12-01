---
title: Text wrapping
page_title: Text wrapping
description: Text wrapping
---

# Text wrapping

This example demonstrates how to use the [Layout](/api/javascript/dataviz/diagram/layout) element in order to arrange long text so that it fits in the shape.

#### Example

```html

    <div id="diagram"></div>

    <script>
      $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
          data: [{
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci."
          }]
        }),
        shapeDefaults: {
          visual: visualTemplate
        }
      });

      function visualTemplate(options) {
        var diagram = kendo.dataviz.diagram;
        var dataItem = options.dataItem;
        var group = new diagram.Group();

        group.append(new diagram.Rectangle({
          width: 300,
          height: 200,
          stroke: {
            width: 0
          },
          fill: "#e8eff7"
        }));

        group.append(new diagram.Rectangle({
          width: 8,
          height: 200,
          fill: "#3399cc",
          stroke: {
            width: 0
          }
        }));

        var layout = new diagram.Layout(new diagram.Rect(15, 0, 280, 200), {
          alignContent: "center",
          spacing: 4
        });

        group.append(layout);

        var texts = dataItem.text.split(" ");
        for (var i = 0; i < texts.length; i++) {
          layout.append(new diagram.TextBlock({
            text: texts[i]
          }));
        }
        layout.reflow();

        return group;
      }
    </script>

```
