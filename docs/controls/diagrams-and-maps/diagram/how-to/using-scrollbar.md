---
title: Use Scrollbars
page_title: Use Scrollbars | Kendo UI Diagram
description: "Learn how to use a scrollbar for a Kendo UI Diagram widget."
slug: howto_usescrollbar_diagram
---

# Use Scrollbars

The example below demonstrates how to use a scrollbar as a Kendo UI Diagram element.

###### Example

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

## See Also

Other articles on Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Change Shape Visual Elements Dynamically]({% slug howto_changeshapevisualelements_dynamically_diagram %})
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
