---
title: Persist Row Selection during Data Operations
page_title: Persist Row Selection during Data Operations | Kendo UI ListView
description: "Learn how to persist row selection during data operations in a Kendo UI ListView widget."
slug: howto_persists_row_selection_listview
---

# Persist Row Selection during Data Operations

The example below demonstrates how to persist row selection during data operations in a Kendo UI ListView widget.

###### Example

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

* [ListView JavaScript API Reference](/api/javascript/ui/listview)
* [How to Add Custom Delete Confirmation Dialog]({% slug add_custom_delete_confirmation_dialog %})
* [How to Filter Using Slider Selection]({% slug howto_filter_using_slider_selection_listview %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})
