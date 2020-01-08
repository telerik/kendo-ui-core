---
title: Set the All Page Size Feature in the Grid
description: An example on how to set the all-page-size feature in the Telerik UI Grid for ASP.NET Core.
type: how-to
page_title: Set the All Page Size in the Grid
slug: grid-page-size-all
tags: grid, pagesize, asp, core, all
ticketid: 1115286
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

How can I use an **All** page size in the Telerik UI Grid for ASP.NET Core?

## Solution

After the document is ready, dynamically add the option for the **All** page size by using the dataSource of the DropdownList and thus allow for selecting the page size. The suggested approach also enables you to customize the text inside the DropDownList.

```
        $(function () {

            var grid = $('#grid').data('kendoGrid');

            var pageSizeDropDownList = grid.wrapper.children(".k-grid-pager").find("select").data("kendoDropDownList");
            console.log(pageSizeDropDownList)
            pageSizeDropDownList.dataSource.add({text:"All", value:'all'})
            pageSizeDropDownList.dataSource.sync()
        })
```
