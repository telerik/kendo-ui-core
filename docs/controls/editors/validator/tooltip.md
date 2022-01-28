---
title: Tooltip
page_title: jQuery Validator Documentation | Tooltip
description: "Get started with the jQuery Validator by Kendo UI and ."
slug: tooltip_kendoui_validator
position: 4
---

# Tooltip

The Validator places its tooltips besides the validated input.

However, if the input is later enhanced to a ComboBox, AutoComplete, or other Kendo UI widget, placing the tooltip beside the input may cover important information or break the rendering of the widget. In such cases, you can specify the exact position of the tooltip by adding a `span` with the `data-for` attribute which is set to the validated input name and a `.k-invalid-msg` class.

The following example demonstrates how to set a specific tooltip location. The tooltip remains outside the AutoComplete widget after enhancement.

> The tooltip of the Validator is bound to the input `name` through the `data-for` attribute.

     <div id="myform">
         <input type="text" id="name" name="name" required>
         <span class="k-invalid-msg" data-for="name"></span>
     </div>

     <script>
         $("#name").kendoAutoComplete({
            dataSource: data,
            separator: ", "
        });

         $("#myform").kendoValidator();
     </script>

Within a Grid, the tooltip is placed under the input field and is aligned to its left. By default, the maximum width of the tooltip is 300px. To set a column field width less than 300px, you might need to manually override the default CSS and adjust the desired tooltip position.

    <style>
      .k-tooltip {
        max-width: 160px !important;
        transform: translate(-20%, 0%);
      }
    </style>

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
