---
title: Selected ComboBox Item Is Lost When Bound to a Shared Data Source
page_title: Selected ComboBox Item Is Lost When Bound to a Shared Data Source
description: "Learn how to handle the Kendo UI for jQuery Scheduler if the selected item of the component is lost when bound to a shared data source."
previous_url: /controls/editors/combobox/troubleshooting/troubleshooting, /controls/editors/combobox/troubleshooting
slug: troubleshooting_common_issues_combobox_kendoui
tags: telerik, progress, kendoui, combobox, selected, item, lost, when, bound, to, shared, datasource
type: troubleshooting
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

The selected jQuery ComboBox item is lost when it is bound to the shared DataSource.

## Cause

The selected item of the widget is directly related to the data source view. If it does not contain the selected item, then the widget will remove its current value. Such behavior is expected.

## Solution

To handle this issue, use separate data sources.

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


## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
