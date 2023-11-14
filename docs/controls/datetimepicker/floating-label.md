---
title: Floating Label
page_title: jQuery DateTimePicker Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery DateTimePicker component."
slug: floating_label_kendoui_datetimepicker_widget
position: 10
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery DateTimePicker](/api/javascript/ui/datetimepicker/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="datetimepicker" /> 
    <script>
        $(document).ready(function(){
            $("#datetimepicker").kendoDateTimePicker({
                label: {
                    content: "Select a date...",
                    floating: true
                }
            });
        });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <input id="datetimepicker" /> 
    <script>
        $(document).ready(function(){
            $("#datetimepicker").kendoDateTimePicker({
                label: {
                    content: function(){
                        return "Select a date...";
                    },
                    floating: true
                }
            });
        });
    </script>
```


## See Also

* [Floating Label (Demo) of the DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/floating-label)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
