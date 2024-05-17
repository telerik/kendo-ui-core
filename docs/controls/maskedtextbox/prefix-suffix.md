---
title: Prefix and Suffix
page_title: jQuery MaskedTextBox Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery MaskedTextBox."
slug: prefix_suffix_maskedtextbox
position: 5
---

# Prefix and Suffix

You can improve the interactivity of the MaskedTextBox component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the MaskedTextBox input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the MaskedTextBox input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your MaskedTextBox input, use the [`prefixOptions`](/api/javascript/ui/maskedtextbox/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the MaskedTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the MaskedTextBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the MaskedTextBox component.

```dojo
    <input id="card" />
    <script>
        $("#card").kendoMaskedTextBox({
            mask: "0000-0000-0000-0000",
            prefixOptions: {
                icon: "lock"
            }
        });
    </script>
```
 

## Suffix

The suffix input adornment is located after the MaskedTextBox input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input.

To add a suffix after your MaskedTextBox input, use the [`suffixOptions`](/api/javascript/ui/maskedtextbox/configuration/suffixoptions). `suffixOptions` provides the following options:

* `Icon`&mdash;Adds an icon after the MaskedTextBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the MaskedTextBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to add a button as a suffix of the MaskedTextBox component.

```dojo
    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "0000-0000-0000-0000",
            suffixOptions: {
                template: () => `<button id="verify">Verify</button>`
            }
        })
    
        $("#verify").kendoButton({
            fillMode:"flat"
        })
    </script>
```

## See Also

* [MaskedTextBox Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/prefix-suffix)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)