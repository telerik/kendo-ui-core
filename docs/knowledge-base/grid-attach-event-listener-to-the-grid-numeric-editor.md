---
title: Bind to the Events of the NumericTextBox Editor in Grid
description: An example on how to attach an event listener to the NumericTextBox editor of the Kendo UI Grid.
type: how-to
page_title: Attach Event Listener to the NumericTextBox Editor | Kendo UI Grid
slug: grid-attach-event-listener-to-the-grid-numeric-editor
tags: grid, numeric, editor, event
ticketid: 1142675
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026/</td>
 </tr>
</table>


## Description

How can I bind to the `spin` event of the NumericTextBox editor in the Grid?

## Solution

[Bind](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods#event-binding-after-initialization) to the NumericTextBox on the [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) event of the Grid.

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
