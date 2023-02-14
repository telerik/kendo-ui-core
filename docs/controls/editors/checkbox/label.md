---
title: Label
page_title: jQuery CheckBox Documentation - Label
description: "Get started with the jQuery CheckBox by Kendo UI and learn how to configure the label of the widget."
slug: label_checkbox_widget
position: 2
---

# Label

You can use the `label` option to specify the content of the label. To set the content, you can use encoded text.


## Set the Label Text

To customize the text of the label, use the [`label`](/api/javascript/ui/checkbox/configuration/label) option.

```dojo
    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            label: "CheckBox Label"
        });
    </script>
```

## Encoded Label

The label of the CheckBox can be either an encoded text or HTML string. By default, the `label` is encoded. 
The example below demonstrates how an HTML string can be rendered as a CheckBox label. 

```dojo
    <input id="checkbox" />

    <script>
        $("#checkbox").kendoCheckBox({
            label: "<strong>Label one</strong>",
            encoded: false
        });
    </script>
```

## See Also

* [Basic Usage of the CheckBox (Demo)](https://demos.telerik.com/kendo-ui/checkbox/index)
* [JavaScript API Reference of the CheckBox](/api/javascript/ui/checkbox)
