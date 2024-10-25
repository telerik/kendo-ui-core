---
title: Floating Label
page_title: jQuery DatePicker Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery DatePicker component."
slug: floating_label_kendoui_datepicker_widget
position: 13
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery DatePicker](/api/javascript/ui/datepicker/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="datepicker" /> 
    <script>
        $(document).ready(function(){
            $("#datepicker").kendoDatePicker({
                dataTextField:"text",
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
    <input id="datepicker" /> 
    <script>
        $(document).ready(function(){
            $("#datepicker").kendoDatePicker({
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

* [Floating Label (Demo) of the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/floating-label)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
