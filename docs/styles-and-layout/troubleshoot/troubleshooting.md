---
title: Common Issues
page_title: Common Issues | Kendo UI Styles and Appearance
description: "Learn how to handle the common issues related to the styling and layout of the Kendo UI widgets."
previous_url: /dataviz/troubleshooting
slug: commonissues_troubleshooting_kendouistyling
position: 7
---

# Common Issues

This page provides solutions for common problems related to the styling and appearance of Kendo UI widgets.

## Charts

### Chart Graphics Do Not Render in Internet Explorer

![Chart in IE](/styles-and-layout/chart-ie.png)

> **Important**
>
> A security message suggesting that you enable the Intranet settings might appear. If you choose to do so, then you do not need to follow the steps below.

**Solution**

Select **Internet Options** > **Security** > **Internet** (or **Local intranet**) > **Custom Level**  and enable **Binary and script behaviors** by ticking the **Enable** radio button.

![IEscript behaviors](/styles-and-layout/chart-ie-script-behaviors.png)

### Chart Does Not Render with JavaScript Disabled

The Kendo UI Chart widgets requires JavaScript to run.

**Solution**

Enable JavaScript.

### Chart Does Not Render on Mobile Device or Tablet

The browser must support SVG as the below ones do:

1.  iOS Safari 3.2 and later versions
2.  Opera Mobile 10.0 and later versions
3.  Android 3.0 and later versions

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Tips and Tricks]({% slug tipsandtricks_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/mobile/styling)

Other articles on troubleshooting:

* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues in Telerik UI for ASP.NET MVC](/aspnet-mvc/troubleshooting)
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/grid/troubleshooting)
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/upload/troubleshooting)
