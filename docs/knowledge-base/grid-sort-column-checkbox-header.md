---
title: Prevent Sorting with Checkbox in Header
description: An example on how to implement a sortable column with a checkbox in the Kendo UI Grid header.
type: how-to
page_title: Implement Sortable Columns with Checkboxes in the Headers | Kendo UI Grid for jQuery
slug: grid-sort-column-checkbox-header
tags: grid, sort, header, checkbox, template, prevent, enable
ticketid: 1141908
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
  <td>Created with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

My Grid has a header template, which contains a checkbox, for a column. When I click the checkbox, the column gets sorted.

How can I prevent the sorting of the column which uses a header template and has a checkbox in its header?

## Solution

To allow the selection and deselection of the checkbox only and prevent the [event propagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation), handle the `click` event.

```dojo
<base href="https://demos.telerik.com/kendo-ui/grid/index">

<div id="example">
    <div id="grid"></div>
    <script>
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    pageSize: 20
                },
                height: 550,
                groupable: true,
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [{
                    headerTemplate: 'Recommendations & Status Details <br/><input type="checkbox" id="chkStatusDtls" /> Show all Status Details',
                    template: "<div class='customer-photo'" +
                        "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
                        "<div class='customer-name'>#: ContactName #</div>",
                    field: "ContactName",
                    title: "Contact Name",
                    width: 240
                }, {
                    field: "ContactTitle",
                    title: "Contact Title"
                }, {
                    field: "CompanyName",
                    title: "Company Name"
                }, {
                    field: "Country",
                    width: 150
                }]
            });

            $("#chkStatusDtls").on("click", function (e) {
                e.stopPropagation();

                //add custom logic here
            })
        });
    </script>
</div>

<style type="text/css">
    .customer-photo {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: 32px 35px;
        background-position: center center;
        vertical-align: middle;
        line-height: 32px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, .2);
        margin-left: 5px;
    }

    .customer-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
        padding-left: 3px;
    }
</style>
```
