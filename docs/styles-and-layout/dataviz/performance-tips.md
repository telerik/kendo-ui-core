---
title: Performance tips
page_title: Performance guide for Kendo UI DataViz
description: Find valuable tips for making the most performance out of the Kendo UI DataViz suite.
---

# Use Canvas rendering

Switching to Canvas rendering will improve the performance, especially on mobile devices.

It's an excellent choice for fast-updating graphs that don't need animations and interactivity.

### Example configuration
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
                renderAs: "canvas",
                series: [{
                    type: "column",
                    data: [1, 2, 3]
                }]
            });
        });
    </script>

See also:

 - [renderAs](/api/dataviz/chart#configuration-renderAs)
 - [Notes on rendering](/dataviz/rendering)

# Turn off animated transitions

Animated transitions can slow the browser down, especially with many active charts on the page.

#### Example configuration
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
                series: [{
                    type: "column",
                    data: [1, 2, 3]
                }],
                transitions: false
            });
        });
    </script>

#### Initial animation only
    <div id="chart"></div>
    <script>
      $(function() {
        var src = new kendo.data.ObservableArray([
            { value: 1 }, { value: 2 }
        ]);

        $("#chart").kendoChart({
          dataSource: {
               data: src
          },
          series: [{
              type: "column",
              field: "value"
          }]
        });

        var chart = $("#chart").data("kendoChart");
        chart.options.transitions = false;

        // Subsequent updates won't be animated
        setTimeout(function() {
          src.push({ value: 3 });
        }, 2000);
      });
    </script>

# Disable gradients

Using solid fills instead of gradients can improve performance noticably.

### Example
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
                seriesDefaults: {
                  overlay: {
                    gradient: null
                },
                series: [{
                    type: "column",
                    data: [1, 2, 3]
                }],
                transitions: false
            });
        });
    </script>
