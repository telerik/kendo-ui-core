---
title: Achieve RTL Alignment by Using the Drawing API
page_title: Achieve RTL Alignment by Using the Drawing API | Kendo UI Charts
description: "Learn how to set an RTL alignment to a Kendo UI Chart widget."
previous_url: /controls/charts/how-to/set-rtl-alignment
slug: howto_setrtlalignment_charts
---

# Achieve RTL Alignment by Using the Drawing API

Currently, the Kendo UI widgets for data visualization do not provide official [right-to-left (RTL) support]({% slug right_toleft_languages_accessibility_support %}).

However, you can achieve a similar outcome in a Kendo UI Chart by using the [Drawing API]({% slug overview_kendoui_drawingapi %}), as demonstrated in the example below.

###### Example

```html
    <div id="chart" style="width: 200px;"></div>
    <script>
      var index = 0;

      $("#chart").kendoChart({                
        legend: {
          visible: true,
          position: "bottom",
          align: "end",
          item: {

            visual: function (e)
            {
              var color = e.options.markers.background;
              var labelColor = e.options.labels.color;
              var rect = new kendo.geometry.Rect([0, 0], [150, 50]);
              var index = e.pointIndex;

              var layout = new kendo.drawing.Layout(rect, {
                spacing: 5,
                justifyContent: "end"
              });

              var marker = new kendo.drawing.Path({
                fill: {
                  color: color
                },
                stroke: {
                  color: "none"
                }
              }).moveTo(10, 0).lineTo(10, 10).lineTo(0, 10).lineTo(0, 0).close();



              var label = new kendo.drawing.Text(e.series.data[index].category, [0, 0], {
                fill: {
                  color: labelColor
                }
              });

              layout.append(label, marker);
              layout.reflow()

              var overlay = kendo.drawing.Path.fromRect(new kendo.geometry.Rect([0, 0], [150, 20]), {
                fill: {
                  color: "#fff",
                  opacity: 0
                },
                stroke: {
                  color: "none"
                },
                cursor: "pointer"
              });
              layout.append(overlay);

              return layout;
            }
          }
        },
        seriesDefaults: {
          labels: {
            visible: false,
            background: "transparent",
            template: "#= category #: #= value#%"
          }
        },
        series: [{
          type: "pie",
          startAngle: 150,
          data: [{
            category: "Asia",
            value: 53.8,
            color: "#9de219"
          },{
            category: "Europe",
            value: 16.1,
            color: "#90cc38"
          },{
            category: "Latin America",
            value: 11.3,
            color: "#068c35"
          },{
            category: "Africa",
            value: 9.6,
            color: "#006634"
          },{
            category: "Middle East",
            value: 5.2,
            color: "#004d38"
          },{
            category: "North America",
            value: 3.6,
            color: "#033939"
          }]
        }],
        title: {
          text: "Chart title",
          align: "right"
        },
        tooltip: {
          visible: false,
          format: "{0}%"
        }
      });

    </script>
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

For more runnable examples on the Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
