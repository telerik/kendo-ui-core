---
title: Multiselect used for column filtering
page_title: Multiselect used for column filtering
description: Multiselect used for column filtering
---

# Multiselect used for column filtering

The following runnable sample demonstrates how to use a Kendo UI MultiSelect widget for column filter.

#### Example:

```html
    <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
    <div id="grid"></div>
    <script>
      var data = [
        { id: 1, name: "Fred", key: 1, value: "Green" },
        { id: 2, name: "Jed", key: 11, value: "Jorgensen" },
        { id: 3, name: "Red", key: 2, value: "Blah" },
        { id: 4, name: "Ted", key: 23, value: "Bleh" },
        { id: 5, name: "Ed", key: 3, value: "Toast" },
        { id: 6, name: "Zed", key: 4, value: "Smith" },
        { id: 7, name: "Ed", key: 41, value: "Johnson" }
      ];

      $(function() {
        var names = _.sortBy(_.uniq(_.pluck(data, "name")), function(n) { return n; });

        function createMultiSelect(element) {
          element.removeAttr("data-bind");

          element.kendoMultiSelect({
            dataSource: names,
            change: function(e) {
              var filter = { logic: "or", filters: [] };
              var values = this.value();
              $.each(values, function(i, v) {
                filter.filters.push({field: "name", operator: "eq", value: v });
              });
              console.log(this.dataSource.data());
              dataSource.filter(filter);
            }
          });
        }

        var dataSource = new kendo.data.DataSource({
          data: data,
          schema: {
            model: {
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                key: { type: "number" },
                value: { type: "string" }
              }
            }
          }
        });

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          sortable: true,
          filterable: true,
          columns: [
            {field: "id", title: "Id"},
            {
              field: "name", 
              title: "Name",
              filterable: {
                ui : createMultiSelect,
                extra: false
              }
            },
            {field: "key", title: "Key"},
            { field: "value", title: "Value"}
          ]
        });
      });
    </script>
```