---
title: Sticky x-Axis Header in Kendo UI for jQuery Heatmap
description: Learn how to create a sticky x-axis header for the Kendo UI for jQuery Heatmap to ensure x-axis labels remain visible while scrolling.
type: how-to
page_title: Creating a Sticky x-Axis Header in Kendo UI for jQuery Heatmap
meta_title: Creating a Sticky x-Axis Header in Kendo UI for jQuery Heatmap
slug: sticky-x-axis-header-kendo-jquery-heatmap
tags: kendo-ui-for-jquery, heatmap, x-axis, sticky-header, scrolling
res_type: kb
ticketid: 1712616
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Heatmap </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.1.415 </td>
</tr>
</tbody>
</table>

## Description

In a Kendo UI for jQuery [Heatmap](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/chart-types/heatmap), long datasets may require vertical scrolling. However, scrolling often hides the x-axis labels, making it challenging to track data. This article explains how to keep the x-axis labels always visible at the top, even during scrolls. Additionally, it addresses aligning the header across different browsers and creating a grouped header with two levels, such as years and months.

This knowledge base article also answers the following questions:
- How do I create a sticky x-axis header in Kendo UI for jQuery Heatmap?
- How can I create a grouped header with years and months in Kendo UI for jQuery Heatmap?
- How can I align the Heatmap header across browsers?

## Solution

To create a sticky x-axis header for the Heatmap, follow these steps:

1. **Set up a scrollable wrapper:**
   Place the Heatmap inside a scrollable `<div>` with `overflow-y: auto` and a fixed height. Add a separate header `<div>` above the scrollable area to display the x-axis labels.

2. **Populate the header dynamically:**
   Extract the categories from the Heatmap's data and populate the header `<div>` dynamically. This ensures the header adapts to variable data.

   ```javascript
   const headerEl = document.getElementById('heatmap-header');
   months.forEach((m) => {
       const div = document.createElement('div');
       div.className = 'header-label';
       div.textContent = m;
       headerEl.appendChild(div);
   });
   ```

3. **Hide duplicate x-axis labels:**
   Set `xAxis.labels.visible: false` in the Heatmap configuration to hide the default x-axis labels.

   ```javascript
   xAxis: {
       labels: {
           visible: false
       }
   }
   ```

4. **Synchronize the header with the Heatmap:**
   To align the header and the Heatmap, calculate the left spacer width based on the Heatmap's plot area bounding box. Recalculate this width whenever the Heatmap renders or resizes.

   ```javascript
   function syncHeader(chart) {
       const plotBox = chart._plotArea.box;
       const headerSpacer = document.querySelector('#header-spacer');
       headerSpacer.style.width = `${plotBox.left}px`;
   }

   $("#heatmap").kendoChart({
       render: function(e) {
           syncHeader(e.sender);
       }
   });
   ```

5. **Handle responsiveness:**
   Use `width: 100%; max-width: 1200px` for the wrapper to allow it to shrink on narrow viewports. Attach a `$(window).on('resize')` handler to call `chart.resize()` and keep the header aligned.

6. **Create a grouped header:**
   For a two-level grouped header, such as years and months, dynamically create two sets of `<div>` elements—one for each level—and align them above the Heatmap.

   ```javascript
   years.forEach((year) => {
       const yearDiv = document.createElement('div');
       yearDiv.className = 'year-label';
       yearDiv.textContent = year;
       yearHeaderEl.appendChild(yearDiv);
   });

   months.forEach((month) => {
       const monthDiv = document.createElement('div');
       monthDiv.className = 'month-label';
       monthDiv.textContent = month;
       monthHeaderEl.appendChild(monthDiv);
   });
   ```

7. **Ensure cross-browser compatibility:**
   To maintain consistent header alignment in different browsers, test and adjust CSS styles (e.g., `box-sizing`, `padding`, `margin`). Use the modified example linked below for browser-specific adjustments.


Below is a runnable example:

```dojo
 <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      #heatmap-wrapper {
        width: 100%;
        max-width: 1200px;
      }
      #heatmap-header {
        display: flex;
        background: #fff;
        border-bottom: 1px solid #ddd;
        font: bold 12px Arial;
        color: #333;
      }
      #heatmap-header .header-label {
        text-align: center;
        flex: 1;
        padding: 6px 0;
      }
      #heatmap-header .header-y-spacer {
        flex: 0 0 200px;
      }
      #heatmap-scroll {
        width: 100%;
        height: 500px;
        overflow-y: auto;
      }
      #heatmap {
        width: 100%;
      }
    </style>

    <div id="heatmap-wrapper">
      <div id="heatmap-header">
        <div class="header-y-spacer">Business Partner</div>
      </div>
      <div id="heatmap-scroll">
        <div id="heatmap"></div>
      </div>
    </div>

    <script>
      const partners = [
        "MEGGITT SAFETY SYSTEMS INC",
        "METTIS AEROSPACE LTD",
        "MINALEX CORP",
        "HONEYWELL INTL INC",
        "ROLLS ROYCE PLC",
        "SAFRAN SA",
        "BAE SYSTEMS PLC",
        "GENERAL ELECTRIC CO",
        "PRATT & WHITNEY",
        "NORTHROP GRUMMAN CORP",
        "RAYTHEON TECHNOLOGIES",
        "LOCKHEED MARTIN CORP",
        "BOEING COMPANY",
        "AIRBUS SE",
        "LEONARDO SPA",
        "THALES GROUP",
        "L3HARRIS TECHNOLOGIES",
        "TEXTRON INC",
        "SPIRIT AEROSYSTEMS",
        "TRIUMPH GROUP INC",
      ];

      const months = [
        "Apr 2025",
        "May 2025",
        "Jun 2025",
        "Jul 2025",
        "Aug 2025",
        "Sep 2025",
        "Oct 2025",
        "Nov 2025",
        "Dec 2025",
        "Jan 2026",
        "Feb 2026",
        "Mar 2026",
        "Apr 2026",
      ];

      const values = {
        "MEGGITT SAFETY SYSTEMS INC": [2, 4, 9, 5, 4, 3, 4, 8, 7, 8, 10, 10, 9],
        "METTIS AEROSPACE LTD": [7, 8, 5, 6, 7, 6, 6, 6, 6, 5, 10, 13, 10],
        "MINALEX CORP": [
          null,
          null,
          2,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        "HONEYWELL INTL INC": [5, 3, 7, 8, 6, 9, 4, 5, 11, 7, 8, 6, 4],
        "ROLLS ROYCE PLC": [10, 9, 8, 7, 6, 5, 4, 3, 2, 6, 9, 12, 11],
        "SAFRAN SA": [3, 5, 4, 6, 8, 7, 9, 10, 8, 6, 4, 3, 5],
        "BAE SYSTEMS PLC": [6, 7, 8, 9, 10, 11, 12, 10, 8, 7, 6, 5, 4],
        "GENERAL ELECTRIC CO": [4, 6, 5, 3, 7, 8, 6, 5, 9, 11, 13, 10, 8],
        "PRATT & WHITNEY": [8, 7, 6, 5, 4, 3, 5, 7, 9, 10, 11, 9, 7],
        "NORTHROP GRUMMAN CORP": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        "RAYTHEON TECHNOLOGIES": [9, 8, 7, 6, 5, 4, 3, 2, 4, 6, 8, 10, 12],
        "LOCKHEED MARTIN CORP": [5, 5, 6, 7, 8, 9, 10, 11, 10, 9, 7, 5, 3],
        "BOEING COMPANY": [11, 10, 9, 8, 7, 6, 5, 4, 3, 5, 7, 9, 11],
        "AIRBUS SE": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9],
        "LEONARDO SPA": [7, 6, 5, 4, 3, 2, 4, 6, 8, 10, 12, 11, 9],
        "THALES GROUP": [2, 3, 6, 8, 10, 12, 11, 9, 7, 5, 3, 2, 4],
        "L3HARRIS TECHNOLOGIES": [6, 8, 10, 12, 11, 9, 7, 5, 3, 4, 6, 8, 10],
        "TEXTRON INC": [4, 3, 2, 5, 7, 9, 11, 13, 10, 8, 6, 4, 2],
        "SPIRIT AEROSYSTEMS": [9, 7, 5, 3, 1, 3, 5, 7, 9, 11, 10, 8, 6],
        "TRIUMPH GROUP INC": [
          null,
          null,
          3,
          5,
          7,
          9,
          8,
          6,
          4,
          2,
          null,
          null,
          null,
        ],
      };

      // Build heatmap data as [xCategory, yCategory, value] arrays
      const heatmapData = [];
      partners.forEach((partner) => {
        months.forEach((month, i) => {
          const val = values[partner][i];
          if (val != null) {
            heatmapData.push([month, partner, val]);
          }
        });
      });

      // Populate header labels
      const headerEl = document.getElementById("heatmap-header");
      months.forEach((m) => {
        const div = document.createElement("div");
        div.className = "header-label";
        div.textContent = m;
        headerEl.appendChild(div);
      });

      function syncHeader() {
        const chart = $("#heatmap").data("kendoChart");
        if (chart && chart._plotArea) {
          const plotBox = chart._plotArea.backgroundBox();
          document.querySelector(".header-y-spacer").style.flex =
            `0 0 ${plotBox.x1}px`;
        }
      }

      function wrapText(e) {
        var maxWidth = window.innerWidth < 768 ? 80 : 150;
        var text = e.value;
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var rect = e.rect;

        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];

        // Measure using a temporary text element
        for (var i = 1; i < words.length; i++) {
          var testLine = currentLine + " " + words[i];
          var testEl = new draw.Text(testLine, [0, 0], { font: "12px Arial" });
          var testWidth = testEl.bbox().width();
          if (testWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        var group = new draw.Group();
        var lineHeight = 14;
        var totalHeight = lines.length * lineHeight;
        var startY = rect.origin.y + (rect.size.height - totalHeight) / 2;

        for (var j = 0; j < lines.length; j++) {
          var textEl = new draw.Text(lines[j], [0, 0], { font: "12px Arial" });
          var textWidth = textEl.bbox().width();
          var x = rect.origin.x + rect.size.width - textWidth - 5;
          var y = startY + j * lineHeight;
          var line = new draw.Text(lines[j], [x, y], { font: "12px Arial" });
          group.append(line);
        }

        return group;
      }

      // Scrollable heatmap chart — x-axis labels hidden (shown in sticky header)
      $("#heatmap").kendoChart({
        chartArea: {
          height: 1000,
        },
        series: [
          {
            type: "heatmap",
            data: heatmapData,
            color: "#4ec94e",
          },
        ],
        xAxis: {
          categories: months,
          labels: { visible: false },
          line: { visible: false },
          majorTicks: { visible: false },
        },
        yAxis: {
          labels: {
            visual: wrapText,
          },
        },
        legend: { visible: false },
        render: syncHeader,
      });

      $(window).on("resize", function () {
        $("#heatmap").data("kendoChart").resize();
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Heatmap Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/chart-types/heatmap)
- [Chart API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
