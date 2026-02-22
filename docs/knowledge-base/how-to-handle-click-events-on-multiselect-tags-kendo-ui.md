---
title: Handling Click Events on MultiSelect Tags in Kendo UI
description: Learn how to implement custom logic to handle click events on tags within the MultiSelect component for Kendo UI.
type: how-to
page_title: How to Handle Click Events on Tags of MultiSelect in Kendo UI
slug: how-to-handle-click-events-on-multiselect-tags-kendo-ui
tags: kendo-ui, multiselect, click-event, tags, custom-logic
res_type: kb
components: ["multiselect"]
ticketid: 1670286
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MultiSelect for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I have a MultiSelect component that represents what is in the FileUpload control. I'm looking for a way to detect the click event on a tag and retrieve the data item of the clicked tag to implement my custom logic.

This KB article also answers the following questions:
- How can I add click event handling to tags in the MultiSelect component?
- Is it possible to get the data item of a clicked tag in MultiSelect?

## Solution

The [MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index) component does not have a built-in event for handling clicks on individual tags. However, you can achieve this functionality by implementing custom logic using jQuery. The following steps and code snippet demonstrate how to handle click events on tags and how to prevent the MultiSelect dropdown from opening when a tag is clicked.

1. Attach a click event handler to the MultiSelect wrapper to detect clicks on tags.
2. Use the event target to determine if a tag was clicked and to retrieve the tag's text.
3. Add logic to disable the MultiSelect popup opening on chip click in the [`open`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/open) event handler.

```dojo
     <select id="multiselect" multiple="multiple">
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        dataSource: ["Item1", "Item2", "Item3", "Item4"],
        value: ["Item2", "Item3"],
        open: onOpen
      });

      var allowOpen = false;
      $(document).ready(function(){
        var multiselect=$("#multiselect").data("kendoMultiSelect");
        multiselect.wrapper.on("click", ".k-chip", function(e){ 
          var selectedText = e.currentTarget.outerText;
          alert("Clicked item is: " + selectedText);

          // below logic is for obtaining all 
          //var selectedItem;
          // multiselect.close();
          //var items = multiselect.dataItems();
          //$.each(items ,function(index,item){
          //  if(item === selectedText ){
          //    selectedItem=item;
          //    return false;
          //  }
          //});
        });

        multiselect.wrapper.on("click",function(e){
          if($(e.target).is("span")){
            allowOpen = false;
            multiselect.open();
          }
          else{
            allowOpen = true;
            multiselect.open();
          }
        })
      })
      function onOpen(e){      
        if(!allowOpen){
          e.preventDefault()
        }
        allowOpen = false
      }
    </script>
```

Replace the `alert` statement with the appropriate logic for redirecting to the attachment page, based on the clicked tag's text or other attributes.

## See Also

- [MultiSelect Overview](https://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview)
- [API Reference of the MultiSelect](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)

