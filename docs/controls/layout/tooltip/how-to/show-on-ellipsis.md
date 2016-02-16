---
title: Show Only If Text Overflows with Ellipsis
page_title: Show Only If Text Overflows with Ellipsis | Kendo UI ToolBar
description: "Learn how to show a Kendo UI Tooltip only if the target text overflows with ellipsis."
slug: howto_showonlyiftextoverflowswithellipsis_tooltip
---

# Show Only If Text Overflows with Ellipsis

The example below demonstrates how to show a Kendo UI Tooltip only if the text of the target overflows with ellipsis.

###### Example

```html
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

Other articles on Kendo UI Tooltip:

* [Tooltip JavaScript API Reference](/api/javascript/ui/tooltip)
* [How to Calculate Tooltip Content Width]({% slug howto_calculatetooltipcontentlength_tooltip %})
* [How to Show Only If Text Exceeds Certain Length]({% slug howto_showonlyiftextexceedscertainlength_tooltip %})
