---
title: Pane Types
page_title: jQuery Dialog Documentation - Pane Types
description: "Get started with the jQuery DockManager by Kendo UI and learn the different pane types."
slug: pane_types_kendoui_dockmanager
position: 3
---


The Kendo UI for jQuery DockManager widget exposes the ability to configure different pane types. The following types are as follows.  

* `tab`&mdash;panes of tab type will group panes in a tab strip way, similar to the `TabStrip` component, users can navigate through panes via tabs in the header.
* `split`&mdash; with split panes, you are able to group panes in a Splitter fashion, by splitting the container pane either `horizontally` or `vertically`.
* `content`&mdash; with content panes, you have full control on explicitly specifying arbitrary content that will be rendered for a given pane as per your requirements.

> The root pane can either be of type `split` or `tab`.

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

## See Also

* [JavaScript API Reference of the DockManager](/api/javascript/ui/dockmanager)
