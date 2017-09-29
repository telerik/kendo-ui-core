---
title: Kendo UI Professional Grid.extend class and Grid checkbox selection
description: The Checkbox Selection is not working with Custom Grid Widget
type: troubleshooting
page_title: Fix The Checkbox Selection with Custom Grid Widget
slug: fix_the_checkbox_selection_with_custom_grid_widget
tags: grid, selectiong, checkbox
ticketid: 1128288
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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
  <td>60.0.3112.113</td>
 </tr>
</table>


## Description

We are extending the class kendo.ui.Grid. Now we wanted to make use of the new feature Grid / checkbox-selection. But its not working. The click on the checkbox in the headline wont select all checkboxes in the rows, and when paging it forgets already selected checkboxes from other pages.

I saw multiples ways to extend Kendo classes, so i am not sure if the code below is the best way to extend your classes? Any idea what could cause the problem?

## Solution
  
The issue occurs because two of the private methods are internally referencing the Grid. As the widget is now called kendoMyGrid, the result is undefined and the additional logic is not executed:  
  
```
checkBox.closest(".k-grid.k-widget").data("kendoGrid")

// now it should be

checkBox.closest(".k-grid.k-widget").data("kendoMyGrid")
```
  
  
I can suggest overwriting these methods, but please have in mind that these are private methods and unexpected issues may occur.  
  
Please check the [following example](http://dojo.telerik.com/usiZiM/2) demonstrating this.  
