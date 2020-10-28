---
title: Export
page_title: jQuery Chart Documentation | Export
description: "Get started with the jQuery Chart by Kendo UI and set its export functionality to produce PDF, SVG, and Images."
previous_url: /controls/charts/chart/export
slug: exporting_kendoui_chart_widget
position: 3
---

# Export

The Chart enables you to export their content to PDF, SVG, or Image files.

## PDF Export

To initiate the export to PDF, call the [`saveAsPdf`](/api/javascript/dataviz/ui/chart/methods/saveaspdf) method. To enable compression, include the [Pako Deflate library](https://github.com/nodeca/pako) in the page.

For more information, refer to the following resources:

* [API configuration for exporting the Chart to PDF](/api/javascript/dataviz/ui/chart/configuration/pdf)
* [Exporting Charts to PDF (demo)](https://demos.telerik.com/kendo-ui/chart-api/pdf-export)

The following example demonstrates how to enable the PDF export functionality of the Chart.

```dojo
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

    <button class='export-pdf k-button'>Save as PDF</button>

    <div id="chart"></div>

    <script>
        $(".export-pdf").click(function() {
            $("#chart").getKendoChart().saveAsPDF();
        });

        function createChart() {
            $("#chart").kendoChart({
                pdf: {
                    fileName: "Kendo UI Chart Export.pdf"
                },
                title: {
                    text: "Gross domestic product growth \n /GDP annual %/"
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
                }, {
                    name: "Haiti",
                    data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
                }],
                valueAxis: {
                    labels: {
                        format: "{0}%"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: -10
                },
                categoryAxis: {
                    categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
                }
            });
        }

        $(document).ready(createChart);
    </script>
```

## Advanced Export

The Chart allows you to retrieve Scalable Vector Graphics (SVG), Image (PNG) or PDF representation of its content as a `Base64`-encoded string. You can send this content to a service for further processing or to offer it as a file to the user. For more information, refer to [this online demo](https://demos.telerik.com/kendo-ui/chart-api/export).

The advanced export functionality is delivered though the following methods:
* [`exportPDF`](/api/javascript/dataviz/ui/chart/methods/exportpdf)
* [`exportImage`](/api/javascript/dataviz/ui/chart/methods/exportimage)
* [`exportSVG`](/api/javascript/dataviz/ui/chart/methods/exportsvg)

The following example demonstrates how to obtain an image from the Chart.

```dojo
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            transitions: false,
            series: [{
                type: "column",
                data: [1, 2, 3]
            }, {
                type: "line",
                data: [2, 1, 3]
            }, {
                type: "area",
                data: [3, 1, 2]
            }]
        });

        var chart = $("#chart").getKendoChart();
        chart.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.png"
            });
        });
    </script>
```

## Using Server Proxy

Internet Explorer 9 and Safari do not support the saving of files and require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). To specify the URL of the server proxy, set the [`proxyURL`](/api/javascript/ui/grid/configuration/pdf.proxyurl) option.

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

    <button class='export-pdf k-button'>Save as PDF</button>

    <div id="chart"></div>

    <script>
        $(".export-pdf").click(function() {
            $("#chart").getKendoChart().saveAsPDF();
        });

        function createChart() {
            $("#chart").kendoChart({
                pdf: {
                    proxyURL: "/proxy"
                },
                title: {
                    text: "Gross domestic product growth \n /GDP annual %/"
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
                }, {
                    name: "Haiti",
                    data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
                }],
                valueAxis: {
                    labels: {
                        format: "{0}%"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: -10
                },
                categoryAxis: {
                    categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
                }
            });
        }

        $(document).ready(createChart);
    </script>

## Saving Files on the Server

To send the generated file to a remote service, set the `proxyUrl` and `forceProxy` to `true`. If the proxy returns `204 No Content`, the **Save As...** dialog will not appear on the client.

The following example demonstrates how to post files to the server.

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

    <button class='export-pdf k-button'>Save as PDF</button>

    <div id="chart"></div>

    <script>
        $(".export-pdf").click(function() {
            $("#chart").getKendoChart().saveAsPDF();
        });

        function createChart() {
            $("#chart").kendoChart({
                pdf: {
                    forceProxy: true,
                    proxyURL: "/proxy"
                },
                title: {
                    text: "Gross domestic product growth \n /GDP annual %/"
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
                }, {
                    name: "Haiti",
                    data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
                }],
                valueAxis: {
                    labels: {
                        format: "{0}%"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: -10
                },
                categoryAxis: {
                    categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
                }
            });
        }

        $(document).ready(createChart);
    </script>

## Embedding Custom Fonts

The default fonts in PDF files do not support Unicode. To support international characters, you have to embed an external font.

> * Fonts must be loaded by the browser before the Chart is initialized. It is usually sufficient to make use of the font on a portion of the page.
> * The Chart preloads automatically in browsers that support the [CSS Font Loading Module](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load).

Kendo UI ships the [Deja Vu font family](https://dejavu-fonts.github.io/) as part of its distributions. For more information, refer to the article on the [supported custom fonts by Kendo UI]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom).

The following example demonstrates how to handle custom fonts by embedding a custom font for a Chart title.

```dojo
    <script>
        // Import DejaVu Sans font for embedding.
        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. kendo.cdn.telerik.com.
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="//kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

    <button class='export-pdf k-button'>Save as PDF</button>

    <div id="chart"></div>

    <script>
        $(".export-pdf").click(function() {
            $("#chart").getKendoChart().saveAsPDF();
        });

        function createChart() {
            $("#chart").kendoChart({
                pdf: {
                    fileName: "Kendo UI Chart Export.pdf"
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
                }, {
                    name: "Haiti",
                    data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
                }],
                valueAxis: {
                    labels: {
                        format: "{0}%"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: -10
                },
                categoryAxis: {
                    categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
                }
            });
        }

        $(document).ready(createChart);
    </script>
```

## Known Limitations

All [known limitations of the Drawing library]({% slug drawingofhtmlelements_drawingapi %}#known-limitations) apply to the PDF export of the Chart.

The following limitations are the most important among the listed ones for exporting the Chart to PDF:

* The maximum document size is limited to 5080x5080mm (200x200 inches) by the PDF 1.5 specification. Larger files might not open in all viewers.
* Older browsers, such as Internet Explorer 9 and Safari, require the implementation of a server proxy. For more information, refer to the [`proxyUrl`](/api/javascript/ui/grid/configuration/pdf.proxyurl) API reference.

## Further Reading

* [Drawing HTML Elements with the Drawing Library]({% slug drawingofhtmlelements_drawingapi %})
* [Saving Files with Kendo UI]({% slug overview_savingfiles_kendoui %})

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
