---
title: Show Tooltip for Chart Notes
page_title: Show Tooltip for Chart Notes | Kendo UI Charts
description: "Learn how to show tooltips for Chart notes."
slug: howto_showtooltipfornotes_charts
---

# Show Tooltip for Chart Notes

The example below demonstrates how to attach a [Kendo UI Tootlip](/api/javascript/ui/tooltip) to Chart notes and display it when a [note is hovered](/api/javascript/dataviz/ui/chart#events-noteHover).

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

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
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
