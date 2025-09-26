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


<div class="meta-api-description">
Customize and configure the chart’s plot area background by accessing and modifying the underlying drawing path or shape that forms the background visual element, enabling control over fills, strokes, shapes, and path segments to create custom backgrounds or effects; this includes inspecting and editing the graphical components used to render the plot area's backdrop, changing colors, patterns, or replacing the entire background with custom vector shapes, and adjusting visual elements programmatically to tailor the chart’s background appearance precisely.
</div>

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


<div class="meta-api-description">
customize plot area rendering control access drawing group for chart plot area modify visual element for chart drawing low-level graphic layer for chart area configure chart plot visuals enhance chart rendering customize hit-testing in chart plot adjust chart drawing group after initialization control graphic objects within chart plot area manipulate visual components of chart background rendering customize or override chart plot visuals for advanced drawing or interaction programming
</div>

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