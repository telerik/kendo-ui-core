---
title: Editing
page_title: Editing
description: "Get started with the Telerik UI Diagram for {{ site.framework }} and learn how to enable its editing functionality."
slug: htmlhelpers_diagram_aspnetcore_editing
position: 3
---

# Editing

The Diagram provides editing options which enable you to add tools and shapes to it, and use its layout options.

## Getting Started

To enable the editing functionality of the Diagram:

1. Configure the DataSource for remote CRUD operations. You have to include the model declaration. The `Id` is mandatory to indicate which of the fields is the unique identifier.

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

1. Configure the `ConnectionsDataSource` for remote CRUD operations. Without setting the `ConnectionsDataSource`, editing is disabled.

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
