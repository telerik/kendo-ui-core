---
title: Items
page_title: jQuery PanelBar Documentation | Items
description: "Get started with the jQuery PanelBar by Kendo UI and configure its items."
slug: items_kendoui_panelbar
position: 5
---

# Items

The PanelBar enables you to dynamically add or remove items by using its API or by getting a reference to the `dataItem` setting.

## Using the API

The [PanelBar API](/api/javascript/ui/panelbar) provides methods for dynamically adding or removing PanelBar items.

To add items, provide the new item as a JSON object along with a reference item. A reference item is a target PanelBar item HTML element that already exists in the PanelBar. The reference item will be used to determine the placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item. For a runnable example, refer to the [demo on using the API of the PanelBar](https://demos.telerik.com/kendo-ui/panelbar/api).

The following example demonstrates how to add a new root PanelBar item.

    <ul id="panelbar"></ul>

    <script>
        var panelBar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");

        panelBar.insertAfter(
            { text: "New PanelBar Item" },
            panelBar.element.children("li:last")
        );
    </script>

## Referring to dataItem

As of the R1 2017 release, the PanelBar enables you to dynamically manage the state of its items trough the `dataItems` configuration. To disable, expand, or select a certain PanelBar item, get a reference to its `dataItem` and use the desired API method of the widget.

The following example demonstrates how to use the `disable`, `expand`, and `select` methods of the PanelBar.

    <div id="panelBar"></div>
    <button id="btn1" class="k-button">Update Data Item</button>
    <script>
     $(document).ready(function() {
            $("#panelBar").kendoPanelBar({
                dataSource: [
                    {
                        text: "Item 1",
                        expanded: false,
                        items: [
                            { text: "Item 1.1" },
                            { text: "Item 1.2" }
                        ]
                    },
                    { text: "Item 2" }
                ]
            })
        $("#btn1").on('click', function(){
            var panelBar = $("#panelBar").data("kendoPanelBar");
            var dataItem = panelBar.dataItem(".k-item:first"); // Get a reference to the first item.
            dataItem.set("expanded", true); // Set the item as expanded.
            dataItem.set("enabled", false); // Set the item as enabled.
            // dataItem.set("selected", true);  Set the item as selected.
     })
    });
    </script>

## See Also

* [Basic Usage of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/index)
* [Using the API of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/api)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
