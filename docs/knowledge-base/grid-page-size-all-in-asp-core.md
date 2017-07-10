---
title: Page size "All" in Grid for Asp.NET Core
description: How to set page size "All" in a Telerik UI Grid for Asp.NET Core.
type: how-to
page_title: Set page size "All" in a Telerik UI Grid for Asp.NET Core.
slug: grid-page-size-all-in-asp-core
position: 0
tags: grid, pagesize, asp, core, all
teampulseid:
ticketid: 1115286
pitsid:
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik Grid for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

You might want to use page size "All" in the Telerik UI Grid for Asp.Net Core.

## Possible Solution

After the document is "ready" you add the option for "All" page size dynamically through the dataSource of the Kendo DropdownList widget for selecting page size.

 ```       
        $(function () {

            var grid = $('#grid').data('kendoGrid');
            
            var pageSizeDropDownList = grid.wrapper.children(".k-grid-pager").find("select").data("kendoDropDownList");
            console.log(pageSizeDropDownList)
            pageSizeDropDownList.dataSource.add({text:"All", value:'all'})
            pageSizeDropDownList.dataSource.sync()      
        })
 ```

 ## Notes

This approach allows you to customize the text inside the drop down.