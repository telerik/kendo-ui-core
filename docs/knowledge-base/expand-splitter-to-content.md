---
title: Expand the Splitter Based on Content Height
page_title: Expand the Splitter Based on Content Height
description: "Learn how to expand the Kendo UI Splitter based on the height of the content."
slug: howto_expandtocontent_splitter
previous_url: /controls/layout/splitter/how-to/expand-splitter-to-content
tags: telerik, kendo, jquery, splitter, expand, based, on, content, height  
component: splitter
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Splitter for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I expand the Kendo UI Splitter based on the height of the content?

## Solution

The following example demonstrates how to make the Kendo UI Splitter expand its height based on the content inside a pane.

1. Set up the Kendo UI Splitter to expand to the height of its parent according to the article on how to [expand to 100% height and auto-resize]({% slug howto_expandto100heightandautoresize_splitter %}).
2. Make sure that the parent content is resized when the content of the pane is rendered.
3. Call the `resize` method to finalize the process.

```dojo
<style>
    html,
    body,
    #splitter
    {
        height:100%;
        margin:0;
        padding:0;
    }
</style>

<div id="splitter">
  <div><div id="grid"></div></div>
  <div></div>
</div>

<script>
    $(function() {
        $("#splitter").kendoSplitter({
            panes: [ { resizable: true , scrollable: false }, {} ]
        });

        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                }
            },
            columns: [{
                field: "ContactName",
                title: "Contact Name",
            }],
            dataBound: function(e) {
                var gridHeight = e.sender.wrapper.height();
                $(document).find("body").height(gridHeight);
                var splitter = $("#splitter").data("kendoSplitter");
                splitter.resize(true);
            }
        });
    });
</script>
```

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
