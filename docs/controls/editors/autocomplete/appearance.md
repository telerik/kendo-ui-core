---
title: Appearance
page_title: jQuery AutoComplete Documentation | Appearance
description: "Get started with the jQuery AutoComplete by Kendo UI and set its list and popup widths, access the list elements, and remove its input values."
slug: sizedimensions_kendoui_autocomplete
position: 7
---

# Appearance

The AutoComplete provides options for setting the widths of its [list](#setting-the-list-width) and [popup](#setting-the-popup-width), [accessing its `list` elements](#accessing-the-list-elements), and [removing its input value](#removing-the-input-value).

## Setting the List Width

To customize the width of the AutoComplete list and change its dimensions, use the jQuery `width()` method.

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // Set the width of the drop-down list.
        autoComplete.list.width(400);
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

    <input id="autocomplete" style="width: 100px;" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The AutoComplete list renders an `ID` attribute which is generated from the ID of the widget and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the popup element.

> If the AutoComplete has no ID, the `list` element will have no `ID` either.

    <input id="autocomplete">
    <script>
      $(document).ready(function() {
        $("#autocomplete").kendoAutoComplete({
            dataSource: ["Item1", "Item2"]
        });

        // The DIV popup element that holds the header and footer templates, and the suggestion options.
        var popupElement = $("#autocomplete-list");

        console.log(popupElement);
      });
    </script>

## Removing Input Values

The AutoComplete enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **X** button appears in the input area on hover and when clicked, it resets the value of the widget and triggers the `change` event. By default, `clearButton` is enabled and is set to `true`.

## See Also

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
