---
title: Set Pane Size When There Are Nested Splitters
description: Learn how to use the size method when there are multiple nested Splitters.
type: how-to
page_title: Use the Size Method to Set the Pane Size in Nested Splitters - Kendo UI Splitter for jQuery
slug: splitter-set-size-nested-splitters
tags: kendo ui, splitter, pane, size, nested
ticketid: 1528267
res_type: kb
component: tooltip
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Splitter for jQuery</td>
 </tr>
</table>
 

## Description

How to get the correct selector and use it in the `size` method in order to set a size of a pane when there are nested Splitters? How to check if the pane is collapsed?

## Solution

All the panes in the Splitters can be accessed by using the 'k-pane' class. However in a scenario with nested Splitters we could not be sure to which Splitter the respective pane belongs to.
A possible approach is to search for the closest parent element with 'k-splitter' class and get a reference to the respective Splitter. Then, we could use the [`size`](/api/javascript/ui/splitter/methods/size) method as ususal.

### DatePicker

The following example demonstrates how to change the size of the panes in nested Splitters. Enter an index in the input and click the button.
Note, that the last pane in each Splitter can not be resized, if the rest of the size has been set to the rest of the panes in each widget.  

To check if a pane is collapsed, you can check if the pane has 'k-state-collapsed' class.

```dojo
    <input type="number" id="index" placeholder="Enter index of a pane"/>
    <button onclick="changeSize()"> Change size</button>

    <div id="example" style="height: 100%; width: 100%;">
      <div id="vertical_id" >
        <div id="Left_pane_id">
          <div id="Left_top_pane_id">Left top (index 1)</div>
          <div id="Left_bottom_pane_id">Left bottom (index 2) </div>
        </div>
        <div id="middle_pane_id">
          <div id="middle_top_pane_id">Middle top (index 4)</div>
          <div id="middle_bottom_pane_id">Middle (index 5)</div>
          <div id="middle_bottom_pane_id">Middle bottom (index 6)</div>
        </div>
        <div id="right_pane_id">
          <div id="right_top_pane_id">Right top (index 8)</div>
          <div id="right_bottom_pane_id">Right bottom (index 9)</div>
        </div>
      </div>
    </div>

    <script>
      function changeSize(){
        //remove background and border from the pane that was previosly resized
        $('.k-pane').css('background-color', 'white')
        $('.k-pane').css('border', 'none')

        var index = $('#index').val()

        var pane = $('.k-pane:eq('+ index+')')  

        //find the id of the Splitter that the pane belongs to
        var splitterEl = $(pane).parent('.k-splitter')
        var splitterId = '#' + $(splitterEl).attr('id')
        console.log('The Splitter ID is :  ' + splitterId )

        //check if the pane is collapsed
        var isCollapsed = $(pane).hasClass('k-state-collapsed')
        console.log('Is pane collapsed :  ' + isCollapsed )

        var splitter = $(splitterId).data('kendoSplitter')

        splitter.size(pane, "100px");

        //for better visibility change the background color of the pane that will be resized
        pane.css('background-color', 'yellow')
        pane.css('border', '2px solid red')      
      }

      var top_Splitter = $("#vertical_id").kendoSplitter({
        orientation: "horizontal"        
      }).getKendoSplitter();        

      var right_Splitter =  $("#right_pane_id").kendoSplitter({
        orientation: "vertical"        
      }).getKendoSplitter();

      var middle_Splitter =  $("#middle_pane_id").kendoSplitter({
        orientation: "vertical",
        panes: [
          { collapsible: true , size: "80px" },
          { collapsible: true , size: "120px" },
          { collapsible: true , size: "200px" }
        ]
      }).getKendoSplitter();

      var left_Splitter = $("#Left_pane_id").kendoSplitter({
        orientation: "vertical",
        panes: [
          { collapsible: true , size: "240px" },            
          { collapsible: true , size: "270px"  }
        ]
      }).getKendoSplitter();     
    </script>
```

## See Also

* [Splitter] API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitter)
