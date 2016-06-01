---
title: Render External Content in Shapes
page_title: Render External Content in Shapes | Kendo UI Diagram
description: "Learn how to render HTML content in Kendo UI Diagram shapes."
slug: howto_renderexternalcontent_inshapes_diagram
---

# Render External Content in Shapes

The Kendo UI Diagram is rendered by using the [Drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/overview). The shape visual templates allow you to override the rendering entirely, as illustrated in the [Basic Usage](http://demos.telerik.com/kendo-ui/diagram/index) demo.

In addition to manually drawing the shapes, you are able to use the [HTML Drawing](/framework/drawing/drawing-dom) feature to convert existing document content into static drawings.

###### Example

```html
    <style>
      .container {
        /* Move rendering container off-screen */
        position: absolute;
        left: -4000px;

        /* Set dimensions */
        width: 100px;
        height: 100px;
      }

      .shape {
        width: 100px;
        border: 2px solid red;
        text-align: center;
        padding-bottom: 10px;
      }

      .title {
        font-size: 20px;
        margin: 5px 0 20px 0;
      }
    </style>

    <script id="template" type="text/x-kendo-template">
      <div class="shape">
        <div class='title'>#= title #</div>
        Foo Bar
      </div>
    </script>

    <div id="diagram"></div>
    <script>
      // Import the Drawing API namespaces
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      // Compile the shape template
      var contentTemplate = kendo.template($("#template").html());

      function visualTemplate(options) {
        // Render template and bind it to the current data item
        var dataItem = options.dataItem;
        var renderElement = $("<div />").appendTo("body");
        renderElement.html(contentTemplate(dataItem));

        // Create a new group that will hold the rendered content
        var output = new kendo.drawing.Group();
        draw.drawDOM(renderElement)
        .then(function(group) {
          output.append(group);

          /* Clean-up */
          renderElement.remove();
        });

        var visual = new kendo.dataviz.diagram.Group();
        visual.drawingElement.append(output);

        return visual;
      }

      var data = [{
        title: "Foo",
        items: [{
          title: "Bar"
        }]
      }];

      $("#diagram").kendoDiagram({
        dataSource: {
          data: data,
          schema: {
            model: {
              children: "items"
            }
          }
        },
        layout:{
          type: "tree",
          subtype: "right"
        },
        shapeDefaults: {
          visual: visualTemplate
        }
      });
    </script>
```

## See Also

Other articles on Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Change Shape Visual Elements Dynamically]({% slug howto_changeshapevisualelements_dynamically_diagram %})
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
