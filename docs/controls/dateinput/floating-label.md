---
title: Floating Label
page_title: jQuery DateInput Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery DateInput component."
slug: floating_label_kendoui_dateinput_widget
position: 3
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery DateInput](/api/javascript/ui/dateinput/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="dateinput" /> 
    <script>
        $(document).ready(function(){
            $("#dateinput").kendoDateInput({
                label: {
                    content: "First Name",
                    floating: true
                }
            });
        });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <input id="dateinput" /> 
    <script>
        $(document).ready(function(){
            $("#dateinput").kendoDateInput({
                label: {
                    content: function(){
                        return "First Name";
                    },
                    floating: true
                }
            });
        });
    </script>
```


## See Also

* [Floating Label (Demo) of the DateInput](https://demos.telerik.com/kendo-ui/dateinput/floating-label)
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)
