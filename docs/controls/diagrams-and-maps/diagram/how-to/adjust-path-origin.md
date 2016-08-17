---
title: Adjust Path Origin
page_title: Adjust Path Origin | Kendo UI Diagram
description: "Learn how to adjust a path or the origin of an element when using a custom visual in the Kendo UI Diagram."
slug: howto_adjustpathorigin_diagram
---

# Adjust Path Origin

The example below demonstrates how to position any path at the origin.

###### Example

```html

    <div id="diagram"></div>

    <script>
      var diagram = $("#diagram").kendoDiagram({}).getKendoDiagram();

      diagram.addShape({
        visual: function() {
          var group = new kendo.dataviz.diagram.Group();
          var path = new kendo.dataviz.diagram.Path({
            data: "M100,100 L 200,200 100,300 z"
          });
          group.append(path);

          var bbox = group.drawingElement.bbox();

          if (bbox.origin.x !== 0 || bbox.origin.y !== 0) {
            group.position(-bbox.origin.x, -bbox.origin.y);
          }
          return group;
        }
      });
    </script>

```

## See Also

Other articles on the Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})

For more runnable examples on the Kendo UI Diagram, browse the [**How To** documentation folder]({% slug howto_changeshapevisualelements_dynamically_diagram %}).
