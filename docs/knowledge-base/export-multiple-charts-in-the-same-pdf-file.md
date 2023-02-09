---
title: Export Multiple Charts in the Same PDF File
description: "Learn how to export multiple Kendo UI Charts in the same PDF file."
type: how-to
page_title: Export Multiple Charts in the Same PDF File - Kendo UI Grid for jQuery
slug: export-multiple-charts-in-the-same-pdf-file
tags: kendo ui, jquery, pdf, multiple, charts, same, file
ticketid: 1131735
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I export many Charts in the same PDF file?

## Solution

1. Add a wrapper element for all Charts.
1. Convert the wrapper to a Drawing API scene by using the [`drawDOM`](/api/javascript/drawing/methods/drawdom) method.
1. Render the result as a PDF file with the [`exportPDF`](/api/javascript/drawing/methods/exportpdf) method.
1. Save the file with the [`saveAs`](/api/javascript/kendo/methods/saveas) method.

```dojo
    <div class="demo-section wide">
      <button id="exportCharts">Export Charts</button>

      <div class="content-wrapper">
        <div id="column-chart"></div>
        <div id="donut-chart"></div>
        <div id="bar-chart"></div>
        <div id="stock-chart"></div>
      </div>
    </div>

    <script>
      function createChart() {
        $("#column-chart").kendoChart({
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/properties-sales.json",
                dataType: "json"
              }
            },
            sort: {
              field: "year",
              dir: "asc"
            }
          },
          title: {
            text: "Sales by Product Category Over Time"
          },
          legend: {
            position: "bottom"
          },
          series:
          [{
            type: "column",
            field: "vacantLand",
            categoryField: "year",
            name: "Vacant Land",
          }, {
            type: "column",
            field: "residentialProperties",
            categoryField: "year",
            name: "Residential Properties",
          }, {
            type: "column",
            field: "commercialProperties",
            categoryField: "year",
            name: "Commercial Properties",
          }, {
            type: "line",
            field: "total",
            categoryField: "year",
            name: "Total Sales",
            axis: "axis",
            color: "red"
          }],
          categoryAxis: {
            axisCrossingValue: [0, 10],
          },
          valueAxis: [
            {
              title: {
                text: "Sales"
              }
            },
            {
              name: "axis",
              title: {
                text: "Total sales"
              }
            }],
          tooltip: {
            visible: true,
          }
        });

        $("#donut-chart").kendoChart({
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/sales-per-region.json",
                dataType: "json"
              }
            }
          },
          title: {
            position: "top",
            text: "2019 Sales per Region",
            margin: { bottom: 25 }
          },
          legend: {
            visible: false
          },
          chartArea: {
            background: "transparent"
          },
          seriesDefaults: {
            type: "donut",
            startAngle: 300
          },
          series: [{
            field: "sales",
            categoryField: "region",
            visibleInLegendField: "visibleInLegend",
            padding: 40,
            startAngle: 270,
            labels: {
              visible: true,
              position: "outsideEnd",
              background: "transparent",
              template: "#= category #: \n #= value#%"
            }
          }],
          tooltip: {
            visible: true,
            template: "#= category #: #= value #%"
          }
        });

        $("#bar-chart").kendoChart({
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/sales-performers.json",
                dataType: "json"
              }
            },
            sort: {
              field: "salesAmount",
              dir: "asc"
            }
          },
          title: {
            text: "Top 5 Sales Performers"
          },
          legend: {
            visible: false
          },
          seriesDefaults: {
            type: "bar"
          },
          series:
          [{
            field: "salesAmount",
            categoryField: "salesPerson",
            name: "Sales amount",
            gap: 1
          }],
          categoryAxis: {
            majorGridLines: {
              visible: false
            }
          },
          tooltip: {
            visible: true,
          }
        });

        $("#stock-chart").kendoStockChart({
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
            text: "Company Stocks"
          },
          dateField: "Date",
          series: [{
            type: "candlestick",
            openField: "Open",
            highField: "High",
            lowField: "Low",
            closeField: "Close",
          }],
          categoryAxis: {
            labels: {
              rotation: "auto"
            }
          },
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
      
      $("#exportCharts").kendoButton({
        click: exportCharts
      });

      function exportCharts() {
        kendo.drawing.drawDOM($(".content-wrapper"))
          .then(function (group) {
          // Render the result as a PDF file
          return kendo.drawing.exportPDF(group, {
            paperSize: "auto",
            margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
          });
        })
          .done(function (data) {
          // Save the PDF file
          kendo.saveAs({
            dataURI: data,
            fileName: "multiChartPdf.pdf",
          });
        });
      }

    </script>
    <style>
      #donut-chart {
        flex-basis: 45%;
        margin: 0 20px 0 20px;
        background: center no-repeat url('https://demos.telerik.com/kendo-ui/content/shared/styles/world-map.png');
        background-size: contain;
      }
    </style>
```

* [JavaScript API Reference of the Chart](/api/javascript/ui/chart)
