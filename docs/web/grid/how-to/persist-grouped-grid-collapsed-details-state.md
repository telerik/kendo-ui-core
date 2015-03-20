---
title: Persist grouped grid collapsed details state
page_title: Persist grouped grid collapsed details state
description: Persist grouped grid collapsed details state
---

# Persist grouped grid collapsed details state

The following runnable sample demonstrates how to persisted the collapsed state of grouped records in a Kendo UI Grid.

#### Example:

```html
  <div id="grid"></div>
    <script>
      var groups = [],
          crudServiceBaseUrl = "",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: "http://demos.kendoui.com/service/Products",
                dataType: "jsonp"
              }
            },
            pageSize: 20,
            requestEnd: function (e) {
              if (groups.length != this.group().length) {
                var dataSourceGroups = this.group(),
                    length = groups.length;
                if (length > dataSourceGroups.length) {
                  if (dataSourceGroups.length === 0) {
                    collapsed = {};
                  } else {                        
                    for (var key in collapsed) {                            
                      if (key.indexOf(length - 1) === 0) {
                        collapsed[key] = false;
                      }
                    }
                  }
                }

                groups = this.group().slice(0);
              }
            }
          });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 430,
        dataBound: dataBound,
        sortable: true,
        groupable: true,
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "100px" },
          { field: "UnitsInStock", title:"Units In Stock", width: "100px" },
          { field: "Discontinued", width: "100px" }]
      });

      var collapsed = {};

      $(function () {
        var grid = $("#grid").data("kendoGrid");
        grid.table.on("click", ".k-grouping-row .k-i-collapse, .k-grouping-row .k-i-expand", function (e) {
          var row = $(this).closest("tr"),
              groupKey = rowGroupKey(row, grid);

          if ($(this).hasClass("k-i-collapse")) {
            collapsed[groupKey] = false;
          }
          else {
            collapsed[groupKey] = true;
          }
        });
      });

      function rowGroupKey(row, grid) {
        var next = row.nextUntil("[data-uid]").next(),
            item = grid.dataItem(next.length ? next : row.next()),
            groupIdx = row.children(".k-group-cell").length,
            groups = grid.dataSource.group(),
            field = grid.dataSource.group()[groupIdx].field,
            groupValue = item[field];
        return "" + groupIdx + groupValue;
      }

      function dataBound(e) {
        var grid = this,
            groups = grid.dataSource.group();
        if (groups.length) {
          grid.tbody.children(".k-grouping-row").each(function () {
            var row = $(this),
                groupKey = rowGroupKey(row, grid);
            if (collapsed[groupKey]) {
              grid.collapseRow(row);
            }
          });
        }
      }  
    </script>  
```