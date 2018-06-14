---
title: Exclude Navigator from Stock Chart Export
description: An example demonstrating how to export a Stock Chart without including its Navigator in the resulting file
type: how-to
page_title: Exclude Navigator from Stock Chart Export | Kendo Grid
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

I'm working on an application that uses the Kendo UI Stock Chart and would like to export it to a PNG file but don't want the Navigator to appear in the image.

## Solution

The described functionality can be implemented by hiding the navigator just before the export begins and then making it visible again after it has been exported. In order to maintain the navigator settings after it has been zoomed in or out, the [`select` method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/navigator/methods/select) of the navigator API is used to get the [`from`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/configuration/navigator.select#navigator.select.from) and [`to`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/configuration/navigator.select#navigator.select.to) values at the moment when the export is starting, and including them in the [`select` property](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/configuration/navigator.select) of the navigator using the `setOptions` method

```html
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
