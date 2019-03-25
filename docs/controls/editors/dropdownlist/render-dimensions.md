---
title: Rendering and Dimensions
page_title: jQuery DropDownList Documentation | Rendering and Dimensions | Kendo UI
description: "Get started with the jQuery DropDownList by Kendo UI and configure its layout and the rendering of its elements."
slug: rendering_dropdownlist_widget
position: 9
---

# Rendering and Dimensions

The DropDownList enables you to configure its layout and the rendering of its elements.

## Setting the Width of the List

To customize the width of the DropDownList and change its dimensions, use the jQuery `width()` method.

###### Example

    <input id="dropDownList">
    <script>
      $(document).ready(function() {
        $("#dropDownList").kendoDropDownList();
        var dropdownlist = $("#dropDownList").data("kendoDropDownList");
        dropdownlist.list.width(400);
      });
    </script>

The following example demonstrates how to set the list dimensions through an MVVM binding.

###### Example

```dojo
  <input id="ddl" data-role="dropdownlist" data-bind="source: foo" />

  <script>
    var vm = {
      foo: [ "one", "two" ]
    }

    kendo.bind(document.body, vm);
    $("#ddl").data("kendoDropDownList").list.width(400);
  </script>
```

## Setting the Width of the Popup

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content as a single line and does not wrap it up.

###### Example

    <input id="dropdownlist" style="width: 100px;" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

## Accessing list Elements

The DropDownList renders an `ID` attribute that is generated from the ID of the widget and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the `popup` element.

> If the widget has no ID, the drop-down element will have no ID either.

###### Example

    <input id="ddl">
    <script>
      $(document).ready(function() {
        $("#ddl").kendoDropDownList({
            dataSource: ["Item1", "Item2"]
        });

        // The div popup element that holds the header and footer templates, and the suggestion options.
        var popupElement = $("#ddl-list");

        console.log(popupElement);
      });
    </script>

## Focusing

Because of its complex rendering, focusing the widget by using a `label` element requires additional implementation. For more information, refer to [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
