---
title: Prefix and Suffix
page_title: jQuery MultiColumnComboBox Documentation - Prefix and Suffix
description: "Learn how to add custom items as prefix and suffix adornments to enhance the user interface interactivity when using the Kendo UI for jQuery MultiColumnComboBox."
slug: prefix_suffix_multicolumncombobox
position: 12
---

# Prefix and Suffix

You can improve the interactivity of the MultiColumnComboBox component by adding custom prefix and suffix adornments.

The prefix and suffix input adornments are elements positioned before and after the MultiColumnComboBox input element. You can use them to clarify the expected data in the input (for example, currency symbols or unit indicators) and provide direct functionality for the entered data (for example, password visibility toggles).

## Prefix

The prefix input adornment is located before the MultiColumnComboBox input field. It provides additional context to guide users when entering specific data, such as icons for currencies or unit indicators.

To add a prefix before your MultiColumnComboBox input, use the [`prefixOptions`](/api/javascript/ui/multicolumncombobox/configuration/prefixoptions) configuration. `prefixOptions` provides the following options:

* `Icon`&mdash;Inserts an icon before the MultiColumnComboBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content before the MultiColumnComboBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `prefixOptions.separator` option to `false` to remove the default separator of the prefix content. 

The following example demonstrates how to set an icon as a prefix of the MultiColumnComboBox component.

```dojo
    <input id="cities" />
    <script>
    $("#cities").kendoMultiColumnComboBox({
        dataTextField: "CityName",
        dataValueField: "CityID",
        dataSource: {
            data:  [
                { CityName: "Lisboa", CityID: "1" },
                { CityName: "Moscow", CityID: "2" },
                { CityName: "Napoli", CityID: "3" },
                { CityName: "Tokyo", CityID: "4" },
                { CityName: "Oslo", CityID: "5" }
            ]
        },
        columns: [
            { field: "CityName", title: "City Name" },
            { field: "CityID", title: "City ID" }
        ],
        prefixOptions: {
            icon: "map-marker-target"
        }
    });
    </script>
```
 

## Suffix

The suffix input adornment is located after the MultiColumnComboBox input field. Usually, it offers direct functionality related to the entered data, such as toggles for password visibility, formatting options, or the ability to clear the input.

To add a suffix after your MultiColumnComboBox input, use the [`suffixOptions`](/api/javascript/ui/multicolumncombobox/configuration/suffixoptions). `suffixOptions` provides the following options:

* `Icon`&mdash;Adds an icon after the MultiColumnComboBox element. The option accepts the name of an existing icon in the Kendo UI theme or SVG content.
* `Template`&mdash;Adds custom content after the MultiColumnComboBox element.
* `Separator`&mdash;By default, the separator is visible. Set the `suffixOptions.separator` option to `false` to remove the default separator of the suffix content. 

The following example demonstrates how to add an icon as a suffix of the MultiColumnComboBox component.

```dojo
    <input id="cities" />
    <script>
        $("#cities").kendoMultiColumnComboBox({
            dataTextField: "CityName",
            dataValueField: "CityID",
            dataSource: {
                data:  [
                    { CityName: "Lisboa", CityID: "1" },
                    { CityName: "Moscow", CityID: "2" },
                    { CityName: "Napoli", CityID: "3" },
                    { CityName: "Tokyo", CityID: "4" },
                    { CityName: "Oslo", CityID: "5" }
                ]
            },
            columns: [
                { field: "CityName", title: "City Name" },
                { field: "CityID", title: "City ID" }
            ],
            suffixOptions: {
                icon: "copy"
            }
        });
    </script>
```

## See Also

* [MultiColumnComboBox Prefix and Suffix (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/prefix-suffix)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)