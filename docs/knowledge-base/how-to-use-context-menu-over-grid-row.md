---
title: Context Menu on Cell
description: Use Context Menu over Grid row
type: how-to
page_title: How to Use Context Menu Over Grid Row
slug: how-to-use-context-menu-over-grid-row
position: 0
tags:
teampulseid:
ticketid: 1114321
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>

 
## Description

Is there any way to append a context menu to each (or part of them) cells of the kendo grid?

What I am trying to do is to give to the cell a drill-down options functionality. 

What I would like to do is:  right click a cell of the grid and view a Context menu with the available drillable options, once I clicked one action of the menu I need to retrieve the sender cell parameters like for example row id, column id, value etc. depending on action needs.

I've found a way to have a similar functionality by using tooltip which is fired on left-click and which allows me to retrieve sender-cell data through selected method of the grid, but I'd like to improve this solution. 

## Solution
  
In this scenario, I can suggest initializing the ContextMenu over the Grid rows. Then on the select event of the ContextMenu to retrieve the row information using the dataItem method of the Grid:  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\#methods-dataItem](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-dataItem)  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu\#events-select](http://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu#events-select)  
  
I made an example demonstrating this:
  
[http://dojo.telerik.com/iNuXet](http://dojo.telerik.com/iNuXet)