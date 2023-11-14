---
title: Floating Label
page_title: jQuery TimePicker Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery TimePicker component."
slug: floating_label_kendoui_timepicker_widget
position: 6
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery TimePicker](/api/javascript/ui/timepicker/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="timepicker" /> 
    <script>
        $(document).ready(function(){
            $("#timepicker").kendoTimePicker({
                 dateInput:false,
                 label: {
                    content: "Select time...",
                    floating: true
                 }
            });
        });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <input id="timepicker" /> 
    <script>
        $(document).ready(function(){
            $("#timepicker").kendoTimePicker({
                 dateInput:false,
                 label: {
                    content: function(){
                        return "Select time...";
                    },
                    floating: true
                 }
            });
        });
    </script>
```


## See Also

* [Floating Label (Demo) of the TimePicker](https://demos.telerik.com/kendo-ui/timepicker/floating-label)
* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)
