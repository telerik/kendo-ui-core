---
title: Configure Background Color of Tab and Content
description: An example demonstrating how to set the background color of the tab to the content
type: how-to
page_title: Same Background Color for Tab and Content  | Kendo UI TabStrip
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

During the [document.ready event](http://learn.jquery.com/using-jquery-core/document-ready/), use jQuery to make a reference to the selected tab's background color.  Then, set the background color of the content.  This approach can be used in the [show event](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/show) so when a user clicks a tab, the content will match the tab's background color.

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

* [show- Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/show)
