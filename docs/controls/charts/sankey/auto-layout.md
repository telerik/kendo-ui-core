---
title: Auto Layout
page_title: jQuery Sankey Diagram Documentation - Auto Layout
description: "Learn how to disable the automatic layout of the Kendo UI for jQuery Sankey Diagram, which is active by default."
slug: autolayout_kendoui_sankeychart
position: 5
---

# Auto-Layout

By default, the Kendo UI for jQuery Sankey Diagram rearranges the nodes and their corresponding links for better visual appearance and readability.

If you want to display the nodes and links in a specific order, you can disable this feature by setting the [`disableAutoLayout`](/api/javascript/dataviz/ui/sankey/configuration/disableautolayout) property to `true`. In this case, the order of the nodes and links will be determined based on their order in the data that is passed to the [`data`](/api/javascript/dataviz/ui/sankey/configuration/data) property.

The following example demonstrates how to disable the automatic layout feature by toggling the value of the `disableAutoLayout` property.

```dojo
    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            },
            disableAutoLayout: true
        });
    </script>
```


## See Also

* [JavaScript API Reference of the Sankey](/api/javascript/dataviz/ui/sankey)
