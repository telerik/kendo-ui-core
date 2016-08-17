---
title: Create Stock Charts in AngularJS
page_title: Create Stock Charts in AngularJS | Kendo UI Charts
description: "Learn how to create a Kendo UI Stock Chart by using AngularJS."
previous_url: /controls/charts/how-to/stock-chart-using-angular
slug: howto_createstockcharts_angularjs
---

# Create Stock Charts in AngularJS

The example below demonstrates how to create Kendo UI Stock Charts by using AngularJS.

> Use the "Open in Dojo" link to run the example separately and resolve any CORS-related issues.

###### Example

```html
<div id="example" ng-app="MyApp" ng-controller="MyCtrl">
  <div class="demo-section k-content">
    <div kendo-stock-chart k-data-source="dataSource"       
         k-date-field="dataField"
         k-series="series"
         k-category-axis="categoryAxis"
         k-navigator="navigator"
         k-title="title">
    </div>
  </div>
</div>
<script>
  angular.module("MyApp", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){

    $scope.dataSource = {
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/content/dataviz/js/boeing-stock.json",
          dataType: "json"
        }
      }
    };

    $scope.title = {
      text: "The Boeing Company \n (NYSE:BA)"
    };

    $scope.dataField = "Date";

    $scope.series = [{
      type: "candlestick",
      openField: "Open",
      highField: "High",
      lowField: "Low",
      closeField: "Close"
    }];

    $scope.navigator = {
      series: {
        type: "area",
        field: "Close"
      },
      select: {
        from: "2009/02/05",
        to: "2011/10/07"
      }
    };

    $scope.categoryAxis = {
      notes: {
        data: [{
          value: "2001/01/01",
          label: {
            text: "01"
          }
        }, {
          value: "2002/01/01",
          label: {
            text: "02"
          }
        }, {
          value: "2003/01/01",
          label: {
            text: "03"
          }
        }, {
          value: "2004/01/01",
          label: {
            text: "04"
          }
        }, {
          value: "2005/01/01",
          label: {
            text: "05"
          }
        }, {
          value: "2006/01/01",
          label: {
            text: "06"
          }
        }, {
          value: "2007/01/01",
          label: {
            text: "07"
          }
        }, {
          value: "2008/01/01",
          label: {
            text: "08"
          }
        }, {
          value: "2009/01/01",
          label: {
            text: "09"
          }
        }, {
          value: "2010/01/01",
          label: {
            text: "10"
          }
        }, {
          value: "2011/01/01",
          label: {
            text: "11"
          }
        }, {
          value: "2012/01/01",
          label: {
            text: "12"
          }
        }]
      }
    };

  });
</script>
```

## See Also

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
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
