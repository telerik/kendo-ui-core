---
title: Distinct values in widgets sharing same data
page_title: Distinct values in widgets sharing same data
description: Distinct values in widgets sharing same data
---

# Distinct values in widgets sharing same data

The example below demonstrates how to filter the values of two widgets sharing same data, based on user selection.

#### Example:

```html
    <select id="multiselect1">
    </select>
    <br />
    <select id="multiselect2">
    </select>
    <script>
      var initialData = [{id:1, name: "item1"}, {id:2, name: "item2"}, {id:3, name: "item3"}];

      function distinctValues(values) {
        return initialData.filter(function(current){
          return values.filter(function(initial){
            return initial == current.id
          }).length == 0
        });
      }

      $("#multiselect1").kendoMultiSelect({
        dataSource: initialData,
        dataTextField: "name",
        dataValueField: "id",
        change: function() {
          var ms2 = $("#multiselect2").getKendoMultiSelect();
          var values = distinctValues(this.value());
          ms2.dataSource.data(values);
        }
      });

      $("#multiselect2").kendoMultiSelect({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: initialData,
        change: function() {
          var ms1 = $("#multiselect1").getKendoMultiSelect();
					var values = distinctValues(this.value());
          ms1.dataSource.data(values);
        }
      });
    </script>
```
