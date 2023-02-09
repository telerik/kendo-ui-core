---
title: Show a Tooltip Only If the Text Overflows with an Ellipsis
page_title: Show a Tooltip Only If the Text Overflows with an Ellipsis
description: "Learn how to show a Kendo UI Tooltip only if the target text overflows with ellipsis."
slug: howto_showonlyiftextoverflowswithellipsis_tooltip
previous_url: /controls/layout/tooltip/how-to/show-on-ellipsis
tags: telerik, kendo, jquery, tooltip, show, only, if, text, overflows, with, ellipsis
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

How can I show a Kendo UI Tooltip only if the text of the target overflows with an ellipsis?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <style>
      td{
        max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      [role="tooltip"]{
        visibility: hidden;
      }
    </style>
    <div id="example">
      <table>
        <tr>
          <td>short text</td>
        </tr>
        <tr>
          <td>veryverylongtextthatdoesnotfitinthecontainer</td>
        </tr>
      </table>
    </div>
    <script>
      $("#example").kendoTooltip({
        filter: "td",
        show: function(e){
          if(this.content.text() !=""){
            $('[role="tooltip"]').css("visibility", "visible");
          }
        },
        hide: function(){
          $('[role="tooltip"]').css("visibility", "hidden");
        },
        content: function(e){
          var element = e.target[0];
          if(element.offsetWidth < element.scrollWidth){
            return e.target.text();
          }else{
            return "";
          }
        }
      })
    </script>
```

## See Also

* [Basic Usage of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/index)
* [Using the API of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/api)
* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
