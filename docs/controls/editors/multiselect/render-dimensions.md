---
title: Rendering and Dimensions
page_title: jQuery MultiSelect Documentation | Rendering and Dimensions
description: "Get started with the jQuery MultiSelect by Kendo UI and configure its layout and the rendering of its elements."
slug: rendering_multiselect
position: 9
---

# Rendering and Dimensions

The MultiSelect enables you to configure its layout and the rendering of its elements.

## Setting the Width of the List

To customize the width of the drop-down list and change its dimensions, use the jQuery `width()` method.

    <select id="multiselect"></select>

    <script>
        var multiselect = $("#multiselect").data("kendoMultiSelect");

        // Set the width of the drop-down list.
        multiselect.list.width(400);
    </script>

## Setting the Width of the Popup

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content as a single line and does not wrap it up.

    <select id="multiselect" style="width: 100px;"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The MultiSelect renders an `ID` attribute that is generated from the ID of the widget and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the `popup` element.

> If the widget has no ID, the drop-down element will have no ID either.

    <select id="multiselect"></select>
    <script>
      $(document).ready(function() {
        $("#multiselect").kendoMultiSelect({
            dataSource: ["Item1", "Item2"]
        });

        //the DIV popup element that holds header, footer templates and the suggestion options.
        var popupElement = $("#multiselect-list");

        console.log(popupElement);
      });
    </script>

## Focusing

Because of its complex rendering, focusing the widget by using a `label` element requires additional implementation. For more information, refer to [this Kendo UI Dojo snippet](https://dojo.telerik.com/uSeho).

## Managing Scrollable Content

By design, when the user adds an item that does not fit in the existing free space, the MultiSelect expands vertically. To limit the expansion and scrolling of the content, refer to the [demo on handling scrollable MultiSelect content](https://dojo.telerik.com/axeMa).

## See Also

* [Handling the Scrollable Content in the MultiSelect (Demo)](https://dojo.telerik.com/axeMa)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
