---
title: Keep the Pane Size of the Splitter in Percentage Points
page_title: Keep the Pane Size of the Splitter in Percentage Points
description: "Learn how to keep the Kendo UI Splitter pane sizes in percentages upon user resize."
slug: howto_keeppanesizepercentages_splitter
previous_url: /controls/layout/splitter/how-to/keep-pane-size-in-percentages 
tags: telerik, kendo, jquery, splitter, keep, pane, size, in, percentage, points 
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
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I keep the Kendo UI Splitter pane sizes in percentages upon user resize?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="splitter" style="height: 400px">
      <div>
        Left pane
      </div>
      <div>
        Content
      </div>
    </div>

    <script>
      $(document).ready(function() {
        function onResize(e) {
          // Prevent the endless recursion from resizes.
          if (!this.appliesSizes) {
            this.appliesSizes = true;

            // Calculate the pane width.
            var element = this.element;
            var pane = element.find(".k-pane:first");
            var ratio = Math.ceil(pane.width() * 100 / element.width());

            // Set the pane width in percentage points.
            this.size(pane, ratio + "%");

            this.appliesSizes = false;
          }
        }

        $("#splitter").kendoSplitter({
          panes: [
            { collapsible: true, size: "20%" },
            { collapsible: false }
          ],
          resize: onResize
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
