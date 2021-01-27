---
title: Chart LTR, Labels RTL
description: An example on how to display the Chart left-to-right and the labels right-to-left.
type: how-to
page_title: Display Chart LTR with RTL Labels | Kendo UI Chart for jQuery
slug: chart-ltr-labels-rtl
tags: chart, ltr, rtl, labels,alignment
ticketid: 1493757
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Created with Product Version</td>
		<td>2019.2.514</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description

I am working on a project that contains a column Chart. Project requirements:

1. Label format align is  right to left
1. Chart is left to right

If I use the `k-rtl` class the chart also aligns itself right-to-left. How can I create a Kendo UI Chart that is left to right but its labels are right to left?

## Solution

The scenario is not a built-in one and to achieve it we need to override two things:

1. The svg text direction

  ```
      svg g > text {
        direction:rtl;
      }
  ```
  
1. The [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) attribute of the label. To change the text-anchor, we need to override the internal SVG `TextNode` function before the chart is initialized

  ```
    kendo.drawing.svg.TextNode.fn.renderTextAnchor = function(){
      return renderAttr("text-anchor", "end");
    }

    function renderAttr(name, value) {
      return (typeof value !== "undefined" && value !== null) ? (" " + name + "=\"" + value + "\" ") : "";
    }
  ```

The following example demonstrates how to apply the suggested approach to a Bar Chart series.

```dojo
    <style>
      svg g > text {
        direction:rtl;
      }
    </style>
    <div id="example">
      <div class="demo-section k-content wide">
        <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
      </div>
      <script>
        kendo.drawing.svg.TextNode.fn.renderTextAnchor = function(){
          return renderAttr("text-anchor", "end");
        }
        function renderAttr(name, value) {
          return (typeof value !== "undefined" && value !== null) ? (" " + name + "=\"" + value + "\" ") : "";
        }
        
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
              name: "India",
              data: [3.907, 7.943]
            }, {
              name: "Russian Federation",
              data: [4.743, 7.295]
            }],
            valueAxis: {
              labels: {
                format: "{0}%"
              },
              line: {
                visible: false
              },
              axisCrossingValue: 0
            },
            categoryAxis: {
              categories: ["תיאור התרא TRIPTYPE", "Emergency כמות אירועים באחוזים"],
              line: {
                visible: true
              },
              labels: {
                rotation: -13
              }
            },
            tooltip: {
              visible: true,
              format: "{0}%",
              template: "#= series.name #: #= value #"
            }
          });
      </script>
    </div>   
```