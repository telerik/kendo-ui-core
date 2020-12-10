---
title: Add z-index to series of a Chart
page_title: Add z-index to series of a Chart | Kendo UI Chart for jQuery
description: An example on how to show a marker of a Chart over the other series.
type: how-to
slug: chart-z-index
tags: chart, z-index
ticketid: 1492618
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
	 <td>Product Version</td>
	 <td>2020.3.1118</td>
 </tr>
</table>

## Description

How can I change the default stacking order of series in Chart?

## Solution

1. On dataBound, execute a JavaScript function for setting the options of the series.
2. Iterate by series.
3. Conditionally set the [`z-index`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.zindex) to the required series.

```dojo
<div id="content" class="k-content">
      
            <div id="chart2"
                 data-role="chart"
                 data-chart-area="{height: 200, width: 500, margin:{top: 10, right: 20, bottom: 20, left: 20}}"
                 data-series-defaults="{ type: 'line', style: 'smooth' }"
                 data-legend="{ visible: false }"
                 data-value-axis="{name: 'valueAxis', labels: {format: '{0:n0}'}, axisCrossingValues: [0, -100000000]}"
                 data-category-axis="[{name: 'lineOnZero', labels:{visible:false}}, {name: 'lineOnBottom', baseUnit: 'days', labels:{step: 15}, majorGridLines:{visible:true, step: 15}, crosshair:{visible: true}, justified:true}]"
                 data-series="[
                             { field: 'ActualBalance', categoryField: 'ValueDate', categoryAxis: 'lineOnBottom'},
                             { field: 'ForecastBalance', categoryField: 'ValueDate', categoryAxis: 'lineOnBottom'}
                         ]"
                 data-bind="source: dataSource2, events: { dataBound: onDataBound }"
                 data-auto-bind="false">
            </div>
    </div>
    <script>

var chartData = {
    "AsAtDate": "2020-10-27T00:00:00Z",
    "ChartData2": [
        {
            "ValueDate": "2020-07-07T00:00:00Z",
            "ActualBalance": 38171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-07-10T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-08-07T00:00:00Z",
            "ActualBalance": 24171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-08-17T00:00:00Z",
            "ActualBalance": 20171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-08-07T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-09-07T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-07T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-08T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-09T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null,
          	"Note": "Warning" // This marker should be on top of any other markers
        },
        {
            "ValueDate": "2020-10-10T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-11T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-12T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-13T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-14T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-15T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-26T00:00:00Z",
            "ActualBalance": 28171.9900,
            "ForecastBalance": null
        },
        {
            "ValueDate": "2020-10-27T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 27090.1300
        },
        {
            "ValueDate": "2020-10-30T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 27926.8200
        },
        {
            "ValueDate": "2020-11-01T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 30661.8200
        },
        {
            "ValueDate": "2020-11-02T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 30602.2800
        },
        {
            "ValueDate": "2020-11-04T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 32902.2800
        },
        {
            "ValueDate": "2020-11-05T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 36402.2800
        },
        {
            "ValueDate": "2020-11-06T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 36398.6800
        },
        {
            "ValueDate": "2020-11-08T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 36308.6800
        },
        {
            "ValueDate": "2020-11-10T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 37451.1800
        },
        {
            "ValueDate": "2020-11-11T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 33071.1800
        },
        {
            "ValueDate": "2020-11-12T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 36514.8300
        },
        {
            "ValueDate": "2020-11-16T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 38314.8300
        },
        {
            "ValueDate": "2020-11-18T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 15914.8300
        },
        {
            "ValueDate": "2020-11-19T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 15734.8300
        },
        {
            "ValueDate": "2020-11-23T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": 3710.8300
        },
        {
            "ValueDate": "2020-11-24T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -1989.1700
        },
        {
            "ValueDate": "2020-11-26T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -1539.1700
        },
        {
            "ValueDate": "2020-11-27T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -2720.4200
        },
        {
            "ValueDate": "2020-12-15T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -2720.4200
        },
        {
            "ValueDate": "2020-12-30T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -2720.4200
        },
        {
            "ValueDate": "2021-01-05T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -2720.4200
        },
        {
            "ValueDate": "2021-01-07T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -2720.4200
        },
        {
            "ValueDate": "2021-01-27T00:00:00Z",
            "ActualBalance": null,
            "ForecastBalance": -2720.4200
        }
    ]
};

     
      var chartDs2 = new kendo.data.DataSource({
    data: chartData,
    schema: {
        data: "ChartData2",
        total: function (response) {
            return response.ChartData2.length;
        }
    },
    isRequestSent1: false,
    isRequestSent2: false,
    requestEnd: function (e) {
        if (e.type === "read" && e.response) {
            var data = e.response;
            this.chartData2 = data.ChartData2;
            this.isRequestSent1 = true;
            this.isRequestSent2 = true;
        }
    },
	  group: {
	    field: "GroupName",
	    dir: "asc"
    },
	  sort: {
	    field: "Order",
	    dir: "asc"
	  }
});
var setMarkers = function (series) {
  for (var i = 0; i < series.length; i++) {
    
    if (series[i].data[0]) {
        series[i].markers = {
        size: function (e) {
	                        if (e.dataItem.Note) {
	                            return 20;
	                        } else {
	                            return 8;
	                        }
	                    },
        zIndex: function (e) {
	                        if (e.dataItem.Note) {
	                            return 2;
	                        } else {
	                            return 1;
	                        }
	                    }
      }
    }
  }
}
var viewModel = new kendo.data.ObservableObject({
    dataSource2: chartDs2,
    getChartData: function () {

      chartDs2.read().then(function () {
            var chart2 = $("#chart2").data("kendoChart");
            chart2.refresh();
        });
    },
  onDataBound: function(e){
    var chart = e.sender;
    setMarkers(chart.options.series);
  }
});
kendo.bind($("#content"), viewModel);
viewModel.getChartData();
    </script>
```
