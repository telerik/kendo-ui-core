---
title: Overview
page_title: How to use Diagram JSP tag | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI Diagram for JSP.
---

# Diagram

The Diagram tag is a server-side wrapper for the [Kendo UI Diagram](/api/dataviz/diagram) widget.

## Getting Started

You can bind a Kendo Diagram for JSP via ajax binding(the diagram will make ajax requests when binding)

Here is how to configure the Kendo Diagram with ajax binding:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method to render the view:

        @RequestMapping(value = {"/", "index"}, method = RequestMethod.GET)
        public String index() {
            return "/dataviz/diagram/index";
        }

1.  Create a new action method which will return the data as JSON:

        @RequestMapping(value = "/read", method = RequestMethod.POST)
        public @ResponseBody List<DiagramNode> read() {
            return DiagramDataRepository.DiagramNodes();
        }

3.  In the view configure the diagram to use the action method created in the previous steps:

        <c:url value="/read" var="readUrl" />
        <kendo:diagram name="diagram">
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" type="POST"  contentType="application/json"/>
                 </kendo:dataSource-transport>
                 <kendo:dataSource-schema>
                     <kendo:dataSource-schema-hierarchical-model children="items" />
                 </kendo:dataSource-schema>
             </kendo:dataSource>
             <kendo:diagram-layout type="tree" subtype="down" horizontalSeparation="30" verticalSeparation="20" />
             <kendo:diagram-shapeDefaults width="40" height="40" />
        </kendo:diagram>

## Accessing an Existing Diagram

You can reference an existing diagram instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/diagram#methods) to control its behavior.

### Accessing an existing Diagram instance

        // Put this after your Kendo Diagram tag
        <script>
            $(function() {
                // Notice that the Name() of the diagram is used to get its client-side instance
                var diagram = $("#diagram").data("kendoDiagram");
                diagram.layout()
            });
        </script>

## Handling Kendo UI Diagram events

You can subscribe to all [events](/api/dataviz/diagram#events) exposed by Kendo UI Diagram:

### Subscribe by handler name

        <%= Html.Kendo().Diagram()
                .Name("diagram")
                .DataSource(dataSource => dataSource
                    .Read(read => read
                        .Action("_OrgChart", "Diagram") // Specify the action method and controller name
                    )
                    .Model(m => m.Children("Items"))
                )
                .Layout(l => l.Type(DiagramLayoutType.Layered))
                .Events(e => e
                    .Click("diagram_click")
                )
        %>

        <script>
            function diagram_click() {
                // Handle the click event
            }
        </script>

