---
title: Overview
page_title: Overview
description: "Get started with the server-side wrapper for the Telerik UI Diagram component for {{ site.framework }}."
previous_url: /helpers/diagrams-and-maps/diagram/overview
slug: htmlhelpers_diagram_aspnetcore
position: 0
---

# {{ site.framework }} Diagram Overview

{% if site.core %}
The Telerik UI Diagram TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Diagram widget.
{% else %}
The Telerik UI Diagram HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Diagram widget.
{% endif %}

The Diagram represents information in a schematic way and according to particular visualization techniques.

* [Demo page for the Diagram](https://demos.telerik.com/{{ site.platform }}/diagram)

## Basic Configuration

1. Return the data as JSON.

        public ActionResult _OrgChart()
        {
            return Json(DiagramDataRepository.OrgChart(), JsonRequestBehavior.AllowGet);
        }

1. In the view, configure the Diagram to use the action method that was created in the previous step.

    ```HtmlHelper
        @(Html.Kendo().Diagram()
            .Name("diagram")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("_OrgChart", "Diagram") // Specify the action method and controller names.
                )
                .Model(m => m.Children("Items"))
            )
            .Layout(l => l.Type(DiagramLayoutType.Layered))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-diagram name="diagram">
            <hierarchical-datasource server-operation="false">
                <transport>
                    <read url="@Url.Action("_OrgChart", "Diagram")" />
                </transport>
                <schema>
                    <hierarchical-model children="Items"></hierarchical-model>
                </schema>
            </hierarchical-datasource>
            <editable enabled="false" />
            <layout type="DiagramLayoutType.Layered"></layout>
        </kendo-diagram>
    ```
    {% endif %}
## Functionality and Features

* [Data binding]({% slug htmlhelpers_diagram_aspnetcore_binding %})&mdash;Configure the way of binding for the Diagram.
* [Editing]({% slug htmlhelpers_diagram_aspnetcore_editing %})&mdash;You can enable editing operations for both the existing shapes and connections between them.
* [Layout]({% slug htmlhelpers_diagram_aspnetcore_layout %})&mdash;The Diagram comes with built-in layout options that enable you to further alter its appearance.
* [Shapes]({% slug htmlhelpers_diagram_aspnetcore_shapes_connections %})&mdash;The Diagram enables you to add various shapes.
* [PDF export]({% slug htmlhelpers_diagram_aspnetcore_pdf_export %})&mdash;You have the ability to export the existing Diagram to a PDF document.
* [Advanced export]({% slug htmlhelpers_diagram_aspnetcore_export %})&mdash;The Diagram enables you to further customize the exporting mechanism.

## Next Steps

* [Getting Started with the Diagram]({% slug diagram_getting_started %})
* [Basic Usage of the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/index)
{% if site.core %}
* [Diagram in Razor Pages]({% slug razorpages_diagramhelper_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the Diagram for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/api)
* [Knowledge Base Section](/knowledge-base)
