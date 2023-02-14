---
title: Animate Detail Row Which Opens with Kendo UI Effects in Grid
description: Learn how to animate the opening of a detail row with Kendo UI Effects in a Kendo UI Grid.
type: how-to
page_title: Animate the Opening of Detail Rows - Kendo UI Grid for jQuery
slug: grid-animate-detail-row-with-kendo-effect
tags: grid, aniamte, detail, row, detailrow, effect, slide in, fade, expand
ticketid: 540440
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I add a Kendo UI Animation Effect to the opening of a detail row in the Grid?

## Suggested Workarounds

Use the `detailInit` event and custom CSS rules.

```dojo
<div id="grid"></div>

<script type="text/x-kendo-template" id="template">
  <div class="tabstrip">
    <ul>
      <li class="k-active">
        Orders
      </li>
      <li>
        Contact Information
      </li>
    </ul>

    <div>
      <div class="orders"></div>
    </div>
    <div>
      <div class='employee-details'>
        <ul>
          <li><label>Country:</label>#= Country #</li>
          <li><label>City:</label>#= City #</li>
          <li><label>Address:</label>#= Address #</li>
          <li><label>Home Phone:</label>#= HomePhone #</li>
        </ul>
      </div>
    </div>
  </div>
</script>

<script>
  $(document).ready(function() {
    var element = $("#grid").kendoGrid({
      dataSource: {
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
        },
        pageSize: 5,
        serverPaging: true,
        serverSorting: true
      },
      height: 430,
      sortable: true,
      pageable: true,
      detailTemplate: kendo.template($("#template").html()),
      detailInit: detailInit,
      dataBound: function() {
        this.expandRow(this.tbody.find("tr.k-master-row").first());
      },
      detailExpand: function(e) {
        var detailRow = e.detailRow;
        setTimeout(function() {
          kendo.fx(detailRow).slideIn("down").play();
        }, 0);
      },
      columns: [
        {
          field: "FirstName",
          title: "First Name",
          width: "120px"
        },
        {
          field: "LastName",
          title: "Last Name",
          width: "120px"
        },
        {
          field: "Country",
          width: "120px"
        },
        {
          field: "City",
          width: "120px"
        },
        {
          field: "Title"
        }
      ]
    });
  });
  function detailInit(e) {
    var detailRow = e.detailRow;
    detailRow.find(".tabstrip").kendoTabStrip({
      animation: {
        open: {
          effects: "fadeIn"
        }
      }
    });

    detailRow.find(".orders").kendoGrid({
      dataSource: {
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 5,
        filter: {
          field: "EmployeeID",
          operator: "eq",
          value: e.data.EmployeeID
        }
      },
      scrollable: false,
      sortable: true,
      pageable: true,
      columns: [
        {
          field: "OrderID",
          title: "ID",
          width: "56px"
        },
        {
          field: "ShipCountry",
          title: "Ship Country",
          width: "110px"
        },
        {
          field: "ShipAddress",
          title: "Ship Address"
        },
        {
          field: "ShipName",
          title: "Ship Name",
          width: "190px"
        }
      ]
    });
  }
</script>

<style scoped="scoped">
  .k-detail-cell .k-tabstrip .k-content {
    padding: 0.2em;
  }
  .employee-details ul {
    list-style: none;
    font-style: italic;
    margin: 15px;
    padding: 0;
  }
  .employee-details ul li {
    margin: 0;
    line-height: 1.7em;
  }
  .employee-details label {
    display: inline-block;
    width: 90px;
    padding-right: 10px;
    text-align: right;
    font-style: normal;
    font-weight: bold;
  }
</style>
```

## See Also

* [API Reference of the detailInit Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit)
* [Slide-In Animation Effect Demo](https://demos.telerik.com/kendo-ui/fx/slidein)
