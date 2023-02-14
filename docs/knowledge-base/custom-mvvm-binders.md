---
title: Use Custom MVVM Binders for Diagram Shapes and Connections
page_title: Use Custom MVVM Binders for the Shapes and Connections of the Diagram
description: "Learn how to use custom MVVM binders for shapes and connections in the Kendo UI Diagram in an MVVM scenario."
slug: howto_custommvvmbidinders_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/custom-mvvm-binders
tags: kendo, jquery, diagram, use, custom, mvvm, binders, for, shapes, and, connections
component: diagram
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Diagram for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use custom MVVM binders for the shapes and connection of the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to create [custom MVVM binders]({%slug custombinding_mvvm_kendoui%}) for the shapes and connections.

By using this approach, you can:
* Have more control over the bound data.
* Use recursive logic over the data.
* Update shapes and connections data separately.

```dojo
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
            <span class="k-input k-textbox k-input-solid k-input-md k-rounded-md">
              <input type="text" class="k-input-inner" data-bind="value: shapeText,
                                                            events: {
                                                              change: onShapeTextChange
                                                            }"/>
            </span>
            <div id="diagram" data-role="diagram"
                 data-layout='{"type": "tree", "subtype": "right"}'
                 data-shape-defaults='{"type": "circle","content":{"template": "#= name #"}, "width": "70", "height":"70", "hover":{"fill": "Orange"}}'
                 data-connection-defaults='{"stroke":{"color":"#979797","width":1},"type":"polyline","startCap":"FilledCircle","endCap":"ArrowEnd","content":{"template":"#= label#"}}'
                 data-bind="diagramShapes: shapesSource,
                            diagramConnections: connectionsSource"  
                 style="height: 250px;" ></div>
          <span class="k-input k-textbox k-input-solid k-input-md k-rounded-md">
            <input type="text" class="k-input-inner" data-bind="value: getShapes" style="width:100%;"/>
          </span>
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

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
