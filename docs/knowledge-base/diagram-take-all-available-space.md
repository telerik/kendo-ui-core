---
title: Make Diagram Take All Available Space
description: An example on how to make the Kendo UI Diagram take all white space that is available.
type: how-to
page_title: Enable the Diagram to Take All Space That Is Available | Kendo UI Diagram for jQuery
slug: diagram-take-all-available-space
tags: diagram, resize, adjust, stretch, fit, space, available, width, container, expand
ticketid: 1146668
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Created with version</td>
		<td>2017.3 913</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Diagram</td>
	</tr>
</table>


## Description

How can I make the Diagram resize and take all space that is available in the container?

## Solution

When the size of the container changes, call the [`resize()`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram/methods/resize) method to adjust the size of the Diagram.

```dojo
<table style="width: 100%">
    <tr>
        <td width=1>
            <div style="width: 250px;" id="text">
                Here we have some element. When this is hidden the should expand to fill all the available width on the page. Click below
                to hide this text.
            </div>
            <p />
            <h3>
                <a id="toggleButton">Toggle</a>
            </h3>
        </td>
        <td>
            <div>
                <div id="diagram"></div>
            </div>
        </td>
    </tr>
</table>

<script>
    function createDiagram() {
        $("#diagram").kendoDiagram({
            dataSource: {
                data: diagramNodes(),
                schema: {
                    model: {
                        children: "items"
                    }
                }
            },
            layout: {
                type: "tree",
                subtype: "down",
                horizontalSeparation: 30,
                verticalSeparation: 20
            },
            shapeDefaults: {
                width: 40,
                height: 40
            }
        });
    }

    function diagramNodes() {
        var root = { name: "0", items: [] };
        addNodes(root, [3, 2, 2]);
        return [root];
    }

    function addNodes(root, levels) {
        if (levels.length > 0) {
            for (var i = 0; i < levels[0]; i++) {
                var node = { name: "0", items: [] };
                root.items.push(node);

                addNodes(node, levels.slice(1));
            }
        }
    }

    $(document).ready(function () {

        $("#toggleButton").on("click", function () {
            $("#text").toggle();

            $("#diagram").data("kendoDiagram").resize();

        });

        createDiagram();


    });
</script>
```
