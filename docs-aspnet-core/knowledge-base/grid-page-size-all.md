---
title: Set the All Page Size Feature in Grid for ASP.NET Core
description: An example on how to set the all-page-size feature in the Kendo UI Grid in ASP.NET Core projects.
type: how-to
page_title: Set the All Page Size in the Grid | UI for ASP.NET Core
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
  <td>Progress Kendo UI Grid for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

How can I use an **All** page size in the Kendo UI Grid in ASP.NET Core projects?

## Solution

After the document is ready, dynamically add the option for the **All** page size through the dataSource of the DropdownList to allow for selecting the page size. The suggested approach also enables you to customize the text inside the DropDownList.

```
        $(function () {

            var grid = $('#grid').data('kendoGrid');

            var pageSizeDropDownList = grid.wrapper.children(".k-grid-pager").find("select").data("kendoDropDownList");
            console.log(pageSizeDropDownList)
            pageSizeDropDownList.dataSource.add({text:"All", value:'all'})
            pageSizeDropDownList.dataSource.sync()
        })
```
