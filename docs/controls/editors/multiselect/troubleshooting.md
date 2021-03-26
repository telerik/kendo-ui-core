---
title: Troubleshooting
page_title: jQuery MultiSelect Documentation | Troubleshooting
description: "Learn how to handle possible issues while working with the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/troubleshooting/troubleshooting
slug: troubleshooting_common_issues_multiselect_kendoui
position: 60
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Kendo UI MultiSelect widget.

## Data Source

* [The selected item is lost when bound to a shared data source](#the-selected-item-is-lost-when-bound-to-shared-datasource)
* [Repetitive requests are performed while filtering in ASP.NET](#repetitive-requests-are-performed-while-filtering-in-aspnet)

### The selected item is lost when bound to a shared data source

**Cause** This is expected behavior. The selected item of the widget is directly related to the data source view and if it does not contain the selected item, then the widget removes its current value.

**Solution** Use separate data sources.

The following example demonstrates a sample issue.

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoMultiSelect({
        dataSource: ds
    });

    $("#ms2").kendoMultiSelect({
        dataSource: ds
    });

The following example demonstrates the solution to the sample issue.   

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoMultiSelect({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoMultiSelect({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

### Repetitive requests are performed while filtering in ASP.NET

**Cause** Repetitive requests that are performed by the Kendo UI MultiSelect widget are caused by the response from the ASP.NET Web API Order controller.

**Solution** The `total` configuration has to respond to the total number of records that are found after filtering, that is, `dataResult.Count`. Otherwise, the widget continues to request the remainder of the `total`.

The following example demonstrates how to change the service accordingly.

```
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

* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
