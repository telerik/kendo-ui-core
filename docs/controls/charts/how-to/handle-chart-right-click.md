---
title: Handle right click in chart
page_title: Handle right click in chart
description: Handle right click in chart
---

# Handle right click in chart

The example below demonstrates how handle right click in Kendo UI Chart.

#### Example - Handle right click in Kendo UI Chart

```html
    <div id="chart"></div>
    <script>
       $("#chart").kendoChart({
          title: {
            text: "Gross domestic product growth /GDP annual %/"
          },
          legend: {
            position: "top"
          },
          seriesDefaults: {
            type: "column"
          },
          series: [{          
            name: "World",
            data: [1, 2, 3, 4, 5]
          }],         
          categoryAxis: {
            categories: [2002, 2003, 2004, 2005, 2006]
          }
        });

        $("#chart").on("contextmenu", function(e) {
          e.preventDefault();        
          $("#chart").getKendoChart()._click(e);
          	alert("Right clicked!");
        });
    </script>
```
