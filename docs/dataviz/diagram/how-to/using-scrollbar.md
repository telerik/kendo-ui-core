---
title: Using Diagram scrollbar
page_title: Using Diagram scrollbar
description: Using Diagram scrollbar
---

# Using scrollbar for the diagram element

This example demonstrates how scrollbar for the Diagram element.

#### Example

```html

    <div style="overflow:auto; width: 1000px; height: 300px;">
      <div id="diagram"></div>
    </div>

    <script>
      $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
          data: diagramNodes()
        }),
        layout: {
          type: "tree",
          horizontalSeparation: 30,
          verticalSeparation: 20
        },
        shapeDefaults: {
          width: 40,
          height: 40
        },
        editable: false,
        pannable: false,
        zoomRate: 0,
        dataBound: function () {
          var bbox = this.boundingBox();
          this.wrapper.width(bbox.width + bbox.x + 50);
          this.wrapper.height(bbox.height + bbox.y + 50);
          this.resize();
        }
      });

      function diagramNodes() {
        var root = { name: "0", items: [] };
        addNodes(root, [3, 3, 3, 3]);
        return [root];
      }

      function addNodes(root, levels) {
        if (levels.length > 0) {
          for (var i = 0; i < levels[0]; i++) {
            var node = { name: "0", items: [] };
            root.items.push(node);

            addNodes(node, levels.slice(1));
          }
        }
      }
    </script>

```
