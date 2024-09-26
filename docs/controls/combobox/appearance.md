---
title: Appearance
page_title: jQuery ComboBox Documentation - Appearance
description: "Get started with the jQuery ComboBox by Kendo UI and learn how to create, initialize, and enable the component."
slug: appearance_kendoui_combobox
position: 8
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI ComboBox.

For a live example, visit the [Appearance Demo of the ComboBox](https://demos.telerik.com/kendo-ui/combobox/appearance).

## Options

The Kendo UI ComboBox supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the ComboBox component looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/combobox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="combobox" />
<script>
    $("#combobox").kendoComboBox({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-combobox k-input k-input-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the component. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/combobox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `medium` and it is applied to the `span.k-combobox` wrapping element through the `k-rounded-md` class.

The example below shows a basic ComboBox configuration and how to set `rounded` to "full":

```dojo
<input id="combobox" />
<script>
    $("#combobox").kendoComboBox({
      rounded: "full"
    });
</script>
```
The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-combobox k-input k-rounded-full">
    ...
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/combobox/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-combobox` wrapping element through the `k-input-solid` class.

The example below shows a basic ComboBox configuration and how to set `fillMode` to "outline":

```dojo
<input id="combobox" />
<script>
    $("#combobox").kendoComboBox({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-combobox k-input k-input-outline">
    ...
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

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

The ComboBox list renders an `ID` attribute which is generated from the ID of the component and the `-list` suffix. You can use the `ID` to style the element or to access a specific element inside the popup element.

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

Because of its complex rendering, the focusing of the component by using a `label` element requires additional implementation. For a runnable example, refer to [this Kendo UI Dojo demo](https://dojo.telerik.com/uSeho).

## Removing Input Values

The ComboBox enables you to remove the values from its input area by using the `clearButton` configuration option. As a result, an **X** button appears in the input area on hover and when clicked, it resets the value of the component and triggers the `change` event. By default, `clearButton` is enabled and is set to `true`.

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [Appearance Demo of the ComboBox](https://demos.telerik.com/kendo-ui/combobox/appearance)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
