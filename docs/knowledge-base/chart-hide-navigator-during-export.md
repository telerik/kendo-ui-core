---
title: Exclude Navigator from Stock Chart Export
page_title: Exclude Navigator from Stock Chart Export | Kendo UI Grid for jQuery
description: An example on how to export a Kendo UI Stock Chart without including its navigator in the resulting file.
type: how-to
slug: chart-hide-navigator-during-export
tags: chart, navigator, hide, export, exclude, excel, pdf, image
ticketid: 1157749
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
	 <td>Product Version</td>
	 <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I export the Stock Chart to a `.png` file without exporting the navigator to the image?

## Solution

Right before the export begins, hide the navigator and make it visible again after the export completes.

To maintain the navigator settings after it was zoomed in or out:

1. Use the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/navigator/methods/select) method of the navigator to get the [`from`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/configuration/navigator.select#navigator.select.from) and [`to`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/configuration/navigator.select#navigator.select.to) values when the export starts.
1. Include the `from` and `to` values in the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/configuration/navigator.select) property of the navigator by using the `setOptions` method.

```dojo
<div id="example">
  <div class="box wide">
    <h4>Export Stock Chart</h4>
    <div class="box-col">
      <button class='export-image k-button'>Save as Image</button>
    </div>
  </div>
  <div class="demo-section k-content wide">
    <div id="stock-chart"></div>
  </div>
  <script>      
    $(".export-image").click(function() {
      var chart = $("#stock-chart").getKendoStockChart();          
      var navi = chart.navigator;
      var from = navi.select().from;
      var to = navi.select().to;

      chart.setOptions({ navigator: { visible: false, select: {from: from, to: to} } });
      setTimeout(function(){
        chart.exportImage().done(function(data) {
          kendo.saveAs({
            dataURI: data,
            fileName: "chart.png"
          });
        });
        chart.setOptions({ navigator: { visible: true, select: {from: from, to: to} } });
      }, 1000);
    });
    function createChart() {
      $("#stock-chart").kendoStockChart({
        pdf: {
          fileName: "Kendo UI Stock Chart Export.pdf",
          proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/boeing-stock.json",
              dataType: "json"
            }
          },
          schema: {
            model: {
              fields: {
                Date: { type: "date" }
              }
            }
          }
        },
        title: {
          text: "The Boeing Company\nNYSE:BA"
        },
        dateField: "Date",
        panes: [{
          title: "Value"
        }],
        categoryAxis: {
          pane: "volumePane"
        },
        valueAxes: [{
          line: {
            visible: false
          }
        }],
        series: [{
          type: "candlestick",
          openField: "Open",
          highField: "High",
          lowField: "Low",
          closeField: "Close"
        }],
        navigator: {
          series: {
            type: "area",
            field: "Close"
          },
          select: {
            from: "2009/02/05",
            to: "2011/10/07"
          }
        }
      });
    }
    $(document).ready(createChart);
    $(document).bind("kendo:skinChange", createChart);
  </script>
</div>
```
