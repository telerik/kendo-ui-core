---
title: Floating Label
page_title: jQuery MultiSelect Documentation - Floating Label
description: "Learn how to create and initialize a floating label for the Kendo UI for jQuery MultiSelect component."
slug: floating_label_kendoui_multiselect_widget
position: 11
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field. 

To implement a [floating label in the Kendo UI for jQuery MultiSelect](/api/javascript/ui/multiselect/configuration/label), define it either as a string or from a function.

The following example demonstrates how to set the floating label as a string:

```dojo 
    <select id="multiselect"></select>

    <script>
      $(document).ready(function(){
        $("#multiselect").kendoMultiSelect({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ],
          label: {
            content: "Select an item...",
            floating: true
          }
        });
      });
    </script>
```

The following example demonstrates how to set the floating label from a function:

```dojo 
    <select id="multiselect"></select>

    <script>
      $(document).ready(function(){
        $("#multiselect").kendoMultiSelect({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ],
          label: {
            content: function(){
                return "Select an item...";
            },
            floating: true
          }
        });
      });
    </script>
```


## See Also

* [Floating Label (Demo) of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/floating-label)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
