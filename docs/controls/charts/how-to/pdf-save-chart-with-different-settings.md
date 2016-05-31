---
title: Apply Chart Settings for Exported PDF Only
page_title: Apply Chart Settings for Exported PDF Only | Kendo UI Charts
description: "Learn how to apply changes, visible only in the exported PDF."
slug: howto_apply_settings_for_PDF_only_charts
---

# Apply Chart Settings for Exported PDF Only

The example below demonstrates how to apply changes, visible only in the exported PDF.

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

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Shorten Chart Labels]({% slug howto_shortenchartlabels_charts %})
* [How to Show Message When Chart Has No Data]({% slug howto_showemptymessage_whencharthasnodata_charts %})
* [How to Show Overlay While Loading]({% slug howto_showoverlaywhileloading_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
