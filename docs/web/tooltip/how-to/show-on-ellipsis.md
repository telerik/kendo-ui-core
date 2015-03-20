---
title: Show only if text overflows with ellipsis
page_title: Show only if text overflows with ellipsis
description: Show only if text overflows with ellipsis
---

# Show only if text overflows with ellipsis

The following runnable sample demonstrates how to show the Tooltip only if the target's text overflows with ellipsis

#### Example:

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