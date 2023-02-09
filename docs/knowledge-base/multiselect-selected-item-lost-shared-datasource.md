---
title: Selected MultiSelect Item Is Lost When Bound to Shared Data Source
page_title: Selected MultiSelect Item Is Lost When Bound to Shared Data Source
description: "Learn how to handle the Kendo UI for jQuery MultiSelect if the selected item gets lost when it is bound to a shared data source."
previous_url: /controls/editors/multiselect/troubleshooting/troubleshooting, /controls/editors/multiselect/troubleshooting
slug: troubleshooting_common_issues_multiselect_kendoui
tags: telerik, progress, kendoui, jquery, multiselect, selected, item, lost, when, bound, to, sared, datasource
type: troubleshooting
res_type: kb
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
  <td>Progress® Kendo UI® DataSource for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The selected item in the jQuery MultiSelect gets lost when bound to a shared data source.

## Cause

This behavior is expected. The selected item of the component is directly related to the data source view and if it does not contain the selected item, then the widget removes its current value.

## Solution

To handle this issue, use separate data sources. The following example demonstrates a sample issue.

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


## See Also

* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
