---
title: Overview
page_title: jQuery DockManager Documentation - Dialog Overview
description: "Learn the basics when working with the Kendo UI for jQuery DockManager."
slug: overview_kendoui_dockmanager_widget
position: 0
---

# {{ site.product }} DockManager Overview

The Dock Manager is a UI component that replicates the docks, along with their behaviors. It gives you the ability to have full control over the layout of your application through panes. This allows end users to alter the existing layout by pinning, resizing, moving, maximizing and hiding panes.

* [Demo page for the DockManager widget](https://demos.telerik.com/kendo-ui/dockmanager/index)


## Basic Configuration

The following example demonstrates how to define the DockManager.

> It is mandatory to define a root pane that will contain all other panes.

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
                    panes: [{
                        type: "content",
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
                        }, {
                            type: "content",
                            title: "File 2",
                            content: "File 2"
                        }, {
                            type: "content",
                            title: "File 3",
                            content: "File 3",
                            unpinnable: {
                                unpinned: true
                            }
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
                }, {
                    type: "content",
                    header: "Console",
                    content: "Console content",
                    size: "20%"
                }]
            }
        })
    });
</script>
```
## Functionality and Features

* [Docking Panes({% slug dock_types_kendoui_dockmanager %})&mdash;You can dock panes globally or within other inner panes.
* [Pane Types]({% slug pane_types_kendoui_dockmanager %})&mdash;Use different pane types depending on the hierarchical structure you want to achieve.

## Next Steps

* [Basic Usage of the DockManager (Demo)](https://demos.telerik.com/kendo-ui/dockmanager/index)

## See Also

* [JavaScript API Reference of the DockManager](/api/javascript/ui/dockmanager)
* [Demo Page for the jQuery DockManager](https://demos.telerik.com/kendo-ui/dockmanager/index)
* [Knowledge Base Section](/knowledge-base)
* [jQuery DockManager Product Page](https://www.telerik.com/kendo-jquery-ui/dockmanager)
