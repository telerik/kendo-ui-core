---
title: Cascading MultiSelects
page_title: Cascading MultiSelects
description: Cascading MultiSelects
---

# Cascading MultiSelects

The example below demonstrates how to cascade multiple Kendo UI MultiSelect widgets.

#### Example:

```html
    supplier: <select id="suppliers"></select>
    product: <select id="products"></select>
    <script>
      $(function() {
        var productsDataSource = new kendo.data.DataSource({
          type: "odata",
          serverFiltering: true,
          transport: {
            read: {
              url: "http://demos.kendoui.com/service/Northwind.svc/Products",
            },
            parameterMap: function(data) {
              var result = {};
              var filter = data.filter;

              if (filter) {
                filter = filter.filters;

                for (var i = 0, length = filter.length; i < length; i++) {
                  result["filters[" + i + "]"] = filter[i].value;
                }
              }

              return result;
            }
          }
        });

        $("#products").kendoMultiSelect({
          autoBind: false,
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: productsDataSource
        });

        $("#suppliers").kendoMultiSelect({
          autoBind: false,
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
            var filters = buildFilters(this.dataItems());
            productsDataSource .filter(filters);
          }
        });

        function buildFilters(dataItems) {
          var filters = [],
              length = dataItems.length,
              idx = 0, dataItem;

          for (; idx < length; idx++) {
            dataItem = dataItems[idx];

            filters.push({
              field: "SupplierID",
              operator: "eq",
              value: parseInt(dataItem.SupplierID)
            });
          }

          return {
            logic: "or",
            filters: filters
          };
        }
      });
    </script>
```
