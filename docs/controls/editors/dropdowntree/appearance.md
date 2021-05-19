---
title: Appearance
page_title: jQuery DropDownTree Documentation | Appearance
description: "Get started with the jQuery DropDownTree by Kendo UI and set the width of the list and popup of the widget."
slug: appearance_kendoui_dropdowntree
position: 7
---

# Appearance

The DropDownTree provides options for setting the widths of its [list](#setting-the-list-width) and [popup](#setting-the-popup-width).

## Setting the List Width

To customize the width of the DropDownTree list and change its dimensions, use the jQuery `width()` method.

    <input id="dropdowntree">

    <script>
    $(document).ready(function() {
        var dropdowntree = $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            {
            text: "Item 1",
            items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" }
            ]
            },
            { text: "Item 2" }
        ]
        }).data("kendoDropDownTree");

        dropdowntree.list.width(400);
    });
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

    <input id="dropdowntree">

    <script>
    $(document).ready(function() {
        var dropdowntree = $("#dropdowntree").kendoDropDownTree({
        autoWidth: true,
        dataSource: [
            {
            text: "Item 1",
            items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" }
            ]
            },
            { text: "Item 2" }
        ]
        }).data("kendoDropDownTree");
    });
    </script>

## See Also

* [Basic Usage of the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/index)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
