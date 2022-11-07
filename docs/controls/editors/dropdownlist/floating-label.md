---
title: Floating Label
page_title: jQuery DropDownList Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery DropDownList component."
slug: floating_label_kendoui_dropdownlist_widget
position: 10
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery DropDownList](/api/javascript/ui/dropdownlist/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <select id="dropdownlist"></select>

    <script>
    let data = [
        {ID: 1, ProductName: "Beds" },
        {ID: 2, ProductName: "Chairs" },
        {ID: 3, ProductName: "Sofas"},
        {ID: 4, ProductName: "Dining Tables" },
        {ID: 5, ProductName: "TV stoves" }
    ];
 
    $("#dropdownlist").kendoDropDownList({
        autoBind:false,
        dataTextField:"ProductName",
        dataValueField:"ID",
        filter:"contains",
        label: {
            content:"Select a product...",
            floating:true
        }
    });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <select id="dropdownlist"></select>

    <script>
    let data = [
        {ID: 1, ProductName: "Beds" },
        {ID: 2, ProductName: "Chairs" },
        {ID: 3, ProductName: "Sofas"},
        {ID: 4, ProductName: "Dining Tables" },
        {ID: 5, ProductName: "TV stoves" }
    ];
 
    $("#dropdownlist").kendoDropDownList({
        autoBind:false,
        dataTextField:"ProductName",
        dataValueField:"ID",
        filter:"contains",
        label: {
            ccntent: function(){
                return "Select a product...";
            },
            floating:true
        }
    });
    </script>
```


## See Also

* [Floating Label (Demo) of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/floating-label)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
