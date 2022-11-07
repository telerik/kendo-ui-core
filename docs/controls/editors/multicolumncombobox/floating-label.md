---
title: Floating Label
page_title: jQuery MultiColumnComboBox Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery MultiColumnComboBox component."
slug: floating_label_kendoui_multicolumncombobox_widget
position: 10
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery MultiColumnComboBox](/api/javascript/ui/multicolumncombobox/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="comboBox" />

    <script>
    $(document).ready(function(){
        $("#comboBox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
        ],
        columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
        ],
        label:{
            content: "Select item...",
            floating: true
        }
        });
    });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <input id="comboBox" />

    <script>
    $(document).ready(function(){
        $("#comboBox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
        ],
        columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
        ],
        label:{
            content: function(){
                return "Select item...";
            }, 
            floating: true
        }
        });
    });
    </script>
```


## See Also

* [Floating Label (Demo) of the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/floating-label)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
