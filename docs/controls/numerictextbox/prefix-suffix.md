---
title: Prefix and Suffix
page_title: jQuery NumericTextBox Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery NumericTextBox."
slug: prefix_suffix_numerictextbox
position: 7
---

# Prefix and Suffix

You can improve the interactivity of the NumericTextBox component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the NumericTextBox input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the NumericTextBox input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your NumericTextBox input, use the [`prefixOptions`](/api/javascript/ui/numerictextbox/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the NumericTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the NumericTextBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to add a DropDownList component before the NumericTextBox.

```dojo
    <input id="length" />
    <script>
        var numerictextbox = $("#length").kendoNumericTextBox({
            placeholder: "Enter length",
            prefixOptions: {
                template: () => "<input id='length-units' style='width: 70px' />"
            }
        }).data('kendoNumericTextBox');

        $("#length-units").kendoDropDownList({
            dataSource: ["mm", "cm", "m", "km"],
            size: "small",
            fillMode: "flat",
            rounded: "none",          
        });
    </script>
```

## Suffix

The suffix input adornment is located after the NumericTextBox input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input.

To add a suffix after your NumericTextBox input, use the [`suffixOptions`](/api/javascript/ui/numerictextbox/configuration/suffixoptions). `suffixOptions` provides the following options:

* `Icon`&mdash;Adds an icon after the NumericTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the NumericTextBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to insert HTML content after the NumericTextBox element.

```dojo
    <input id="length" />
    <script>
        var numerictextbox = $("#length").kendoNumericTextBox({
            placeholder: "Enter length",
             suffixOptions: {
                separator: false,
                template: () => "<div class='selected-length-unit' id='selected-unit'>mm</div>"
            },
        }).data('kendoNumericTextBox');
    </script>
```

## See Also

* [NumericTextBox Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/prefix-suffix)
* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)