---
title: Dock Types
page_title: jQuery Dialog Documentation - Dock Types
description: "Get started with the jQuery DockManager by Kendo UI and learn the different dock types."
slug: dock_types_kendoui_dockmanager
position: 2
---

# Docking Panes

The Kendo UI for jQuery DockManager widget exposes the ability to dock globally or within other panes.  

## Dock Types

The following dock types are supported:

- Global Docking
- Inner Docking

### Global Docking

When the user drags a pane a global docking navigator is always shown. The user has the option to dock the dragged pane to one of the component's edges, thus the dragged pane will become one of the root panes.

### Inner Docking

When the user drags a pane and hovers over another pane a dock navigator for the pane is shown. The user can choose to drop a pane on any of the parent's outer edges splitting the parent pane, or dropping it in the middle of the navigator to as a tab of the parent pane.

## Control the Docking Behavior

You can explicitly configure the docking behavior for a desired pane by using the `dockable` configuration option. The following example illustrates how to alter the behavior of the docking panes.

```dojo
<div id="dockmanager"></div>

<script>
    $(document).ready(function () {
        $("#dockmanager").kendoDockManager({
            rootPane: {
                id: "root",
                type: "split",
                orientation: "vertical",
                panes: [{
                    type: "split",
                    dockable:{
                        innerDock: false
                    },
                    panes: [{
                        type: "content",
                        dockable:{
                            dock: false
                        },
                        title: "Tools",
                        content: "Some tools.",
                        size: "20%"
                    }, {
                        type: "tab",
                        panes: [{
                            type: "content",
                            title: "File 1",
                            id: "myFile",
                            content: "File 1"
                        }],
                        size: "40%"
                    }, {
                        type: "split",
                        orientation: "vertical",
                        title: "container pane",
                        panes: [{
                            type: "tab",
                            panes: [{
                                type: "content",
                                title: "Properties",
                                content: "Properties content"
                            },
                            {
                                type: "content",
                                title: "History",
                                content: "History content"
                            }]
                        },
                        {
                            type: "content",
                            title: "Layers",
                            content: "Layers content"
                        }],
                        size: "40%"
                    }],
                    size: "80%"
                }]
            }
        })
    });
</script>
```

## See Also

* [JavaScript API Reference of the DockManager](/api/javascript/ui/dockmanager)
