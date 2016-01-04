---
title: Persist row selection during data operations
page_title: Persist row selection during data operations | Kendo UI ListView Widget
description: "Learn how to persist row selection during data operations."
slug: howto_persists_row_selection_listview
---

# Persist row selection during data operations

The example below demonstrates how to persist row selection during data operations.

```html
  <div id="listview"></div>
  <div id="pager"></div>

  <script>
    $(function () {

      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
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
        height: 400,
        selectable: "multiple",
        pageable: true,
        template: "<div>#:ShipCity# || #:Freight# || #:kendo.toString(OrderDate, 'dd/MM/yyyy')#</div>",
        change: function (e, args) {
          var listview = e.sender;
          var items = listview.items();
          items.each(function (idx, row) {
            var idValue = listview.dataSource.getByUid(row.dataset.uid).get(idField);
            if (row.className.indexOf("k-state-selected") >= 0) {
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

      $("#pager").kendoPager({ dataSource: dataSource });
    });
  </script>
```

## See Also

Other articles on Kendo UI ListView:

* [JavaScript API Reference](/api/javascript/ui/listview)
