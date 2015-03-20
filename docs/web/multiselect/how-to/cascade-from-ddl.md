---
title: Cascade from DropDownList
page_title: Cascade from DropDownList
description: Cascade from DropDownList
---

# Cascade from DropDownList

The example below demonstrates how to cascade the Kendo UI Multiselect from a Kendo UI DropDownList

#### Example:

```html
    <div>
      supplier: <select id="suppliers"></select>
    </div>
    <div>
      product: <select id="products"></select>
    </div>
    <script>
      $(function() {
        var productsDataSource = new kendo.data.DataSource({
          type: "odata",
          serverFiltering: true,
          transport: {
            read: {
              url: "http://demos.kendoui.com/service/Northwind.svc/Products",
            }
          }
        });

        $("#products").kendoMultiSelect({
          autoBind: false,
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: productsDataSource
        });

        $("#suppliers").kendoDropDownList({
          optionLabel: "Select supplier",
          dataTextField: "CompanyName",
          dataValueField: "SupplierID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.kendoui.com/service/Northwind.svc/Suppliers"
              }
            }
          },
          change: function() {
            var filters = buildFilters([this.dataItem()]);
            productsDataSource.filter(filters);
          }
        });

        function buildFilters(dataItems) {
          var filters = [];
          var length = dataItems.length;
          var supplierID;
          var idx = 0;

          for (; idx < length; idx++) {
            supplierID = parseInt(dataItems[idx].SupplierID);

            if (!isNaN(supplierID)) {
              filters.push({
                field: "SupplierID",
                operator: "eq",
                value: supplierID
              });
            }
          }
          return filters;
        }
      });
    </script>
```
