---
title: Show Only If Text Overflows with Ellipsis
page_title: Show Only If Text Overflows with Ellipsis | Kendo UI Tooltip
description: "Learn how to show a Kendo UI Tooltip only if the target text overflows with ellipsis."
slug: howto_showonlyiftextoverflowswithellipsis_tooltip
---

# Show Only If Text Overflows with Ellipsis

The following example demonstrates how to show a Kendo UI Tooltip only if the text of the target overflows with ellipsis.

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
