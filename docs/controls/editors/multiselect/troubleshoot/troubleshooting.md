---
title: Common Issues
page_title: Common Issues | Kendo UI MultiSelect
description: "Learn how to handle possible issues while working with the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/troubleshooting
slug: troubleshooting_common_issues_multiselect_kendoui
---

# Common Issues

This page provides solutions for common problems you may encounter while working with the Kendo UI MultiSelect widget.

> **Important**  
>
> This issue can also be observed in [Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %}) and [Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %}). The solution demonstrated in the examples below is fully applicable to the case of them both as well.

## DataSource

### Selected Item Loosed When Bound to Shared DataSource

The selected item of the widget is directly related to the data source view. If it does not contain the selected item, then the widget will remove its current value. This behavior is expected and the solution is to use separate data sources.

The example below demonstrates a sample issue.

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoMultiSelect({
        dataSource: ds
    });

    $("#ms2").kendoMultiSelect({
        dataSource: ds
    });

The example below demonstrates the solution to the above issue.   

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoMultiSelect({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoMultiSelect({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [Grouping Functionality]({% slug grouping_kendoui_multiselect_widget %})
* [Virtualization]({% slug virtualization_kendoui_multiselect_widget %})
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})

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
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
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
