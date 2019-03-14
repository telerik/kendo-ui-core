---
title: Set Background Color of the Tab to the Content
description: An example on how to set the background color of the tab to the content.
type: how-to
page_title: Set the Same Background Color for Tabs and Content  | Kendo UI TabStrip
slug: tabstrip-color-content-background-same-tab
tags: tabstrip, color, content, background, same, tab
ticketid: 1364933
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TabStrip for Progress® Kendo UI®</td>
 </tr>
  <td>Product Version</td>
  <td>2019.1.115</td>
 </tr>
</table>

## Description

How can I set the background color of the content to the same color as the tab?

## Solution

1. During the [`document.ready` event](http://learn.jquery.com/using-jquery-core/document-ready/), use jQuery to make a reference to the background color of the selected tab.  
1. Set the background color of the content.

You can use the suggested approach in the [`show` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/show) so that when the user clicks a tab, the content will match the background color of the tab.

```dojo
    <div id="example">
      <div class="demo-section k-content">
        <div id="tabstrip">
          <ul>
            <li class="k-state-active">
              First Tab
            </li>
            <li>
              Second Tab
            </li>
            <li>
              Third Tab
            </li>
          </ul>
          <div>First Tab</div>
          <div>Second Tab</div>
          <div>Third Tab</div>
        </div>
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#tabstrip").kendoTabStrip({
          show: onShow
        });

        function onShow(e){
          //will change when tab is clicked
          var tabBackGroundColor = $(".k-tabstrip-items .k-state-active").css("background-color");
          $(".k-tabstrip .k-content.k-state-active").css("background-color", tabBackGroundColor);
        }

        //for the initial load
        var tabBackGroundColor = $(".k-tabstrip-items .k-state-active").css("background-color");
        $(".k-tabstrip .k-content.k-state-active").css("background-color", tabBackGroundColor);
      });
    </script>
```

## See Also

* [`show` API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/show)
