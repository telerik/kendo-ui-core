---
title: Appearance
page_title: jQuery RadioButton Documentation - RadioButton Appearance
description: "Get started with the jQuery RadioButton by Kendo UI and learn how to customize the appearance of the widget."
slug: appearance_radiobutton_widget
position: 3
---

# RadioButton Appearance

The RadioButton allows you to set a different `size` to the `input` element.


## Size

The `size` option controls how big or small the rendered RadioButton looks. The structure of the applied class is `k-radio-{size}`.

The available [`size`](/api/javascript/ui/radiobutton/configuration/size) values are:

- `small`
- `medium` (Default)
- `large`

The example below shows a basic configuration and how to set size to "small" option.


```dojo
    <input id="radiobutton" />
    <script>
        $("#radiobutton").kendoRadioButton({
            size: "small"
        });
    </script>
```

## See Also

* [Basic Usage of the RadioButton (Demo)](https://demos.telerik.com/kendo-ui/radiobutton/index)
* [JavaScript API Reference of the RadioButton](/api/javascript/ui/radiobutton)
