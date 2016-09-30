---
title: Show Context Menu Over Shapes
page_title: Show Context Menu Over Shapes | Kendo UI Diagram
description: "Learn how to show a context menu over Kendo UI Diagram shapes."
slug: howto_show_context_menu_over_shapes
---

# Show Context Menu Over Shapes

The example below demonstrates how to show a Kendo UI ContextMenu when pressing the right button of the mouse over diagram shapes. The main points are as follows:

* Initialize a [kendo context]({% slug overview_kendoui_contextmenu_widget %}) menu with target the diagram's id and filter by g element.
* Handle the [open event](/api/javascript/ui/contextmenu#events-open) of the context menu. You can cancel the event if the target is a connection and store dataItem in a variable if the target is a shape.
* Handle the [select event](/api/javascript/ui/contextmenu#events-select) of the context menu where you can perform a custom action based on the shape's context.


###### Example

```html

<ul id="menu">
<li>
    Reply
    <ul>
    <li> Reply to Sender</li>
    <li>Reply to All</li>
    </ul>
</li>
<li class="k-separator"></li>
<li>Forward</li>
</ul>
<div id="diagram"></div>

<script>
    var data = [{
            firsLastName : "Antonio Moreno",
            title : "Team Lead",
            colorScheme : "#1696d3",
            items : [{
                    firsLastName : "Elizabeth Brown",
                    title : "Design Lead",
                    colorScheme : "#ef6944"
                }, {
                    firsLastName : "Felipe Izquiedro",
                    title : "Senior Developer",
                    colorScheme : "#75be16"
                }
            ]
        }
    ];

    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
                width : 210,
                height : 75,
                stroke : {
                    width : 0
                },
                fill : {
                    gradient : {
                        type : "linear",
                        stops : [{
                                color : dataItem.colorScheme,
                                offset : 0,
                                opacity : 0.5
                            }, {
                                color : dataItem.colorScheme,
                                offset : 1,
                                opacity : 1
                            }
                        ]
                    }
                }
            }));

        g.append(new dataviz.diagram.TextBlock({
                text : dataItem.firsLastName,
                x : 55,
                y : 20,
                fill : "#fff"
            }));

        g.append(new dataviz.diagram.TextBlock({
                text : dataItem.title,
                x : 55,
                y : 40,
                fill : "#fff"
            }));
        return g;
    }

    function createDiagram() {
        $("#diagram").kendoDiagram({
            dataSource : new kendo.data.HierarchicalDataSource({
                data : data,
                schema : {
                    model : {
                        children : "items"
                    }
                }
            }),
            layout : {
                type : "layered"
            },
            shapeDefaults : {
                visual : visualTemplate
            },
            connectionDefaults : {
                stroke : {
                    color : "#979797",
                    width : 2
                }
            }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);

        var contextDataItem;

        $("#menu").kendoContextMenu({
            target : "#diagram",
            filter : "g",
            open : function (e) {
                if (e.event) {
                    try {
                        var shapes = diagram.shapes;
                        var connections = diagram.connections;

                        var point = diagram.documentToModel(new kendo.dataviz.diagram.Point(e.event.pageX, e.event.pageY));

                        //Cancel the menu opening when the target is a connection
                        for (var i = connections.length - 1; i >= 0; i--) {
                            if (connections[i].bounds().contains(point)) {
                                e.preventDefault();
                            }
                        }
                        //Find the target shape
                        for (var i = shapes.length - 1; i >= 0; i--) {
                            if (shapes[i].bounds().contains(point)) {
                                contextDataItem = shapes[i].dataItem;
                                break;
                            }
                        }
                    } catch (e) {
                        alert(e);
                    }
                }
            },
            select : function (e) {
                var itemText = $(e.item).text();
                alert(kendo.format("{0}: {1}", itemText, contextDataItem.firsLastName));
            }
        });
    }

    $(document).ready(createDiagram);
</script>

```

## See Also

Other articles on the Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})

For more runnable examples on the Kendo UI Diagram, browse the [**How To** documentation folder]({% slug howto_changeshapevisualelements_dynamically_diagram %}).
