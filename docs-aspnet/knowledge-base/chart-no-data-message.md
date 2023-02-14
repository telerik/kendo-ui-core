---
title: Show a Message When the Chart Has No Data
page_title: Show a Message When the Chart Has No Data
description: "An example on how to show a message when the {{ site.product }} Chart has no data."
slug: chart-no-data-message
tags: telerik, chart, no, data, message
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chart</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I display a message in the {{ site.product }} Chart when its data source is empty?

## Solution

The following example demonstrates how to achieve such behavior. Note that the `div` element of the message is positioned and decorated through CSS.


```Index.cshtml

    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats")
        .Events(ev=>ev.Render("onRender"))
    )

```
```Script.js
    <script>
        function onRender(e) {
            var view = e.sender.dataSource.view();
            var parent = e.sender.element.closest('.container')
            createOverlay(view.length, parent)
        }
        function createOverlay(viewLength, parent) {
            if (viewLength === 0) {
                parent.append("<div class='overlay'><div>No Data</div></div>")
            }
        }
    </script>
```
```Style.css

    <style>
        .container {
        position: relative;
        }

        .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .5;
        background-color: #6495ed;
        text-align: center;
        }

        .overlay div {
        position: relative;
        font-size: 34px;
        margin-top: -17px;
        top: 50%;
        }
    </style>

```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on displaying the Chart when its data source is empty](https://netcorerepl.telerik.com/cQbPQFFd41Tge1n326).

## See Also 

* [API Reference of the Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)