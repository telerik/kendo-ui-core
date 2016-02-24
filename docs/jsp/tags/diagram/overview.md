---
title: Overview
page_title: Overview | Diagram JSP Tag
description: "Get started with the Diagram JSP tag in Kendo UI."
slug: overview_diagram_uiforjsp
position: 1
---

# Diagram JSP Tag Overview

The Diagram tag is a server-side wrapper for the [Kendo UI Diagram](/api/javascript/dataviz/ui/diagram) widget.

## Getting Started

### The Basics

The Kendo UI Diagram for JSP can be bound via an Ajax binding&mdash;the Diagram would make Ajax requests when binding.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Diagram Ajax binding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"/", "index"}, method = RequestMethod.GET)
        public String index() {
            return "/dataviz/diagram/index";
        }

**Step 3** Create a new action method to return the data as JSON.

###### Example

        @RequestMapping(value = "/read", method = RequestMethod.POST)
        public @ResponseBody List<DiagramNode> read() {
            return DiagramDataRepository.DiagramNodes();
        }

**Step 4** In the view, configure the Diagram to use the action method created in the previous steps.

###### Example

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

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Diagram](/api/javascript/dataviz/ui/diagram#events) by the handler name.

###### Example

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
<!--_-->
## Reference

### Existing Instances

You are able to reference an existing Diagram instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Diagram API](/api/javascript/dataviz/ui/diagram#methods) to control its behavior.

###### Example

        // Put this after your Kendo Diagram tag
        <script>
            $(function() {
                // Notice that the Name() of the diagram is used to get its client-side instance
                var diagram = $("#diagram").data("kendoDiagram");
                diagram.layout()
            });
        </script>

## See Also

Other articles on Telerik UI for JSP and on the Diagram:

* [Overview of the Kendo UI Diagram Widget]({% slug overview_kendoui_diagram_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
