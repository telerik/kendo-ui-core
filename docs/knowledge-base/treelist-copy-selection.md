---
title: Implement allowCopy in TreeList
description: An example on how to enable the copying of the selected items in the Kendo UI TreeList.
type: how-to
page_title: Enable Copy of Selected Items | Kendo UI TreeList
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

Unlike the Grid, the TreeList API does not provide the [`allowCopy`](/api/javascript/ui/grid/configuration/allowcopy) option. Depending on the specific data, my project uses both widgets. The lack of the setting confuses the users&mdash;in some places they can copy the data while in other places they cannot copy the data even though the controls look the similar.

How can I enable the copying of the selected items in a TreeList?

## Solution

This functionality is not part of the built-in TreeList settings but is already submitted as a feature request in the UserVoice forum. Popular requests get prioritized on the team's roadmap. To upvote the feature request, refer to [http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/11317023-enable-multi-selection-in-treelist-a-la-grid-and-s](http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/11317023-enable-multi-selection-in-treelist-a-la-grid-and-s).

## Suggested Workarounds

To focus the table, add an event handler to the [`change`](/api/javascript/ui/treelist/events/change) event of the TreeList and to the `Ctrl`+`C` key combination. You can further elaborate on the example with the help of the non-minified `kendo.grid.js` file and the `getTSV` internal function.

###### Example

```dojo
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
