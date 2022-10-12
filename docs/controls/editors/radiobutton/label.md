---
title: Label
page_title: jQuery RadioButton Documentation - Label
description: "Get started with the jQuery RadioButton by Kendo UI and learn how to configure the label of the widget."
slug: label_radiobutton_widget
position: 2
---

# Label

You can use the `label` option to specify the content of the label. To set the content, you can use encoded text.


## Set the Label Text

To customize the text of the label, use the [`label`](/api/javascript/ui/radiobutton/configuration/label) option.

```dojo
    <input id="radiobutton" />

    <script>
        $("#radiobutton").kendoRadioButton({
            label: "RadioButton Label"
        });
    </script>
```

## Encoded Label

The label of the RadioButton can be either an encoded text or HTML string. By default, the `label` is encoded.
The example below demonstrates both scenarios.

```dojo
    <input id="radiobutton"  name="radioBtn" />
    <input id="radiobutton2" name="radioBtn" />

    <script>
      $("#radiobutton").kendoRadioButton({
        label: "<strong>Label one</strong>"
      });
      
      $("#radiobutton2").kendoRadioButton({
        label: "<strong>Label two</strong>",
        encoded: false
      });
    </script>
```

## See Also

* [Basic Usage of the RadioButton (Demo)](https://demos.telerik.com/kendo-ui/radiobutton/index)
* [JavaScript API Reference of the RadioButton](/api/javascript/ui/radiobutton)
