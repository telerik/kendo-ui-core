---
title: Persist Row Selection during Data Operations in the ListView
page_title: Persist Row Selection during Data Operations in the ListView
description: "Learn how to persist row selection during data operations in a Kendo UI ListView component."
slug: howto_persists_row_selection_listview
previous_url: /controls/data-management/listview/how-to/persist-selection-after-data-operations
tags: listview, persist, row, selection, during, data, operations
component: listview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I persist the row selection of the ListView during data operations?

## Solution

The following example demonstrates how to persist row selection during data operations in the ListView.

```dojo
    <div id="listview"></div>

    <script>
      $(function () {
        var dataSource = new kendo.data.DataSource({
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              id: "OrderID",
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                ShipName: { type: "string" },
                OrderDate: { type: "date" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 10,
          serverPaging: true
        });

        var selectedOrders = [];
        var idField = "OrderID";

        $("#listview").kendoListView({
          dataSource: dataSource,
          selectable: "multiple",
          pageable: true,
          template: "<div>#:ShipCity# || #:Freight# || #:kendo.toString(OrderDate, 'dd/MM/yyyy')#</div>",
          change: function (e, args) {
            var listview = e.sender;
            var items = listview.items();
            items.each(function (idx, row) {
              var idValue = listview.dataSource.getByUid(row.dataset.uid).get(idField);
              if (row.className.indexOf("k-selected") >= 0) {
                selectedOrders[idValue] = true;
              } else if (selectedOrders[idValue]) {
                delete selectedOrders[idValue];
              }
            });
          },
          dataBound: function (e) {
            var listview = e.sender;
            var items = listview.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
              var dataItem = listview.dataSource.getByUid(row.dataset.uid);
              if (selectedOrders[dataItem[idField]]) {
                itemsToSelect.push(row);
              }
            });

            listview.select(itemsToSelect);
          }
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
* [Filter Using Slider Selection]({% slug howto_filter_using_slider_selection_listview %})
* [Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})
