---
title: Adding New Items
page_title: jQuery DropDownList Documentation | Adding New Items | Kendo UI
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to add new items."
slug: newitems_dropdownlist_widget
position: 7
---

# Adding New Items

You can enable users to add a new item when the search results do not match their filtering conditions.

For a runnable example, refer to the demo on [adding new items to the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/addnewitem).

1. Initialize the DropDownList.

    ```
      <input id="products" style="width: 100%;" />
          <script>
              $(document).ready(function() {           
                  var data = [
                    { ProductName: "Beer", ProductID: "1" },
                    { ProductName: "Tee", ProductID: "2" },
                    { ProductName: "Coffee", ProductID: "3" }
                  ];                 
                  $("#products").kendoDropDownList({
                      filter: "startswith",
                      dataTextField: "ProductName",
                      dataValueField: "ProductID",
                      dataSource: data
                  });
              });
          </script>
    ```

1. Refer the data source of the DropDownList.

    ```
      var widget = $("#products").getKendoDropDownList();
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

* [Adding New Items to the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/addnewitem)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
