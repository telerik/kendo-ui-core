---
title: Prefix and Suffix
page_title: jQuery ComboBox Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery ComboBox."
slug: prefix_suffix_combobox
position: 11
---

# Prefix and Suffix

You can improve the interactivity of the ComboBox component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the ComboBox input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the ComboBox input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your ComboBox input, use the [`prefixOptions`](/api/javascript/ui/combobox/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the ComboBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the ComboBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the ComboBox component.

```dojo
    <select id="cities"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
            data: [
                { CityID: 1, CityName: "Lisboa" },
                { CityID: 2, CityName: "Moscow" },
                { CityID: 3, CityName: "Napoli" },
                { CityID: 4, CityName: "Tokyo" },                
            ]
        });

    $("#cities").kendoComboBox({
        prefixOptions: {
            icon: "map-marker-target"
        },        
        filter: "contains",
        placeholder: 'Please select city...',
        dataTextField: "CityName",
        datavalueField: "CityID",
        dataSource: dataSource
    });
    </script>
```
 

## Suffix

The suffix input adornment is located after the ComboBox input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input.

To add a suffix after your ComboBox input, use the [`suffixOptions`](/api/javascript/ui/combobox/configuration/suffixoptions). `suffixOptions` provides the following options:

* `Icon`&mdash;Adds an icon after the ComboBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the ComboBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to add an icon as a suffix of the ComboBox component.

```dojo
    <select id="cities"></select>
    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { CityID: 1, CityName: "Lisboa" },
                { CityID: 2, CityName: "Moscow" },
                { CityID: 3, CityName: "Napoli" },
                { CityID: 4, CityName: "Tokyo" },                
            ]
        });

        $("#cities").kendoComboBox({
            suffixOptions: {
                icon: "copy"
            },        
            filter: "contains",
            placeholder: 'Please select city...',
            dataTextField: "CityName",
            datavalueField: "CityID",
            dataSource: dataSource
        });
    </script>
```

## See Also

* [ComboBox Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/combobox/prefix-suffix)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)