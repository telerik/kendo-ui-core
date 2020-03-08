---
title: Checkbox Selection Is Not Working for Custom Grids
description: I cannot enable the checkbox selection in the Kendo UI Grid and use it in combination with the kendo.ui.Grid class.
type: troubleshooting
page_title: Checkbox Selection Is Not Working | Kendo UI Grid for jQuery
slug: fix-the-checkbox-selection-with-custom-grid
previous_url: /knowledge-base/fix_the_checkbox_selection_with_custom_grid
tags: grid, selectiong, checkbox
ticketid: 1128288
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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

I want to use the new checkbox-selection feature of the Grid. However, when I click on the checkbox in the header, the checkboxes of the Grid rows are not selected and when I do the paging, the Grid doesn't persist the checkboxes that were selected from other pages.

How can I extend the `kendo.ui.Grid` class and implement the checkbox selection in the Grid?

## Cause

Two of the private methods internally reference the Grid. As the widget is now called `kendoMyGrid`, the result is `undefined` and the additional logic is not executed.  

```
checkBox.closest(".k-grid.k-widget").data("kendoGrid")

// now it should be

checkBox.closest(".k-grid.k-widget").data("kendoMyGrid")
```

## Solution

Overwrite the two methods. Note that because the methods are private, their modification might cause unexpected behavior.  

For the complete implementation of the approach, refer to [this runnable example](https://dojo.telerik.com/usiZiM/2).  
