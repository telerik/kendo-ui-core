---
title: Initialize Multiple Instances of Kendo UI Widgets
description: An example on how to initialize multiple copies of the same Kendo UI widget without repeatedly declaring all of its properties.
type: how-to
page_title: Initialize Multiple Instances of the Same Widget without Repeating Declaration Code | Kendo UI Grid for jQuery
slug: initialize-multiple-copies-of-widget
tags: initialize, multiple, copies, widget, declare, instance, initialization, declaration, copying, control
ticketid: 1168945
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

My application uses a Kendo UI Chart that is named `zScoreChart`.

How can I:
* Create a copy of the first Chart instance without having to create another `$('#zScoreChart2').kendoChart({...})`?
* Avoid copying and pasting the Chart settings, and adding repetitive lines of code?

## Solution

Use the [`Contains`](https://api.jquery.com/attribute-contains-selector/) jQuery selector together with IDs that share a sub-string.

```
<div>
   <div id="chart1"></div>
   <div id="chart2"></div>
   <div id="chart3"></div>
</div>
<script>
   $("div[id*=chart]").kendoChart({
         ...
   });
</script>
```

The following example demonstrates the full implementation of the suggested approach.

```dojo
<div class="demo-section k-content wide">
  <div id="chart1"></div>
  <div id="chart2"></div>
  <div id="chart3"></div>
</div>
<script>
  function createChart() {
    // Use the Contains jQuery selector to get the three different div elements.
    $("div[id*=chart]").kendoChart({
      title: {
        text: "Site Visitors Stats \n /thousands/"
      },
      legend: {
        visible: false
      },
      seriesDefaults: {
        type: "bar"
      },
      series: [{
        name: "Total Visits",
        data: [56000, 63000, 74000, 91000, 117000, 138000]
      }, {
        name: "Unique visitors",
        data: [52000, 34000, 23000, 48000, 67000, 83000]
      }],
      valueAxis: {
        max: 140000,
        line: {
          visible: false
        },
        minorGridLines: {
          visible: true
        },
        labels: {
          rotation: "auto"
        }
      },
      categoryAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        majorGridLines: {
          visible: false
        }
      },
      tooltip: {
        visible: true,
        template: "#= series.name #: #= value #"
      }
    });
  }

  $(document).ready(createChart);
  $(document).bind("kendo:skinChange", createChart);
</script>
```

## See Also

* [API of the Contains jQuery Selector](https://api.jquery.com/attribute-contains-selector/)
