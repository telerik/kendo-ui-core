---
title: Apply Chart Settings for Exported PDF Only
page_title: Apply Chart Settings for Exported PDF Only
description: "Learn how to apply changes, visible only in the exported PDF."
previous_url: /controls/charts/how-to/pdf-save-chart-with-different-settings, /charts/how-to/export/pdf-save-chart-with-different-settings
slug: howto_apply_settings_for_PDF_only_charts
tags: chart, apply, settings, for, exported, pdf, only
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I apply changes that are visible in the Chart content that is exported in PDF?   

## Solution

1. Create a empty `div` element that will be used to generate the Chart with the desired options on the export
2. Generate the new Chart with the desired options
3. In the [`render`](api/javascript/dataviz/ui/chart/events/render) event export the new Char with the [`saveAsPDF()`](/api/javascript/dataviz/ui/chart/methods/saveaspdf) method
4. Remove the new Chart from the DOM with [`destroy()`](/api/javascript/dataviz/ui/chart/methods/destroy) method and remove the div element.

The following example demonstrates how to achieve this behavior.

```dojo
<style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <div id="example">
      <div class="box wide">
        <h4>Export chart</h4>
        <div class="box-col">
          <button class='export-pdf k-button'>Save as PDF</button>
        </div>
      </div>
      <div class="demo-section k-content wide">
        <div id="chart"></div>
      </div>
      <script>
        $(".export-pdf").click(function() {
          var container = $('<div />').css({
            position: 'absolute',
            top: 0,
            left: -1500
          }).appendTo('body');

          function cleanup() {
            container.getKendoChart().destroy();
            container.remove();
          }

          createChart(container, {
            // Custom settings for export
            legend: {
              visible: true
            },
            transitions: false,

            // Cleanup
            render: function(e){
              e.sender.saveAsPDF();
              setTimeout(cleanup, 500);
            }
          });
        });

        function createChart(container, exportOptions) {
          var options = {
            pdf: {
              fileName: "Kendo UI Chart Export.pdf",
              proxyURL: "//demos.telerik.com/kendo-ui/service/export"
            },
            title: {
              text: "Gross domestic product growth \n /GDP annual %/",
              font: "bold 16px 'DejaVu Sans'"
            },
            legend: {
              visible: false,
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
              categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
              majorGridLines: {
                visible: false
              }
            },
            tooltip: {
              visible: true,
              format: "{0}%",
              template: "#= series.name #: #= value #"
            }
          };

          options = $.extend(true, options, exportOptions);
          container.kendoChart(options);
        }

        $(document).ready(createChart($('#chart')));
      </script>

      <script>
        // Import DejaVu Sans font for embedding

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. cdn.kendostatic.com
        kendo.pdf.defineFont({
          "DejaVu Sans"             : "//kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans.ttf",
          "DejaVu Sans|Bold"        : "//kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
          "DejaVu Sans|Bold|Italic" : "//kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
          "DejaVu Sans|Italic"      : "//kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
      </script>

      <!-- Load Pako ZLIB library to enable PDF compression -->
      <script src="//kendo.cdn.telerik.com/2016.2.504/js/pako_deflate.min.js"></script>

    </div>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
