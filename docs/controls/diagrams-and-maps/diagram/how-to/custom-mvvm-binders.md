---
title: Use Custom MVVM Binders for Shapes and Connections
page_title: Use Custom MVVM Binders for Shapes and Connections | Kendo UI Diagram
description: "Learn how to use custom MVVM binders for shapes and connections in Kendo UI Diagram, in MVVM scenario."
slug: howto_custommvvmbidinders_diagram
---

# Use Custom MVVM Binders for Shapes and Connections

The example below demonstrates how to create [custom MVVM binders]({%slug custombinding_mvvm_kendoui%}) for the shapes and connections DataSources. 

The benefits of that are:

* more control over the data bound;
* using recursive logic over the data;
* update shapes and connections data separately.

###### Example

```html
<div id="example">
    <div class="demo-section k-content">
        <div>
            Change name of:
            <input data-role="dropdownlist" 
                   data-text-field="name"
                   data-value-field="id"
                   data-bind="source: shapesSource,
                              value: shapeId" />
            to:
            <input type="text" class="k-textbox" data-bind="value: shapeText,
                                                            events: {
                                                              change: onShapeTextChange
                                                            }"/>
            <div id="diagram" data-role="diagram"
                 data-layout='{"type": "tree", "subtype": "right"}'
                 data-shape-defaults='{"type": "circle","content":{"template": "#= name #"}, "width": "70", "height":"70", "hover":{"fill": "Orange"}}'
                 data-connection-defaults='{"stroke":{"color":"#979797","width":1},"type":"polyline","startCap":"FilledCircle","endCap":"ArrowEnd","content":{"template":"#= label#"}}'
                 data-bind="diagramShapes: shapesSource,
                            diagramConnections: connectionsSource"  
                 style="height: 250px;" ></div>
          <input type="text" class="k-textbox" data-bind="value: getShapes" style="width:100%;"/>
        </div>
    </div>
  
    <script>
        kendo.data.binders.widget.diagramShapes = kendo.data.Binder.extend({
          init: function(widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
          },
          refresh: function() {
            var that = this,
                value = that.bindings["diagramShapes"].get(); //get the value from the View-Model
            $(that.element).data("kendoDiagram").setDataSource(value.toJSON()); //update the widget
          }
        });

       kendo.data.binders.widget.diagramConnections = kendo.data.Binder.extend({
          init: function(widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
          },
          refresh: function() {
            var that = this,
                value = that.bindings["diagramConnections"].get(); //get the value from the View-Model
            $(that.element).data("kendoDiagram").setConnectionsDataSource(value.toJSON()); //update the widget
          }
        });

        function createDigaram() {
            var viewModel = kendo.observable({
                shapesSource: [
                                  {id:"one", name:"One"},
                                  {id:"two", name:"Two"},
                                  {id:"five", name:"Five"},
                              ],
              
                connectionsSource:[
                                    {from:"one", to:"two", label: "plus one"},
                                    {from:"one", to:"five", label: "plus three"}
                                  ],
              	getShapes:function (){return JSON.stringify(this.get("shapesSource"))},
              	shapeId: "",
              	shapeText: "",
              	onShapeTextChange: function(ev){
                	var id = this.get("shapeId");
                  var text = this.get("shapeText");
                  var shapes = this.get("shapesSource");
                  var shape = shapes.find(function(shape){
                  	return shape.id === id;
                  });
                  var idx = shapes.indexOf(shape);
                  shapes.splice(idx, 1, {id: id, name: text});
                }
            });

            kendo.bind($("#example"), viewModel);
        }

        $(document).ready(createDigaram);
    </script>
</div>
```

## See Also

Other articles on the Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})

For more runnable examples on the Kendo UI Diagram, browse the [**How To** documentation folder]({% slug howto_changeshapevisualelements_dynamically_diagram %}).
