---
title: ChartPlotArea
page_title: API reference for Kendo UI ChartPlotArea
res_type: api
---

# kendo.dataviz.ChartPlotArea

Represents a chart plot area.

## Fields

### backgroundVisual `kendo.drawing.MultiPath`

The drawing MultiPath used to draw the background.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        dataSource: {
            data: [
                { category: "A", value: 10 },
                { category: "B", value: 20 },
                { category: "C", value: 30 }
            ]
        },
        categoryAxis: {
            field: "category"
        },
        series: [{
            field: "value"
        }],
        render: function(e) {
            var chart = e.sender;
            var plotArea = chart.plotArea;
            
            // Access the background visual (MultiPath)
            console.log("Background visual:", plotArea.backgroundVisual);
            
            // Example: Change background color
            if (plotArea.backgroundVisual) {
                plotArea.backgroundVisual.stroke({
                    color: "#ff0000",
                    width: 2
                });
            }
        }
    });
    </script>

### visual `kendo.drawing.Group`

The drawing group used to draw the plot area.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        dataSource: {
            data: [
                { category: "A", value: 15 },
                { category: "B", value: 25 },
                { category: "C", value: 35 }
            ]
        },
        categoryAxis: {
            field: "category"
        },
        series: [{
            field: "value",
            type: "column"
        }],
        render: function(e) {
            var chart = e.sender;
            var plotArea = chart.plotArea;
            
            // Access the plot area visual (drawing Group)
            console.log("Plot area visual:", plotArea.visual);
            
            // Example: Add custom drawing to the plot area
            if (plotArea.visual) {
                var drawing = kendo.drawing;
                var rect = new drawing.Rect([0, 0], [50, 20]);
                var text = new drawing.Text("Custom", [10, 10]);
                
                plotArea.visual.append(rect, text);
            }
        }
    });
    </script>