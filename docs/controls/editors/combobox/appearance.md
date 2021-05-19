---
title: Appearance
page_title: jQuery ComboBox Documentation | Appearance
description: "Get started with the jQuery ComboBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: appearance_kendoui_combobox
position: 7
---

# Appearance

The ComboBox provides options for setting the widths of its [list](#setting-the-list-width) and [popup](#setting-the-popup-width), [accessing its `list` elements](#accessing-the-list-elements), [providing support for `label` elements](#supporting-label-elements), and [removing its input value](#removing-the-input-value).

## Setting the List Width

To customize the width of the ComboBox list and change its dimensions, use the jQuery `width()` method.

    <input id="comboBox" />

    <script>
        var combobox = $("#combobox").data("kendoComboBox");
        // Set the width of the drop-down list.
        combobox.list.width(400);
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

> Virtualized lists do not support the auto-width functionality.

    <input id="combobox" style="width: 100px;" />
    <script>
    $("#combobox").kendoComboBox({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The ComboBox list renders an `ID` attribute which is generated from the ID of the widget and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the popup element.

> If the ComboBox has no ID, the `list` element will have no `ID` either.

    <input id="combobox">
    <script>
      $(document).ready(function() {
        $("#combobox").kendoComboBox({
            dataSource: ["Item1", "Item2"]
        });

        // The DIV popup element that holds header and footer templates and the suggestion options.
        var popupElement = $("#combobox-list");

        console.log(popupElement);
      });
    </script>

## Supporting label Elements

Because of its complex rendering, the focusing of the widget by using a `label` element requires additional implementation. For a runnable example, refer to [this Kendo UI Dojo demo](https://dojo.telerik.com/uSeho).

## Removing Input Values

The ComboBox enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **X** button appears in the input area on hover and when clicked, it resets the value of the widget and triggers the `change` event. By default, `clearButton` is enabled and is set to `true`.

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
