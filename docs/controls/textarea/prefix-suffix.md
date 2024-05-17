---
title: Prefix and Suffix
page_title: jQuery TextArea Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery TextArea."
slug: prefix_suffix_textarea
position: 7
---

# Prefix and Suffix

You can improve the interactivity of the TextArea component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the TextArea input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the TextArea input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your TextArea input, use the [`prefixOptions`](/api/javascript/ui/textarea/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the TextArea element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the TextArea element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to add two icons before the TextArea element.

```dojo
    <textarea id="prefix"></textarea>
    <script>
        $("#prefix").kendoTextArea({
            placeholder: "Add Comment...",
            rows: 5,
            prefixOptions: {
                template: () => `${kendo.ui.icon("plus")}${kendo.ui.icon("comment")}`
            }
        });
    </script>
```

## Suffix

The suffix input adornment is located after the TextArea input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input.

To add a suffix after your TextArea input, use the [`suffixOptions`](/api/javascript/ui/textarea/configuration/suffixoptions). `suffixOptions` provides the following options:

* `Icon`&mdash;Adds an icon after the TextArea element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the TextArea element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to add an icon after the TextArea element.

```dojo
    <textarea id="prefix"></textarea>
    <script>
        $("#prefix").kendoTextArea({
            placeholder: "Add Comment...",
            rows: 5,
            suffixOptions: {
                template: () => `${kendo.ui.icon("volume-up")}`
            }
        });
    </script>
```

## See Also

* [TextArea Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/textarea/prefix-suffix)
* [JavaScript API Reference of the TextArea](/api/javascript/ui/textarea)