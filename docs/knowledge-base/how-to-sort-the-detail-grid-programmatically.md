---
title: How to access the detail grid programmatically
description: 
type: how-to
page_title: How to Sort The Detail Grid Programmatically
slug: how-to-sort-the-detail-grid-programmatically
position: 0
tags:
teampulseid:
ticketid: 1116825
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
I know we can always access a grid like $("\#grid").data("kendoGrid"), but this doesn't work for my situation.

Let's say I have a grid with 2 pages, 10 rows each. And each master row has a details row(.k-detail-row) below. So what I want to do is to export the grid's data with all the sorters applied. For the main columns it is pretty simple, I can get the data (a json with 20 length) and the sorter grid.dataSource.sort() and use kendo.data.Query to do the sorting. However this only works for the main grid. The inner grid's data is still unsorted. Could you help? I don't see anything in the API to access the details row programmatically. 

## Solution
  
I made a Dojo example demonstrating how to programmatically access a detail Grid and to apply sorting to its dataSource:  
  
[http://dojo.telerik.com/iSAKi](http://dojo.telerik.com/iSAKi)