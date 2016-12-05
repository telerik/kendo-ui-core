---
title: Show Tooltip for Chart Notes|
page_title: Show Tooltip for Chart Notes | Kendo UI Charts
description: "Learn how to show tooltips for Chart notes."
previous_url: /controls/charts/how-to/tooltip-for-chart-notes
slug: howto_showtooltipfornotes_charts
---

# Show Tooltip for Chart Notes

You can attach a [Kendo UI Tootlip](/api/javascript/ui/tooltip) to Kendo UI Chart notes and display it when a [note is hovered](/api/javascript/dataviz/ui/chart#events-noteHover).

The example below demonstrates how to achieve this behavior.

###### Example

```html

	<div class="chartWrapper" content="tooltipContent" >
      <div id="chart"></div>
    </div>
    <script>
       var grandSlam = [{
        "year": "2003",
        "win": 13,
        "extremum": "MIN: 13",
        "loss": 3
      },{
        "year": "2004",
        "win": 22,
        "loss": 1
      },{
        "year": "2005",
        "win": 24,
        "loss": 2
      },{
        "year": "2006",
        "win": 27,
        "extremum": "MAX: 27",
        "loss": 1
      },{
        "year": "2007",
        "win": 26,
        "loss": 1
      },{
        "year": "2008",
        "win": 24,
        "loss": 3
      },{
        "year": "2009",
        "win": 26,
        "loss": 2
      },{
        "year": "2010",
        "win": 20,
        "loss": 3
      },{
        "year": "2011",
        "win": 20,
        "loss": 4
      },{
        "year": "2012",
        "win": 19,
        "loss": 3
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: grandSlam
        },
        title: {
          text: "Roger Federer Grand Slam tournament performance"
        },
        legend: {
          position: "bottom"
        },
        seriesDefaults: {
          type: "line"
        },
        series: [{
          field: "win",
          name: "Wins",
          noteTextField: "extremum",
          notes: {
            label: {
              position: "outside"
            },
            position: "bottom"
          }
        },{
          field: "loss",
          name: "Losses"
        }],
        valueAxis: {
          line: {
            visible: false
          }
        },
        categoryAxis: {
          field: "year",
          majorGridLines: {
            visible: false
          }
        },
        tooltip: {
          visible: false,
          template: "#= series.name #: #= value #"
        },
        noteHover: onNoteHover
      });

      var tooltip = $(".chartWrapper").kendoTooltip({
        position: "top",
        showOn: "click",
        content: tooltipContent
      }).data("kendoTooltip");

      var noteValue = "";

      function tooltipContent(){
        return noteValue;
      }

      function onNoteHover(e){
        noteValue = e.value;
        tooltip.show(e.element);
      }
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

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
