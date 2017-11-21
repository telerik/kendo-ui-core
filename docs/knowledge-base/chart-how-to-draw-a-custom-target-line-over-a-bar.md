---
title: Draw a Custom Target Line Over a Bar
description: An Example on How to Draw a Custom Target Line Over a Bar
type: how-to
page_title: How to Draw a Custom Target Line Over a Bar
slug: chart-how-to-draw-a-custom-target-line-over-a-bar
tags: chart, bar, target,
ticketid: 1140477
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>11</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

We have a requirement to show target lines for each bar.

## Solution

1) The Built-in solution is the [Bullet Chart](http://demos.telerik.com/kendo-ui/bullet-charts/index)
  
2) Currently, making an individual line only over a single bar is achievable using [custom visuals](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-seriesDefaults.visual).

Please check the example demonstrating this:

````html
<div id="example">
      <div id="chart-mmHg"></div>
    </div>
    <script>
      function createChart() {
        var mmhgData = [{ name: "Trans", data: [
          { "current": 90, "target": 100},
          { "current": 95, "target": 99},
          { "current": 98, "target": 99},
          { "current": 99, "target": 100},
          { "current": 89, "target": 90},
          { "current": 91, "target": 100},
          { "current": 92, "target": 95},
          { "current": 100, "target": 100},
          { "current": 99, "target": 98},
          { "current": 100, "target": 100},
          { "current": 80, "target": 90} 
        ] },        
                        { name: "Switch Gear", data: 
                         [
                           { "current": 90, "target": 95},
                           { "current": 95, "target": 100},
                           { "current": 98, "target": 99},
                           { "current": 99, "target": 100},
                           { "current": 89, "target": 95},
                           { "current": 91, "target": 100},
                           { "current": 92, "target": 97},
                           { "current": 100, "target": 100},
                           { "current": 99, "target": 100},
                           { "current": 100, "target": 100},
                           { "current": 88, "target": 90}
                         ] }];

        console.log(mmhgData[0].data)

        $("#chart-mmHg").kendoChart({
          legend: {
            visible: false
          },
          seriesDefaults:{
            type: "column",
            currentField: "current",
            visual: function(e) {
              var visual = e.createVisual();
              var axis = e.sender.getAxis("value");
              var target = axis.slot(e.dataItem.target).origin.y;
              var path = new kendo.drawing.Path({ stroke: { width: 2, color: e.options.target.color } }).moveTo(e.rect.origin.x, target).lineTo(e.rect.topRight().x, target);
              visual.append(path);
              
              return visual;
            }

          },
          series: [{
            field: "current",
            name:mmhgData[0].name,
            data:mmhgData[0].data,
            targetField: "target",
            gap:10,
            target: {
              color: "orange"
            }
          }, {
            field: "current",
            name:mmhgData[1].name,
            targetField: "target",
            data:mmhgData[1].data,
            target: {
              color: "green"
            }
          }],
          categoryAxis: {
            categories: ['Jan', 'Feb', 'Mar','Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            majorGridLines: {
              visible: true
            },
            majorTicks: {
              visible: false
            },
            title: {
              text: "mmHg"
            }
          },
          valueAxis: [{
            name: "value",
            majorGridLines: {
              visible: false
            },
            minorTicks: {
              visible: true
            }
          }],
          tooltip: {
            visible: true,
            template: "Maximum: #= value.target # <br /> Average: #= value.current #"
          }
        });
      }

      $(document).ready(createChart);
      $(document).bind("kendo:skinChange", createChart);
    </script>
    </div>
````
