---
title: Overview
page_title: Diagram HtmlHelper extension | Kendo UI documentation
description: Configuration of Kendo UI Diagram widget for server binding in quick steps, add Diagram HtmlHelper extension, manipulate Kendo UI diagram events.
---

# Diagram

The Diagram HtmlHelper extension is a server-side wrapper for the [Kendo UI Diagram](/api/dataviz/diagram) widget.

## Getting Started

You can bind a Kendo Diagram for ASP.NET MVC via ajax binding(the diagram will make ajax requests when binding)

Here is how to configure the Kendo Diagram with ajax binding:

1.  Return the data as JSON:

        public ActionResult _OrgChart()
        {
            return Json(DiagramDataRepository.OrgChart(), JsonRequestBehavior.AllowGet);
        }

3.  In the view configure the diagram to use the action method created in the previous steps:
    - WebForms

            <%= Html.Kendo().Diagram()
                    .Name("diagram")
                    .DataSource(dataSource => dataSource
                        .Read(read => read
                            .Action("_OrgChart", "Diagram") // Specify the action method and controller name
                        )
                        .Model(m => m.Children("Items"))
                    )
                    .Layout(l => l.Type(DiagramLayoutType.Layered))
            %>

    - Razor

            @(Html.Kendo().Diagram()
                    .Name("diagram")
                    .DataSource(dataSource => dataSource
                        .Read(read => read
                            .Action("_OrgChart", "Diagram") // Specify the action method and controller name
                        )
                        .Model(m => m.Children("Items"))
                    )
                    .Layout(l => l.Type(DiagramLayoutType.Layered))
            )

## Access an Existing Diagram

You can reference an existing diagram instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/diagram#methods) to control its behavior.

### Access an Existing Diagram Instance

    // Put this after your Kendo Diagram for ASP.NET MVC declaration
    <script>
        $(function() {
            // Notice that the Name() of the diagram is used to get its client-side instance
            var diagram = $("#diagram").data("kendoDiagram");
        });
    </script>

## Handle Diagram Events

You can subscribe to all [events](/api/dataviz/diagram#events) exposed by Kendo UI Diagram:

### WebForms - Subscribe by Handler Name

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

### Razor - Subscribe by Handler Name

    @(Html.Kendo().Diagram()
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
    )

    <script>
        function diagram_click() {
            // Handle the click event
        }
    </script>

### Razor - Subscribe by Template Delegate

    @(Html.Kendo().Diagram()
          .Name("diagram")
          .Events(e => e
              .Click(@<text>
                   function() {
                       // Handle the click event inline
                   }
              </text>)
          )
    )
