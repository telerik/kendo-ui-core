---
title: Create Timeline Using Range Bars
page_title: Create Timeline Using Range Bars | Kendo UI Charts
description: "Learn how to display a daily timeline for two users in a Kendo UI Chart."
slug: howto_createtimeline_usingrangebars_charts
---

# Create Timeline Using Range Bars

This example demonstrates how to display a daily timeline for two users in a Kendo UI Chart.

> **Important**
> * The time of the day is represented as a time span, relative to a fixed date, e.g. 01.Jan.
> * Each slot has a unique ID.
> * The data source is grouped by ID to create one series per data item. This is important as normally a series can have only one data point per category.
> * Categories are bound to model fields.
> * Series spacing is set to -1 (-100%), so that series can line up with each other. Normally, they are rendered one below the other.
> * Value axis labels are formatted to display the time of the day and are spaced one hour apart.

###### Example

```html
    <div id="chart"></div>
    <script>
    var data = [{
        id: 1,
        user: "Jon",
        from: new Date("2014/01/01 11:30").getTime(),
        to: new Date("2014/01/01 14:45").getTime()
      }, {
        id: 2,
        user: "Joe",
        from: new Date("2014/01/01 09:30").getTime(),
        to: new Date("2014/01/01 09:45").getTime()
      }, {
        id: 3,
        user: "Joe",
        from: new Date("2014/01/01 10:00").getTime(),
        to: new Date("2014/01/01 10:15").getTime()
      }, {
        id: 4,
        user: "Joe",
        from: new Date("2014/01/01 12:00").getTime(),
        to: new Date("2014/01/01 14:00").getTime()
      }, {
        id: 5,
        user: "Joe",
        from: new Date("2014/01/01 15:15").getTime(),
        to: new Date("2014/01/01 15:30").getTime()
      }, {
        id: 6,
        user: "Joe",
        from: new Date("2014/01/01 15:45").getTime(),
        to: new Date("2014/01/01 16:00").getTime()
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data,
          group: {
            field: "id",
            dir: "desc"
          }
        },
        series: [{
          type: "rangeBar",
          fromField: "from",
          toField: "to",
          categoryField: "user",
          spacing: -1
        }],
        valueAxis: {
          min: new Date("2014/01/01 08:00").getTime(),
          max: new Date("2014/01/01 17:00").getTime(),
          majorUnit: 60 * 60 * 1000, // 60 minutes in milliseconds
          labels: {
            template: "#= kendo.toString(new Date(value), 'HH:mm') #"
          }
        },
        legend: {
          visible: false
        }
      });
  </script>
```

## See Also

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
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

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
