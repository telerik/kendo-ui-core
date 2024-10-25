---
title: Getting Started
page_title: jQuery DockManager Documentation - Getting Started with the DockManager
description: "Get started with the jQuery DockManager by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_dockmanager_component
position: 1
---

# Getting Started with the DockManager

This guide demonstrates how to get up and running with the Kendo UI for jQuery DockManager.

After the completion of this guide, you will be able to achieve the following end result:

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

## 1. Create a Div Element

First, create a `<div>` element on the page from which the DockManager component will be initialized. 

```html
<div id="dockmanager"></div>
```

## 2. Initialize the DockManager 

In this step, you will initialize the DockManager from the `<div>` element. When you initialize the component, all settings of the DockManager will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.


```html
<div id="dockmanager"></div>
<script>
        $("#dockmanager").kendoDockManager()
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the DockManager. 

## 3. Define the Root Pane

In this step, you will define the root pane configuration.

> Defining a root pane is mandatory as it will contain all other panes.

The DockManager component exposes the ability to configure different [`pane types`]({% slug pane_types_kendoui_dockmanager %}). The available types are: `tab`, `split`, and `content`.

```html
<div id="dockmanager"></div>
<script>
        $("#dockmanager").kendoDockManager({
            rootPane: {
                id: "root",
                type: "split",
                orientation: "vertical",
            }
        })
</script>
```

## 4. Define Nested Panes

Here you will define the nested panes for the DockManager.

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

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the DockManager](https://demos.telerik.com/kendo-ui/dockmanager/index)

## See Also 

* [JavaScript API Reference of the DockManager](/api/javascript/ui/dockmanager)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
