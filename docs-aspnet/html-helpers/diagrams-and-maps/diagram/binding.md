---
title: Data Binding
page_title: Data Binding
description: "Get started with the Telerik UI Diagram for {{ site.framework }} featuring built-in DataSource options which allow you to bind the Diagram to remote data."
slug: htmlhelpers_diagram_aspnetcore_binding
previous_url: /helpers/diagrams-and-maps/diagram/binding/binding
position: 2
---

# Data Binding

The Telerik UI Diagram for {{ site.framework }} provides built-in DataSource options that allow you to bind the Diagram to remote data. You can bind to hierarchical data structures or use separate data sources for shapes and connections.

The following table summarizes the available binding approaches and their use cases:

| Binding Approach | Description | When to Use | Data Source Configuration |
|------------------|-------------|-------------|--------------------------|
| `Hierarchical Data Binding` | Binds to a single data source with parent-child relationships defined by a children field | For tree-like structures such as organizational charts, mind maps, or any hierarchical data where relationships are nested | Use `.DataSource()` with `.Model(m => m.Children("fieldName"))` |
| `ShapeDataSource` + `ConnectionsDataSource` | Uses separate data sources for shapes and connections, allowing independent CRUD operations | When shapes and connections need to be managed separately, or when you need full CRUD capabilities for both elements | Use `.DataSource(ds => ds.ShapeDataSource()...)` for shapes and `.ConnectionsDataSource()` for connections |

## Binding to Hierarchical Data

The Diagram supports binding to hierarchical data structures where parent-child relationships are defined. This is useful for organizational charts, mind maps, and other tree-like structures.

To bind the Diagram to hierarchical data, configure the `DataSource` with a model that specifies the `Children` field, which holds the child records.

```HtmlHelper
@(Html.Kendo().Diagram()
    .Name("diagram")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("_OrgChart", "Diagram")
        )
        .Model(m => m.Children("Items"))
    )
    .ShapeDefaults(sd => sd
        .Content(c => c
                  .FontSize(17)
                  .Color("#444")
              )
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-diagram name="diagram">
    <hierarchical-datasource>
        <transport>
            <read url="@Url.Action("_OrgChart", "Diagram")" />
        </transport>
        <schema>
            <hierarchical-model children="Items"></hierarchical-model>
        </schema>
    </hierarchical-datasource>
    <shape-defaults visual="visualTemplate">
        <content font-size="17" color="#444" />
    </shape-defaults>
</kendo-diagram>
```
{% endif %}

The server-side controller returns JSON data with the hierarchical structure:

```Controller
public ActionResult _OrgChart()
{
    return Json(DiagramDataRepository.OrgChart());
}
```

## Using ShapeDataSource and ConnectionsDataSource

For more complex scenarios where shapes and connections must be managed separately, use the `ShapeDataSource()` and `ConnectionsDataSource()` methods. This approach enables CRUD operations on both shapes and connections independently.

```HtmlHelper
@(Html.Kendo().Diagram<OrgChartShape, OrgChartConnection>()
    .Name("diagram")
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
        .Update("UpdateShape", "DiagramData")
        .Destroy("DestroyShape", "DiagramData")
    )
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
        .Update("UpdateConnection", "DiagramData")
        .Destroy("DestroyConnection", "DiagramData")
    )
    .ShapeDefaults(sd => sd
        .Content(c => c
            .FontSize(17)
            .Color("#444")
        )
    )
    .ConnectionDefaults(cd => cd
        .Stroke(s => s
            .Color("#586477")
            .Width(2)
        )
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-diagram name="diagram">
    <hierarchical-datasource type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadShapes", "DiagramData")" />
            <create url="@Url.Action("CreateShape", "DiagramData")" />
            <update url="@Url.Action("UpdateShape", "DiagramData")" />
            <destroy url="@Url.Action("DestroyShape", "DiagramData")" />
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
    <connections-datasource type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadConnections", "DiagramData")" />
            <create url="@Url.Action("CreateConnection", "DiagramData")" />
            <update url="@Url.Action("UpdateConnection", "DiagramData")" />
            <destroy url="@Url.Action("DestroyConnection", "DiagramData")" />
        </transport>
        <schema>
            <model id="Id">
                <fields>
                    <field name="Id" editable="false" type="number"></field>
                    <field name="Text" editable="false" type="string"></field>
                    <field name="FromShapeId" from="FromShapeId" type="number"></field>
                    <field name="ToShapeId" from="ToShapeId" type="number"></field>
                    <field name="FromPointX" from="FromPointX" type="number"></field>
                    <field name="FromPointY" from="FromPointY" type="number"></field>
                    <field name="ToPointX" from="ToPointX" type="number"></field>
                    <field name="ToPointY" from="ToPointY" type="number"></field>
                </fields>
            </model>
        </schema>
    </connections-datasource>
    <shape-defaults>
        <content font-size="17" color="#444" />
    </shape-defaults>
    <connection-defaults>
        <stroke color="#586477" width="2" />
    </connection-defaults>
</kendo-diagram>
```
{% endif %}

The `ShapeDataSource()` method configures the data source for diagram shapes, while `ConnectionsDataSource()` handles the connections between shapes. This separation allows for independent CRUD operations on shapes and connections.

## Customizing the Appearance

To create a network of visuals and customize the appearance of the Diagram, set its `Visual` configuration.

```HtmlHelper
    @(Html.Kendo().Diagram()
              .Name("diagram")
              .DataSource(dataSource => dataSource
                  .Read(read => read
                      .Action("_OrgChart", "Diagram")
                  )
                  .Model(m => m.Children("Items"))
              )
              .Editable(false)
              .Layout(l => l.Type(DiagramLayoutType.Layered))
              .ShapeDefaults(sd => sd
                  .Visual("visualTemplate")
              )
              .ConnectionDefaults(cd => cd
                  .Stroke(s => s
                      .Color("#979797")
                      .Width(2)
                  )
              )
              .Events(events => events.DataBound("onDataBound"))
    )
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-diagram name="diagram" on-data-bound="onDataBound">
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
    <shape-defaults visual="visualTemplate"></shape-defaults>
    <connection-defaults>
        <stroke color="#979797" width="2" />
    </connection-defaults>
</kendo-diagram>
```
{% endif %}
```JavaScript
        <script>
            function visualTemplate(options) {
                var dataviz = kendo.dataviz;
                var g = new dataviz.diagram.Group();
                var dataItem = options.dataItem;
                g.append(new dataviz.diagram.Rectangle({
                    width: 210,
                    height: 75,
                    stroke: {
                        width: 0
                    },
                    fill: {
                        gradient: {
                            type: "linear",
                            stops: [{
                                color: dataItem.ColorScheme,
                                offset: 0,
                                opacity: 0.5
                            }, {
                                color: dataItem.ColorScheme,
                                offset: 1,
                                opacity: 1
                            }]
                        }
                    }
                }));
                g.append(new dataviz.diagram.TextBlock({
                    text: dataItem.FirstName + " " + dataItem.LastName,
                    x: 85,
                    y: 20,
                    color: "#fff"
                }));
                g.append(new dataviz.diagram.TextBlock({
                    text: dataItem.Title,
                    x: 85,
                    y: 40,
                    color: "#fff"
                }));
                g.append(new dataviz.diagram.Image({
                    source: "@Url.Content("~/shared/dataviz/diagram/people/")" + dataItem.Image,
                    x: 3,
                    y: 3,
                    width: 68,
                    height: 68
                }));
                return g;
            }
            function onDataBound() {
                this.bringIntoView(this.shapes);
            }
        </script>
```

## Next Steps

* [Customize Diagram Appearance]({% slug htmlhelpers_diagram_aspnetcore_shapes_connections %})
* [Handle Diagram Events]({% slug diagram_events %})
* [Configure Diagram Layout]({% slug htmlhelpers_diagram_aspnetcore_layout %})

## See Also

* [Basic Usage of the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram)
* [Server-Side API](/api/diagram)
{% if site.core %}
* [Diagram in Razor Pages]({% slug razorpages_diagramhelper_aspnetcore %})
{% endif %}
