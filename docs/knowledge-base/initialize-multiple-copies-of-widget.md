---
title: Initialize Multiple Instances of Kendo UI Widget
description: An example demonstrating how to initialize multiple copies of the same Kendo UI Widget without declaring all of its properties repeatedly
type: how-to
page_title: Initialize Multiple Instances of the Same Widget Without Repeating Declaration Code | Kendo UI 
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

I'm working on an application that uses a Kendo UI Chart named `zScoreChart`; is it possible to create a copy of the first Kendo chart instance, and not have to create another `$('#zScoreChart2').kendoChart({...})`? I want to avoid copying/pasting the kendo chart settings and adding repetitive lines of code. 

## Solution

Using jQuery's [Contains selector](https://api.jquery.com/attribute-contains-selector/) together with IDs that share a sub-string, it's possible to initialize multiple charts in multiple HTML elements without repeating code: 

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

The following sample implements the approach described above:

```html
<div class="demo-section k-content wide">
  <div id="chart1"></div>
  <div id="chart2"></div>
  <div id="chart3"></div>
</div>
<script>
  function createChart() {
    //Here we use jQuery's Contain Selector to get the three different dvi elements
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

* [jQuery Contains selector API Reference.](https://api.jquery.com/attribute-contains-selector/)
