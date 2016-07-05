---
title: Common Issues
page_title: Common Issues | Kendo UI Diagram
description: "Learn how to deal with issues you may encounter while using the Kendo UI Diagram widget."
slug: troubleshooting_diagram_widget
position: 1
---

# Common Issues

This page provides solutions for common problems related to the Kendo UI Diagrams.

## Rendering

### Diagram Graphics Do Not Render in Internet Explorer

> **Important**
>
> A security message suggesting that you enable the Intranet settings might appear. If you choose to do so, then you do not need to follow the steps below.

**Solution**

Select **Internet Options** > **Security** > **Internet** (or **Local intranet**) > **Custom Level**  and enable **Binary and script behaviors** by ticking the **Enable** radio button.

**Figure 2. Options and settings to apply to render the chart graphics**

![IEscript behaviors](/styles-and-layout/chart-ie-script-behaviors.png)

## Export

### Layout Is Different in Exported PDF Files

Such issues are typically caused by the different fonts that are used on screen and in the PDF.

For display, the browser substitutes the selected font with whatever is provided by the system. During export, you take the metrics from the actual font in use and determine the PDF layout from that. It is likely that the resulting PDF is displayed with a different font, leading to layout and encoding issues.

**Solution**

The solution is to [make the fonts available for embedding]({% slug pdfderawingexport_drawingapi %}#configuration-Custom). This means that the fonts should be available as binary TTF files and registered for export.

This is demonstrated in the [PDF Export demo on Diagram](http://demos.telerik.com/kendo-ui/diagram/pdf-export) as well.

The example below demonstrates how to embed fonts in exported PDF.

###### Example

```html
<button class='export-pdf k-button'>Save as PDF</button>

<div id="diagram"></div>

<script>
    // Import DejaVu Sans font for embedding

    kendo.pdf.defineFont({
        "DejaVu Sans"             : "https://kendo.cdn.telerik.com/2016.1.112/styles/fonts/DejaVu/DejaVuSans.ttf",
        "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/2016.1.112/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/2016.1.112/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/2016.1.112/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
    });
</script>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="//kendo.cdn.telerik.com/2016.1.112/js/pako_deflate.min.js"></script>

<script>
    $(".export-pdf").click(function() {
        $("#diagram").getKendoDiagram().saveAsPDF();
    });

    function createDiagram() {
        var data = [{
            firstName: "Antonio",
            lastName: "Moreno",
            image: "antonio.jpg",
            title: "Team Lead",
            colorScheme: "#1696d3",
            items: [{
                firstName: "Elizabeth",
                image: "elizabeth.jpg",
                lastName: "Brown",
                title: "Design Lead",
                colorScheme: "#ef6944",
                items: [{
                    firstName: "Ann",
                    lastName: "Devon",
                    image: "ann.jpg",
                    title: "UI Designer",
                    colorScheme: "#ef6944"
                }]
            }, {
                firstName: "Diego",
                lastName: "Roel",
                image: "diego.jpg",
                title: "QA Engineer",
                colorScheme: "#ee587b",
                items: [{
                    firstName: "Fran",
                    lastName: "Wilson",
                    image: "fran.jpg",
                    title: "QA Intern",
                    colorScheme: "#ee587b"
                }]
            }, {
                firstName: "Felipe",
                lastName: "Izquiedro",
                image: "felipe.jpg",
                title: "Senior Developer",
                colorScheme: "#75be16",
                items: [{
                    firstName: "Daniel",
                    lastName: "Tonini",
                    image: "daniel.jpg",
                    title: "Developer",
                    colorScheme: "#75be16"
                }]
            }]
        }];

        function visualTemplate(options) {
            var dataviz = kendo.dataviz;
            var g = new dataviz.diagram.Group();
            var dataItem = options.dataItem;

            g.append(new dataviz.diagram.Rectangle({
                width: 210,
                height: 75,
                stroke: {
                    width: 0
                },
                fill: dataItem.colorScheme
            }));

            /*
                Use the DejaVu Sans font for display and embedding in the PDF file.
                The standard PDF fonts have no support for Unicode characters.
            */
            g.append(new dataviz.diagram.TextBlock({
                text: dataItem.firstName + " " + dataItem.lastName,
                fontFamily: "DejaVu Sans",
                fontSize: "14px",
                x: 10,
                y: 20,
                fill: "#fff"
            }));

            g.append(new dataviz.diagram.TextBlock({
                text: dataItem.title,
                fontFamily: "DejaVu Sans",
                fontSize: "14px",
                x: 10,
                y: 40,
                fill: "#fff"
            }));

            return g;
        }

        $("#diagram").kendoDiagram({
            dataSource: new kendo.data.HierarchicalDataSource({
                data: data,
                schema: {
                    model: {
                        children: "items"
                    }
                }
            }),
            layout: {
                type: "layered"
            },
            shapeDefaults: {
                visual: visualTemplate
            },
            connectionDefaults: {
                stroke: {
                    color: "#979797",
                    width: 2
                }
            }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
    }

    $(document).ready(createDiagram);
</script>
```

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
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
