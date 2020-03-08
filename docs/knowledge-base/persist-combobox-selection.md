---
title: Persist the Selection in the ComboBox
description: An example on how to persist the selected item in a Kendo UI ComboBox.
type: how-to
page_title: Persist the ComboBox Selection | Kendo UI ComboBox for jQuery
slug: persist-combobox-selection
tags: persisting, selected, item, combobox
ticketid: 1116339
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>

## Description

In web pages I have the Persistence Manager control to preserve the user options and the state of the page through postbacks. I use the Kendo UI ComboBox for entering the criteria and the Kendo UI Grid. How can I persist the selected item in the ComboBox?

## Solution

Retrieve the selected item and keep it in `localStorage` by using the [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/methods/select) method. When necessary, set an item as selected again by using `select()`.

```dojo
  <div  >
      <a href="#" class="k-button" id="save">Save State</a>
      <a href="#" class="k-button" id="load">Load State</a>
    </div>

    <input id="categories" />

  <script>

      $(document).ready(function() {
        var categories = $("#categories").kendoComboBox({
          filter: "contains",
          placeholder: "Select category...",
          dataTextField: "CategoryName",
          dataValueField: "CategoryID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            }
          }
        }).data("kendoComboBox");

        $("#save").click(function (e) {
          e.preventDefault();
          localStorage["combo-selection"] = categories.select();
        });

        $("#load").click(function (e) {
          e.preventDefault();

          var selection = localStorage["combo-selection"];

          if (selection) {
            categories.select(parseInt(selection));
          }
        });


      });


    </script>
```

## See Also

* [Demo on Persisting the Grid State](https://demos.telerik.com/kendo-ui/grid/persist-state)
