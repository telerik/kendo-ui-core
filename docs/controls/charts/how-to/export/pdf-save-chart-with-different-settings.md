---
title: Apply Chart Settings for Exported PDF Only
page_title: Apply Chart Settings for Exported PDF Only | Kendo UI Charts
description: "Learn how to apply changes, visible only in the exported PDF."
previous_url: /controls/charts/how-to/pdf-save-chart-with-different-settings
slug: howto_apply_settings_for_PDF_only_charts
---

# Apply Chart Settings for Exported PDF Only

The Kendo UI Chart provides an option to apply changes that are visible in the content exported in PDF.   

The example below demonstrates how to achieve this behavior.

###### Example

```html
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
          "DejaVu Sans"             : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf",
          "DejaVu Sans|Bold"        : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
          "DejaVu Sans|Bold|Italic" : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
          "DejaVu Sans|Italic"      : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
      </script>

      <!-- Load Pako ZLIB library to enable PDF compression -->
      <script src="//kendo.cdn.telerik.com/2016.2.504/js/pako_deflate.min.js"></script>

    </div>
```

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
