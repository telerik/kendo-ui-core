---
title: Export
page_title: Export | Kendo UI Charts
description: "Set the export functionality of the Kendo UI Chart widget to produce PDF, SVG, and Images."
slug: exporting_kendoui_chart_widget
position: 6
---

# Export

The Kendo UI Charts enable you to export their content to PDF, SVG, or Image files.

There is no built-in UI for the exporting functionality. To initiate the export, use an API call.

## PDF Export

To initiate the export in PDF through code, call the [`saveAsPdf`](/api/javascript/dataviz/ui/chart#methods-saveAsPdf) method.

For more information on PDF export, refer to:

* [PDF Export API Configuration](/api/javascript/dataviz/ui/chart#configuration-pdf)
* [Online Demo](http://demos.telerik.com/kendo-ui/chart-api/pdf-export)

To enable compression, it is highly recommended that you include the [Pako Deflate library](https://github.com/nodeca/pako) in the page.

The example below demonstrates how to enable the PDF export functionality of a Kendo UI Chart.

###### Example

```html
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

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

The Chart allows you to retrieve Scalable Vector Graphics (SVG), Image (PNG) or PDF representation of its content as a `Base64`-encoded string. You are able to send this content to a service for further processing or to offer it as a file to the user.

For more information on how to do this, refer to the [online demo](http://demos.telerik.com/kendo-ui/chart-api/export).

The advanced export functionality is delivered though the following methods:

* [`exportPDF`](/api/javascript/dataviz/ui/chart#methods-exportPDF)
* [`exportImage`](/api/javascript/dataviz/ui/chart#methods-exportImage)
* [`exportSVG`](/api/javascript/dataviz/ui/chart#methods-exportSVG)

The example below demonstrates how to obtain an image from the Chart.

###### Example

```html
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

## Features

### Server Proxy

Internet Explorer 9 and Safari do not support the option for saving a file and require the implementation of a [server proxy]({% slug overview_savingfiles_kendoui %}#browser-support). Set the [`proxyURL`](/api/javascript/ui/grid#configuration-pdf.proxyURL) option to specify the server proxy URL, as shown below.

###### Example

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

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

### File Saving on Server

In some cases it is useful to send the generated file to a remote service. Do this by setting the `proxyUrl` and `forceProxy` to `true`.

If the proxy returns `204 No Content`, no **Save As...** dialog appears on the client.

The example below demonstrates how to post files to the server.

###### Example

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

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

### Custom Fonts Embedding

**Unicode Support**

The default fonts in PDF files do not support Unicode. To support international characters we need to embed an external font.

> **Important**
> * Fonts must be loaded by the browser before the Chart is initialized. It is usually sufficient to make use of the font on a portion of the page.
> * The Chart pre-loads automatically in browsers that support the [CSS Font Loading Module](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load).

Kendo UI ships the [Deja Vu font family](http://dejavu-fonts.org/wiki/Main_Page) as part of its distributions. For more details on the supported fonts by Kendo UI, refer to the article on [custom fonts and PDF]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom).

The example below demonstrates how to handle custom fonts by embedding a custom font for a Chart title.

###### Example

```html
    <script>
        // Import DejaVu Sans font for embedding.

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. kendo.cdn.telerik.com.
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
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

All [known limitations]({% slug drawingofhtmlelements_drawingapi %}#known-limitations) of the HTML Drawing module apply.

Below are listed the most important ones for you to note:

* The maximum document size is limited to 5080x5080mm (200x200 inches) by the PDF 1.5 specification. Larger files might not open in all viewers.
* Older browsers, such as Internet Explorer 9 and Safari, require the implementation of a server proxy. For more information on this, refer to [the `proxyUrl` configuration section](/api/javascript/ui/grid#configuration-pdf.proxyURL).
* PDF export is not supported in Internet Explorer 8 and older.

## Further Reading

* [Drawing HTML]({% slug drawingofhtmlelements_drawingapi %})
* [Save Files with Kendo UI]({% slug overview_savingfiles_kendoui %})

## See Also

Other articles on Kendo UI Charts:

* [Data Binding of the Chart Widgets]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)

For runnable examples on Kendo UI Charts, refer to the [how-to section of articles]({% slug howto_createdynamicplotbands_charts %}).
