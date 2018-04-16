---
title: How to implement allowCopy in the TreeList
description: How to enable copying of selected items in the TreeList
type: how-to
page_title: Allow copy of selected items in the Kendo UI TreeList
slug: treelist-copy-selection
tags: treelist, allowCopy, selection, copy
ticketid: 1161545
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>TreeList for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

Currently in your API the Grid has [`allowCopy`](/api/javascript/ui/grid/configuration/allowcopy) but the TreeList does not. 

We currently use the Grid and Treelist depending on the data the we have, this would confuse the users that in one place they can copy and in another they cannot even though the controls look the same (minus is the items can have children).

## Solution

The required functionality is not part of the Kendo UI TreeList at present, however, there is already an item in the Kendo UserVoice portal and if it gains popularity, it would be put on the roadmap for implementation. Here is a link to the one we have at present:

[http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/11317023-enable-multi-selection-in-treelist-a-la-grid-and-s](http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/11317023-enable-multi-selection-in-treelist-a-la-grid-and-s)

## Suggested Workarounds

Add an event handler to the [`change`](/api/javascript/ui/treelist/events/change) event of the TreeList so that you can focus the table and also to the `Ctrl +C` keypress combination.

The suggestion can be further developed with the help of the non-minified `kendo.grid.js` file and the `getTSV` internal function.

###### Example

```html
<div id="treeList"></div>
    <script>
     var treeList = $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: "multiple,row",
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        change:function(e){
          var treeList = this;
          $(".k-selectable")[0].focus();
        }
      }).data("kendoTreeList");
      
       $("#treeList").on("keydown","table.k-selectable", function(event){
            if (event.ctrlKey === true && event.key==="c") {
              var selected = treeList.select();
              var result = [];
              var delimiter = "\t";
              var result = [];
              var text = "";
              selected.each(function(idx,row){
                var cells = $(row).children("td");
                cells.each(function(index,cell){
                   result.push($(cell).text());
                });
                text += result.join(delimiter) + "\r\n";
                result = [];
              })
              
              var textarea = $("<textarea>");
              var offset = $(this).offset();
              // Position the textarea on top of the Treelist and make it transparent.
              textarea.css({
                position: 'absolute',
                opacity:0,
                top: offset.top,
                left: offset.left,
                border: 'none',
                width: $(this).find("table").width(),
                height: $(this).find(".k-grid-content").height()
              });
              
              textarea
                .val(text)
                .appendTo('body')
                .focus()
                .select();
              
              setTimeout(function(){
                textarea.remove();
              });          
            }
          });
    </script>
```
