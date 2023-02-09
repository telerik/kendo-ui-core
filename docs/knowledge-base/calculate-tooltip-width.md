---
title: Calculate the Content Width of the Tooltip
page_title: Calculate the Content Width of the Tooltip
description: "Learn how to calculate the content width of a Kendo UI for jQuery Tooltip."
slug: howto_calculatetooltipcontentlength_tooltip
previous_url: /controls/layout/tooltip/how-to/calculate-tooltip-width
tags: telerik, kendo, jquery, tooltip, calculate, content, width 
component: tooltip
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Tooltip for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I calculate the width of the content in the Kendo UI for jQuery Tooltip?

## Solution

By default, if the content is too little, the Tooltip width will be reduced, and if the displayed content can fit, the Tooltip width is not going to change. Therefore, in some scenarios this results in a Tooltip that is narrower than desired.

The following example demonstrates how to calculate the width of a Kendo UI Tooltip on each opening and allow for a greater flexibility.

```dojo
    <style>
        #table {
            width: 36em;
            table-layout: fixed;
            border-spacing: 0;
            border-collapse: collapse;
        }

        #table td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: 1px solid #ccc;
            padding: .3em .6em;
        }
    </style>

    <p>Hover the table cells from the second column. Tooltips with variable width will appear.</p>

    <table id="table">
        <colgroup><col style="width:16em"><col></colgroup>
        <tbody>
            <tr><td>table cell with no tooltip</td><td>Integer arcu odio, egestas nec pretium sit amet, aliquet vel nibh.</td></tr>
            <tr><td>table cell with no tooltip</td><td>Lorem ipsum.</td></tr>
            <tr><td>table cell with no tooltip</td><td>Duis ut nulla eget lectus posuere tempor. </td></tr>
        </tbody>
    </table>

    <script>
      $("#table").kendoTooltip({
        filter: "td + td",
        position: "left",
        content: function (e) {
            var text = $(e.target).text();
            return '<div style="width: ' + text.length * .6 + 'em; max-width: 14em">' + text + '</div>';
        }
      })
    </script>
```

## See Also

* [Basic Usage of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/index)
* [Using the API of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/api)
* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
