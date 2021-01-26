---
title: Change label style in TextBox 
description: An example on how change the style of a textbox before and after floating of its label.
type: how-to
page_title: Change lable style before and after float | Kendo UI TextBox for jQuery
slug: textbox-label-change-floating-style
tags: textbox, floating, style, before, after, empty, filled
ticketid: 1498326
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TextBox for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2020.3.1118</td>
 </tr>
</table>

## Description

I can't change the style of the textbox label. I would like to be able to change the style before the floating (example: `color: red; font-style: italic;`) and after the floating (example: `color: black; font-style: normal;`). How can I do?

## Solution

To achieve the desired behaviour, we will need both some JavaScript and CSS because we need to plan for when the user adds value.

1. Add the style for the textbox when it is not focused but it is floating
1. In the `change` event of the textbox, check if there is a value and toggle the style as required

```
    <style>
        .k-floating-label-container {
          width: 100%;          
        }
        
        .k-floating-label-container:not(.k-state-focused) {
          color: red; font-style: italic;
        }       
    </style>
```
```
    change: function(e){
        if(this.value()){
            $(".k-floating-label-container").css({color: "black", fontStyle:"normal"});
        } else{
            $(".k-floating-label-container").css({color: "red", fontStyle:"italic"});
        }
    }
```

```dojo
    <div id="example">
      <div class="demo-section k-content">
        <h4>Set value</h4>
        <input id="textbox" style="width: 100%;" />
      </div>

      <script>
        $(document).ready(function () {
          // create TextBox from input HTML element
          $("#textbox").kendoTextBox({
            placeholder: "Name",
            label: {
              content: "Name",
              floating: true
            },
            change: function(e){
              if(this.value()){
                $(".k-floating-label-container").css({color: "black", fontStyle:"normal"});
              } else{
                $(".k-floating-label-container").css({color: "red", fontStyle:"italic"});
              }
            }
          });
        });
      </script>

      <style>
        .k-floating-label-container {
          width: 100%;          
        }
        
        .k-floating-label-container:not(.k-state-focused) {
          color: red; font-style: italic;
        }
       
      </style>
    </div>
```

## See Also

* [API Reference of the change Event](/api/javascript/ui/textbox/events/change)
