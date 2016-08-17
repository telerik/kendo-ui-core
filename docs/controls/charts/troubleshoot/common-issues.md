---
title: Common Issues
page_title: Common Issues | Kendo UI Charts
description: "Learn how to deal with issues you may encounter while using the Kendo UI Chart widget."
previous_url: /dataviz/troubleshooting
slug: troubleshooting_chart_widget
position: 1
---

# Common Issues

This page provides solutions for common problems related to the Kendo UI Charts.

## Rendering

### Chart Graphics Do Not Render in Internet Explorer

**Figure 1. Chart in the Internet Explorer with its graphics failing to render**

![Chart in IE](/styles-and-layout/chart-ie.png)

> **Important**
>
> A security message suggesting that you enable the Intranet settings might appear. If you choose to do so, then you do not need to follow the steps below.

**Solution**

Select **Internet Options** > **Security** > **Internet** (or **Local intranet**) > **Custom Level**  and enable **Binary and script behaviors** by ticking the **Enable** radio button.

**Figure 2. Options and settings to apply to render the chart graphics**

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

## Export

### Layout Is Different in Exported PDF Files

Such issues are typically caused by the different fonts that are used on screen and in the PDF.

For display, the browser will substitute the selected font with whatever is provided by the system. During export, you will take the metrics from the actual font in use and determine the PDF layout from that. It is likely that the resulting PDF will be displayed with a different font, leading to layout and encoding issues.

**Solution**

The solution is to [make the fonts available for embedding]({% slug pdfderawingexport_drawingapi %}#configuration-Custom). This means that the fonts should be available as binary TTF files and registered for export.

This is demonstrated in the [PDF Export demo on Charts](http://demos.telerik.com/kendo-ui/pdf-export/index) as well.

The example below demonstrates how to embed fonts in exported PDF.

###### Example

```html
<button class='export-pdf k-button'>Save as PDF</button>

<div id="chart"></div>

<script>
    // Import DejaVu Sans font for embedding

    kendo.pdf.defineFont({
        "DejaVu Sans"             : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
        "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
    });
</script>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="//kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

<script>
     $(".export-pdf").click(function() {
         $("#chart").getKendoChart().saveAsPDF();
     });

     $("#chart").kendoChart({
        pdf: {
            fileName: "Kendo UI Chart Export.pdf",
            proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
        },
        title: {
            text: "Gross domestic product growth \n /GDP annual %/",
            font: "bold 16px 'DejaVu Sans'"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "area",
            area: {
                line: {
                    style: "smooth"
                }
            }
        },
        series: [{
            name: "India",
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        }, {
            name: "World",
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        }]
    });
</script>
```

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})

Other articles on troubleshooting:

* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
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
