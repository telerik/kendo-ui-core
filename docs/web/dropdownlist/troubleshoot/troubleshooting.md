---
title: Common Issues
page_title: Common Issues | Kendo UI DropDownList Troubleshooting
description: "Learn how to handle possible issues while working with the Kendo UI DropDownList widget."
slug: troubleshooting_common_issues_dropdownlist_kendoui
---

# Common Issues

This page provides solutions for common problems you may encounter while working with the Kendo UI DropDownList widget.

> **Important**  
> This issue can also be observed in [Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %}) and [Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %}). The solution demonstrated in the examples below is fully applicable to the case of them both as well.  

## DataSource

### Selected Item Loosed When Bound to Shared DataSource

The selected item of the widget is directly related to the data source view. If it does not contain the selected item, then the widget will remove its current value. This behavior is expected and the solution is to use separate data sources.

###### Example - an issue

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoDropDownList({
        dataSource: ds
    });

    $("#ms2").kendoDropDownList({
        dataSource: ds
    });

###### Example - the solution of the issue above

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoDropDownList({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoDropDownList({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });
    
## See Also

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI Scheduler](/web/scheduler/troubleshooting)
* [Common Issues in Kendo UI Upload](/web/upload/troubleshooting)
* [Common Issues in Widgets Rendering Data Visualization](/dataviz/troubleshooting)
* [Common Issues in Telerik UI for ASP.NET MVC](/aspnet-mvc/troubleshooting)
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/grid/troubleshooting)
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/upload/troubleshooting)