---
title: Initialize Data Attribute with Detail Template
page_title: Data Attribute Initialization | Kendo UI Grid for jQuery
description: "An example on how to initialize a Kendo UI jQuery Grid widget by using data attributes and including a detail template."
previous_url: /controls/data-management/grid/how-to/data-attribute-initialization-with-detail-template, /web/grid/how-to/data-attribute-initialization-with-detail-template, /controls/data-management/grid/how-to/Templates/data-attribute-initialization-with-detail-template
slug: howto_initialize_data_attributewith_detail_template_grid
tags: grid, initialize, data, attribute, detail, template
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I initialize a Kendo UI jQuery Grid widget by using data attributes and including a detail template?

## Solution

The following example demonstrates how to initialize a Grid by using data attributes and include a detail template.

```dojo
     <div id="grid"
         data-role="grid"
         data-sortable="true"
         data-pageable="true"
         data-height="450"
         data-detail-init="viewModel.detailInit"
         data-columns='[{"field": "FirstName"}, {"field": "LastName"}, {"field": "Country"}, {"field": "City"}, {"field": "Title"}]'
         data-bind="source: dataSource, events: { dataBound: dataBound }"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
        },
        pageSize: 6,
        serverPaging: true,
        serverSorting: true
      });

      var viewModel = kendo.observable({
        dataSource: dataSource,
        detailInit: function (e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize:6,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: 70 },
              { field: "ShipCountry", title:"Ship Country", width: 100 },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: 200 }
            ]
          });
        },
        dataBound: function(e) {
          e.sender.expandRow(e.sender.tbody.find("tr.k-master-row").first());
        }
      });
      kendo.bind($(document.body), viewModel);
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
