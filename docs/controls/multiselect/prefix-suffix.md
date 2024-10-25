---
title: Prefix and Suffix
page_title: jQuery MultiSelect Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery MultiSelect."
slug: prefix_suffix_multiselect
position: 13
---

# Prefix and Suffix

You can improve the interactivity of the MultiSelect component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the MultiSelect input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the MultiSelect input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your MultiSelect input, use the [`prefixOptions`](/api/javascript/ui/multiselect/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the MultiSelect element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the MultiSelect element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the MultiSelect component.

```dojo
    <input id="customers" />
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            data:  [
                { ContactName: "John Doe", CustomerID: "1" },
                { ContactName: "Jane Doe", CustomerID: "2" },
                { ContactName: "James Doe", CustomerID: "3" }
            ]
        },       
        prefixOptions: {
            icon: "user"
        }
    });
    </script>
```
 

## Suffix

The suffix input adornment is located after the MultiSelect input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input.

To add a suffix after your MultiSelect input, use the [`suffixOptions`](/api/javascript/ui/multiselect/configuration/suffixoptions). `suffixOptions` provides the following options:

* `Icon`&mdash;Adds an icon after the MultiSelect element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the MultiSelect element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to add a button as a suffix of the MultiSelect component.

```dojo
    <input id="customers" />
    <script>
        $("#customers").kendoMultiSelect({
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            dataSource: {
                data:  [
                    { ContactName: "John Doe", CustomerID: "1" },
                    { ContactName: "Jane Doe", CustomerID: "2" },
                    { ContactName: "James Doe", CustomerID: "3" }
                ]
            },       
            suffixOptions: {
                template: () => `<button id="cc">Cc</button>`
            }
        });

        $("#cc").kendoButton({
            fillMode:"flat"
        })
    </script>
```

## See Also

* [MultiSelect Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/multiselect/prefix-suffix)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)