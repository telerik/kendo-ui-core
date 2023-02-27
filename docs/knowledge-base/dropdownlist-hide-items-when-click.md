---
title: Hide Items in DropDownList Only if Opened Through Mouse Click
description: An example on how to hide items in DropDownList but only when the popup is opened through the mouse click.
type: how-to
page_title: Hide Items if Opened Through Mouse Click  - Kendo UI DropDownList for jQuery
slug: dropdownlist-hide-items-when-click
tags: dropdownlist, hide, click, popup, open, keyboard
ticketid: 1598543
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
 </tr>
</table>

## Description

How can I hide items when the DropDownList is opened through mouse click, but show them when the keyboard navigation is used?

## Solution

1. Use [template](/api/javascript/ui/dropdownlist/configuration/template) and add a custom class on the items that needs to be hidden.
2. Handle the [open](/api/javascript/ui/dropdownlist/events/open) event of the DropDownList. Depending on the event type hide or show the items. 

```dojo
    <script type="text/x-kendo-template" id="feedItemTemplate">     
       #if(hidden){#
      <span class="hidden"> #:name# </span>
      #}else{#
      <span> #:name# </span>
      # } #
    </script>

    <input id="dropdownlist" />
    <script>
      var data = [
        { id: 1, name: "First", hidden: false},
        { id: 2, name: "Second", hidden: false},
        { id: 3, name: "Third", hidden: true},
        { id: 4, name: "Forth", hidden: false},
        { id: 5, name: "Fifth", hidden: false},
        { id: 6, name: "Sixth", hidden: false},
        { id: 7, name: "Seventh", hidden: true}
      ];

      $("#dropdownlist").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: data,
        open: function(e){
          var currentEvent = event;
          if(event.type == 'click'){           
            $('.hidden').closest('.k-list-item').hide()         
          }else if(event.type == 'keydown'){          
            $('.hidden').closest('.k-list-item').show()
          }
        },
        template: $("#feedItemTemplate").html()
      });
    </script>
```

## See Also

* [API Reference of DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
