---
title: Zoom on Ctrl Keypress Only
page_title: Zoom on Crtl Keypress Only | Kendo UI Diagram
description: "Learn how to zoom the Kendo UI Diagram widget in and out by using the Ctrl key and the mouse wheel functionality."
slug: howto_ctrlmousewheeltozoom_diagram
---

# Zoom on Ctrl Keypress Only

The following example demonstrates how to set up the Diagram to allow zooming in and out only when the `Ctrl` key is pressed.

```dojo

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
        zoomStart: function(ev) {
          if (!ev.meta.ctrlKey) {
            ev.preventDefault(true);
          }
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

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
