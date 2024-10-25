---
title: Prefix and Suffix
page_title: jQuery AutoComplete Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery AutoComplete."
slug: prefix_suffix_autocomplete
position: 10
---

# Prefix and Suffix

You can improve the interactivity of the AutoComplete component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the AutoComplete input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the AutoComplete input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your AutoComplete input, use the [`prefixOptions`](/api/javascript/ui/autocomplete/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the AutoComplete element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the AutoComplete element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the AutoComplete component.

```dojo
    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Doe" }
        ],
        dataTextField: "name",
        prefixOptions: {
            icon: "user"
        }
    })
    </script>
```
 

## Suffix

The suffix input adornment is located after the AutoComplete input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input. Set up the Suffix functionality through the [`suffixOptions`](/api/javascript/ui/autocomplete/configuration/suffixoptions) configuration that provides the following options:

* `Icon`&mdash;Adds an icon after the AutoComplete element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the AutoComplete element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to add an icon as a suffix of the AutoComplete component.

```dojo
<input id="autocomplete" />
<script>
  $("#autocomplete").kendoAutoComplete({
    dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
    dataTextField: "name",
    suffixOptions: {
      icon: "search"
    }
  })
</script>
```

## See Also

* [AutoComplete Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/prefix-suffix)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)