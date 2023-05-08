---
title: Floating Label
page_title: jQuery DropDownTree Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery DropDownTree component."
slug: floating_label_kendoui_dropdowntree_widget
position: 8
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery DropDownTree](/api/javascript/ui/dropdowntree/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <input id="dropdowntree" /> 
    <script>
        $(document).ready(function(){
            $("#dropdowntree").kendoDropDownTree({
                dataSource: [
                    {
                        text: "Bedroom Furniture",
                        items: [
                            { text: "Beds" },
                            { text: "Wardrobes" }
                        ]
                    },
                    { text: "Other..." },               
                ],
                label: {
                    content: "Select Category...",
                    floating: true
                }
            });
        });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <input id="dropdowntree" /> 
    <script>
        $(document).ready(function(){
            $("#dropdowntree").kendoDropDownTree({
                dataSource: [
                    {
                        text: "Bedroom Furniture",
                        items: [
                            { text: "Beds" },
                            { text: "Wardrobes" }
                        ]
                    },
                    { text: "Other..." },               
                ],
                label: {
                    content: function(){
                        return "Select Category...";
                    },
                    floating: true
                }
            });
        });
    </script>
```


## See Also

* [Floating Label (Demo) of the DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/floating-label)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
