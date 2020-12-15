---
title: Label
page_title: jQuery RadioGroup Documentation | Label
description: "Get started with the jQuery RadioGroup by Kendo UI and learn how to configure the label of the widget."
slug: label_radiogroup_widget
position: 3
---

# Label

If the RadioGroup widget is bound to an array of strings, those will be used as both value and label of the respective radio button. If the widget is bound to array of objects, the label option could be used to specify the label content.


## Set the Label text

To customize the text of the label, use the [`label`](/api/javascript/ui/radiogroup/configuration/items.label) option. 

```dojo
    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ {
                value: "one",
                label: "Standard delivery"
            },{
                value: "two",
                label: "Fast delivery"
            },{
                value: "three"
                label: "Express delivery"
            }],
        });
    </script>
```

## Configure the Label Position

The labels of all radio buttons in the RadioGroup could be rendered before or after the radio buttons. 

```dojo
    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "Blue", "Green", "Red" ],
            labelPosition: "after"
        });
    </script>
```

## See Also 

* [Basic Usage of the RadioGroup (Demo)](https://demos.telerik.com/kendo-ui/radiogroup/index)
* [JavaScript API Reference of the RadioGroup](/api/javascript/ui/radiogroup)
