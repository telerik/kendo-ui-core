---
title: Appearance
page_title: jQuery CheckBox Documentation - CheckBox Appearance
description: "Get started with the jQuery CheckBox by Kendo UI and learn how to customize the appearance of the widget."
previous_url: /styles-and-layout/checkbox-radiobutton
slug: appearance_checkbox_widget
position: 4
---

# CheckBox Appearance

The CheckBox allows you to set different styles to the `input` element.

## Options

The Kendo UI CheckBox supports the following styling options:

- [`size`](#size)—Configures the overall size of the rendered checkbox.
- [`rounded`](#rounded)—Configures the border radius applied to the rendered `input` element.

### Size

The `size` option controls how big or small the rendered CheckBox looks. The structure of the applied class is `k-checkbox-{size}`.

The available [`size`](/api/javascript/ui/checkbox/configuration/size) values are:

- `small`
- `medium` (Default)
- `large`

The example below shows a basic configuration and how to set the size to "small".


```dojo
    <input id="checkbox" checked />
    <script>
        $("#checkbox").kendoCheckBox({
            size: "small"
        });
    </script>
```

### Rounded

The rounded option controls how much border radius is applied to the rendered `input` element.
The available [`rounded`](/api/javascript/ui/checkbox/configuration/rounded) values are:

- `small`—Renders a checkbox with small border radius.
- `medium` (default)—Renders a checkbox with medium border radius.
- `large`—Renders a checkbox with large border radius.
- `full`—Renders a checkbox with circular shape.

The following example demonstrates how the `rounded` option can be set to `full`:

```dojo
    <input id="checkbox" checked/>
    <script>
        $(document).ready(function(){
            $("#checkbox").kendoCheckBox({
                rounded: 'full'
            });
        });
    </script>
```

## See Also

* [Basic Usage of the CheckBox (Demo)](https://demos.telerik.com/kendo-ui/checkbox/index)
* [JavaScript API Reference of the CheckBox](/api/javascript/ui/checkbox)
