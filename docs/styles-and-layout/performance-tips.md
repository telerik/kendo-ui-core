---
title: Tips and Tricks
page_title: Tips and Tricks | Kendo UI Styles and Appearance
description: "Learn the tips and tricks for improving the performance of the Kendo UI widgets rendering data visualization."
previous_url: /dataviz/performance-tips
slug: tipsandtricks_kendouistyling
position: 5
---

# Tips and Tricks

Below are some tips and tricks for improving the behavior of [Kendo UI Gauges, Charts, Barcodes, Diagrams, and Maps](http://demos.telerik.com/kendo-ui/).

## Performance Tips

### Use Canvas Rendering

Switching to Canvas rendering improves the performance of the widgets, especially on mobile devices. It facilitates the visualization of data by its fast update of graphs and that do not need animations and interactivity.

The example below demonstrates how to configure Canvas rendering.

###### Example

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

For more information on configuration settings, refer to the [`renderAs` API article](/api/dataviz/chart#configuration-renderAs).

### Turn Off Animated Transitions

Animated transitions can slow the browser down, especially if the page displays many active charts.

The example below demonstrates how to implement this approach.

###### Example

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

The example below demonstrates how to turn off the initial animation only.

###### Example

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

### Disable Gradients

Using solid fills instead of gradients improves performance noticeably.

The example below demonstrates how to disable gradients.

###### Example

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

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
