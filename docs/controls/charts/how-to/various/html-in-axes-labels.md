---
title: Use HTML for Axes Labels
page_title: Use HTML for Axes Labels | Kendo UI Charts
description: "Learn how to use HTML for axes labels."
previous_url: /controls/charts/how-to/html-in-axes-labels
slug: howto_addhtmltoaxeslabels_charts
---

# Use HTML for Axes Labels

Your project might require you to use HTML for the `categoryAxis.labels` configuration.

The following example demonstrates how to achieve this through the [`visual`](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels.visual) option.

```dojo

    <div id="chart"></div>
    <script>
      var data = [{
        value: 1,
        category: "Alpha 1"
      },{
        value: 2,
        category: "Alpha 2"
      }, {
        value: 3,
        category: "Alpha 3"
      }, {
        value: 4,
        category: "Alpha 4"
      }, {
        value: 3,
        category: "Alpha 5"
      }, {
        value: 4,
        category: "Alpha 6"
      }];

      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        dataSource: {
          data: data
        },
        legend: {
          position: "top"
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          name: "Series Name",
          field: "value"
        }],
        valueAxis: {
          labels: {
            format: "{0}%"
          },
          line: {
            visible: false
          },
          axisCrossingValue: 0
        },
        categoryAxis: {
          field: "category",
          labels: {
            visual: function(e) {
              // Build an HTML fragment and append it to the body
              var html = $('<div>Category <b>' + e.text + '</b></div>')
              	.appendTo(document.body);

              // Create an empty group that will hold the rendered label
              var visual = new kendo.drawing.Group();

              // Store a reference to the target rectangle, see below
              var rect = e.rect;

              kendo.drawing.drawDOM(html)
							.done(function(group) {
                // Clean-up HTML fragment
                html.remove();

                // Center the label using Layout
                var layout = new kendo.drawing.Layout(rect, {
                  justifyContent: "center"
                });
                layout.append(group);
                layout.reflow();

                // Render the content
                visual.append(layout);
              });

              return visual;
            }
          }
        },
        tooltip: {
          visible: true,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        }
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
