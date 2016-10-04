---
title: Pan via Mouse Scrolling
page_title: Pan via Mouse Scrolling | Kendo UI Diagram
description: "Learn how to pan the Kendo UI Diagram via mouse scrolling."
slug: howto_pan_via_mouse_scrolling
---

# Pan via Mouse Scrolling

The example below demonstrates how to pan the Kendo UI Diagram when scrolling with the mouse.

To achieve this behavior, follow the main steps below:

1. Handle the Kendo UI Diagram's [`zoomStart` event](/api/javascript/dataviz/ui/diagram#events-zoomStart).
2. Get the delta from the arguments (i.e., e.meta.delta).
3. Pan the diagram with the new coordinates via the [`pan` method](/api/javascript/dataviz/ui/diagram#methods-pan).

###### Example

```html

<select id="panDirection">
  <option value="x">Pan Horizontally</option>
  <option value="y">Pan Vertically</option>
</select>
  
<div id="diagram"></div> 
  
<script>  
var Point = kendo.dataviz.diagram.Point;
  
$("#diagram").kendoDiagram({
   shapes:[ { id:"1", x: 100, y: 100 }, 
     		   	{ id:"2", x: 300, y: 100 } ],
   connections:[ { from: "1", to: "2" }
   ],
    zoomStart: function(e){
      var zoomDirection = $("#panDirection").val();
      var diagram = e.sender,
          panPoint = diagram.pan();
      panPoint[zoomDirection] = panPoint[zoomDirection] + e.meta.delta;
      diagram.pan(panPoint);
      e.preventDefault();
  },
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
