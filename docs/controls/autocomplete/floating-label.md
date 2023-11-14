---
title: Floating Label
page_title: jQuery AutoComplete Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery AutoComplete component."
slug: floating_label_kendoui_autocomplete_widget
position: 9
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery AutoComplete](/api/javascript/ui/autocomplete/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="autocomplete" /> 
    <script>
        $(document).ready(function(){
            $("#autocomplete").kendoAutoComplete({
                dataSource:[
                    { text: "John" },
                    { text: "Patrick" },
                    { text: "Simon"}
                ],
                dataTextField:"text",
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
    <input id="autocomplete" /> 
    <script>
        $(document).ready(function(){
            $("#autocomplete").kendoAutoComplete({
                dataSource:[
                    { text: "John" },
                    { text: "Patrick" },
                    { text: "Simon"}
                ],
                dataTextField:"text",
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

* [AutoComplete Floating Label (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/floating-label)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
