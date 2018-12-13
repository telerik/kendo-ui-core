---
title: Display the Chart Title on Multiple Lines and Use Different Fonts
description: An example on how to display a blank line in the title and use different fonts for every line in the Kendo UI Chart.
type: how-to
page_title: Display Subtitle with an Empty Line and Different Fonts | Kendo UI Chart
slug: chart-title-empty-line-different-fonts
tags: chart, title, font, subtitle
ticketid: 1141221
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I display a subtitle with an empty line and smaller font in the Kendo UI Chart?

## Solution

1. Split the [`text`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/title.text) into three lines by using line feed characters(`\n`).
1. Handle the [`render`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/render) event of the Chart.
1. In the `render` event handler:
	1. Use a jQuery selector and [`hide`](https://api.jquery.com/hide/) the second line.
	1. Use a jQuery selector and change the `font-size` of the third line.

```dojo
<style>
    .topPadding {
        padding-top: 2cm;
    }
</style>

<div id="chart"></div>
<script>
    $("#chart").kendoChart({
        title: {
            text: "Total account value (USD):\ntextplaceholder\n$250,000",
            position: "bottom"
        },
        series: [{
            data: [1, 2, 3]
        }],
        render: function(e) {
            var tph = e.sender.element.find("text:contains(textplaceholder)");
            tph.hide();
            var secondLine = e.sender.element.find("text:contains($250,000)");
            $(secondLine).css({
                "font-size": "10px"
            });
        }
    });
</script>
```
