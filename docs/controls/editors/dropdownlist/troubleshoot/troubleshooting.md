---
title: Common Issues
page_title: Common Issues | Kendo UI DropDownList
description: "Learn how to handle possible issues while working with the Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/troubleshooting
slug: troubleshooting_common_issues_dropdownlist_kendoui
---

# Common Issues

This page provides solutions for common problems you may encounter while working with the Kendo UI DropDownList widget.

## DataSource

### Selected Item Is Lost When Bound to Shared DataSource

> **Important**
>
> This issue can also be observed in [Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %}) and [Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %}). The solution demonstrated in the examples below is fully applicable to the case of them both as well.

The selected item of the widget is directly related to the data source view. If it does not contain the selected item, then the widget will remove its current value. Such behavior is expected.

**Solution**

Use separate data sources.

The example below demonstrates a sample issue.

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoDropDownList({
        dataSource: ds
    });

    $("#ms2").kendoDropDownList({
        dataSource: ds
    });

The example below demonstrates the solution to the above issue.

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoDropDownList({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoDropDownList({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

### Repetitive Requests Are Performed while Filtering in ASP.NET

Repetitive requests performed by the Kendo UI DropDownList widget are caused by the response from the ASP.NET Web API Order controller.

**Solution**

The `total` configuration has to respond to the total number of records found after the filtering&mdash;that is, `dataResult.Count`. Otherwise, the widget continues requesting the remainder of the `total`.

The example below demonstrates how to change the service accordingly.

###### Example

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

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [Overview of the DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
* [Common Issues in Telerik UI for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/troubleshoot/troubleshooting)
* [Validation Issues in Telerik UI for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/troubleshoot/troubleshooting-validation)
* [Scaffolding Issues in Telerik UI for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/troubleshoot/troubleshooting-scaffolding)
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension](http://docs.telerik.com/aspnet-mvc/helpers/grid/troubleshoot/troubleshooting)
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension](http://docs.telerik.com/aspnet-mvc/helpers/grid/troubleshoot/excel-export-issues)
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension](http://docs.telerik.com/aspnet-mvc/helpers/spreadsheet/troubleshoot/troubleshooting)
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension](http://docs.telerik.com/aspnet-mvc/helpers/upload/troubleshoot/troubleshooting)
