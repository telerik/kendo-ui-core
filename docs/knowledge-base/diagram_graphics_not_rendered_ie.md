---
title: Diagram Graphics Are Not Rendered in IE
page_title: Diagram Graphics Are Not Rendered in Internet Explorer
description: "Learn how to handle the Kendo UI for jQuery Diagram component when its graphics are not rendered in Internet Explorer."
previous_url: /controls/diagrams-and-maps/diagram/troubleshoot/common-issues, /controls/diagrams-and-maps/diagram/troubleshooting
slug: troubleshooting_diagram_widget
tags: telerik, progress, kendoui, diagram, visuals, graphics, not, rendering, ie, internet, explorer
type: troubleshooting
res_type: kb
component: diagram
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Diagram for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The graphics and visual elements of the Diagram are not rendered in Internet Explorer.

## Solution

> If a security message for enabling the Intranet settings appear and you follow its instructions, skip the following steps.

To troubleshoot this issue:

1. Select **Internet Options** > **Security** > **Internet** (or **Local intranet**) > **Custom Level**.
1. Enable **Binary and script behaviors** by ticking the **Enable** radio button.

![Kendo UI for jQuery Options and settings to apply to render the chart graphics](../styles-and-layout/chart-ie-script-behaviors.png)


## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
