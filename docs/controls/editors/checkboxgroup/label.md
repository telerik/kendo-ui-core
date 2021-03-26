---
title: Label
page_title: jQuery CheckBoxGroup Documentation | Label
description: "Get started with the jQuery CheckBoxGroup by Kendo UI and learn how to configure the label of the widget."
slug: label_checkboxgroup_widget
position: 3
---

# Label

If the CheckBoxGroup widget is bound to an array of strings, those will be used as both value and label of the respective radio button. If the widget is bound to array of objects, the label option could be used to specify the label content.


## Set the Label text

To customize the text of the label, use the [`label`](/api/javascript/ui/checkboxgroup/configuration/items.label) option.

```dojo
    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
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

The labels of all checkboxes in the CheckBoxGroup could be rendered before or after each checkbox.

```dojo
    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "Blue", "Green", "Red" ],
            labelPosition: "after"
        });
    </script>
```

## See Also

* [Basic Usage of the CheckBoxGroup (Demo)](https://demos.telerik.com/kendo-ui/checkboxgroup/index)
* [JavaScript API Reference of the CheckBoxGroup](/api/javascript/ui/checkboxgroup)
