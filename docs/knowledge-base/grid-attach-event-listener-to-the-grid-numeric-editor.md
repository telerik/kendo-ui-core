---
title: Bind to the Events of the Grid Numeric Editor
description: An example on how to attach event Listener to the Grid editor
type: how-to
page_title: Attach Event Listener to the Grid Numeric Editor
slug: grid-attach-event-listener-to-the-grid-numeric-editor
tags: grid, numeric, editor, event
ticketid: 1142675
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026/</td>
 </tr>
</table>


## Description

How to bind to the spin event of the Grid NumericTextBox editor?

## Solution

This could be achieved by [binding](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods#event-binding-after-initialization) to the widget on the [edit](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-edit) event of the Grid.

````
  edit:function(e){
    var numeric = $(e.container).find('[data-role="numerictextbox"]').data('kendoNumericTextBox')
    if(numeric !== undefined){
      numeric.bind("spin", function(e) {
        console.log("spin event handler");
      });
    }
  }
````
