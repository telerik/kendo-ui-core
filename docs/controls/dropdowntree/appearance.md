---
title: Appearance
page_title: jQuery DropDownTree Documentation - Appearance
description: "Get started with the jQuery DropDownTree by Kendo UI and set the width of the list and popup of the widget."
slug: appearance_kendoui_dropdowntree
position: 7
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI DropDownTree.

For a live example, visit the [Appearance Demo of the DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/appearance).

## Options

The Kendo UI DropDownTree supports the following styling options:

- [`size`](#size)—configures the overall size of the widget.
- [`rounded`](#rounded)—configures the border radius.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the DropDownTree looks. The structure of the class for a Single Selection DropDownTree is `k-picker-{size}`. The structure of the class in Multiple Selection mode is `k-input-{size}`. The option also affects the `span.k-chip` element through the `k-chip-{size}` class.

The following values are available for the [`size`](/api/javascript/ui/dropdowntree/configuration/size) option:

- `sm`—small size
- `md`—medium size (default)
- `lg`—large size
- `none`—unset

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="dropdowntree" />

<script>
    $("#dropdowntree").kendoDropDownTree({
        size:"large",
        dataSource: {
            data: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        }
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-outline k-picker-lg k-rounded-lg">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-outline k-dropdowntree-clearable k-input-lg k-rounded-lg">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/dropdowntree/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `full` and it is applied to the wrapping `span.k-dropdowntree` element that contains the whole HTML through the `k-rounded-full` class.

The example below shows a basic DropDownTree configuration and how to set `rounded` to "medium":

```dojo
<input id="dropdowntree" />

<script>
    $("#dropdowntree").kendoDropDownTree({
        rounded:"medium",
        dataSource: {
            data: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        }
    });
</script>
```

The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-outline k-picker-lg k-rounded-md">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-lg k-dropdowntree-clearable k-input-outline  k-rounded-md k-state-border-down">
</span>
```

### FillMode

The `fillMode` option controls how the color is applied to the widget. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/dropdowntree/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-dropdowntree` element through the `k-picker-solid` class.

The example below shows a basic DropDownTree configuration and how to set `fillMode` to "outline":

```dojo
<input id="dropdowntree" />

<script>
    $("#dropdowntree").kendoDropDownTree({
        fillMode:"outline",
        dataSource: {
            data: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        }
    });
</script>
```
The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-picker-outline k-picker-md k-rounded-md k-dropdowntree-clearable">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-outline k-input-md k-dropdowntree-clearable k-rounded-md k-state-border-down">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

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
