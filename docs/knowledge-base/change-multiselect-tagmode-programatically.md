---
title: Change Multiselect TagMode based on the number of items selected
description: An example on how to change the tag mode of the MultiSelect programatically
type: how-to
page_title: How to change the TagMode in MultiSelect, base on selected items
slug: change-multiselect-tagmode-programatically
tags: multiselect, tagmode, change, programatically, number, selected, items
ticketid: 1133139
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>MultiSelect for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61.0.3163.100 (Official Build) (64-bit)</td>
 </tr>
</table>


## Description

 I want to have the Multiselect set up in "Multiple" tag mode for the first X selections, then switch to "Single" tag mode if more than X items are selected.
 
## Solution

You should handle the change event of the MultiSelect, in order to get the current count of selected items. If it exceeds the predefined number,
 you can change the tagMode, using the setOptions method of the MultiSelect wdiget. Below is a demonstration of the change event implementation:
 
 
 
 ``` html 
  change: function(){
      var selectedValues = this.value(); //store the current selection
      var currentTagMode = this.options.tagMode;
      var newTagMode = currentTagMode;
      if(selectedValues.length <= 2){
          newTagMode = "multiple";
      } else {
          newTagMode = "single"
      }
      if(newTagMode != currentTagMode){
        	this.value([]) // clear the current selection
          this.setOptions({ tagMode: newTagMode }); //set the new tagMode
          this.value(selectedValues); //restore previous selection
      } 
 
 ```
  


The following dojo example demonstrates the entire implementation:
[http://dojo.telerik.com/@nenchef/eZALa/3](http://dojo.telerik.com/@nenchef/eZALa/3)  

## See Also
