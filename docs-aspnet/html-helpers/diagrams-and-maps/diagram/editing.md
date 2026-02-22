---
title: Editing
page_title: Editing
description: "Get started with the Telerik UI Diagram for {{ site.framework }} and learn how to enable its editing functionality."
components: ["diagram"]
slug: htmlhelpers_diagram_aspnetcore_editing
position: 4
---

# Editing

The Diagram provides editing options which enable you to add tools and shapes to it, and use its layout options.

## Getting Started

To enable the editing functionality of the Diagram:

1. Configure the DataSource for remote CRUD operations. You have to include the model declaration. The `Id` is mandatory to indicate which of the fields is the unique identifier.

    ```HtmlHelper
        .DataSource(d => d
            .ShapeDataSource()
            .Model(m =>
            {
                m.Id(s => s.Id);
                m.Field(s => s.Id).Editable(false);
                m.Field(s => s.JobTitle);
                m.Field(s => s.Color);
            })
            .Read("ReadShapes", "DiagramData")
            .Create("CreateShape", "DiagramData")
            .Destroy("DestroyShape", "DiagramData")
            .Update("UpdateShape", "DiagramData")
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-diagram name="diagram">
            <hierarchical-datasource server-operation="false" type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Action("ReadShapes", "DiagramData")" />
                    <create url="@Url.Action("CreateShapes", "DiagramData")" />
                    <destroy url="@Url.Action("DestroyShapes", "DiagramData")" />
                    <update url="@Url.Action("UpdateShapes", "DiagramData")" />
                </transport>
                <schema>
                    <hierarchical-model id="Id">
                        <fields>
                            <field name="Id" editable="false" type="number"></field>
                            <field name="JobTitle" type="string"></field>
                            <field name="Color" type="string"></field>
                        </fields>
                    </hierarchical-model>
                </schema>
            </hierarchical-datasource>
        </kendo-diagram>
    ```
    {% endif %}

1. Configure the `ConnectionsDataSource` for remote CRUD operations. Without setting the `ConnectionsDataSource`, editing is disabled.

    ```HtmlHelper
        .ConnectionsDataSource(d => d
            .Model(m =>
            {
                m.Id(c => c.Id);
                m.Field(c => c.Id).Editable(false);
                m.Field(c => c.Text).Editable(false);
                m.From(c => c.FromShapeId);
                m.To(c => c.ToShapeId);
                m.FromX(c => c.FromPointX);
                m.FromY(c => c.FromPointY);
                m.ToX(c => c.ToPointX);
                m.ToY(c => c.ToPointY);
            })
            .Read("ReadConnections", "DiagramData")
            .Create("CreateConnection", "DiagramData")
            .Destroy("DestroyConnection", "DiagramData")
            .Update("UpdateConnection", "DiagramData")
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-diagram name="diagram">
            <connections-datasource server-operation="false" type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Action("ReadConnections", "DiagramData")" />
                    <create url="@Url.Action("CreateConnections", "DiagramData")" />
                    <destroy url="@Url.Action("DestroyConnections", "DiagramData")" />
                    <update url="@Url.Action("UpdateConnections", "DiagramData")" />
                </transport>
                <schema>
                    <model id="id">
                        <fields>
                            <field name="id" editable="false" type="number"></field>
                            <field name="text" editable="false" type="string"></field>
                            <field name="from" from="FromShapeId" type="number"></field>
                            <field name="to" from="ToShapeId" type="number"></field>
                            <field name="fromX" from="FromPointX" type="number"></field>
                            <field name="fromY" from="FromPointY" type="number"></field>
                            <field name="toX" from="ToPointX" type="number"></field>
                            <field name="toY" from="ToPointY" type="number"></field>
                        </fields>
                    </model>
                </schema>
            </connections-datasource>
        </kendo-diagram>
    ```

    {% endif %}
## Model Fields

The shape model provides the following fields:

* `id` (Number)&mdash;A mandatory field. Represents the unique identifier of the shape. A shape without an `id` field will not be connected.
* `type` (String)&mdash;The shape type.
* `text` (String)&mdash;The shape text.
* `x` (Number)&mdash;The `x` position of the shape.
* `y` (Number)&mdash;The `y` position of the shape.
* `width` (Number)&mdash;The shape width.
* `height` (Number)&mdash;The shape height.

Each model field gets updated upon user interaction.

## See Also

* [Editing in the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/editing)
* [Server-Side API](/api/diagram)
