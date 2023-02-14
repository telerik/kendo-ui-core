---
title: Make a Dialog Draggable
description: Learn how to make the Dialog draggable
type: how-to
page_title: How to Make the Dialog Draggable - Kendo UI Dialog for jQuery
slug: make-the-dialog-draggable
tags: kendo, kendoui, dialog, draggable
ticketid: 1360178
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Dialog for jQuery</td>
  </tr>
</table>

## Description

How to make a Dialog to be a draggable?

## Solution

1. You should use the [Draggable widget](api/javascript/ui/draggable).
1. You can handle the [dragstart event](api/javascript/ui/draggable/events/dragstart) and [dragend event](api/javascript/ui/draggable/events/dragend). You can hide and show the Dialog and its hint using the jQuery hide and show methods.

```dojo
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        animation:false,
        title: "Kendo Dialog Component",
        content: "This is your Kendo Dialog.",
        closable: true
      });
      $(".k-dialog").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        dragstart:function(e){
        	$(".k-dialog").first().hide()
        },
        dragend:function(e){
          e.currentTarget[0].style.left = e.sender.hintOffset.left + "px";
          e.currentTarget[0].style.top = e.sender.hintOffset.top + "px";
        	$(".k-dialog").first().show();
          $(".k-dialog").last().hide();
        }
      });
    </script>
```

## See Also

- [API Reference of the Dialog](api/javascript/ui/dialog)
- [API Reference of the Draggable](api/javascript/ui/draggable)
