---
title: Diagram Layout Is Different in the Exported PDF Files
page_title: The Diagram Layout in the Exported PDF Files Is Different
description: "Learn how to handle the Kendo UI for jQuery Diagram component when its layout is different in the exported PDF files."
slug: diagram_layout_different_pdf
tags: telerik, progress, kendoui, diagram, pdf, layout, different
type: troubleshooting
res_type: kb
component: diagram
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Diagram for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The layout of the exported Kendo UI for jQuery Diagram to PDF is different from the source.

## Cause  

Typically, such issues are caused by the different fonts that are used on screen and in the PDF. For display, the browser substitutes the selected font with whatever is provided by the system. During export, you take the metrics from the actual font in use and determine the PDF layout from that. It is likely that the resulting PDF is displayed with a different font which leads to layout and encoding issues.

## Solution

To handle this issue, [make the fonts available for embedding]({% slug pdfderawingexport_drawingapi %}#configuration-Custom), that is, the fonts have to be available as binary TTF files and registered for export. For a runnable example, refer to the [demo on PDF export in the Diagram](https://demos.telerik.com/kendo-ui/diagram/pdf-export).

```dojo
<button class='export-pdf k-button'>Save as PDF</button>

<div id="diagram"></div>

<script>
    // Import the DejaVu Sans font for embedding.

    kendo.pdf.defineFont({
        "DejaVu Sans"             : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans.ttf",
        "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
    });
</script>

<!-- Load the Pako ZLIB library to enable PDF compression. -->
<script src="//kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

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
                Use the DejaVu Sans font for displaying and embedding in the PDF file.
                The standard PDF fonts do not support Unicode characters.
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

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
