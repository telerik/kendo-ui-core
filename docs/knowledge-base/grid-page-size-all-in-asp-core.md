---
title: Set All Page Size in Grid for ASP.NET Core
description: Learn how to set an All page size in a Kendo UI Grid in ASP.NET Core projects.
type: how-to
page_title: Set an All Page Size in Grid - Kendo UI Grid for ASP.NET Core
slug: grid-page-size-all-in-asp-core
tags: grid, pagesize, asp, core, all
ticketid: 1115286
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI Grid for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description

How can I use an **All** page size in the Kendo UI Grid in ASP.NET Core projects?

## Solution

After the document is ready, dynamically add the option for the **All** page size through the dataSource of the DropdownList to allow for selecting the page size.

```       
        $(function () {

            var grid = $('#grid').data('kendoGrid');
            var pageSizeDropDownList= grid.wrapper.find('.k-pager-sizes').find('[data-role="dropdownlist"]').data('kendoDropDownList');
            console.log(pageSizeDropDownList)
            pageSizeDropDownList.dataSource.add({text:"All", value:'all'})
            pageSizeDropDownList.dataSource.sync()      
        })
```

## Notes

This approach allows you to customize the text inside the drop-down list.
