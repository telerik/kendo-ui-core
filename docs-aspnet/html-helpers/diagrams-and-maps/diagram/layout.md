---
title: Layout
page_title: Layout
description: "Get started with the Telerik UI Diagram for {{ site.framework }} and use its built-in layout options."
slug: htmlhelpers_diagram_aspnetcore_layout
position: 4
---

# Layout

The layout of the Diagram is its automatic organization based on the way its shapes are connected.

The Diagram layout is also called an "incidence structure".

## Getting Started

The `Layout()` method is the gateway to a variety of layout algorithms.

The following example demonstrates how the `Layout` method generates a Diagram with a tree-like layout.

```
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("_DiagramTree", "Diagram")).Model(m => m.Children("Items"))
        )
        .Layout(l => l
            .Type(DiagramLayoutType.Tree) // Set the Layout type.
            .Subtype(DiagramLayoutSubtype.Down)
            .HorizontalSeparation(30)
            .VerticalSeparation(20)
        )
        .ShapeDefaults(sd => sd
            .Width(40)
            .Height(40)
        )
    )
```

## Layout Types

The Diagram supports the following predefined layout types:

* `DiagramLayoutType.Tree`&mdash;Organizes a Diagram in a hierarchical way and is typically used in organizational representations. This layout type includes the radial tree layout, mind-mapping, and the classic tree diagrams.
* `DiagramLayoutType.Force`&mdash;Represents a force-directed layout algorithm (spring-embedder algorithm). Based on a physical simulation of forces which act on the nodes whereby the links define whether two nodes act upon each other. Effectively, each link is like a spring embedded in the Diagram. The simulation attempts to find a minimum energy state in such a way that the springs are in their base-state and, in this way, do not pull or push any (linked) node. This force-directed layout is non-deterministic&mdash;each layout pass will result in an unpredictable and, therefore, not reproducible layout. The optimal length is more an indication in the algorithm than a guarantee that all nodes will be at this distance. The result of the layout is a combination of the incidence structure of the Diagram, the initial positions of the nodes (topology), and the number of iterations.
* `DiagramLayoutType.Layered`&mdash;Organizes the Diagram with an emphasis on flow and minimizes the crossing between layers of shapes. This layout works well when few components are present and a top-down flow is present. The concept of "flow" in this context refers to a clear direction of the connections with a minimum of cycles (connections flowing back upstream). The layered graph layout is a type of graph layout in which the nodes of a directed graph are drawn in horizontal or vertical layers with the links directed in the complementary direction. It is also known as Sugiyama or hierarchical graph layout. When the graph is a tree, the layout shrinks to a standard tree layout and, in this way, can be considered as an extension to the classic tree layout.

## See Also

* [Editing in the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/layout)
* [Server-Side API](/api/diagram)
