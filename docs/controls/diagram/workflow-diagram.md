---
title: Workflow Diagram
page_title: jQuery Diagram Documentation - Workflow Diagram
description: "Learn how to create a workflow diagram using the Kendo UI for jQuery Diagram component."
slug: workflow_kendoui_diagram
position: 6
---


# Workflow Diagram


The Kendo UI for jQuery Diagram component allows you to create [workflow diagrams](https://en.wikipedia.org/wiki/Flowchart) that visually represent a sequence of steps or processes. Workflow diagrams are useful for illustrating the flow of tasks, decisions, and actions in a process, making it easier to understand complex workflows.

For a full runnable example review the [Workflow Diagram Demo](https://demos.telerik.com/kendo-ui/diagram/workflow-diagram) representing a software development process with decision points and feedback loops.


## Creating a Workflow Diagram

To create a Workflow Diagram, use flowchart shapes. Common workflow shapes include:

* `Terminator`&mdash;Start and end points of the workflow.
* `Process`&mdash;Standard processing steps or actions.
* `Decision`&mdash;Decision points with Yes/No or True/False branches.
* `Document`&mdash;Document creation or data output.
* `PredefinedProcess`&mdash;Subroutines or predefined operations.
* `Database`&mdash;Database operations or data storage.
* `Delay`&mdash;Wait periods or time-based operations.
* `ManualOperation`&mdash;Manual tasks requiring human intervention.

The example below demonstrates the Workflow diagram shapes:

```dojo
    <div id="diagram"></div>
    <script>
        $(document).ready(function () {
        const shapeWidth = 150;
        const shapeHeight = 100;
        const shapes = [
            {
                id: '1',
                type: "Terminator",
                content: { text: 'Terminator' },
                fill: { color: '#CFE2FF' },
                stroke: { color: '#9EC5FE', width: 4 },
                x: 20,
                y: 50,
                width: 266,
                height: 100,
            },
            {
                id: '2',
                type: "Process",
                content: { text: 'Process', textWrap: 'wrap' },
                fill: { color: 'aquamarine' },
                stroke: { color: '#C5B3E6', width: 4 },
                width: shapeWidth,
                height: shapeHeight,
                x: 270,
                y: 50,
            },
            {
                id: '3',
                type: "Document",
                content: { text: 'Document' },
                fill: { color: '#DDA0DD' },
                stroke: { color: 'darkviolet', width: 4 },
                width: shapeWidth,
                height: shapeHeight,
                x: 460,
                y: 50,
            },
            {
                id: '4',
                type: "Decision",
                content: { text: 'Decision' },
                stroke: { color: '#FFE69C', width: 4 },
                fill: { color: '#fff' },
                width: shapeWidth,
                height: shapeHeight,
                x: 650,
                y: 50,
            },
            {
                id: '5',
                type: "PredefinedProcess",
                content: { text: 'PredefinedProcess' },
                fill: { color: '#FFEBCD' },
                stroke: { color: '#DEB887', width: 4 },
                width: shapeWidth,
                height: shapeHeight,
                x: 850,
                y: 50,
            },
            {
                id: '6',
                type: "Database",
                content: { text: 'Database', textWrap: 'wrap', relativePadding: 0.1 },
                fill: { color: '#E2D9F3' },
                stroke: { color: '#C5B3E6', width: 4 },
                width: shapeWidth,
                height: shapeHeight,
                x: 50,
                y: 180,
            },
            {
                id: '7',
                type: "Delay",
                content: { text: 'Delay' },
                stroke: { color: 'coral', width: 4 },
                fill: { color: '#fff' },
                width: shapeWidth,
                height: shapeHeight,
                x: 270,
                y: 180,
            },
            {
                id: '8',
                type: "ManualOperation",
                content: { text: 'ManualOperation' },
                fill: { color: 'lightgreen' },
                stroke: { color: 'darkgreen', width: 4 },
                width: shapeWidth,
                height: shapeHeight,
                x: 460,
                y: 180,
            },
            {
                id: '9',
                type: "Process",
                content: { text: 'Release' },
                fill: { color: '#FFFACD' },
                stroke: { color: '#FFE4C4', width: 4 },
                width: shapeWidth,
                height: shapeHeight,
                x: 650,
                y: 180,
            }
        ];

        const shapeDefaults = {
            cornerRadius: 8,
            content: {
                fontSize: 16,
                fontWeight: '600',
                color: '#212529',
            },
        };

        $("#diagram").kendoDiagram({
            shapeDefaults: shapeDefaults,
            shapes: shapes,
            zoom: 0.5,
            height: 1200
        });
    });
    </script>
```

Use [Diagram connections](https://www.telerik.com/kendo-jquery-ui/documentation/controls/diagram/shapes#adding-connections) with labeled content to indicate decision outcomes and process flow direction between workflow steps. Below is a basic example of connections configuration.

```
const connections = [
    {
        from: '1',
        to: '2',
    },
    {
        from: '2',
        to: '3',
    },
    {
        from: '4',
        to: '2',
        content: { text: 'No' },
        type: 'polyline',
        fromConnector: 'left',
        toConnector: 'left',
        points: [
            { x: 230, y: 591 },
            { x: 200, y: 591 },
            { x: 200, y: 270 },
            { x: 230, y: 270 },
        ],
    },
    {
        from: '4',
        to: '5',
        content: { text: 'Yes' },
    },
    {
        from: '8',
        fromConnector: 'top',
        to: '6',
    },
];
```

## See Also

* [Workflow Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/workflow-diagram)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
