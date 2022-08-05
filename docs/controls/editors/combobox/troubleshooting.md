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

> This issue can also be observed in [Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %}). The solution demonstrated in the examples below is fully applicable to the case of them both as well.

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

**Cause** Repetitive requests that are performed by the Kendo UI ComboBox widget are caused by the response from the ASP.NET Web API Order controller.

**Solution** The total configuration has to respond to the total number of records that are found after filtering, that is, dataResult.Count. Otherwise, the widget continues to request the remainder of the total.

The following example demonstrates how to change the service accordingly.

```html
   public object Get(int? take = null, int? skip = null, string q = null)
    {
        List<OrderModel> dataResult = string.IsNullOrEmpty(q) ? Orders.Skip(skip ?? 0).Take(take ?? int.MaxValue).ToList() : Orders.Where(m => m.Name.Contains(q)).ToList();
        return new
        {
            total = dataResult.Count,
            data = dataResult
        };
    }
```

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
