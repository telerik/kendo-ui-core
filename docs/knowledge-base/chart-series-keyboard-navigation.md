---
title: Add Keyboard Navigation to Chart Series
page_title: Add Keyboard Navigation to Chart Series - Kendo UI Chart for jQuery
description: "An example demonstrating how to implement custom keyboard navigation to the Kendo UI Chart series."
type: how-to
slug: chart-series-keyboard-navigation
tags: chart, series, accessibility, keyboard, navigation, aria, label, screenreader, reader, screen
ticketid: 1497415
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2022.1.119</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Chart for jQuery</td>
	</tr>
</table>

## Description

How can I use the keyboard to navigate the Chart series and make screen readers announce them?

## Solution

The Kendo UI Chart is an [`svg`](https://developer.mozilla.org/en-US/docs/Web/SVG) element, and as such, it has certain accessibility limitations. The following solution demonstrates how to manually highlight the chart elements and add [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) attributes to the series elements:

 * Screen readers will read the `aria-label` values when you hover over the individual bars.
 * However, screen readers won't read the `aria-labels` when using the custom keyboard navigation as these elements cannot be focused.
 * If you highlight the series, a hidden element with the [`aria-live`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) attribute will be appended to the body of the page and screen readers will be forced to announce it.

The custom keyboard navigation works with the `ALT+W` key combination to move the highlight to the next series and the `ALT+S` key combination to move the highlight to the previous series. These key combinations do not interfere with the default behavior of the screen readers which use the `arrow keys`. You can choose any other key or key combination by modifying the code.

1. Use the jQuery [`keydown`](https://api.jquery.com/keydown/) event to handle the keyboard input.
1. Highlight the current series by using the [`toggleHighlight`](/api/javascript/dataviz/chart/chart_series/methods/togglehighlight) method.
1. Apply `aria-label` attributes to the `path` elements.
1. Use a custom functionality to force screen readers to announce the series data.

There are several comments throughout the entire code that provide more in-depth information on the particular section of the logic.

The following example showcases the full implementation of the logic with multiple series.

> To test the screen-reading functionality, run the example in a separate Dojo window by clicking the `Open In Dojo` button.

```dojo
    <style>
      .visually-hidden {
        top:0;
        left:-2px;
        width:1px;
        height:1px;
        position:absolute;
        overflow:hidden;
      }
    </style>

    <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
    <script>
      function createChart() {
        $("#chart").kendoChart({
          title: {
            text: "Gross domestic product growth /GDP annual %/"
          },
          legend: {
            position: "top"
          },
          seriesDefaults: {
            type: "column",
            // Increase the opacity of the highlighted element to make it more distinguishable.
            highlight: {
              visual: function(e) {
                let visual = e.createVisual();
                visual.options.fill.opacity = 0.6;
                return visual;
              }
            }
          },
          series: [{
            name: "India",
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
          }, {
            name: "Russian Federation",
            data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
          }, {
            name: "Germany",
            data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
          },{
            name: "World",
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
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
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            line: {
              visible: false
            },
            labels: {
              padding: {top: 135}
            }
          },
          tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
          }
        });
      }

      let categoryIndex = 0,
          seriesIndex = 0,
          currentCategory,
          currentSeries,
          lastDirection;

      // Navigation using ALT+W and ALT+S - forward/backward movement of columns.
      $(document.body).on("keydown", navigate);

      /* MAIN NAVIGATE EVENT HANDLER */

      function navigate(e) {
        let chart = $("#chart").data("kendoChart");
        let series = chart.findSeriesByIndex(0),
            seriesCount = chart.options.series.length,
            dataCount = series._options.data.length, 
            key = e.keyCode;

        // ALT + W (forward)
        if (e.altKey && key == 87) {
          // Check if the last navigation last in the backward direction and switch it.
          if(lastDirection == "backward")
            switchDirection(true, seriesCount);

          // Move to the next bar and announce it.
          navigateForward(chart, dataCount, seriesCount);
          // Apply the aria-label attributes as you navigate forward.
          applyLabel(chart);

          // Force screen readers to announce the provided text.
          announceText(currentSeries._options.name + " year " + currentCategory.category + " value " + currentCategory.value);
        } 

        // ALT + S (backward)
        if(e.altKey && key == 83) {
          // Logic is the same as above.
          if(lastDirection == "forward")
            switchDirection(false, seriesCount);

          if(!lastDirection) return

          navigateBackward(chart, dataCount, seriesCount);

          announceText(currentSeries._options.name + " year " + currentCategory.category + " value " + currentCategory.value);
        }
      }

      /* FORWARD NAVIGATION METHOD */

      function navigateForward(chart, dataCount, seriesCount) {
        // If you reached the last bar, do nothing.
        if(seriesIndex === seriesCount && categoryIndex === dataCount - 1) {
          return;
        }

        // Remove the highlight from the current bar.
        removeHighlight();

        if(seriesIndex >  seriesCount - 1) {
          seriesIndex = seriesIndex === seriesCount + 1 && seriesCount > 1 ? 1 : 0;

          categoryIndex = categoryIndex < 0 && seriesCount <= 1 ? 0 : categoryIndex;

          categoryIndex++;
        }

        // Highlight the next bar.
        addHighlight(chart);

        seriesIndex++;

        // Update the lastDirection variable to keep track of the last command.
        lastDirection = "forward";

        // You can customize the announcement message here.
      }

      /* BACKWARD NAVIGATION METHOD */

      function navigateBackward(chart, dataCount, seriesCount) {
        if((seriesIndex === seriesCount - 1 || seriesIndex < 0) && categoryIndex < 0) {
          return;
        }

        removeHighlight();

        if(seriesIndex < 0) {
          seriesIndex = seriesCount - 1
          categoryIndex--;
        }

        if((lastDirection == "forward" && categoryIndex == -1) || categoryIndex == -1) {
          seriesIndex = 0;
          categoryIndex = 0;
        }

        addHighlight(chart);

        seriesIndex--;

        lastDirection = "backward";
      }

      function addHighlight(chart) {
        currentSeries = chart.findSeriesByIndex(seriesIndex);
        currentCategory = currentSeries.points()[categoryIndex];
        currentSeries.toggleHighlight(true, currentCategory);
      }

      function removeHighlight() {
        if(currentSeries) {
          currentSeries.toggleHighlight(false, currentCategory);
        }
      }

      function switchDirection(forward, seriesCount) {
        forward ? seriesIndex += 2 : seriesIndex -= 2;
      }

      // The applyLabel function applies an aria-label to the "path" elements of the columns. Aria-label is read when you hover over the column with your mouse.
      function applyLabel(chart) {
        let categories = chart.options.categoryAxis.categories;
        let elements = chart.element.find("[clip-path] > g > g");
        let element = $(elements[categoryIndex]).find("g")[seriesIndex - 1];

        let label = currentSeries._options.name + " year " + currentCategory.category + " value " + currentCategory.value;

        $(element).find("path").attr("aria-label", label);
      }

      // The announceText function creates an element off-screen and forces the screen reader to announce its content.
      function announceText(text) {
        // Empty the "queue" of elements that need to be announced. If you navigate too fast, lots of elements will be appended to the screen and the screen reader will get confused of what it must announce. This snippet ensures that there is only one element to announce at a time and it is always the latest one.
        if($(".visually-hidden").length > 0) {
          $(".visually-hidden").remove();
        }

        // Create an empty div element. Add the aria-live attribute to it. Add the visually-hidden class so the element is not visible on the screen. Append the element to the body of the page.
        let element = $("<div></div>").attr("aria-live", "assertive").addClass("visually-hidden").appendTo("body");

        // Add a slight delay to ensure the element is created.
        setTimeout(function() {
          // Add the text to the div element. This will force the screen reader to announce it.
          element.text(text)
        }, 350);

        setTimeout(function() {
          // Once the text is announced, remove the element from the page as you don't need it.
          element.remove();
        }, 1000);
      }

      $(document).ready(createChart);
      $(document).bind("kendo:skinChange", createChart);
    </script>
```

The following example showcases the full implementation of the logic with single series:

```dojo
    <style>
      .visually-hidden {
        top:0;
        left:-2px;
        width:1px;
        height:1px;
        position:absolute;
        overflow:hidden;
      }
    </style>

    <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
    <script>
      function createChart() {
        $("#chart").kendoChart({
          title: {
            text: "Gross domestic product growth /GDP annual %/"
          },
          legend: {
            position: "top"
          },
          seriesDefaults: {
            type: "column",
          },
          series: [{
            name: "World",
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
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
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            line: {
              visible: false
            },
          },
          tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
          }
        });
      }

      let categoryIndex = 0,
          seriesIndex = 0,
          currentCategory,
          currentSeries,
          lastDirection;

      // Navigation using ALT+W and ALT+S - forward/backward movement of columns.
      $(document.body).keydown(function(e) {
        let chart = $("#chart").data("kendoChart");
        let series = chart.findSeriesByIndex(0),
            seriesCount = chart.options.series.length,
            dataCount = series._options.data.length, 
            key = e.keyCode;

        // ALT + W (forward)
        if (e.altKey && key == 87) {
          if(lastDirection == "backward")
            switchDirection(true, seriesCount);

          navigateForward(chart, dataCount, seriesCount);
          applyLabel(chart);
        } 

        // ALT + S (backward)
        if(e.altKey && key == 83) {
          if(lastDirection == "forward")
            switchDirection(false, seriesCount);

          if(!lastDirection) return

          navigateBackward(chart, dataCount, seriesCount);
        }
      });

      function navigateForward(chart, dataCount, seriesCount) {
        if(seriesIndex === seriesCount && categoryIndex === dataCount - 1) {
          return;
        }

        removeHighlight();
        if(seriesIndex >  seriesCount - 1) {
          seriesIndex = seriesIndex === seriesCount + 1 && seriesCount > 1 ? 1 : 0;

          categoryIndex = categoryIndex < 0 && seriesCount <= 1 ? 0 : categoryIndex;
          categoryIndex++;
        }

        addHighlight(chart);

        if(seriesIndex === seriesCount) {
          seriesIndex = 0;
          categoryIndex++;
        } else {
          seriesIndex++;
        }

        lastDirection = "forward";

        announceText(currentSeries._options.name + " year " + currentCategory.category + " value " + currentCategory.value);
      }

      function navigateBackward(chart, dataCount, seriesCount) {

        if((seriesIndex === seriesCount - 1 || seriesIndex < 0) && categoryIndex < 0) {
          return;
        }

        removeHighlight();

        if(seriesIndex <  0) {
          seriesIndex = seriesCount - 1
          categoryIndex--;
        }

        if(lastDirection == "forward" && categoryIndex == -1) {
          seriesIndex = 0;
          categoryIndex = 0;
        }

        addHighlight(chart);

        if(seriesIndex === 0) {
          seriesIndex = seriesCount - 1;
          categoryIndex--;
        } else {
          seriesIndex--;
        }
        lastDirection = "backward";

        announceText(currentSeries._options.name + " year " + currentCategory.category + " value " + currentCategory.value);
      }

      function addHighlight(chart) {
        currentSeries = chart.findSeriesByIndex(seriesIndex);
        currentCategory = currentSeries.points()[categoryIndex];
        currentSeries.toggleHighlight(true, currentCategory);
      }

      function removeHighlight() {
        if(currentSeries) {
          currentSeries.toggleHighlight(false, currentCategory);
        }
      }

      function switchDirection(forward, seriesCount) {
        forward ? seriesIndex += 2 : seriesIndex -= 2;
      }

      // The applyLabel function applies an aria-label to the "path" elements of the columns. Aria-label is read when you hover over the column with your mouse.
      function applyLabel(chart) {
        let categories = chart.options.categoryAxis.categories;
        let elements = chart.element.find("[clip-path] > g > g");
        let element = $(elements[categoryIndex]).find("g")[seriesIndex - 1];

        let label = currentSeries._options.name + " year " + currentCategory.category + " value " + currentCategory.value;

        $(element).find("path").attr("aria-label", label);
      }

      // The announceText function creates an element off-screen and forces the screen reader to announce its content.
      function announceText(text) {
        // Create an empty div element. Add the aria-live attribute to it. Add the visually-hidden class so the element is not visible on the screen. Append the element to the body of the page.
        let element = $("<div></div>").attr("aria-live", "polite").addClass("visually-hidden").appendTo("body");

        // Add a slight delay to ensure the element is created.
        setTimeout(function() {
          // Add the text to the div element. This will force the screen reader to announce it.
          element.text(text)
        }, 350);

        setTimeout(function() {
          // Once the text is announced, remove the element from the page as you don't need it.
          element.remove();
        }, 1000);
      }


      $(document).ready(createChart);
      $(document).bind("kendo:skinChange", createChart);

    </script>
```