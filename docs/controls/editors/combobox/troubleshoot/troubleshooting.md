---
title: Common Issues
page_title: Common Issues | Kendo UI ComboBox
description: "Learn how to handle possible issues while working with the Kendo UI ComboBox widget."
previous_url: /controls/editors/combobox/troubleshooting
slug: troubleshooting_common_issues_combobox_kendoui
---

# Common Issues

This page provides solutions for common issues you may encounter while working with the Kendo UI ComboBox widget.

> **Important**  
> This issue can also be observed in [Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %}) and [Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %}). The solution demonstrated in the examples below is fully applicable to the case of them both as well.

## DataSource

### Selected Item Loosed When Bound to Shared DataSource

The selected item of the widget is directly related to the data source view. If it does not contain the selected item, then the widget will remove its current value. This behavior is expected and the solution is to use separate data sources.

The example below demonstrates a sample issue.

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoComboBox({
        dataSource: ds
    });

    $("#ms2").kendoComboBox({
        dataSource: ds
    });

The example below demonstrates the solution to the above issue.   

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoComboBox({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoComboBox({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

## See Also

Other articles on Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [How to Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Declaratively Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
