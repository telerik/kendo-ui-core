---
title: Adding New Items
page_title: jQuery MultiSelect Documentation | Adding New Items
description: "Get started with the jQuery MultiSelect by Kendo UI and learn how to add new items."
slug: newitems_multiselect
position: 8
---

# Adding New Items

You can enable users to add a new item when the search results do not match their filtering conditions.

For a runnable example, refer to the demo on [adding new items to the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/addnewitem).

1. Initialize the MultiSelect.

    ```
      <input id="products" style="width: 100%;" />
          <script>
              $(document).ready(function() {           
                  var data = [
                    { ProductName: "Beer", ProductID: "1" },
                    { ProductName: "Tee", ProductID: "2" },
                    { ProductName: "Coffee", ProductID: "3" }
                  ];                 
                  $("#products").kendoMultiSelect({
                      filter: "startswith",
                      dataTextField: "ProductName",
                      dataValueField: "ProductID",
                      dataSource: data
                  });
              });
          </script>
    ```

1. Refer the data source of the MultiSelect.

    ```
      var widget = $("#products").getKendoMultiSelect();
      var dataSource = widget.dataSource;
    ```

1. Implement the confirmation dialog.

    ```
      if (confirm("Are you sure?")) {
      dataSource.add({
          ProductID: 0,
          ProductName: value
      });
    ```

1. Sync the data to update the records.

    ```
      dataSource.one("sync", function() {
          widget.select(dataSource.view().length - 1);
      });

      dataSource.sync();
    ```

## See Also

* [Adding New Items to the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/addnewitem)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
