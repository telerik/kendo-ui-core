---
title: Troubleshooting
page_title: jQuery ComboBox Documentation | Troubleshooting
description: "Get started with the jQuery ComboBox by Kendo UI and solve troubleshooting issues you might encounter while working with the widget."
previous_url: /controls/editors/combobox/troubleshooting/troubleshooting
slug: troubleshooting_common_issues_combobox_kendoui
position: 60
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Kendo UI ComboBox widget.

## The selected item is lost when it is bound to the shared DataSource

> This issue can also be observed in [Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %}) and [Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %}). The solution demonstrated in the examples below is fully applicable to the case of them both as well.

The selected item of the widget is directly related to the data source view. If it does not contain the selected item, then the widget will remove its current value. Such behavior is expected.

**Solution** Use separate data sources.

The following example demonstrates a sample issue.

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoComboBox({
        dataSource: ds
    });

    $("#ms2").kendoComboBox({
        dataSource: ds
    });

The following example demonstrates the solution to the above issue.

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoComboBox({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoComboBox({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

## Repetitive requests are performed while filtering in ASP.NET

For more information on handling repetitive requests performed while filtering in ASP.NET, refer to [this troubleshooting topic]({% slug troubleshooting_common_issues_dropdownlist_kendoui %}#repetitive-requests-are-performed-while-filtering-in-aspnet).

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
