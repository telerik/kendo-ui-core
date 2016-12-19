---
title: Persist Shape Properties
page_title: Persist Shape Properties | Kendo UI Diagram
description: "Learn how to persist Shape properties in the Kendo UI Diagram widget."
slug: howto_persistshapeproperties_diagram
---

# Persist Shape Properties

In real-live applications, you can easily store the position and other properties of the Diagram in the data source you use by applying the `DataSource` methods that correspond to your project.

By using the same approach, you can persist the data source of the connections, the additional shape properties that are used in the custom visual, and others.

The example below demonstrates how to use the session storage of the browser to persist the `Shape` properties of the Diagram, so that when the user reloads the page, the position and other properties of the widget are stored.

###### Example

```html

<div id="diagram"></div>
  <script>
    var originalData = [{ "Id": 1, "JobTitle": "President", "Color": "", "x": 50, "y": 100 }, { "Id": 2, "JobTitle": "VP Finance", "Color": "#3399cc", "x": 200, "y": 200 }, { "Id": 3, "JobTitle": "VP Customer Relations", "Color": "#3399cc", "x": 300, "y": 300 }, { "Id": 4, "JobTitle": "VP Human Resources", "Color": "#3399cc", "x": 400, "y": 400 }];

    $(function () {
        $(document).ready(function () {
            createDiagram();
        });

        function createDiagram() {
          	var dataShapes = JSON.parse(sessionStorage.getItem("shapes"));

          	if(!dataShapes || dataShapes.length == 0){
          		sessionStorage.setItem("shapes", JSON.stringify(originalData));
              dataShapes = originalData;
            }else{
              dataShapes = JSON.parse(sessionStorage.getItem("shapes"));
            }


            var dataConnections = [{ "Id": 1, "FromShapeId": 1, "ToShapeId": 2, "Text": null }, { "Id": 2, "FromShapeId": 1, "ToShapeId": 3, "Text": null }, { "Id": 3, "FromShapeId": 1, "ToShapeId": 4, "Text": null }];

          $("#diagram").kendoDiagram({
                dataSource: ({
                    data: dataShapes,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "Id", type: "number", editable: false },
                                JobTitle: { type: "string" },
                                Color: { type: "string" }
                            }
                        }
                    },
                    change: function(ev){
                      var newData = [];
                      var dataSourceData = ev.sender.view().toJSON();

                    	for (i = 0; i < dataSourceData.length; i++){

                        var item = dataSourceData[i];
                      	newData.push({
                        	"Id": item.id,
                          "JobTitle": item.JobTitle,
                          "Color": item.Color,
                          "x": item.x,
                          "y": item.y
                        });
                      }
                      sessionStorage.setItem("shapes", JSON.stringify(newData));
                      console.log("saved");
                    }
                }),
                connectionsDataSource: ({
                    data: dataConnections,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "Id", type: "number", editable: false },
                                from: { from: "FromShapeId", type: "number" },
                                to: { from: "ToShapeId", type: "number" },
                                fromX: { from: "FromPointX", type: "number" },
                                fromY: { from: "FromPointY", type: "number" },
                                toX: { from: "ToPointX", type: "number" },
                                toY: { from: "ToPointY", type: "number" }
                            }
                        }
                    }
                }),
                layout: false,
              	editable:true,
                shapeDefaults: {
                    visual: visualTemplate,
                    content: {
                        template: "#= dataItem.JobTitle #",
                        fontSize: 17
                    }
                },
                connectionDefaults: {
                    stroke: {
                        color: "#979797",
                        width: 2
                    }
                }
            });
            var diagram = $("#diagram").getKendoDiagram();

            diagram.bringIntoView(diagram.shapes);
        }

        function visualTemplate(options) {
            var dataviz = kendo.dataviz;
            var g = new dataviz.diagram.Group();
            var dataItem = options.dataItem;
            if (dataItem.JobTitle === "President") {
                g.append(new dataviz.diagram.Circle({
                    radius: 60,
                    stroke: {
                        width: 2,
                        color: dataItem.Color || "#586477"
                    },
                    fill: "#e8eff7"
                }));
            } else {
                g.append(new dataviz.diagram.Rectangle({
                    width: 240,
                    height: 67,
                    stroke: {
                        width: 0
                    },
                    fill: "#e8eff7"
                }));
                g.append(new dataviz.diagram.Rectangle({
                    width: 8,
                    height: 67,
                    fill: dataItem.Color,
                    stroke: {
                        width: 0
                    }
                }));
            }
            return g;
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
